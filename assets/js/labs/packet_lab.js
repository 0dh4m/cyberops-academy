/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <0dh4mm@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - TCP Handshake & Port Scanner Simulator
 * Interactive transport layer packet exchange and Nmap reconnaissance visualizer
 */
const PacketLab = {
  scenarios: {
    "handshake-open": {
      title: "TCP 3-Way Handshake (Port 443 - Open / Établi)",
      desc: "Standard full connection sequence establishing an authenticated socket with an open HTTPS port.",
      steps: [
        { from: "client", to: "server", flags: "SYN", seq: 1000, ack: 0, text: "CLIENT ➔ SERVER: [SYN] seq=1000. 'Requesting synchronization to port 443.'" },
        { from: "server", to: "client", flags: "SYN-ACK", seq: 5000, ack: 1001, text: "SERVER ➔ CLIENT: [SYN, ACK] seq=5000, ack=1001. 'Port 443 is OPEN. Synchronizing and acknowledging.'" },
        { from: "client", to: "server", flags: "ACK", seq: 1001, ack: 5001, text: "CLIENT ➔ SERVER: [ACK] seq=1001, ack=5001. 'Connection ESTABLISHED! Ready for TLS ClientHello data.'" }
      ]
    },
    "handshake-closed": {
      title: "TCP Connection to Closed Port (Port 23 Telnet - Closed / Fermé)",
      desc: "Attempting to connect to an inactive port results in an immediate TCP RST response.",
      steps: [
        { from: "client", to: "server", flags: "SYN", seq: 2000, ack: 0, text: "CLIENT ➔ SERVER: [SYN] seq=2000 to Port 23." },
        { from: "server", to: "client", flags: "RST-ACK", seq: 0, ack: 2001, text: "SERVER ➔ CLIENT: [RST, ACK] ack=2001. 'Port 23 is CLOSED. Connection hard-reset by operating system kernel.'" }
      ]
    },
    "syn-stealth": {
      title: "Nmap SYN Stealth Scan (nmap -sS - Half-Open)",
      desc: "The attacker never completes the 3-way handshake, avoiding socket creation in standard application logs.",
      steps: [
        { from: "client", to: "server", flags: "SYN", seq: 3000, ack: 0, text: "ATTACKER ➔ TARGET: [SYN] probe to Port 80 (HTTP)." },
        { from: "server", to: "client", flags: "SYN-ACK", seq: 8000, ack: 3001, text: "TARGET ➔ ATTACKER: [SYN, ACK] seq=8000, ack=3001. 'Port is listening.'" },
        { from: "client", to: "server", flags: "RST", seq: 3001, ack: 0, text: "ATTACKER ➔ TARGET: [RST] seq=3001. 'Connection abruptly terminated. Port marked OPEN without completing handshake.'" }
      ]
    },
    "teardown": {
      title: "TCP 4-Way Teardown (Connection Termination)",
      desc: "Graceful four-step connection close sequence using TCP FIN and ACK control flags.",
      steps: [
        { from: "client", to: "server", flags: "FIN-ACK", seq: 1500, ack: 6000, text: "CLIENT ➔ SERVER: [FIN, ACK] seq=1500. 'Client has finished transmitting data.'" },
        { from: "server", to: "client", flags: "ACK", seq: 6000, ack: 1501, text: "SERVER ➔ CLIENT: [ACK] seq=6000, ack=1501. 'Server acknowledges client termination.'" },
        { from: "server", to: "client", flags: "FIN-ACK", seq: 6001, ack: 1501, text: "SERVER ➔ CLIENT: [FIN, ACK] seq=6001. 'Server has finished transmitting data.'" },
        { from: "client", to: "server", flags: "ACK", seq: 1501, ack: 6002, text: "CLIENT ➔ SERVER: [ACK] seq=1501, ack=6002. 'Connection completely CLOSED.'" }
      ]
    }
  },

  currentScenario: "handshake-open",
  currentStepIndex: 0,
  autoPlayTimer: null,

  init() {
    const select = document.getElementById("packet-scenario-select");
    const nextBtn = document.getElementById("btn-packet-next");
    const autoBtn = document.getElementById("btn-packet-auto");
    const resetBtn = document.getElementById("btn-packet-reset");

    if (select) {
      select.addEventListener("change", (e) => {
        this.currentScenario = e.target.value;
        this.reset();
      });
    }

    if (nextBtn) nextBtn.addEventListener("click", () => this.stepForward());
    if (autoBtn) autoBtn.addEventListener("click", () => this.toggleAutoPlay());
    if (resetBtn) resetBtn.addEventListener("click", () => this.reset());

    this.render();
  },

  reset() {
    clearInterval(this.autoPlayTimer);
    this.autoPlayTimer = null;
    this.currentStepIndex = 0;
    const autoBtn = document.getElementById("btn-packet-auto");
    if (autoBtn) autoBtn.innerText = "▶ Auto Play";
    this.render();
  },

  toggleAutoPlay() {
    const autoBtn = document.getElementById("btn-packet-auto");
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
      if (autoBtn) autoBtn.innerText = "▶ Auto Play";
    } else {
      if (autoBtn) autoBtn.innerText = "⏸ Pause";
      this.autoPlayTimer = setInterval(() => {
        const scenario = this.scenarios[this.currentScenario];
        if (this.currentStepIndex < scenario.steps.length) {
          this.stepForward();
        } else {
          this.reset();
        }
      }, 1500);
    }
  },

  stepForward() {
    const scenario = this.scenarios[this.currentScenario];
    if (this.currentStepIndex < scenario.steps.length) {
      this.currentStepIndex++;
      this.render();
      if (window.CyberAudio) window.CyberAudio.playKeypress();
      if (this.currentStepIndex === scenario.steps.length) {
        if (window.CyberAudio) window.CyberAudio.playSuccess();
        if (window.CyberState) window.CyberState.addXP(20, "Completed packet exchange analysis");
      }
    }
  },

  render() {
    const scenario = this.scenarios[this.currentScenario];
    const descEl = document.getElementById("packet-scenario-desc");
    const timelineEl = document.getElementById("packet-timeline-container");
    const statusEl = document.getElementById("packet-exchange-status");

    if (descEl) descEl.innerText = scenario.desc;

    if (timelineEl) {
      let html = "";
      scenario.steps.forEach((step, idx) => {
        const isExecuted = idx < this.currentStepIndex;
        const isCurrent = idx === this.currentStepIndex - 1;
        const dirClass = step.from === "client" ? "dir-client-to-server" : "dir-server-to-client";
        const flagColorClass = step.flags.includes("RST") ? "flag-rst" : step.flags.includes("SYN") ? "flag-syn" : "flag-ack";

        html += `
          <div class="packet-step-row ${isExecuted ? 'executed' : 'pending'} ${isCurrent ? 'current' : ''}">
            <div class="packet-step-num">Step ${idx + 1}</div>
            <div class="packet-node client-node ${step.from === 'client' ? 'active-sender' : ''}">
              <span class="node-icon">💻</span>
              <span class="node-ip">192.168.1.50</span>
            </div>
            <div class="packet-lane ${dirClass}">
              <div class="packet-arrow-line"></div>
              <div class="packet-badge ${flagColorClass}">
                <span class="badge-flags">[${step.flags}]</span>
                <span class="badge-seq">seq=${step.seq} ack=${step.ack}</span>
              </div>
            </div>
            <div class="packet-node server-node ${step.from === 'server' ? 'active-sender' : ''}">
              <span class="node-icon">🏢</span>
              <span class="node-ip">10.0.0.1</span>
            </div>
          </div>
          <div class="packet-step-log ${isExecuted ? 'executed' : 'pending'}">
            <code>${step.text}</code>
          </div>
        `;
      });
      timelineEl.innerHTML = html;
    }

    if (statusEl) {
      const isDone = this.currentStepIndex >= scenario.steps.length;
      statusEl.innerHTML = `
        <span>Progress: ${this.currentStepIndex} / ${scenario.steps.length} packets exchanged.</span>
        <span class="${isDone ? 'badge-safe' : 'badge-warning'}">${isDone ? '✓ Sequence Finished' : 'In Progress...'}</span>
      `;
    }
  }
};

window.PacketLab = PacketLab;
