/**
 * CyberOps Academy - AI Code & Log Vulnerability Scanner
 * Static Application Security Testing (SAST) & SOC Log Audit with Aegis AI Remediation
 */
const ScannerLab = {
  samples: {
    python: {
      label: "Python Web API (Insecure)",
      code: `import os\nimport sqlite3\nfrom flask import Flask, request\n\napp = Flask(__name__)\nAWS_SECRET_KEY = "AKIAIOSFODNN7EXAMPLE" # Hardcoded Secret\n\n@app.route("/user")\ndef get_user():\n    user_id = request.args.get("id")\n    # Vulnerable to SQL Injection (OWASP A03)\n    query = f"SELECT * FROM users WHERE id = '{user_id}'"\n    conn = sqlite3.connect("app.db")\n    cursor = conn.cursor()\n    cursor.execute(query)\n    return str(cursor.fetchall())\n\n@app.route("/ping")\ndef ping():\n    host = request.args.get("host")\n    # Vulnerable to Remote Command Injection (OWASP A03)\n    result = os.popen(f"ping -c 1 {host}").read()\n    return result\n`
    },
    dockerfile: {
      label: "Insecure Dockerfile",
      code: `FROM ubuntu:latest\n\n# Vulnerability: Running as root by default\nUSER root\n\nENV API_TOKEN="ghp_92934827492834729384729348"\n\nRUN apt-get update && apt-get install -y curl python3\n\n# Vulnerability: Overly permissive file permissions\nCOPY . /app\nRUN chmod -R 777 /app\n\nEXPOSE 8080\nCMD ["python3", "/app/server.py"]\n`
    },
    authlog: {
      label: "Linux /var/log/auth.log (Brute Force)",
      code: `Oct 26 03:12:01 edge-srv sshd[4912]: Failed password for root from 194.26.29.112 port 54122 ssh2\nOct 26 03:12:03 edge-srv sshd[4914]: Failed password for root from 194.26.29.112 port 54124 ssh2\nOct 26 03:12:05 edge-srv sshd[4918]: Failed password for root from 194.26.29.112 port 54128 ssh2\nOct 26 03:12:08 edge-srv sshd[4922]: Failed password for invalid user admin from 194.26.29.112 port 54130 ssh2\nOct 26 03:12:15 edge-srv sudo:   devops : TTY=pts/1 ; PWD=/home/devops ; USER=root ; COMMAND=/bin/cat /etc/shadow\n`
    }
  },

  init() {
    const sampleSelect = document.getElementById("scanner-sample-select");
    const scanBtn = document.getElementById("btn-run-local-scan");
    const aiScanBtn = document.getElementById("btn-run-ai-scan");

    if (sampleSelect) {
      sampleSelect.addEventListener("change", (e) => {
        const key = e.target.value;
        const inputArea = document.getElementById("scanner-input-code");
        if (this.samples[key] && inputArea) {
          inputArea.value = this.samples[key].code;
          this.runHeuristicScan();
        }
      });
    }

    if (scanBtn) scanBtn.addEventListener("click", () => this.runHeuristicScan());
    if (aiScanBtn) aiScanBtn.addEventListener("click", () => this.runAIScan());

    // Initial load
    const inputArea = document.getElementById("scanner-input-code");
    if (inputArea && !inputArea.value) {
      inputArea.value = this.samples.python.code;
    }
  },

  runHeuristicScan() {
    const inputArea = document.getElementById("scanner-input-code");
    const resultsBox = document.getElementById("scanner-results-container");
    if (!inputArea || !resultsBox) return;

    const text = inputArea.value;
    const findings = [];

    // Pattern heuristics
    if (/AKIA[0-9A-Z]{16}/.test(text) || /API_TOKEN|SECRET_KEY|password\s*=\s*['"][^'"]+['"]/i.test(text)) {
      findings.push({
        severity: "CRITICAL",
        title: "Hardcoded Credential / Secret Exposed",
        owasp: "OWASP A07:2021 - Identification & Authentication Failures",
        cwe: "CWE-798",
        desc: "Hardcoded cryptographic keys or passwords detected directly in source code.",
        remediation: "Store secrets in environment variables or a KMS (HashiCorp Vault, AWS Secrets Manager)."
      });
    }

    if (/os\.system|os\.popen|subprocess\.call|exec\(|eval\(/i.test(text)) {
      findings.push({
        severity: "CRITICAL",
        title: "Remote Command Execution (RCE) / Command Injection",
        owasp: "OWASP A03:2021 - Injection",
        cwe: "CWE-78",
        desc: "Shell command constructed using unsanitized user inputs.",
        remediation: "Avoid invoking shell directly. Use subprocess.run with argument vectors and no shell=True."
      });
    }

    if (/SELECT\s+.*FROM\s+.*WHERE\s+.*['"].*\+/i.test(text) || /f["'].*SELECT.*FROM.*{/i.test(text)) {
      findings.push({
        severity: "HIGH",
        title: "SQL Injection via Dynamic String Formatting",
        owasp: "OWASP A03:2021 - Injection",
        cwe: "CWE-89",
        desc: "SQL queries compiled using string interpolation or string concatenation.",
        remediation: "Enforce Parameterized Queries (Prepared Statements) or an established ORM."
      });
    }

    if (/USER\s+root/i.test(text)) {
      findings.push({
        severity: "HIGH",
        title: "Container Running as Root User",
        owasp: "CIS Docker Benchmark 4.1",
        cwe: "CWE-250",
        desc: "Docker container executes under root privileges, increasing impact of container breakout.",
        remediation: "Create a dedicated non-privileged user (e.g. USER appuser)."
      });
    }

    if (/chmod\s+(-R\s+)?777/i.test(text)) {
      findings.push({
        severity: "MEDIUM",
        title: "Overly Permissive File Permissions (777)",
        owasp: "CWE-732",
        cwe: "CWE-732",
        desc: "World-readable, writable, and executable file permissions allow unauthorized modification.",
        remediation: "Apply principle of least privilege (e.g. chmod 750 or 640)."
      });
    }

    if (/Failed password for/i.test(text)) {
      const failedMatches = text.match(/Failed password for/gi) || [];
      findings.push({
        severity: "HIGH",
        title: `SSH Brute Force Attack Detected (${failedMatches.length} attempts)`,
        owasp: "MITRE ATT&CK T1110.001 - Password Guessing",
        cwe: "CWE-307",
        desc: "Repeated unauthorized authentication failures originating from external source.",
        remediation: "Deploy Fail2ban, disable SSH password authentication, and enforce SSH Key pairs."
      });
    }

    if (/cat\s+\/etc\/shadow/i.test(text)) {
      findings.push({
        severity: "CRITICAL",
        title: "Unauthorized Privilege Escalation / Credential Access",
        owasp: "MITRE ATT&CK T1003.008 - /etc/passwd and /etc/shadow",
        cwe: "CWE-285",
        desc: "Suspicious sudo command attempting to read system password hash repository.",
        remediation: "Audit sudoers configuration (/etc/sudoers) and alert SOC IR team immediately."
      });
    }

    // Render findings
    if (findings.length === 0) {
      resultsBox.innerHTML = `
        <div class="scanner-clean-state">
          <div class="clean-icon">🛡️</div>
          <h3>No High-Severity Heuristic Vulnerabilities Detected</h3>
          <p>Local pattern heuristics passed clean. Click <strong>"Deep Audit with Aegis AI"</strong> for an exhaustive context-aware analysis.</p>
        </div>
      `;
    } else {
      let html = `
        <div class="scanner-findings-header">
          <span class="findings-count">Found ${findings.length} Security Issue(s)</span>
          <span class="findings-badge-crit">${findings.filter(f => f.severity === 'CRITICAL').length} Critical</span>
        </div>
        <div class="findings-list">
      `;

      findings.forEach(f => {
        const sevClass = f.severity === 'CRITICAL' ? 'sev-crit' : f.severity === 'HIGH' ? 'sev-high' : 'sev-med';
        html += `
          <div class="finding-card ${sevClass}">
            <div class="finding-top">
              <span class="finding-tag ${sevClass}">${f.severity}</span>
              <span class="finding-cwe">${f.cwe}</span>
              <span class="finding-owasp">${f.owasp}</span>
            </div>
            <h4 class="finding-title">${f.title}</h4>
            <p class="finding-desc">${f.desc}</p>
            <div class="finding-rem">
              <strong>💡 Remediation:</strong> ${f.remediation}
            </div>
          </div>
        `;
      });
      html += `</div>`;
      resultsBox.innerHTML = html;
    }

    if (window.CyberState) window.CyberState.addXP(25, "Security code audit performed");
    if (window.CyberAudio) window.CyberAudio.playScan();
  },

  async runAIScan() {
    const inputArea = document.getElementById("scanner-input-code");
    const resultsBox = document.getElementById("scanner-results-container");
    if (!inputArea || !resultsBox) return;

    if (!window.AegisAI) {
      alert("AI Service is loading. Please try again.");
      return;
    }

    const code = inputArea.value.trim();
    if (!code) {
      alert("Please paste code or logs to analyze.");
      return;
    }

    resultsBox.innerHTML = `
      <div class="ai-scanning-state">
        <div class="spinner-ring"></div>
        <h4>Aegis AI Cyber Defense Engine Auditing Code...</h4>
        <p>Analyzing OWASP Top 10 vulnerabilities, CWE taxonomy, CVE databases, and generating production patches.</p>
      </div>
    `;

    const prompt = `You are an elite Senior Cybersecurity Auditor and Application Security Engineer.
Perform an exhaustive code/log security audit on the following snippet:

\`\`\`
${code}
\`\`\`

Provide your response in English and French with:
1. Executive Risk Summary (CVSS 3.1 estimate)
2. Specific Vulnerability Analysis with line-level technical rationale
3. Mitigated & Hardened Production Patch (complete clean code block)
4. Key Security Controls (OWASP, NIST SP 800-53, ISO 27001)`;

    try {
      const report = await window.AegisAI.generateText(prompt);
      resultsBox.innerHTML = `
        <div class="ai-report-container">
          <div class="ai-report-header">
            <span>⚡ AEGIS AI ENTERPRISE SECURITY AUDIT REPORT</span>
            <button class="cyber-btn cyber-btn-outline btn-sm" onclick="CyberUtils.copyToClipboard(document.getElementById('ai-report-text').innerText, this)">Copy Report</button>
          </div>
          <div class="ai-report-body" id="ai-report-text">${this.formatMarkdown(report)}</div>
        </div>
      `;
      if (window.CyberState) window.CyberState.addXP(50, "AI Deep Vulnerability Audit");
      if (window.CyberAudio) window.CyberAudio.playSuccess();
    } catch (err) {
      resultsBox.innerHTML = `
        <div class="sqli-alert sqli-fail">
          <h4>AI Scan Failed</h4>
          <p>${err.message}</p>
          <button class="cyber-btn cyber-btn-primary btn-sm" onclick="window.app.openAISettings()">Configure AI Key</button>
        </div>
      `;
    }
  },

  formatMarkdown(text) {
    if (!text) return "";
    return text
      .replace(/### (.*?)\n/g, '<h3>$1</h3>')
      .replace(/## (.*?)\n/g, '<h2>$1</h2>')
      .replace(/# (.*?)\n/g, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/```([a-z]*)\n([\s\S]*?)```/g, '<pre><code class="lang-$1">$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '<br><br>');
  }
};

window.ScannerLab = ScannerLab;
