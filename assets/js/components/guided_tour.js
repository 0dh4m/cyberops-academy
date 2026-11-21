/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <adamcherkaoui99@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - Interactive Guided Onboarding Tour Component
 * 5-step spotlight walkthrough for beginners introducing the platform layout,
 * interactive labs, video masterclasses, and terminal shell.
 */
class GuidedTourEngine {
  constructor() {
    this.currentStepIndex = 0;
    this.isActive = false;

    this.steps = [
      {
        targetSelector: ".command-navbar",
        icon: "🛡️",
        en: {
          title: "Welcome to CyberOps Academy!",
          text: "This is your Security Operations Command Center. Manage your study modes (Progressive vs Free Access), switch languages (EN/FR), and track your student profile."
        },
        fr: {
          title: "Bienvenue sur CyberOps Academy !",
          text: "Voici votre centre de commandement. Gérez vos modes d'apprentissage (Progressif vs Libre), basculez la langue (FR/EN) et suivez votre profil étudiant."
        }
      },
      {
        targetSelector: '[data-portal-view="curriculum"]',
        icon: "📚",
        en: {
          title: "19 Academic Curriculum Modules",
          text: "Structured European Bachelor syllabus covering Linux, Cisco routing, cryptography, ethical hacking, and ISO 27001 governance. Earn XP as you complete chapters."
        },
        fr: {
          title: "19 Modules Académiques FEDE",
          text: "Programme officiel du Bachelor Européen : Linux, réseaux Cisco, cryptographie, hacking éthique et ISO 27001. Gagnez de l'XP à chaque chapitre validé."
        }
      },
      {
        targetSelector: '[data-portal-view="labs"]',
        icon: "🧪",
        en: {
          title: "6 In-Browser Virtual Labs",
          text: "Zero installation required! Analyze real TCP handshakes, calculate CIDR subnet masks, exploit and patch SQL injections, and audit code with AI."
        },
        fr: {
          title: "6 Labs Virtuels dans le Navigateur",
          text: "Zéro installation requise ! Analysez les flux TCP, calculez les masques CIDR, exploitez des failles SQLi et auditez du code en direct."
        }
      },
      {
        targetSelector: '[data-portal-view="tutorials"]',
        icon: "🎓",
        en: {
          title: "Video Masterclasses & Zero-Jargon Guides",
          text: "Designed specifically so complete beginners never get lost. Every feature has a step-by-step video, ELIF5 (Explain Like I'm 5) breakdown, and audio mentor."
        },
        fr: {
          title: "Vidéos & Guides Sans Jargon (ELIF5)",
          text: "Conçu pour que les débutants ne soient jamais bloqués. Chaque outil dispose d'une vidéo guidée, d'une vulgarisation simplifiée et d'un narrateur audio."
        }
      },
      {
        targetSelector: '[data-portal-view="cheatsheets"]',
        icon: "⚡",
        en: {
          title: "Cheat Sheets & Aegis Cyber Terminal",
          text: "Copy production commands with 1-click or press Ctrl+` to summon your in-browser Bash/PowerShell terminal shell anytime!"
        },
        fr: {
          title: "Aide-mémoires & Terminal Cyber Aegis",
          text: "Copiez des commandes en 1 clic ou pressez Ctrl+` pour ouvrir à tout moment votre terminal Bash/PowerShell intégré au navigateur !"
        }
      }
    ];
  }

  getLang() {
    return window.CyberI18n ? window.CyberI18n.currentLang : "en";
  }

  init() {
    // If beginner hasn't seen the tour yet, prompt after a short delay
    const completed = window.CyberState ? window.CyberState.isTourCompleted() : false;
    if (!completed) {
      setTimeout(() => {
        // Prompt only if portal view is active
        const portal = document.getElementById("portal-app-view");
        if (portal && portal.style.display !== "none" && !this.isActive) {
          this.promptTourModal();
        }
      }, 1500);
    }
  }

  promptTourModal() {
    const isFr = this.getLang() === "fr";
    if (window.CyberUtils) {
      window.CyberUtils.showToast(
        isFr ? "👋 Nouveau ici ? Cliquez sur '🧭 Visite Guidée' pour découvrir la plateforme en 60 secondes !" : "👋 New here? Click '🧭 Quick Tour' to explore the platform in 60 seconds!",
        "info",
        6000
      );
    }
  }

  startTour() {
    this.currentStepIndex = 0;
    this.isActive = true;
    if (window.CyberAudio) window.CyberAudio.playKeypress();

    let overlay = document.getElementById("guided-tour-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "guided-tour-overlay";
      overlay.className = "guided-tour-backdrop";
      document.body.appendChild(overlay);
    }
    overlay.style.display = "block";

    this.renderStep();
  }

  renderStep() {
    const isFr = this.getLang() === "fr";
    const step = this.steps[this.currentStepIndex];
    if (!step) {
      this.finishTour();
      return;
    }

    const content = isFr ? step.fr : step.en;
    let box = document.getElementById("guided-tour-card");
    if (!box) {
      box = document.createElement("div");
      box.id = "guided-tour-card";
      box.className = "guided-tour-card";
      document.body.appendChild(box);
    }

    const targetEl = document.querySelector(step.targetSelector);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
      document.querySelectorAll(".tour-highlighted").forEach(el => el.classList.remove("tour-highlighted"));
      targetEl.classList.add("tour-highlighted");
    }

    box.innerHTML = `
      <div class="tour-header">
        <div class="tour-step-tag">
          <span class="tour-icon">${step.icon}</span>
          <span>STEP ${this.currentStepIndex + 1} OF ${this.steps.length}</span>
        </div>
        <button class="tour-close-btn" onclick="window.GuidedTour.skipTour()" title="Skip Tour">✕</button>
      </div>

      <h3 class="tour-title">${content.title}</h3>
      <p class="tour-desc">${content.text}</p>

      <div class="tour-dots-row">
        ${this.steps.map((_, i) => `<span class="tour-dot ${i === this.currentStepIndex ? 'active' : ''}"></span>`).join('')}
      </div>

      <div class="tour-actions-row">
        <button class="cyber-btn cyber-btn-small cyber-btn-outline" onclick="window.GuidedTour.skipTour()">
          ${isFr ? 'Passer' : 'Skip'}
        </button>
        <div style="display: flex; gap: 8px;">
          ${this.currentStepIndex > 0 ? `
            <button class="cyber-btn cyber-btn-small cyber-btn-outline" onclick="window.GuidedTour.prevStep()">
              ← ${isFr ? 'Précédent' : 'Prev'}
            </button>
          ` : ''}
          <button class="cyber-btn cyber-btn-small cyber-btn-primary" onclick="window.GuidedTour.nextStep()">
            ${this.currentStepIndex === this.steps.length - 1 ? (isFr ? 'Terminer 🎉' : 'Finish 🎉') : (isFr ? 'Suivant →' : 'Next →')}
          </button>
        </div>
      </div>
    `;

    box.style.display = "block";
    if (window.CyberAudio) window.CyberAudio.playKeypress();
  }

  nextStep() {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
      this.renderStep();
    } else {
      this.finishTour();
    }
  }

  prevStep() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.renderStep();
    }
  }

  skipTour() {
    this.closeTour();
  }

  finishTour() {
    this.closeTour();
    if (window.CyberState) {
      window.CyberState.setTourCompleted(true);
      window.CyberState.unlockBadge('badge-welcome');
    }
    const isFr = this.getLang() === "fr";
    if (window.CyberUtils) {
      window.CyberUtils.showToast(
        isFr ? "🎉 Félicitations ! Vous êtes prêt à explorer le cyber-espace." : "🎉 Awesome! You are fully equipped to explore the cyber battlefield.",
        "success"
      );
    }
  }

  closeTour() {
    this.isActive = false;
    document.querySelectorAll(".tour-highlighted").forEach(el => el.classList.remove("tour-highlighted"));
    const overlay = document.getElementById("guided-tour-overlay");
    if (overlay) overlay.style.display = "none";
    const box = document.getElementById("guided-tour-card");
    if (box) box.style.display = "none";
  }
}

window.GuidedTour = new GuidedTourEngine();
