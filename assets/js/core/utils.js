/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <adamcherkaoui99@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - Core Utilities
 */
const CyberUtils = {
  escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  async copyToClipboard(text, btnElement = null, successMsg = 'Copied!') {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      if (window.CyberAudio) window.CyberAudio.playSuccess();

      if (btnElement) {
        const originalText = btnElement.innerHTML;
        btnElement.innerHTML = `✓ ${successMsg}`;
        btnElement.classList.add('copied');
        setTimeout(() => {
          btnElement.innerHTML = originalText;
          btnElement.classList.remove('copied');
        }, 1800);
      }
      this.showToast(successMsg, 'success');
      return true;
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      this.showToast('Failed to copy to clipboard', 'error');
      return false;
    }
  },

  showToast(message, type = 'info', duration = 2800) {
    let container = document.getElementById('cyber-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'cyber-toast-container';
      container.className = 'cyber-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `cyber-toast ${type}`;
    const icon = type === 'success' ? '✓' : type === 'error' ? '⚠' : '⚡';
    toast.innerHTML = `<span class="toast-icon">${icon}</span> <span class="toast-msg">${this.escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 350);
    }, duration);
  },

  formatNumber(num) {
    return new Intl.NumberFormat().format(num);
  }
};

window.CyberUtils = CyberUtils;
