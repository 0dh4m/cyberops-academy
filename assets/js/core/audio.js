/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <0dh4mm@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - Web Audio API Synthesizer
 * Provides sci-fi sound effects and acoustic feedback without external audio files.
 */
class CyberAudioSynth {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('cyberops_sound_muted') === 'true';
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  isAudioEnabled() {
    return !this.muted;
  }

  toggleSound() {
    this.muted = !this.muted;
    localStorage.setItem('cyberops_sound_muted', this.muted);
    return !this.muted;
  }

  playTone(freq = 440, type = 'sine', duration = 0.1, gainVal = 0.05) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy catch
    }
  }

  playKeypress() {
    this.playTone(600 + Math.random() * 200, 'triangle', 0.04, 0.02);
  }

  playSuccess() {
    if (this.muted) return;
    this.playTone(523.25, 'sine', 0.1, 0.06); // C5
    setTimeout(() => this.playTone(659.25, 'sine', 0.1, 0.06), 90); // E5
    setTimeout(() => this.playTone(783.99, 'sine', 0.2, 0.07), 180); // G5
  }

  playError() {
    if (this.muted) return;
    this.playTone(180, 'sawtooth', 0.15, 0.08);
    setTimeout(() => this.playTone(130, 'sawtooth', 0.25, 0.09), 120);
  }

  playAlert() {
    if (this.muted) return;
    this.playTone(300, 'sawtooth', 0.15, 0.04);
    setTimeout(() => this.playTone(220, 'sawtooth', 0.15, 0.04), 100);
  }

  playScan() {
    if (this.muted) return;
    this.playTone(900, 'sine', 0.06, 0.04);
    setTimeout(() => this.playTone(1200, 'sine', 0.06, 0.04), 70);
  }

  playLevelUp() {
    if (this.muted) return;
    const notes = [440, 554, 659, 880];
    notes.forEach((f, idx) => {
      setTimeout(() => this.playTone(f, 'square', 0.15, 0.05), idx * 100);
    });
  }

  click() {
    this.playKeypress();
  }

  success() {
    this.playSuccess();
  }

  alert() {
    this.playAlert();
  }

  error() {
    this.playError();
  }
}

if (typeof window !== 'undefined') {
  window.CyberAudio = new CyberAudioSynth();
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CyberAudioSynth };
}
