/**
 * Verification test script for CyberOps Academy
 * Validates data integrity, scenarios, tactics, translations, and modules.
 */
const fs = require('fs');
const path = require('path');

// Mock browser window and DOM globals
global.window = global;
const storageMap = { cyberops_lang: 'en' };
global.localStorage = {
  getItem: (k) => storageMap[k] !== undefined ? storageMap[k] : null,
  setItem: (k, v) => { storageMap[k] = String(v); }
};
global.document = {
  querySelectorAll: () => [],
  getElementById: () => null,
  addEventListener: () => {},
  createElement: () => ({
    appendChild: () => {},
    remove: () => {},
    classList: { add: () => {}, remove: () => {} },
    style: {}
  }),
  body: {
    appendChild: () => {},
    classList: { add: () => {}, remove: () => {} },
    style: {}
  }
};

console.log("=== RUNNING CYBEROPS ACADEMY FULL SUITE VERIFICATION ===");

// 1. Core
require('./assets/js/core/utils.js');
require('./assets/js/core/audio.js');
require('./assets/js/core/voice_mentor.js');
require('./assets/js/core/state.js');
require('./assets/js/core/i18n.js');

// 2. Data
require('./assets/js/data/modules_data.js');
require('./assets/js/data/exam_data.js');
require('./assets/js/data/flashcards_data.js');
require('./assets/js/data/ctf_data.js');
require('./assets/js/data/mitre_data.js');
require('./assets/js/data/wargame_data.js');
require('./assets/js/data/tutorials_data.js');
require('./assets/js/data/career_data.js');
require('./assets/js/data/cheatsheets_data.js');
require('./assets/js/data/badges_data.js');
require('./assets/js/data/glossary_data.js');

// 3. Components & Labs
require('./assets/js/components/ctf_engine.js');
require('./assets/js/components/mitre_navigator.js');
require('./assets/js/components/wargame_engine.js');
require('./assets/js/components/tutorials_hub.js');
require('./assets/js/components/career_roadmaps.js');
require('./assets/js/components/threat_radar.js');
require('./assets/js/components/cheatsheet_vault.js');
require('./assets/js/components/badges_passport.js');
require('./assets/js/components/cyber_glossary.js');
require('./assets/js/components/guided_tour.js');
require('./assets/js/components/first_day_quest.js');
require('./assets/js/components/diagnostic_quiz.js');

// Assertions
let passed = 0;
function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASS: ${message}`);
    passed++;
  }
}

// Check Curriculum Modules
assert(window.CURRICULUM_DATA && window.CURRICULUM_DATA.length === 19, "19 Curriculum modules loaded");

// Check CTF Challenges
assert(window.CtfChallengesData && window.CtfChallengesData.length === 8, "8 CTF challenges loaded");
window.CtfChallengesData.forEach(c => {
  assert(c.flagHash && c.flagHash.length === 64, `Challenge ${c.id} has SHA-256 flag hash`);
});

// Check MITRE ATT&CK Matrix
assert(window.MitreAttackData && window.MitreAttackData.tactics.length === 13, "13 MITRE ATT&CK Enterprise Tactics loaded");
let totalTechs = 0;
window.MitreAttackData.tactics.forEach(t => {
  totalTechs += t.techniques.length;
  t.techniques.forEach(tech => {
    assert(tech.id && tech.threatActors && tech.detection, `Technique ${tech.id} has complete metadata & SIEM rule`);
  });
});
assert(totalTechs >= 25, `Loaded ${totalTechs} MITRE ATT&CK techniques with SIEM rules`);

// Check SOC Wargame Scenarios
assert(window.WargameScenariosData && window.WargameScenariosData.length === 3, "3 Live SOC Crisis scenarios loaded");
window.WargameScenariosData.forEach(s => {
  assert(s.phases && s.phases.length >= 2, `Scenario ${s.id} has multiple phases`);
  assert(s.logs && s.logs.length > 0, `Scenario ${s.id} has SIEM log telemetry`);
});

// Check Translations
assert(window.CyberI18n.translations.en.tabHome, "i18n EN contains tabHome");
assert(window.CyberI18n.translations.fr.tabHome, "i18n FR contains tabHome");
assert(window.CyberI18n.translations.en.landingHeadlineMain, "i18n EN contains landingHeadlineMain");
assert(window.CyberI18n.translations.fr.landingHeadlineMain, "i18n FR contains landingHeadlineMain");
assert(window.CyberState.isFeatureUnlocked('home') === true, "Home view is always unlocked");
assert(window.CyberI18n.translations.en.tabCtf, "i18n EN contains tabCtf");
assert(window.CyberI18n.translations.fr.tabCtf, "i18n FR contains tabCtf");
assert(window.CyberI18n.translations.en.tabMitre, "i18n EN contains tabMitre");
assert(window.CyberI18n.translations.fr.tabMitre, "i18n FR contains tabMitre");
// Check Progressive Unlocking & Milestone Engine
assert(window.CyberState.isPhaseUnlocked(1) === true, "Phase 1 is initially unlocked");
assert(window.CyberState.isPhaseUnlocked(2) === false, "Phase 2 is initially locked for beginners (0 XP)");
assert(window.CyberState.isFeatureUnlocked('curriculum') === true, "Curriculum is unlocked from Day 1");
assert(window.CyberState.isFeatureUnlocked('labs') === true, "Labs are unlocked from Day 1");
assert(window.CyberState.isFeatureUnlocked('wargame') === false, "Wargame is initially locked (requires Level 4 or 5 completed modules)");

// Test Free Access Override
window.CyberState.toggleFreeAccessMode();
assert(window.CyberState.isPhaseUnlocked(2) === true, "Free Access Mode unlocks Phase 2 immediately");
assert(window.CyberState.isFeatureUnlocked('wargame') === true, "Free Access Mode unlocks Wargame immediately");
window.CyberState.toggleFreeAccessMode(); // Revert back to progressive
assert(window.CyberState.isPhaseUnlocked(2) === false, "Toggling back restores progressive protection");

// Test Wargame Progressive Chaining
assert(window.WargameSim.isScenarioUnlocked(0) === true, "Wargame Scenario 1 is initially unlocked");
assert(window.WargameSim.isScenarioUnlocked(1) === false, "Wargame Scenario 2 is locked until Scenario 1 is resolved");
// Test Auth and Student Profile State Management
assert(typeof window.CyberState.getUserProfile === 'function', "CyberState has getUserProfile method");
assert(typeof window.CyberState.setUserProfile === 'function', "CyberState has setUserProfile method");
assert(typeof window.CyberState.clearUserProfile === 'function', "CyberState has clearUserProfile method");

window.CyberState.setUserProfile({ name: "Alex Cyber", email: "alex@example.com", provider: "google" });
const prof = window.CyberState.getUserProfile();
assert(prof && prof.name === "Alex Cyber" && prof.provider === "google", "CyberState properly stores and retrieves student profile");
window.CyberState.clearUserProfile();
assert(window.CyberState.getUserProfile().isAuthenticated === false, "CyberState clearUserProfile properly removes authentication status");

// Test OAuth and Auth i18n keys
const requiredAuthKeys = [
  'oauthTitle', 'oauthGoogle', 'oauthGithub', 'oauthDiscord', 'oauthOrEmail',
  'rememberMe', 'forgotPass', 'passStrengthTitle', 'strengthWeak', 'strengthMedium',
  'strengthStrong', 'strengthMaster', 'noAccountPrompt', 'hasAccountPrompt', 'signedInAs', 'btnSignOut'
];
requiredAuthKeys.forEach(k => {
  assert(window.CyberI18n.translations.en[k], `i18n EN contains auth key '${k}'`);
  assert(window.CyberI18n.translations.fr[k], `i18n FR contains auth key '${k}'`);
});

// Test HTML file structure for OAuth and Auth elements
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
assert(indexHtml.includes('auth-social-btn google'), "index.html contains Google OAuth button");
assert(indexHtml.includes('auth-social-btn github'), "index.html contains GitHub OAuth button");
assert(indexHtml.includes('auth-social-btn discord'), "index.html contains Discord OAuth button");
assert(indexHtml.includes('auth-eye-btn'), "index.html contains password visibility toggle buttons");
assert(indexHtml.includes('auth-password-strength-box'), "index.html contains dynamic password strength meter");
assert(indexHtml.includes('student-navbar-profile'), "index.html contains student navbar profile pill container");

// Check Video Masterclasses & Tutorials Data Integrity
assert(window.TutorialsData && window.TutorialsData.length === 12, "12 Comprehensive Video Masterclasses loaded");
window.TutorialsData.forEach(tut => {
  assert(tut.id && tut.track && tut.level && tut.duration && tut.videoUrl && tut.actionTarget, `Tutorial ${tut.id} has complete metadata`);
  assert(tut.en && tut.en.title && tut.en.tagline && tut.en.elif5 && tut.en.keyTerms.length >= 3, `Tutorial ${tut.id} has rich English ELIF5 and key terms`);
  assert(tut.fr && tut.fr.title && tut.fr.tagline && tut.fr.elif5 && tut.fr.keyTerms.length >= 3, `Tutorial ${tut.id} has rich French ELIF5 and key terms`);
  assert(tut.en.chapters && tut.en.chapters.length >= 3, `Tutorial ${tut.id} has structured video chapters`);
  assert(tut.en.steps && tut.en.steps.length >= 3, `Tutorial ${tut.id} has step-by-step walkthrough procedure`);
  assert(tut.en.pitfalls && tut.en.pitfalls.length >= 2, `Tutorial ${tut.id} has common beginner pitfalls`);
  assert(tut.en.quiz && tut.en.quiz.question && tut.en.quiz.options.length === 4, `Tutorial ${tut.id} has interactive knowledge check mini-quiz`);
});

// Check Tutorials State & Milestone Unlocking
assert(window.CyberState.isFeatureUnlocked('tutorials') === true, "Tutorials Hub is always unlocked from Day 1 for beginners");
assert(typeof window.CyberState.getCompletedTutorials === 'function', "CyberState has getCompletedTutorials method");
assert(typeof window.CyberState.toggleTutorialComplete === 'function', "CyberState has toggleTutorialComplete method");

const initialTutDone = window.CyberState.getCompletedTutorials().length;
window.CyberState.toggleTutorialComplete('tut-01-welcome-cyber');
assert(window.CyberState.isTutorialCompleted('tut-01-welcome-cyber') === true, "Tutorial completion properly persisted in state");
window.CyberState.toggleTutorialComplete('tut-01-welcome-cyber'); // Revert
assert(window.CyberState.isTutorialCompleted('tut-01-welcome-cyber') === false, "Toggling tutorial completion reverts properly");

// Check Tutorials Translations
const requiredTutKeys = [
  'tabTutorials', 'navLandingTutorials', 'featTutorialsTitle', 'tutHeaderTitle',
  'tutHeaderSub', 'tutSearchPlaceholder', 'tutFilterAll', 'tutFilterBeginners',
  'tutStatTotal', 'tutStatCompleted', 'tutStatWatchTime', 'tutStatXpEarned',
  'tutElif5Title', 'tutKeyTermsTitle', 'tutStepsTitle', 'tutPitfallsTitle', 'tutQuizTitle'
];
requiredTutKeys.forEach(k => {
  assert(window.CyberI18n.translations.en[k], `i18n EN contains tutorial key '${k}'`);
  assert(window.CyberI18n.translations.fr[k], `i18n FR contains tutorial key '${k}'`);
});

// Check HTML structure for Tutorials
assert(indexHtml.includes('data-portal-view="tutorials"'), "index.html contains tutorials portal nav tab");
assert(indexHtml.includes('data-view-section="tutorials"'), "index.html contains tutorials portal view section");
assert(indexHtml.includes('id="tutorials-grid"'), "index.html contains tutorials grid container");
assert(indexHtml.includes('id="tutorial-detail-modal"'), "index.html contains tutorial detail modal");
assert(indexHtml.includes('tutorials_data.js'), "index.html imports tutorials_data.js");
assert(indexHtml.includes('tutorials_hub.js'), "index.html imports tutorials_hub.js");

// Check Career Roadmaps Data & State
assert(window.CareerRoadmapsData && window.CareerRoadmapsData.length === 4, "4 Structured Career Roadmaps loaded");
window.CareerRoadmapsData.forEach(cp => {
  assert(cp.id && cp.en.stages && cp.en.stages.length === 4, `Career path ${cp.id} has 4 progressive milestones (EN)`);
  assert(cp.fr.stages && cp.fr.stages.length === 4, `Career path ${cp.id} has 4 progressive milestones (FR)`);
  assert(cp.en.salary && cp.fr.salary, `Career path ${cp.id} has salary benchmarks`);
  assert(cp.en.certifications && cp.en.certifications.length > 0, `Career path ${cp.id} has target certifications`);
});
assert(window.CyberState.getActiveCareerPath() === 'soc_analyst', "Initial career path is soc_analyst");
window.CyberState.setActiveCareerPath('pentester');
assert(window.CyberState.getActiveCareerPath() === 'pentester', "Career path switching persisted in state");
window.CyberState.setActiveCareerPath('soc_analyst');

// Check Cheatsheets Data & Search Index
assert(Array.isArray(window.CheatsheetsData) && window.CheatsheetsData.length >= 15, "At least 15 cyber command snippets loaded");
const uniqueCats = new Set(window.CheatsheetsData.map(c => c.category));
assert(uniqueCats.size >= 5, `Loaded ${uniqueCats.size} distinct cheatsheet categories (Linux, Nmap, Wireshark, SQLi, PowerShell, Crypto)`);
window.CheatsheetsData.forEach(snip => {
  assert(snip.id && snip.command && snip.category && snip.risk, `Snippet ${snip.id} has command syntax and risk rating`);
  assert(snip.en && snip.en.title && snip.fr && snip.fr.title, `Snippet ${snip.id} has bilingual descriptions`);
});

// Check Digital Badges & Passport Engine
assert(window.BadgesData && window.BadgesData.length >= 12, "Collectible achievement badges loaded");
window.BadgesData.forEach(b => {
  assert(b.id && b.icon && b.category && b.xpReward > 0, `Badge ${b.id} has icon, category, and XP reward`);
  assert(b.en && b.en.title && b.fr && b.fr.title, `Badge ${b.id} has bilingual descriptions`);
});
assert(typeof window.CyberState.unlockBadge === 'function', "CyberState has unlockBadge method");
assert(typeof window.CyberState.isBadgeUnlocked === 'function', "CyberState has isBadgeUnlocked method");
assert(typeof window.CyberState.getUnlockedBadges === 'function', "CyberState has getUnlockedBadges method");
assert(window.CyberState.isBadgeUnlocked('badge-welcome') === true, "'badge-welcome' is unlocked by default");

// Check Voice Mentor Engine
assert(window.VoiceMentor && typeof window.VoiceMentor.speak === 'function', "VoiceMentor engine loaded with speak method");
assert(typeof window.VoiceMentor.stop === 'function', "VoiceMentor has stop method");
assert(typeof window.VoiceMentor.toggle === 'function', "VoiceMentor has toggle method");

// Check Threat Radar Component
assert(window.ThreatRadar && typeof window.ThreatRadar.init === 'function', "ThreatRadar engine loaded with init method");
assert(typeof window.ThreatRadar.resizeCanvas === 'function', "ThreatRadar has resizeCanvas method");

// Check HTML structure for new components
assert(indexHtml.includes('data-portal-view="career"'), "index.html contains career portal nav tab");
assert(indexHtml.includes('data-portal-view="cheatsheets"'), "index.html contains cheatsheets portal nav tab");
assert(indexHtml.includes('id="threat-radar-container"'), "index.html contains threat radar container");
assert(indexHtml.includes('data-view-section="career"'), "index.html contains career view section");
assert(indexHtml.includes('data-view-section="cheatsheets"'), "index.html contains cheatsheets view section");
assert(indexHtml.includes('id="badges-passport-modal"'), "index.html contains badges passport modal");
assert(indexHtml.includes('id="navbar-badges-count"'), "index.html contains navbar badges counter");
assert(indexHtml.includes('career_data.js'), "index.html imports career_data.js");
assert(indexHtml.includes('cheatsheets_data.js'), "index.html imports cheatsheets_data.js");
assert(indexHtml.includes('badges_data.js'), "index.html imports badges_data.js");
assert(indexHtml.includes('voice_mentor.js'), "index.html imports voice_mentor.js");
assert(indexHtml.includes('career_roadmaps.js'), "index.html imports career_roadmaps.js");
assert(indexHtml.includes('threat_radar.js'), "index.html imports threat_radar.js");
assert(indexHtml.includes('cheatsheet_vault.js'), "index.html imports cheatsheet_vault.js");
assert(indexHtml.includes('badges_passport.js'), "index.html imports badges_passport.js");

// Check Cyber Glossary Data & Engine
assert(window.CyberGlossaryData && window.CyberGlossaryData.length >= 20, "At least 20 Cyber Glossary terms loaded");
window.CyberGlossaryData.forEach(term => {
  assert(term.id && term.term && term.category && term.icon, `Term ${term.id} has id, symbol, category and icon`);
  assert(term.en.analogy && term.fr.analogy, `Term ${term.id} has real-world analogies in EN & FR`);
  assert(term.en.definition && term.fr.definition, `Term ${term.id} has technical definitions in EN & FR`);
});
assert(window.CyberGlossary && typeof window.CyberGlossary.openModal === 'function', "CyberGlossary engine loaded with openModal method");
assert(typeof window.CyberGlossary.closeModal === 'function', "CyberGlossary has closeModal method");
assert(typeof window.CyberGlossary.setFilter === 'function', "CyberGlossary has setFilter method");

// Check Guided Onboarding Tour
assert(window.GuidedTour && window.GuidedTour.steps.length === 5, "Guided Tour loaded with 5 sequential onboarding steps");
assert(typeof window.GuidedTour.startTour === 'function', "GuidedTour has startTour method");
assert(typeof window.GuidedTour.nextStep === 'function', "GuidedTour has nextStep method");
assert(typeof window.GuidedTour.finishTour === 'function', "GuidedTour has finishTour method");
assert(typeof window.CyberState.isTourCompleted === 'function', "CyberState has isTourCompleted method");
assert(typeof window.CyberState.setTourCompleted === 'function', "CyberState has setTourCompleted method");

// Check First-Day Mission Quest Engine
assert(window.FirstDayQuest && window.FirstDayQuest.tasks.length === 4, "FirstDayQuest loaded with 4 structured onboarding tasks");
assert(typeof window.FirstDayQuest.completeTask === 'function', "FirstDayQuest has completeTask method");
assert(typeof window.FirstDayQuest.isTaskDone === 'function', "FirstDayQuest has isTaskDone method");
assert(typeof window.FirstDayQuest.executeTaskAction === 'function', "FirstDayQuest has executeTaskAction method");
window.FirstDayQuest.completeTask('task-identity');
assert(window.FirstDayQuest.isTaskDone('task-identity') === true, "Quest task properly marked completed");

// Check Diagnostic 'Where Do I Start?' Quiz
assert(window.DiagnosticQuiz && typeof window.DiagnosticQuiz.openModal === 'function', "DiagnosticQuiz engine loaded with openModal method");
assert(typeof window.DiagnosticQuiz.selectOption === 'function', "DiagnosticQuiz has selectOption method");
assert(typeof window.DiagnosticQuiz.restart === 'function', "DiagnosticQuiz has restart method");

// Check 3-Tier Hints in all CTF Challenges
window.CtfChallengesData.forEach(ch => {
  assert(ch.hints && ch.hints.length === 3, `CTF Challenge ${ch.id} has all 3 progressive hint tiers (Nudge, Clue, Walkthrough)`);
  assert(ch.hints[0].includes('Tier 1'), `CTF Challenge ${ch.id} hint 1 is Tier 1 (Nudge)`);
  assert(ch.hints[1].includes('Tier 2'), `CTF Challenge ${ch.id} hint 2 is Tier 2 (Clue)`);
  assert(ch.hints[2].includes('Tier 3'), `CTF Challenge ${ch.id} hint 3 is Tier 3 (Walkthrough)`);
});

// Check HTML structure for Beginner Features
assert(indexHtml.includes('id="cyber-glossary-modal"'), "index.html contains cyber glossary modal");
assert(indexHtml.includes('id="diagnostic-quiz-modal"'), "index.html contains diagnostic quiz modal");
assert(indexHtml.includes('id="first-day-quest-container"'), "index.html contains first day quest container");
assert(indexHtml.includes('btnGuidedTour'), "index.html contains Quick Tour button");
assert(indexHtml.includes('btnGlossary'), "index.html contains Glossary button");
assert(indexHtml.includes('btnDiagnostic'), "index.html contains Where to Start button");
assert(indexHtml.includes('glossary_data.js'), "index.html imports glossary_data.js");
assert(indexHtml.includes('cyber_glossary.js'), "index.html imports cyber_glossary.js");
assert(indexHtml.includes('guided_tour.js'), "index.html imports guided_tour.js");
assert(indexHtml.includes('first_day_quest.js'), "index.html imports first_day_quest.js");
assert(indexHtml.includes('diagnostic_quiz.js'), "index.html imports diagnostic_quiz.js");

console.log(`\n🎉 ALL ${passed} VERIFICATION CHECKS PASSED WITH 100% SUCCESS!`);
