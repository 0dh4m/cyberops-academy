/**
 * CyberOps Academy - Module Viewer & Curriculum Controller
 * Renders the 19 European Bachelor modules and orchestrates the 6-tab deep inspection dossier.
 */
class ModuleViewer {
  constructor() {
    this.modules = window.CURRICULUM_DATA || [];
    this.currentFilter = "all";
    this.currentSearch = "";
    this.activeModule = null;
  }

  init() {
    this.setupFilters();
    this.setupSearch();
    this.render();
  }

  setupFilters() {
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentFilter = btn.dataset.filter;
        this.render();
        if (window.CyberAudio) window.CyberAudio.playKeypress();
      });
    });
  }

  setupSearch() {
    const input = document.getElementById("search-input");
    if (input) {
      input.addEventListener("input", (e) => {
        this.currentSearch = e.target.value.trim().toLowerCase();
        this.render();
      });
    }
  }

  getFiltered() {
    return this.modules.filter(m => {
      // Filter tab
      if (this.currentFilter !== "all") {
        if (this.currentFilter.startsWith("phase-")) {
          const pNum = parseInt(this.currentFilter.replace("phase-", ""), 10);
          if (m.phase !== pNum) return false;
        } else if (this.currentFilter === "completed" && !window.CyberState.isModuleCompleted(m.id)) {
          return false;
        } else if (this.currentFilter === "in-progress" && window.CyberState.isModuleCompleted(m.id)) {
          return false;
        }
      }

      // Search
      if (this.currentSearch) {
        const q = this.currentSearch;
        const matchesTitle = m.titleFr.toLowerCase().includes(q) || (m.titleEn && m.titleEn.toLowerCase().includes(q));
        const matchesCategory = m.category.toLowerCase().includes(q);
        const matchesChapters = m.chapters.some(c => c.title.toLowerCase().includes(q) || c.points.some(p => p.toLowerCase().includes(q)));
        const matchesCheat = m.cheatSheet.some(cs => cs.desc.toLowerCase().includes(q) || cs.code.toLowerCase().includes(q));
        return matchesTitle || matchesCategory || matchesChapters || matchesCheat;
      }

      return true;
    });
  }

  render() {
    const grid = document.getElementById("modules-grid");
    if (!grid) return;

    const list = this.getFiltered();
    grid.innerHTML = "";

    if (list.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>No matching curriculum modules found</h3>
          <p>Try modifying your search query or reset the filter tags.</p>
          <button class="cyber-btn cyber-btn-outline" onclick="window.ModuleViewer.resetFilters()">Reset Filters</button>
        </div>
      `;
      return;
    }

    list.forEach(m => {
      const isDone = window.CyberState.isModuleCompleted(m.id);
      const isUnlocked = window.CyberState.isModuleUnlocked(m);
      const isFr = window.CyberI18n ? window.CyberI18n.getLanguage() === 'fr' : false;
      const primaryTitle = isFr ? m.titleFr : (m.titleEn || m.titleFr);
      const secondaryTitle = isFr ? (m.titleEn || '') : m.titleFr;
      const exploreText = window.CyberI18n ? window.CyberI18n.t('exploreDossier') : 'Explore Syllabus, Labs & Cheat Sheet →';
      const completedLabel = isFr ? (isDone ? '✓ Validé' : '○ En cours') : (isDone ? '✓ Completed' : '○ In Progress');

      const card = document.createElement("div");
      card.className = `module-card ${isDone ? 'module-completed' : ''} ${!isUnlocked ? 'module-locked' : ''}`;
      
      if (isUnlocked) {
        card.onclick = () => this.openModal(m.id);
      } else {
        card.onclick = () => {
          const req = window.CyberState.getPhaseUnlockRequirement(m.phase, isFr);
          if (window.CyberAudio) window.CyberAudio.playAlert();
          if (window.CyberUtils) {
            window.CyberUtils.showToast(isFr ? `🔒 Module Verrouillé • ${req}` : `🔒 Module Locked • ${req}`, 'warning', 4000);
          }
        };
      }

      card.innerHTML = `
        <div class="card-header">
          <div class="badge-phase">PHASE ${m.phase} • ${m.ects} ECTS</div>
          <div class="card-actions">
            ${isUnlocked ? `
              <button class="btn-check ${isDone ? 'checked' : ''}" title="${isDone ? 'Validated' : 'Mark as Completed'}" onclick="event.stopPropagation(); window.ModuleViewer.toggleComplete('${m.id}')">
                ${completedLabel}
              </button>
            ` : `
              <span class="badge-phase" style="background: rgba(255, 170, 0, 0.15); border-color: rgba(255, 170, 0, 0.4); color: #ffaa00;">
                🔒 ${isFr ? 'Verrouillé' : 'Locked'}
              </span>
            `}
          </div>
        </div>

        <div class="card-body">
          <div class="module-num-tag">MODULE 0${m.num}</div>
          <h3 class="module-title-fr">${primaryTitle}</h3>
          <h4 class="module-title-en">${secondaryTitle}</h4>
          
          ${!isUnlocked ? `
            <div class="locked-card-overlay">
              <span class="lock-icon">🔒</span>
              <span class="lock-phase-tag">${isFr ? `PHASE ${m.phase} EN ATTENTE` : `PHASE ${m.phase} PREREQUISITE`}</span>
              <span class="lock-req-text">${window.CyberState.getPhaseUnlockRequirement(m.phase, isFr)}</span>
            </div>
          ` : `
            <p class="module-summary">${m.summary.substring(0, 150)}...</p>
          `}

          <div class="module-tags">
            <span class="tag-pill tag-badge">${m.badge}</span>
            <span class="tag-pill">${m.durationHours}h Volume</span>
            <span class="tag-pill">${m.chapters.length} ${isFr ? 'Chapitres' : 'Chapters'}</span>
          </div>
        </div>

        <div class="card-footer">
          <span class="view-details-link">
            ${isUnlocked ? exploreText : (isFr ? '🔒 Débloquez cette phase en validant les prérequis' : '🔒 Complete previous tasks to unlock')}
          </span>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  resetFilters() {
    this.currentFilter = "all";
    this.currentSearch = "";
    const searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.value = "";
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.filter === "all");
    });
    this.render();
  }

  toggleComplete(id) {
    window.CyberState.toggleModuleComplete(id);
    this.render();
    if (this.activeModule && this.activeModule.id === id) {
      this.updateModalActions();
    }
    if (window.app && window.app.updateHeroStats) {
      window.app.updateHeroStats();
    }
  }

  openModal(id) {
    const mod = window.getModuleById(id);
    if (!mod) return;

    // Check unlock milestone
    if (window.CyberState && !window.CyberState.isModuleUnlocked(mod)) {
      const isFr = window.CyberI18n ? window.CyberI18n.getLanguage() === 'fr' : false;
      const req = window.CyberState.getPhaseUnlockRequirement(mod.phase, isFr);
      if (window.CyberAudio) window.CyberAudio.playAlert();
      if (window.CyberUtils) {
        window.CyberUtils.showToast(isFr ? `🔒 Module Verrouillé • ${req}` : `🔒 Module Locked • ${req}`, 'warning', 4000);
      }
      return;
    }

    this.activeModule = mod;

    const modal = document.getElementById("module-detail-modal");
    if (!modal) return;

    // Header metadata
    document.getElementById("modal-module-tag").innerText = `MODULE ${mod.num < 10 ? '0' + mod.num : mod.num} • ${mod.phaseTitle.toUpperCase()}`;
    document.getElementById("modal-module-title-fr").innerText = mod.titleFr;
    document.getElementById("modal-module-title-en").innerText = mod.titleEn;
    document.getElementById("modal-badge-info").innerText = `${mod.badge} | ${mod.durationHours} Hours | ${mod.ects} ECTS Credits`;

    this.updateModalActions();
    this.renderModalTabs(mod);
    this.switchTab("cours");

    modal.classList.add("open");
    document.body.style.overflow = "hidden";

    const modalBody = modal.querySelector(".modal-body");
    if (modalBody) modalBody.scrollTop = 0;
    const tabsNav = modal.querySelector(".modal-tabs-nav");
    if (tabsNav) tabsNav.scrollLeft = 0;

    if (window.CyberAudio) window.CyberAudio.playKeypress();
  }

  closeModal() {
    if (window.VoiceMentor) window.VoiceMentor.stop();
    const modal = document.getElementById("module-detail-modal");
    if (modal) modal.classList.remove("open");
    document.body.style.overflow = "auto";
    this.activeModule = null;
    if (window.CyberAudio) window.CyberAudio.playKeypress();
  }

  updateModalActions() {
    if (!this.activeModule) return;
    const isDone = window.CyberState.isModuleCompleted(this.activeModule.id);
    const checkBtn = document.getElementById("modal-toggle-complete-btn");
    if (checkBtn) {
      checkBtn.innerHTML = isDone ? "✓ Completed & Validated" : "○ Mark as Completed";
      checkBtn.className = `cyber-btn ${isDone ? 'cyber-btn-success' : 'cyber-btn-outline'}`;
    }
  }

  switchTab(tabName) {
    document.querySelectorAll(".tab-nav-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tabName);
    });
    document.querySelectorAll(".modal-tab-content").forEach(content => {
      content.classList.toggle("active", content.dataset.tabContent === tabName);
    });

    const modalBody = document.querySelector("#module-detail-modal .modal-body");
    if (modalBody) modalBody.scrollTop = 0;

    if (window.CyberAudio) window.CyberAudio.playKeypress();
  }

  renderModalTabs(m) {
    // 1. SYLLABUS & CONTENT
    const coursTab = document.getElementById("tab-content-cours");
    if (coursTab) {
      coursTab.innerHTML = `
        <div class="section-block">
          <div class="executive-callout">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div class="callout-badge">💡 Executive Overview & Industry Context</div>
              <button class="cyber-btn cyber-btn-small cyber-btn-outline" onclick="window.VoiceMentor ? window.VoiceMentor.toggle(window.ModuleViewer.activeModule.summary, window.CyberI18n ? window.CyberI18n.currentLang : 'fr') : null" title="AI Voice Mentor Audio Narration">
                🎙️ Audio Narration
              </button>
            </div>
            <p>${m.summary}</p>
          </div>

          <h3 class="section-title">🎯 Core Educational Objectives (Objectifs Pédagogiques)</h3>
          <ul class="styled-list">
            ${m.keyObjectives.map(obj => `<li><strong>•</strong> ${obj}</li>`).join('')}
          </ul>

          <h3 class="section-title">📚 Detailed Curriculum Chapters (Programme Détaillé)</h3>
          <div class="chapters-container">
            ${m.chapters.map((ch, idx) => `
              <div class="chapter-card">
                <div class="chapter-header">
                  <span class="chapter-index">#0${idx + 1}</span>
                  <h4>${ch.title}</h4>
                </div>
                <ul class="chapter-points">
                  ${ch.points.map(pt => `<li>${pt}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 2. COMMANDS & CHEAT SHEET
    const cheatTab = document.getElementById("tab-content-cheats");
    if (cheatTab) {
      cheatTab.innerHTML = `
        <div class="section-block">
          <div class="section-header-banner">
            <h3>⚡ Production Commands & Cheat Sheet</h3>
            <p>Essential enterprise syntax, configurations, and scripts for direct implementation.</p>
          </div>
          <div class="cheats-list">
            ${m.cheatSheet.map((item) => `
              <div class="cheat-item">
                <div class="cheat-header">
                  <span class="cheat-desc">${item.desc}</span>
                  <button class="cyber-btn cyber-btn-small" onclick="window.CyberUtils.copyToClipboard('${encodeURIComponent(item.code)}', this)">
                    📋 Copy Snippet
                  </button>
                </div>
                <pre class="code-box"><code>${window.CyberUtils ? window.CyberUtils.escapeHtml(item.code) : item.code}</code></pre>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 3. PRACTICAL LABS
    const labsTab = document.getElementById("tab-content-labs");
    if (labsTab) {
      labsTab.innerHTML = `
        <div class="section-block">
          <div class="section-header-banner">
            <h3>🧪 Practical Hands-on Labs & Scenarios</h3>
            <p>Real-world infrastructure exercises for VirtualBox, VMware, Packet Tracer, and Docker.</p>
          </div>
          <div class="labs-grid">
            ${m.practicalLabs.map((lab, idx) => `
              <div class="lab-card">
                <div class="lab-badge">LAB 0${idx + 1}</div>
                <h4 class="lab-title">${lab.title}</h4>
                <div class="lab-field">
                  <strong>Operational Scenario:</strong>
                  <p>${lab.scenario}</p>
                </div>
                <div class="lab-field deliverable">
                  <strong>Expected Deliverable (Livrable):</strong>
                  <span>📦 ${lab.deliverable}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 4. QCM & QUIZ
    const quizTab = document.getElementById("tab-content-quiz");
    if (quizTab) {
      quizTab.innerHTML = `
        <div class="section-block">
          <div class="section-header-banner">
            <h3>🎯 Self-Assessment Knowledge Check (QCM)</h3>
            <p>Test your conceptual understanding and review instant explanations.</p>
          </div>
          <div class="quiz-container">
            ${m.quiz.map((qItem, qIdx) => `
              <div class="quiz-question-box" id="quiz-q-${qIdx}">
                <div class="question-header">
                  <span class="q-number">Question ${qIdx + 1}:</span>
                  <p class="q-text">${qItem.q}</p>
                </div>
                <div class="q-options">
                  ${qItem.options.map((opt, optIdx) => `
                    <button class="quiz-opt-btn" onclick="window.ModuleViewer.handleQuizAnswer(${qIdx}, ${optIdx}, ${qItem.answer})">
                      <span class="opt-letter">${String.fromCharCode(65 + optIdx)}</span>
                      <span class="opt-text">${opt}</span>
                    </button>
                  `).join('')}
                </div>
                <div class="quiz-explanation" id="quiz-exp-${qIdx}" style="display:none;">
                  <div class="exp-title">💡 Explanation & Correct Answer:</div>
                  <p>${qItem.explanation}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 5. CERTIFICATIONS & NOTES
    const certsTab = document.getElementById("tab-content-certs");
    if (certsTab) {
      certsTab.innerHTML = `
        <div class="section-block">
          <div class="certs-careers-grid">
            <div class="info-panel">
              <h3 class="panel-title">🏆 Aligned Industry Certifications</h3>
              <p>Recognized professional certifications that directly map to this curriculum:</p>
              <ul class="styled-list">
                ${m.certifications.map(c => `<li>🎖️ <strong>${c}</strong></li>`).join('')}
              </ul>
            </div>

            <div class="info-panel">
              <h3 class="panel-title">💼 Associated Career Pathways</h3>
              <p>High-demand job roles requiring mastery of these concepts:</p>
              <ul class="styled-list">
                ${m.careers.map(car => `<li>💼 <strong>${car}</strong></li>`).join('')}
              </ul>
            </div>
          </div>

          <h3 class="section-title">🌐 Recommended Free Official Resources</h3>
          <div class="resources-grid">
            ${m.freeResources.map(r => `
              <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="resource-card">
                <span class="res-icon">🔗</span>
                <span class="res-name">${r.name}</span>
                <span class="res-arrow">↗</span>
              </a>
            `).join('')}
          </div>

          <div class="notes-panel">
            <h3 class="panel-title">📝 Personal Study Notes</h3>
            <textarea id="module-notes-field" class="cyber-textarea" placeholder="Record your technical observations, lab links, and commands here..."></textarea>
            <div class="notes-actions">
              <button class="cyber-btn cyber-btn-small" onclick="window.ModuleViewer.saveNotes()">💾 Save Notes</button>
              <span id="notes-save-status" class="save-status-msg"></span>
            </div>
          </div>
        </div>
      `;

      const saved = window.CyberState.getModuleNotes(m.id);
      const field = document.getElementById("module-notes-field");
      if (field) field.value = saved;
    }

    // 6. AI MENTOR CHAT
    const aiTab = document.getElementById("tab-content-ai");
    if (aiTab) {
      aiTab.innerHTML = `
        <div class="section-block ai-chat-container">
          <div class="ai-header-bar">
            <div class="ai-avatar">🛡️</div>
            <div class="ai-meta">
              <h4>Aegis Cyber AI • Virtual Professor</h4>
              <p>Dedicated mentor for [${m.titleFr}]: ask conceptual questions, request lab architectures, or debug security configs.</p>
            </div>
            <button class="cyber-btn cyber-btn-small" onclick="window.app.openAISettings()">⚙️ AI Settings</button>
          </div>

          <div class="ai-quick-prompts">
            <button class="quick-prompt-btn" onclick="window.ModuleViewer.sendQuickAiPrompt('Explain the core architectural concepts of this module clearly with enterprise context.')">
              ⚡ Deep Concept Breakdown
            </button>
            <button class="quick-prompt-btn" onclick="window.ModuleViewer.sendQuickAiPrompt('Generate a hands-on virtual lab exercise with commands for VirtualBox.')">
              🧪 Generate Virtual Lab
            </button>
            <button class="quick-prompt-btn" onclick="window.ModuleViewer.sendQuickAiPrompt('Generate 3 challenging multiple-choice examination questions with answers and explanations.')">
              🎯 Practice Exam Questions
            </button>
            <button class="quick-prompt-btn" onclick="window.ModuleViewer.sendQuickAiPrompt('What are the top technical interview questions asked by recruiters for this subject?')">
              💼 Job Interview Questions
            </button>
          </div>

          <div class="ai-messages-box" id="ai-messages-list">
            <div class="ai-msg ai-msg-bot">
              <div class="msg-bubble">
                Welcome! I am your <strong>Aegis AI</strong> mentor 🛡️.<br>
                I am ready to assist you in mastering <strong>${m.titleFr} (${m.titleEn})</strong>. Feel free to ask questions, request code reviews, or test your knowledge in English or French.
              </div>
            </div>
          </div>

          <div class="ai-input-bar">
            <input type="text" id="ai-chat-input" class="cyber-input" placeholder="Type your technical question here (English / French)..." onkeydown="if(event.key==='Enter') window.ModuleViewer.sendAiMessage()">
            <button class="cyber-btn cyber-btn-primary" id="ai-send-btn" onclick="window.ModuleViewer.sendAiMessage()">Send Prompt 🚀</button>
          </div>
        </div>
      `;
    }
  }

  handleQuizAnswer(qIdx, selectedOptIdx, correctOptIdx) {
    const qBox = document.getElementById(`quiz-q-${qIdx}`);
    const expBox = document.getElementById(`quiz-exp-${qIdx}`);
    if (!qBox) return;

    const optButtons = qBox.querySelectorAll(".quiz-opt-btn");
    optButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === correctOptIdx) {
        btn.classList.add("correct-answer");
      } else if (idx === selectedOptIdx && idx !== correctOptIdx) {
        btn.classList.add("wrong-answer");
      }
    });

    if (selectedOptIdx === correctOptIdx) {
      if (window.CyberAudio) window.CyberAudio.playSuccess();
      window.CyberState.addXP(25, "Correct quiz answer");
    } else {
      if (window.CyberAudio) window.CyberAudio.playError();
    }

    if (expBox) expBox.style.display = "block";
  }

  saveNotes() {
    if (!this.activeModule) return;
    const field = document.getElementById("module-notes-field");
    const statusMsg = document.getElementById("notes-save-status");
    if (field) {
      window.CyberState.saveModuleNotes(this.activeModule.id, field.value);
      if (window.CyberAudio) window.CyberAudio.playSuccess();
      if (statusMsg) {
        statusMsg.innerText = "✅ Notes saved successfully!";
        setTimeout(() => { statusMsg.innerText = ""; }, 3000);
      }
    }
  }

  sendQuickAiPrompt(text) {
    const input = document.getElementById("ai-chat-input");
    if (input) {
      input.value = text;
      this.sendAiMessage();
    }
  }

  async sendAiMessage() {
    const input = document.getElementById("ai-chat-input");
    const list = document.getElementById("ai-messages-list");
    const sendBtn = document.getElementById("ai-send-btn");
    if (!input || !list) return;

    const query = input.value.trim();
    if (!query) return;

    const userMsgEl = document.createElement("div");
    userMsgEl.className = "ai-msg ai-msg-user";
    userMsgEl.innerHTML = `<div class="msg-bubble">${window.CyberUtils ? window.CyberUtils.escapeHtml(query) : query}</div>`;
    list.appendChild(userMsgEl);
    input.value = "";
    list.scrollTop = list.scrollHeight;

    const botMsgEl = document.createElement("div");
    botMsgEl.className = "ai-msg ai-msg-bot";
    botMsgEl.innerHTML = `<div class="msg-bubble ai-loading-bubble">Aegis AI is formulating response... ⏳</div>`;
    list.appendChild(botMsgEl);
    list.scrollTop = list.scrollHeight;

    if (sendBtn) sendBtn.disabled = true;
    if (window.CyberAudio) window.CyberAudio.playKeypress();

    try {
      const response = await window.cyberAIService.sendMessage(query, {
        contextModule: this.activeModule
      });
      botMsgEl.innerHTML = `<div class="msg-bubble">${window.ScannerLab ? window.ScannerLab.formatMarkdown(response) : response}</div>`;
      if (window.CyberAudio) window.CyberAudio.playSuccess();
    } catch (err) {
      botMsgEl.innerHTML = `<div class="msg-bubble error-bubble">❌ Error: ${err.message}</div>`;
      if (window.CyberAudio) window.CyberAudio.playError();
    } finally {
      if (sendBtn) sendBtn.disabled = false;
      list.scrollTop = list.scrollHeight;
    }
  }
}

window.ModuleViewer = new ModuleViewer();
