/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <adamcherkaoui99@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - Career Roadmaps Engine
 * Manages interactive career pathway selection, stage timeline rendering,
 * and progress calculation for the 4 core cyber roles.
 */
class CareerRoadmapsEngine {
  constructor() {
    this.activePathId = "soc_analyst";
  }

  init() {
    if (window.CyberState) {
      this.activePathId = window.CyberState.getActiveCareerPath() || "soc_analyst";
      window.CyberState.on("careerPathChanged", (id) => {
        this.activePathId = id;
        this.render();
      });
      window.CyberState.on("moduleCompletedChanged", () => this.render());
      window.CyberState.on("tutorialCompletedChanged", () => this.render());
    }

    this.render();
    console.log("🧭 Career Roadmaps Engine Initialized.");
  }

  getLang() {
    return window.CyberI18n ? window.CyberI18n.getLanguage() : "en";
  }

  selectCareerPath(pathId) {
    if (window.CyberState) {
      window.CyberState.setActiveCareerPath(pathId);
    } else {
      this.activePathId = pathId;
      this.render();
    }

    if (window.CyberAudio) window.CyberAudio.playKeypress();
    if (window.CyberUtils) {
      const isFr = this.getLang() === "fr";
      window.CyberUtils.showToast(isFr ? "🎯 Objectif de carrière sélectionné !" : "🎯 Career pathway selected as primary goal!", "success");
    }
  }

  calculatePathProgress(path) {
    if (!path || !path.en || !path.en.stages) return 0;
    let totalItems = 0;
    let completedItems = 0;

    const completedMods = window.CyberState ? window.CyberState.getCompletedModules() : [];
    const completedTuts = window.CyberState ? window.CyberState.getCompletedTutorials() : [];

    path.en.stages.forEach(stage => {
      (stage.modules || []).forEach(m => {
        totalItems++;
        if (completedMods.includes(m)) completedItems++;
      });
      (stage.tutorials || []).forEach(t => {
        totalItems++;
        if (completedTuts.includes(t)) completedItems++;
      });
    });

    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  }

  render() {
    const list = window.CareerRoadmapsData || [];
    const container = document.getElementById("career-roadmaps-container");
    if (!container) return;

    const isFr = this.getLang() === "fr";
    const currentPath = list.find(p => p.id === this.activePathId) || list[0];
    const pathContent = isFr ? currentPath.fr : currentPath.en;
    const progressPct = this.calculatePathProgress(currentPath);

    container.innerHTML = `
      <div class="career-hub-wrapper">
        <!-- Top Career Path Tabs -->
        <div class="career-tabs-row">
          ${list.map(p => {
            const isActive = p.id === this.activePathId;
            const content = isFr ? p.fr : p.en;
            return `
              <button class="career-tab-card ${isActive ? 'active' : ''}" onclick="window.CareerRoadmaps.selectCareerPath('${p.id}')">
                <div class="career-tab-icon">${p.icon}</div>
                <div class="career-tab-info">
                  <div class="career-tab-badge" style="color: ${p.color};">${p.badge}</div>
                  <div class="career-tab-title">${content.title}</div>
                </div>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Selected Career Pathway Overview Card -->
        <div class="career-hero-card" style="--career-accent: ${currentPath.color};">
          <div class="career-hero-header">
            <div>
              <div class="career-pill-badge">${currentPath.badge}</div>
              <h2 class="career-hero-title">${currentPath.icon} ${pathContent.title}</h2>
              <p class="career-hero-tagline">${pathContent.tagline}</p>
            </div>

            <div class="career-salary-box">
              <span class="salary-label">${isFr ? "Fourchette Salariale Marché" : "Target Industry Salary"}</span>
              <span class="salary-value">${pathContent.salary}</span>
            </div>
          </div>

          <p class="career-hero-overview">${pathContent.overview}</p>

          <!-- Roles & Certifications Grid -->
          <div class="career-meta-grid">
            <div class="career-meta-col">
              <span class="meta-col-title">🎯 ${isFr ? "Postes et Titres Cibles :" : "Target Industry Roles:"}</span>
              <div class="career-tags-wrap">
                ${pathContent.targetRoles.map(r => `<span class="career-tag-pill">${r}</span>`).join('')}
              </div>
            </div>

            <div class="career-meta-col">
              <span class="meta-col-title">📜 ${isFr ? "Certifications Recommandées :" : "Recommended Certifications:"}</span>
              <div class="career-tags-wrap">
                ${pathContent.certifications.map(c => `<span class="career-cert-pill">${c}</span>`).join('')}
              </div>
            </div>
          </div>

          <!-- Progress along this pathway -->
          <div class="career-progress-section">
            <div class="career-progress-header">
              <span>${isFr ? "Votre Progression vers cette Spécialisation :" : "Your Progression Toward this Pathway:"} <strong>${progressPct}%</strong></span>
              <span>${progressPct === 100 ? (isFr ? "🏆 Spécialisation Validée !" : "🏆 Pathway Fully Mastered!") : (isFr ? "En cours d'apprentissage" : "In Progress")}</span>
            </div>
            <div class="career-progress-track">
              <div class="career-progress-fill" style="width: ${progressPct}%;"></div>
            </div>
          </div>
        </div>

        <!-- 4 Sequential Stages Timeline -->
        <div class="career-timeline-section">
          <h3 class="timeline-heading">🚀 ${isFr ? "Feuille de Route des Compétences (4 Étapes Structurées)" : "Competency Milestone Roadmap (4 Structured Stages)"}</h3>
          
          <div class="career-stages-grid">
            ${pathContent.stages.map((stage, idx) => {
              return `
                <div class="career-stage-card">
                  <div class="stage-number-badge">STAGE 0${stage.stageNumber}</div>
                  <h4 class="stage-title">${stage.name}</h4>
                  <p class="stage-desc">${stage.description}</p>

                  <!-- Linked Items -->
                  <div class="stage-links-box">
                    <span class="stage-links-label">📚 ${isFr ? "Modules Recommandés :" : "Required Academic Modules:"}</span>
                    <div class="stage-btn-row">
                      ${(stage.modules || []).map(mId => {
                        const isDone = window.CyberState ? window.CyberState.isModuleCompleted(mId) : false;
                        return `
                          <button class="stage-module-btn ${isDone ? 'completed' : ''}" onclick="window.ModuleViewer.openModal('${mId}')">
                            ${isDone ? '✓' : '📖'} ${mId.toUpperCase()}
                          </button>
                        `;
                      }).join('')}
                    </div>

                    ${stage.labs && stage.labs.length > 0 ? `
                      <span class="stage-links-label" style="margin-top: 10px;">🧪 ${isFr ? "Laboratoires Pratiques :" : "Hands-on Practice Labs:"}</span>
                      <div class="stage-btn-row">
                        ${stage.labs.map(labId => `
                          <button class="stage-lab-btn" onclick="window.app.enterPlatform('labs'); window.CyberPlaygrounds.switchLab('${labId}');">
                            🧪 ${labId.toUpperCase()}
                          </button>
                        `).join('')}
                      </div>
                    ` : ''}

                    ${stage.tutorials && stage.tutorials.length > 0 ? `
                      <span class="stage-links-label" style="margin-top: 10px;">🎥 ${isFr ? "Tutoriels Vidéo Liés :" : "Video Masterclasses:"}</span>
                      <div class="stage-btn-row">
                        ${stage.tutorials.map(tutId => {
                          const isDone = window.CyberState ? window.CyberState.isTutorialCompleted(tutId) : false;
                          return `
                            <button class="stage-tut-btn ${isDone ? 'completed' : ''}" onclick="window.app.enterPlatform('tutorials'); window.TutorialsHub.openTutorial('${tutId}');">
                              ${isDone ? '✓' : '▶'} ${tutId.replace('tut-', '').replace('-', ' ')}
                            </button>
                          `;
                        }).join('')}
                      </div>
                    ` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }
}

window.CareerRoadmaps = new CareerRoadmapsEngine();
