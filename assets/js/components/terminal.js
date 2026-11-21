/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <adamcherkaoui99@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

// =========================================================================
// Interactive Cyber Terminal & Web Audio Synthesizer (English & French)
// =========================================================================

class TerminalAudioFallback {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playTone(freq, type = "sine", duration = 0.08, gainVal = 0.03) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  click() {
    this.playTone(800, "square", 0.03, 0.02);
  }

  success() {
    this.playTone(587.33, "sine", 0.08, 0.04);
    setTimeout(() => this.playTone(880, "sine", 0.12, 0.04), 80);
  }

  alert() {
    this.playTone(300, "sawtooth", 0.15, 0.04);
  }
}

class CyberTerminal {
  constructor(containerId, inputId, appInstance) {
    this.container = document.getElementById(containerId);
    this.input = document.getElementById(inputId);
    this.app = appInstance;
    this.history = [];
    this.historyIndex = -1;
    this.audio = (typeof window !== "undefined" && window.CyberAudio && typeof window.CyberAudio.playKeypress === "function") 
      ? window.CyberAudio 
      : new TerminalAudioFallback();

    if (this.input) {
      this.initEvents();
    }
  }

  initEvents() {
    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = this.input.value.trim();
        if (val) {
          this.history.push(val);
          this.historyIndex = this.history.length;
          this.execute(val);
          this.input.value = "";
        }
      } else if (e.key === "ArrowUp") {
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex];
        }
      } else if (e.key === "ArrowDown") {
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = "";
        }
      }
    });
  }

  print(text, type = "normal") {
    if (!this.container) return;
    const line = document.createElement("div");
    line.className = `term-line term-${type}`;
    line.innerHTML = text;
    this.container.appendChild(line);
    this.container.scrollTop = this.container.scrollHeight;
  }

  async execute(cmdStr) {
    this.audio.click();
    this.print(`<span class="term-prompt">aegis@secops:~$</span> ${this.escapeHtml(cmdStr)}`, "cmd");
    const parts = cmdStr.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case "help":
        this.print(`
<div class="term-help-grid">
  <div><span class="cmd-highlight">help</span> : Display available terminal commands</div>
  <div><span class="cmd-highlight">modules</span> : List all curriculum modules with completion status</div>
  <div><span class="cmd-highlight">show &lt;id&gt;</span> : Open module deep modal (e.g. show python-cyber)</div>
  <div><span class="cmd-highlight">status</span> : Display candidate XP, rank, level, and progress report</div>
  <div><span class="cmd-highlight">motivate</span> : Display an inspiring cybersecurity mindset quote</div>
  <div><span class="cmd-highlight">scan &lt;ip&gt;</span> : Simulate an aggressive Nmap SYN port scan</div>
  <div><span class="cmd-highlight">whoami</span> : Display current session user, privileges, and group ID</div>
  <div><span class="cmd-highlight">ai &lt;query&gt;</span> : Query Aegis AI Cyber Mentor directly from CLI</div>
  <div><span class="cmd-highlight">ctf</span> : Switch view to CTF Challenges Arena</div>
  <div><span class="cmd-highlight">mitre</span> : Switch view to MITRE ATT&CK Matrix Navigator</div>
  <div><span class="cmd-highlight">wargame</span> : Switch view to Live SOC Crisis Wargame</div>
  <div><span class="cmd-highlight">mode</span> : Toggle between Progressive Learning and Free Access modes</div>
  <div><span class="cmd-highlight">clear</span> : Clear terminal console output</div>
</div>
        `);
        break;

      case "modules":
        if (window.CURRICULUM_DATA) {
          let listHtml = "<strong>📋 European Bachelor Curriculum Modules (MIAGE / FEDE):</strong><br>";
          window.CURRICULUM_DATA.forEach(m => {
            const isDone = this.app.isModuleCompleted(m.id) ? "✅ Completed" : "⏳ In Progress";
            listHtml += `[${m.num}] <strong>${m.id}</strong> - ${m.titleFr} (${isDone})<br>`;
          });
          this.print(listHtml);
        }
        break;

      case "show":
        if (!args[0]) {
          this.print("❌ Please specify a valid module ID. Example: <code>show sql-db</code> or <code>show os-hardening</code>", "error");
        } else {
          const mod = window.getModuleById(args[0]);
          if (mod) {
            this.print(`🚀 Loading module dossier: <strong>${mod.titleFr}</strong>...`, "success");
            this.app.openModuleModal(mod.id);
          } else {
            this.print(`❌ Module not found: "${args[0]}". Type <code>modules</code> to list available IDs.`, "error");
          }
        }
        break;

      case "status":
        const stats = this.app.getStats();
        this.print(`
<strong>🛡️ Candidate Security Posture Report:</strong><br>
- Rank Status : <span class="badge-rank">${stats.rankTitle}</span> (Level ${stats.level})<br>
- Completed Modules : <strong>${stats.completedCount} / ${stats.totalModules}</strong> (${stats.percent}%)<br>
- Total Experience Points : <strong>${stats.xp} XP</strong><br>
- Active Study Streak : 🔥 <strong>${stats.streak} Days</strong>
        `, "success");
        break;

      case "motivate":
        const quotes = [
          "« Cybersecurity is not a product, but a continuous process of discipline. — Bruce Schneier »",
          "« The quieter you become, the more you are able to hear. — Kali Linux Creed »",
          "« Never be afraid of breaking things in virtual labs; true security experts are forged through rebuilding broken architectures! »",
          "« Defense in Depth: Layer by layer, every hardened parameter shrinks the attacker's probability of success. »",
          "« If you spend more on coffee than on IT security, you will be hacked. — Richard Clarke »"
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        this.print(`💡 <span style="color:#00ff9d">${randomQuote}</span>`);
        break;

      case "scan":
        const target = args[0] || "192.168.1.1";
        this.print(`[+] Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toLocaleTimeString()}...`);
        this.print(`[+] Initiating SYN Stealth Scan against target ${target}...`);
        setTimeout(() => {
          this.print(`[+] Scanning target ${target} [1000 ports]...`);
          setTimeout(() => {
            this.print(`
PORT     STATE SERVICE       VERSION<br>
22/tcp   open  ssh           OpenSSH 8.9p1 Ubuntu (Hardened Ed25519)<br>
80/tcp   open  http          nginx/1.24.0 (Cloudflare Protected)<br>
443/tcp  open  https         nginx/1.24.0 (TLS 1.3 Strict AEAD)<br>
3306/tcp closed mysql<br>
8883/tcp open  mqtt-tls      Mosquitto Broker (mTLS Enforced)<br>
<span style="color:#00ff9d">[+] Nmap scan report completed: 1 IP address (1 host up) scanned in 2.14 seconds.</span>
            `, "normal");
            this.audio.success();
          }, 600);
        }, 400);
        break;

      case "whoami":
        const currentStats = this.app.getStats();
        this.print(`
User: <strong>Candidate_MIAGE_2026</strong><br>
Academic Program: European Bachelor in Cybersecurity & Networks (FEDE)<br>
Assigned Rank: <span style="color:#00f0ff">${currentStats.rankTitle}</span><br>
Privileges: <code>uid=0(root) gid=0(root) groups=0(root),27(sudo),1000(secops)</code>
        `);
        break;

      case "tools":
        this.print(`
<strong>🛠️ Production Toolset of the MIAGE / FEDE Curriculum:</strong><br>
- <strong>Virtualization & OS:</strong> Linux Debian/Ubuntu, Windows Server 2022, VirtualBox, VMware, Docker.<br>
- <strong>Network & Monitoring:</strong> Cisco Packet Tracer, Wireshark, Nmap, pfSense, Snort, Suricata.<br>
- <strong>Identity & WebSec:</strong> Active Directory, Keycloak, Burp Suite, OWASP ZAP, Postman.<br>
- <strong>SOC & Forensics:</strong> Wazuh SIEM, Splunk, Volatility 3, Autopsy, Sysmon.<br>
- <strong>Scripting & Automation:</strong> Python 3, Scapy, Bash, PowerShell, PostgreSQL.
        `);
        break;
      case "ctf":
        if (this.app) {
          this.app.switchView("ctf");
          const tabCtf = document.querySelector('[data-portal-view="ctf"]');
          if (tabCtf) {
            document.querySelectorAll(".portal-nav-tab").forEach(b => b.classList.remove("active"));
            tabCtf.classList.add("active");
          }
          this.print("🚩 Switched to CTF Challenges Arena.", "success");
        }
        break;

      case "mitre":
        if (this.app) {
          this.app.switchView("mitre");
          const tabMitre = document.querySelector('[data-portal-view="mitre"]');
          if (tabMitre) {
            document.querySelectorAll(".portal-nav-tab").forEach(b => b.classList.remove("active"));
            tabMitre.classList.add("active");
          }
          this.print("🦅 Switched to MITRE ATT&CK Matrix Navigator.", "success");
        }
        break;

      case "wargame":
        if (this.app) {
          this.app.switchView("wargame");
          const tabWargame = document.querySelector('[data-portal-view="wargame"]');
          if (tabWargame) {
            document.querySelectorAll(".portal-nav-tab").forEach(b => b.classList.remove("active"));
            tabWargame.classList.add("active");
          }
          this.print("🚨 Switched to Live SOC Incident Response Crisis Wargame.", "success");
        }
        break;

      case "mode":
      case "unlock":
        if (this.app) {
          this.app.toggleProgressionMode();
          const isFree = window.CyberState.isFreeAccessMode();
          this.print(isFree ? "🔓 <strong>Free Access Mode Active:</strong> All modules, labs, and crisis wargames unlocked." : "🎮 <strong>Progressive Mode Active:</strong> Content unlocks step-by-step as you complete tasks.", "success");
        }
        break;

      case "ai":
        const query = args.join(" ");
        if (!query) {
          this.print("❌ Please specify your prompt after the <code>ai</code> command. Example: <code>ai How does the Kerberos TGT exchange work?</code>", "error");
        } else {
          this.print("🤖 Querying Aegis AI Mentor...", "warning");
          try {
            const aiReply = await window.cyberAIService.sendMessage(query);
            this.print(`<strong>[Aegis AI]:</strong><br>${this.formatAiResponse(aiReply)}`, "success");
            this.audio.success();
          } catch (err) {
            this.print(`❌ AI Error: ${err.message}`, "error");
            this.audio.alert();
          }
        }
        break;

      case "clear":
        this.container.innerHTML = "";
        break;

      default:
        this.print(`❌ Unknown command: "<code>${this.escapeHtml(cmd)}</code>". Type <code>help</code> to list commands.`, "error");
        this.audio.alert();
        break;
    }
  }

  escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  formatAiResponse(text) {
    return text.replace(/\n/g, "<br>").replace(/```([a-z]*)([\s\S]*?)```/g, '<pre class="term-code"><code>$2</code></pre>');
  }
}

if (typeof window !== "undefined") {
  window.CyberTerminal = CyberTerminal;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { CyberTerminal };
}
