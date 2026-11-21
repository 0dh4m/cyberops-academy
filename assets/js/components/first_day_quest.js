/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <0dh4mm@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - First-Day Mission Quest Engine
 * 4-step quick-start onboarding quest designed to give beginners instant
 * hands-on confidence, +100 XP, and their first cyber defense badge in under 5 minutes.
 */
class FirstDayQuestEngine {
  constructor() {
    this.tasks = [
      {
        id: "task-identity",
        icon: "💻",
        en: {
          title: "Step 1: Check Operator Identity in Terminal",
          desc: "Open your Aegis terminal shell and execute the classic Unix command 'whoami' to inspect your security privilege level.",
          actionBtn: "💻 Open Terminal & Run",
          successMsg: "Operator identity verified as student cadet."
        },
        fr: {
          title: "Étape 1 : Vérifier l'Identité dans le Terminal",
          desc: "Ouvrez votre terminal Aegis et exécutez la commande Unix fondamentale 'whoami' pour inspecter vos privilèges.",
          actionBtn: "💻 Ouvrir Terminal & Exécuter",
          successMsg: "Identité de l'opérateur vérifiée en tant que cadet."
        }
      },
      {
        id: "task-decode",
        icon: "🔐",
        en: {
          title: "Step 2: Decode an Intercepted Base64 Transmission",
          desc: "A suspicious packet contains payload 'U2VjT3BzMjAyNg=='. Decode it into plaintext using the quick-decoder.",
          actionBtn: "🔓 Launch Quick-Decoder",
          successMsg: "Payload deciphered: 'SecOps2026'!"
        },
        fr: {
          title: "Étape 2 : Décoder une Transmission Base64 Interceptée",
          desc: "Un paquet suspect contient 'U2VjT3BzMjAyNg=='. Décodez-le en texte clair grâce au décodeur intégré.",
          actionBtn: "🔓 Lancer le Décodeur",
          successMsg: "Message déchiffré : 'SecOps2026' !"
        }
      },
      {
        id: "task-subnet",
        icon: "🌐",
        en: {
          title: "Step 3: Validate a /24 Subnet Capacity",
          desc: "A standard Class C subnet mask is 255.255.255.0 (/24). Confirm how many usable host IP addresses it supports (254).",
          actionBtn: "🧪 Test in Subnet Lab",
          successMsg: "Subnet capacity confirmed: 254 usable host addresses."
        },
        fr: {
          title: "Étape 3 : Valider la Capacité d'un Réseau /24",
          desc: "Un masque de classe C standard est 255.255.255.0 (/24). Confirmez le nombre d'hôtes utilisables (254).",
          actionBtn: "🧪 Tester dans le Lab Réseau",
          successMsg: "Capacité réseau confirmée : 254 adresses hôtes disponibles."
        }
      },
      {
        id: "task-siem",
        icon: "🚨",
        en: {
          title: "Step 4: Flag Suspicious External C2 IP in SIEM",
          desc: "A honeypot detected inbound brute force from external IP '198.51.100.23'. Quarantine this threat actor.",
          actionBtn: "🛡️ Quarantine Host",
          successMsg: "Threat quarantined! Malicious IP successfully blocked at the perimeter."
        },
        fr: {
          title: "Étape 4 : Isoler une IP Malveillante dans le SIEM",
          desc: "Le SIEM a détecté une tentative d'intrusion depuis l'IP '198.51.100.23'. Isolez cette menace au niveau du pare-feu.",
          actionBtn: "🛡️ Isoler la Menace",
          successMsg: "Menace neutralisée ! L'adresse IP hostile a été bloquée au périmètre."
        }
      }
    ];
  }

  getLang() {
    return window.CyberI18n ? window.CyberI18n.currentLang : "en";
  }

  getCompletedTasks() {
    try {
      const stored = localStorage.getItem("cyberops_quest_completed_tasks");
      if (stored) return JSON.parse(stored);
    } catch {}
    return [];
  }

  isTaskDone(taskId) {
    return this.getCompletedTasks().includes(taskId);
  }

  completeTask(taskId) {
    const list = this.getCompletedTasks();
    if (!list.includes(taskId)) {
      list.push(taskId);
      localStorage.setItem("cyberops_quest_completed_tasks", JSON.stringify(list));
      if (window.CyberState) window.CyberState.addXP(25, `Completed Quest Step: ${taskId}`);
      if (window.CyberAudio) window.CyberAudio.playKeypress();
      
      const isFr = this.getLang() === "fr";
      const task = this.tasks.find(t => t.id === taskId);
      const msg = task ? (isFr ? task.fr.successMsg : task.en.successMsg) : (isFr ? "Étape validée (+25 XP)" : "Step completed (+25 XP)");
      if (window.CyberUtils) window.CyberUtils.showToast(msg, "success");

      // Check if all 4 are done
      if (list.length >= this.tasks.length) {
        this.triggerQuestCompletion();
      }
    }
    this.render();
  }

  triggerQuestCompletion() {
    if (window.CyberAudio) window.CyberAudio.playLevelUp();
    if (window.CyberState) {
      window.CyberState.unlockBadge("badge-first-mission", 100);
    }
    const isFr = this.getLang() === "fr";
    if (window.CyberUtils) {
      window.CyberUtils.showToast(
        isFr 
          ? "🏆 MISSION DU PREMIER JOUR ACCOMPLIE ! +100 XP et Badge 'First Breach Defended' débloqué !" 
          : "🏆 FIRST-DAY MISSION ACCOMPLISHED! +100 XP & 'First Breach Defended' Badge unlocked!",
        "success",
        7000
      );
    }
  }

  executeTaskAction(taskId) {
    if (taskId === "task-identity") {
      if (window.app && typeof window.app.toggleTerminal === "function") {
        window.app.toggleTerminal();
        if (window.app.terminal) {
          setTimeout(() => {
            window.app.terminal.execute("whoami");
            this.completeTask("task-identity");
          }, 400);
        }
      } else {
        this.completeTask("task-identity");
      }
    } else if (taskId === "task-decode") {
      this.completeTask("task-decode");
    } else if (taskId === "task-subnet") {
      this.completeTask("task-subnet");
    } else if (taskId === "task-siem") {
      this.completeTask("task-siem");
    }
  }

  render() {
    const container = document.getElementById("first-day-quest-container");
    if (!container) return;

    const isFr = this.getLang() === "fr";
    const doneTasks = this.getCompletedTasks();
    const progressPercent = Math.round((doneTasks.length / this.tasks.length) * 100);
    const isAllDone = doneTasks.length >= this.tasks.length;

    container.innerHTML = `
      <div class="quest-card ${isAllDone ? 'quest-all-completed' : ''}">
        <div class="quest-top-banner">
          <div class="quest-title-box">
            <span class="quest-tag">🎯 ${isFr ? 'DÉMARRAGE EXPRESS DÉBUTANT' : 'BEGINNER QUICK-START'}</span>
            <h3 class="quest-headline">
              ${isFr ? 'Mission 01 : Votre Premier Jour au SOC' : 'Mission 01: Your First Day in the SOC'}
            </h3>
            <p class="quest-subline">
              ${isFr 
                ? '4 actions simples en 5 minutes pour acquérir vos premiers réflexes d\'analyste et débloquer +100 XP.' 
                : '4 simple actions in 5 minutes to build your first analyst instincts and unlock +100 XP.'}
            </p>
          </div>

          <div class="quest-progress-gauge">
            <div class="gauge-number">${progressPercent}%</div>
            <div class="gauge-label">${doneTasks.length}/${this.tasks.length} ${isFr ? 'Complété' : 'Completed'}</div>
          </div>
        </div>

        <div class="quest-track-bar">
          <div class="quest-fill-bar" style="width: ${progressPercent}%;"></div>
        </div>

        <div class="quest-steps-grid">
          ${this.tasks.map((task, idx) => {
            const isDone = doneTasks.includes(task.id);
            const content = isFr ? task.fr : task.en;

            return `
              <div class="quest-step-item ${isDone ? 'completed' : ''}">
                <div class="step-badge-indicator">
                  ${isDone ? '✓' : idx + 1}
                </div>
                <div class="step-meta">
                  <div class="step-item-title">${content.title}</div>
                  <div class="step-item-desc">${content.desc}</div>
                </div>
                <div class="step-action-col">
                  ${isDone ? `
                    <span class="step-done-pill">✓ ${isFr ? 'Validé' : 'Completed'}</span>
                  ` : `
                    <button class="cyber-btn cyber-btn-small cyber-btn-primary" onclick="window.FirstDayQuest.executeTaskAction('${task.id}')">
                      ${content.actionBtn}
                    </button>
                  `}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        ${isAllDone ? `
          <div class="quest-celebrate-box">
            <span class="celebrate-badge">🎉 ${isFr ? 'Félicitations ! Mission du Premier Jour Validée (+100 XP)' : 'Congratulations! First-Day Mission Validated (+100 XP)'}</span>
            <span class="celebrate-badge badge-green">🏆 Badge: First Breach Defended</span>
          </div>
        ` : ''}
      </div>
    `;
  }
}

window.FirstDayQuest = new FirstDayQuestEngine();
