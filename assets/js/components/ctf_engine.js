/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <0dh4mm@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - CTF Challenges Arena Engine
 * Interactive flag validation with SHA-256 cryptographic verification & Quick-Decoder tool.
 */
class CtfEngine {
  constructor() {
    this.challenges = window.CtfChallengesData || [];
    this.currentFilter = "all";
    this.STORAGE_KEY = "cyberops_solved_ctf";
    this.revealedHints = new Set();
  }

  init() {
    this.setupFilters();
    this.setupQuickDecoder();
    this.render();
  }

  getSolvedList() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  isSolved(id) {
    return this.getSolvedList().includes(id);
  }

  markSolved(id, points) {
    const list = this.getSolvedList();
    if (!list.includes(id)) {
      list.push(id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
      if (window.CyberState) {
        window.CyberState.addXP(points, `CTF Challenge Solved: ${id}`);
      }
      return true;
    }
    return false;
  }

  setupFilters() {
    document.querySelectorAll(".ctf-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".ctf-filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentFilter = btn.dataset.ctfFilter;
        this.render();
        if (window.CyberAudio) window.CyberAudio.playKeypress();
      });
    });
  }

  setupQuickDecoder() {
    const decodeBtn = document.getElementById("btn-ctf-quick-decode");
    const input = document.getElementById("ctf-decoder-input");
    const output = document.getElementById("ctf-decoder-output");
    const typeSelect = document.getElementById("ctf-decoder-type");

    if (decodeBtn && input && output && typeSelect) {
      decodeBtn.addEventListener("click", () => {
        const val = input.value.trim();
        const type = typeSelect.value;
        try {
          let res = "";
          if (type === "base64") {
            res = atob(val);
          } else if (type === "hex") {
            const cleanHex = val.replace(/\s+/g, "");
            let str = "";
            for (let i = 0; i < cleanHex.length; i += 2) {
              str += String.fromCharCode(parseInt(cleanHex.substr(i, 2), 16));
            }
            res = str;
          } else if (type === "rot13") {
            res = val.replace(/[a-zA-Z]/g, (c) => {
              const base = c <= 'Z' ? 65 : 97;
              return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
            });
          } else if (type === "url") {
            res = decodeURIComponent(val);
          }
          output.innerText = res || "(Empty output)";
          if (window.CyberAudio) window.CyberAudio.playSuccess();
        } catch (err) {
          output.innerText = "Error: Invalid encoded string for selected format.";
          if (window.CyberAudio) window.CyberAudio.playError();
        }
      });
    }
  }

  async validateFlag(challengeId) {
    const ch = this.challenges.find(c => c.id === challengeId);
    if (!ch) return;

    const input = document.getElementById(`flag-input-${challengeId}`);
    const alertBox = document.getElementById(`flag-alert-${challengeId}`);
    if (!input) return;

    const submittedFlag = input.value.trim();
    if (!submittedFlag) {
      if (alertBox) {
        alertBox.className = "ctf-alert ctf-alert-error";
        alertBox.innerText = "Please enter a flag to submit.";
      }
      return;
    }

    // Compute SHA-256 hash of submitted flag
    const buf = new TextEncoder().encode(submittedFlag);
    const hashBuf = await crypto.subtle.digest("SHA-256", buf);
    const hashHex = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, "0")).join("");

    if (hashHex === ch.flagHash) {
      // SUCCESS!
      this.markSolved(ch.id, ch.points);
      if (window.CyberAudio) window.CyberAudio.playLevelUp();
      if (window.CyberUtils) {
        window.CyberUtils.showToast(`🎉 FLAG CAPTURED! +${ch.points} XP`, "success", 4000);
      }
      this.render();
    } else {
      // INCORRECT
      if (window.CyberAudio) window.CyberAudio.playError();
      if (alertBox) {
        alertBox.className = "ctf-alert ctf-alert-error";
        alertBox.innerText = "❌ Incorrect Flag. Double-check your payload or decode carefully!";
        setTimeout(() => { if (alertBox) alertBox.innerText = ""; }, 4000);
      }
    }
  }

  toggleHint(challengeId, hintIndex) {
    const key = `${challengeId}-${hintIndex}`;
    const el = document.getElementById(`hint-${key}`);
    const btn = document.getElementById(`btn-hint-${key}`);
    if (!el || !btn) return;

    const isVisible = el.style.display === "block";
    el.style.display = isVisible ? "none" : "block";
    btn.innerText = isVisible ? `💡 Hint ${hintIndex + 1}` : `🙈 Hide Hint ${hintIndex + 1}`;
    if (window.CyberAudio) window.CyberAudio.playKeypress();
  }

  getFiltered() {
    return this.challenges.filter(c => {
      if (this.currentFilter === "all") return true;
      if (this.currentFilter === "solved") return this.isSolved(c.id);
      if (this.currentFilter === "unsolved") return !this.isSolved(c.id);
      return c.category.toLowerCase().includes(this.currentFilter.toLowerCase());
    });
  }

  render() {
    const grid = document.getElementById("ctf-grid-container");
    const scoreboard = document.getElementById("ctf-scoreboard-stats");
    if (!grid) return;

    const isFr = window.CyberI18n ? window.CyberI18n.getLanguage() === 'fr' : false;
    const solvedList = this.getSolvedList();
    const totalPoints = this.challenges.reduce((sum, c) => sum + c.points, 0);
    const earnedPoints = this.challenges.filter(c => solvedList.includes(c.id)).reduce((sum, c) => sum + c.points, 0);

    // Update scoreboard
    if (scoreboard) {
      scoreboard.innerHTML = `
        <div class="ctf-stat-card">
          <span class="ctf-stat-label">${isFr ? 'Défis Résolus' : 'Solved Challenges'}</span>
          <span class="ctf-stat-val text-green">${solvedList.length} / ${this.challenges.length}</span>
        </div>
        <div class="ctf-stat-card">
          <span class="ctf-stat-label">${isFr ? 'Score CTF Gagné' : 'CTF Points Earned'}</span>
          <span class="ctf-stat-val text-cyan">${earnedPoints.toLocaleString()} / ${totalPoints.toLocaleString()} PTS</span>
        </div>
      `;
    }

    const filtered = this.getFiltered();
    grid.innerHTML = "";

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">🚩</div>
          <h3>${isFr ? 'Aucun défi correspondant' : 'No matching CTF challenges'}</h3>
          <p>${isFr ? 'Essayez de changer de catégorie.' : 'Try selecting another category or status.'}</p>
        </div>
      `;
      return;
    }

    const isFree = window.CyberState ? window.CyberState.isFreeAccessMode() : true;

    filtered.forEach(ch => {
      const isSolved = this.isSolved(ch.id);
      const title = isFr ? ch.titleFr : ch.titleEn;
      const desc = isFr ? ch.descriptionFr : ch.descriptionEn;
      const diffClass = ch.difficulty === "Easy" ? "diff-easy" : ch.difficulty === "Medium" ? "diff-med" : "diff-hard";

      // Check progressive milestone lock
      let isLocked = false;
      let unlockReq = "";
      if (!isFree && !isSolved) {
        if (ch.difficulty === "Medium" && solvedList.length < 1) {
          isLocked = true;
          unlockReq = isFr ? "Résolvez au moins 1 défi Débutant pour débloquer" : "Solve at least 1 Easy challenge to unlock";
        } else if (ch.difficulty === "Hard" && solvedList.length < 2) {
          isLocked = true;
          unlockReq = isFr ? "Résolvez au moins 2 défis pour débloquer" : "Solve at least 2 challenges to unlock";
        }
      }

      const card = document.createElement("div");
      card.className = `ctf-card ${isSolved ? 'ctf-card-solved' : ''} ${isLocked ? 'ctf-card-locked' : ''}`;

      let hintsHtml = "";
      const hintLabelsEn = ["💡 Nudge", "🔍 Clue", "🛠️ Walkthrough"];
      const hintLabelsFr = ["💡 Piste", "🔍 Indice", "🛠️ Solution"];
      ch.hints.forEach((hint, idx) => {
        const label = (isFr ? hintLabelsFr[idx] : hintLabelsEn[idx]) || (isFr ? `Indice ${idx + 1}` : `Hint ${idx + 1}`);
        hintsHtml += `
          <button class="cyber-btn btn-xs cyber-btn-outline" id="btn-hint-${ch.id}-${idx}" onclick="window.CtfArena.toggleHint('${ch.id}', ${idx})" ${isLocked ? 'disabled' : ''}>
            ${label}
          </button>
          <div id="hint-${ch.id}-${idx}" class="ctf-hint-box" style="display: none;">
            ${hint}
          </div>
        `;
      });

      card.innerHTML = `
        <div class="ctf-card-header">
          <div class="ctf-meta-left">
            <span class="ctf-icon">${ch.icon}</span>
            <span class="ctf-cat">${ch.category}</span>
          </div>
          <div class="ctf-meta-right">
            ${isLocked ? `
              <span class="ctf-locked-tag">🔒 ${isFr ? 'Verrouillé' : 'Locked'}</span>
            ` : `
              <span class="ctf-diff ${diffClass}">${ch.difficulty}</span>
            `}
            <span class="ctf-points">+${ch.points} PTS</span>
          </div>
        </div>

        <div class="ctf-card-body">
          <h3 class="ctf-title">${title}</h3>
          <p class="ctf-desc">${desc}</p>

          <div class="ctf-artifact-box">
            <div class="ctf-artifact-header">
              <span>TARGET PUZZLE ARTIFACT [${ch.artifactType.toUpperCase()}]</span>
              <button class="cyber-btn btn-xs cyber-btn-outline" onclick="CyberUtils.copyToClipboard(document.getElementById('art-${ch.id}').innerText, this)" ${isLocked ? 'disabled' : ''}>Copy</button>
            </div>
            <pre class="ctf-artifact-code" id="art-${ch.id}"><code>${window.CyberUtils ? window.CyberUtils.escapeHtml(ch.artifact) : ch.artifact}</code></pre>
          </div>

          <div class="ctf-hints-bar">
            ${hintsHtml}
          </div>
        </div>

        <div class="ctf-card-footer">
          ${isSolved ? `
            <div class="ctf-solved-banner">
              <span class="solved-icon">✓</span>
              <span>${isFr ? 'DÉFI RÉSOLU & VALIDÉ (+ ' + ch.points + ' XP)' : 'CHALLENGE SOLVED & FLAG CAPTURED (+ ' + ch.points + ' XP)'}</span>
            </div>
          ` : isLocked ? `
            <div class="ctf-locked-footer">
              <span>🔒 ${unlockReq}</span>
            </div>
          ` : `
            <div class="ctf-submit-row">
              <input type="text" id="flag-input-${ch.id}" class="cyber-input ctf-flag-field" placeholder="FLAG{...}" onkeydown="if(event.key==='Enter') window.CtfArena.validateFlag('${ch.id}')">
              <button class="cyber-btn cyber-btn-primary" onclick="window.CtfArena.validateFlag('${ch.id}')">
                🚩 ${isFr ? 'Soumettre' : 'Submit'}
              </button>
            </div>
            <div id="flag-alert-${ch.id}" class="ctf-alert-box"></div>
          `}
        </div>
      `;

      grid.appendChild(card);
    });
  }
}

window.CtfArena = new CtfEngine();
