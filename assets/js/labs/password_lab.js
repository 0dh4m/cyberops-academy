/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <adamcherkaoui99@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - Password Entropy & Hash Cracking Lab
 * Cryptographic key space analysis, GPU crack time estimation & breach check
 */
const PasswordLab = {
  commonBreached: [
    "password", "123456", "12345678", "123456789", "qwerty", "admin", "welcome",
    "password123", "iloveyou", "monkey", "dragon", "master", "football", "letmein",
    "shadow", "trustno1", "superman", "starwars", "maroc", "morocco", "azerty", "12345"
  ],

  init() {
    const input = document.getElementById("pass-lab-input");
    const toggleVis = document.getElementById("pass-lab-toggle-vis");
    const genBtn = document.getElementById("btn-pass-generate");
    const lenSlider = document.getElementById("pass-gen-len-slider");
    const lenVal = document.getElementById("pass-gen-len-val");

    if (input) input.addEventListener("input", () => this.analyze());

    if (toggleVis && input) {
      toggleVis.addEventListener("click", () => {
        const isPass = input.type === "password";
        input.type = isPass ? "text" : "password";
        toggleVis.innerText = isPass ? "🔒 Hide" : "👁️ Show";
      });
    }

    if (lenSlider && lenVal) {
      lenSlider.addEventListener("input", () => {
        lenVal.innerText = lenSlider.value;
      });
    }

    if (genBtn) genBtn.addEventListener("click", () => this.generatePassword());

    // Initial analysis
    this.analyze();
  },

  generatePassword() {
    const len = parseInt(document.getElementById("pass-gen-len-slider")?.value || "16", 10);
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}";
    const randomVals = new Uint32Array(len);
    crypto.getRandomValues(randomVals);
    let pass = "";
    for (let i = 0; i < len; i++) {
      pass += chars[randomVals[i] % chars.length];
    }
    const input = document.getElementById("pass-lab-input");
    if (input) {
      input.value = pass;
      this.analyze();
      if (window.CyberAudio) window.CyberAudio.playKeypress();
    }
  },

  async analyze() {
    const input = document.getElementById("pass-lab-input")?.value || "";
    const len = input.length;

    let pool = 0;
    if (/[a-z]/.test(input)) pool += 26;
    if (/[A-Z]/.test(input)) pool += 26;
    if (/[0-9]/.test(input)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(input)) pool += 33;

    const entropy = len === 0 || pool === 0 ? 0 : Math.round(len * Math.log2(pool));
    const totalCombos = pool === 0 ? 0 : Math.pow(pool, len);

    // Crack time estimation:
    // 8x RTX 4090 cluster for NTLM / Fast Hash can perform ~500 billion hashes/sec (5e11)
    const gpuHashesPerSec = 5e11;
    const secondsToCrack = totalCombos === 0 ? 0 : totalCombos / (2 * gpuHashesPerSec);

    const formatTime = (sec) => {
      if (sec <= 0.001) return "Instant (< 1 millisecond)";
      if (sec < 60) return `${Math.round(sec)} seconds`;
      if (sec < 3600) return `${Math.round(sec / 60)} minutes`;
      if (sec < 86400) return `${Math.round(sec / 3600)} hours`;
      if (sec < 31536000) return `${Math.round(sec / 86400)} days`;
      if (sec < 31536000000) return `${Math.round(sec / 31536000).toLocaleString()} years`;
      return "Centuries (Centaines de siècles)";
    };

    // Strength tier
    let strengthLabel = "VERY WEAK";
    let strengthClass = "strength-weak";
    if (entropy >= 80) {
      strengthLabel = "MILITARY GRADE (VERY STRONG)";
      strengthClass = "strength-strong";
    } else if (entropy >= 60) {
      strengthLabel = "STRONG (Enterprise)";
      strengthClass = "strength-good";
    } else if (entropy >= 36) {
      strengthLabel = "MODERATE (Vulnerable to GPU Cracking)";
      strengthClass = "strength-med";
    }

    // Check breach list
    const isBreached = this.commonBreached.includes(input.toLowerCase());

    // Compute live SHA-256
    let sha256Hex = "—";
    if (input) {
      const buf = new TextEncoder().encode(input);
      const hash = await crypto.subtle.digest("SHA-256", buf);
      sha256Hex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
    }

    const resBox = document.getElementById("pass-lab-results");
    if (resBox) {
      resBox.innerHTML = `
        <div class="pass-metrics-grid">
          <div class="pass-metric-card">
            <span class="p-label">Information Entropy:</span>
            <span class="p-val">${entropy} bits</span>
            <span class="p-sub">Character pool: ${pool} available chars</span>
          </div>

          <div class="pass-metric-card">
            <span class="p-label">Password Strength:</span>
            <span class="p-val ${strengthClass}">${strengthLabel}</span>
            <span class="p-sub">Length: ${len} characters</span>
          </div>

          <div class="pass-metric-card">
            <span class="p-label">GPU Cluster Crack Time (8x RTX 4090):</span>
            <span class="p-val ${secondsToCrack < 3600 ? 'text-red' : 'text-green'}">${isBreached ? '0.0001s (In Breach Dict)' : formatTime(secondsToCrack)}</span>
            <span class="p-sub">500,000,000,000 attempts / sec</span>
          </div>
        </div>

        ${isBreached ? `
          <div class="sqli-alert sqli-breach mt-3">
            <div class="alert-icon">🚨</div>
            <div class="alert-content">
              <h4>CRITICAL: PASSWORD FOUND IN GLOBAL LEAK DICTIONARIES (ROCKYOU)</h4>
              <p>This password appears in public credential dumps. Adversaries using credential stuffing and rainbow tables will compromise this in less than a fraction of a millisecond!</p>
            </div>
          </div>
        ` : ''}

        <div class="pass-hashes-box mt-3">
          <div class="hash-title">Real-Time Cryptographic Hashes:</div>
          <div class="hash-row">
            <span class="hash-type">SHA-256:</span>
            <code class="hash-val">${sha256Hex}</code>
            <button class="cyber-btn cyber-btn-outline btn-xs" onclick="CyberUtils.copyToClipboard('${sha256Hex}', this)">Copy</button>
          </div>
        </div>
      `;
    }
  }
};

window.PasswordLab = PasswordLab;
