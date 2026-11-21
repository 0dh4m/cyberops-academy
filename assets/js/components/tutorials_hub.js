/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <0dh4mm@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - Tutorials & Video Masterclass Engine
 * Manages zero-to-hero video guides, ELIF5 breakdowns, step-by-step procedures,
 * interactive mini-quizzes, and progress gamification (+50 XP per completed tutorial).
 */
class TutorialsHubEngine {
  constructor() {
    this.activeFilter = "all";
    this.searchQuery = "";
    this.activeTutorial = null;
    this.quizState = {}; // { [tutId]: { selectedIndex, isSubmitted, isCorrect } }
  }

  init() {
    this.bindEvents();
    this.render();

    // Listen to global state events
    if (window.CyberState) {
      window.CyberState.on("tutorialCompletedChanged", () => {
        this.updateCounters();
        this.renderGrid();
        if (this.activeTutorial) {
          this.updateModalCompletionButton(this.activeTutorial.id);
        }
      });
    }

    console.log("🎓 Tutorials & Video Masterclasses Engine Initialized.");
  }

  bindEvents() {
    // Search input
    const searchInput = document.getElementById("tutorials-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderGrid();
      });
    }

    // Filter pills
    document.querySelectorAll(".tut-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tut-filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeFilter = btn.dataset.filter || "all";
        if (window.CyberAudio) window.CyberAudio.playKeypress();
        this.renderGrid();
      });
    });
  }

  getLang() {
    return window.CyberI18n ? window.CyberI18n.getLanguage() : "en";
  }

  t(key, fallback = "") {
    return window.CyberI18n ? window.CyberI18n.t(key) : fallback;
  }

  render() {
    this.updateCounters();
    this.renderGrid();
  }

  updateCounters() {
    const list = window.TutorialsData || [];
    const completedList = window.CyberState ? window.CyberState.getCompletedTutorials() : [];
    
    // Total count
    const totalEl = document.getElementById("tut-stat-total-val");
    if (totalEl) totalEl.innerText = list.length.toString();

    // Completed count
    const completedEl = document.getElementById("tut-stat-completed-val");
    if (completedEl) completedEl.innerText = completedList.length.toString();

    // Watch time (total minutes across all tutorials)
    let totalMinutes = 0;
    list.forEach(item => {
      const match = item.duration.match(/\d+/);
      if (match) totalMinutes += parseInt(match[0], 10);
    });
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const timeEl = document.getElementById("tut-stat-time-val");
    if (timeEl) timeEl.innerText = `${hours}h ${mins}m`;

    // XP earned
    const xpEarned = completedList.length * 50;
    const xpEl = document.getElementById("tut-stat-xp-val");
    if (xpEl) xpEl.innerText = `+${xpEarned} XP`;

    // Progress bar
    const progressFill = document.getElementById("tut-progress-fill");
    const progressText = document.getElementById("tut-progress-text");
    const pct = list.length > 0 ? Math.round((completedList.length / list.length) * 100) : 0;
    if (progressFill) progressFill.style.width = `${pct}%`;
    if (progressText) progressText.innerText = `${pct}%`;
  }

  renderGrid() {
    const grid = document.getElementById("tutorials-grid");
    if (!grid) return;

    const list = window.TutorialsData || [];
    const lang = this.getLang();
    const isFr = lang === "fr";

    const filtered = list.filter(tut => {
      // Category filter
      if (this.activeFilter !== "all" && tut.track !== this.activeFilter) {
        return false;
      }

      // Search query
      if (this.searchQuery) {
        const text = isFr ? tut.fr : tut.en;
        const q = this.searchQuery;
        const matchTitle = text.title.toLowerCase().includes(q);
        const matchTagline = text.tagline.toLowerCase().includes(q);
        const matchElif5 = text.elif5.toLowerCase().includes(q);
        const matchTerms = text.keyTerms.some(k => k.term.toLowerCase().includes(q) || k.def.toLowerCase().includes(q));
        if (!matchTitle && !matchTagline && !matchElif5 && !matchTerms) {
          return false;
        }
      }

      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="tut-empty-state">
          <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
          <h3 style="color: var(--text-primary); font-family: var(--font-title); font-size: 1.2rem; margin-bottom: 6px;">
            ${isFr ? "Aucun tutoriel trouvé" : "No tutorials found matching your search"}
          </h3>
          <p style="color: var(--text-secondary); font-size: 0.9rem;">
            ${isFr ? "Essayez avec d'autres mots-clés comme 'Linux', 'SQLi', 'Wireshark' ou 'CTF'." : "Try searching for keywords like 'Linux', 'SQLi', 'Wireshark', or 'CTF'."}
          </p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(tut => {
      const text = isFr ? tut.fr : tut.en;
      const isDone = window.CyberState ? window.CyberState.isTutorialCompleted(tut.id) : false;
      const actionLabel = isFr ? tut.actionLabelFr : tut.actionLabelEn;

      // Level badge color
      let levelBadge = "🟢 Beginner";
      if (tut.level === "intermediate") levelBadge = "🟡 Intermediate";
      if (tut.level === "advanced") levelBadge = "🔴 Advanced";
      if (isFr) {
        if (tut.level === "beginner") levelBadge = "🟢 Débutant";
        if (tut.level === "intermediate") levelBadge = "🟡 Intermédiaire";
        if (tut.level === "advanced") levelBadge = "🔴 Avancé";
      }

      // Track display label
      let trackBadge = "🚀 Getting Started";
      if (tut.track === "labs") trackBadge = "🧪 Cyber Labs";
      if (tut.track === "ctf") trackBadge = "🚩 CTF Arena";
      if (tut.track === "mitre") trackBadge = "🦅 MITRE ATT&CK";
      if (tut.track === "wargame") trackBadge = "🚨 SOC Wargame";
      if (tut.track === "exam") trackBadge = "⏱️ Exam Prep";

      return `
        <div class="tut-card ${isDone ? 'completed' : ''}" data-tut-id="${tut.id}">
          <div class="tut-thumb-box" onclick="window.TutorialsHub.openTutorial('${tut.id}')">
            <img src="${tut.thumbnail}" alt="${text.title}" class="tut-thumb-img" loading="lazy" />
            <div class="tut-thumb-overlay"></div>
            <div class="tut-play-pulse-btn">▶</div>
            <div class="tut-duration-pill">⏱️ ${tut.duration}</div>
            ${isDone ? `<div class="tut-card-done-badge">✓ ${isFr ? 'Complété (+50 XP)' : 'Completed (+50 XP)'}</div>` : ''}
          </div>

          <div class="tut-card-body">
            <div class="tut-card-tags">
              <span class="tut-badge-track">${trackBadge}</span>
              <span class="tut-badge-level">${levelBadge}</span>
            </div>

            <h3 class="tut-card-title" onclick="window.TutorialsHub.openTutorial('${tut.id}')">${text.title}</h3>
            <p class="tut-card-tagline">${text.tagline}</p>

            <div class="tut-card-elif5-box">
              <span class="tut-elif5-label">💡 ${isFr ? "En clair (Sans jargon) :" : "In simple terms (ELIF5):"}</span>
              <p class="tut-elif5-text">${text.elif5.length > 140 ? text.elif5.substring(0, 140) + '...' : text.elif5}</p>
            </div>

            <div class="tut-terms-row">
              ${text.keyTerms.slice(0, 3).map(k => `<span class="tut-term-pill" title="${k.def}"># ${k.term}</span>`).join('')}
            </div>

            <div class="tut-card-actions">
              <button class="tut-btn-watch" onclick="window.TutorialsHub.openTutorial('${tut.id}')">
                <span>▶</span> ${isFr ? "Guide Vidéo Détaillé" : "Watch Video & Walkthrough"}
              </button>
              <button class="tut-btn-practice" onclick="window.TutorialsHub.executeActionTarget('${tut.actionTarget}')" title="${actionLabel}">
                ${actionLabel}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  openTutorial(tutorialId) {
    const tut = (window.TutorialsData || []).find(t => t.id === tutorialId);
    if (!tut) return;

    this.activeTutorial = tut;
    const isFr = this.getLang() === "fr";
    const text = isFr ? tut.fr : tut.en;
    const isDone = window.CyberState ? window.CyberState.isTutorialCompleted(tut.id) : false;
    const actionLabel = isFr ? tut.actionLabelFr : tut.actionLabelEn;

    const modal = document.getElementById("tutorial-detail-modal");
    if (!modal) return;

    // Header metadata
    const modalTag = document.getElementById("tut-modal-tag");
    const modalTitle = document.getElementById("tut-modal-title");
    const modalTagline = document.getElementById("tut-modal-tagline");
    if (modalTag) modalTag.innerText = `MASTERCLASS • ${tut.track.toUpperCase()} • ${tut.level.toUpperCase()} • ${tut.duration}`;
    if (modalTitle) modalTitle.innerText = text.title;
    if (modalTagline) modalTagline.innerText = text.tagline;

    // Video Iframe Embed
    const videoContainer = document.getElementById("tut-modal-video-frame");
    if (videoContainer) {
      videoContainer.src = `${tut.videoUrl}?autoplay=1&rel=0`;
    }

    // Chapters Row
    const chaptersContainer = document.getElementById("tut-modal-chapters");
    if (chaptersContainer && text.chapters) {
      chaptersContainer.innerHTML = text.chapters.map(ch => `
        <button class="tut-chapter-chip" onclick="window.TutorialsHub.seekChapter('${ch.time}')">
          <span class="chapter-time">⏱️ ${ch.time}</span>
          <span class="chapter-title">${ch.title}</span>
        </button>
      `).join("");
    }

    // ELIF5 Box with Voice Mentor narration
    const elif5Text = document.getElementById("tut-modal-elif5-content");
    if (elif5Text) {
      const speechText = (text.elif5 || "").replace(/['"]/g, " ");
      elif5Text.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 14px;">
          <div style="flex: 1; line-height: 1.6;">${text.elif5}</div>
          <button class="cyber-btn cyber-btn-small cyber-btn-outline" id="btn-voice-elif5" onclick="window.VoiceMentor ? window.VoiceMentor.toggle(window.TutorialsHub.activeTutorial['${isFr ? 'fr' : 'en'}'].elif5, '${isFr ? 'fr' : 'en'}') : null" title="AI Voice Mentor Audio Narration" style="white-space: nowrap;">
            🎙️ ${isFr ? 'Écouter' : 'Listen'}
          </button>
        </div>
      `;
    }

    // Key Terms Glossary
    const termsContainer = document.getElementById("tut-modal-terms");
    if (termsContainer) {
      termsContainer.innerHTML = text.keyTerms.map(k => `
        <div class="tut-glossary-card">
          <div class="glossary-term">🔑 ${k.term}</div>
          <div class="glossary-def">${k.def}</div>
        </div>
      `).join("");
    }

    // Step-by-Step Procedure
    const stepsContainer = document.getElementById("tut-modal-steps");
    if (stepsContainer) {
      stepsContainer.innerHTML = text.steps.map(s => `
        <div class="tut-step-item">
          <div class="step-number-bubble">${s.stepNumber}</div>
          <div class="step-content">
            <h4 class="step-title">${s.title}</h4>
            <p class="step-detail">${s.detail}</p>
          </div>
        </div>
      `).join("");
    }

    // Common Pitfalls
    const pitfallsContainer = document.getElementById("tut-modal-pitfalls");
    if (pitfallsContainer) {
      pitfallsContainer.innerHTML = text.pitfalls.map(p => `
        <li class="pitfall-item">⚠️ ${p}</li>
      `).join("");
    }

    // Interactive Quiz
    this.renderQuiz(tut);

    // Practice button
    const practiceBtn = document.getElementById("tut-modal-practice-btn");
    if (practiceBtn) {
      practiceBtn.innerText = actionLabel;
      practiceBtn.onclick = () => {
        this.closeModal();
        this.executeActionTarget(tut.actionTarget);
      };
    }

    // Completion button
    this.updateModalCompletionButton(tut.id);

    // Show modal
    modal.classList.add("active");
    if (window.CyberAudio) window.CyberAudio.playKeypress();
  }

  updateModalCompletionButton(tutorialId) {
    const btn = document.getElementById("tut-modal-toggle-complete-btn");
    if (!btn) return;

    const isDone = window.CyberState ? window.CyberState.isTutorialCompleted(tutorialId) : false;
    const isFr = this.getLang() === "fr";

    if (isDone) {
      btn.classList.add("completed");
      btn.innerHTML = isFr ? "✓ Validé (+50 XP acquis)" : "✓ Completed (+50 XP earned)";
    } else {
      btn.classList.remove("completed");
      btn.innerHTML = isFr ? "○ Marquer comme Vu & Validé (+50 XP)" : "○ Mark as Watched & Completed (+50 XP)";
    }
  }

  toggleComplete(tutorialId) {
    const targetId = tutorialId || (this.activeTutorial ? this.activeTutorial.id : null);
    if (!targetId || !window.CyberState) return;

    const isNowDone = window.CyberState.toggleTutorialComplete(targetId);
    this.updateModalCompletionButton(targetId);
    this.updateCounters();
    this.renderGrid();

    if (window.CyberUtils) {
      const isFr = this.getLang() === "fr";
      const msg = isNowDone
        ? (isFr ? "🎉 Félicitations ! Tutoriel validé (+50 XP ajoutés)" : "🎉 Awesome! Tutorial completed (+50 XP awarded)")
        : (isFr ? "Tutoriel décoché (-50 XP)" : "Tutorial unchecked (-50 XP)");
      window.CyberUtils.showToast(msg, isNowDone ? "success" : "info");
    }
  }

  renderQuiz(tut) {
    const quizContainer = document.getElementById("tut-modal-quiz");
    if (!quizContainer) return;

    const isFr = this.getLang() === "fr";
    const text = isFr ? tut.fr : tut.en;
    const quiz = text.quiz;
    if (!quiz) {
      quizContainer.innerHTML = "";
      return;
    }

    const state = this.quizState[tut.id] || { selectedIndex: null, isSubmitted: false };

    quizContainer.innerHTML = `
      <div class="tut-quiz-box">
        <div class="tut-quiz-question">
          <span class="quiz-q-icon">🎯</span>
          <span>${quiz.question}</span>
        </div>

        <div class="tut-quiz-options">
          ${quiz.options.map((opt, idx) => {
            let optClass = "tut-quiz-opt";
            if (state.selectedIndex === idx) optClass += " selected";
            if (state.isSubmitted) {
              if (idx === quiz.answerIndex) optClass += " correct";
              else if (state.selectedIndex === idx) optClass += " wrong";
            }
            return `
              <button class="${optClass}" onclick="window.TutorialsHub.selectQuizOption(${idx})" ${state.isSubmitted ? 'disabled' : ''}>
                <span class="opt-letter">${String.fromCharCode(65 + idx)}</span>
                <span class="opt-text">${opt}</span>
              </button>
            `;
          }).join("")}
        </div>

        ${state.isSubmitted ? `
          <div class="tut-quiz-feedback ${state.isCorrect ? 'correct' : 'wrong'}">
            <div class="feedback-title">
              ${state.isCorrect 
                ? (isFr ? "✅ Exact ! Excellente déduction." : "✅ Correct! Excellent understanding.") 
                : (isFr ? "❌ Pas tout à fait." : "❌ Not quite right.")}
            </div>
            <div class="feedback-explanation">${quiz.explanation}</div>
          </div>
        ` : `
          <div style="margin-top: 14px; text-align: right;">
            <button class="cyber-btn cyber-btn-small cyber-btn-primary" onclick="window.TutorialsHub.submitQuiz()" ${state.selectedIndex === null ? 'disabled' : ''}>
              ${isFr ? "Valider ma réponse" : "Submit Answer"}
            </button>
          </div>
        `}
      </div>
    `;
  }

  selectQuizOption(idx) {
    if (!this.activeTutorial) return;
    const tutId = this.activeTutorial.id;
    if (!this.quizState[tutId]) this.quizState[tutId] = {};
    if (this.quizState[tutId].isSubmitted) return;

    this.quizState[tutId].selectedIndex = idx;
    if (window.CyberAudio) window.CyberAudio.playKeypress();
    this.renderQuiz(this.activeTutorial);
  }

  submitQuiz() {
    if (!this.activeTutorial) return;
    const tutId = this.activeTutorial.id;
    const state = this.quizState[tutId];
    if (!state || state.selectedIndex === null || state.isSubmitted) return;

    const isFr = this.getLang() === "fr";
    const quiz = (isFr ? this.activeTutorial.fr : this.activeTutorial.en).quiz;
    state.isSubmitted = true;
    state.isCorrect = (state.selectedIndex === quiz.answerIndex);

    if (state.isCorrect) {
      if (window.CyberAudio) window.CyberAudio.playSuccess();
      // Automatically award completion if not already completed
      if (window.CyberState && !window.CyberState.isTutorialCompleted(tutId)) {
        this.toggleComplete(tutId);
      }
    } else {
      if (window.CyberAudio) window.CyberAudio.playAlert();
    }

    this.renderQuiz(this.activeTutorial);
  }

  seekChapter(timeStr) {
    if (window.CyberUtils) {
      const isFr = this.getLang() === "fr";
      window.CyberUtils.showToast(isFr ? `Repère vidéo : ${timeStr}` : `Jumped to video marker: ${timeStr}`, "info");
    }
  }

  executeActionTarget(target) {
    if (!target) return;
    this.closeModal();

    if (target === "terminal") {
      if (window.app && typeof window.app.toggleTerminal === "function") {
        window.app.toggleTerminal();
      }
      return;
    }

    if (target.startsWith("labs:")) {
      const labKey = target.split(":")[1];
      if (window.app && typeof window.app.enterPlatform === "function") {
        window.app.enterPlatform("labs");
        if (window.CyberPlaygrounds && typeof window.CyberPlaygrounds.switchLab === "function") {
          window.CyberPlaygrounds.switchLab(labKey);
        }
      }
      return;
    }

    // Regular platform tabs (curriculum, ctf, mitre, wargame, exam, flashcards, scanner)
    if (window.app && typeof window.app.enterPlatform === "function") {
      window.app.enterPlatform(target);
    }
  }

  closeModal() {
    if (window.VoiceMentor) window.VoiceMentor.stop();
    const modal = document.getElementById("tutorial-detail-modal");
    if (modal) {
      modal.classList.remove("active");
      // Stop video playback by clearing iframe src
      const videoContainer = document.getElementById("tut-modal-video-frame");
      if (videoContainer) videoContainer.src = "";
    }
    this.activeTutorial = null;
  }
}

window.TutorialsHub = new TutorialsHubEngine();
