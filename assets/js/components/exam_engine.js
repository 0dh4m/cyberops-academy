/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <0dh4mm@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - FEDE European Bachelor Exam Simulator Engine
 * Timed examination environment, scoring engine & official certificate generator.
 */
class ExamEngine {
  constructor() {
    this.questions = [];
    this.currentIndex = 0;
    this.userAnswers = {}; // { qId: optionIndex }
    this.flagged = new Set();
    this.timerSeconds = 15 * 60; // 15 minutes
    this.timerInterval = null;
    this.isExamActive = false;
  }

  init() {
    const startBtn = document.getElementById("btn-start-exam");
    if (startBtn) startBtn.addEventListener("click", () => this.startExam());

    const prevBtn = document.getElementById("btn-exam-prev");
    const nextBtn = document.getElementById("btn-exam-next");
    const flagBtn = document.getElementById("btn-exam-flag");
    const submitBtn = document.getElementById("btn-exam-submit");

    if (prevBtn) prevBtn.addEventListener("click", () => this.prevQuestion());
    if (nextBtn) nextBtn.addEventListener("click", () => this.nextQuestion());
    if (flagBtn) flagBtn.addEventListener("click", () => this.toggleFlag());
    if (submitBtn) submitBtn.addEventListener("click", () => this.confirmSubmit());
  }

  startExam() {
    if (!window.ExamQuestionBank || window.ExamQuestionBank.length === 0) return;

    // Shuffle and pick 10 questions
    this.questions = [...window.ExamQuestionBank].sort(() => 0.5 - Math.random()).slice(0, 10);
    this.currentIndex = 0;
    this.userAnswers = {};
    this.flagged = new Set();
    this.timerSeconds = 15 * 60;
    this.isExamActive = true;

    document.getElementById("exam-intro-screen")?.classList.add("hidden");
    document.getElementById("exam-active-screen")?.classList.remove("hidden");
    document.getElementById("exam-results-screen")?.classList.add("hidden");

    this.startTimer();
    this.renderQuestion();
    if (window.CyberAudio) window.CyberAudio.playScan();
  }

  startTimer() {
    clearInterval(this.timerInterval);
    const timerEl = document.getElementById("exam-countdown-timer");
    const updateDisplay = () => {
      const mins = Math.floor(this.timerSeconds / 60);
      const secs = this.timerSeconds % 60;
      if (timerEl) {
        timerEl.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        if (this.timerSeconds <= 120) {
          timerEl.classList.add("timer-urgent");
        } else {
          timerEl.classList.remove("timer-urgent");
        }
      }
    };

    updateDisplay();
    this.timerInterval = setInterval(() => {
      this.timerSeconds--;
      updateDisplay();
      if (this.timerSeconds <= 0) {
        clearInterval(this.timerInterval);
        this.finishExam(true);
      }
    }, 1000);
  }

  renderQuestion() {
    const q = this.questions[this.currentIndex];
    if (!q) return;

    const countEl = document.getElementById("exam-question-count");
    const textEl = document.getElementById("exam-question-text");
    const catEl = document.getElementById("exam-question-cat");
    const optionsBox = document.getElementById("exam-options-container");
    const flagBtn = document.getElementById("btn-exam-flag");

    if (countEl) countEl.innerText = `Question ${this.currentIndex + 1} of ${this.questions.length}`;
    if (catEl) catEl.innerText = q.category;
    if (textEl) textEl.innerText = q.question;

    if (flagBtn) {
      flagBtn.classList.toggle("flagged", this.flagged.has(q.id));
      flagBtn.innerText = this.flagged.has(q.id) ? "🚩 Flagged for Review" : "🏳️ Flag Question";
    }

    if (optionsBox) {
      let html = "";
      q.options.forEach((opt, idx) => {
        const isSelected = this.userAnswers[q.id] === idx;
        html += `
          <div class="exam-option-card ${isSelected ? 'selected' : ''}" onclick="window.ExamSim.selectOption(${idx})">
            <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
            <span class="option-text">${opt}</span>
          </div>
        `;
      });
      optionsBox.innerHTML = html;
    }

    // Update Question Navigator Dots
    this.renderQuestionPalette();

    const prevBtn = document.getElementById("btn-exam-prev");
    const nextBtn = document.getElementById("btn-exam-next");
    if (prevBtn) prevBtn.disabled = this.currentIndex === 0;
    if (nextBtn) nextBtn.disabled = this.currentIndex === this.questions.length - 1;
  }

  renderQuestionPalette() {
    const palette = document.getElementById("exam-question-palette");
    if (!palette) return;

    let html = "";
    this.questions.forEach((q, idx) => {
      const isAnswered = this.userAnswers[q.id] !== undefined;
      const isCurrent = idx === this.currentIndex;
      const isFlagged = this.flagged.has(q.id);

      html += `
        <button class="palette-dot ${isCurrent ? 'active' : ''} ${isAnswered ? 'answered' : ''} ${isFlagged ? 'flagged' : ''}" onclick="window.ExamSim.jumpTo(${idx})" title="Question ${idx + 1}">
          ${idx + 1}
        </button>
      `;
    });
    palette.innerHTML = html;
  }

  selectOption(idx) {
    const q = this.questions[this.currentIndex];
    if (!q) return;
    this.userAnswers[q.id] = idx;
    this.renderQuestion();
    if (window.CyberAudio) window.CyberAudio.playKeypress();
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.renderQuestion();
    }
  }

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.renderQuestion();
    }
  }

  jumpTo(index) {
    if (index >= 0 && index < this.questions.length) {
      this.currentIndex = index;
      this.renderQuestion();
    }
  }

  toggleFlag() {
    const q = this.questions[this.currentIndex];
    if (!q) return;
    if (this.flagged.has(q.id)) {
      this.flagged.delete(q.id);
    } else {
      this.flagged.add(q.id);
    }
    this.renderQuestion();
  }

  confirmSubmit() {
    const answeredCount = Object.keys(this.userAnswers).length;
    const total = this.questions.length;
    if (answeredCount < total) {
      if (!confirm(`You have answered ${answeredCount} of ${total} questions. Are you sure you want to finalize and submit the exam?`)) {
        return;
      }
    }
    this.finishExam(false);
  }

  finishExam(isTimeout = false) {
    clearInterval(this.timerInterval);
    this.isExamActive = false;

    let correctCount = 0;
    const breakdown = {};

    this.questions.forEach(q => {
      if (!breakdown[q.category]) breakdown[q.category] = { correct: 0, total: 0 };
      breakdown[q.category].total++;

      if (this.userAnswers[q.id] === q.correct) {
        correctCount++;
        breakdown[q.category].correct++;
      }
    });

    const total = this.questions.length;
    const scoreOutOf20 = ((correctCount / total) * 20).toFixed(1);
    const percentage = Math.round((correctCount / total) * 100);
    const isPassed = percentage >= 50;

    document.getElementById("exam-active-screen")?.classList.add("hidden");
    const resultsScreen = document.getElementById("exam-results-screen");
    if (resultsScreen) resultsScreen.classList.remove("hidden");

    if (isPassed) {
      if (window.CyberState) window.CyberState.addXP(250, "Passed European Bachelor FEDE Examination");
      if (window.CyberAudio) window.CyberAudio.playSuccess();
    } else {
      if (window.CyberAudio) window.CyberAudio.playError();
    }

    const reportBox = document.getElementById("exam-score-report");
    if (reportBox) {
      let catHtml = "";
      for (const [cat, data] of Object.entries(breakdown)) {
        const catPct = Math.round((data.correct / data.total) * 100);
        catHtml += `
          <div class="exam-cat-row">
            <span class="cat-name">${cat}</span>
            <div class="cat-bar-bg"><div class="cat-bar-fill" style="width: ${catPct}%"></div></div>
            <span class="cat-score">${data.correct}/${data.total} (${catPct}%)</span>
          </div>
        `;
      }

      reportBox.innerHTML = `
        <div class="exam-score-header ${isPassed ? 'score-pass' : 'score-fail'}">
          <div class="score-badge-circle">
            <span class="score-big">${scoreOutOf20}</span>
            <span class="score-scale">/20</span>
          </div>
          <div class="score-meta">
            <h3>${isPassed ? '🎉 FELICITATIONS ! EXAMEN VALIDE' : '⚠️ AJOURNE - REEXAMEN RECOMMANDE'}</h3>
            <p>${isPassed ? 'You have successfully satisfied the European Bachelor academic passing standard (Threshold: 10/20).' : 'Your score is below the 10/20 threshold. Review the core modules below and try again.'}</p>
            <span class="exam-stat-tag">${correctCount} of ${total} Questions Correct (${percentage}%)</span>
          </div>
        </div>

        <div class="exam-category-breakdown">
          <h4>Category Performance Breakdown:</h4>
          ${catHtml}
        </div>

        <div class="exam-actions-row">
          <button class="cyber-btn cyber-btn-primary" onclick="window.ExamSim.startExam()">🔄 Retake Exam</button>
          ${isPassed ? `<button class="cyber-btn cyber-btn-success" onclick="window.ExamSim.openCertificate('${scoreOutOf20}')">📜 View Certificate of Achievement</button>` : ''}
        </div>
      `;
    }
  }

  openCertificate(score) {
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const certHash = "FEDE-CYBER-" + Math.random().toString(36).substring(2, 10).toUpperCase();

    const certHtml = `
      <div class="certificate-modal-overlay" id="cert-overlay" onclick="if(event.target.id === 'cert-overlay') this.remove()">
        <div class="certificate-frame">
          <div class="cert-border-corner top-left"></div>
          <div class="cert-border-corner top-right"></div>
          <div class="cert-border-corner bottom-left"></div>
          <div class="cert-border-corner bottom-right"></div>

          <div class="cert-header">
            <div class="cert-logo">🛡️</div>
            <h2>EUROPEAN BACHELOR IN CYBERSECURITY & NETWORKS</h2>
            <h3>GROUPE MIAGE • FEDERATION EUROPEENNE DES ECOLES (FEDE)</h3>
          </div>

          <div class="cert-body">
            <p class="cert-presents">This official digital attestation certifies that</p>
            <h1 class="cert-candidate-name">STUDENT CANDIDATE</h1>
            <p class="cert-rationale">has successfully validated all required theoretical competencies, operational network defense assessments, and automated examinations with an overall distinction score of:</p>
            <div class="cert-score-seal">
              <span class="cert-grade">${score} / 20</span>
              <span class="cert-seal-text">ACADEMIC HONORS</span>
            </div>
          </div>

          <div class="cert-footer">
            <div class="cert-signature-box">
              <span class="sig-title">ACADEMIC JURY</span>
              <span class="sig-line">Director of Cyber Studies</span>
            </div>
            <div class="cert-stamp">
              <div class="stamp-inner">FEDE • VALIDATED</div>
            </div>
            <div class="cert-signature-box">
              <span class="sig-title">DATE & ID</span>
              <span class="sig-date">${dateStr}</span>
              <code class="sig-hash">${certHash}</code>
            </div>
          </div>

          <div class="cert-print-row">
            <button class="cyber-btn cyber-btn-primary" onclick="window.print()">🖨️ Print / Save as PDF</button>
            <button class="cyber-btn cyber-btn-outline" onclick="document.getElementById('cert-overlay').remove()">Close</button>
          </div>
        </div>
      </div>
    `;

    const div = document.createElement("div");
    div.innerHTML = certHtml;
    document.body.appendChild(div.firstElementChild);
  }
}

window.ExamSim = new ExamEngine();
