/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <adamcherkaoui99@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - Diagnostic "Where Do I Start?" Quiz Engine
 * 3-question interactive diagnostic tool for complete beginners that eliminates
 * decision fatigue and outputs a personalized study roadmap with direct 1-click links.
 */
class DiagnosticQuizEngine {
  constructor() {
    this.currentStep = 0;
    this.answers = {
      level: null,
      interest: null,
      time: null
    };
  }

  getLang() {
    return window.CyberI18n ? window.CyberI18n.currentLang : "en";
  }

  openModal() {
    const modal = document.getElementById("diagnostic-quiz-modal");
    if (!modal) return;
    this.currentStep = 0;
    this.answers = { level: null, interest: null, time: null };
    modal.classList.add("active");
    this.render();
    if (window.CyberAudio) window.CyberAudio.playKeypress();
  }

  closeModal() {
    const modal = document.getElementById("diagnostic-quiz-modal");
    if (modal) modal.classList.remove("active");
  }

  selectOption(key, value) {
    this.answers[key] = value;
    if (window.CyberAudio) window.CyberAudio.playKeypress();
    this.currentStep++;
    this.render();
  }

  restart() {
    this.currentStep = 0;
    this.answers = { level: null, interest: null, time: null };
    this.render();
  }

  render() {
    const container = document.getElementById("diagnostic-quiz-container");
    if (!container) return;

    const isFr = this.getLang() === "fr";

    if (this.currentStep === 0) {
      // Question 1: Experience level
      container.innerHTML = `
        <div class="diag-question-box">
          <div class="diag-progress-pill">${isFr ? 'Question 1 sur 3' : 'Question 1 of 3'}</div>
          <h3 class="diag-question-title">
            ${isFr ? 'Quel est votre niveau actuel en informatique et sécurité ?' : 'What is your current background in IT & Cybersecurity?'}
          </h3>
          <p class="diag-question-sub">
            ${isFr ? 'Soyez 100% honnête, la plateforme adapte le parcours exactement à votre profil.' : 'Be 100% honest, the academy customizes your roadmap to match your exact baseline.'}
          </p>

          <div class="diag-options-grid">
            <button class="diag-option-card" onclick="window.DiagnosticQuiz.selectOption('level', 'beginner')">
              <span class="diag-card-icon">🌱</span>
              <div>
                <div class="diag-card-title">${isFr ? 'Débutant Absolu (Zéro expérience)' : 'Complete Beginner (Zero prior technical background)'}</div>
                <div class="diag-card-desc">${isFr ? 'Vous découvrez le domaine pour la première fois. Pas de panique, vous êtes au bon endroit.' : 'First time exploring tech and cybersecurity. Relax, you are in the right hands.'}</div>
              </div>
            </button>

            <button class="diag-option-card" onclick="window.DiagnosticQuiz.selectOption('level', 'student')">
              <span class="diag-card-icon">🎓</span>
              <div>
                <div class="diag-card-title">${isFr ? 'Étudiant en Informatique / Réseaux' : 'IT or Networking Student'}</div>
                <div class="diag-card-desc">${isFr ? 'Vous connaissez les bases des adresses IP et de Linux, et visez un Bachelor ou Master.' : 'Familiar with basic IP addresses and Linux, aiming for a European certification.'}</div>
              </div>
            </button>

            <button class="diag-option-card" onclick="window.DiagnosticQuiz.selectOption('level', 'developer')">
              <span class="diag-card-icon">💻</span>
              <div>
                <div class="diag-card-title">${isFr ? 'Développeur ou Administrateur Système' : 'Software Developer or SysAdmin'}</div>
                <div class="diag-card-desc">${isFr ? 'Vous codez déjà ou gérez des serveurs, et souhaitez vous spécialiser en sécurité.' : 'Already code or manage servers, seeking a pivot into cybersecurity.'}</div>
              </div>
            </button>
          </div>
        </div>
      `;
    } else if (this.currentStep === 1) {
      // Question 2: Interest
      container.innerHTML = `
        <div class="diag-question-box">
          <div class="diag-progress-pill">${isFr ? 'Question 2 sur 3' : 'Question 2 of 3'}</div>
          <h3 class="diag-question-title">
            ${isFr ? 'Qu\'est-ce qui vous passionne le plus dans la cybersécurité ?' : 'What excites you most about cybersecurity?'}
          </h3>
          <p class="diag-question-sub">
            ${isFr ? 'Choisissez le rôle qui correspond à votre tempérament.' : 'Choose the role that fits your personality best.'}
          </p>

          <div class="diag-options-grid">
            <button class="diag-option-card" onclick="window.DiagnosticQuiz.selectOption('interest', 'blue')">
              <span class="diag-card-icon">🛡️</span>
              <div>
                <div class="diag-card-title">${isFr ? 'Défense, Analyse SOC & Réponse aux Incidents (Blue Team)' : 'Defense, SOC Telemetry & Incident Response (Blue Team)'}</div>
                <div class="diag-card-desc">${isFr ? 'Arrêter les attaques, analyser les logs et protéger les entreprises contre les rançongiciels.' : 'Stop cyber attacks, analyze SIEM logs, and protect enterprise infrastructure.'}</div>
              </div>
            </button>

            <button class="diag-option-card" onclick="window.DiagnosticQuiz.selectOption('interest', 'red')">
              <span class="diag-card-icon">⚔️</span>
              <div>
                <div class="diag-card-title">${isFr ? 'Hacking Éthique, Pentest & Casse-têtes (Red Team)' : 'Ethical Hacking, Penetration Testing & CTF (Red Team)'}</div>
                <div class="diag-card-desc">${isFr ? 'Trouver les failles avant les pirates, contourner les sécurités et résoudre des CTF.' : 'Find security holes before hackers do, bypass filters, and solve CTF puzzles.'}</div>
              </div>
            </button>

            <button class="diag-option-card" onclick="window.DiagnosticQuiz.selectOption('interest', 'cloud')">
              <span class="diag-card-icon">☁️</span>
              <div>
                <div class="diag-card-title">${isFr ? 'Sécurité du Cloud & DevSecOps' : 'Cloud Security & DevSecOps'}</div>
                <div class="diag-card-desc">${isFr ? 'Automatiser la sécurité dans le code, Docker, Kubernetes et AWS/Azure.' : 'Automate security inside code pipelines, Docker, Kubernetes, and Cloud.'}</div>
              </div>
            </button>
          </div>
        </div>
      `;
    } else if (this.currentStep === 2) {
      // Question 3: Time availability
      container.innerHTML = `
        <div class="diag-question-box">
          <div class="diag-progress-pill">${isFr ? 'Question 3 sur 3' : 'Question 3 of 3'}</div>
          <h3 class="diag-question-title">
            ${isFr ? 'Combien de temps pouvez-vous consacrer par semaine ?' : 'How much study time can you commit per week?'}
          </h3>
          <p class="diag-question-sub">
            ${isFr ? 'La régularité prime sur la durée brute.' : 'Consistency matters more than brute hours.'}
          </p>

          <div class="diag-options-grid">
            <button class="diag-option-card" onclick="window.DiagnosticQuiz.selectOption('time', 'casual')">
              <span class="diag-card-icon">☕</span>
              <div>
                <div class="diag-card-title">${isFr ? 'Tranquille : 2 à 4 heures / semaine' : 'Casual: 2 to 4 hours / week'}</div>
                <div class="diag-card-desc">${isFr ? 'Idéal pour avancer pas à pas à votre rythme après les cours ou le travail.' : 'Perfect for self-paced progress in the evenings or weekends.'}</div>
              </div>
            </button>

            <button class="diag-option-card" onclick="window.DiagnosticQuiz.selectOption('time', 'steady')">
              <span class="diag-card-icon">⚡</span>
              <div>
                <div class="diag-card-title">${isFr ? 'Régulier : 5 à 10 heures / semaine' : 'Steady: 5 to 10 hours / week'}</div>
                <div class="diag-card-desc">${isFr ? 'Rythme recommandé pour valider le Bachelor Européen en 6 mois.' : 'Recommended pace to prepare for European certification in 6 months.'}</div>
              </div>
            </button>

            <button class="diag-option-card" onclick="window.DiagnosticQuiz.selectOption('time', 'bootcamp')">
              <span class="diag-card-icon">🚀</span>
              <div>
                <div class="diag-card-title">${isFr ? 'Intensif : 15+ heures / semaine' : 'Intensive: 15+ hours / week'}</div>
                <div class="diag-card-desc">${isFr ? 'Immersion totale pour une reconversion professionnelle rapide.' : 'Total immersion for a fast career transition into security.'}</div>
              </div>
            </button>
          </div>
        </div>
      `;
    } else {
      // Diagnostic Results & Custom Roadmap
      this.renderResults(container, isFr);
    }
  }

  renderResults(container, isFr) {
    let pathId = "soc_analyst";
    let pathTitle = isFr ? "Analyste SOC & Réponse à Incident (Blue Team)" : "SOC Analyst & Incident Responder (Blue Team)";
    let pathIcon = "🛡️";

    if (this.answers.interest === "red") {
      pathId = "pentester";
      pathTitle = isFr ? "Hacker Éthique & Pentester (Red Team)" : "Ethical Hacker & Penetration Tester (Red Team)";
      pathIcon = "⚔️";
    } else if (this.answers.interest === "cloud") {
      pathId = "devsecops";
      pathTitle = isFr ? "Architecte Sécurité Cloud & DevSecOps" : "Cloud Security Architect & DevSecOps";
      pathIcon = "☁️";
    }

    if (window.CyberState) {
      window.CyberState.setActiveCareerPath(pathId);
    }

    container.innerHTML = `
      <div class="diag-result-card">
        <div class="diag-result-header">
          <span class="diag-result-badge">🎯 ${isFr ? 'RECOMMANDATION PERSONNALISÉE' : 'PERSONALIZED RECOMMENDATION'}</span>
          <h2 class="diag-result-title">${pathIcon} ${pathTitle}</h2>
          <p class="diag-result-sub">
            ${isFr 
              ? 'D\'après vos réponses, voici votre plan de démarrage optimal pour les 7 prochains jours :' 
              : 'Based on your answers, here is your optimal 7-day kickoff plan:'}
          </p>
        </div>

        <div class="diag-steps-timeline">
          <div class="diag-timeline-item">
            <div class="timeline-num">1</div>
            <div class="timeline-meta">
              <h4>${isFr ? 'Étape 1 : Regarder le Guide Vidéo #01' : 'Step 1: Watch Video Masterclass #01'}</h4>
              <p>${isFr ? 'Comprendre le fonctionnement d\'une attaque et la défense périmétrique avec explication ELIF5.' : 'Understand cyber attacks and perimeter defense with zero-jargon ELIF5.'}</p>
              <button class="cyber-btn cyber-btn-small cyber-btn-primary" onclick="window.DiagnosticQuiz.closeModal(); window.app.enterPlatform('tutorials');">
                ▶ ${isFr ? 'Voir le Tutoriel' : 'Watch Tutorial'}
              </button>
            </div>
          </div>

          <div class="diag-timeline-item">
            <div class="timeline-num">2</div>
            <div class="timeline-meta">
              <h4>${isFr ? 'Étape 2 : Valider le Module 01 (Fondations Réseau)' : 'Step 2: Complete Module 01 (Networking Foundations)'}</h4>
              <p>${isFr ? 'Découvrir le modèle OSI, les trames Ethernet et les commandes Linux de base.' : 'Master OSI layers, Ethernet frames, and essential Linux commands.'}</p>
              <button class="cyber-btn cyber-btn-small cyber-btn-outline" onclick="window.DiagnosticQuiz.closeModal(); window.app.enterPlatform('curriculum');">
                📚 ${isFr ? 'Ouvrir le Module' : 'Open Module'}
              </button>
            </div>
          </div>

          <div class="diag-timeline-item">
            <div class="timeline-num">3</div>
            <div class="timeline-meta">
              <h4>${isFr ? 'Étape 3 : Exécuter la Mission du Premier Jour' : 'Step 3: Execute the First-Day Mission'}</h4>
              <p>${isFr ? 'Gagner vos premiers 100 XP et valider votre première capture de paquet.' : 'Earn your first 100 XP and defend against your first simulated intrusion.'}</p>
              <button class="cyber-btn cyber-btn-small cyber-btn-outline" onclick="window.DiagnosticQuiz.closeModal(); window.app.enterPlatform('curriculum');">
                🎯 ${isFr ? 'Lancer la Mission' : 'Start Mission'}
              </button>
            </div>
          </div>
        </div>

        <div class="diag-footer-actions">
          <button class="cyber-btn cyber-btn-outline" onclick="window.DiagnosticQuiz.restart()">
            ↺ ${isFr ? 'Recommencer le Test' : 'Retake Diagnostic'}
          </button>
          <button class="cyber-btn cyber-btn-primary" onclick="window.DiagnosticQuiz.closeModal()">
            🚀 ${isFr ? 'C\'est parti, j\'attaque !' : 'Let\'s Go, Launch Platform!'}
          </button>
        </div>
      </div>
    `;
  }
}

window.DiagnosticQuiz = new DiagnosticQuizEngine();
