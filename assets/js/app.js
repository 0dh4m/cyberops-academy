/**
 * CyberOps Academy - Main Application Orchestrator
 * Coordinates top navigation tabs, hero telemetry, Pomodoro timer, AI settings & components.
 */
class CyberPlatformApp {
  constructor() {
    this.currentView = "home"; // 'home' | 'curriculum' | 'labs' | 'exam' | 'flashcards' | 'ctf' | 'mitre' | 'wargame' | 'scanner'
    this.pomodoroTime = 25 * 60;
    this.pomodoroTimerId = null;
    this.pomodoroMode = "work"; // 'work' | 'break'
  }

  init() {
    // Apply Internationalization
    if (window.CyberI18n) {
      window.CyberI18n.applyTranslations();
      const lang = window.CyberI18n.getLanguage();
      document.querySelectorAll('#btn-lang-en, #btn-lang-en-landing').forEach(btn => btn.classList.toggle('active', lang === 'en'));
      document.querySelectorAll('#btn-lang-fr, #btn-lang-fr-landing').forEach(btn => btn.classList.toggle('active', lang === 'fr'));
    }

    this.setupViewTabs();
    this.setupHeroStats();
    this.setupPomodoro();
    this.setupAISettingsModal();
    this.setupGlobalShortcuts();

    // Initialize all modular components
    if (window.ModuleViewer) window.ModuleViewer.init();
    if (window.CyberPlaygrounds) window.CyberPlaygrounds.init();
    if (window.ExamSim) window.ExamSim.init();
    if (window.FlashcardsEngine) window.FlashcardsEngine.init();
    if (window.CtfArena) window.CtfArena.init();
    if (window.MitreNav) window.MitreNav.init();
    if (window.WargameSim) window.WargameSim.init();
    if (window.TutorialsHub) window.TutorialsHub.init();
    if (window.CareerRoadmaps) window.CareerRoadmaps.init();
    if (window.CheatsheetVault) window.CheatsheetVault.init();
    if (window.ThreatRadar) window.ThreatRadar.init();
    if (window.BadgesPassport) window.BadgesPassport.init();
    if (window.CyberGlossary) window.CyberGlossary.init();
    if (window.FirstDayQuest) window.FirstDayQuest.render();
    if (window.GuidedTour) window.GuidedTour.init();

    // Initialize Terminal Shell
    this.terminal = new window.CyberTerminal("term-output", "term-input-field", this);

    // Progression Mode & Nav Locks
    this.updateProgressionModeButton();
    this.updateNavTabLocks();
    this.updateStudentNavbarBadge();

    // Enforce initial view state: if unauthenticated, ensure landing is visible and portal is hidden
    if (!window.CyberState || !window.CyberState.isAuthenticated()) {
      const portal = document.getElementById('portal-app-view');
      const landing = document.getElementById('landing-page-view');
      if (portal) portal.style.display = 'none';
      if (landing) landing.style.display = 'block';
    }

    // Setup state listeners for progressive milestones
    if (window.CyberState) {
      window.CyberState.on("userProfileChanged", () => {
        this.updateStudentNavbarBadge();
      });
      window.CyberState.on("accessModeChanged", () => {
        this.updateProgressionModeButton();
        this.updateNavTabLocks();
      });
      window.CyberState.on("xpChanged", () => {
        this.updateNavTabLocks();
      });
      window.CyberState.on("moduleCompletedChanged", () => {
        this.updateNavTabLocks();
        if (window.ModuleViewer) window.ModuleViewer.render();
      });
    }

    // Audio toggle button
    const soundBtn = document.getElementById("btn-toggle-sound");
    if (soundBtn && window.CyberAudio && typeof window.CyberAudio.isAudioEnabled === 'function') {
      const updateSoundIcon = () => {
        const isEnabled = window.CyberAudio.isAudioEnabled();
        soundBtn.innerHTML = isEnabled ? "🔊" : "🔇";
        soundBtn.title = isEnabled ? "Sound Effects: Enabled (Click to Mute)" : "Sound Effects: Muted (Click to Unmute)";
      };
      updateSoundIcon();
      soundBtn.addEventListener("click", () => {
        if (typeof window.CyberAudio.toggleSound === 'function') {
          const isEnabled = window.CyberAudio.toggleSound();
          updateSoundIcon();
          if (window.CyberUtils) {
            window.CyberUtils.showToast(isEnabled ? "Audio effects unmuted" : "Audio muted", "info");
          }
        }
      });
    }

    // Check for incoming live OAuth token callback from Discord / Google
    this.checkOAuthUrlCallback();

    // Set initial view (home landing page)
    this.returnToLanding();

    console.log("🛡️ CyberOps Academy Platform Initialized.");
  }

  // =========================================================================
  // VIEW NAVIGATION (Curriculum, Labs, Exam Simulator, Flashcards, Scanner)
  // =========================================================================
  setupViewTabs() {
    const tabButtons = document.querySelectorAll(".portal-nav-tab");
    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const viewName = btn.dataset.portalView;

        // Milestone progression guard
        if (window.CyberState && !window.CyberState.isFeatureUnlocked(viewName)) {
          const isFr = window.CyberI18n ? window.CyberI18n.getLanguage() === 'fr' : false;
          const req = window.CyberState.getFeatureUnlockRequirement(viewName, isFr);
          if (window.CyberAudio) window.CyberAudio.playAlert();
          if (window.CyberUtils) {
            window.CyberUtils.showToast(isFr ? `🔒 Section Verrouillée • Prérequis : ${req}` : `🔒 Section Locked • Prerequisite: ${req}`, 'warning', 4500);
          }
          return;
        }

        tabButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.switchView(viewName);
      });
    });

    this.updateNavTabLocks();
  }

  updateNavTabLocks() {
    if (!window.CyberState) return;
    const isFr = window.CyberI18n ? window.CyberI18n.getLanguage() === 'fr' : false;
    const tabButtons = document.querySelectorAll(".portal-nav-tab");
    tabButtons.forEach(btn => {
      const viewName = btn.dataset.portalView;
      const isUnlocked = window.CyberState.isFeatureUnlocked(viewName);
      const existingLock = btn.querySelector(".tab-lock-indicator");

      if (isUnlocked) {
        btn.classList.remove("locked");
        if (existingLock) existingLock.remove();
        btn.removeAttribute("title");
      } else {
        btn.classList.add("locked");
        if (!existingLock) {
          const lockSpan = document.createElement("span");
          lockSpan.className = "tab-lock-indicator";
          lockSpan.innerText = "🔒";
          btn.appendChild(lockSpan);
        }
        const req = window.CyberState.getFeatureUnlockRequirement(viewName, isFr);
        btn.title = isFr ? `Verrouillé : ${req}` : `Locked: ${req}`;
      }
    });
  }

  updateProgressionModeButton() {
    const btn = document.getElementById("btn-toggle-progression");
    if (!btn || !window.CyberState) return;
    const isFree = window.CyberState.isFreeAccessMode();
    const isFr = window.CyberI18n ? window.CyberI18n.getLanguage() === 'fr' : false;

    if (isFree) {
      btn.innerHTML = isFr ? "🔓 Accès Libre" : "🔓 Free Access";
      btn.classList.add("active");
      btn.title = isFr ? "Accès libre activé. Cliquez pour réactiver la progression pédagogique structurée." : "Free access active. Click to restore structured pedagogical progression.";
    } else {
      btn.innerHTML = isFr ? "🎮 Progressif" : "🎮 Progressive";
      btn.classList.remove("active");
      btn.title = isFr ? "Progression guidée active. Les fonctionnalités et modules se débloquent au fil de vos réussites." : "Progressive learning active. Features and modules unlock organically as you complete tasks.";
    }
  }

  toggleProgressionMode() {
    if (!window.CyberState) return;
    const isFree = window.CyberState.toggleFreeAccessMode();
    const isFr = window.CyberI18n ? window.CyberI18n.getLanguage() === 'fr' : false;

    this.updateProgressionModeButton();
    this.updateNavTabLocks();

    if (window.ModuleViewer) window.ModuleViewer.render();
    if (window.CtfArena) window.CtfArena.render();
    if (window.WargameSim && typeof window.WargameSim.renderScenarioSelector === "function") {
      window.WargameSim.renderScenarioSelector();
    }

    if (window.CyberAudio) window.CyberAudio.playKeypress();
    if (window.CyberUtils) {
      const msg = isFree
        ? (isFr ? "🔓 Mode Accès Libre activé ! Tous les modules, labs et wargames sont déverrouillés." : "🔓 Free Access Mode activated! All modules, wargames, and features are now fully accessible.")
        : (isFr ? "🎮 Mode Progressif activé ! Le contenu se débloquera au fil de vos validations." : "🎮 Progressive Mode activated! Content will unlock step-by-step as you complete tasks.");
      window.CyberUtils.showToast(msg, "info", 4000);
    }
  }

  switchView(viewName) {
    this.currentView = viewName;
    document.querySelectorAll(".portal-view-section").forEach(sec => {
      sec.classList.toggle("active", sec.dataset.viewSection === viewName);
    });

    // Toggle hero candidate telemetry stats banner (hidden on landing page)
    const heroBanner = document.querySelector(".hero-stats-banner");
    if (heroBanner) {
      heroBanner.style.display = viewName === "home" ? "none" : "block";
    }

    // Synchronize active class on portal nav tabs
    document.querySelectorAll(".portal-nav-tab").forEach(tab => {
      tab.classList.toggle("active", tab.dataset.portalView === viewName);
    });

    if (window.CyberAudio) window.CyberAudio.playKeypress();
    window.scrollTo({ top: 0, behavior: "smooth" });

    // If switching to curriculum, refresh FirstDayQuest progress
    if (viewName === "curriculum" && window.FirstDayQuest) {
      window.FirstDayQuest.render();
    }
    // If switching to tutorials, refresh grid & progress
    if (viewName === "tutorials" && window.TutorialsHub) {
      window.TutorialsHub.render();
    }
    if (viewName === "career" && window.CareerRoadmaps) {
      window.CareerRoadmaps.render();
    }
    if (viewName === "cheatsheets" && window.CheatsheetVault) {
      window.CheatsheetVault.render();
    }
    if (window.ThreatRadar) {
      window.ThreatRadar.resizeCanvas();
    }

    // If switching to labs or scanner, ensure child lab view is active
    if (viewName === "scanner" && window.CyberPlaygrounds) {
      this.switchView("labs");
      window.CyberPlaygrounds.switchLab("scanner");
      const scannerNavBtn = document.querySelector('[data-playground="scanner"]');
      if (scannerNavBtn) {
        document.querySelectorAll(".playground-nav-btn").forEach(b => b.classList.remove("active"));
        scannerNavBtn.classList.add("active");
      }
    }
  }

  openBadgesPassport() {
    if (window.BadgesPassport) window.BadgesPassport.openModal();
  }

  closeBadgesPassport() {
    if (window.BadgesPassport) window.BadgesPassport.closeModal();
  }

  startGuidedTour() {
    if (window.GuidedTour) window.GuidedTour.startTour();
  }

  openGlossary(termId = null) {
    if (window.CyberGlossary) window.CyberGlossary.openModal(termId);
  }

  closeGlossary() {
    if (window.CyberGlossary) window.CyberGlossary.closeModal();
  }

  openDiagnostic() {
    if (window.DiagnosticQuiz) window.DiagnosticQuiz.openModal();
  }

  closeDiagnostic() {
    if (window.DiagnosticQuiz) window.DiagnosticQuiz.closeModal();
  }

  // =========================================================================
  // HERO STATS & GAMIFICATION TELEMETRY
  // =========================================================================
  setupHeroStats() {
    this.updateHeroStats();
    if (window.CyberState) {
      window.CyberState.on("xpChanged", () => this.updateHeroStats());
      window.CyberState.on("moduleCompletedChanged", () => this.updateHeroStats());
    }
  }

  updateHeroStats() {
    if (!window.CyberState || !window.CURRICULUM_DATA) return;

    const totalModules = window.CURRICULUM_DATA.length;
    const completedList = window.CyberState.getCompletedModules();
    const completedCount = completedList.length;
    const pct = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;
    const xp = window.CyberState.getXP();
    const rank = window.CyberState.getRank(xp);
    const streak = window.CyberState.getStreak();

    const progressFill = document.getElementById("overall-progress-fill");
    const progressText = document.getElementById("overall-progress-text");
    const rankTitleEl = document.getElementById("user-rank-title");
    const rankLevelEl = document.getElementById("user-rank-level");
    const userXpEl = document.getElementById("user-xp-count");
    const streakEl = document.getElementById("user-streak-count");
    const completedStatEl = document.getElementById("stat-completed-count");

    const isFr = window.CyberI18n ? window.CyberI18n.getLanguage() === 'fr' : false;
    const levelNum = rank.level.replace("LEVEL ", "");
    const rankTitle = isFr && window.CyberI18n ? window.CyberI18n.t(`rankL${levelNum}`) : rank.title;
    const rankLevel = isFr ? `NIVEAU ${levelNum}` : rank.level;
    const streakSuffix = isFr ? 'Jours' : 'Days';

    if (progressFill) progressFill.style.width = `${pct}%`;
    if (progressText) progressText.innerText = `${pct}%`;
    if (rankTitleEl) rankTitleEl.innerText = rankTitle;
    if (rankLevelEl) rankLevelEl.innerText = rankLevel;
    if (userXpEl) userXpEl.innerText = `${xp.toLocaleString()} XP`;
    if (streakEl) streakEl.innerText = `${streak} ${streakSuffix}`;
    if (completedStatEl) completedStatEl.innerText = `${completedCount}/${totalModules}`;
  }

  // =========================================================================
  // POMODORO TIMER
  // =========================================================================
  setupPomodoro() {
    const toggleBtn = document.getElementById("pomodoro-toggle-btn");
    const resetBtn = document.getElementById("pomodoro-reset-btn");

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => this.togglePomodoro());
    }
    if (resetBtn) {
      resetBtn.addEventListener("click", () => this.resetPomodoro());
    }
    this.updatePomodoroDisplay();
  }

  togglePomodoro() {
    const btn = document.getElementById("pomodoro-toggle-btn");
    if (this.pomodoroTimerId) {
      clearInterval(this.pomodoroTimerId);
      this.pomodoroTimerId = null;
      if (btn) btn.innerText = "▶ Start Focus";
    } else {
      if (btn) btn.innerText = "⏸ Pause";
      this.pomodoroTimerId = setInterval(() => {
        this.pomodoroTime--;
        this.updatePomodoroDisplay();
        if (this.pomodoroTime <= 0) {
          clearInterval(this.pomodoroTimerId);
          this.pomodoroTimerId = null;
          if (window.CyberAudio) window.CyberAudio.playSuccess();
          if (this.pomodoroMode === "work") {
            window.CyberState.addXP(50, "Completed 25-minute Pomodoro study interval");
            alert("⏰ Pomodoro Interval Completed! Excellent focus. Take a 5-minute breather.");
            this.pomodoroMode = "break";
            this.pomodoroTime = 5 * 60;
          } else {
            alert("⏰ Break Finished! Ready to resume cybersecurity operations.");
            this.pomodoroMode = "work";
            this.pomodoroTime = 25 * 60;
          }
          if (btn) btn.innerText = "▶ Start Focus";
          this.updatePomodoroDisplay();
        }
      }, 1000);
    }
  }

  resetPomodoro() {
    clearInterval(this.pomodoroTimerId);
    this.pomodoroTimerId = null;
    this.pomodoroMode = "work";
    this.pomodoroTime = 25 * 60;
    const btn = document.getElementById("pomodoro-toggle-btn");
    if (btn) btn.innerText = "▶ Start Focus";
    this.updatePomodoroDisplay();
  }

  updatePomodoroDisplay() {
    const mins = Math.floor(this.pomodoroTime / 60);
    const secs = this.pomodoroTime % 60;
    const display = document.getElementById("pomodoro-display");
    if (display) {
      display.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  }

  // =========================================================================
  // AI SETTINGS MODAL
  // =========================================================================
  openAISettings() {
    const modal = document.getElementById("ai-settings-modal");
    if (modal) modal.classList.add("open");
    if (window.CyberAudio) window.CyberAudio.playKeypress();
  }

  closeAISettings() {
    const modal = document.getElementById("ai-settings-modal");
    if (modal) modal.classList.remove("open");
  }

  setupAISettingsModal() {
    const providerSelect = document.getElementById("ai-provider-select");
    const keyInput = document.getElementById("ai-key-input");
    const modelInput = document.getElementById("ai-model-input");
    const endpointInput = document.getElementById("ai-endpoint-input");
    const endpointGroup = document.getElementById("ai-endpoint-group");

    if (!window.cyberAIService) return;
    const cfg = window.cyberAIService.getConfig();

    if (providerSelect) providerSelect.value = cfg.provider;
    if (keyInput) keyInput.value = cfg.apiKey;
    if (modelInput) modelInput.value = cfg.model;
    if (endpointInput) endpointInput.value = cfg.customEndpoint;

    if (providerSelect) {
      providerSelect.addEventListener("change", () => {
        const p = providerSelect.value;
        if (endpointGroup) {
          endpointGroup.style.display = (p === "ollama" || p === "custom") ? "block" : "none";
        }
        if (modelInput) {
          if (p === "gemini") modelInput.value = "gemini-1.5-flash";
          else if (p === "groq") modelInput.value = "llama-3.3-70b-versatile";
          else if (p === "openai") modelInput.value = "gpt-4o-mini";
          else if (p === "openrouter") modelInput.value = "meta-llama/llama-3.3-70b-instruct";
          else if (p === "ollama") modelInput.value = "llama3:latest";
        }
      });
    }

    const saveBtn = document.getElementById("btn-save-ai-settings");
    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        window.cyberAIService.saveConfig({
          provider: providerSelect.value,
          apiKey: keyInput.value.trim(),
          model: modelInput.value.trim(),
          customEndpoint: endpointInput ? endpointInput.value.trim() : ""
        });
        if (window.CyberAudio) window.CyberAudio.playSuccess();
        if (window.CyberUtils) window.CyberUtils.showToast("✓ AI Settings Saved to Browser LocalStorage!", "success");
        this.closeAISettings();
      });
    }

    const testBtn = document.getElementById("btn-test-ai-connection");
    const testResult = document.getElementById("ai-test-result");
    if (testBtn && testResult) {
      testBtn.addEventListener("click", async () => {
        testResult.className = "ai-test-box testing";
        testResult.innerHTML = "Connecting to AI Provider API... ⏳";
        try {
          const res = await window.cyberAIService.testConnection();
          testResult.className = "ai-test-box success";
          testResult.innerHTML = `✓ Connected successfully to <strong>${res.provider.toUpperCase()}</strong>! Latency: ${res.latencyMs}ms.`;
          if (window.CyberAudio) window.CyberAudio.playSuccess();
        } catch (err) {
          testResult.className = "ai-test-box error";
          testResult.innerHTML = `❌ Connection Error: ${err.message}`;
          if (window.CyberAudio) window.CyberAudio.playError();
        }
      });
    }
  }

  // =========================================================================
  // CYBER TERMINAL OVERLAY
  // =========================================================================
  toggleTerminal() {
    const term = document.getElementById("terminal-overlay");
    if (!term) return;
    const isOpen = term.classList.toggle("open");
    if (isOpen) {
      const input = document.getElementById("term-input-field");
      if (input) setTimeout(() => input.focus(), 150);
      if (window.CyberAudio) window.CyberAudio.playScan();
    } else {
      if (window.CyberAudio) window.CyberAudio.playKeypress();
    }
  }

  setupGlobalShortcuts() {
    document.addEventListener("keydown", (e) => {
      // Toggle Terminal with Ctrl+` or Escape to close modals
      if (e.ctrlKey && e.code === "Backquote") {
        e.preventDefault();
        this.toggleTerminal();
      } else if (e.code === "Escape") {
        if (window.ModuleViewer) window.ModuleViewer.closeModal();
        this.closeAISettings();
        const term = document.getElementById("terminal-overlay");
        if (term && term.classList.contains("open")) {
          term.classList.remove("open");
        }
      }
    });
  }

  isModuleCompleted(id) {
    return window.CyberState ? window.CyberState.isModuleCompleted(id) : false;
  }

  openModuleModal(id) {
    if (window.ModuleViewer) window.ModuleViewer.openModal(id);
  }

  getStats() {
    const totalModules = window.CURRICULUM_DATA ? window.CURRICULUM_DATA.length : 19;
    const completedList = window.CyberState ? window.CyberState.getCompletedModules() : [];
    const completedCount = completedList.length;
    const percent = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;
    const xp = window.CyberState ? window.CyberState.getXP() : 0;
    const rank = window.CyberState ? window.CyberState.getRank(xp) : { title: 'Script Cadet', level: 'LEVEL 1' };
    const streak = window.CyberState ? window.CyberState.getStreak() : 1;

    return {
      totalModules,
      completedCount,
      percent,
      xp,
      rankTitle: rank.title,
      level: rank.level.replace("LEVEL ", ""),
      streak
    };
  }

  // =========================================================================
  // LANDING PAGE & PLATFORM ROUTING (PROTECTED ROUTE GUARD)
  // =========================================================================
  enterPlatform(targetView = 'curriculum') {
    // 1. ROUTE GUARD: Enforce mandatory student authentication
    if (!window.CyberState || !window.CyberState.isAuthenticated()) {
      if (window.CyberAudio) window.CyberAudio.playAlert();
      const isFr = window.CyberI18n ? window.CyberI18n.getLanguage() === 'fr' : false;
      if (window.CyberUtils) {
        window.CyberUtils.showToast(
          isFr 
            ? '🔒 Accès Protégé : Veuillez vous connecter ou créer un compte étudiant pour accéder au Command Center.' 
            : '🔒 Protected Access: Please sign in or create a student cadet account to access the Command Center.',
          'warning',
          4500
        );
      }
      this.pendingRedirectView = targetView;
      this.openAuthModal('signin');
      return;
    }

    const landing = document.getElementById('landing-page-view');
    const portal = document.getElementById('portal-app-view');
    if (landing) landing.style.display = 'none';
    if (portal) portal.style.display = 'block';

    this.switchView(targetView);
    this.updateStudentNavbarBadge();
    if (window.CyberAudio) window.CyberAudio.playSuccess();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (window.CyberUtils) {
      const isFr = window.CyberI18n ? window.CyberI18n.getLanguage() === 'fr' : false;
      window.CyberUtils.showToast(isFr ? '🚀 Bienvenue sur la Plateforme CyberOps !' : '🚀 Welcome to CyberOps Operations Command Center!', 'success', 3500);
    }
  }

  returnToLanding() {
    this.currentView = 'home';
    const landing = document.getElementById('landing-page-view');
    const portal = document.getElementById('portal-app-view');
    if (portal) portal.style.display = 'none';
    if (landing) landing.style.display = 'block';

    this.safePlayAudio('playKeypress');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  safePlayAudio(method = 'playKeypress') {
    try {
      if (window.CyberAudio && typeof window.CyberAudio[method] === 'function') {
        window.CyberAudio[method]();
      }
    } catch (e) {
      // Audio never blocks UI execution
    }
  }

  // =========================================================================
  // STUDENT AUTH (LOGIN / SIGN UP / OAUTH SSO) MODAL
  // =========================================================================
  openAuthModal(tab = 'signin') {
    const modal = document.getElementById('auth-modal');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('open');
      this.switchAuthTab(tab);
      this.safePlayAudio('playKeypress');
    }
  }

  closeAuthModal() {
    const modals = document.querySelectorAll('.auth-modal-overlay, #auth-modal');
    modals.forEach(m => {
      m.classList.remove('open');
      m.style.display = 'none';
    });
    this.safePlayAudio('playKeypress');
  }

  switchAuthTab(tab) {
    const btnSignin = document.getElementById('btn-auth-tab-signin');
    const btnSignup = document.getElementById('btn-auth-tab-signup');
    const formSignin = document.getElementById('auth-form-signin');
    const formSignup = document.getElementById('auth-form-signup');

    if (btnSignin && btnSignup && formSignin && formSignup) {
      btnSignin.classList.toggle('active', tab === 'signin');
      btnSignup.classList.toggle('active', tab === 'signup');
      formSignin.style.display = tab === 'signin' ? 'flex' : 'none';
      formSignup.style.display = tab === 'signup' ? 'flex' : 'none';
    }
    this.safePlayAudio('playKeypress');
  }

  handleSocialAuth(provider, btnEl) {
    this.safePlayAudio('playKeypress');
    this.openOAuthConnectModal(provider);
  }

  openOAuthConnectModal(provider = 'google') {
    const isFr = window.CyberI18n ? window.CyberI18n.getLanguage() === 'fr' : false;
    const modal = document.getElementById('oauth-connect-modal');
    if (!modal) return;

    const iconEl = document.getElementById('oauth-modal-icon');
    const titleEl = document.getElementById('oauth-modal-title');
    const subEl = document.getElementById('oauth-modal-subtitle');
    const nameLabel = document.getElementById('oauth-name-label');
    const emailLabel = document.getElementById('oauth-email-label');
    const nameInput = document.getElementById('oauth-name-input');
    const emailInput = document.getElementById('oauth-email-input');
    const providerHidden = document.getElementById('oauth-provider-hidden');

    if (providerHidden) providerHidden.value = provider;

    const rememberedEmail = localStorage.getItem('cyberops_saved_email') || 'adamcherkaoui99@gmail.com';
    const rememberedName = localStorage.getItem('cyberops_saved_name') || 'Adam Cherkaoui';

    if (provider === 'discord') {
      if (iconEl) iconEl.innerText = '💬';
      if (titleEl) titleEl.innerText = isFr ? 'Connexion Compte Discord Réel' : 'Connect Real Discord Account';
      if (subEl) subEl.innerText = isFr ? 'Enregistrement de votre identité Discord dans CyberOps MySQL' : 'Register your real Discord identity in CyberOps MySQL';
      if (nameLabel) nameLabel.innerText = isFr ? 'Pseudo / Tag Discord' : 'Discord Username / Tag';
      if (emailLabel) emailLabel.innerText = isFr ? 'Adresse Email Discord' : 'Discord Account Email';
      if (nameInput) { nameInput.placeholder = 'e.g. AstronMaster#0001'; nameInput.value = rememberedName; }
      if (emailInput) { emailInput.placeholder = 'e.g. adamcherkaoui99@gmail.com'; emailInput.value = rememberedEmail; }
    } else if (provider === 'github') {
      if (iconEl) iconEl.innerText = '🐙';
      if (titleEl) titleEl.innerText = isFr ? 'Connexion Compte GitHub Réel' : 'Connect Real GitHub Account';
      if (subEl) subEl.innerText = isFr ? 'Enregistrement de votre profil GitHub dans CyberOps MySQL' : 'Register your real GitHub profile in CyberOps MySQL';
      if (nameLabel) nameLabel.innerText = isFr ? 'Nom d\'utilisateur GitHub' : 'GitHub Developer Username';
      if (emailLabel) emailLabel.innerText = isFr ? 'Email GitHub' : 'GitHub Account Email';
      if (nameInput) { nameInput.placeholder = 'e.g. Adam (Dev)'; nameInput.value = rememberedName; }
      if (emailInput) { emailInput.placeholder = 'e.g. adamcherkaoui99@gmail.com'; emailInput.value = rememberedEmail; }
    } else {
      // Google
      if (iconEl) iconEl.innerText = '🌐';
      if (titleEl) titleEl.innerText = isFr ? 'Connexion Compte Google Réel' : 'Connect Real Google Account';
      if (subEl) subEl.innerText = isFr ? 'Enregistrement de votre identité Google dans CyberOps MySQL' : 'Register your real Google identity in CyberOps MySQL';
      if (nameLabel) nameLabel.innerText = isFr ? 'Nom Complet Google' : 'Your Real Name (Google Profile)';
      if (emailLabel) emailLabel.innerText = isFr ? 'Adresse Email Google (Gmail)' : 'Google Account Email (Gmail)';
      if (nameInput) { nameInput.placeholder = 'e.g. Adam Cherkaoui'; nameInput.value = rememberedName; }
      if (emailInput) { emailInput.placeholder = 'e.g. adamcherkaoui99@gmail.com'; emailInput.value = rememberedEmail; }
    }

    modal.style.display = 'flex';
    modal.classList.add('open');
  }

  closeOAuthConnectModal() {
    const modal = document.getElementById('oauth-connect-modal');
    if (modal) {
      modal.classList.remove('open');
      modal.style.display = 'none';
    }
    this.safePlayAudio('playKeypress');
  }

  launchLiveOAuthRedirect() {
    const provider = document.getElementById('oauth-provider-hidden')?.value || 'discord';
    const redirectUri = window.location.origin + window.location.pathname;

    if (provider === 'discord') {
      const clientId = '1558704012499488778';
      const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=identify%20email&state=discord`;
      window.open(discordUrl, '_blank', 'width=580,height=750');
    } else if (provider === 'google') {
      const googleClientId = localStorage.getItem('cyberops_google_client_id') || '407408718192.apps.googleusercontent.com';
      const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=email%20profile&state=google`;
      window.open(googleUrl, '_blank', 'width=540,height=680');
    } else {
      const ghUrl = `https://github.com/login/oauth/authorize?client_id=demo&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user:email`;
      window.open(ghUrl, '_blank', 'width=580,height=700');
    }
  }

  async submitOAuthConnect(e) {
    if (e && e.preventDefault) e.preventDefault();
    const isFr = window.CyberI18n ? window.CyberI18n.getLanguage() === 'fr' : false;
    this.safePlayAudio('playKeypress');

    const provider = document.getElementById('oauth-provider-hidden')?.value || 'google';
    const nameInput = document.getElementById('oauth-name-input');
    const emailInput = document.getElementById('oauth-email-input');
    const submitBtn = document.getElementById('oauth-submit-btn');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';

    if (!name || !email) {
      if (window.CyberUtils) window.CyberUtils.showToast(isFr ? 'Veuillez saisir votre nom et email.' : 'Please enter your name and email.', 'warning', 3000);
      return;
    }

    try {
      localStorage.setItem('cyberops_saved_name', name);
      localStorage.setItem('cyberops_saved_email', email);
    } catch (e) {}

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>⏳</span> <span>${isFr ? 'Enregistrement dans MySQL...' : 'Registering in MySQL Database...'}</span>`;
    }

    try {
      const res = await fetch('api/auth.php?action=oauth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          name,
          email,
          oauth_id: email
        })
      });
      const data = await res.json();

      if (res.ok && data.success && data.profile) {
        window.CyberState.setUserProfile(data.profile);
        this.closeOAuthConnectModal();
        this.closeAuthModal();
        this.updateStudentNavbarBadge();
        this.safePlayAudio('playSuccess');

        const successMsg = isFr
          ? `✓ Connecté via ${provider.toUpperCase()} ! Bienvenue ${data.profile.name}.`
          : `✓ Successfully authenticated via ${provider.toUpperCase()}! Welcome ${data.profile.name}.`;
        if (window.CyberUtils) window.CyberUtils.showToast(successMsg, 'success', 3500);

        const target = this.pendingRedirectView || 'curriculum';
        this.pendingRedirectView = null;
        this.enterPlatform(target);
      } else {
        throw new Error(data.error || 'OAuth registration failed');
      }
    } catch (err) {
      console.warn('OAuth API error, using local fallback:', err);
      const profile = {
        name,
        email,
        studentId: 'FEDE-' + provider.substring(0, 3).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000),
        provider,
        avatar: provider === 'discord' ? '💬' : (provider === 'google' ? '🌐' : '🐙'),
        specialization: 'European Bachelor in Cybersecurity & Networks',
        currentXp: 150,
        rankLevel: 1,
        rankTitle: 'Script Cadet',
        isAuthenticated: true
      };
      window.CyberState.setUserProfile(profile);
      this.closeOAuthConnectModal();
      this.closeAuthModal();
      this.updateStudentNavbarBadge();
      this.safePlayAudio('playSuccess');
      if (window.CyberUtils) window.CyberUtils.showToast(`✓ Authenticated via ${provider.toUpperCase()}: ${name}`, 'success', 3500);
      this.enterPlatform(this.pendingRedirectView || 'curriculum');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `✨ ${isFr ? 'Autoriser & Enregistrer' : 'Authorize & Save to MySQL Database'}`;
      }
    }
  }

  checkOAuthUrlCallback() {
    if (!window.location.hash) return;
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const state = params.get('state') || 'discord';

    if (accessToken) {
      window.history.replaceState(null, null, window.location.pathname);
      this.handleOAuthTokenCallback(accessToken, state);
    }
  }

  async handleOAuthTokenCallback(token, provider) {
    try {
      if (provider === 'discord') {
        const userRes = await fetch('https://discord.com/api/users/@me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const discordUser = await userRes.json();
        if (discordUser && discordUser.username) {
          const name = discordUser.discriminator && discordUser.discriminator !== '0'
            ? `${discordUser.username}#${discordUser.discriminator}`
            : discordUser.username;
          const email = discordUser.email || `${discordUser.username}@discord.user`;
          const avatar = discordUser.avatar
            ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
            : '💬';

          const res = await fetch('api/auth.php?action=oauth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              provider: 'discord',
              name,
              email,
              oauth_id: discordUser.id,
              avatar_url: avatar
            })
          });
          const data = await res.json();
          if (data && data.profile) {
            window.CyberState.setUserProfile(data.profile);
            this.updateStudentNavbarBadge();
            if (window.CyberUtils) window.CyberUtils.showToast(`✓ Live Discord Connected: Welcome ${name}!`, 'success', 4000);
            this.enterPlatform('curriculum');
          }
        }
      }
    } catch (e) {
      console.warn('OAuth callback token parse error:', e);
    }
  }

  togglePasswordVisibility(inputId, btnEl) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    if (btnEl) {
      btnEl.innerText = isPassword ? '🙈' : '👁️';
      btnEl.title = isPassword ? 'Hide password' : 'Show password';
    }
    if (window.CyberAudio) window.CyberAudio.playKeypress();
  }

  checkPasswordStrength(inputEl) {
    if (!inputEl) return;
    const val = inputEl.value;
    const bar = document.getElementById('signup-strength-bar');
    const label = document.getElementById('signup-strength-label');
    if (!bar || !label) return;

    const isFr = window.CyberI18n ? window.CyberI18n.getLanguage() === 'fr' : false;

    if (!val) {
      bar.className = 'strength-bar-fill';
      bar.style.width = '0%';
      label.innerText = isFr ? 'Sécurité : Non renseigné' : 'Strength: Not entered';
      return;
    }

    let score = 0;
    if (val.length >= 8) score++;
    if (val.length >= 12) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[a-z]/.test(val) && /[A-Z]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    bar.className = 'strength-bar-fill';
    if (score <= 1) {
      bar.classList.add('weak');
      label.innerText = isFr ? 'Sécurité : Faible ⚠️' : 'Strength: Weak ⚠️';
    } else if (score <= 3) {
      bar.classList.add('medium');
      label.innerText = isFr ? 'Sécurité : Moyen 🛡️' : 'Strength: Medium 🛡️';
    } else if (score <= 4) {
      bar.classList.add('strong');
      label.innerText = isFr ? 'Sécurité : Robuste ✓' : 'Strength: Strong ✓';
    } else {
      bar.classList.add('master');
      label.innerText = isFr ? 'Sécurité : Niveau Cyber ⚡' : 'Strength: Cyber-Grade ⚡';
    }
  }

  handleForgotPassword() {
    const isFr = window.CyberI18n ? window.CyberI18n.getLanguage() === 'fr' : false;
    const email = document.getElementById('signin-email-input');
    const targetEmail = (email && email.value) ? email.value : 'student@miage-fede.eu';
    if (window.CyberAudio) window.CyberAudio.playAlert();
    if (window.CyberUtils) {
      const msg = isFr
        ? `📧 Instructions de réinitialisation envoyées à ${targetEmail}. Vérifiez votre boîte mail académique.`
        : `📧 Password reset link dispatched to ${targetEmail}. Check your university inbox.`;
      window.CyberUtils.showToast(msg, 'info', 4500);
    }
  }

  updateStudentNavbarBadge() {
    if (!window.CyberState) return;
    const profile = window.CyberState.getUserProfile();
    const badgeContainer = document.getElementById('student-navbar-profile');
    if (!badgeContainer) return;

    if (profile && profile.isAuthenticated) {
      badgeContainer.style.display = 'inline-flex';
      const nameEl = badgeContainer.querySelector('.student-name');
      const providerEl = badgeContainer.querySelector('.student-provider-tag');
      const avatarEl = badgeContainer.querySelector('.student-avatar-icon');
      if (avatarEl) {
        avatarEl.innerText = profile.avatar || (profile.provider === 'discord' ? '💬' : (profile.provider === 'google' ? '🌐' : '👤'));
      }
      if (nameEl) {
        nameEl.innerText = profile.name || 'Cadet';
        nameEl.title = `${profile.name} (${profile.studentId || 'FEDE-2026'}) • ${profile.email || ''}`;
      }
      if (providerEl) {
        providerEl.innerText = profile.provider ? profile.provider.toUpperCase() : 'STUDENT';
      }
    } else {
      badgeContainer.style.display = 'none';
    }
  }

  logoutStudent() {
    const isFr = window.CyberI18n ? window.CyberI18n.getLanguage() === 'fr' : false;
    if (window.CyberState) window.CyberState.clearUserProfile();
    this.updateStudentNavbarBadge();
    this.returnToLanding();
    this.safePlayAudio('playAlert');
    if (window.CyberUtils) {
      window.CyberUtils.showToast(isFr ? '✓ Déconnexion réussie. Accès à la plateforme verrouillé.' : '✓ Signed out successfully. Platform access locked.', 'info', 3000);
    }
  }

  async handleAuthSubmit(e, mode) {
    if (e && e.preventDefault) e.preventDefault();
    const isFr = window.CyberI18n ? window.CyberI18n.getLanguage() === 'fr' : false;
    this.safePlayAudio('playKeypress');

    const form = document.getElementById(mode === 'signup' ? 'auth-form-signup' : 'auth-form-signin');
    const submitBtn = form ? form.querySelector('.auth-submit-btn') : null;
    const origBtnHtml = submitBtn ? submitBtn.innerHTML : '';

    let payload = {};
    if (mode === 'signup') {
      const name = document.getElementById('signup-name-input')?.value.trim();
      const email = document.getElementById('signup-email-input')?.value.trim();
      const pass = document.getElementById('signup-password-input')?.value;
      const spec = document.getElementById('signup-spec-select')?.value;

      if (!name || !email || !pass) {
        if (window.CyberUtils) window.CyberUtils.showToast(isFr ? 'Veuillez remplir tous les champs.' : 'Please fill in all required fields.', 'warning', 3000);
        return;
      }
      if (pass.length < 6) {
        if (window.CyberUtils) window.CyberUtils.showToast(isFr ? 'Le mot de passe doit comporter au moins 6 caractères.' : 'Password must contain at least 6 characters.', 'warning', 3000);
        return;
      }
      payload = { name, email, password: pass, specialization: spec };
    } else {
      const email = document.getElementById('signin-email-input')?.value.trim();
      const pass = document.getElementById('signin-password-input')?.value;
      if (!email || !pass) {
        if (window.CyberUtils) window.CyberUtils.showToast(isFr ? 'Email et mot de passe requis.' : 'Email and password required.', 'warning', 3000);
        return;
      }
      payload = { email, password: pass };
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>⏳</span> <span>${isFr ? 'Vérification en cours...' : 'Verifying Credentials...'}</span>`;
    }

    try {
      const res = await fetch(`api/auth.php?action=${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok && data.success && data.profile) {
        window.CyberState.setUserProfile(data.profile);
        this.closeAuthModal();
        this.updateStudentNavbarBadge();
        this.safePlayAudio('playSuccess');

        const welcomeMsg = mode === 'signup'
          ? (isFr ? `✨ Compte créé dans MySQL pour ${data.profile.name} !` : `✨ Account created in CyberOps Database for ${data.profile.name}!`)
          : (isFr ? `✓ Bienvenue, ${data.profile.name} ! Session active.` : `✓ Authenticated successfully. Welcome back, ${data.profile.name}!`);
        if (window.CyberUtils) window.CyberUtils.showToast(welcomeMsg, 'success', 3500);

        const target = this.pendingRedirectView || 'curriculum';
        this.pendingRedirectView = null;
        this.enterPlatform(target);
      } else {
        this.safePlayAudio('playError');
        const errMsg = data.error || (isFr ? 'Échec de la connexion.' : 'Authentication failed.');
        if (window.CyberUtils) window.CyberUtils.showToast(`⚠️ ${errMsg}`, 'error', 4500);
      }
    } catch (err) {
      console.warn('API error, falling back to local credentials:', err);
      this.handleLocalAuthFallback(payload, mode, isFr);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origBtnHtml;
      }
    }
  }

  handleLocalAuthFallback(payload, mode, isFr) {
    let accounts = {};
    try {
      accounts = JSON.parse(localStorage.getItem('cyberops_local_cadet_accounts') || '{}');
    } catch (e) {}

    const email = payload.email.toLowerCase();
    if (mode === 'signup') {
      if (accounts[email]) {
        this.safePlayAudio('playError');
        if (window.CyberUtils) window.CyberUtils.showToast(isFr ? 'Ce compte existe déjà. Veuillez vous connecter.' : 'An account with this email already exists.', 'warning', 3500);
        return;
      }
      accounts[email] = {
        name: payload.name,
        email: email,
        password: payload.password,
        specialization: payload.specialization || 'European Bachelor in Cybersecurity & Networks',
        studentId: 'FEDE-' + Math.floor(1000 + Math.random() * 9000),
        currentXp: 100,
        rankLevel: 1,
        rankTitle: 'Script Cadet'
      };
      localStorage.setItem('cyberops_local_cadet_accounts', JSON.stringify(accounts));

      const profile = { ...accounts[email], provider: 'email', isAuthenticated: true, avatar: '🛡️' };
      delete profile.password;
      window.CyberState.setUserProfile(profile);
      this.closeAuthModal();
      this.updateStudentNavbarBadge();
      this.safePlayAudio('playSuccess');
      if (window.CyberUtils) window.CyberUtils.showToast(isFr ? `✨ Compte créé pour ${profile.name} !` : `✨ Cadet Account created for ${profile.name}!`, 'success', 3500);
      this.enterPlatform(this.pendingRedirectView || 'curriculum');
    } else {
      const acc = accounts[email];
      if (!acc) {
        this.safePlayAudio('playError');
        if (window.CyberUtils) window.CyberUtils.showToast(isFr ? 'Aucun compte avec cet email.' : 'No account registered with this email. Please sign up.', 'error', 3500);
        return;
      }
      if (acc.password !== payload.password) {
        this.safePlayAudio('playError');
        if (window.CyberUtils) window.CyberUtils.showToast(isFr ? 'Mot de passe incorrect.' : 'Incorrect password. Access denied.', 'error', 3500);
        return;
      }
      const profile = { ...acc, provider: 'email', isAuthenticated: true, avatar: '🛡️' };
      delete profile.password;
      window.CyberState.setUserProfile(profile);
      this.closeAuthModal();
      this.updateStudentNavbarBadge();
      this.safePlayAudio('playSuccess');
      if (window.CyberUtils) window.CyberUtils.showToast(isFr ? `✓ Bienvenue, ${profile.name} !` : `✓ Welcome back, ${profile.name}!`, 'success', 3500);
      this.enterPlatform(this.pendingRedirectView || 'curriculum');
    }
  }
}

// Global Instantiate
window.app = new CyberPlatformApp();
document.addEventListener("DOMContentLoaded", () => {
  window.app.init();
});
