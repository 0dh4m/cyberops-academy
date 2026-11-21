/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <0dh4mm@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - WebSec & SQL Injection Sandbox
 * Interactive authentication bypass simulation & prepared statements sanitizer
 */
const SqlInjectionLab = {
  init() {
    const vulnForm = document.getElementById("sqli-test-form");
    const modeToggle = document.getElementById("sqli-mode-toggle");

    if (vulnForm) {
      vulnForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.run();
      });
    }

    if (modeToggle) {
      modeToggle.addEventListener("change", () => {
        this.run();
      });
    }
  },

  run() {
    const username = document.getElementById("sqli-user-input")?.value || "";
    const password = document.getElementById("sqli-pass-input")?.value || "";
    const isSecured = document.getElementById("sqli-mode-toggle")?.checked || false;

    const queryDisplay = document.getElementById("sqli-query-display");
    const resultAlert = document.getElementById("sqli-result-alert");

    // Simulated database records
    const mockDb = [
      { id: 1, username: "admin", role: "Global Administrator", email: "ciso@enterprise.org" },
      { id: 2, username: "adam", role: "SOC Analyst", email: "adam@secops.local" }
    ];

    if (!isSecured) {
      // VULNERABLE LOGIC: String Concatenation
      if (queryDisplay) {
        queryDisplay.innerHTML = `<span class="sql-kw">SELECT</span> * <span class="sql-kw">FROM</span> users <span class="sql-kw">WHERE</span> username = '<span class="sql-injected">${this.escapeHtml(username)}</span>' <span class="sql-kw">AND</span> password = '<span class="sql-injected">${this.escapeHtml(password)}</span>';`;
      }

      // Check for SQL injection bypass patterns
      const isSqlInjectionBypass = 
        username.includes("' OR '1'='1") ||
        username.includes("' OR 1=1") ||
        username.includes("' or '1'='1") ||
        username.includes("' or 1=1") ||
        username.includes("admin' --") ||
        username.includes("admin'#") ||
        username.includes("'--");

      if (isSqlInjectionBypass) {
        if (resultAlert) {
          resultAlert.className = "sqli-alert sqli-breach";
          resultAlert.innerHTML = `
            <div class="alert-icon">🚨</div>
            <div class="alert-content">
              <h4>AUTHENTICATION BYPASS SUCCESSFUL (BREACH CONFIRMED)</h4>
              <p>Critical <strong>SQL Injection (OWASP Top 10 - A03:2021)</strong> exploited. The SQL query syntax was manipulated via injected boolean logic (<code>1=1</code> is TRUE), authenticating the attacker as <strong>Administrator</strong> without knowing the secret password!</p>
              <div class="leaked-user-card">
                <div>👤 Compromised Identity: <strong>${mockDb[0].username}</strong></div>
                <div>🎖️ Assigned Role: <strong>${mockDb[0].role}</strong></div>
                <div>📧 Leaked Corporate Email: <code>${mockDb[0].email}</code></div>
              </div>
            </div>
          `;
        }
        if (window.CyberAudio) window.CyberAudio.playError();
      } else {
        if (resultAlert) {
          resultAlert.className = "sqli-alert sqli-fail";
          resultAlert.innerHTML = `
            <div class="alert-icon">❌</div>
            <div class="alert-content">
              <h4>Authentication Failed</h4>
              <p>Invalid credentials provided. Try an injection payload such as <code>' OR 1=1 --</code> or <code>admin' --</code> in the Username field.</p>
            </div>
          `;
        }
      }
    } else {
      // SECURED LOGIC: Prepared Statements (Parameterized Queries)
      if (queryDisplay) {
        queryDisplay.innerHTML = `
          <div class="param-header">// Prepared Statement (Secure Mode: Code & Data Strictly Segregated)</div>
          <span class="sql-kw">PREPARE</span> stmt <span class="sql-kw">FROM</span> "SELECT * FROM users WHERE username = ? AND password = ?";<br>
          <span class="sql-kw">EXECUTE</span> stmt <span class="sql-kw">USING</span> ('<span class="sql-safe">${this.escapeHtml(username)}</span>', '<span class="sql-safe">${this.escapeHtml(password)}</span>');
        `;
      }

      if (resultAlert) {
        resultAlert.className = "sqli-alert sqli-blocked";
        resultAlert.innerHTML = `
          <div class="alert-icon">🛡️</div>
          <div class="alert-content">
            <h4>ATTACK MITIGATED & NEUTRALIZED</h4>
            <p>Using <strong>Parameterized Queries (Prepared Statements)</strong>, user inputs are treated strictly as <strong>literal string values</strong>, preventing them from altering the SQL syntax.</p>
          </div>
        `;
      }
      if (window.CyberAudio) window.CyberAudio.playSuccess();
    }
  },

  escapeHtml(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
};

window.SqlInjectionLab = SqlInjectionLab;
