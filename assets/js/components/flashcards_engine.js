/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <0dh4mm@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - Spaced Repetition Flashcards Engine
 * Interactive 3D flip card study session with telemetry & XP awards.
 */
class FlashcardsEngine {
  constructor() {
    this.currentDeckKey = "ports";
    this.currentCardIndex = 0;
    this.isFlipped = false;
    this.masteredCards = new Set();
  }

  init() {
    this.setupDeckSelector();

    const cardEl = document.getElementById("flashcard-3d-box");
    if (cardEl) {
      cardEl.addEventListener("click", () => this.flipCard());
    }

    const prevBtn = document.getElementById("btn-fc-prev");
    const nextBtn = document.getElementById("btn-fc-next");
    const flipBtn = document.getElementById("btn-fc-flip");
    const masterBtn = document.getElementById("btn-fc-master");

    if (prevBtn) prevBtn.addEventListener("click", () => this.prevCard());
    if (nextBtn) nextBtn.addEventListener("click", () => this.nextCard());
    if (flipBtn) flipBtn.addEventListener("click", () => this.flipCard());
    if (masterBtn) masterBtn.addEventListener("click", () => this.markMastered());

    // Keyboard support: Space to flip, Arrows to navigate
    document.addEventListener("keydown", (e) => {
      const fcTab = document.querySelector('[data-view-tab="flashcards"]');
      if (fcTab && fcTab.classList.contains("active")) {
        if (e.code === "Space") {
          e.preventDefault();
          this.flipCard();
        } else if (e.code === "ArrowRight") {
          this.nextCard();
        } else if (e.code === "ArrowLeft") {
          this.prevCard();
        }
      }
    });

    this.render();
  }

  setupDeckSelector() {
    const selector = document.getElementById("fc-deck-selector");
    if (!selector || !window.FlashcardDecks) return;

    let html = "";
    for (const [key, deck] of Object.entries(window.FlashcardDecks)) {
      html += `<option value="${key}">${deck.icon} ${deck.name} (${deck.cards.length} cards)</option>`;
    }
    selector.innerHTML = html;
    selector.addEventListener("change", (e) => {
      this.currentDeckKey = e.target.value;
      this.currentCardIndex = 0;
      this.isFlipped = false;
      this.render();
    });
  }

  render() {
    const deck = window.FlashcardDecks?.[this.currentDeckKey];
    if (!deck || deck.cards.length === 0) return;

    const card = deck.cards[this.currentCardIndex];
    const frontText = document.getElementById("fc-front-text");
    const backText = document.getElementById("fc-back-text");
    const counter = document.getElementById("fc-counter");
    const progressFill = document.getElementById("fc-progress-fill");
    const cardEl = document.getElementById("flashcard-3d-box");

    this.isFlipped = false;
    if (cardEl) cardEl.classList.remove("flipped");

    if (frontText) frontText.innerText = card.q;
    if (backText) backText.innerText = card.a;
    if (counter) counter.innerText = `Card ${this.currentCardIndex + 1} of ${deck.cards.length}`;

    if (progressFill) {
      const pct = Math.round(((this.currentCardIndex + 1) / deck.cards.length) * 100);
      progressFill.style.width = `${pct}%`;
    }
  }

  flipCard() {
    const cardEl = document.getElementById("flashcard-3d-box");
    if (!cardEl) return;
    this.isFlipped = !this.isFlipped;
    cardEl.classList.toggle("flipped", this.isFlipped);
    if (window.CyberAudio) window.CyberAudio.playKeypress();
  }

  prevCard() {
    const deck = window.FlashcardDecks?.[this.currentDeckKey];
    if (!deck) return;
    if (this.currentCardIndex > 0) {
      this.currentCardIndex--;
      this.render();
      if (window.CyberAudio) window.CyberAudio.playKeypress();
    }
  }

  nextCard() {
    const deck = window.FlashcardDecks?.[this.currentDeckKey];
    if (!deck) return;
    if (this.currentCardIndex < deck.cards.length - 1) {
      this.currentCardIndex++;
      this.render();
      if (window.CyberAudio) window.CyberAudio.playKeypress();
    }
  }

  markMastered() {
    const cardId = `${this.currentDeckKey}-${this.currentCardIndex}`;
    if (!this.masteredCards.has(cardId)) {
      this.masteredCards.add(cardId);
      if (window.CyberState) window.CyberState.addXP(15, "Mastered cybersecurity flashcard");
      if (window.CyberUtils) window.CyberUtils.showToast("✓ Card Mastered! +15 XP", "success");
      if (window.CyberAudio) window.CyberAudio.playSuccess();
    }
    this.nextCard();
  }
}

window.FlashcardsEngine = new FlashcardsEngine();
