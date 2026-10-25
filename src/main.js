import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SoundFX } from './audio.js';
import { ChessEngine } from './chessEngine.js';
// ==========================================
// 1. INICIALIZAÇÃO DE SISTEMAS E ESTADO
// ==========================================
const sfx = new SoundFX();
const engine = new ChessEngine();

let isPaused = false;
let vsAI = true;
let aiDifficulty = 2; 
let isAnimating = false;
let isCameraAnimating = false;
let selectedSquare = null;
let validMoves = [];
let cameraPresetIndex = 0;
let isOnlineGame = false;
let myColor = 'w'; // Por padrão, começa como brancas
let roomId = null;

const container = document.getElementById('canvas-container');
const turnBanner = document.getElementById('turn-banner');

// ==========================================
// 2. CENA 3D, CÂMARA E RENDERIZADOR
// ==========================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0a0e);
scene.fog = new THREE.FogExp2(0x0b0a0e, 0.022);

const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 150);
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
if (container) container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.maxPolarAngle = Math.PI / 2 - 0.05;
controls.minDistance = 6;
controls.maxDistance = 28;
controls.target.set(0, 0.5, 0);
controls.autoRotateSpeed = 0.8; // Velocidade suave para o modo cinemático

const CAMERA_PRESETS = [
  { pos: new THREE.Vector3(0, 11.5, 13.5), target: new THREE.Vector3(0, 0.4, 0) },
  { pos: new THREE.Vector3(0, 11.5, -13.5), target: new THREE.Vector3(0, 0.4, 0) },
  { pos: new THREE.Vector3(0, 18.5, 0.01), target: new THREE.Vector3(0, 0, 0) },
  { pos: new THREE.Vector3(12.5, 7.5, 11.5), target: new THREE.Vector3(0, 0.6, 0) }
];

function applyCameraPreset(index, instant = false) {
  if (isCameraAnimating && !instant) return;

  const preset = CAMERA_PRESETS[index % CAMERA_PRESETS.length];
  const aspect = window.innerWidth / window.innerHeight;
  let targetFov = 42;
  let mult = 1.0;
  
  if (aspect < 1) { 
    targetFov = 52; 
    mult = 1.32; 
  } else if (aspect > 1 && window.innerHeight < 600) { 
    targetFov = 48; 
    mult = 1.15; 
  }

  const endPos = preset.pos.clone().multiplyScalar(mult);
  const endTarget = preset.target.clone();

  if (instant) {
    camera.fov = targetFov;
    camera.position.copy(endPos);
    controls.target.copy(endTarget);
    camera.updateProjectionMatrix();
    controls.update();
    return;
  }

  isCameraAnimating = true;
  const startPos = camera.position.clone();
  const startTarget = controls.target.clone();
  const startFov = camera.fov;

  activeAnimations.push({
    elapsed: 0,
    duration: 0.85,
    update(dt) {
      this.elapsed += dt;
      const t = Math.min(this.elapsed / this.duration, 1);
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      camera.position.lerpVectors(startPos, endPos, ease);
      controls.target.lerpVectors(startTarget, endTarget, ease);
      camera.fov = startFov + (targetFov - startFov) * ease;
      camera.updateProjectionMatrix();
      controls.update();

      if (t >= 1) {
        isCameraAnimating = false;
        return true;
      }
      return false;
    }
  });
}
applyCameraPreset(0, true);

// ==========================================
// 3. TEXTURAS PROCEDURAIS E MATERIAIS
// ==========================================
function createStoneTexture(baseHex, veinHex) {
  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = baseHex; ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = veinHex; ctx.lineWidth = 2;
  for (let i = 0; i < 18; i++) {
    ctx.beginPath();
    let x = Math.random() * 256; let y = Math.random() * 256;
    ctx.moveTo(x, y);
    for (let j = 0; j < 6; j++) {
      x += (Math.random() - 0.5) * 60; y += (Math.random() - 0.5) * 60;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

const marbleTex = createStoneTexture('#f3efe6', '#c5b8a5');
const obsidianTex = createStoneTexture('#16131d', '#3b2d54');

const materials = {
  marble: new THREE.MeshStandardMaterial({ map: marbleTex, roughness: 0.25, metalness: 0.1 }),
  obsidian: new THREE.MeshStandardMaterial({ map: obsidianTex, roughness: 0.18, metalness: 0.45 }),
  runeWhite: new THREE.MeshStandardMaterial({ color: 0xf5c56b, emissive: 0xf5c56b, emissiveIntensity: 1.5 }),
  runeBlack: new THREE.MeshStandardMaterial({ color: 0xb583ff, emissive: 0x9b51e0, emissiveIntensity: 1.8 }),
  stoneDark: new THREE.MeshStandardMaterial({ color: 0x1a1721, roughness: 0.85 }),
  stoneLight: new THREE.MeshStandardMaterial({ color: 0xd8d2c9, roughness: 0.4 })
};

// ==========================================
// 4. ILUMINAÇÃO E CATEDRAL
// ==========================================
const ambientLight = new THREE.AmbientLight(0x9e8cbe, 0.65);
scene.add(ambientLight);

const mainSpot = new THREE.SpotLight(0xfff2d6, 95);
mainSpot.position.set(6, 18, 8);
mainSpot.angle = Math.PI / 4; mainSpot.penumbra = 0.6; mainSpot.castShadow = true;

mainSpot.shadow.mapSize.set(512, 512);
scene.add(mainSpot);

const rimLight = new THREE.DirectionalLight(0x8a5cf5, 1.4);
rimLight.position.set(-10, 8, -10);
scene.add(rimLight);

const flameLights = [];

function buildCathedral() {
  const cathedral = new THREE.Group();
  const floor = new THREE.Mesh(new THREE.CylinderGeometry(28, 28, 0.5, 32), new THREE.MeshStandardMaterial({ color: 0x0e0c12, roughness: 0.9 }));
  floor.position.y = -1.2; floor.receiveShadow = true;
  cathedral.add(floor);

  const altar = new THREE.Mesh(new THREE.CylinderGeometry(7.2, 8.2, 1.2, 8), materials.stoneDark);
  altar.position.y = -0.62; altar.receiveShadow = true;
  cathedral.add(altar);

  const pillarGeo = new THREE.CylinderGeometry(0.65, 0.8, 18, 12);
  const windowGeo = new THREE.PlaneGeometry(1.6, 8.5);
  const windowMat = new THREE.MeshBasicMaterial({ color: 0x6c42b8, side: THREE.DoubleSide, transparent: true, opacity: 0.45 });

  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2; const radius = 17.5;
    const x = Math.cos(angle) * radius; const z = Math.sin(angle) * radius;
    const pillar = new THREE.Mesh(pillarGeo, materials.stoneDark);
    pillar.position.set(x, 7.5, z); pillar.castShadow = true;
    cathedral.add(pillar);

    const winAngle = angle + Math.PI / 12;
    const win = new THREE.Mesh(windowGeo, windowMat);
    win.position.set(Math.cos(winAngle) * (radius + 0.5), 6.5, Math.sin(winAngle) * (radius + 0.5));
    win.lookAt(0, 6.5, 0);
    cathedral.add(win);
  }

  const corners = [[6.2, 6.2], [-6.2, 6.2], [6.2, -6.2], [-6.2, -6.2]];
  corners.forEach(([bx, bz]) => {
    const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.3, 1.4, 8), materials.stoneDark);
    stand.position.set(bx, 0.4, bz); cathedral.add(stand);

    const fireOrb = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32), new THREE.MeshBasicMaterial({ color: 0xffaa33 }));
    fireOrb.position.set(bx, 1.25, bz); cathedral.add(fireOrb);

    const pLight = new THREE.PointLight(0xff8822, 6, 12);
    pLight.position.set(bx, 1.6, bz); cathedral.add(pLight);
    flameLights.push({ light: pLight, orb: fireOrb, baseIntensity: 6, phase: Math.random() * 10 });
  });
  scene.add(cathedral);
}
buildCathedral();

const dustCount = 180;
const dustGeo = new THREE.BufferGeometry();
const dustPositions = new Float32Array(dustCount * 3);
for (let i = 0; i < dustCount * 3; i += 3) {
  dustPositions[i] = (Math.random() - 0.5) * 22;
  dustPositions[i+1] = Math.random() * 10;
  dustPositions[i+2] = (Math.random() - 0.5) * 22;
}
dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
const dustParticles = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0xf5c56b, size: 0.08, transparent: true, opacity: 0.55 }));
scene.add(dustParticles);

// ==========================================
// 5. TABULEIRO
// ==========================================
const boardGroup = new THREE.Group();
scene.add(boardGroup);
const squareMeshes = [];
const highlightGroup = new THREE.Group();
scene.add(highlightGroup);

function boardToWorld(r, c) { return new THREE.Vector3((c - 3.5) * 1.15, 0.1, (r - 3.5) * 1.15); }

function buildBoard() {
  const frame = new THREE.Mesh(new THREE.BoxGeometry(9.8, 0.22, 9.8), materials.stoneDark);
  frame.position.y = -0.05; frame.receiveShadow = true;
  boardGroup.add(frame);
  const sqGeo = new THREE.BoxGeometry(1.12, 0.14, 1.12);
  
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const isLight = (r + c) % 2 === 0;
      
      // Clona o material original para podermos pintar as metades do tabuleiro
      const mat = isLight ? materials.stoneLight.clone() : materials.stoneDark.clone();
      
      // Aplica as cores "apagadas" que desenhou no caderno
      if (r < 4) {
        // Metade das Pretas (Roxo escuro apagado)
        mat.color.lerp(new THREE.Color(0x1a0f2e), isLight ? 0.15 : 0.35);
      } else {
        // Metade das Brancas (Amarelo escuro apagado)
        mat.color.lerp(new THREE.Color(0x6b5c35), isLight ? 0.2 : 0.4);
      }

      const sq = new THREE.Mesh(sqGeo, mat);
      const pos = boardToWorld(r, c);
      sq.position.set(pos.x, 0.02, pos.z); sq.receiveShadow = true;
      sq.userData = { isSquare: true, r, c };
      boardGroup.add(sq); squareMeshes.push(sq);
    }
  }
}
buildBoard();

// ==========================================
// RASTO DA ÚLTIMA JOGADA
// ==========================================
const lastMoveGroup = new THREE.Group();
scene.add(lastMoveGroup);

function showLastMove(fromR, fromC, toR, toC) {
  while (lastMoveGroup.children.length > 0) {
    lastMoveGroup.remove(lastMoveGroup.children[0]);
  }
  const traceMat = new THREE.MeshBasicMaterial({ color: 0xf5c56b, transparent: true, opacity: 0.15, side: THREE.DoubleSide });
  const traceGeo = new THREE.PlaneGeometry(1.1, 1.1);
  traceGeo.rotateX(-Math.PI / 2);

  const fromMarker = new THREE.Mesh(traceGeo, traceMat);
  const fromPos = boardToWorld(fromR, fromC);
  fromMarker.position.set(fromPos.x, 0.10, fromPos.z);
  lastMoveGroup.add(fromMarker);

  const toMarker = new THREE.Mesh(traceGeo, traceMat);
  const toPos = boardToWorld(toR, toC);
  toMarker.position.set(toPos.x, 0.10, toPos.z);
  lastMoveGroup.add(toMarker);
}

// ==========================================
// MARCADOR VISUAL DE XEQUE (ANEL VERMELHO)
// ==========================================
const checkMarkerGeo = new THREE.RingGeometry(0.35, 0.52, 32);
checkMarkerGeo.rotateX(-Math.PI / 2);
const checkMarkerMat = new THREE.MeshBasicMaterial({ color: 0xff0033, side: THREE.DoubleSide, transparent: true, opacity: 0.85 });
const checkMarker = new THREE.Mesh(checkMarkerGeo, checkMarkerMat);
checkMarker.position.y = 0.12; 
checkMarker.visible = false;
scene.add(checkMarker);

// ==========================================
// 6. PEÇAS 3D
// ==========================================
const pieceMeshes = Array.from({ length: 8 }, () => Array(8).fill(null));

function createPieceMesh(type, color) {
  const group = new THREE.Group();
  const mat = color === 'w' ? materials.marble : materials.obsidian;
  const runeMat = color === 'w' ? materials.runeWhite : materials.runeBlack;

  const body = new THREE.Group();
  group.add(body);

  const addTrim = (y, radius, thick = 0.015, segments = 32) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, thick, 4, segments), runeMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = y;
    body.add(ring);
  };

  // Pedestal Clássico (Estilo Staunton) para todas as peças
  const createBase = () => {
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.35, 0.25, 32), mat);
    base.position.y = 0.125;
    body.add(base);
    addTrim(0.05, 0.33); 
  };

  if (type === 'P') {
    createBase();
    // Colarinho e cabeça esférica clássica
    const mid = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.2, 0.4, 32), mat);
    mid.position.y = 0.45;
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.03, 16, 32), mat);
    collar.rotation.x = Math.PI / 2; 
    collar.position.y = 0.65;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.16, 32, 16), mat);
    head.position.y = 0.82;
    body.add(mid, collar, head);
    addTrim(0.65, 0.14); // Brilho no colarinho
  } 
  else if (type === 'R') {
    createBase();
    // Torre (Castelo)
    const mid = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.5, 32), mat);
    mid.position.y = 0.5;
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.03, 16, 32), mat);
    collar.rotation.x = Math.PI / 2; 
    collar.position.y = 0.75;
    const top = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 0.2, 32), mat);
    top.position.y = 0.85;
    // Fosso luminoso no topo (substitui as ameias clássicas por energia)
    const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.05, 32), runeMat);
    hole.position.y = 0.95;
    body.add(mid, collar, top, hole);
    addTrim(0.75, 0.22); 
  } 
  else if (type === 'N') {
    createBase(); // Mantém a base circular padrão
    
    const horseHead = new THREE.Group();
    horseHead.position.y = 0.25; 

    // Forma lateral exata do desenho (perfil do cavalo geométrico)
    const shape = new THREE.Shape();
    shape.moveTo(-0.22, 0); 
    shape.lineTo(0.22, 0);  
    shape.lineTo(0.25, 0.45); 
    shape.lineTo(0.38, 0.55); // Focinho quadrado/geométrico
    shape.lineTo(0.38, 0.65); 
    shape.lineTo(0.25, 0.68); 
    shape.lineTo(0.08, 0.92); // Topo da cabeça / orelha pontiaguda do desenho
    shape.lineTo(-0.25, 0.65); // nuca inclinada para trás
    shape.lineTo(-0.22, 0);

    const extrudeSettings = { depth: 0.18, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.02, bevelSegments: 4 };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.translate(0, 0, -0.09); 
    
    const mainBody = new THREE.Mesh(geometry, mat);
    horseHead.add(mainBody);

    // Orelha pontiaguda no topo exatamente como no rascunho
    const earShape = new THREE.Shape();
    earShape.moveTo(0, 0);
    earShape.lineTo(0.06, 0.18);
    earShape.lineTo(-0.04, 0.12);
    earShape.closePath();
    const earGeom = new THREE.ExtrudeGeometry(earShape, { depth: 0.06, bevelEnabled: false });
    earGeom.translate(0.02, 0.88, -0.03);
    const earMesh = new THREE.Mesh(earGeom, mat);
    horseHead.add(earMesh);

    // Riscas horizontais amarelas/runas no pescoço (exatamente como desenhou)
    const stripeYValues = [0.22, 0.35, 0.48, 0.61];
    stripeYValues.forEach((yPos) => {
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.025, 0.2), runeMat);
      stripe.position.set(0.05, yPos, 0);
      horseHead.add(stripe);
    });

    // Crina riscada na parte de trás
    for(let i = 0; i < 5; i++) {
       const t = i / 4;
       const ridge = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.025, 0.16), runeMat); 
       ridge.position.set(-0.2 - (t * 0.05), 0.75 - (t * 0.5), 0);
       ridge.rotation.z = -0.4;
       horseHead.add(ridge);
    }

    horseHead.rotation.y = -Math.PI / 2; 
    body.add(horseHead);
  }
  else if (type === 'B') {
    createBase();
    // Mitra alongada com a fenda luminosa característica
    const mid = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.2, 0.6, 32), mat);
    mid.position.y = 0.55;
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.03, 16, 32), mat);
    collar.rotation.x = Math.PI / 2; 
    collar.position.y = 0.85;
    
    const mitre = new THREE.Mesh(new THREE.SphereGeometry(0.14, 32, 16), mat);
    mitre.scale.set(1, 1.5, 1); // Alonga a esfera para criar a mitra
    mitre.position.y = 1.05;
    
    const cut = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.15, 0.15), runeMat);
    cut.position.set(0, 1.1, 0.1);
    cut.rotation.x = Math.PI / 4; // Fenda diagonal
    
    const finial = new THREE.Mesh(new THREE.SphereGeometry(0.04, 16, 16), runeMat);
    finial.position.y = 1.3;
    
    body.add(mid, collar, mitre, cut, finial);
    addTrim(0.85, 0.16);
  } 
  else if (type === 'Q') {
    createBase();
    // Coroa alargada
    const mid = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.2, 0.8, 32), mat);
    mid.position.y = 0.65;
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.03, 16, 32), mat);
    collar.rotation.x = Math.PI / 2; 
    collar.position.y = 1.05;
    
    const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.12, 0.25, 32), mat);
    crown.position.y = 1.2;
    const finial = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), runeMat);
    finial.position.y = 1.35;
    
    body.add(mid, collar, crown, finial);
    addTrim(1.05, 0.2);
    addTrim(1.32, 0.22); 
  } 
  else if (type === 'K') {
    createBase();
    // Mais alto, coroa direita e a cruz
    const mid = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.22, 0.9, 32), mat);
    mid.position.y = 0.7;
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.03, 16, 32), mat);
    collar.rotation.x = Math.PI / 2; 
    collar.position.y = 1.15;
    
    const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.14, 0.2, 32), mat);
    crown.position.y = 1.25;
    
    const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.2, 0.04), runeMat);
    crossV.position.y = 1.45;
    const crossH = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.04, 0.04), runeMat);
    crossH.position.y = 1.45;
    
    body.add(mid, collar, crown, crossV, crossH);
    addTrim(1.15, 0.22);  
  }

  group.traverse((child) => { if (child.isMesh) child.castShadow = true; });
  group.userData = { type, color, body, phase: Math.random() * Math.PI * 2 };
  
  if (color === 'b') {
    group.rotation.y = Math.PI;
  }
  
  return group;
}
// ==========================================
// SINCRONIZAÇÃO DAS PEÇAS NO TABULEIRO
// ==========================================

function syncBoardMeshes() {
  if (typeof pieceMeshes !== 'undefined') {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (pieceMeshes[r] && pieceMeshes[r][c]) {
          scene.remove(pieceMeshes[r][c]);
        }
      }
    }
  }

  
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (pieceMeshes[r]) {
        pieceMeshes[r][c] = null;
      }
    }
  }

  // 3. Lê o tabuleiro matemático e cria os novos modelos 3D
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const pieceData = engine.board[r][c];
      if (pieceData) {
        const mesh = createPieceMesh(pieceData.type, pieceData.color);
        const pos = boardToWorld(r, c);
        mesh.position.copy(pos);
        mesh.userData.r = r;
        mesh.userData.c = c;
        scene.add(mesh);
        if (pieceMeshes[r]) {
          pieceMeshes[r][c] = mesh;
        }
      }
    }
  }
}

// ==========================================
// CEMITÉRIO E HUD
// ==========================================

// Função auxiliar que força a animação a correr
function triggerCaptureFlash(element) {
  element.classList.remove('capture-pulse');
  void element.offsetWidth; // Truque para forçar o navegador a reiniciar a animação
  element.classList.add('capture-pulse');
}

function updateGraveyard() {
  const graveW = document.getElementById('grave-w');
  const graveB = document.getElementById('grave-b');
  if (!graveW || !graveB) return;

  const initial = { P: 8, N: 2, B: 2, R: 2, Q: 1 };
  const current = { w: { P: 0, N: 0, B: 0, R: 0, Q: 0 }, b: { P: 0, N: 0, B: 0, R: 0, Q: 0 } };

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = engine.board[r][c];
      if (p && p.type !== 'K') current[p.color][p.type]++;
    }
  }

  const symbols = { P: '♟', N: '♞', B: '♝', R: '♜', Q: '♛' };
  const order = ['P', 'N', 'B', 'R', 'Q'];
  let wHTML = ''; let bHTML = '';
  
  order.forEach(type => {
    for (let i = 0; i < (initial[type] - current.w[type]); i++) wHTML += symbols[type];
    for (let i = 0; i < (initial[type] - current.b[type]); i++) bHTML += symbols[type];
  });

  // Se o texto antigo for menor que o novo, significa que capturou uma peça!
  if (graveW.textContent.length < wHTML.length) triggerCaptureFlash(graveW);
  if (graveB.textContent.length < bHTML.length) triggerCaptureFlash(graveB);

  graveW.textContent = wHTML;
  graveB.textContent = bHTML;
}

function updateHUD() {
  if (turnBanner) {
    const isWhite = engine.turn === 'w';
    turnBanner.textContent = isWhite ? 'Turno: Mármore (Brancas)' : 'Turno: Obsidiana (Pretas)';
  }
  
  const checkWarning = document.getElementById('check-warning');
  if (checkWarning) {
    if (engine.isInCheck(engine.turn)) {
      checkWarning.classList.remove('hidden');
    } else {
      checkWarning.classList.add('hidden');
    }
  }

  // --- LÓGICA DO MARCADOR 3D DE XEQUE ---
  checkMarker.visible = false; 
  const colors = ['w', 'b'];
  for (let color of colors) {
    if (engine.isInCheck(color)) {
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          const p = engine.board[r][c];
          if (p && p.type === 'K' && p.color === color) {
            const pos = boardToWorld(r, c);
            checkMarker.position.set(pos.x, 0.12, pos.z);
            checkMarker.visible = true;
            break;
          }
        }
      }
    }
  }

  updateGraveyard();
}

// ==========================================
// LÓGICA DE FIM E PROMOÇÃO
// ==========================================
function checkGameOver() {
  const modal = document.getElementById('game-over-modal');
  const title = document.getElementById('game-over-title');
  const msg = document.getElementById('game-over-msg');

  if (engine.isInsufficientMaterial()) {
    if (modal && title && msg) {
      modal.classList.remove('hidden');
      title.textContent = 'Empate!';
      msg.textContent = 'Apenas os Reis sobreviveram (Material Insuficiente).';
    }
    return true;
  }

  let hasMoves = false;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = engine.board[r][c];
      if (p && p.color === engine.turn) {
        if (engine.getLegalMoves(r, c).length > 0) { hasMoves = true; break; }
      }
    }
    if (hasMoves) break;
  }
  
  if (!hasMoves) {
    const inCheck = engine.isInCheck(engine.turn);
    if (modal && title && msg) {
      modal.classList.remove('hidden');
      title.textContent = inCheck ? 'Xeque-Mate!' : 'Empate!';
      msg.textContent = inCheck ? (engine.turn === 'w' ? 'A Obsidiana venceu!' : 'O Mármore venceu!') : 'O Rei está afogado.';
    }
    return true;
  }
  return false;
}

function promotePawn(type, r, c, pieceData, oldMesh, targetPos) {
  pieceData.type = type; scene.remove(oldMesh);
  const newMesh = createPieceMesh(type, pieceData.color);
  newMesh.position.copy(targetPos); scene.add(newMesh); pieceMeshes[r][c] = newMesh;
}

function openPromotionModal(callback) {
  const modal = document.getElementById('promotion-modal');
  if (!modal) {
    callback('Q'); return;
  }
  modal.classList.remove('hidden');
  const handleChoice = (e) => {
    const btn = e.target.closest('.promo-btn');
    if (!btn) return;
    const type = btn.getAttribute('data-type');
    if (type) {
      modal.classList.add('hidden');
      document.querySelectorAll('.promo-btn').forEach(b => b.removeEventListener('click', handleChoice));
      callback(type);
    }
  };
  document.querySelectorAll('.promo-btn').forEach(btn => btn.addEventListener('click', handleChoice));
}

// ==========================================
// 7. FÍSICA E ANIMAÇÕES
// ==========================================
const activeShards = [];
const activeAnimations = [];

function shatterPieceAt(worldPos, color) {
  sfx.playShatter();
  const isWhite = color === 'w';
  const runeMat = isWhite ? materials.runeWhite : materials.runeBlack;

  // Cria 40 faíscas mágicas brilhantes
  for (let i = 0; i < 40; i++) {
    // Formato de faísca (pequenos octaedros)
    const spark = new THREE.Mesh(new THREE.OctahedronGeometry(0.03 + Math.random() * 0.05, 0), runeMat);
    
    // Distribui as faíscas pela altura da peça
    spark.position.copy(worldPos);
    spark.position.y += 0.15 + Math.random() * 1.2; 
    spark.position.x += (Math.random() - 0.5) * 0.4;
    spark.position.z += (Math.random() - 0.5) * 0.4;
    
    scene.add(spark);

    const angle = Math.random() * Math.PI * 2;
    const speed = 0.5 + Math.random() * 1.5;

    activeShards.push({
      mesh: spark,
      life: 1.5,       // Duração exata de 1.5 segundos
      maxLife: 1.5,
      // Velocidade: explodem ligeiramente para os lados e flutuam para cima
      vel: new THREE.Vector3(Math.cos(angle) * speed, 0.5 + Math.random() * 1.5, Math.sin(angle) * speed),
      rot: new THREE.Vector3(Math.random() * 10, Math.random() * 10, Math.random() * 10)
    });
  }
}

function executeMove(from, to, onComplete) {
  // Guarda o estado antes da peça começar a voar
  if (typeof engine.saveState === 'function') engine.saveState();
  isAnimating = true; clearHighlights();
  const attackerMesh = pieceMeshes[from.r][from.c];
  const pieceData = engine.board[from.r][from.c];
  const isEnPassant = !!to.enPassant;
  let victimMesh = pieceMeshes[to.r][to.c];
  if (isEnPassant) victimMesh = pieceMeshes[from.r][to.c];

  const startPos = attackerMesh.position.clone();
  const targetPos = boardToWorld(to.r, to.c);
  const isKnight = pieceData.type === 'N';
  sfx.playSlide();
  const isCastling = !!to.castling;
  
  if (isCastling) {
    const rookFromC = to.castling === 'kingside' ? 7 : 0;
    const rookToC = to.castling === 'kingside' ? 5 : 3;
    const rookMesh = pieceMeshes[from.r][rookFromC];
    const rStart = rookMesh.position.clone();
    const rTarget = boardToWorld(to.r, rookToC);
    
    // Anima a Torre ao mesmo tempo que o Rei
    activeAnimations.push({
      elapsed: 0, duration: 0.48,
      update(dt) {
        this.elapsed += dt;
        let rt = Math.min(this.elapsed / this.duration, 1);
        const ease = rt < 0.5 ? 2 * rt * rt : 1 - Math.pow(-2 * rt + 2, 2) / 2;
        rookMesh.position.lerpVectors(rStart, rTarget, ease);
        if (rt >= 1) { rookMesh.position.copy(rTarget); return true; }
        return false;
      }
    });
  }

  const isCapture = !!victimMesh;
  const duration = isCapture ? 0.85 : 0.48;
  let impactTriggered = false;

  activeAnimations.push({
    elapsed: 0, duration,
    update(dt) {
      this.elapsed += dt;
      let t = Math.min(this.elapsed / this.duration, 1);

      if (isCapture) {
        let moveT;
        if (t < 0.3) {
          const windUp = (t / 0.3); moveT = -0.15 * Math.sin(windUp * Math.PI / 2);
          attackerMesh.userData.body.rotation.x = -0.4 * Math.sin(windUp * Math.PI / 2);
        } else if (t < 0.5) {
          const dashT = (t - 0.3) / 0.2; moveT = dashT;
          attackerMesh.userData.body.rotation.x = -0.4 + (0.9 * dashT);
        } else {
          moveT = 1; const recT = (t - 0.5) / 0.5;
          attackerMesh.userData.body.rotation.x = 0.5 * Math.exp(-recT * 6) * Math.cos(recT * 25);
        }
        if (moveT >= 0) attackerMesh.position.lerpVectors(startPos, targetPos, moveT);
        else attackerMesh.position.copy(startPos).add(targetPos.clone().sub(startPos).normalize().multiplyScalar(moveT));
        
        if (isKnight) attackerMesh.position.y = 0.1 + Math.sin(Math.max(0, moveT) * Math.PI) * 1.45;

        if (t >= 0.5 && !impactTriggered) {
          impactTriggered = true;
          shatterPieceAt(targetPos, victimMesh.userData.color); scene.remove(victimMesh);
          const shatterPos = isEnPassant ? boardToWorld(from.r, to.c) : targetPos;
          shatterPieceAt(shatterPos, victimMesh.userData.color); 
          scene.remove(victimMesh);
        }
      }
      else {
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        attackerMesh.position.lerpVectors(startPos, targetPos, ease);
        if (isKnight) attackerMesh.position.y = 0.1 + Math.sin(t * Math.PI) * 1.45;
      }

     if (t >= 1) {
        attackerMesh.position.copy(targetPos); attackerMesh.userData.body.rotation.x = 0;
        engine.board[to.r][to.c] = pieceData; engine.board[from.r][from.c] = null; pieceData.moved = true;

        // Apaga a vítima da memória matemática se for En Passant
        if (isEnPassant) engine.board[from.r][to.c] = null;

        const finalizeTurn = () => {
          if (isCastling) {
            const rFrom = to.castling === 'kingside' ? 7 : 0;
            const rTo = to.castling === 'kingside' ? 5 : 3;
            pieceMeshes[from.r][rTo] = pieceMeshes[from.r][rFrom];
            pieceMeshes[from.r][rFrom] = null;
            pieceMeshes[from.r][rTo].userData.c = rTo;
            engine.board[from.r][rTo] = engine.board[from.r][rFrom];
            engine.board[from.r][rFrom] = null;
            engine.board[from.r][rTo].moved = true;
          }

          // GRAVA A MEMÓRIA DO TURNO (Necessário para o próximo En Passant)
          engine.lastMove = { from: {r: from.r, c: from.c}, to: {r: to.r, c: to.c}, piece: pieceData };

          pieceMeshes[from.r][from.c] = null;
          pieceMeshes[to.r][to.c].userData.r = to.r; pieceMeshes[to.r][to.c].userData.c = to.c;
          
          // Apaga a vítima visualmente
          if (isEnPassant) pieceMeshes[from.r][to.c] = null;
          
          engine.turn = engine.turn === 'w' ? 'b' : 'w';

          // =====================================
          // REGISTO DO HISTÓRICO DE JOGADAS
          // =====================================
          const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
          const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
          let note = '';
          
          if (isCastling) {
            // Registo do Roque
            note = to.castling === 'kingside' ? 'O-O' : 'O-O-O';
          } else {
            const pt = pieceData.type === 'P' ? '' : pieceData.type;
            const cap = (to.capture || isEnPassant) ? 'x' : '';
            const sf = (pieceData.type === 'P' && cap) ? files[from.c] : ''; // Peões mostram de que coluna saíram ao capturar
            const endSquare = files[to.c] + ranks[to.r];
            
            // Registo de Promoção (Vê na board qual é a nova peça)
            let promo = '';
            const currentPiece = engine.board[to.r][to.c];
            if (pieceData.type === 'P' && currentPiece && currentPiece.type !== 'P') {
              promo = '=' + currentPiece.type;
            }
            note = `${pt}${sf}${cap}${endSquare}${promo}`;
          }
          
          // Adiciona o '+' se a jogada deixou o inimigo em Xeque
          if (engine.isInCheck(engine.turn)) note += '+';

          // Escreve no Painel HTML
          const histList = document.getElementById('history-list');
          if (histList) {
            if (pieceData.color === 'w') {
              // As Brancas iniciam uma nova linha numerada (<ol> cuida do número sozinho)
              const li = document.createElement('li');
              li.innerHTML = `<span style="color:#f5c56b">${note}</span>`;
              histList.appendChild(li);
            } else {
              // As Pretas escrevem na mesma linha, à frente das brancas
              if (histList.lastElementChild) {
                histList.lastElementChild.innerHTML += ` &nbsp;&nbsp;<span style="color:#b583ff">${note}</span>`;
              }
            }
            // Faz o scroll descer automaticamente para a jogada mais recente
            if (historyPanel) historyPanel.scrollTop = historyPanel.scrollHeight;
          }
          
          showLastMove(from.r, from.c, to.r, to.c);
          updateHUD(); isAnimating = false;

          // Avisa a nuvem (incluindo se foi um Roque ou En Passant)
          if (isOnlineGame && roomId && pieceData.color === myColor) {
             window.dbUpdate(window.dbRef(window.db, `rooms/${roomId}`), {
               lastMove: {
                 color: myColor,
                 from: { r: from.r, c: from.c },
                 to: { r: to.r, c: to.c, capture: !!to.capture, promote: to.promote || null, castling: to.castling || null, enPassant: to.enPassant || null },
                 time: Date.now()
               }
             });
          }

          if (!checkGameOver() && onComplete) onComplete();
        };

        if (pieceData.type === 'P' && (to.r === 0 || to.r === 7)) {
          if (vsAI && pieceData.color === 'b') { promotePawn('Q', to.r, to.c, pieceData, attackerMesh, targetPos); finalizeTurn(); } 
          else { openPromotionModal((cType) => { promotePawn(cType, to.r, to.c, pieceData, attackerMesh, targetPos); finalizeTurn(); }); }
        } else {
          pieceMeshes[to.r][to.c] = attackerMesh; finalizeTurn();
        }
        return true;
      }
      return false;
    }
  });
}

// ==========================================
// 8. INTERAÇÃO (HOVER, CLIQUES E RAIOS)
// ==========================================
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

// Marcador de Hover
const hoverMarker = new THREE.Mesh(
  new THREE.PlaneGeometry(1.1, 1.1),
  new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12, side: THREE.DoubleSide })
);
hoverMarker.rotation.x = -Math.PI / 2;
hoverMarker.position.y = 0.11;
hoverMarker.visible = false;
scene.add(hoverMarker);

function clearHighlights() { while (highlightGroup.children.length > 0) highlightGroup.remove(highlightGroup.children[0]); }

function showHighlights(r, c, moves, isHint = false) {
  clearHighlights();
  const ringGeo = new THREE.RingGeometry(0.32, 0.46, 24); ringGeo.rotateX(-Math.PI / 2);
  const selMarker = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: isHint ? 0x00f5d4 : 0xf5c56b, side: THREE.DoubleSide }));
  const selPos = boardToWorld(r, c); selMarker.position.set(selPos.x, 0.11, selPos.z); highlightGroup.add(selMarker);
  moves.forEach((m) => {
    const marker = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: m.capture ? 0xff4d6d : isHint ? 0x00f5d4 : 0xd0bcff, side: THREE.DoubleSide }));
    const pos = boardToWorld(m.r, m.c); marker.position.set(pos.x, 0.11, pos.z); highlightGroup.add(marker);
  });
}

function checkAITurn() {
  if (isPaused) return; // Nova trava de segurança
  if (vsAI && engine.turn === 'b' && !isAnimating) {
    setTimeout(() => {
      const aiMove = engine.chooseBestMove('b', aiDifficulty);
      if (aiMove) executeMove(aiMove.from, aiMove.to, checkAITurn);
    }, 420);
  }
}

renderer.domElement.addEventListener('pointermove', (e) => {
  // Verificações de segurança (Pausa e Animações)
  if (typeof isPaused !== 'undefined' && isPaused) return;
  if (isAnimating || isCameraAnimating) {
    hoverMarker.visible = false;
    document.body.style.cursor = 'default';
    return;
  }

  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  // A LINHA CRÍTICA: Inicializa a variável antes de a usar
  let hoveredRC = null;

  for (const hit of intersects) {
    let obj = hit.object;
    while (obj) {
      if (obj.userData && typeof obj.userData.r === 'number') {
        hoveredRC = { r: obj.userData.r, c: obj.userData.c };
        break;
      }
      obj = obj.parent;
    }
    if (hoveredRC) break;
  }

  if (hoveredRC) {
    const pos = boardToWorld(hoveredRC.r, hoveredRC.c);
    hoverMarker.position.set(pos.x, 0.11, pos.z); // Altura de 0.11 para evitar o piscar
    hoverMarker.visible = true;
    document.body.style.cursor = 'pointer';
  } else {
    hoverMarker.visible = false;
    document.body.style.cursor = 'default';
  }
});

renderer.domElement.addEventListener('pointerdown', (e) => {
  if (isPaused ||isAnimating || isCameraAnimating) return;
  // BLOQUEIOS DE SEGURANÇA
  if (vsAI && engine.turn === 'b') return; 
  if (isOnlineGame) {
    // Se for um jogo online, só pode clicar se for o seu turno e só nas SUAS peças
    if (engine.turn !== myColor) return;
  }

  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1; pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  let clickedRC = null;
  for (const hit of intersects) {
    let obj = hit.object;
    while (obj) { if (obj.userData && typeof obj.userData.r === 'number') { clickedRC = { r: obj.userData.r, c: obj.userData.c }; break; } obj = obj.parent; }
    if (clickedRC) break;
  }

  if (!clickedRC) { selectedSquare = null; validMoves = []; clearHighlights(); return; }

  const chosenMove = validMoves.find((m) => m.r === clickedRC.r && m.c === clickedRC.c);
  if (selectedSquare && chosenMove) {
    const from = selectedSquare; selectedSquare = null; validMoves = [];
    executeMove(from, chosenMove, checkAITurn);
    return;
  }

  const clickedPiece = engine.board[clickedRC.r][clickedRC.c];
  if (clickedPiece && clickedPiece.color === engine.turn && (!isOnlineGame || clickedPiece.color === myColor)) {
    selectedSquare = clickedRC; 
    validMoves = engine.getLegalMoves ? engine.getLegalMoves(clickedRC.r, clickedRC.c) : engine.getValidMoves(clickedRC.r, clickedRC.c);
    showHighlights(clickedRC.r, clickedRC.c, validMoves);
  } else { selectedSquare = null; validMoves = []; clearHighlights(); }
});

// ==========================================
// 9. EVENTOS DOS BOTÕES DA BARRA (COM PROTEÇÃO)
// ==========================================

const btnUndo = document.getElementById('btn-undo');
if (btnUndo) {
  btnUndo.addEventListener('click', () => {
    // Por segurança, bloqueamos o Undo se estiver num jogo online ou a meio de uma animação
    if (isOnlineGame || isAnimating || !engine.history || engine.history.length === 0) return;
    
    engine.undo();
    
    // Se jogar contra a IA, o botão tem de recuar o turno dela E o seu turno
    if (vsAI && engine.turn === 'b' && engine.history.length > 0) {
      engine.undo();
    }

    // Apaga a última linha escrita no painel de Histórico
    const histList = document.getElementById('history-list');
    if (histList && histList.lastElementChild && engine.turn === 'w') {
      histList.removeChild(histList.lastElementChild);
    }

    // Limpa o rasto amarelo do chão
    while (lastMoveGroup.children.length > 0) lastMoveGroup.remove(lastMoveGroup.children[0]);
    selectedSquare = null; validMoves = []; clearHighlights();
    
    // Força o motor 3D a apagar e a reconstruir as peças no lugar antigo
    syncBoardMeshes(); 
  });
}

const btnHistory = document.getElementById('btn-history');
const historyPanel = document.getElementById('history-panel');

if (btnHistory && historyPanel) {
  // Força a placa a começar 100% invisível ao carregar o jogo
  historyPanel.style.display = 'none';

  btnHistory.addEventListener('click', (e) => {
    // Alterna manualmente a visibilidade e o brilho do botão
    if (historyPanel.style.display === 'none') {
      historyPanel.style.display = 'block';
      e.currentTarget.classList.add('active');
    } else {
      historyPanel.style.display = 'none';
      e.currentTarget.classList.remove('active');
    }
  });
}

const btnPause = document.getElementById('btn-pause');
const pauseModal = document.getElementById('pause-modal');
const btnResume = document.getElementById('btn-resume');

if (btnPause && pauseModal && btnResume) {
  btnPause.addEventListener('click', () => {
    isPaused = true;
    pauseModal.classList.remove('hidden');
  });

  btnResume.addEventListener('click', () => {
    isPaused = false;
    pauseModal.classList.add('hidden');
    checkAITurn(); // Se for o turno da IA, ela retoma o pensamento
  });
}

const btnStartGame = document.getElementById('btn-start-game');
if (btnStartGame) {
  btnStartGame.addEventListener('click', () => {
    document.getElementById('start-menu').classList.add('hidden');
    sfx.init(); 
  });
}

const btnMode = document.getElementById('btn-mode');
if (btnMode) {
  btnMode.addEventListener('click', (e) => {
    vsAI = !vsAI; e.currentTarget.classList.toggle('active', vsAI);
    e.currentTarget.querySelector('.btn-label').textContent = vsAI ? 'vs IA' : '2 Jogadores';
    checkAITurn();
  });
}

const btnDiff = document.getElementById('btn-diff');
if (btnDiff) {
  btnDiff.addEventListener('click', (e) => {
    aiDifficulty = aiDifficulty >= 3 ? 1 : aiDifficulty + 1;
    const nomesDiff = { 1: 'Fácil', 2: 'Média', 3: 'Difícil' };
    e.currentTarget.querySelector('.btn-label').textContent = 'IA: ' + nomesDiff[aiDifficulty];
    
    const icon = e.currentTarget.querySelector('.material-symbols-rounded');
    
    // ALTERA A ILUMINAÇÃO DA CATEDRAL CONFORME O PERIGO
    if (aiDifficulty === 1) {
      icon.style.color = '#00f5d4';
      ambientLight.color.setHex(0x9e8cbe); // Normal
      ambientLight.intensity = 0.65;
    } else if (aiDifficulty === 2) {
      icon.style.color = '#d0bcff';
      ambientLight.color.setHex(0x8a5cf5); // Roxo Mágico (Médio)
      ambientLight.intensity = 0.9;
    } else {
      icon.style.color = '#ff4d6d';
      ambientLight.color.setHex(0xff0033); // Vermelho Ameaçador (Difícil)
      ambientLight.intensity = 0.5; // Fica mais sombrio
    }
  });
}

const btnCam = document.getElementById('btn-cam');
if (btnCam) {
  btnCam.addEventListener('click', () => {
    cameraPresetIndex = (cameraPresetIndex + 1) % CAMERA_PRESETS.length;
    applyCameraPreset(cameraPresetIndex);
  });
}

const btnHint = document.getElementById('btn-hint');
if (btnHint) {
  btnHint.addEventListener('click', () => {
    if (isAnimating || isCameraAnimating) return;
    const best = engine.chooseBestMove(engine.turn, aiDifficulty);
    if (best) { selectedSquare = best.from; validMoves = [best.to]; showHighlights(best.from.r, best.from.c, [best.to], true); }
  });
}

const btnDemo = document.getElementById('btn-demo');
if (btnDemo) {
  btnDemo.addEventListener('click', () => {
    if (isAnimating || isCameraAnimating) return;
    const best = engine.chooseBestMove(engine.turn, 2);
    if (best && best.to.capture) { executeMove(best.from, best.to, checkAITurn); return; }
  });
}

const btnFullscreen = document.getElementById('btn-fullscreen');
if (btnFullscreen) {
  btnFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        // Força o telemóvel a deitar a tela automaticamente
        if (screen.orientation && screen.orientation.lock) {
          screen.orientation.lock('landscape').catch(e => console.log('Bloqueio de orientação não suportado neste aparelho.'));
        }
      }).catch(err => { 
        console.log(`Erro ao tentar entrar em tela cheia: ${err.message}`); 
      });
    } else {
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock(); // Liberta a rotação ao sair
      }
      document.exitFullscreen();
    }
  });
  
  document.addEventListener('fullscreenchange', () => {
    const icon = btnFullscreen.querySelector('.material-symbols-rounded');
    if (document.fullscreenElement) {
      icon.textContent = 'fullscreen_exit'; btnFullscreen.classList.add('active');
    } else {
      icon.textContent = 'fullscreen'; btnFullscreen.classList.remove('active');
    }
  });
}
  document.addEventListener('fullscreenchange', () => {
    const icon = btnFullscreen.querySelector('.material-symbols-rounded');
    if (document.fullscreenElement) {
      icon.textContent = 'fullscreen_exit'; btnFullscreen.classList.add('active');
    } else {
      icon.textContent = 'fullscreen'; btnFullscreen.classList.remove('active');
    }
  });

const btnAudio = document.getElementById('btn-audio');
if (btnAudio) {
  btnAudio.addEventListener('click', (e) => {
    sfx.enabled = !sfx.enabled; e.currentTarget.classList.toggle('active', sfx.enabled);
    e.currentTarget.querySelector('.material-symbols-rounded').textContent = sfx.enabled ? 'volume_up' : 'volume_off';
  });
}

const btnReset = document.getElementById('btn-reset');
if (btnReset) {
  btnReset.addEventListener('click', () => {
    if (isAnimating) return;
    
    // Se for online, envia o comando de reiniciar para a nuvem
    if (isOnlineGame && roomId) {
      window.dbUpdate(window.dbRef(window.db, `rooms/${roomId}`), { reset: Date.now() });
    } else {
      // Reinício normal (offline)
      selectedSquare = null; validMoves = []; clearHighlights();
      while (lastMoveGroup.children.length > 0) lastMoveGroup.remove(lastMoveGroup.children[0]);
      engine.reset(); syncBoardMeshes();
      const hl = document.getElementById('history-list'); 
      if (hl) hl.innerHTML = ''; // Limpa o histórico
    }
  });
}

const btnPlayAgain = document.getElementById('btn-play-again');
if (btnPlayAgain) {
  btnPlayAgain.addEventListener('click', () => {
    document.getElementById('game-over-modal').classList.add('hidden');
    if (document.getElementById('btn-reset')) document.getElementById('btn-reset').click();
  });
}

window.addEventListener('resize', () => {
  // Recalcula a lente para não esticar a imagem
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  applyCameraPreset(cameraPresetIndex, true);
});

// ==========================================
// 10. SISTEMA MULTIJOGADOR ONLINE (FIREBASE)
// ==========================================
let lastResetTime = null;

function initOnlineGame() {
  const urlParams = new URLSearchParams(window.location.search);
  const room = urlParams.get('room');

  const btnOnline = document.getElementById('btn-online');
  const waitingModal = document.getElementById('waiting-modal');

  // Memória: Verifica se foi você que criou esta sala
  const isCreator = sessionStorage.getItem('myRoom') === room;

  // JOGADOR 2: Entrou pelo link
  if (room && !isCreator) {
    const startMenu = document.getElementById('start-menu');
    if (startMenu) startMenu.classList.add('hidden');
    isOnlineGame = true; roomId = room; myColor = 'b'; vsAI = false;
    if (window.dbUpdate && window.db) window.dbUpdate(window.dbRef(window.db, `rooms/${roomId}`), { player2Joined: true });
    listenToRoom(roomId);
    applyCameraPreset(1, true); 
  } 
  // JOGADOR 1: Recarregou a página da sua própria sala
  else if (room && isCreator) {
    const startMenu = document.getElementById('start-menu');
    if (startMenu) startMenu.classList.add('hidden');
    isOnlineGame = true; roomId = room; myColor = 'w'; vsAI = false;
    listenToRoom(roomId);
    if (waitingModal) waitingModal.classList.remove('hidden'); 
    
    const linkInput = document.getElementById('room-link-input');
    if (linkInput) linkInput.value = window.location.href;
    if (btnOnline) btnOnline.classList.add('active');
  }

  // O NOVO BOTÃO DA BARRA INFERIOR
  if (btnOnline) {
    btnOnline.addEventListener('click', () => {
      // Prepara o tabuleiro localmente para garantir que começa limpo
      if (typeof engine !== 'undefined') engine.reset();
      if (typeof syncBoardMeshes === 'function') syncBoardMeshes();
      
      isOnlineGame = true; myColor = 'w'; vsAI = false;
      roomId = Math.random().toString(36).substring(2, 9); 
      
      sessionStorage.setItem('myRoom', roomId);

      if (window.dbSet && window.db) {
        window.dbSet(window.dbRef(window.db, `rooms/${roomId}`), {
          player2Joined: false, lastMove: null, reset: null
        });
      }

      window.history.replaceState(null, '', `?room=${roomId}`);
      
      const startMenu = document.getElementById('start-menu');
      if (startMenu) startMenu.classList.add('hidden');
      
      if (waitingModal) waitingModal.classList.remove('hidden');
      
      const linkInput = document.getElementById('room-link-input');
      if (linkInput) linkInput.value = window.location.href;

      const btnCopy = document.getElementById('btn-copy-link');
      if (btnCopy) {
        btnCopy.addEventListener('click', () => {
          navigator.clipboard.writeText(window.location.href);
          btnCopy.textContent = "Link Copiado!";
          btnCopy.style.background = "#00f5d4";
          btnCopy.style.color = "#000";
        });
      }

      btnOnline.classList.add('active'); // Ilumina o botão
      listenToRoom(roomId);
    });
  }
}

function listenToRoom(id) {
  if (!window.dbOnValue || !window.db) return;
  
  const roomRef = window.dbRef(window.db, `rooms/${id}`);
  window.dbOnValue(roomRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    if (data.player2Joined) {
      const waitingModal = document.getElementById('waiting-modal');
      if (waitingModal) waitingModal.classList.add('hidden');
    }

    if (data.reset && data.reset !== lastResetTime) {
      lastResetTime = data.reset;
      selectedSquare = null; validMoves = []; clearHighlights();
      while (lastMoveGroup.children.length > 0) lastMoveGroup.remove(lastMoveGroup.children[0]);
      engine.reset(); syncBoardMeshes();
      
      const gameOverModal = document.getElementById('game-over-modal');
      if (gameOverModal) gameOverModal.classList.add('hidden');
    }

    if (data.lastMove && data.lastMove.turn !== myColor) {
      const from = data.lastMove.from; const to = data.lastMove.to;
      const pieceData = engine.board[from.r][from.c];
      if (pieceData && pieceData.color !== myColor) {
         executeMove(from, to, null); 
      }
    }
  });
}

setTimeout(initOnlineGame, 500);
// ==========================================
// 11. LOOP DE ANIMAÇÃO
// ==========================================
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.1);
  const elapsed = clock.getElapsedTime();

  flameLights.forEach((f) => { f.light.intensity = f.baseIntensity + Math.sin(elapsed * 7 + f.phase) * 1.4; f.orb.rotation.y += dt * 1.5; });
  dustParticles.rotation.y = elapsed * 0.03;

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const mesh = pieceMeshes[r][c];
      if (mesh) mesh.scale.set(1, 1 + Math.sin(elapsed * 2.2 + mesh.userData.phase) * 0.018, 1);
    }
  }

  for (let i = activeAnimations.length - 1; i >= 0; i--) { if (activeAnimations[i].update(dt)) activeAnimations.splice(i, 1); }
  for (let i = activeShards.length - 1; i >= 0; i--) {
    const s = activeShards[i];
    
    // As faíscas sobem, espalham-se e rodam rapidamente
    s.mesh.position.addScaledVector(s.vel, dt);
    s.mesh.rotation.x += s.rot.x * dt;
    s.mesh.rotation.y += s.rot.y * dt;
    
    s.life -= dt;
    
    // Encolhem gradualmente até desaparecer ao fim de 1.5s
    const scale = Math.max(s.life / s.maxLife, 0.01);
    s.mesh.scale.set(scale, scale, scale);
    
    if (s.life <= 0) { 
      scene.remove(s.mesh); 
      activeShards.splice(i, 1); 
    }
  }

  controls.update(); renderer.render(scene, camera);
}

syncBoardMeshes();
animate();

// ==========================================
// MODO CINEMÁTICO AUTOMÁTICO (INATIVIDADE)
// ==========================================
let inactivityTimeout = null;

function resetInactivityTimer() {
  // Se a câmara estava a rodar sozinha, interrompe e devolve à visão principal (Preset 0)
  if (controls.autoRotate) {
    controls.autoRotate = false;
    cameraPresetIndex = 0; 
    applyCameraPreset(0); 
  } else {
    controls.autoRotate = false;
  }

  clearTimeout(inactivityTimeout);

  inactivityTimeout = setTimeout(() => {
    controls.autoRotate = true;
  }, 10000);
}

// Ouve qualquer interação do jogador (rato, toque ou teclado) para parar a câmara
window.addEventListener('pointermove', resetInactivityTimer);
window.addEventListener('pointerdown', resetInactivityTimer);
window.addEventListener('keydown', resetInactivityTimer);

resetInactivityTimer();

// ==========================================
// SISTEMA DE MONETIZAÇÃO (GOOGLE ADMOB)
// ==========================================
async function iniciarAnuncios() {
  try {
    await AdMob.initialize({
      requestTrackingAuthorization: true,
      initializeForTesting: true,
    });

    const options = {
      adId: 'ca-app-pub-3940256099942544/6300978111', 
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: true
    };

    await AdMob.showBanner(options);
    console.log("Anúncio carregado com sucesso!");
  } catch (erro) {
    console.error("Erro ao carregar anúncios:", erro);
  }
}

iniciarAnuncios();





