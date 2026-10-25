import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SoundFX } from './audio.js';
import { ChessEngine } from './chessEngine.js';
import { ARENA_CHALLENGES, ARENA_METADATA, ARENAS_LIST } from './puzzles.js';

// ==========================================
// 1. INICIALIZAÇÃO DE SISTEMAS E ESTADO
// ==========================================
const sfx = new SoundFX();
const engine = new ChessEngine();

let isGameStarted = false;
let pendingJoinRoom = null;
let isPaused = false;
let vsAI = true;
let aiDifficulty = 2; 
let isAnimating = false;
let isCameraAnimating = false;
let selectedSquare = null;
let validMoves = [];
let cameraPresetIndex = 0;
let isOnlineGame = false;
let myColor = 'w'; // 'w' (Mármore) ou 'b' (Obsidiana)
let roomId = null;

// Modo Desafios por Arena e Nível de Dificuldade
let isPuzzleMode = false;
let currentChallengeArena = 'cathedral';
let currentChallengeLevelIndex = 0;
let challengeSolved = false;
let currentArena = localStorage.getItem('wizard_arena') || 'cathedral';
let isCelebratingVictory = false;
const celebrationShards = [];

// Sistema de Relógio de Xadrez (Tempo de Partida)
let gameTimeSeconds = 300; // 5 minutos padrão
let whiteTimeRemaining = 300;
let blackTimeRemaining = 300;
let clockInterval = null;

// Efeitos de impacto
let screenShake = 0;
let hoveredMesh = null;
let lastCheckAudioTurn = null;

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
controls.autoRotateSpeed = 0.8;
controls.enabled = false; // Bloqueado até o jogador clicar em "Entrar na Catedral"

const CAMERA_PRESETS = [
  { pos: new THREE.Vector3(0, 11.5, 13.5), target: new THREE.Vector3(0, 0.4, 0) },   // Visão das Brancas
  { pos: new THREE.Vector3(0, 11.5, -13.5), target: new THREE.Vector3(0, 0.4, 0) },  // Visão das Pretas
  { pos: new THREE.Vector3(0, 18.5, 0.01), target: new THREE.Vector3(0, 0, 0) },    // Visão Superior (Top-down)
  { pos: new THREE.Vector3(12.5, 7.5, 11.5), target: new THREE.Vector3(0, 0.6, 0) }  // Visão Cinemática
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
  runeWhite: new THREE.MeshStandardMaterial({ color: 0xf5c56b, emissive: 0xf5c56b, emissiveIntensity: 1.6 }),
  runeBlack: new THREE.MeshStandardMaterial({ color: 0xb583ff, emissive: 0x9b51e0, emissiveIntensity: 1.9 }),
  stoneDark: new THREE.MeshStandardMaterial({ color: 0x1a1721, roughness: 0.85 }),
  stoneLight: new THREE.MeshStandardMaterial({ color: 0xd8d2c9, roughness: 0.4 }),
  magicBeam: new THREE.MeshBasicMaterial({ color: 0x00f5d4, transparent: true, opacity: 0.85, side: THREE.DoubleSide })
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
      const mat = isLight ? materials.stoneLight.clone() : materials.stoneDark.clone();
      
      if (r < 4) {
        mat.color.lerp(new THREE.Color(0x1a0f2e), isLight ? 0.15 : 0.35);
      } else {
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
// 4.1 SISTEMA DE TEMAS DE ARENA / ATMOSFERA
// ==========================================
const ARENA_CONFIGS = {
  cathedral: {
    bg: 0x0b0a0e,
    fog: 0x0b0a0e,
    fogDensity: 0.022,
    ambient: 0x9e8cbe,
    ambientIntensity: 0.65,
    spot: 0xfff2d6,
    spotIntensity: 95,
    rim: 0x8a5cf5,
    flameOrb: 0xffaa33,
    flameLight: 0xff8822,
    dustColor: 0xf5c56b
  },
  inferno: {
    bg: 0x140505,
    fog: 0x140505,
    fogDensity: 0.024,
    ambient: 0x902212,
    ambientIntensity: 0.72,
    spot: 0xff6622,
    spotIntensity: 110,
    rim: 0xff2200,
    flameOrb: 0xff2200,
    flameLight: 0xff4400,
    dustColor: 0xff4d00
  },
  frost: {
    bg: 0x050e18,
    fog: 0x06121f,
    fogDensity: 0.020,
    ambient: 0x5ab2e8,
    ambientIntensity: 0.68,
    spot: 0xd8f5ff,
    spotIntensity: 92,
    rim: 0x00f5d4,
    flameOrb: 0x00f5d4,
    flameLight: 0x00b4d8,
    dustColor: 0x9be8ff
  }
};

function setArenaTheme(arenaName) {
  const cfg = ARENA_CONFIGS[arenaName] || ARENA_CONFIGS.cathedral;
  currentArena = arenaName;
  try { localStorage.setItem('wizard_arena', arenaName); } catch(e) {}

  scene.background.setHex(cfg.bg);
  scene.fog.color.setHex(cfg.fog);
  scene.fog.density = cfg.fogDensity;

  ambientLight.color.setHex(cfg.ambient);
  ambientLight.intensity = cfg.ambientIntensity;
  mainSpot.color.setHex(cfg.spot);
  mainSpot.intensity = cfg.spotIntensity;
  rimLight.color.setHex(cfg.rim);

  flameLights.forEach(f => {
    f.orb.material.color.setHex(cfg.flameOrb);
    f.light.color.setHex(cfg.flameLight);
  });

  dustParticles.material.color.setHex(cfg.dustColor);

  document.querySelectorAll('#menu-arena-group .toggle-btn, #pause-arena-group .toggle-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.arena === arenaName);
  });

  const startBtn = document.getElementById('btn-start-game');
  const startBrandPill = document.querySelector('#start-menu .brand-pill span:last-child');
  const arenaLabels = {
    cathedral: { btn: 'Entrar na Catedral', pill: 'CATEDRAL ARCANA' },
    inferno: { btn: 'Entrar na Cripta Infernal', pill: 'CRIPTA INFERNAL' },
    frost: { btn: 'Entrar no Templo de Gelo', pill: 'TEMPLO DE GELO' }
  };
  const label = arenaLabels[arenaName] || arenaLabels.cathedral;
  if (startBtn) startBtn.textContent = label.btn;
  if (startBrandPill) startBrandPill.textContent = label.pill;

  if (isOnlineGame && roomId && window.dbUpdate && window.db) {
    window.dbUpdate(window.dbRef(window.db, `rooms/${roomId}`), { arena: arenaName });
  }
}
setArenaTheme(currentArena);

// RASTRO DA ÚLTIMA JOGADA
const lastMoveGroup = new THREE.Group();
scene.add(lastMoveGroup);

function showLastMove(fromR, fromC, toR, toC) {
  while (lastMoveGroup.children.length > 0) {
    lastMoveGroup.remove(lastMoveGroup.children[0]);
  }
  const traceMat = new THREE.MeshBasicMaterial({ color: 0xf5c56b, transparent: true, opacity: 0.18, side: THREE.DoubleSide });
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

// MARCADOR VISUAL DE XEQUE (ANEL VERMELHO)
const checkMarkerGeo = new THREE.RingGeometry(0.35, 0.52, 32);
checkMarkerGeo.rotateX(-Math.PI / 2);
const checkMarkerMat = new THREE.MeshBasicMaterial({ color: 0xff0033, side: THREE.DoubleSide, transparent: true, opacity: 0.85 });
const checkMarker = new THREE.Mesh(checkMarkerGeo, checkMarkerMat);
checkMarker.position.y = 0.12; 
checkMarker.visible = false;
scene.add(checkMarker);

// ==========================================
// 6. PEÇAS 3D (COM MODELO FIEL DO CAVALO)
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

  const createBase = () => {
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.35, 0.25, 32), mat);
    base.position.y = 0.125;
    body.add(base);
    addTrim(0.05, 0.33); 
  };

  if (type === 'P') {
    createBase();
    const mid = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.2, 0.4, 32), mat);
    mid.position.y = 0.45;
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.03, 16, 32), mat);
    collar.rotation.x = Math.PI / 2; 
    collar.position.y = 0.65;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.16, 32, 16), mat);
    head.position.y = 0.82;
    body.add(mid, collar, head);
    addTrim(0.65, 0.14);
  } 
  else if (type === 'R') {
    createBase();
    const mid = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.5, 32), mat);
    mid.position.y = 0.5;
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.03, 16, 32), mat);
    collar.rotation.x = Math.PI / 2; 
    collar.position.y = 0.75;
    const top = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 0.2, 32), mat);
    top.position.y = 0.85;
    const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.05, 32), runeMat);
    hole.position.y = 0.95;
    body.add(mid, collar, top, hole);
    addTrim(0.75, 0.22); 
  } 
  else if (type === 'N') {
    // 1. BASE CIRCULAR (cone truncado idêntico ao desenho)
    const baseFoot = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.36, 0.05, 32), mat);
    baseFoot.position.y = 0.025;
    body.add(baseFoot);

    const baseCone = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.34, 0.22, 32), mat);
    baseCone.position.y = 0.14;
    body.add(baseCone);

    // Listras da base
    const baseTrim1 = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.016, 8, 32), runeMat);
    baseTrim1.rotation.x = Math.PI / 2;
    baseTrim1.position.y = 0.055;
    body.add(baseTrim1);

    const baseTrim2 = new THREE.Mesh(new THREE.TorusGeometry(0.222, 0.016, 8, 32), runeMat);
    baseTrim2.rotation.x = Math.PI / 2;
    baseTrim2.position.y = 0.25;
    body.add(baseTrim2);
    
    // 2. CORPO E CABEÇA DO CAVALO (GRUPO SUPERIOR)
    const horseHead = new THREE.Group();
    horseHead.position.y = 0.25; 

    const shape = new THREE.Shape();
    shape.moveTo(-0.18, 0.0); 
    shape.lineTo(-0.25, 0.30); 
    shape.lineTo(-0.18, 0.58); 
    shape.lineTo(-0.04, 0.76); 
    shape.lineTo(0.04, 0.76); 
    shape.lineTo(0.18, 0.64); 
    shape.lineTo(0.25, 0.55); 
    shape.lineTo(0.26, 0.46); 
    shape.lineTo(0.22, 0.42); 
    shape.lineTo(0.06, 0.42); // Corte horizontal do maxilar
    shape.lineTo(0.09, 0.30);
    shape.lineTo(0.14, 0.15);
    shape.lineTo(0.18, 0.0);
    shape.closePath();

    const extrudeSettings = { depth: 0.18, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.02, bevelSegments: 3 };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.translate(0, 0, -0.09); 
    
    const mainBody = new THREE.Mesh(geometry, mat);
    horseHead.add(mainBody);

    // 3. A ORELHA
    const earShape = new THREE.Shape();
    earShape.moveTo(-0.04, 0);
    earShape.lineTo(0.03, 0);
    earShape.lineTo(-0.01, 0.17);
    earShape.closePath();
    const earGeom = new THREE.ExtrudeGeometry(earShape, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.015, bevelSize: 0.01, bevelSegments: 2 });
    earGeom.translate(0, 0.75, -0.04);
    const earMesh = new THREE.Mesh(earGeom, mat);
    horseHead.add(earMesh);

    const earInnerShape = new THREE.Shape();
    earInnerShape.moveTo(-0.025, 0);
    earInnerShape.lineTo(0.018, 0);
    earInnerShape.lineTo(-0.01, 0.13);
    earInnerShape.closePath();
    const earInnerGeom = new THREE.ExtrudeGeometry(earInnerShape, { depth: 0.02, bevelEnabled: false });
    earInnerGeom.translate(0, 0.76, 0.035);
    const earInnerMesh = new THREE.Mesh(earInnerGeom, runeMat);
    horseHead.add(earInnerMesh);

    // 4. O OLHO AMビRELO
    const eyeShape = new THREE.Shape();
    eyeShape.moveTo(-0.035, 0);
    eyeShape.lineTo(0.01, 0.025);
    eyeShape.lineTo(0.035, 0);
    eyeShape.lineTo(0.0, -0.02);
    eyeShape.closePath();
    const eyeGeom = new THREE.ShapeGeometry(eyeShape);

    const eyeRight = new THREE.Mesh(eyeGeom, runeMat);
    eyeRight.position.set(0.11, 0.60, 0.106);
    eyeRight.rotation.z = -0.25;
    horseHead.add(eyeRight);

    const eyeLeft = new THREE.Mesh(eyeGeom, runeMat);
    eyeLeft.position.set(0.11, 0.60, -0.106);
    eyeLeft.rotation.y = Math.PI;
    eyeLeft.rotation.z = 0.25;
    horseHead.add(eyeLeft);

    // 5. AS DUAS LISTRAS HORIZONTAIS NO PESCOÇO
    const neckStripeLower = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.024, 0.225), runeMat);
    neckStripeLower.position.set(0.02, 0.18, 0);
    horseHead.add(neckStripeLower);

    const neckStripeUpper = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.024, 0.225), runeMat);
    neckStripeUpper.position.set(0.01, 0.34, 0);
    horseHead.add(neckStripeUpper);

    // 6. AS 5 LISTRAS DIAGONAIS NA CRINA
    for (let i = 0; i < 5; i++) {
      const t = i / 4;
      const x = -0.22 + t * 0.16;
      const y = 0.33 + t * 0.38;
      const maneStripe = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.024, 0.225), runeMat);
      maneStripe.position.set(x, y, 0);
      maneStripe.rotation.z = -0.7;
      horseHead.add(maneStripe);
    }

    horseHead.rotation.y = Math.PI / 2; 
    body.add(horseHead);
  }
  else if (type === 'B') {
    createBase();
    const mid = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.2, 0.6, 32), mat);
    mid.position.y = 0.55;
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.03, 16, 32), mat);
    collar.rotation.x = Math.PI / 2; 
    collar.position.y = 0.85;
    
    const mitre = new THREE.Mesh(new THREE.SphereGeometry(0.14, 32, 16), mat);
    mitre.scale.set(1, 1.5, 1);
    mitre.position.y = 1.05;
    
    const cut = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.15, 0.15), runeMat);
    cut.position.set(0, 1.1, 0.1);
    cut.rotation.x = Math.PI / 4;
    
    const finial = new THREE.Mesh(new THREE.SphereGeometry(0.04, 16, 16), runeMat);
    finial.position.y = 1.3;
    
    body.add(mid, collar, mitre, cut, finial);
    addTrim(0.85, 0.16);
  } 
  else if (type === 'Q') {
    createBase();
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
  group.userData = { type, color, body, basePosY: 0.1, phase: Math.random() * Math.PI * 2 };
  
  if (color === 'b') {
    group.rotation.y = Math.PI;
  }
  
  return group;
}

// SINCRONIZAÇÃO DAS PEÇAS NO TABULEIRO
function syncBoardMeshes() {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (pieceMeshes[r] && pieceMeshes[r][c]) {
        scene.remove(pieceMeshes[r][c]);
        pieceMeshes[r][c] = null;
      }
    }
  }

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const pieceData = engine.board[r][c];
      if (pieceData) {
        const mesh = createPieceMesh(pieceData.type, pieceData.color);
        const pos = boardToWorld(r, c);
        mesh.position.copy(pos);
        mesh.userData.r = r;
        mesh.userData.c = c;
        mesh.userData.basePosY = pos.y;
        scene.add(mesh);
        pieceMeshes[r][c] = mesh;
      }
    }
  }
}

// CEMITÉRIO E HUD
function triggerCaptureFlash(element) {
  element.classList.remove('capture-pulse');
  void element.offsetWidth;
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
  
  const inCheck = engine.isInCheck(engine.turn);
  const checkWarning = document.getElementById('check-warning');
  if (checkWarning) {
    if (inCheck) {
      checkWarning.classList.remove('hidden');
      if (lastCheckAudioTurn !== engine.turn) {
        lastCheckAudioTurn = engine.turn;
        sfx.playCheck();
      }
    } else {
      checkWarning.classList.add('hidden');
      lastCheckAudioTurn = null;
    }
  }

  // Marcador 3D de Xeque
  checkMarker.visible = false; 
  for (const color of ['w', 'b']) {
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
  updateClockDisplays();
  updateEvalBar();
}

function updateEvalBar() {
  const container = document.getElementById('eval-bar-container');
  const fillW = document.getElementById('eval-bar-fill-w');
  const badge = document.getElementById('eval-score-badge');
  if (!container || !fillW || !badge) return;

  if (isPuzzleMode) {
    container.style.display = 'none';
    return;
  }
  container.style.display = 'flex';

  const score = engine.getEvaluationScore ? engine.getEvaluationScore() : 0;
  const clamped = Math.max(-10, Math.min(10, score));
  const pct = 50 + (clamped / 10) * 45;
  fillW.style.height = `${pct}%`;

  if (score > 0) {
    badge.textContent = `+${score}`;
    badge.style.color = '#f5c56b';
  } else if (score < 0) {
    badge.textContent = `${score}`;
    badge.style.color = '#b583ff';
  } else {
    badge.textContent = '0.0';
    badge.style.color = '#d0bcff';
  }
}

// ==========================================
// RELÓGIOS DE XADREZ (TIMERS)
// ==========================================
function formatClockTime(sec) {
  if (sec <= 0) return '00:00';
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function updateClockDisplays() {
  const elW = document.getElementById('timer-w');
  const elB = document.getElementById('timer-b');

  if (gameTimeSeconds <= 0) {
    if (elW) elW.style.display = 'none';
    if (elB) elB.style.display = 'none';
    return;
  }

  if (elW) {
    elW.style.display = 'flex';
    elW.querySelector('.timer-digits').textContent = formatClockTime(whiteTimeRemaining);
    elW.classList.toggle('active', engine.turn === 'w');
    elW.classList.toggle('timer-critical', whiteTimeRemaining > 0 && whiteTimeRemaining <= 30);
  }

  if (elB) {
    elB.style.display = 'flex';
    elB.querySelector('.timer-digits').textContent = formatClockTime(blackTimeRemaining);
    elB.classList.toggle('active', engine.turn === 'b');
    elB.classList.toggle('timer-critical', blackTimeRemaining > 0 && blackTimeRemaining <= 30);
  }
}

function startClockTimer() {
  if (clockInterval) clearInterval(clockInterval);
  if (gameTimeSeconds <= 0) return;

  clockInterval = setInterval(() => {
    if (isPaused || isAnimating || isCameraAnimating) return;
    const modalOver = document.getElementById('game-over-modal');
    if (modalOver && !modalOver.classList.contains('hidden')) return;

    if (engine.turn === 'w') {
      whiteTimeRemaining--;
      if (whiteTimeRemaining <= 0) {
        whiteTimeRemaining = 0;
        clearInterval(clockInterval);
        handleTimeForfeit('w');
      }
    } else {
      blackTimeRemaining--;
      if (blackTimeRemaining <= 0) {
        blackTimeRemaining = 0;
        clearInterval(clockInterval);
        handleTimeForfeit('b');
      }
    }
    updateClockDisplays();
  }, 1000);
}

function handleTimeForfeit(loserColor) {
  const modal = document.getElementById('game-over-modal');
  const title = document.getElementById('game-over-title');
  const msg = document.getElementById('game-over-msg');
  if (modal && title && msg) {
    modal.classList.remove('hidden');
    title.textContent = 'Tempo Esgotado!';
    msg.textContent = loserColor === 'w' ? 'O Mármore perdeu pelo relógio. A Obsidiana venceu!' : 'A Obsidiana perdeu pelo relógio. O Mármore venceu!';
  }
  recordGameStats(loserColor === myColor ? 'loss' : 'win');
  sfx.playVictory();
  triggerVictoryCelebration(loserColor === 'w' ? 'b' : 'w');
}

// ==========================================
// REGRAS DE FIM DE JOGO (FIDE) E ESTATÍSTICAS
// ==========================================
let stats = { wins: 0, losses: 0, draws: 0 };

function loadStats() {
  try {
    const saved = localStorage.getItem('wizard_chess_stats');
    if (saved) stats = JSON.parse(saved);
  } catch (e) {}
  updateStatsUI();
}

function updateStatsUI() {
  const w = document.getElementById('stat-wins');
  const l = document.getElementById('stat-losses');
  const d = document.getElementById('stat-draws');
  if (w) w.textContent = stats.wins;
  if (l) l.textContent = stats.losses;
  if (d) d.textContent = stats.draws;
}

function recordGameStats(result) {
  if (result === 'win') stats.wins++;
  else if (result === 'loss') stats.losses++;
  else if (result === 'draw') stats.draws++;
  try {
    localStorage.setItem('wizard_chess_stats', JSON.stringify(stats));
  } catch (e) {}
  updateStatsUI();
}

loadStats();

// ==========================================
// INTEGRAÇÃO SEGURA COM GOOGLE ADSENSE
// ==========================================
function refreshAdSense() {
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (e) {
    // Silencioso se adblocker ativo ou ambiente local
  }
}

function showGameOverModal(titleText, msgText) {
  const modal = document.getElementById('game-over-modal');
  const title = document.getElementById('game-over-title');
  const msg = document.getElementById('game-over-msg');
  if (modal && title && msg) {
    modal.classList.remove('hidden');
    title.textContent = titleText;
    msg.textContent = msgText;
    refreshAdSense();
  }
}

function checkGameOver() {
  // 1. Material Insuficiente
  if (engine.isInsufficientMaterial()) {
    showGameOverModal('Empate!', 'Apenas os Reis sobreviveram (Material Insuficiente).');
    recordGameStats('draw');
    return true;
  }

  // 2. Regra dos 50 lances
  if (engine.isFiftyMoveRule && engine.isFiftyMoveRule()) {
    showGameOverModal('Empate!', 'Regra dos 50 lances sem capturas nem avanço de peões.');
    recordGameStats('draw');
    return true;
  }

  // 3. Tripla Repetição
  if (engine.isThreefoldRepetition && engine.isThreefoldRepetition()) {
    showGameOverModal('Empate!', 'A mesma posição do tabuleiro repetiu 3 vezes.');
    recordGameStats('draw');
    return true;
  }

  // 4. Sem lances legais (Xeque-Mate ou Afogamento)
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
    const titleText = inCheck ? 'Xeque-Mate!' : 'Empate!';
    const msgText = inCheck ? (engine.turn === 'w' ? 'A Obsidiana venceu!' : 'O Mármore venceu!') : 'O Rei está afogado.';
    showGameOverModal(titleText, msgText);

    if (inCheck) {
      recordGameStats(engine.turn === myColor ? 'loss' : 'win');
      sfx.playVictory();
      triggerVictoryCelebration(engine.turn === 'w' ? 'b' : 'w');
    } else {
      recordGameStats('draw');
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
      document.querySelectorAll('#promotion-modal .promo-btn').forEach(b => b.removeEventListener('click', handleChoice));
      callback(type);
    }
  };
  document.querySelectorAll('#promotion-modal .promo-btn').forEach(btn => btn.addEventListener('click', handleChoice));
}

// ==========================================
// 7. FÍSICA E ANIMAÇÕES TEMÁTICAS DE ATAQUE
// ==========================================
const activeShards = [];
const activeAnimations = [];

function shatterPieceAt(worldPos, color) {
  sfx.playShatter();
  const isWhite = color === 'w';
  const runeMat = isWhite ? materials.runeWhite : materials.runeBlack;

  for (let i = 0; i < 40; i++) {
    const spark = new THREE.Mesh(new THREE.OctahedronGeometry(0.03 + Math.random() * 0.05, 0), runeMat);
    spark.position.copy(worldPos);
    spark.position.y += 0.15 + Math.random() * 1.2; 
    spark.position.x += (Math.random() - 0.5) * 0.4;
    spark.position.z += (Math.random() - 0.5) * 0.4;
    scene.add(spark);

    const angle = Math.random() * Math.PI * 2;
    const speed = 0.5 + Math.random() * 1.5;

    activeShards.push({
      mesh: spark,
      life: 1.5,
      maxLife: 1.5,
      vel: new THREE.Vector3(Math.cos(angle) * speed, 0.5 + Math.random() * 1.5, Math.sin(angle) * speed),
      rot: new THREE.Vector3(Math.random() * 10, Math.random() * 10, Math.random() * 10)
    });
  }
}

// ==========================================
// EFEITOS MÁGICOS DE ATAQUE ÚNICOS POR PEÇA
// ==========================================
function spawnShockwave(pos, colorHex = 0x00f5d4, maxRadius = 1.8) {
  const ringGeo = new THREE.RingGeometry(0.12, 0.28, 32);
  ringGeo.rotateX(-Math.PI / 2);
  const ringMat = new THREE.MeshBasicMaterial({ color: colorHex, side: THREE.DoubleSide, transparent: true, opacity: 0.9 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.position.copy(pos);
  ring.position.y = 0.12;
  scene.add(ring);

  activeAnimations.push({
    elapsed: 0, duration: 0.55,
    update(dt) {
      this.elapsed += dt;
      const t = Math.min(this.elapsed / this.duration, 1);
      const s = 1 + t * maxRadius;
      ring.scale.set(s, s, s);
      ring.material.opacity = Math.max(0, 0.9 * (1 - t));
      if (t >= 1) { scene.remove(ring); return true; }
      return false;
    }
  });
}

function spawnHolyPillar(targetPos) {
  const cylGeo = new THREE.CylinderGeometry(0.35, 0.35, 20, 16, 1, true);
  const cylMat = new THREE.MeshBasicMaterial({ color: 0xfff3a0, transparent: true, opacity: 0.75, side: THREE.DoubleSide });
  const pillar = new THREE.Mesh(cylGeo, cylMat);
  pillar.position.set(targetPos.x, 10, targetPos.z);
  scene.add(pillar);

  activeAnimations.push({
    elapsed: 0, duration: 0.6,
    update(dt) {
      this.elapsed += dt;
      const t = Math.min(this.elapsed / this.duration, 1);
      pillar.scale.set(1 + t * 0.8, 1, 1 + t * 0.8);
      pillar.material.opacity = Math.max(0, 0.75 * (1 - t));
      if (t >= 1) { scene.remove(pillar); return true; }
      return false;
    }
  });
}

function spawnArcaneSupernova(targetPos) {
  sfx.playVortex();
  spawnShockwave(targetPos, 0xb583ff, 2.4);
  for (let i = 0; i < 28; i++) {
    const spark = new THREE.Mesh(new THREE.OctahedronGeometry(0.04 + Math.random() * 0.04, 0), materials.runeBlack);
    spark.position.copy(targetPos);
    scene.add(spark);
    const angle = Math.random() * Math.PI * 2;
    const spd = 1.2 + Math.random() * 2.2;
    activeShards.push({
      mesh: spark, life: 1.2, maxLife: 1.2,
      vel: new THREE.Vector3(Math.cos(angle) * spd, 1.2 + Math.random() * 2.0, Math.sin(angle) * spd),
      rot: new THREE.Vector3(Math.random() * 10, Math.random() * 10, Math.random() * 10)
    });
  }
}

function spawnRoyalSmite(targetPos) {
  sfx.playRoyalSmite();
  spawnShockwave(targetPos, 0xf5c56b, 2.0);
  for (let i = 0; i < 25; i++) {
    const spark = new THREE.Mesh(new THREE.OctahedronGeometry(0.05, 0), materials.runeWhite);
    spark.position.copy(targetPos);
    scene.add(spark);
    const angle = Math.random() * Math.PI * 2;
    const spd = 1.5 + Math.random() * 2.0;
    activeShards.push({
      mesh: spark, life: 1.4, maxLife: 1.4,
      vel: new THREE.Vector3(Math.cos(angle) * spd, 2.0 + Math.random() * 1.5, Math.sin(angle) * spd),
      rot: new THREE.Vector3(Math.random() * 8, Math.random() * 8, Math.random() * 8)
    });
  }
}

function triggerVictoryCelebration(winnerColor) {
  isCelebratingVictory = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2.0;

  const colors = [0xf5c56b, 0x00f5d4, 0xd0bcff, 0xffd700, 0xffffff];
  for (let i = 0; i < 90; i++) {
    const col = colors[Math.floor(Math.random() * colors.length)];
    const mat = new THREE.MeshBasicMaterial({ color: col });
    const geom = new THREE.OctahedronGeometry(0.08 + Math.random() * 0.05, 0);
    const spark = new THREE.Mesh(geom, mat);
    spark.position.set((Math.random() - 0.5) * 4, 0.4, (Math.random() - 0.5) * 4);
    scene.add(spark);

    const angle = Math.random() * Math.PI * 2;
    const spd = 2.0 + Math.random() * 3.5;
    celebrationShards.push({
      mesh: spark,
      life: 2.5 + Math.random() * 1.0,
      maxLife: 3.5,
      vel: new THREE.Vector3(Math.cos(angle) * spd, 5.0 + Math.random() * 4.5, Math.sin(angle) * spd),
      rot: new THREE.Vector3(Math.random() * 10, Math.random() * 10, Math.random() * 10)
    });
  }

  sfx.playVictory();
}

// Feixe Mágico do Bispo
function spawnMagicBeam(startPos, endPos) {
  sfx.playBeam();
  const distance = startPos.distanceTo(endPos);
  const geom = new THREE.CylinderGeometry(0.04, 0.04, distance, 12);
  geom.translate(0, distance / 2, 0);
  geom.rotateX(Math.PI / 2);

  const beam = new THREE.Mesh(geom, materials.magicBeam);
  beam.position.copy(startPos);
  beam.lookAt(endPos);
  scene.add(beam);

  activeAnimations.push({
    elapsed: 0,
    duration: 0.4,
    update(dt) {
      this.elapsed += dt;
      const t = this.elapsed / this.duration;
      beam.scale.set(1 + t * 2, 1 + t * 2, 1);
      beam.material.opacity = Math.max(0, 1 - t);
      if (t >= 1) {
        scene.remove(beam);
        return true;
      }
      return false;
    }
  });
}

function executeMove(from, to, onComplete) {
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
  const isBishop = pieceData.type === 'B';
  const isRook = pieceData.type === 'R';
  const isQueen = pieceData.type === 'Q';
  const isCapture = !!victimMesh;
  const isCastling = !!to.castling;

  sfx.playSlide();

  // Ataque especial temático por tipo de peça
  if (isCapture) {
    if (isKnight) {
      sfx.playThunderStomp();
      screenShake = 0.45;
    } else if (isBishop) {
      spawnMagicBeam(startPos.clone().add(new THREE.Vector3(0, 0.9, 0)), targetPos.clone().add(new THREE.Vector3(0, 0.5, 0)));
      spawnHolyPillar(targetPos);
    } else if (isRook) {
      sfx.playTremor();
      screenShake = 0.55;
    } else if (isQueen) {
      spawnArcaneSupernova(targetPos);
    } else if (pieceData.type === 'K') {
      spawnRoyalSmite(targetPos);
    } else if (pieceData.type === 'P') {
      sfx.playPawnThrust();
    }
  }
  
  if (isCastling) {
    const rookFromC = to.castling === 'kingside' ? 7 : 0;
    const rookToC = to.castling === 'kingside' ? 5 : 3;
    const rookMesh = pieceMeshes[from.r][rookFromC];
    const rStart = rookMesh.position.clone();
    const rTarget = boardToWorld(to.r, rookToC);
    
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
          if (attackerMesh.userData.body) attackerMesh.userData.body.rotation.x = -0.4 * Math.sin(windUp * Math.PI / 2);
        } else if (t < 0.5) {
          const dashT = (t - 0.3) / 0.2; moveT = dashT;
          if (attackerMesh.userData.body) attackerMesh.userData.body.rotation.x = -0.4 + (0.9 * dashT);
        } else {
          moveT = 1; const recT = (t - 0.5) / 0.5;
          if (attackerMesh.userData.body) attackerMesh.userData.body.rotation.x = 0.5 * Math.exp(-recT * 6) * Math.cos(recT * 25);
        }
        if (moveT >= 0) attackerMesh.position.lerpVectors(startPos, targetPos, moveT);
        else attackerMesh.position.copy(startPos).add(targetPos.clone().sub(startPos).normalize().multiplyScalar(moveT));
        
        if (isKnight) attackerMesh.position.y = 0.1 + Math.sin(Math.max(0, moveT) * Math.PI) * 1.45;

        if (t >= 0.5 && !impactTriggered) {
          impactTriggered = true;
          const shatterPos = isEnPassant ? boardToWorld(from.r, to.c) : targetPos;
          shatterPieceAt(shatterPos, victimMesh.userData.color); 
          if (isKnight) spawnShockwave(shatterPos, 0x00f5d4, 1.8);
          else if (isRook) spawnShockwave(shatterPos, 0xf5c56b, 2.2);
          else if (isBishop) spawnShockwave(shatterPos, 0xffeb80, 1.6);
          else if (isQueen) spawnShockwave(shatterPos, 0xb583ff, 2.2);
          else if (pieceData.type === 'K') spawnShockwave(shatterPos, 0xffd700, 1.9);
          else if (pieceData.type === 'P') spawnShockwave(shatterPos, 0xd0bcff, 1.3);
          scene.remove(victimMesh);
        }
      }
      else {
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        attackerMesh.position.lerpVectors(startPos, targetPos, ease);
        if (isKnight) attackerMesh.position.y = 0.1 + Math.sin(t * Math.PI) * 1.45;
      }

      if (t >= 1) {
        attackerMesh.position.copy(targetPos); 
        if (attackerMesh.userData.body) attackerMesh.userData.body.rotation.x = 0;
        
        // Atualiza matriz lógica
        engine.board[to.r][to.c] = pieceData; 
        engine.board[from.r][from.c] = null; 
        pieceData.moved = true;

        if (isEnPassant) engine.board[from.r][to.c] = null;

        // Registra contadores de regra dos 50 lances e histórico de posições
        if (engine.recordMoveRuleState) {
          engine.recordMoveRuleState(pieceData, isCapture, pieceData.type === 'P');
        }

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

          engine.lastMove = { from: {r: from.r, c: from.c}, to: {r: to.r, c: to.c}, piece: pieceData };

          pieceMeshes[from.r][from.c] = null;
          pieceMeshes[to.r][to.c] = attackerMesh;
          pieceMeshes[to.r][to.c].userData.r = to.r; 
          pieceMeshes[to.r][to.c].userData.c = to.c;
          
          if (isEnPassant) pieceMeshes[from.r][to.c] = null;
          
          engine.turn = engine.turn === 'w' ? 'b' : 'w';

          // Registro em Notação Algébrica
          const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
          const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
          let note = '';
          
          if (isCastling) {
            note = to.castling === 'kingside' ? 'O-O' : 'O-O-O';
          } else {
            const pt = pieceData.type === 'P' ? '' : pieceData.type;
            const cap = (to.capture || isEnPassant) ? 'x' : '';
            const sf = (pieceData.type === 'P' && cap) ? files[from.c] : '';
            const endSquare = files[to.c] + ranks[to.r];
            
            let promo = '';
            const currentPiece = engine.board[to.r][to.c];
            if (pieceData.type === 'P' && currentPiece && currentPiece.type !== 'P') {
              promo = '=' + currentPiece.type;
            }
            note = `${pt}${sf}${cap}${endSquare}${promo}`;
          }
          
          if (engine.isInCheck(engine.turn)) note += '+';

          const histList = document.getElementById('history-list');
          if (histList) {
            if (pieceData.color === 'w') {
              const li = document.createElement('li');
              li.innerHTML = `<span style="color:#f5c56b">${note}</span>`;
              histList.appendChild(li);
            } else {
              if (histList.lastElementChild) {
                histList.lastElementChild.innerHTML += ` &nbsp;&nbsp;<span style="color:#b583ff">${note}</span>`;
              }
            }
            const panel = document.getElementById('history-panel');
            if (panel) panel.scrollTop = panel.scrollHeight;
          }
          
          showLastMove(from.r, from.c, to.r, to.c);
          updateHUD(); 
          isAnimating = false;

          // Sincroniza via Firebase
          if (isOnlineGame && roomId && pieceData.color === myColor && window.dbUpdate && window.db) {
             window.dbUpdate(window.dbRef(window.db, `rooms/${roomId}`), {
               lastMove: {
                 color: myColor,
                 from: { r: from.r, c: from.c },
                 to: { r: to.r, c: to.c, capture: !!to.capture, promote: to.promote || null, castling: to.castling || null, enPassant: to.enPassant || null },
                 time: Date.now()
               }
             });
          }

          if (isPuzzleMode) {
            checkChallengeMove(from, to);
          } else {
            if (!checkGameOver() && onComplete) onComplete();
          }
        };

        // Promoção de Peão
        if (pieceData.type === 'P' && (to.r === 0 || to.r === 7)) {
          if (vsAI && pieceData.color !== myColor) {
            promotePawn('Q', to.r, to.c, pieceData, attackerMesh, targetPos);
            finalizeTurn();
          } else {
            openPromotionModal((cType) => {
              promotePawn(cType, to.r, to.c, pieceData, attackerMesh, targetPos);
              finalizeTurn();
            });
          }
        } else {
          finalizeTurn();
        }
        return true;
      }
      return false;
    }
  });
}

function checkChallengeMove(from, to) {
  const challenges = ARENA_CHALLENGES[currentChallengeArena];
  if (!challenges || !challenges[currentChallengeLevelIndex]) return;
  const currentChallenge = challenges[currentChallengeLevelIndex];
  const sol = currentChallenge.solution[0];
  const isCorrect = (from.r === sol.from.r && from.c === sol.from.c && to.r === sol.to.r && to.c === sol.to.c);
  const promptEl = document.getElementById('puzzle-prompt');

  if (isCorrect) {
    challengeSolved = true;
    sfx.playPuzzleSuccess();
    
    // Se completou o nível máximo desta arena
    if (currentChallengeLevelIndex >= challenges.length - 1) {
      const nextArenaIdx = (ARENAS_LIST.indexOf(currentChallengeArena) + 1) % ARENAS_LIST.length;
      const nextArena = ARENAS_LIST[nextArenaIdx];
      const nextMeta = ARENA_METADATA[nextArena];
      if (promptEl) {
        promptEl.innerHTML = `<span style="color: #f5c56b; font-weight: 700;">🏆 Arena Concluída! Desbloqueando ${nextMeta.name}...</span>`;
      }
      setTimeout(() => {
        loadChallenge(nextArena, 0);
      }, 2500);
    } else {
      if (promptEl) {
        promptEl.innerHTML = `<span style="color: #00f5d4; font-weight: 700;">✨ Nível Concluído com Sucesso! Avançando...</span>`;
      }
      setTimeout(() => {
        loadChallenge(currentChallengeArena, currentChallengeLevelIndex + 1);
      }, 2000);
    }
  } else {
    sfx.playPuzzleFail();
    if (promptEl) {
      promptEl.innerHTML = `<span style="color: #ff4d6d; font-weight: 700;">⚠️ Lance incorreto! Retornando posição...</span>`;
    }
    setTimeout(() => {
      loadChallenge(currentChallengeArena, currentChallengeLevelIndex);
    }, 1400);
  }
}

function loadChallenge(arenaId = currentChallengeArena, levelIdx = currentChallengeLevelIndex) {
  if (!ARENA_CHALLENGES[arenaId]) arenaId = 'cathedral';
  const challenges = ARENA_CHALLENGES[arenaId];
  currentChallengeArena = arenaId;
  currentChallengeLevelIndex = Math.max(0, Math.min(challenges.length - 1, levelIdx));

  const challenge = challenges[currentChallengeLevelIndex];
  const meta = ARENA_METADATA[arenaId];

  isPuzzleMode = true;
  challengeSolved = false;
  vsAI = false;
  isOnlineGame = false;
  myColor = challenge.playerColor;

  // Atualiza a atmosfera para a arena do desafio
  setArenaTheme(arenaId);

  engine.loadFen(challenge.fen);
  syncBoardMeshes();

  while (lastMoveGroup.children.length > 0) lastMoveGroup.remove(lastMoveGroup.children[0]);
  selectedSquare = null;
  validMoves = [];
  clearHighlights();

  const puzzleHud = document.getElementById('puzzle-hud');
  const arenaNameEl = document.getElementById('puzzle-arena-name');
  const arenaIconEl = document.getElementById('puzzle-arena-icon');
  const titleEl = document.getElementById('puzzle-title');
  const badgeEl = document.getElementById('puzzle-step-badge');
  const promptEl = document.getElementById('puzzle-prompt');

  if (puzzleHud) puzzleHud.classList.remove('hidden');
  if (arenaNameEl) arenaNameEl.textContent = meta.name;
  if (arenaIconEl) arenaIconEl.textContent = meta.icon;
  if (titleEl) titleEl.textContent = challenge.title;
  if (badgeEl) badgeEl.textContent = `Nível ${challenge.level}/${challenges.length} • ${challenge.difficulty}`;
  if (promptEl) promptEl.textContent = `${challenge.objective} - ${challenge.lore}`;

  document.querySelectorAll('.puzzle-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.arenaChallenge === arenaId);
  });

  const elW = document.getElementById('timer-w');
  const elB = document.getElementById('timer-b');
  if (elW) elW.style.display = 'none';
  if (elB) elB.style.display = 'none';

  applyCameraPreset(challenge.playerColor === 'w' ? 0 : 1, false);
  updateHUD();
}

// ==========================================
// 8. INTERAÇÃO (HOVER, LEVITAÇÃO E CLIQUES)
// ==========================================
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

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
  if (isPaused) return;
  const aiColor = myColor === 'w' ? 'b' : 'w';
  if (vsAI && engine.turn === aiColor && !isAnimating) {
    setTimeout(() => {
      const aiMove = engine.chooseBestMove(aiColor, aiDifficulty);
      if (aiMove) executeMove(aiMove.from, aiMove.to, checkAITurn);
    }, 420);
  }
}

// Evento de Movimento do Ponteiro (Hover e Levitação Mágica)
renderer.domElement.addEventListener('pointermove', (e) => {
  if (!isGameStarted || isPaused || isAnimating || isCameraAnimating) {
    hoverMarker.visible = false;
    document.body.style.cursor = 'default';
    return;
  }

  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  let hoveredRC = null;
  let targetPieceMesh = null;

  for (const hit of intersects) {
    let obj = hit.object;
    while (obj) {
      if (obj.userData && typeof obj.userData.r === 'number') {
        hoveredRC = { r: obj.userData.r, c: obj.userData.c };
        if (pieceMeshes[hoveredRC.r] && pieceMeshes[hoveredRC.r][hoveredRC.c]) {
          targetPieceMesh = pieceMeshes[hoveredRC.r][hoveredRC.c];
        }
        break;
      }
      obj = obj.parent;
    }
    if (hoveredRC) break;
  }

  if (hoveredRC) {
    const pos = boardToWorld(hoveredRC.r, hoveredRC.c);
    hoverMarker.position.set(pos.x, 0.11, pos.z);
    hoverMarker.visible = true;
    document.body.style.cursor = 'pointer';

    // Levitação Mágica no Hover
    const piece = engine.board[hoveredRC.r][hoveredRC.c];
    if (piece && piece.color === engine.turn && (!isOnlineGame || piece.color === myColor)) {
      hoveredMesh = targetPieceMesh;
    } else {
      hoveredMesh = null;
    }
  } else {
    hoverMarker.visible = false;
    document.body.style.cursor = 'default';
    hoveredMesh = null;
  }
});

// Evento de Clique / Toque
renderer.domElement.addEventListener('pointerdown', (e) => {
  if (!isGameStarted || isPaused || isAnimating || isCameraAnimating) return;

  const aiColor = myColor === 'w' ? 'b' : 'w';
  if (vsAI && engine.turn === aiColor) return; 
  if (isOnlineGame && engine.turn !== myColor) return;

  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1; 
  pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  let clickedRC = null;
  for (const hit of intersects) {
    let obj = hit.object;
    while (obj) { 
      if (obj.userData && typeof obj.userData.r === 'number') { 
        clickedRC = { r: obj.userData.r, c: obj.userData.c }; 
        break; 
      } 
      obj = obj.parent; 
    }
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
    sfx.playClick();
    selectedSquare = clickedRC; 
    validMoves = engine.getLegalMoves(clickedRC.r, clickedRC.c);
    showHighlights(clickedRC.r, clickedRC.c, validMoves);
  } else { 
    selectedSquare = null; validMoves = []; clearHighlights(); 
  }
});

// ==========================================
// 9. EVENTOS DA INTERFACE E MENU INICIAL
// ==========================================

// Configuração do Menu Inicial
const startMenu = document.getElementById('start-menu');
const btnStartGame = document.getElementById('btn-start-game');

// Intercepta todos os toques e cliques no overlay para garantir que clicar fora da caixa
// JAMAIS feche o menu nem acione o tabuleiro 3D enquanto o menu estiver ativo
if (startMenu) {
  const stopIfActive = (e) => {
    if (!startMenu.classList.contains('hidden')) {
      e.stopPropagation();
    }
  };
  startMenu.addEventListener('pointerdown', stopIfActive);
  startMenu.addEventListener('pointerup', stopIfActive);
  startMenu.addEventListener('click', stopIfActive);
  startMenu.addEventListener('touchstart', stopIfActive, { passive: false });
  startMenu.addEventListener('touchend', stopIfActive, { passive: false });
}

// Grupo de Seleção de Modo no Menu
document.querySelectorAll('#menu-mode-group .toggle-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelectorAll('#menu-mode-group .toggle-btn').forEach(b => b.classList.remove('active'));
    e.currentTarget.classList.add('active');
    const mode = e.currentTarget.dataset.mode;
    isPuzzleMode = (mode === 'puzzle');
    vsAI = (mode === 'ai');
    isOnlineGame = (mode === 'online');

    const puzzleHud = document.getElementById('puzzle-hud');
    if (puzzleHud && !isPuzzleMode) puzzleHud.classList.add('hidden');
    
    const diffSection = document.getElementById('menu-diff-section');
    if (diffSection) diffSection.style.display = vsAI ? 'flex' : 'none';

    const btnMode = document.getElementById('btn-mode');
    if (btnMode) {
      btnMode.querySelector('.btn-label').textContent = isPuzzleMode ? 'Desafios' : (vsAI ? 'vs IA' : (isOnlineGame ? 'Online' : '2 Jogadores'));
    }
  });
});

// Grupo de Seleção de Arena / Atmosfera
document.querySelectorAll('#menu-arena-group .toggle-btn, #pause-arena-group .toggle-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    setArenaTheme(e.currentTarget.dataset.arena);
    sfx.playClick();
  });
});

// Grupo de Seleção de Cor no Menu
document.querySelectorAll('#menu-color-group .toggle-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelectorAll('#menu-color-group .toggle-btn').forEach(b => b.classList.remove('active'));
    e.currentTarget.classList.add('active');
    myColor = e.currentTarget.dataset.color;
    updateColorButton();
  });
});

// Grupo de Seleção de Tempo no Menu
document.querySelectorAll('#menu-time-group .toggle-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelectorAll('#menu-time-group .toggle-btn').forEach(b => b.classList.remove('active'));
    e.currentTarget.classList.add('active');
    gameTimeSeconds = parseInt(e.currentTarget.dataset.time, 10);
  });
});

// Grupo de Seleção de Dificuldade no Menu
document.querySelectorAll('#menu-diff-group .toggle-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelectorAll('#menu-diff-group .toggle-btn').forEach(b => b.classList.remove('active'));
    e.currentTarget.classList.add('active');
    aiDifficulty = parseInt(e.currentTarget.dataset.diff, 10);
    updateAIDifficultyView();
  });
});

function updateColorButton() {
  const btnColor = document.getElementById('btn-color');
  if (btnColor) {
    btnColor.querySelector('.btn-label').textContent = myColor === 'w' ? 'Lado: Mármore' : 'Lado: Obsidiana';
  }
}

function updateAIDifficultyView() {
  const nomesDiff = { 1: 'Fácil', 2: 'Média', 3: 'Difícil' };
  const btnDiff = document.getElementById('btn-diff');
  if (btnDiff) {
    btnDiff.querySelector('.btn-label').textContent = 'IA: ' + nomesDiff[aiDifficulty];
    const icon = btnDiff.querySelector('.material-symbols-rounded');
    if (aiDifficulty === 1) {
      if (icon) icon.style.color = '#00f5d4';
      ambientLight.color.setHex(0x9e8cbe);
      ambientLight.intensity = 0.65;
    } else if (aiDifficulty === 2) {
      if (icon) icon.style.color = '#d0bcff';
      ambientLight.color.setHex(0x8a5cf5);
      ambientLight.intensity = 0.9;
    } else {
      if (icon) icon.style.color = '#ff4d6d';
      ambientLight.color.setHex(0xff0033);
      ambientLight.intensity = 0.5;
    }
  }
}

// Controles do Painel de Desafios por Arena e Nível
const btnPuzzlePrev = document.getElementById('btn-puzzle-prev');
const btnPuzzleNext = document.getElementById('btn-puzzle-next');
const btnPuzzleReset = document.getElementById('btn-puzzle-reset');
const btnPuzzleHint = document.getElementById('btn-puzzle-hint');

document.querySelectorAll('.puzzle-tab').forEach(tab => {
  tab.addEventListener('click', (e) => {
    sfx.playClick();
    const arenaId = e.currentTarget.dataset.arenaChallenge;
    loadChallenge(arenaId, 0);
  });
});

if (btnPuzzlePrev) btnPuzzlePrev.addEventListener('click', () => { 
  sfx.playClick(); 
  loadChallenge(currentChallengeArena, currentChallengeLevelIndex - 1); 
});

if (btnPuzzleNext) btnPuzzleNext.addEventListener('click', () => { 
  sfx.playClick(); 
  loadChallenge(currentChallengeArena, currentChallengeLevelIndex + 1); 
});

if (btnPuzzleReset) btnPuzzleReset.addEventListener('click', () => { 
  sfx.playClick(); 
  loadChallenge(currentChallengeArena, currentChallengeLevelIndex); 
});

if (btnPuzzleHint) {
  btnPuzzleHint.addEventListener('click', () => {
    sfx.playClick();
    const challenges = ARENA_CHALLENGES[currentChallengeArena];
    if (challenges && challenges[currentChallengeLevelIndex]) {
      const c = challenges[currentChallengeLevelIndex];
      showHighlights(c.solution[0].from.r, c.solution[0].from.c, [c.solution[0].to], true);
      const promptEl = document.getElementById('puzzle-prompt');
      if (promptEl) promptEl.innerHTML = `<span style="color:#f5c56b">💡 Dica: ${c.hint}</span>`;
    }
  });
}

// Botão Fechar Painel de Desafios e Voltar ao Modo Normal
const btnPuzzleClose = document.getElementById('btn-puzzle-close');
if (btnPuzzleClose) {
  btnPuzzleClose.addEventListener('click', (e) => {
    e.stopPropagation();
    sfx.playClick();
    isPuzzleMode = false;
    vsAI = true;
    const puzzleHud = document.getElementById('puzzle-hud');
    if (puzzleHud) puzzleHud.classList.add('hidden');
    
    const elW = document.getElementById('timer-w');
    const elB = document.getElementById('timer-b');
    if (elW) elW.style.display = 'flex';
    if (elB) elB.style.display = 'flex';

    const btnMode = document.getElementById('btn-mode');
    if (btnMode) {
      btnMode.classList.add('active');
      btnMode.querySelector('.btn-label').textContent = 'vs IA';
    }

    resetGame();
  });
}

// INICIAR PARTIDA - O jogo APENAS começa ao clicar expressamente neste botão
if (btnStartGame) {
  btnStartGame.addEventListener('click', (e) => {
    e.stopPropagation();
    sfx.init();
    sfx.playClick();

    isGameStarted = true;
    controls.enabled = true; // Libera os controles da câmera 3D
    if (startMenu) startMenu.classList.add('hidden');
    resetInactivityTimer();

    // Se escolheu modo Desafios
    if (isPuzzleMode) {
      loadChallenge(currentChallengeArena, 0);
      return;
    }

    const puzzleHud = document.getElementById('puzzle-hud');
    if (puzzleHud) puzzleHud.classList.add('hidden');

    // Se escolheu modo Online no menu inicial
    if (isOnlineGame) {
      openOnlineMenu();
      return;
    }

    // Modo vs IA ou 2 Jogadores Local
    whiteTimeRemaining = gameTimeSeconds;
    blackTimeRemaining = gameTimeSeconds;
    updateClockDisplays();
    startClockTimer();

    if (myColor === 'b') {
      applyCameraPreset(1, true); // Visão das pretas
      if (vsAI) setTimeout(checkAITurn, 600); // IA branca abre o jogo
    } else {
      applyCameraPreset(0, true); // Visão das brancas
    }
  });
}

// Botão para reabrir o Menu Inicial se o jogador desejar alterar configurações
const btnOpenMenu = document.getElementById('btn-open-menu');
if (btnOpenMenu && startMenu) {
  btnOpenMenu.addEventListener('click', () => {
    sfx.playClick();
    startMenu.classList.remove('hidden');
    isGameStarted = false;
    controls.enabled = false;
    const puzzleHud = document.getElementById('puzzle-hud');
    if (puzzleHud) puzzleHud.classList.add('hidden');
  });
}

// Botão Alternar Cor no Dock
const btnColor = document.getElementById('btn-color');
if (btnColor) {
  btnColor.addEventListener('click', () => {
    sfx.playClick();
    myColor = myColor === 'w' ? 'b' : 'w';
    updateColorButton();
    applyCameraPreset(myColor === 'w' ? 0 : 1);
    if (vsAI && engine.turn !== myColor) {
      checkAITurn();
    }
  });
}

// Botão Música Ambiente / Drone
const btnMusic = document.getElementById('btn-music');
if (btnMusic) {
  btnMusic.addEventListener('click', (e) => {
    sfx.init();
    const isPlaying = sfx.toggleAmbience();
    e.currentTarget.classList.toggle('active', isPlaying);
  });
}

// Botão Emotes Rápidos
const btnEmotes = document.getElementById('btn-emotes');
const emotesPopup = document.getElementById('emotes-popup');
if (btnEmotes && emotesPopup) {
  btnEmotes.addEventListener('click', (e) => {
    sfx.playClick();
    emotesPopup.classList.toggle('hidden');
    e.currentTarget.classList.toggle('active', !emotesPopup.classList.contains('hidden'));
  });

  document.querySelectorAll('.emote-btn').forEach(b => {
    b.addEventListener('click', (ev) => {
      const msg = ev.currentTarget.dataset.msg;
      sendEmote(msg);
      emotesPopup.classList.add('hidden');
      btnEmotes.classList.remove('active');
    });
  });
}

function showEmoteToast(text) {
  const container = document.getElementById('emote-toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'emote-toast';
  toast.textContent = text;
  container.appendChild(toast);
  sfx.playEmote();
  setTimeout(() => {
    if (toast.parentElement) toast.parentElement.removeChild(toast);
  }, 2800);
}

function sendEmote(msg) {
  showEmoteToast(msg);
  if (isOnlineGame && roomId && window.dbUpdate && window.db) {
    window.dbUpdate(window.dbRef(window.db, `rooms/${roomId}`), {
      lastEmote: { msg, color: myColor, time: Date.now() }
    });
  }
}

// Botão Desfazer
const btnUndo = document.getElementById('btn-undo');
if (btnUndo) {
  btnUndo.addEventListener('click', () => {
    if (isOnlineGame || isAnimating || !engine.history || engine.history.length === 0) return;
    sfx.playClick();
    engine.undo();
    
    if (vsAI && engine.turn !== myColor && engine.history.length > 0) {
      engine.undo();
    }

    const histList = document.getElementById('history-list');
    if (histList && histList.lastElementChild) {
      histList.removeChild(histList.lastElementChild);
    }

    while (lastMoveGroup.children.length > 0) lastMoveGroup.remove(lastMoveGroup.children[0]);
    selectedSquare = null; validMoves = []; clearHighlights();
    syncBoardMeshes();
    updateHUD();
  });
}

// Botão Histórico
const btnHistory = document.getElementById('btn-history');
const historyPanel = document.getElementById('history-panel');
if (btnHistory && historyPanel) {
  btnHistory.addEventListener('click', (e) => {
    sfx.playClick();
    historyPanel.classList.toggle('hidden');
    e.currentTarget.classList.toggle('active', !historyPanel.classList.contains('hidden'));
  });
}

// Botão Pausa / Menu da Partida
const btnPause = document.getElementById('btn-pause');
const pauseModal = document.getElementById('pause-modal');
const btnResume = document.getElementById('btn-resume');
const btnPauseRestart = document.getElementById('btn-pause-restart');
const btnPauseMainMenu = document.getElementById('btn-pause-main-menu');

if (btnPause && pauseModal) {
  btnPause.addEventListener('click', () => {
    sfx.playClick();
    isPaused = true;
    pauseModal.classList.remove('hidden');

    // Sincroniza visualmente o modo atual e a arena atual no menu de pausa
    document.querySelectorAll('#pause-mode-group .toggle-btn').forEach(b => {
      b.classList.remove('active');
      if (b.dataset.mode === 'online' && isOnlineGame) b.classList.add('active');
      else if (b.dataset.mode === 'puzzle' && isPuzzleMode) b.classList.add('active');
      else if (b.dataset.mode === 'ai' && vsAI && !isOnlineGame && !isPuzzleMode) b.classList.add('active');
      else if (b.dataset.mode === '2p' && !vsAI && !isOnlineGame && !isPuzzleMode) b.classList.add('active');
    });

    document.querySelectorAll('#pause-arena-group .toggle-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.arena === currentArena);
    });
  });
}

// Seletor de Modo de Jogo no Menu de Pausa
document.querySelectorAll('#pause-mode-group .toggle-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    sfx.playClick();
    document.querySelectorAll('#pause-mode-group .toggle-btn').forEach(b => b.classList.remove('active'));
    e.currentTarget.classList.add('active');
    const mode = e.currentTarget.dataset.mode;
    isPuzzleMode = (mode === 'puzzle');
    vsAI = (mode === 'ai');
    isOnlineGame = (mode === 'online');

    const btnMode = document.getElementById('btn-mode');
    if (btnMode) {
      btnMode.classList.toggle('active', vsAI || isPuzzleMode);
      btnMode.querySelector('.btn-label').textContent = isPuzzleMode ? 'Desafios' : (vsAI ? 'vs IA' : (isOnlineGame ? 'Online' : '2 Jogadores'));
    }

    if (isPuzzleMode) {
      pauseModal.classList.add('hidden');
      isPaused = false;
      loadChallenge(currentChallengeArena, 0);
    } else if (isOnlineGame) {
      pauseModal.classList.add('hidden');
      isPaused = false;
      createNewOnlineRoom();
    } else {
      const puzzleHud = document.getElementById('puzzle-hud');
      if (puzzleHud) puzzleHud.classList.add('hidden');
      const elW = document.getElementById('timer-w');
      const elB = document.getElementById('timer-b');
      if (elW) elW.style.display = 'flex';
      if (elB) elB.style.display = 'flex';
      resetGame();
    }
  });
});

if (btnResume && pauseModal) {
  btnResume.addEventListener('click', () => {
    sfx.playClick();
    isPaused = false;
    pauseModal.classList.add('hidden');
    checkAITurn();
  });
}

if (btnPauseRestart && pauseModal) {
  btnPauseRestart.addEventListener('click', () => {
    sfx.playClick();
    isPaused = false;
    pauseModal.classList.add('hidden');
    if (isPuzzleMode) loadChallenge(currentChallengeArena, currentChallengeLevelIndex);
    else resetGame();
  });
}

if (btnPauseMainMenu && pauseModal) {
  btnPauseMainMenu.addEventListener('click', () => {
    sfx.playClick();
    pauseModal.classList.add('hidden');
    isPaused = false;
    isGameStarted = false;
    controls.enabled = false;
    const puzzleHud = document.getElementById('puzzle-hud');
    if (puzzleHud) puzzleHud.classList.add('hidden');
    if (startMenu) startMenu.classList.remove('hidden');
  });
}

// Botão Modo no Dock
const btnMode = document.getElementById('btn-mode');
if (btnMode) {
  btnMode.addEventListener('click', (e) => {
    sfx.playClick();
    vsAI = !vsAI; 
    if (isOnlineGame) isOnlineGame = false;
    e.currentTarget.classList.toggle('active', vsAI);
    e.currentTarget.querySelector('.btn-label').textContent = vsAI ? 'vs IA' : '2 Jogadores';
    checkAITurn();
  });
}

// Botão Câmera
const btnCam = document.getElementById('btn-cam');
if (btnCam) {
  btnCam.addEventListener('click', () => {
    sfx.playClick();
    cameraPresetIndex = (cameraPresetIndex + 1) % CAMERA_PRESETS.length;
    applyCameraPreset(cameraPresetIndex);
  });
}

// Botão Oráculo (Dicas)
const btnHint = document.getElementById('btn-hint');
if (btnHint) {
  btnHint.addEventListener('click', () => {
    if (isAnimating || isCameraAnimating) return;
    sfx.playClick();
    const best = engine.chooseBestMove(engine.turn, aiDifficulty);
    if (best) { 
      selectedSquare = best.from; 
      validMoves = [best.to]; 
      showHighlights(best.from.r, best.from.c, [best.to], true); 
    }
  });
}

// Botão Abandonar (Resign / Rendição)
const btnResign = document.getElementById('btn-resign');
const resignModal = document.getElementById('resign-modal');
const btnConfirmResign = document.getElementById('btn-confirm-resign');
const btnCancelResign = document.getElementById('btn-cancel-resign');

if (btnResign && resignModal && btnConfirmResign && btnCancelResign) {
  btnResign.addEventListener('click', () => {
    sfx.playClick();
    resignModal.classList.remove('hidden');
  });

  btnCancelResign.addEventListener('click', () => {
    sfx.playClick();
    resignModal.classList.add('hidden');
  });

  btnConfirmResign.addEventListener('click', () => {
    sfx.playClick();
    resignModal.classList.add('hidden');

    showGameOverModal(
      'Batalha Encerrada',
      myColor === 'w' ? 'O Mármore rendeu-se e abandonou a batalha.' : 'A Obsidiana rendeu-se e abandonou a batalha.'
    );

    recordGameStats('loss');

    if (isOnlineGame && roomId && window.dbUpdate && window.db) {
      window.dbUpdate(window.dbRef(window.db, `rooms/${roomId}`), {
        resign: { color: myColor, time: Date.now() }
      });
    }
  });
}

// Botão Copiar PGN
const btnCopyPGN = document.getElementById('btn-copy-pgn');
if (btnCopyPGN) {
  btnCopyPGN.addEventListener('click', () => {
    sfx.playClick();
    const lis = document.querySelectorAll('#history-list li');
    let movesText = '';
    lis.forEach((li, index) => {
      const clean = li.innerText.replace(/\s+/g, ' ').trim();
      movesText += `${index + 1}. ${clean} `;
    });
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '.');
    const pgn = `[Event "Wizard's Chess 3D"]\n[Site "Catedral Arcana"]\n[Date "${today}"]\n[White "Mármore"]\n[Black "Obsidiana"]\n[Result "*"]\n\n${movesText || 'Nenhum lance efetuado'}\n`;
    navigator.clipboard.writeText(pgn).then(() => {
      btnCopyPGN.textContent = 'PGN Copiado!';
      setTimeout(() => { btnCopyPGN.textContent = 'Copiar PGN'; }, 2000);
    }).catch(() => {});
  });
}

// Botão Tela Cheia
const btnFullscreen = document.getElementById('btn-fullscreen');
if (btnFullscreen) {
  btnFullscreen.addEventListener('click', () => {
    sfx.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        if (screen.orientation && screen.orientation.lock) {
          screen.orientation.lock('landscape').catch(() => {});
        }
      }).catch(() => {});
    } else {
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
      document.exitFullscreen();
    }
  });
  
  document.addEventListener('fullscreenchange', () => {
    const icon = btnFullscreen.querySelector('.material-symbols-rounded');
    if (document.fullscreenElement) {
      if (icon) icon.textContent = 'fullscreen_exit';
      btnFullscreen.classList.add('active');
    } else {
      if (icon) icon.textContent = 'fullscreen';
      btnFullscreen.classList.remove('active');
    }
  });
}

// Botão Efeitos Sonoros
const btnAudio = document.getElementById('btn-audio');
if (btnAudio) {
  btnAudio.addEventListener('click', (e) => {
    sfx.enabled = !sfx.enabled; 
    e.currentTarget.classList.toggle('active', sfx.enabled);
    const icon = e.currentTarget.querySelector('.material-symbols-rounded');
    if (icon) icon.textContent = sfx.enabled ? 'volume_up' : 'volume_off';
  });
}

// Botão Reiniciar
const btnReset = document.getElementById('btn-reset');
function resetGame(fullReset = true) {
  if (isAnimating) return;
  sfx.playClick();
  selectedSquare = null; validMoves = []; clearHighlights();
  while (lastMoveGroup.children.length > 0) lastMoveGroup.remove(lastMoveGroup.children[0]);
  
  if (!isPuzzleMode) {
    const puzzleHud = document.getElementById('puzzle-hud');
    if (puzzleHud) puzzleHud.classList.add('hidden');
    const elW = document.getElementById('timer-w');
    const elB = document.getElementById('timer-b');
    if (elW) elW.style.display = 'flex';
    if (elB) elB.style.display = 'flex';
  }

  engine.reset();
  syncBoardMeshes();

  whiteTimeRemaining = gameTimeSeconds;
  blackTimeRemaining = gameTimeSeconds;
  updateClockDisplays();
  
  const hl = document.getElementById('history-list'); 
  if (hl) hl.innerHTML = '';
  
  const modalOver = document.getElementById('game-over-modal');
  if (modalOver) modalOver.classList.add('hidden');

  updateHUD();

  if (myColor === 'b' && vsAI) {
    setTimeout(checkAITurn, 600);
  }
}

if (btnReset) {
  btnReset.addEventListener('click', () => {
    if (isOnlineGame && roomId && window.dbUpdate && window.db) {
      window.dbUpdate(window.dbRef(window.db, `rooms/${roomId}`), { reset: Date.now() });
    } else {
      resetGame();
    }
  });
}

const btnPlayAgain = document.getElementById('btn-play-again');
if (btnPlayAgain) {
  btnPlayAgain.addEventListener('click', () => {
    const modalOver = document.getElementById('game-over-modal');
    if (modalOver) modalOver.classList.add('hidden');
    if (btnReset) btnReset.click();
  });
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  applyCameraPreset(cameraPresetIndex, true);
});

// ==========================================
// 10. SISTEMA MULTIJOGADOR ONLINE (FIREBASE)
// ==========================================
let lastResetTime = null;
let lastEmoteTime = null;
let lastProcessedMoveTime = null;
let hasNotifiedPlayer2Joined = false;
let lastResignTime = null;

function openOnlineMenu() {
  const waitingModal = document.getElementById('waiting-modal');
  const roomParam = new URLSearchParams(window.location.search).get('room');
  const isCreator = sessionStorage.getItem('myRoom') === (roomParam || roomId);

  if (pendingJoinRoom && !isCreator) {
    joinOnlineRoom(pendingJoinRoom);
    if (waitingModal) {
      waitingModal.classList.remove('hidden');
      const shortCodeEl = document.getElementById('room-short-code');
      if (shortCodeEl) shortCodeEl.textContent = pendingJoinRoom;
      const linkInput = document.getElementById('room-link-input');
      if (linkInput) linkInput.value = window.location.href;
    }
  } else if (roomId && isCreator) {
    resumeCreatorRoom(roomId);
  } else {
    createNewOnlineRoom();
  }
}

function createNewOnlineRoom() {
  sfx.playClick();
  engine.reset();
  syncBoardMeshes();
  
  isOnlineGame = true; myColor = 'w'; vsAI = false;
  hasNotifiedPlayer2Joined = false;
  lastProcessedMoveTime = null;
  updateColorButton();

  // Gera código curto amigável de 4 caracteres
  roomId = Math.random().toString(36).substring(2, 6).toUpperCase(); 
  sessionStorage.setItem('myRoom', roomId);

  if (window.dbSet && window.db) {
    window.dbSet(window.dbRef(window.db, `rooms/${roomId}`), {
      player2Joined: false, lastMove: null, reset: null, lastEmote: null, arena: currentArena
    });
  }

  window.history.replaceState(null, '', `?room=${roomId}`);
  const waitingModal = document.getElementById('waiting-modal');
  if (waitingModal) waitingModal.classList.remove('hidden');
  
  const shortCodeEl = document.getElementById('room-short-code');
  if (shortCodeEl) shortCodeEl.textContent = roomId;

  const linkInput = document.getElementById('room-link-input');
  if (linkInput) linkInput.value = window.location.href;

  const btnOnline = document.getElementById('btn-online');
  if (btnOnline) btnOnline.classList.add('active');
  listenToRoom(roomId);
  startClockTimer();
}

function joinOnlineRoom(code) {
  roomId = code.toUpperCase();
  isOnlineGame = true;
  myColor = 'b';
  vsAI = false;
  hasNotifiedPlayer2Joined = true;
  updateColorButton();
  if (window.dbUpdate && window.db) {
    window.dbUpdate(window.dbRef(window.db, `rooms/${roomId}`), { player2Joined: true });
  }
  listenToRoom(roomId);
  applyCameraPreset(1, true); 
  startClockTimer();
}

function resumeCreatorRoom(code) {
  roomId = code.toUpperCase();
  isOnlineGame = true;
  myColor = 'w';
  vsAI = false;
  updateColorButton();
  listenToRoom(roomId);
  const waitingModal = document.getElementById('waiting-modal');
  if (waitingModal) waitingModal.classList.remove('hidden'); 
  
  const shortCodeEl = document.getElementById('room-short-code');
  if (shortCodeEl) shortCodeEl.textContent = roomId;

  const linkInput = document.getElementById('room-link-input');
  if (linkInput) linkInput.value = window.location.href;
  const btnOnline = document.getElementById('btn-online');
  if (btnOnline) btnOnline.classList.add('active');
  startClockTimer();
}

function initOnlineGame() {
  const urlParams = new URLSearchParams(window.location.search);
  const room = urlParams.get('room');
  if (!room) return;

  const isCreator = sessionStorage.getItem('myRoom') === room;

  // JOGADOR 2: Entrou pelo link de convite
  if (!isCreator) {
    pendingJoinRoom = room.toUpperCase();
    isOnlineGame = true;
    vsAI = false;
    myColor = 'b';

    const btnOnlineMenu = document.querySelector('#menu-mode-group [data-mode="online"]');
    if (btnOnlineMenu) {
      document.querySelectorAll('#menu-mode-group .toggle-btn').forEach(b => b.classList.remove('active'));
      btnOnlineMenu.classList.add('active');
    }
    const diffSection = document.getElementById('menu-diff-section');
    if (diffSection) diffSection.style.display = 'none';

    const btnBlack = document.querySelector('#menu-color-group [data-color="b"]');
    if (btnBlack) {
      document.querySelectorAll('#menu-color-group .toggle-btn').forEach(b => b.classList.remove('active'));
      btnBlack.classList.add('active');
    }

    const menuSubtitle = document.querySelector('#start-menu p');
    if (menuSubtitle) {
      menuSubtitle.innerHTML = `⚔️ Convidado para a Sala <strong>${pendingJoinRoom}</strong>!<br>Configure suas opções e clique em <strong>Entrar na Catedral</strong>.`;
      menuSubtitle.style.color = '#00f5d4';
    }
  } 
  // JOGADOR 1: Recarregou a página da sua própria sala
  else {
    pendingJoinRoom = room.toUpperCase();
    isOnlineGame = true;
    vsAI = false;
    myColor = 'w';
    const btnOnlineMenu = document.querySelector('#menu-mode-group [data-mode="online"]');
    if (btnOnlineMenu) {
      document.querySelectorAll('#menu-mode-group .toggle-btn').forEach(b => b.classList.remove('active'));
      btnOnlineMenu.classList.add('active');
    }
    const diffSection = document.getElementById('menu-diff-section');
    if (diffSection) diffSection.style.display = 'none';
  }
}

// BOTÃO ONLINE NO DOCK
const btnOnline = document.getElementById('btn-online');
if (btnOnline) {
  btnOnline.addEventListener('click', () => {
    createNewOnlineRoom();
  });
}

// Botão Copiar Link
const btnCopy = document.getElementById('btn-copy-link');
if (btnCopy) {
  btnCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href);
    btnCopy.textContent = "Link Copiado!";
    btnCopy.style.background = "#00f5d4";
    btnCopy.style.color = "#000";
    setTimeout(() => {
      btnCopy.textContent = "Copiar Link";
      btnCopy.style.background = "";
      btnCopy.style.color = "";
    }, 2000);
  });
}

// Botão Fechar Modal Online
const btnCloseOnline = document.getElementById('btn-close-online');
const waitingModal = document.getElementById('waiting-modal');
if (btnCloseOnline && waitingModal) {
  btnCloseOnline.addEventListener('click', () => {
    waitingModal.classList.add('hidden');
  });
}

// Botão Entrar por Código Curto
const btnJoinCode = document.getElementById('btn-join-code');
const inputJoinCode = document.getElementById('input-join-code');
if (btnJoinCode && inputJoinCode) {
  const handleJoin = () => {
    const code = inputJoinCode.value.trim().toUpperCase();
    if (code) {
      joinOnlineRoom(code);
      window.history.replaceState(null, '', `?room=${code}`);
      const waitingModal = document.getElementById('waiting-modal');
      if (waitingModal) waitingModal.classList.add('hidden');
      showEmoteToast(`⚔️ Conectado à sala ${code}!`);
    }
  };
  btnJoinCode.addEventListener('click', handleJoin);
  inputJoinCode.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleJoin();
  });
}

function listenToRoom(id) {
  if (!window.dbOnValue || !window.db) return;
  
  const roomRef = window.dbRef(window.db, `rooms/${id}`);
  window.dbOnValue(roomRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    if (data.arena && data.arena !== currentArena) {
      setArenaTheme(data.arena);
    }

    if (data.player2Joined) {
      const waitingModal = document.getElementById('waiting-modal');
      if (waitingModal && !waitingModal.classList.contains('hidden')) {
        waitingModal.classList.add('hidden');
      }
      if (!hasNotifiedPlayer2Joined) {
        hasNotifiedPlayer2Joined = true;
        showEmoteToast("⚔️ Adversário entrou na sala!");
      }
    }

    if (data.reset && data.reset !== lastResetTime) {
      lastResetTime = data.reset;
      lastProcessedMoveTime = null;
      resetGame(false);
    }

    if (data.lastEmote && data.lastEmote.time !== lastEmoteTime) {
      lastEmoteTime = data.lastEmote.time;
      if (data.lastEmote.color !== myColor) {
        showEmoteToast(data.lastEmote.msg);
      }
    }

    if (data.resign && data.resign.time !== lastResignTime) {
      lastResignTime = data.resign.time;
      if (data.resign.color !== myColor) {
        showGameOverModal('Vitória por Desistência!', 'O adversário baixou as armas e abandonou a batalha!');
        recordGameStats('win');
        sfx.playVictory();
      }
    }

    if (data.lastMove && data.lastMove.color !== myColor && data.lastMove.time !== lastProcessedMoveTime) {
      lastProcessedMoveTime = data.lastMove.time;
      const from = data.lastMove.from; 
      const to = data.lastMove.to;
      const pieceData = engine.board[from.r][from.c];
      if (pieceData && pieceData.color !== myColor) {
         executeMove(from, to, null); 
      }
    }
  });
}

setTimeout(initOnlineGame, 500);

// ==========================================
// 11. LOOP DE ANIMAÇÃO PRINCIPAL
// ==========================================
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.1);
  const elapsed = clock.getElapsedTime();

  // Chamas das tochas pulsando
  flameLights.forEach((f) => { 
    f.light.intensity = f.baseIntensity + Math.sin(elapsed * 7 + f.phase) * 1.4; 
    f.orb.rotation.y += dt * 1.5; 
  });
  dustParticles.rotation.y = elapsed * 0.03;

  // Respiração mágica e levitação no hover
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const mesh = pieceMeshes[r][c];
      if (mesh) {
        const isHovered = (mesh === hoveredMesh);
        const targetHoverY = isHovered ? (mesh.userData.basePosY + 0.16) : mesh.userData.basePosY;
        mesh.position.y += (targetHoverY - mesh.position.y) * 0.18;

        const breathe = Math.sin(elapsed * 2.2 + mesh.userData.phase) * 0.018;
        mesh.scale.set(1, 1 + breathe, 1);
      }
    }
  }

  // Atualiza animações ativas
  for (let i = activeAnimations.length - 1; i >= 0; i--) { 
    if (activeAnimations[i].update(dt)) activeAnimations.splice(i, 1); 
  }

  // Faíscas de estilhaçamento
  for (let i = activeShards.length - 1; i >= 0; i--) {
    const s = activeShards[i];
    s.mesh.position.addScaledVector(s.vel, dt);
    s.mesh.rotation.x += s.rot.x * dt;
    s.mesh.rotation.y += s.rot.y * dt;
    s.life -= dt;
    const scale = Math.max(s.life / s.maxLife, 0.01);
    s.mesh.scale.set(scale, scale, scale);
    if (s.life <= 0) { 
      scene.remove(s.mesh); 
      activeShards.splice(i, 1); 
    }
  }

  // Partículas de Celebração de Vitória (Fireworks)
  for (let i = celebrationShards.length - 1; i >= 0; i--) {
    const s = celebrationShards[i];
    s.mesh.position.addScaledVector(s.vel, dt);
    s.vel.y -= 4.2 * dt; // gravidade
    s.mesh.rotation.x += s.rot.x * dt;
    s.mesh.rotation.y += s.rot.y * dt;
    s.life -= dt;
    const scale = Math.max(s.life / s.maxLife, 0.01);
    s.mesh.scale.set(scale, scale, scale);
    if (s.life <= 0) { 
      scene.remove(s.mesh); 
      celebrationShards.splice(i, 1); 
    }
  }

  // Tremor de tela (Screen Shake para impacto da Torre)
  if (screenShake > 0) {
    camera.position.x += (Math.random() - 0.5) * screenShake * 0.35;
    camera.position.y += (Math.random() - 0.5) * screenShake * 0.35;
    screenShake = Math.max(0, screenShake - dt * 2.2);
  }

  controls.update(); 
  renderer.render(scene, camera);
}

syncBoardMeshes();
animate();

// ==========================================
// MODO CINEMÁTICO AUTOMÁTICO (INATIVIDADE)
// ==========================================
let inactivityTimeout = null;

function resetInactivityTimer() {
  if (!isGameStarted) {
    if (controls) controls.autoRotate = false;
    clearTimeout(inactivityTimeout);
    return;
  }

  if (controls.autoRotate) {
    controls.autoRotate = false;
    cameraPresetIndex = (myColor === 'w' ? 0 : 1); 
    applyCameraPreset(cameraPresetIndex); 
  } else {
    controls.autoRotate = false;
  }

  clearTimeout(inactivityTimeout);
  inactivityTimeout = setTimeout(() => {
    if (isGameStarted) {
      controls.autoRotate = true;
    }
  }, 12000);
}

window.addEventListener('pointermove', resetInactivityTimer);
window.addEventListener('pointerdown', resetInactivityTimer);
window.addEventListener('keydown', resetInactivityTimer);
resetInactivityTimer();

// ==========================================
// SISTEMA DE ANÚNCIOS (SEGURANÇA MOBILE/WEB)
// ==========================================
async function iniciarAnuncios() {
  if (typeof AdMob === 'undefined' || typeof BannerAdSize === 'undefined') {
    return; // Executando na web comum
  }
  try {
    await AdMob.initialize({ requestTrackingAuthorization: true, initializeForTesting: true });
    await AdMob.showBanner({
      adId: 'ca-app-pub-3940256099942544/6300978111', 
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: true
    });
  } catch (erro) {
    // Silencia em ambiente web padrão
  }
}
iniciarAnuncios();
