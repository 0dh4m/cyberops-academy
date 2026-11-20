/**
 * CyberOps Academy - AI Voice Mentor & Text-to-Speech Engine
 * Provides audio briefings and narrations for modules, tutorials, and incident reports.
 * Uses browser-native SpeechSynthesis with bilingual English / French voice detection.
 */
class VoiceMentorEngine {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.currentUtterance = null;
    this.isPlaying = false;
    this.voices = [];

    if (this.synth) {
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices() || [];
  }

  getLangVoice(lang) {
    if (!this.voices || this.voices.length === 0) this.loadVoices();
    const prefix = lang === 'fr' ? 'fr' : 'en';
    const match = this.voices.find(v => v.lang && v.lang.toLowerCase().startsWith(prefix));
    return match || (this.voices.length > 0 ? this.voices[0] : null);
  }

  speak(text, onStartCallback = null, onEndCallback = null) {
    if (!this.synth) {
      if (window.CyberUtils) window.CyberUtils.showToast("Text-to-Speech not supported in this browser environment", "info");
      return;
    }

    this.stop();

    if (!text || text.trim().length === 0) return;

    // Clean markdown asterisks and symbols for cleaner audio narration
    const cleanText = text
      .replace(/[*_#`~]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .trim();

    const lang = window.CyberI18n ? window.CyberI18n.getLanguage() : 'en';
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'fr' ? 'fr-FR' : 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voice = this.getLangVoice(lang);
    if (voice) utterance.voice = voice;

    utterance.onstart = () => {
      this.isPlaying = true;
      if (typeof onStartCallback === 'function') onStartCallback();
    };

    utterance.onend = () => {
      this.isPlaying = false;
      this.currentUtterance = null;
      if (typeof onEndCallback === 'function') onEndCallback();
    };

    utterance.onerror = () => {
      this.isPlaying = false;
      this.currentUtterance = null;
      if (typeof onEndCallback === 'function') onEndCallback();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
    }
    this.isPlaying = false;
    this.currentUtterance = null;
  }

  toggle(text, buttonEl, playingText = "⏹️ Stop Voice", normalText = "🔊 Audio Briefing") {
    if (this.isPlaying) {
      this.stop();
      if (buttonEl) buttonEl.innerHTML = normalText;
    } else {
      if (buttonEl) buttonEl.innerHTML = playingText;
      this.speak(text, null, () => {
        if (buttonEl) buttonEl.innerHTML = normalText;
      });
    }
  }
}

window.VoiceMentor = new VoiceMentorEngine();
