/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <adamcherkaoui99@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - Live SOC Incident Response Crisis Wargame Engine
 * Real-time simulation of enterprise cyber incidents with countdown timer, live SIEM log stream,
 * branching tactical decisions, posture gauges, and Aegis AI post-mortem debrief.
 * Language: Strictly English and French.
 */
class WargameEngine {
  constructor() {
    this.scenarios = window.WargameScenariosData || [];
    this.activeScenario = null;
    this.currentPhaseIndex = 0;
    this.timerSeconds = 0;
    this.timerInterval = null;
    this.integrity = 100;
    this.dataLoss = 0;
    this.logIndex = 0;
    this.logInterval = null;
    this.isCompleted = false;
    this.decisionHistory = [];
  }

  init() {
    this.renderScenarioSelector();
  }

  getCompletedScenarios() {
    try {
      return JSON.parse(localStorage.getItem('cyberops_wargame_completed')) || [];
    } catch {
      return [];
    }
  }

  isScenarioUnlocked(scIndex) {
    if (window.CyberState && window.CyberState.isFreeAccessMode()) return true;
    if (scIndex === 0) return true; // First scenario is always unlocked
    const prevScenarioId = this.scenarios[scIndex - 1].id;
    return this.getCompletedScenarios().includes(prevScenarioId);
  }

  showLockToast(scIndex) {
    const isFr = window.CyberI18n ? window.CyberI18n.getLanguage() === 'fr' : false;
    const prevSc = this.scenarios[scIndex - 1];
    const prevTitle = isFr ? prevSc.titleFr : prevSc.titleEn;
    if (window.CyberAudio) window.CyberAudio.playAlert();
    if (window.CyberUtils) {
      window.CyberUtils.showToast(isFr ? `🔒 Scénario Verrouillé ! Terminez "${prevTitle}" pour débloquer.` : `🔒 Scenario Locked! Complete "${prevTitle}" to unlock.`, 'warning', 4500);
    }
  }

  renderScenarioSelector() {
    const listEl = document.getElementById("wargame-scenarios-list");
    if (!listEl) return;

    const isFr = window.CyberI18n ? window.CyberI18n.getLanguage() === 'fr' : false;
    const completedList = this.getCompletedScenarios();
    listEl.innerHTML = "";

    this.scenarios.forEach((sc, idx) => {
      const isUnlocked = this.isScenarioUnlocked(idx);
      const isDone = completedList.includes(sc.id);

      const card = document.createElement("div");
      card.className = `wargame-card ${!isUnlocked ? 'wargame-card-locked' : ''}`;
      card.innerHTML = `
        <div class="wargame-card-header">
          <div style="display:flex;align-items:center;gap:6px;">
            <span class="wargame-sev-badge ${sc.severity.toLowerCase()}">${sc.severity}</span>
            ${isDone ? `<span style="color:var(--neon-green);font-size:0.75rem;font-weight:700;">✓ ${isFr ? 'RÉSOLU' : 'RESOLVED'}</span>` : ''}
          </div>
          ${!isUnlocked ? `
            <span class="wargame-locked-tag">🔒 ${isFr ? 'Verrouillé' : 'Locked'}</span>
          ` : `
            <span class="wargame-sla-tag">⏱️ SLA: ${sc.slaTarget}</span>
          `}
        </div>
        <h3 class="wargame-card-title">${isFr ? sc.titleFr : sc.titleEn}</h3>
        <p class="wargame-card-desc">${isFr ? sc.summaryFr : sc.summaryEn}</p>
        <div class="wargame-tactics-row">
          ${sc.tactics.map(t => `<span class="tactic-tag">${t}</span>`).join('')}
        </div>
        <div class="wargame-card-footer">
          <span class="wargame-xp">+${sc.xpReward} XP</span>
          ${isUnlocked ? `
            <button class="cyber-btn cyber-btn-primary cyber-btn-small" onclick="window.WargameSim.startScenario('${sc.id}')">
              ${isFr ? '🚀 Prendre le Commandement' : '🚀 Assume Command'}
            </button>
          ` : `
            <button class="cyber-btn cyber-btn-outline cyber-btn-small" onclick="window.WargameSim.showLockToast(${idx})">
              🔒 ${isFr ? 'Prérequis Requis' : 'Prerequisite Required'}
            </button>
          `}
        </div>
      `;
      listEl.appendChild(card);
    });
  }

  startScenario(scenarioId) {
    const sc = this.scenarios.find(s => s.id === scenarioId);
    if (!sc) return;

    this.activeScenario = sc;
    this.currentPhaseIndex = 0;
    this.timerSeconds = sc.timeLimitSeconds;
    this.integrity = sc.initialIntegrity;
    this.dataLoss = sc.initialDataLoss;
    this.logIndex = 0;
    this.isCompleted = false;
    this.decisionHistory = [];

    // Switch view elements
    const selectorView = document.getElementById("wargame-selector-view");
    const activeView = document.getElementById("wargame-active-view");
    if (selectorView) selectorView.style.display = "none";
    if (activeView) activeView.style.display = "block";

    const isFr = window.CyberI18n ? window.CyberI18n.getLanguage() === 'fr' : false;
    const titleEl = document.getElementById("wargame-active-title");
    if (titleEl) titleEl.innerText = isFr ? sc.titleFr : sc.titleEn;

    // Clear logs
    const logContainer = document.getElementById("wargame-log-stream");
    if (logContainer) logContainer.innerHTML = "";

    this.updateGauges();
    this.renderCurrentPhase();
    this.startTimer();
    this.startLogStream();

    if (window.CyberAudio) window.CyberAudio.playSuccess();
    if (window.CyberUtils) {
      window.CyberUtils.showToast(isFr ? 'Alerte Incident Déclenchée ! Prenez vos décisions.' : 'Incident Alert Active! Take command decisions.', 'warning');
    }
  }

  startTimer() {
    clearInterval(this.timerInterval);
    this.updateTimerDisplay();

    this.timerInterval = setInterval(() => {
      this.timerSeconds--;
      this.updateTimerDisplay();

      if (this.timerSeconds <= 0) {
        clearInterval(this.timerInterval);
        this.finishSimulation(true);
      }
    }, 1000);
  }

  updateTimerDisplay() {
    const clockEl = document.getElementById("wargame-timer-clock");
    if (!clockEl) return;

    const mins = Math.floor(this.timerSeconds / 60);
    const secs = this.timerSeconds % 60;
    clockEl.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    if (this.timerSeconds <= 60) {
      clockEl.classList.add("critical-time");
    } else {
      clockEl.classList.remove("critical-time");
    }
  }

  startLogStream() {
    clearInterval(this.logInterval);
    const logContainer = document.getElementById("wargame-log-stream");
    if (!logContainer || !this.activeScenario) return;

    // Push initial log
    this.pushLogLine(this.activeScenario.logs[0]);
    this.logIndex = 1;

    this.logInterval = setInterval(() => {
      if (!this.activeScenario || this.isCompleted) {
        clearInterval(this.logInterval);
        return;
      }
      if (this.logIndex < this.activeScenario.logs.length) {
        this.pushLogLine(this.activeScenario.logs[this.logIndex]);
        this.logIndex++;
      }
    }, 8000);
  }

  pushLogLine(log) {
    const logContainer = document.getElementById("wargame-log-stream");
    if (!logContainer || !log) return;

    const line = document.createElement("div");
    line.className = "wargame-log-line";
    line.innerHTML = `
      <span class="log-time">[+${log.timestamp}]</span>
      <span class="log-src">${log.source}</span>
      <span class="log-lvl ${log.level.toLowerCase()}">${log.level}</span>
      <span class="log-msg">${log.text}</span>
    `;
    logContainer.appendChild(line);
    logContainer.scrollTop = logContainer.scrollHeight;
  }

  updateGauges() {
    // Clamp 0-100
    this.integrity = Math.max(0, Math.min(100, this.integrity));
    this.dataLoss = Math.max(0, Math.min(100, this.dataLoss));

    const integrityBar = document.getElementById("wargame-integrity-bar");
    const integrityVal = document.getElementById("wargame-integrity-val");
    if (integrityBar && integrityVal) {
      integrityBar.style.width = `${this.integrity}%`;
      integrityVal.innerText = `${this.integrity}%`;
      integrityBar.className = "wargame-gauge-fill " + (this.integrity > 60 ? 'green' : (this.integrity > 30 ? 'yellow' : 'red'));
    }

    const lossBar = document.getElementById("wargame-loss-bar");
    const lossVal = document.getElementById("wargame-loss-val");
    if (lossBar && lossVal) {
      lossBar.style.width = `${this.dataLoss}%`;
      lossVal.innerText = `${this.dataLoss}%`;
      lossBar.className = "wargame-gauge-fill " + (this.dataLoss < 30 ? 'green' : (this.dataLoss < 60 ? 'yellow' : 'red'));
    }
  }

  renderCurrentPhase() {
    const phaseBox = document.getElementById("wargame-phase-container");
    if (!phaseBox || !this.activeScenario) return;

    const isFr = window.CyberI18n ? window.CyberI18n.getLanguage() === 'fr' : false;
    const phase = this.activeScenario.phases[this.currentPhaseIndex];

    if (!phase) {
      this.finishSimulation(false);
      return;
    }

    phaseBox.innerHTML = `
      <div class="phase-meta-header">
        <span class="phase-number-tag">PHASE ${this.currentPhaseIndex + 1} / ${this.activeScenario.phases.length}</span>
        <h3 class="phase-name">${isFr ? phase.nameFr : phase.nameEn}</h3>
      </div>
      <div class="phase-situation-box">
        <p class="phase-briefing">${isFr ? phase.situationFr : phase.situationEn}</p>
      </div>

      <div class="phase-options-grid">
        ${phase.options.map(opt => `
          <div class="phase-option-card" onclick="window.WargameSim.selectOption('${opt.id}')">
            <div class="option-icon">⚡</div>
            <div class="option-text">
              <h4 class="option-title">${isFr ? opt.titleFr : opt.titleEn}</h4>
              <span class="option-impact-hint">Click to deploy incident order</span>
            </div>
          </div>
        `).join('')}
      </div>

      <div id="wargame-feedback-panel" class="wargame-feedback-panel" style="display:none;"></div>
    `;
  }

  selectOption(optId) {
    if (this.isCompleted) return;

    const phase = this.activeScenario.phases[this.currentPhaseIndex];
    const opt = phase.options.find(o => o.id === optId);
    if (!opt) return;

    const isFr = window.CyberI18n ? window.CyberI18n.getLanguage() === 'fr' : false;

    // Apply metrics
    this.integrity += opt.integrityChange;
    this.dataLoss += opt.dataLossChange;
    this.updateGauges();

    this.decisionHistory.push({
      phaseName: isFr ? phase.nameFr : phase.nameEn,
      decisionTitle: isFr ? opt.titleFr : opt.titleEn,
      isBest: opt.isBest,
      feedback: isFr ? opt.feedbackFr : opt.feedbackEn
    });

    if (opt.isBest) {
      if (window.CyberAudio) window.CyberAudio.playSuccess();
    } else {
      if (window.CyberAudio) window.CyberAudio.playAlert();
    }

    // Show instant tactical feedback
    const feedbackPanel = document.getElementById("wargame-feedback-panel");
    if (feedbackPanel) {
      feedbackPanel.style.display = "block";
      feedbackPanel.className = `wargame-feedback-panel ${opt.isBest ? 'positive' : 'negative'}`;
      feedbackPanel.innerHTML = `
        <div class="fb-header">
          <strong>${opt.isBest ? '✅ ' + (isFr ? 'Ordre Tactique Conforme' : 'Optimal Tactical Order') : '⚠️ ' + (isFr ? 'Ordre Tactique Sous-Optimal' : 'Sub-Optimal Tactical Action')}</strong>
        </div>
        <p class="fb-text">${isFr ? opt.feedbackFr : opt.feedbackEn}</p>
        <button class="cyber-btn cyber-btn-primary cyber-btn-small" style="margin-top: 12px;" onclick="window.WargameSim.nextPhase()">
          ${isFr ? 'Passer à la Phase Suivante →' : 'Advance to Next Phase →'}
        </button>
      `;

      // Disable option clicks while reading feedback
      document.querySelectorAll(".phase-option-card").forEach(el => el.style.pointerEvents = "none");
    }
  }

  nextPhase() {
    this.currentPhaseIndex++;
    if (this.currentPhaseIndex < this.activeScenario.phases.length) {
      this.renderCurrentPhase();
    } else {
      this.finishSimulation(false);
    }
  }

  finishSimulation(isTimeout) {
    this.isCompleted = true;
    clearInterval(this.timerInterval);
    clearInterval(this.logInterval);

    const isFr = window.CyberI18n ? window.CyberI18n.getLanguage() === 'fr' : false;
    const phaseBox = document.getElementById("wargame-phase-container");
    if (!phaseBox) return;

    let verdict = "";
    let verdictClass = "";
    let earnedXp = 0;

    if (isTimeout) {
      verdict = isFr ? "SLA DÉPASSÉ - INCIDENT NON MAÎTRISÉ" : "SLA EXPIRED - BREACH BREACHED CONTAINMENT";
      verdictClass = "red";
      earnedXp = 25;
    } else if (this.integrity >= 65 && this.dataLoss <= 35) {
      verdict = isFr ? "MISSION ACCOMPLIE : MENACE NEUTRALISÉE" : "MISSION SUCCESS: THREAT FULLY CONTAINED";
      verdictClass = "green";
      earnedXp = this.activeScenario.xpReward;
      if (window.CyberState) window.CyberState.addXP(earnedXp, `Wargame Mastered: ${this.activeScenario.id}`);
    } else if (this.integrity >= 40) {
      verdict = isFr ? "CONFINEMENT PARTIEL : DOMMAGES COLLATÉRAUX" : "PARTIAL CONTAINMENT: COLLATERAL DAMAGE";
      verdictClass = "yellow";
      earnedXp = Math.floor(this.activeScenario.xpReward / 2);
      if (window.CyberState) window.CyberState.addXP(earnedXp, `Wargame Partial: ${this.activeScenario.id}`);
    } else {
      verdict = isFr ? "BRÈCHE CRITIQUE : PERTE D'INTÉGRITÉ MAJEURE" : "CATASTROPHIC BREACH: SEVERE DATA LOSS";
      verdictClass = "red";
      earnedXp = 20;
    }

    // Save scenario completion if contained
    if (verdictClass !== "red") {
      const completedList = this.getCompletedScenarios();
      if (!completedList.includes(this.activeScenario.id)) {
        completedList.push(this.activeScenario.id);
        localStorage.setItem('cyberops_wargame_completed', JSON.stringify(completedList));
      }
    }

    phaseBox.innerHTML = `
      <div class="wargame-debrief-card">
        <div class="debrief-header">
          <span class="debrief-verdict-badge ${verdictClass}">${verdict}</span>
          <h2 class="debrief-title">${isFr ? 'Rapport Post-Mortem d\'Incident Aegis AI' : 'Aegis AI Post-Incident Debrief'}</h2>
        </div>

        <div class="debrief-metrics-summary">
          <div class="d-metric">
            <span>${isFr ? 'Intégrité Finale Système :' : 'Final System Integrity:'}</span>
            <strong class="${this.integrity >= 60 ? 'text-green' : 'text-red'}">${this.integrity}%</strong>
          </div>
          <div class="d-metric">
            <span>${isFr ? 'Perte Données & Fuite :' : 'Data Breach Impact:'}</span>
            <strong class="${this.dataLoss <= 35 ? 'text-green' : 'text-red'}">${this.dataLoss}%</strong>
          </div>
          <div class="d-metric">
            <span>${isFr ? 'Points d\'Expérience (XP) :' : 'Experience Earned:'}</span>
            <strong class="text-cyan">+${earnedXp} XP</strong>
          </div>
        </div>

        <!-- Tactical Decisions Log -->
        <div class="debrief-decisions-list">
          <h4>${isFr ? 'Historique des Décisions du Commandant :' : 'Commander Decision Audit Trail:'}</h4>
          ${this.decisionHistory.map(d => `
            <div class="debrief-decision-item ${d.isBest ? 'best' : 'suboptimal'}">
              <span class="d-phase">${d.phaseName}</span>
              <p class="d-choice"><strong>${d.decisionTitle}</strong></p>
              <p class="d-feedback">${d.feedback}</p>
            </div>
          `).join('')}
        </div>

        <div class="debrief-actions-row">
          <button class="cyber-btn cyber-btn-outline" onclick="window.WargameSim.returnToScenarios()">
            ← ${isFr ? 'Retour aux Scénarios' : 'Return to Scenarios'}
          </button>
          <button class="cyber-btn cyber-btn-primary" onclick="window.WargameSim.startScenario('${this.activeScenario.id}')">
            🔄 ${isFr ? 'Rejouer ce Scénario' : 'Replay Scenario'}
          </button>
        </div>
      </div>
    `;

    if (window.CyberAudio) {
      if (verdictClass === 'green') window.CyberAudio.playSuccess();
      else window.CyberAudio.playAlert();
    }
  }

  returnToScenarios() {
    clearInterval(this.timerInterval);
    clearInterval(this.logInterval);
    this.activeScenario = null;
    this.isCompleted = false;

    const selectorView = document.getElementById("wargame-selector-view");
    const activeView = document.getElementById("wargame-active-view");
    if (selectorView) selectorView.style.display = "block";
    if (activeView) activeView.style.display = "none";

    this.renderScenarioSelector();
  }
}

window.WargameSim = new WargameEngine();
