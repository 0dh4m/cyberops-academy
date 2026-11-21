/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <adamcherkaoui99@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - Playgrounds Hub Coordinator
 * Coordinates navigation and lifecycle for all 6 interactive cyber labs:
 * 1. Cryptography Lab (AES-256-GCM, SHA-256, Caesar)
 * 2. Visual CIDR & Subnet Calculator
 * 3. WebSec & SQL Injection Sandbox
 * 4. AI & Heuristic Code/Log Vulnerability Scanner
 * 5. TCP 3-Way Handshake & Port Scanner
 * 6. Password Entropy & Hash Cracker
 */
class PlaygroundsHub {
  constructor() {
    this.currentLab = "crypto";
  }

  init() {
    this.setupNavigation();

    // Initialize all modular labs
    if (window.CryptoLab) window.CryptoLab.init();
    if (window.SubnetLab) window.SubnetLab.init();
    if (window.SqlInjectionLab) window.SqlInjectionLab.init();
    if (window.ScannerLab) window.ScannerLab.init();
    if (window.PacketLab) window.PacketLab.init();
    if (window.PasswordLab) window.PasswordLab.init();
  }

  setupNavigation() {
    const navButtons = document.querySelectorAll(".playground-nav-btn");
    navButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        navButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.switchLab(btn.dataset.playground);
      });
    });
  }

  switchLab(name) {
    this.currentLab = name;
    document.querySelectorAll(".playground-view").forEach(view => {
      view.classList.toggle("active", view.dataset.playgroundView === name);
    });
    if (window.CyberAudio) window.CyberAudio.playKeypress();
  }
}

window.CyberPlaygrounds = new PlaygroundsHub();
