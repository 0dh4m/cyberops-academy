/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <0dh4mm@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - MITRE ATT&CK Matrix Interactive Navigator
 * Renders the 13 Enterprise Tactics and provides deep technique inspection dossiers.
 */
class MitreNavigator {
  constructor() {
    this.data = window.MitreAttackData || { tactics: [] };
    this.currentSearch = "";
    this.selectedTechnique = null;
    this.viewedTechniques = new Set();
  }

  init() {
    this.setupSearch();
    this.render();
  }

  setupSearch() {
    const input = document.getElementById("mitre-search-input");
    if (input) {
      input.addEventListener("input", (e) => {
        this.currentSearch = e.target.value.trim().toLowerCase();
        this.render();
      });
    }
  }

  render() {
    const matrixContainer = document.getElementById("mitre-matrix-columns");
    if (!matrixContainer) return;

    const isFr = window.CyberI18n ? window.CyberI18n.getLanguage() === 'fr' : false;
    matrixContainer.innerHTML = "";

    this.data.tactics.forEach(tactic => {
      // Filter techniques inside tactic
      const matchingTechs = tactic.techniques.filter(t => {
        if (!this.currentSearch) return true;
        const q = this.currentSearch;
        const matchesName = t.nameEn.toLowerCase().includes(q) || t.nameFr.toLowerCase().includes(q);
        const matchesId = t.id.toLowerCase().includes(q);
        const matchesActor = t.threatActors.some(a => a.toLowerCase().includes(q));
        const matchesDesc = t.descriptionEn.toLowerCase().includes(q) || t.descriptionFr.toLowerCase().includes(q);
        return matchesName || matchesId || matchesActor || matchesDesc;
      });

      const col = document.createElement("div");
      col.className = "mitre-tactic-col";

      col.innerHTML = `
        <div class="tactic-header">
          <span class="tactic-num">TA00${tactic.num < 10 ? '0' + tactic.num : tactic.num}</span>
          <h4 class="tactic-name">${isFr ? tactic.nameFr : tactic.nameEn}</h4>
          <span class="tactic-count">${matchingTechs.length} ${isFr ? 'Techniques' : 'Techniques'}</span>
        </div>
        <div class="tactic-techniques-list">
          ${matchingTechs.map(tech => `
            <div class="technique-pill ${this.viewedTechniques.has(tech.id) ? 'viewed' : ''}" onclick="window.MitreNav.openTechniqueModal('${tech.id}')">
              <span class="tech-id">${tech.id}</span>
              <span class="tech-title">${isFr ? tech.nameFr : tech.nameEn}</span>
              <span class="tech-apt-tag">${tech.threatActors[0]}</span>
            </div>
          `).join('')}
        </div>
      `;

      matrixContainer.appendChild(col);
    });
  }

  openTechniqueModal(techId) {
    let target = null;
    let parentTactic = null;

    for (const tactic of this.data.tactics) {
      const found = tactic.techniques.find(t => t.id === techId);
      if (found) {
        target = found;
        parentTactic = tactic;
        break;
      }
    }

    if (!target) return;
    this.selectedTechnique = target;

    // Track XP for first view
    if (!this.viewedTechniques.has(target.id)) {
      this.viewedTechniques.add(target.id);
      if (window.CyberState) window.CyberState.addXP(20, `Studied MITRE technique: ${target.id}`);
    }

    const isFr = window.CyberI18n ? window.CyberI18n.getLanguage() === 'fr' : false;
    const modal = document.getElementById("mitre-detail-modal");
    if (!modal) return;

    document.getElementById("mitre-modal-tactic").innerText = `${parentTactic.id} • ${(isFr ? parentTactic.nameFr : parentTactic.nameEn).toUpperCase()}`;
    document.getElementById("mitre-modal-title").innerText = `${target.id}: ${isFr ? target.nameFr : target.nameEn}`;

    const body = document.getElementById("mitre-modal-body");
    if (body) {
      body.innerHTML = `
        <div class="mitre-dossier-content">
          <!-- Overview -->
          <div class="dossier-block">
            <h4 class="dossier-heading">📖 ${isFr ? 'Description Opérationnelle' : 'Operational Overview'}</h4>
            <p>${isFr ? target.descriptionFr : target.descriptionEn}</p>
          </div>

          <!-- Associated Threat Actors (APTs) -->
          <div class="dossier-block">
            <h4 class="dossier-heading">🦅 ${isFr ? 'Groupes APT & Cybercriminels Associés' : 'Associated Threat Actors (APTs)'}</h4>
            <div class="apt-badges-wrap">
              ${target.threatActors.map(apt => `<span class="apt-badge">⚡ ${apt}</span>`).join('')}
            </div>
          </div>

          <!-- Mitigations -->
          <div class="dossier-block">
            <h4 class="dossier-heading">🛡️ ${isFr ? 'Mesures de Protection & Durcissement (Mitigation)' : 'Hardening & Mitigations'}</h4>
            <div class="mitigation-box">
              ${target.mitigations}
            </div>
          </div>

          <!-- SIEM Detection Rule -->
          <div class="dossier-block">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
              <h4 class="dossier-heading" style="margin-bottom:0;">🔍 ${isFr ? 'Règle de Détection SIEM / Sigma' : 'SIEM / Sigma Detection Rule'}</h4>
              <button class="cyber-btn btn-xs cyber-btn-outline" onclick="CyberUtils.copyToClipboard(document.getElementById('mitre-det-code').innerText, this)">Copy Rule</button>
            </div>
            <pre class="code-box"><code id="mitre-det-code">${window.CyberUtils ? window.CyberUtils.escapeHtml(target.detection) : target.detection}</code></pre>
          </div>

          <!-- Curriculum Module Link -->
          <div class="dossier-block curriculum-link-box">
            <div>
              <span class="link-label">🎓 ${isFr ? 'Lien avec votre Programme MIAGE / FEDE :' : 'Linked Curriculum Module (MIAGE / FEDE):'}</span>
              <h5 class="module-link-title">${target.moduleName}</h5>
            </div>
            <button class="cyber-btn cyber-btn-primary btn-sm" onclick="window.MitreNav.navigateToModule('${target.moduleId}')">
              ${isFr ? 'Ouvrir le Cours →' : 'Open Module Dossier →'}
            </button>
          </div>
        </div>
      `;
    }

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    if (window.CyberAudio) window.CyberAudio.playKeypress();
  }

  closeModal() {
    const modal = document.getElementById("mitre-detail-modal");
    if (modal) modal.classList.remove("open");
    document.body.style.overflow = "auto";
    this.selectedTechnique = null;
    if (window.CyberAudio) window.CyberAudio.playKeypress();
  }

  navigateToModule(moduleId) {
    this.closeModal();
    if (window.app) {
      window.app.switchView("curriculum");
      const tabCurriculum = document.querySelector('[data-portal-view="curriculum"]');
      if (tabCurriculum) {
        document.querySelectorAll(".portal-nav-tab").forEach(b => b.classList.remove("active"));
        tabCurriculum.classList.add("active");
      }
      setTimeout(() => {
        if (window.ModuleViewer) window.ModuleViewer.openModal(moduleId);
      }, 200);
    }
  }
}

window.MitreNav = new MitreNavigator();
