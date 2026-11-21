/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <adamcherkaoui99@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - Cyber Lexicon & Glossary Component
 * Interactive dictionary with instant filtering, real-world analogies,
 * and AI Voice pronunciation for complete beginners.
 */
class CyberGlossaryEngine {
  constructor() {
    this.activeFilter = "all";
    this.searchQuery = "";
  }

  getLang() {
    return window.CyberI18n ? window.CyberI18n.currentLang : "en";
  }

  init() {
    this.render();
  }

  openModal(preselectedTermId = null) {
    const modal = document.getElementById("cyber-glossary-modal");
    if (!modal) return;

    modal.classList.add("active");
    if (preselectedTermId) {
      this.searchQuery = preselectedTermId;
      const input = document.getElementById("glossary-search-input");
      if (input) input.value = preselectedTermId;
    }
    this.render();
    if (window.CyberAudio) window.CyberAudio.playKeypress();
  }

  closeModal() {
    if (window.VoiceMentor) window.VoiceMentor.stop();
    const modal = document.getElementById("cyber-glossary-modal");
    if (modal) modal.classList.remove("active");
  }

  setFilter(category) {
    this.activeFilter = category;
    document.querySelectorAll(".glossary-filter-pill").forEach(pill => {
      pill.classList.toggle("active", pill.dataset.filter === category);
    });
    this.renderCards();
    if (window.CyberAudio) window.CyberAudio.playKeypress();
  }

  setSearch(query) {
    this.searchQuery = query.toLowerCase().trim();
    this.renderCards();
  }

  render() {
    const container = document.getElementById("cyber-glossary-container");
    if (!container) return;

    const isFr = this.getLang() === "fr";

    container.innerHTML = `
      <div class="glossary-wrapper">
        <div class="glossary-header-box">
          <div class="glossary-search-row">
            <input 
              type="text" 
              id="glossary-search-input" 
              class="cyber-input glossary-search-field" 
              placeholder="${isFr ? '🔍 Rechercher un acronyme (SIEM, DNS, Firewall, CIDR, SQLi)...' : '🔍 Search acronym or term (SIEM, DNS, Firewall, CIDR, SQLi)...'}"
              value="${this.searchQuery}"
              oninput="window.CyberGlossary.setSearch(this.value)"
            />
          </div>

          <div class="glossary-filters-row">
            <button class="glossary-filter-pill ${this.activeFilter === 'all' ? 'active' : ''}" data-filter="all" onclick="window.CyberGlossary.setFilter('all')">
              ${isFr ? 'Tous les Termes' : 'All Terms'} (${(window.CyberGlossaryData || []).length})
            </button>
            <button class="glossary-filter-pill ${this.activeFilter === 'network' ? 'active' : ''}" data-filter="network" onclick="window.CyberGlossary.setFilter('network')">
              🌐 ${isFr ? 'Réseaux' : 'Networking'}
            </button>
            <button class="glossary-filter-pill ${this.activeFilter === 'blue_team' ? 'active' : ''}" data-filter="blue_team" onclick="window.CyberGlossary.setFilter('blue_team')">
              🛡️ ${isFr ? 'Défense (Blue Team)' : 'Defense (Blue Team)'}
            </button>
            <button class="glossary-filter-pill ${this.activeFilter === 'red_team' ? 'active' : ''}" data-filter="red_team" onclick="window.CyberGlossary.setFilter('red_team')">
              ⚔️ ${isFr ? 'Attaque (Red Team)' : 'Offense (Red Team)'}
            </button>
            <button class="glossary-filter-pill ${this.activeFilter === 'crypto' ? 'active' : ''}" data-filter="crypto" onclick="window.CyberGlossary.setFilter('crypto')">
              🔐 Cryptography
            </button>
            <button class="glossary-filter-pill ${this.activeFilter === 'threat_intel' ? 'active' : ''}" data-filter="threat_intel" onclick="window.CyberGlossary.setFilter('threat_intel')">
              🥷 Threat Intel
            </button>
            <button class="glossary-filter-pill ${this.activeFilter === 'governance' ? 'active' : ''}" data-filter="governance" onclick="window.CyberGlossary.setFilter('governance')">
              🏛️ ${isFr ? 'Gouvernance & Normes' : 'Governance & Standards'}
            </button>
          </div>
        </div>

        <div class="glossary-cards-grid" id="glossary-cards-grid">
          <!-- Injected dynamically -->
        </div>
      </div>
    `;

    this.renderCards();
  }

  renderCards() {
    const grid = document.getElementById("glossary-cards-grid");
    if (!grid) return;

    const isFr = this.getLang() === "fr";
    const data = window.CyberGlossaryData || [];

    const filtered = data.filter(item => {
      // Category match
      if (this.activeFilter !== "all" && item.category !== this.activeFilter) {
        return false;
      }
      // Query match
      if (this.searchQuery) {
        const fullEn = (item.fullNameEn || "").toLowerCase();
        const fullFr = (item.fullNameFr || "").toLowerCase();
        const term = item.term.toLowerCase();
        const id = item.id.toLowerCase();
        const def = (isFr ? item.fr.definition : item.en.definition).toLowerCase();
        const analogy = (isFr ? item.fr.analogy : item.en.analogy).toLowerCase();

        return term.includes(this.searchQuery) ||
               id.includes(this.searchQuery) ||
               fullEn.includes(this.searchQuery) ||
               fullFr.includes(this.searchQuery) ||
               def.includes(this.searchQuery) ||
               analogy.includes(this.searchQuery);
      }
      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="glossary-empty-state">
          <div style="font-size: 2.2rem; margin-bottom: 8px;">🔍</div>
          <h4>${isFr ? 'Aucun terme trouvé' : 'No glossary terms found'}</h4>
          <p>${isFr ? 'Essayez un autre mot-clé ou réinitialisez les filtres.' : 'Try another keyword or reset the category filters.'}</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => {
      const content = isFr ? item.fr : item.en;
      const fullName = isFr ? item.fullNameFr : item.fullNameEn;
      const speechText = `${item.term}. ${fullName}. ${content.analogy}`;

      return `
        <div class="glossary-card" id="term-${item.id}">
          <div class="glossary-card-header">
            <div class="glossary-term-badge">
              <span class="glossary-icon">${item.icon}</span>
              <span class="glossary-term-title">${item.term}</span>
            </div>
            <button 
              class="cyber-btn cyber-btn-small cyber-btn-outline glossary-voice-btn" 
              onclick="window.VoiceMentor ? window.VoiceMentor.toggle('${speechText.replace(/['"]/g, " ")}', '${isFr ? 'fr' : 'en'}') : null"
              title="${isFr ? 'Écouter la prononciation et l\'analogie' : 'Listen to pronunciation & analogy'}"
            >
              🎙️
            </button>
          </div>

          <div class="glossary-full-name">${fullName}</div>

          <!-- Real-World Beginner Analogy -->
          <div class="glossary-analogy-box">
            <span class="glossary-analogy-tag">💡 ${isFr ? 'Analogie du quotidien (Simple) :' : 'Real-World Analogy (Zero Jargon):'}</span>
            <p class="glossary-analogy-text">${content.analogy}</p>
          </div>

          <!-- Formal Definition -->
          <div class="glossary-definition-box">
            <span class="glossary-def-tag">📖 ${isFr ? 'Définition Technique :' : 'Formal Cyber Definition:'}</span>
            <p class="glossary-def-text">${content.definition}</p>
          </div>
        </div>
      `;
    }).join("");
  }
}

window.CyberGlossary = new CyberGlossaryEngine();
