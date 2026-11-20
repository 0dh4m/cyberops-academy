/**
 * CyberOps Academy - Cryptography Playground
 * Native Web Crypto API (AES-256-GCM, SHA-256, SHA-512, Base64, Caesar Cipher)
 */
const CryptoLab = {
  init() {
    const inputField = document.getElementById("crypto-input-text");
    const algoSelect = document.getElementById("crypto-algo-select");
    const keyField = document.getElementById("crypto-key-input");
    const caesarShift = document.getElementById("caesar-shift-slider");
    const caesarShiftVal = document.getElementById("caesar-shift-val");

    if (caesarShift && caesarShiftVal) {
      caesarShift.addEventListener("input", () => {
        caesarShiftVal.innerText = caesarShift.value;
        this.run();
      });
    }

    if (algoSelect) {
      algoSelect.addEventListener("change", () => {
        const algo = algoSelect.value;
        const caesarGroup = document.getElementById("caesar-controls");
        const keyGroup = document.getElementById("crypto-key-group");

        if (caesarGroup) caesarGroup.style.display = algo === "caesar" ? "block" : "none";
        if (keyGroup) keyGroup.style.display = algo.startsWith("aes") ? "block" : "none";
        this.run();
      });
    }

    if (inputField) inputField.addEventListener("input", () => this.run());
    if (keyField) keyField.addEventListener("input", () => this.run());

    // Initial run
    this.run();
  },

  async run() {
    const input = document.getElementById("crypto-input-text")?.value || "";
    const algo = document.getElementById("crypto-algo-select")?.value || "sha256";
    const outputEl = document.getElementById("crypto-output-text");
    const detailsEl = document.getElementById("crypto-details-info");
    if (!outputEl) return;

    try {
      if (algo === "sha256") {
        const hash = await this.sha256(input);
        outputEl.innerText = hash;
        if (detailsEl) detailsEl.innerHTML = `<span class="badge-safe">SHA-256 Digest (256 bits / 64 hex characters)</span> • One-way mathematical hash function used in Bitcoin blockchain and TLS X.509 certificates.`;
      } else if (algo === "sha512") {
        const hash = await this.sha512(input);
        outputEl.innerText = hash;
        if (detailsEl) detailsEl.innerHTML = `<span class="badge-safe">SHA-512 Digest (512 bits / 128 hex characters)</span> • Ultra-high collision-resistant cryptographic hash for enterprise signatures.`;
      } else if (algo === "base64") {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        outputEl.innerText = encoded;
        if (detailsEl) detailsEl.innerHTML = `<span class="badge-info">Base64 Encoding</span> • Binary-to-text encoding scheme designed for transport across 7-bit ASCII protocols (Not an encryption cipher!).`;
      } else if (algo === "caesar") {
        const shift = parseInt(document.getElementById("caesar-shift-slider")?.value || "3", 10);
        const shifted = this.caesarCipher(input, shift);
        outputEl.innerText = shifted;
        if (detailsEl) detailsEl.innerHTML = `<span class="badge-warning">Caesar Shift (+${shift})</span> • Classical monoalphabetic substitution cipher, breakable in milliseconds via frequency analysis.`;
      } else if (algo === "aes-gcm") {
        const password = document.getElementById("crypto-key-input")?.value || "SecOpsPassword#2026";
        const encrypted = await this.aesEncrypt(input, password);
        outputEl.innerText = encrypted.ciphertextHex;
        if (detailsEl) {
          detailsEl.innerHTML = `
            <span class="badge-safe">AES-256-GCM (Authenticated Encryption - AEAD)</span><br>
            • <strong>Salt:</strong> <code>${encrypted.saltHex}</code><br>
            • <strong>IV (Nonce):</strong> <code>${encrypted.ivHex}</code><br>
            • <strong>Properties:</strong> Enforces both Confidentiality and Data Integrity verification against bit-flipping attacks.
          `;
        }
      }
    } catch (err) {
      outputEl.innerText = "Error: " + err.message;
    }
  },

  async sha256(str) {
    const buf = new TextEncoder().encode(str);
    const hash = await crypto.subtle.digest("SHA-256", buf);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
  },

  async sha512(str) {
    const buf = new TextEncoder().encode(str);
    const hash = await crypto.subtle.digest("SHA-512", buf);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
  },

  caesarCipher(str, shift) {
    return str.split('').map(char => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
      return char;
    }).join('');
  },

  async aesEncrypt(plaintext, password) {
    const enc = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const keyMaterial = await crypto.subtle.importKey(
      "raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveKey"]
    );
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2", salt: salt, iterations: 100000, hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt"]
    );

    const ciphertextBuf = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv }, key, enc.encode(plaintext)
    );

    const bufToHex = (buf) => Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");

    return {
      saltHex: bufToHex(salt),
      ivHex: bufToHex(iv),
      ciphertextHex: bufToHex(ciphertextBuf)
    };
  }
};

window.CryptoLab = CryptoLab;
