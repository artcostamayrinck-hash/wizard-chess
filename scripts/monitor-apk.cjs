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
  const data = await getJson('/repos/artcostamayrinck-hash/wizard-chess-main/actions/runs?per_page=5');
  if (!data.workflow_runs) {
    console.log('No runs found:', data);
    return;
  }
  
  console.log('=== Recent Runs ===');
  data.workflow_runs.forEach(r => {
    console.log(`#${r.run_number} [${r.name}] status=${r.status} conclusion=${r.conclusion} sha=${r.head_sha.substring(0, 7)}`);
  });

  const latestSha = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
  console.log('Latest Git commit SHA:', latestSha);

  const apkRun = data.workflow_runs.find(r => r.name === 'Build Android APK' && r.head_sha === latestSha);
  if (!apkRun) {
    console.log('Build Android APK for ' + latestSha.substring(0, 7) + ' not queued yet. Waiting...');
    return;
  }

  console.log(`\nTarget Run #${apkRun.run_number}: status=${apkRun.status}, conclusion=${apkRun.conclusion}`);
  if (apkRun.status === 'completed' && apkRun.conclusion === 'success') {
    console.log('Run finished successfully! Fetching artifact...');
    const artData = await getJson(`/repos/artcostamayrinck-hash/wizard-chess-main/actions/runs/${apkRun.id}/artifacts`);
    const artifact = artData.artifacts && artData.artifacts[0];
    if (artifact) {
      console.log(`Downloading artifact: ${artifact.name} (${artifact.size_in_bytes} bytes)...`);
      await downloadFile(artifact.archive_download_url, 'artifact.zip');
      console.log('Downloaded artifact.zip! Extracting...');
      
      execSync('powershell -Command "Expand-Archive -Path artifact.zip -DestinationPath temp_apk -Force; Copy-Item temp_apk/app-debug.apk ./app-debug.apk -Force; Copy-Item temp_apk/app-debug.apk C:\\Users\\mayri\\Downloads\\app-debug.apk -Force; Remove-Item -Recurse -Force temp_apk; Remove-Item artifact.zip"');
      console.log('✓ Successfully extracted and updated app-debug.apk in workspace and in C:\\Users\\mayri\\Downloads\\app-debug.apk!');
    }
  } else {
    console.log('Build is still in progress (status: ' + apkRun.status + '). Will check again shortly.');
  }
}

run().catch(console.error);
