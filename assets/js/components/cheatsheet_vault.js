/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <0dh4mm@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - Cybersecurity Cheat Sheets & Payloads Engine
 * Renders categorized quick-reference commands with 1-click clipboard copy
 * and direct piping into the Aegis Cyber Terminal shell.
 */
class CheatsheetVaultEngine {
  constructor() {
    this.activeCategory = "all";
    this.searchQuery = "";
  }

  init() {
    this.bindEvents();
    this.render();
    console.log("⚡ Cheatsheet Vault Engine Initialized.");
  }

  bindEvents() {
    const searchInput = document.getElementById("cheatsheet-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderGrid();
      });
    }

    document.querySelectorAll(".cheat-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".cheat-filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeCategory = btn.dataset.category || "all";
        if (window.CyberAudio) window.CyberAudio.playKeypress();
        this.renderGrid();
      });
    });
  }

  getLang() {
    return window.CyberI18n ? window.CyberI18n.getLanguage() : "en";
  }

  render() {
    this.renderGrid();
  }

  renderGrid() {
    const container = document.getElementById("cheatsheet-grid-container");
    if (!container) return;

    const list = window.CheatsheetsData || [];
    const isFr = this.getLang() === "fr";

    const filtered = list.filter(item => {
      if (this.activeCategory !== "all" && item.category !== this.activeCategory) {
        return false;
      }

      if (this.searchQuery) {
        const text = isFr ? item.fr : item.en;
        const q = this.searchQuery;
        const matchTitle = text.title.toLowerCase().includes(q);
        const matchDesc = text.desc.toLowerCase().includes(q);
        const matchCmd = item.command.toLowerCase().includes(q);
        const matchTags = item.tags.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchCmd && !matchTags) return false;
      }

      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="cheat-empty-state">
          <div style="font-size: 2.5rem; margin-bottom: 10px;">🔍</div>
          <h4>${isFr ? "Aucune commande trouvée" : "No cheat sheet commands found"}</h4>
          <p>${isFr ? "Essayez avec d'autres mots-clés comme 'Nmap', 'SQL', 'SSH' ou 'SUID'." : "Try searching for keywords like 'Nmap', 'SQL', 'SSH', or 'SUID'."}</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(item => {
      const text = isFr ? item.fr : item.en;
      const riskClass = item.risk === "caution" ? "risk-caution" : "risk-safe";
      const riskLabel = item.risk === "caution" ? (isFr ? "⚠️ Attention" : "⚠️ Caution") : (isFr ? "✓ Sûr" : "✓ Safe");

      return `
        <div class="cheat-card" data-category="${item.category}">
          <div class="cheat-card-header">
            <div>
              <span class="cheat-cat-pill">${item.category.toUpperCase()}</span>
              <span class="cheat-risk-pill ${riskClass}">${riskLabel}</span>
            </div>
            <div class="cheat-tags-list">
              ${item.tags.map(t => `<span class="tag-pill">#${t}</span>`).join('')}
            </div>
          </div>

          <h3 class="cheat-title">${text.title}</h3>
          <p class="cheat-desc">${text.desc}</p>

          <!-- Command Snippet Box -->
          <div class="cheat-code-wrapper">
            <code class="cheat-code-text" id="code-${item.id}">${this.escapeHtml(item.command)}</code>
          </div>

          <!-- Actions Row -->
          <div class="cheat-actions-row">
            <button class="cyber-btn cyber-btn-small cyber-btn-outline" onclick="window.CheatsheetVault.copyCommand('${item.id}')">
              📋 ${isFr ? "Copier la Commande" : "Copy Command"}
            </button>
            <button class="cyber-btn cyber-btn-small cyber-btn-primary" onclick="window.CheatsheetVault.sendToTerminal('${item.id}')">
              💻 ${isFr ? "Exécuter dans le Terminal" : "Send to Terminal"}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  copyCommand(id) {
    const item = (window.CheatsheetsData || []).find(c => c.id === id);
    if (!item) return;

    navigator.clipboard.writeText(item.command).then(() => {
      if (window.CyberAudio) window.CyberAudio.playKeypress();
      if (window.CyberUtils) {
        const isFr = this.getLang() === "fr";
        window.CyberUtils.showToast(isFr ? "📋 Commande copiée dans le presse-papier !" : "📋 Command copied to clipboard!", "success");
      }
    });
  }

  sendToTerminal(id) {
    const item = (window.CheatsheetsData || []).find(c => c.id === id);
    if (!item) return;

    if (window.app && typeof window.app.toggleTerminal === "function") {
      const termOverlay = document.getElementById("terminal-overlay");
      if (termOverlay && !termOverlay.classList.contains("active")) {
        window.app.toggleTerminal();
      }

      const inputField = document.getElementById("term-input-field");
      if (inputField) {
        inputField.value = item.command;
        inputField.focus();
        if (window.CyberUtils) {
          const isFr = this.getLang() === "fr";
          window.CyberUtils.showToast(isFr ? "💻 Commande injectée dans le terminal Aegis !" : "💻 Command loaded into Aegis Terminal prompt!", "info");
        }
      }
    }
  }
}

window.CheatsheetVault = new CheatsheetVaultEngine();
