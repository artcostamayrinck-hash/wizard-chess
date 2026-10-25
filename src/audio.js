export class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.ambientPlaying = false;
    this.ambientGain = null;
    this.ambientNodes = [];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Deslizamento de pedra ao mover peça
  playSlide() {
    if (!this.enabled) return;
    this.init();
    const duration = 0.45;
    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.6));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(190, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

    noise.connect(filter).connect(gain).connect(this.ctx.destination);
    noise.start();
  }

  // Estilhaçamento de peça capturada
  playShatter() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(28, now + 0.35);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.38);

    osc.connect(gain).connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);

    // Faíscas agudas de vidro/pedra
    const sparkOsc = this.ctx.createOscillator();
    const sparkGain = this.ctx.createGain();
    sparkOsc.type = 'sine';
    sparkOsc.frequency.setValueAtTime(880, now);
    sparkOsc.frequency.exponentialRampToValueAtTime(220, now + 0.25);
    sparkGain.gain.setValueAtTime(0.2, now);
    sparkGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    sparkOsc.connect(sparkGain).connect(this.ctx.destination);
    sparkOsc.start(now);
    sparkOsc.stop(now + 0.3);
  }

  // Aviso sonoro solene de Xeque (sino sombrio)
  playCheck() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    [174.61, 261.63, 349.23].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.98, now + 1.2);

      const peak = 0.25 / (idx + 1);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.exponentialRampToValueAtTime(peak, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain).connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 1.3);
    });
  }

  // Fanfarra mística arpejada de Vitória / Xeque-Mate
  playVictory() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C, E, G, C, E, G
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const start = now + idx * 0.11;
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.25, start + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 1.4);

      osc.connect(gain).connect(this.ctx.destination);
      osc.start(start);
      osc.stop(start + 1.5);
    });
  }

  // Clique de pedra suave para interface
  playClick() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.06);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain).connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);
  }

  // Raio místico do Bispo
  playBeam() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.linearRampToValueAtTime(880, now + 0.35);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(650, now);
    filter.Q.setValueAtTime(4, now);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(filter).connect(gain).connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.45);
  }

  // Estrondo e tremor sísmico da Torre
  playTremor() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(65, now);
    osc.frequency.exponentialRampToValueAtTime(20, now + 0.6);

    gain.gain.setValueAtTime(0.65, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    osc.connect(gain).connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.7);
  }

  // Vórtice arcano da Rainha
  playVortex() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(720, now + 0.25);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.5);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    osc.connect(gain).connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.6);
  }

  // Toque cristalino para chat e emotes
  playEmote() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    [659.25, 987.77].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const start = now + idx * 0.08;
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.18, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);

      osc.connect(gain).connect(this.ctx.destination);
      osc.start(start);
      osc.stop(start + 0.45);
    });
  }

  // Trilha sonora ambiente procedural (Drone místico de catedral)
  toggleAmbience() {
    if (this.ambientPlaying) {
      this.stopAmbience();
      return false;
    } else {
      this.startAmbience();
      return true;
    }
  }

  startAmbience() {
    if (this.ambientPlaying) return;
    this.init();
    this.ambientPlaying = true;

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.09, this.ctx.currentTime + 3.0);
    masterGain.connect(this.ctx.destination);
    this.ambientGain = masterGain;

    // Harmônicos do acorde místico: D2, A2, D3, F3
    const freqs = [73.42, 110.00, 146.83, 174.61];
    this.ambientNodes = [];

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Desafinação sutil para criar reverberação mística natural
      const detune = (Math.random() - 0.5) * 8;
      osc.detune.setValueAtTime(detune, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(260 + idx * 70, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.2 / (idx + 1), this.ctx.currentTime);

      osc.connect(filter).connect(gain).connect(masterGain);
      osc.start();
      this.ambientNodes.push(osc);
    });
  }

  stopAmbience() {
    if (!this.ambientPlaying || !this.ambientGain) return;
    this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, this.ctx.currentTime);
    this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
    setTimeout(() => {
      this.ambientNodes.forEach(node => {
        try { node.stop(); } catch (e) {}
      });
      this.ambientNodes = [];
      this.ambientPlaying = false;
    }, 1300);
  }

  // Trovão e impacto pesado do Cavalo
  playThunderStomp() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    
    // Impacto grave (sub-bass)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(95, now);
    osc.frequency.exponentialRampToValueAtTime(25, now + 0.4);
    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.5);

    // Ruído de faísca elétrica do salto
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.25);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);
    const nGain = this.ctx.createGain();
    nGain.gain.setValueAtTime(0.35, now);
    nGain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    noise.connect(filter).connect(nGain).connect(this.ctx.destination);
    noise.start(now);
  }

  // Golpe sagrado e autoridade do Rei
  playRoyalSmite() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    [220, 440, 659.25, 880].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.2 / (idx + 1), now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
      osc.connect(gain).connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 1.0);
    });
  }

  // Estocada rápida e cristalina do Peão
  playPawnThrust() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(580, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.18);
    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  // Sino de vitória ao acertar enigma do Grimório
  playPuzzleSuccess() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      const st = now + i * 0.08;
      osc.frequency.setValueAtTime(freq, st);
      gain.gain.setValueAtTime(0.01, st);
      gain.gain.linearRampToValueAtTime(0.22, st + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.7);
      osc.connect(gain).connect(this.ctx.destination);
      osc.start(st);
      osc.stop(st + 0.75);
    });
  }

  // Som sombrio de erro em enigma
  playPuzzleFail() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.35);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
  }
}