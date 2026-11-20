/**
 * CyberOps Academy - Achievement Badges & Digital Cyber Passport Engine
 * Manages automated unlocking, real-time gamification alerts, and passport modal rendering.
 */
class BadgesPassportEngine {
  constructor() {
    this.modalEl = null;
  }

  init() {
    this.modalEl = document.getElementById("badges-passport-modal");
    this.checkAutomatedUnlocks();

    if (window.CyberState) {
      window.CyberState.on("xpChanged", () => this.checkAutomatedUnlocks());
      window.CyberState.on("moduleCompletedChanged", () => this.checkAutomatedUnlocks());
      window.CyberState.on("tutorialCompletedChanged", () => this.checkAutomatedUnlocks());
      window.CyberState.on("badgeUnlocked", (data) => {
        this.renderNavbarBadgeCounter();
      });
    }

    this.renderNavbarBadgeCounter();
    console.log("🏆 Badges & Passport Engine Initialized.");
  }

  getLang() {
    return window.CyberI18n ? window.CyberI18n.getLanguage() : "en";
  }

  checkAutomatedUnlocks() {
    if (!window.CyberState) return;

    // 1. Welcome badge (automatic)
    window.CyberState.unlockBadge("badge-welcome", 50);

    // 2. Tutorials
    const tuts = window.CyberState.getCompletedTutorials();
    if (tuts.length >= 1) window.CyberState.unlockBadge("badge-tutorial-master", 50);

    // 3. XP milestones
    const xp = window.CyberState.getXP();
    if (xp >= 4000) window.CyberState.unlockBadge("badge-secops-legend", 500);

    // 4. Modules
    const mods = window.CyberState.getCompletedModules();
    if (mods.length >= 1) window.CyberState.unlockBadge("badge-crypto-key", 75);

    this.renderNavbarBadgeCounter();
  }

  renderNavbarBadgeCounter() {
    const counterEl = document.getElementById("navbar-badges-count");
    if (!counterEl || !window.CyberState) return;
    const unlocked = window.CyberState.getUnlockedBadges().length;
    const total = (window.BadgesData || []).length;
    counterEl.innerText = `${unlocked}/${total}`;
  }

  openModal() {
    this.checkAutomatedUnlocks();
    this.renderModalContent();
    if (this.modalEl) {
      this.modalEl.classList.add("active");
      if (window.CyberAudio) window.CyberAudio.playKeypress();
    }
  }

  closeModal() {
    if (this.modalEl) {
      this.modalEl.classList.remove("active");
    }
  }

  renderModalContent() {
    const container = document.getElementById("badges-passport-content");
    if (!container || !window.CyberState) return;

    const isFr = this.getLang() === "fr";
    const profile = window.CyberState.getUserProfile();
    const unlockedIds = window.CyberState.getUnlockedBadges();
    const allBadges = window.BadgesData || [];
    const unlockedCount = unlockedIds.length;
    const totalCount = allBadges.length;
    const xp = window.CyberState.getXP();
    const rank = window.CyberState.getRank();
    const activeCareer = window.CyberState.getActiveCareerPath();

    container.innerHTML = `
      <!-- Student Digital Cyber Passport Card -->
      <div class="passport-id-card">
        <div class="passport-card-top">
          <div class="passport-avatar-badge">${profile.avatar || '🛡️'}</div>
          <div class="passport-identity">
            <h3 class="passport-name">${profile.name}</h3>
            <span class="passport-spec">${profile.specialization}</span>
            <span class="passport-fede-id">ID: ${profile.studentId} • ${profile.provider.toUpperCase()}</span>
          </div>
          <div class="passport-rank-badge">
            <span class="rank-icon-big">${rank.icon}</span>
            <span class="rank-level-tag">${rank.level}</span>
            <span class="rank-title-text">${rank.title}</span>
          </div>
        </div>

        <div class="passport-metrics-row">
          <div class="pass-metric">
            <span class="p-val" style="color: var(--neon-cyan);">${xp} XP</span>
            <span class="p-lbl">${isFr ? "Score Expérience" : "Total Experience"}</span>
          </div>
          <div class="pass-metric">
            <span class="p-val" style="color: var(--neon-green);">${unlockedCount} / ${totalCount}</span>
            <span class="p-lbl">${isFr ? "Badges Débloqués" : "Badges Unlocked"}</span>
          </div>
          <div class="pass-metric">
            <span class="p-val" style="color: #a855f7;">${activeCareer.toUpperCase().replace('_', ' ')}</span>
            <span class="p-lbl">${isFr ? "Spécialisation Cible" : "Target Pathway"}</span>
          </div>
        </div>
      </div>

      <!-- Badges Matrix Grid -->
      <h3 class="badges-matrix-heading">
        🏆 ${isFr ? "Matrice des Trophées et Réussites" : "Achievements & Badges Matrix"}
      </h3>

      <div class="badges-matrix-grid">
        ${allBadges.map(b => {
          const isUnlocked = unlockedIds.includes(b.id);
          const text = isFr ? b.fr : b.en;

          return `
            <div class="badge-card ${isUnlocked ? 'unlocked' : 'locked'}" style="--badge-accent: ${b.color};">
              <div class="badge-icon-box">
                <span class="badge-glyph">${isUnlocked ? b.icon : '🔒'}</span>
                <span class="badge-reward-tag">+${b.xpReward} XP</span>
              </div>

              <div class="badge-info">
                <h4 class="badge-title">${text.title}</h4>
                <p class="badge-desc">${text.desc}</p>
                <div class="badge-status-pill">
                  ${isUnlocked 
                    ? `<span style="color: var(--neon-green);">✓ ${isFr ? 'Débloqué' : 'Unlocked'}</span>` 
                    : `<span style="color: var(--text-muted);">🔒 ${isFr ? 'Verrouillé' : 'Locked'}</span>`}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
}

window.BadgesPassport = new BadgesPassportEngine();
