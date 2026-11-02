const https = require('https');
const fs = require('fs');
const { execSync } = require('child_process');

let creds = execSync('git credential fill', { input: 'protocol=https\nhost=github.com\n\n', encoding: 'utf8' });
let token = creds.match(/password=(.+)/)[1].trim();

function getJson(path) {
  return new Promise((resolve, reject) => {
    https.get({
      hostname: 'api.github.com',
      path,
      headers: {
        'User-Agent': 'NodeJS',
        'Authorization': 'Bearer ' + token
      }
    }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'NodeJS',
        'Authorization': 'Bearer ' + token
      }
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, { headers: { 'User-Agent': 'NodeJS' } }, redirectRes => {
          const file = fs.createWriteStream(dest);
          redirectRes.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
        }).on('error', reject);
      } else {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }
    }).on('error', reject);
  });
}

async function run() {
  const latestSha = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
  console.log('Target Commit SHA:', latestSha);

  while (true) {
    const data = await getJson('/repos/artcostamayrinck-hash/wizard-chess-main/actions/runs?per_page=5');
    if (!data.workflow_runs) {
      console.log('No runs found. Retrying in 10s...');
      await new Promise(r => setTimeout(r, 10000));
      continue;
    }

    const apkRun = data.workflow_runs.find(r => r.name === 'Build Android APK' && r.head_sha === latestSha);
    if (!apkRun) {
      console.log('Build Android APK for ' + latestSha.substring(0, 7) + ' not queued yet. Waiting 10s...');
      await new Promise(r => setTimeout(r, 10000));
      continue;
    }

    console.log(`Run #${apkRun.run_number}: status=${apkRun.status}, conclusion=${apkRun.conclusion}`);
    if (apkRun.status === 'completed') {
      if (apkRun.conclusion === 'success') {
        console.log('Build completed successfully! Downloading APK artifact...');
        const artData = await getJson(`/repos/artcostamayrinck-hash/wizard-chess-main/actions/runs/${apkRun.id}/artifacts`);
        const artifact = artData.artifacts && artData.artifacts[0];
        if (artifact) {
          console.log(`Downloading artifact: ${artifact.name} (${artifact.size_in_bytes} bytes)...`);
          for (let attempt = 1; attempt <= 3; attempt++) {
            try {
              await downloadFile(artifact.archive_download_url, 'artifact.zip');
              break;
            } catch (err) {
              console.warn(`Download attempt ${attempt} failed (${err.message}). Retrying...`);
              if (attempt === 3) throw err;
              await new Promise(r => setTimeout(r, 3000));
            }
          }
          console.log('Downloaded artifact.zip! Extracting...');
          
          execSync('powershell -Command "Expand-Archive -Path artifact.zip -DestinationPath temp_apk -Force; Copy-Item temp_apk/app-debug.apk ./app-debug.apk -Force; Copy-Item temp_apk/app-debug.apk C:\\Users\\mayri\\Downloads\\app-debug.apk -Force; Remove-Item -Recurse -Force temp_apk; Remove-Item artifact.zip"');
          console.log('✓ Successfully updated app-debug.apk in workspace and in C:\\Users\\mayri\\Downloads\\app-debug.apk!');
          break;
        } else {
          console.log('No artifact found in run.');
          break;
        }
      } else {
        console.error('Run failed with conclusion:', apkRun.conclusion);
        break;
      }
    }

    await new Promise(r => setTimeout(r, 10000));
  }
}

run().catch(console.error);
