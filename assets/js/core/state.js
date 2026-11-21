/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <0dh4mm@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - State & Telemetry Manager
 * Manages user progression, XP, ranks, module completion and persistent storage.
 */
class CyberStateManager {
  constructor() {
    this.STORAGE_KEYS = {
      COMPLETED: 'cyberops_completed_modules',
      XP: 'cyberops_user_xp',
      NOTES: 'cyberops_module_notes',
      LAST_ACTIVE: 'cyberops_last_active_date',
      STREAK: 'cyberops_study_streak',
      SETTINGS: 'cyberops_ai_config',
      EXAM_HISTORY: 'cyberops_exam_history',
      FREE_ACCESS: 'cyberops_free_access_mode',
      TUTORIALS: 'cyberops_completed_tutorials',
      CAREER_PATH: 'cyberops_active_career_path',
      BADGES: 'cyberops_unlocked_badges',
      TOUR_COMPLETED: 'cyberops_tour_completed'
    };

    this.ranks = [
      { minXP: 0, level: 'LEVEL 1', title: 'Script Cadet', icon: '🎖️' },
      { minXP: 300, level: 'LEVEL 2', title: 'Network Sentinel', icon: '🛡️' },
      { minXP: 800, level: 'LEVEL 3', title: 'SOC Analyst L1', icon: '⚡' },
      { minXP: 1600, level: 'LEVEL 4', title: 'Threat Hunter L2', icon: '🦅' },
      { minXP: 2600, level: 'LEVEL 5', title: 'Security Architect', icon: '🏰' },
      { minXP: 4000, level: 'LEVEL 6', title: 'SecOps Commander', icon: '👑' }
    ];

    this.listeners = {};
    this.initStreak();
  }

  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data));
    }
  }

  getCompletedModules() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.COMPLETED)) || [];
    } catch {
      return [];
    }
  }

  isModuleCompleted(id) {
    return this.getCompletedModules().includes(id);
  }

  toggleModuleComplete(id) {
    let completed = this.getCompletedModules();
    let isNowDone = false;
    if (completed.includes(id)) {
      completed = completed.filter(mId => mId !== id);
      this.addXP(-100, 'Module unchecked');
    } else {
      completed.push(id);
      isNowDone = true;
      this.addXP(100, `Completed module: ${id}`);
      if (window.CyberAudio) window.CyberAudio.playSuccess();
    }
    localStorage.setItem(this.STORAGE_KEYS.COMPLETED, JSON.stringify(completed));
    this.emit('moduleCompletedChanged', { id, completed: isNowDone, allCompleted: completed });
    return isNowDone;
  }

  getCompletedTutorials() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.TUTORIALS)) || [];
    } catch {
      return [];
    }
  }

  isTutorialCompleted(id) {
    return this.getCompletedTutorials().includes(id);
  }

  toggleTutorialComplete(id) {
    let completed = this.getCompletedTutorials();
    let isNowDone = false;
    if (completed.includes(id)) {
      completed = completed.filter(tId => tId !== id);
      this.addXP(-50, 'Tutorial unchecked');
    } else {
      completed.push(id);
      isNowDone = true;
      this.addXP(50, `Completed video tutorial: ${id}`);
      if (window.CyberAudio) window.CyberAudio.playSuccess();
    }
    localStorage.setItem(this.STORAGE_KEYS.TUTORIALS, JSON.stringify(completed));
    this.emit('tutorialCompletedChanged', { id, completed: isNowDone, allCompleted: completed });
    return isNowDone;
  }

  getActiveCareerPath() {
    return localStorage.getItem(this.STORAGE_KEYS.CAREER_PATH) || 'soc_analyst';
  }

  setActiveCareerPath(pathId) {
    localStorage.setItem(this.STORAGE_KEYS.CAREER_PATH, pathId);
    this.emit('careerPathChanged', pathId);
    return pathId;
  }

  getUnlockedBadges() {
    try {
      const stored = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.BADGES));
      if (Array.isArray(stored)) return stored;
    } catch {}
    return ['badge-welcome'];
  }

  isBadgeUnlocked(badgeId) {
    return this.getUnlockedBadges().includes(badgeId);
  }

  unlockBadge(badgeId, xpReward = 50) {
    let badges = this.getUnlockedBadges();
    if (badges.includes(badgeId)) return false;

    badges.push(badgeId);
    localStorage.setItem(this.STORAGE_KEYS.BADGES, JSON.stringify(badges));
    this.addXP(xpReward, `Unlocked Achievement Badge: ${badgeId}`);
    if (window.CyberAudio) window.CyberAudio.playLevelUp();
    this.emit('badgeUnlocked', { badgeId, xpReward, allBadges: badges });
    return true;
  }

  isTourCompleted() {
    return localStorage.getItem(this.STORAGE_KEYS.TOUR_COMPLETED) === 'true';
  }

  setTourCompleted(completed = true) {
    localStorage.setItem(this.STORAGE_KEYS.TOUR_COMPLETED, completed ? 'true' : 'false');
  }

  getXP() {
    return parseInt(localStorage.getItem(this.STORAGE_KEYS.XP) || '0', 10);
  }

  addXP(amount, reason = '') {
    const current = this.getXP();
    const updated = Math.max(0, current + amount);
    localStorage.setItem(this.STORAGE_KEYS.XP, updated.toString());

    const prevRank = this.getRank(current);
    const newRank = this.getRank(updated);

    if (newRank.minXP > prevRank.minXP && window.CyberAudio) {
      window.CyberAudio.playLevelUp();
      if (window.CyberUtils) {
        window.CyberUtils.showToast(`🎉 PROMOTION! Promoted to ${newRank.level}: ${newRank.title}!`, 'success', 4000);
      }
    }

    this.emit('xpChanged', { xp: updated, rank: newRank, diff: amount, reason });
    return updated;
  }

  getRank(xp = null) {
    const score = xp !== null ? xp : this.getXP();
    let currentRank = this.ranks[0];
    for (const rank of this.ranks) {
      if (score >= rank.minXP) {
        currentRank = rank;
      } else {
        break;
      }
    }
    return currentRank;
  }

  getNextRank(xp = null) {
    const score = xp !== null ? xp : this.getXP();
    for (const rank of this.ranks) {
      if (score < rank.minXP) {
        return rank;
      }
    }
    return null; // Top rank reached
  }

  getModuleNotes(moduleId) {
    try {
      const allNotes = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.NOTES)) || {};
      return allNotes[moduleId] || '';
    } catch {
      return '';
    }
  }

  saveModuleNotes(moduleId, content) {
    try {
      const allNotes = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.NOTES)) || {};
      allNotes[moduleId] = content;
      localStorage.setItem(this.STORAGE_KEYS.NOTES, JSON.stringify(allNotes));
      return true;
    } catch {
      return false;
    }
  }

  initStreak() {
    const today = new Date().toDateString();
    const lastActive = localStorage.getItem(this.STORAGE_KEYS.LAST_ACTIVE);
    let streak = parseInt(localStorage.getItem(this.STORAGE_KEYS.STREAK) || '1', 10);

    if (lastActive) {
      const lastDate = new Date(lastActive);
      const diffDays = Math.floor((new Date() - lastDate) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        streak += 1;
      } else if (diffDays > 1) {
        streak = 1;
      }
    }

    localStorage.setItem(this.STORAGE_KEYS.LAST_ACTIVE, today);
    localStorage.setItem(this.STORAGE_KEYS.STREAK, streak.toString());
  }

  getStreak() {
    return parseInt(localStorage.getItem(this.STORAGE_KEYS.STREAK) || '1', 10);
  }

  // =========================================================================
  // PROGRESSIVE DISCLOSURE & LEVEL UNLOCKING ENGINE
  // =========================================================================
  isFreeAccessMode() {
    return localStorage.getItem(this.STORAGE_KEYS.FREE_ACCESS) === 'true';
  }

  toggleFreeAccessMode() {
    const current = this.isFreeAccessMode();
    const updated = !current;
    localStorage.setItem(this.STORAGE_KEYS.FREE_ACCESS, updated.toString());
    this.emit('accessModeChanged', { freeAccess: updated });
    return updated;
  }

  isPhaseUnlocked(phaseNum) {
    if (this.isFreeAccessMode()) return true;
    if (phaseNum <= 1) return true; // Phase 1 is always unlocked for beginners

    const completed = this.getCompletedModules();
    const xp = this.getXP();

    // Helper to count modules completed in a specific phase
    const countCompletedInPhase = (p) => {
      if (!window.CURRICULUM_DATA) return 0;
      return completed.filter(id => {
        const mod = window.CURRICULUM_DATA.find(m => m.id === id);
        return mod && mod.phase === p;
      }).length;
    };

    if (phaseNum === 2) {
      return countCompletedInPhase(1) >= 2 || xp >= 250;
    }
    if (phaseNum === 3) {
      return countCompletedInPhase(2) >= 1 || xp >= 600;
    }
    if (phaseNum === 4) {
      return countCompletedInPhase(3) >= 1 || xp >= 1200;
    }
    if (phaseNum === 5) {
      return countCompletedInPhase(4) >= 1 || xp >= 2000;
    }
    return true;
  }

  isModuleUnlocked(moduleObj) {
    if (this.isFreeAccessMode()) return true;
    if (!moduleObj) return true;
    return this.isPhaseUnlocked(moduleObj.phase);
  }

  getPhaseUnlockRequirement(phaseNum, isFr = false) {
    if (phaseNum === 2) {
      return isFr ? "Niveau 2 (250 XP) ou 2 modules Phase 1 validés" : "Level 2 (250 XP) or 2 Phase 1 modules completed";
    }
    if (phaseNum === 3) {
      return isFr ? "Niveau 3 (600 XP) ou 1 module Phase 2 validé" : "Level 3 (600 XP) or 1 Phase 2 module completed";
    }
    if (phaseNum === 4) {
      return isFr ? "Niveau 4 (1200 XP) ou 1 module Phase 3 validé" : "Level 4 (1200 XP) or 1 Phase 3 module completed";
    }
    if (phaseNum === 5) {
      return isFr ? "Niveau 5 (2000 XP) ou 1 module Phase 4 validé" : "Level 5 (2000 XP) or 1 Phase 4 module completed";
    }
    return "";
  }

  isFeatureUnlocked(featureKey) {
    if (this.isFreeAccessMode()) return true;
    const completedCount = this.getCompletedModules().length;
    const xp = this.getXP();

    switch (featureKey) {
      case 'home':
      case 'curriculum':
      case 'labs':
      case 'flashcards':
      case 'tutorials':
      case 'career':
      case 'cheatsheets':
      case 'radar':
      case 'badges':
        return true; // Always unlocked from Day 1
      case 'scanner':
        return xp >= 150 || completedCount >= 1;
      case 'ctf':
        return xp >= 250 || completedCount >= 2;
      case 'mitre':
        return xp >= 600 || completedCount >= 3;
      case 'wargame':
        return xp >= 1200 || completedCount >= 5;
      case 'exam':
        return xp >= 1800 || completedCount >= 7;
      default:
        return true;
    }
  }

  getFeatureUnlockRequirement(featureKey, isFr = false) {
    switch (featureKey) {
      case 'scanner':
        return isFr ? "Niveau 1+ (150 XP) ou 1 module validé" : "Level 1+ (150 XP) or 1 module completed";
      case 'ctf':
        return isFr ? "Niveau 2 (250 XP) ou 2 modules validés" : "Level 2 (250 XP) or 2 modules completed";
      case 'mitre':
        return isFr ? "Niveau 3 (600 XP) ou 3 modules validés" : "Level 3 (600 XP) or 3 modules completed";
      case 'wargame':
        return isFr ? "Niveau 4 (1200 XP) ou 5 modules validés" : "Level 4 (1200 XP) or 5 modules completed";
      case 'exam':
        return isFr ? "Niveau 5 (1800 XP) ou 7 modules validés" : "Level 5 (1800 XP) or 7 modules completed";
      default:
        return "";
    }
  }

  getUserProfile() {
    try {
      const stored = localStorage.getItem('cyberops_user_profile');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return {
      name: 'Alexandre Durand',
      email: 'alex.durand@miage-fede.eu',
      provider: 'email',
      studentId: 'FEDE-2026-4821',
      avatar: '🛡️',
      specialization: 'European Bachelor in Cybersecurity & Networks',
      isAuthenticated: false
    };
  }

  setUserProfile(profile) {
    const current = this.getUserProfile();
    const updated = { ...current, ...profile, isAuthenticated: true };
    localStorage.setItem('cyberops_user_profile', JSON.stringify(updated));
    this.emit('userProfileChanged', updated);
    return updated;
  }

  isAuthenticated() {
    const profile = this.getUserProfile();
    return Boolean(profile && profile.isAuthenticated === true);
  }

  clearUserProfile() {
    const current = this.getUserProfile();
    const reset = { ...current, isAuthenticated: false };
    localStorage.setItem('cyberops_user_profile', JSON.stringify(reset));
    this.emit('userProfileChanged', reset);
    return reset;
  }
}

window.CyberState = new CyberStateManager();
