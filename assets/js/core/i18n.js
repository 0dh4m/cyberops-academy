/**
 * CyberOps Academy - Internationalization (i18n) Engine
 * Seamless bilingual toggle between English and French (EN / FR)
 */
class CyberI18nEngine {
  constructor() {
    this.currentLang = localStorage.getItem('cyberops_lang') || 'en';
    this.translations = {
      en: {
        // Navbar
        brandTitle: "CYBER<span>OPS</span> ACADEMY",
        brandSub: "European Bachelor in Cybersecurity & Networks • MIAGE / FEDE",
        navHomepage: "🏠 Home",
        audioEnabled: "🔊 Sound",
        audioMuted: "🔇 Muted",
        terminalBtn: "💻 Terminal",
        aiSettingsBtn: "⚡ AI Mentor",

        // Portal View Tabs
        tabHome: "🏠 Home",
        tabCurriculum: "📚 Curriculum (19 Modules)",
        tabLabs: "🧪 Cyber Labs (6 Labs)",
        tabCtf: "🚩 CTF Arena (8 Challenges)",
        tabMitre: "🦅 MITRE ATT&CK",
        tabWargame: "🚨 SOC Crisis Wargame",
        tabExam: "⏱️ FEDE Exam Simulator",
        tabFlashcards: "🗂️ Flashcards (SRS)",
        tabScanner: "🔍 Code & Log Scanner",
        tabTutorials: "🎓 Video Guides & Tutorials",
        tabCareer: "🧭 Career Roadmaps",
        tabCheatsheets: "⚡ Cyber Cheat Sheets",
        btnBadgesPassport: "🏆 Badges",
        btnGuidedTour: "🧭 Tour",
        btnGlossary: "📖 Glossary",
        btnDiagnostic: "🎯 Start",
        modeProgressive: "🎮 Progressive",
        modeFreeAccess: "🔓 Free Access",

        // Landing Page
        landingPill: "🛡️ CYBEROPS ACADEMY • EUROPEAN BACHELOR MIAGE / FEDE",
        landingHeadlineMain: "One platform.",
        landingHeadlineHighlight: "Total mastery.",
        landingSubtitle: "European Bachelor in Cybersecurity & Networks — 19 academic modules, in-browser live labs, CTF arena, MITRE ATT&CK matrix, crisis wargames, and multi-model AI.",
        btnLaunchApp: "🚀 Launch Command Center",
        btnExploreLabs: "🧪 Explore Cyber Labs",
        trustFede: "FEDE & MIAGE Accredited",
        trustBrowser: "100% In-Browser Interactive",
        trustBilingual: "Bilingual EN / FR",
        trustAi: "Multi-Model AI Mentor",
        statModulesLbl: "Academic Modules",
        statLabsLbl: "Virtual Labs",
        statCtfLbl: "CTF Challenges",
        statTechniquesLbl: "MITRE Techniques",
        statWargameLbl: "SOC Crisis Wargames",
        statFreeLbl: "Free & In-Browser",
        featuresTag: "Advanced Cybersecurity Architecture",
        featuresTitle: "Engineered for Future SOC Analysts & Security Engineers",
        featuresSubtitle: "Everything you need to master offensive and defensive cybersecurity in one unified, hands-on environment.",
        featLabsTitle: "In-Browser Cyber Labs",
        featLabsDesc: "Deep-dive into Wireshark packet captures, SQL injection sandboxes, VLSM subnetting calculators, and cryptanalysis decoders.",
        featWargameTitle: "Live SOC Crisis Wargame",
        featWargameDesc: "Assume incident commander role during live enterprise attacks. Contain ransomware outbreaks, stop APT DNS tunneling, and prevent cloud Kerberoasting.",
        featMitreTitle: "MITRE ATT&CK Matrix",
        featMitreDesc: "Explore all 13 Enterprise tactics and 26 techniques with mapped SIEM detection rules, APT threat actor profiles, and defensive mitigations.",
        featCtfTitle: "Hands-on CTF Arena",
        featCtfDesc: "Tackle 8 multi-category capture the flag puzzles. Decode Base64/Hex/ROT13 payloads, bypass login logic, and validate flags with SHA-256.",
        featExamTitle: "FEDE Exam Simulator",
        featExamDesc: "Prepare for the European Bachelor certification with randomized 60-question exams, timer controls, detailed breakdowns, and printable diploma.",
        featFlashcardsTitle: "Spaced Repetition Flashcards",
        featFlashcardsDesc: "Reinforce protocol ports, RFC standards, cryptographic primitives, and forensics commands using the scientifically-proven Leitner system.",
        featTutorialsTitle: "Video Masterclasses & Beginner Guides",
        featTutorialsDesc: "Step-by-step video tutorials and ELIF5 breakdowns covering every platform feature and cyber fundamental in exhaustive detail.",
        featCareerTitle: "Interactive Career Roadmaps",
        featCareerDesc: "Select between SOC Analyst, Ethical Hacker, DevSecOps, and GRC Auditor with structured milestone tracks and salary benchmarks.",
        featThreatRadarTitle: "Live Global Threat Radar",
        featThreatRadarDesc: "Simulated real-time cyber attack map with vector arcs, global targets, and streaming SIEM telemetry.",
        btnLaunchSection: "Launch Experience →",
        bottomCtaTitle: "Ready to Accelerate Your Cybersecurity Career?",
        bottomCtaDesc: "Join the elite cohort of European Bachelor candidates mastering modern network defense, DevSecOps, and incident response.",

        // Landing Navbar Links
        navLandingOverview: "Overview",
        navLandingSyllabus: "Syllabus",
        navLandingSteps: "How It Works",
        navLandingFeatures: "Capabilities",
        navLandingTutorials: "Tutorials & Videos",
        navLandingCareer: "Career Roadmaps",

        // Tutorials & Video Masterclasses Hub
        tutHeaderTitle: "🎓 Cybersecurity Video Masterclasses & Zero-to-Hero Guides",
        tutHeaderSub: "Comprehensive, step-by-step video tutorials with ELIF5 (Explain Like I'm 5) breakdowns, interactive quizzes, and direct hands-on practice. Designed specifically for beginners so nobody gets left behind.",
        tutSearchPlaceholder: "🔍 Search tutorials, video guides, keywords (Wireshark, SQLi, Linux, CTF, Nmap)...",
        tutFilterAll: "All Tutorials",
        tutFilterBeginners: "🚀 Complete Beginners (Zero Knowledge)",
        tutFilterLabs: "🧪 Cyber Labs Walkthroughs",
        tutFilterCtf: "🚩 CTF Arena Masterclass",
        tutFilterMitre: "🦅 MITRE ATT&CK & Threat Intel",
        tutFilterWargame: "🚨 SOC Crisis Response",
        tutFilterExam: "⏱️ Exam Prep & Memory Hacking",
        tutStatTotal: "Total Masterclasses",
        tutStatCompleted: "Tutorials Completed",
        tutStatWatchTime: "Total Watch Time",
        tutStatXpEarned: "XP Earned",
        tutElif5Title: "💡 Explain Like I'm 5 (Zero Jargon)",
        tutKeyTermsTitle: "🔑 Key Terms & Concepts",
        tutStepsTitle: "🛠️ Step-by-Step Hands-On Procedure",
        tutPitfallsTitle: "⚠️ Common Beginner Mistakes & Traps",
        tutQuizTitle: "🎯 Knowledge Check Mini-Quiz",
        tutMarkCompleteBtn: "✓ Mark as Watched & Completed (+50 XP)",
        tutCompletedBadge: "✓ Completed (+50 XP)",
        tutModalClose: "✕ Close Tutorial",
        tutWatchBtn: "▶ Watch Video & Step-by-Step Guide",
        tutChaptersTitle: "📑 Video Chapters & Milestones",

        explainTag: "Academic & Hands-on Pedagogy",
        explainTitle: "What is CyberOps Academy?",
        explainSub: "A comprehensive, 100% interactive learning environment built specifically for the European Bachelor in Cybersecurity & Networks (MIAGE / FEDE).",
        pillar1Title: "Official 19-Module Syllabus",
        pillar1Desc: "Structured European academic program covering Linux/Windows systems, Cisco networks, Cryptography, DevSecOps, and ISO 27001 governance.",
        pillar2Title: "6 In-Browser Virtual Labs",
        pillar2Desc: "Real-world Wireshark packet captures, SQL injection sandboxes, VLSM subnetting calculators, and cryptanalysis decoders with zero installation.",
        pillar3Title: "Live SOC Incident Simulation",
        pillar3Desc: "Train like a SOC Analyst. Contain ransomware outbreaks, stop APT DNS tunneling, crack CTF ciphers, and earn European credentials.",
        stepsTag: "Student Workflow",
        stepsTitle: "How It Works in 3 Simple Steps",
        step1Title: "1. Student Authentication",
        step1Desc: "Access your student workspace using your academic email and credentials to begin tracking coursework and certifications.",
        step2Title: "2. Complete Modules & Unlock Labs",
        step2Desc: "Earn XP, unlock advanced MITRE tactics, crack CTF ciphers, and defend hybrid enterprise servers in crisis wargames.",
        step3Title: "3. Pass FEDE Certification Exam",
        step3Desc: "Test yourself against the 60-question timed European Bachelor simulator and export your official validation certificate.",

        // Student Auth Modal
        authModalTitle: "Student Portal Access",
        authModalSub: "European Bachelor in Cybersecurity & Networks",
        authTabSignIn: "🔑 Sign In",
        authTabSignUp: "✨ Sign Up",
        authEmail: "Student Email / FEDE ID",
        authPass: "Password",
        authName: "Full Student Name",
        authProgram: "Academic Specialization",
        authBtnSignIn: "🚀 Sign In to Academy",
        authBtnSignUp: "✨ Create Student Account",
        oauthTitle: "Instant Social & Developer OAuth",
        oauthGoogle: "Google",
        oauthGithub: "GitHub",
        oauthDiscord: "Discord",
        oauthOrEmail: "OR CONTINUE WITH ACADEMIC EMAIL",
        rememberMe: "Remember this device",
        forgotPass: "Forgot password?",
        passStrengthTitle: "Password Security Strength",
        strengthWeak: "Weak",
        strengthMedium: "Medium",
        strengthStrong: "Strong",
        strengthMaster: "Cyber Master",
        noAccountPrompt: "Don't have an account?",
        hasAccountPrompt: "Already have an account?",
        academicTrack: "Academic Track",
        signedInAs: "Student:",
        btnSignOut: "Sign Out",

        // Live SOC Crisis Wargame
        wargameTitle: "🚨 Live SOC Incident Response Crisis Wargame",
        wargameSub: "Assume command during live critical enterprise security incidents. Contain ransomware, mitigate APT exfiltration, and defend hybrid infrastructures.",

        // MITRE ATT&CK Matrix Navigator
        mitreTitle: "🦅 MITRE ATT&CK Matrix Interactive Navigator",
        mitreSub: "Explore Enterprise attack tactics, techniques, real-world APT threat actors, SIEM detection rules, and remediation mapping.",
        mitreSearchPlaceholder: "Search techniques, IDs (e.g. T1059), or keywords...",

        // CTF Arena
        ctfTitle: "🚩 CTF Challenges & Hands-on Puzzle Arena",
        ctfSub: "Analyze network traffic captures, crack ciphers, exploit web vulnerabilities, and submit flags.",
        ctfDecoderTitle: "⚡ Interactive Quick-Decoder Tool (Base64, Hex, ROT13, URL)",
        ctfAll: "All Challenges",
        ctfSolved: "✓ Solved",
        ctfUnsolved: "⏳ Unsolved",

        // Hero Dashboard
        heroTitle: "Security Operations Command Center 🚀",
        heroSub: "Master European academic milestones, execute in-browser security labs, train with multi-model AI, and prepare for FEDE certification.",
        completionRate: "Curriculum Completion Rate (Progression Globale)",
        statModules: "Validated Modules",
        statXp: "SecOps Experience",
        statStreak: "Study Streak",
        pomodoroTitle: "Pomodoro Focus Timer",
        pomodoroStart: "▶ Start",
        pomodoroPause: "⏸ Pause",

        // Ranks
        rankL1: "Script Cadet",
        rankL2: "Network Sentinel",
        rankL3: "SOC Analyst L1",
        rankL4: "Threat Hunter L2",
        rankL5: "Security Architect",
        rankL6: "SecOps Commander",

        // Curriculum Filter Pills
        filterAll: "All Modules (19)",
        filterPhase1: "Phase 1: Foundations",
        filterPhase2: "Phase 2: Hardening",
        filterPhase3: "Phase 3: AppSec & SOC",
        filterPhase4: "Phase 4: Governance",
        filterPhase5: "Phase 5: FEDE Core",
        filterCompleted: "✓ Validated",
        filterInProgress: "⏳ In Progress",
        searchPlaceholder: "🔍 Search modules, Linux commands, SQL, ISO 27001...",
        exploreDossier: "Explore Syllabus, Labs & Cheat Sheet →",

        // Modal Dossier Tabs
        tabSyllabus: "📖 Syllabus & Content",
        tabCheats: "⚡ Commands & Cheat Sheet",
        tabPracticalLabs: "🧪 Hands-on Labs",
        tabQuiz: "🎯 Knowledge Check (QCM)",
        tabCerts: "🏆 Certifications & Notes",
        tabAi: "🤖 Aegis AI Professor",

        // Labs
        labsHubTitle: "🧪 Interactive Cyber Security Labs Hub",
        labsHubSub: "Test cryptographic primitives, calculate CIDR bitmasks, exploit and patch SQL injections, audit code with AI, inspect packet exchanges, and estimate password cracking resistance.",
        labCrypto: "🔐 Cryptography Lab",
        labSubnet: "🌐 CIDR & Subnet Calculator",
        labSqli: "🛡️ SQLi Sandbox",
        labScanner: "🔍 AI Code & Log Scanner",
        labPacket: "📦 TCP 3-Way Handshake",
        labPassword: "🔑 Password Entropy & Cracker",

        // Exam Simulator
        examTitle: "FEDE European Bachelor Examination Simulator",
        examIntroDesc: "Official timed examination simulator for the Bachelor Européen Cybersécurité et Gestion des Réseaux (Groupe MIAGE / FEDE).",
        examRule1: "⏱️ Duration: 15 Minutes timed countdown",
        examRule2: "📋 Format: 10 randomized multiple-choice questions across all 19 modules",
        examRule3: "🎯 Passing Standard: Minimum 10/20 (50%) required for diploma validation",
        examRule4: "📜 Official Deliverable: Printable European Certificate of Achievement with verification signature",
        btnStartExam: "🚀 Begin Timed Examination",
        btnPrev: "← Previous",
        btnNext: "Next →",
        btnFlag: "🏳️ Flag for Review",
        btnSubmitExam: "✓ Submit & Finalize Exam",
        retakeExam: "🔄 Retake Exam",
        viewCert: "📜 View Certificate of Achievement",

        // Flashcards
        fcTitle: "🗂️ Cybersecurity Spaced Repetition Flashcards",
        fcSub: "Click card or press Space to flip. Use arrow keys to navigate.",
        fcFlip: "🔄 Flip Card",
        fcMaster: "✓ Mark Mastered (+15 XP)",

        // Terminal
        termTitle: "⚡ AEGIS CYBER TERMINAL v2.8 [BASH / POWERSHELL EMULATOR]",
        termPlaceholder: "Type a command (help, modules, show, scan, ai, status)...",

        // Authentication & Student Portal
        authModalTitle: "CyberOps Student Portal",
        authModalSub: "European Bachelor in Cybersecurity & Networks • MIAGE / FEDE",
        authSocialLabel: "Fast Access via Academic SSO",
        authDivider: "OR CONTINUE WITH EMAIL",
        authTabSignIn: "🔑 Sign In",
        authTabSignUp: "✨ Create Account",
        authEmailLabel: "Academic Email Address",
        authPasswordLabel: "Security Password",
        authNewPasswordLabel: "Master Password",
        authFullNameLabel: "Full Name",
        authSpecLabel: "Academic Specialization",
        authForgotPass: "Forgot?",
        authBtnSignIn: "⚡ Authenticate & Access Command Center",
        authBtnSignUp: "🛡️ Enroll & Launch Cadet Passport",
        authSignOut: "🚪 Sign Out"
      },
      fr: {
        // Navbar
        brandTitle: "CYBER<span>OPS</span> ACADÉMIE",
        brandSub: "Bachelor Européen en Cybersécurité et Gestion des Réseaux • MIAGE / FEDE",
        navHomepage: "🏠 Accueil",
        audioEnabled: "🔊 Son",
        audioMuted: "🔇 Muet",
        terminalBtn: "💻 Terminal",
        aiSettingsBtn: "⚡ Mentor IA",

        // Portal View Tabs
        tabHome: "🏠 Accueil",
        tabCurriculum: "📚 Programme (19 Modules)",
        tabLabs: "🧪 Laboratoires Cyber (6 Labs)",
        tabCtf: "🚩 Arène CTF (8 Défis)",
        tabMitre: "🦅 MITRE ATT&CK",
        tabWargame: "🚨 Wargame Crise SOC",
        tabExam: "⏱️ Simulateur d'Examen FEDE",
        tabFlashcards: "🗂️ Cartes Mémoire (SRS)",
        tabScanner: "🔍 Scanner Code & Logs",
        tabTutorials: "🎓 Tutoriels Vidéo & Guides",
        tabCareer: "🧭 Parcours Métiers",
        tabCheatsheets: "⚡ Aide-Mémoire & Payloads",
        btnBadgesPassport: "🏆 Badges",
        btnGuidedTour: "🧭 Visite",
        btnGlossary: "📖 Glossaire",
        btnDiagnostic: "🎯 Débuter",
        modeProgressive: "🎮 Progressif",
        modeFreeAccess: "🔓 Accès Libre",

        // Landing Page
        landingPill: "🛡️ CYBEROPS ACADÉMIE • BACHELOR EUROPÉEN MIAGE / FEDE",
        landingHeadlineMain: "Une plateforme.",
        landingHeadlineHighlight: "Maîtrise totale.",
        landingSubtitle: "Bachelor Européen en Cybersécurité et Réseaux — 19 modules académiques, laboratoires pratiques, arène CTF, matrice MITRE ATT&CK, wargames de crise et IA multi-modèles.",
        btnLaunchApp: "🚀 Lancer le Centre de Commandement",
        btnExploreLabs: "🧪 Explorer les Laboratoires",
        trustFede: "Accrédité FEDE & MIAGE",
        trustBrowser: "100% Interactif dans le Navigateur",
        trustBilingual: "Bilingual EN / FR",
        trustAi: "Mentor IA Multi-Modèles",
        statModulesLbl: "Modules Académiques",
        statLabsLbl: "Laboratoires Virtuels",
        statCtfLbl: "Défis CTF",
        statTechniquesLbl: "Techniques MITRE",
        statWargameLbl: "Wargames de Crise SOC",
        statFreeLbl: "Gratuit & En Navigateur",
        featuresTag: "Architecture de Cybersécurité Avancée",
        featuresTitle: "Conçu pour les Futurs Analystes SOC & Ingénieurs Sécurité",
        featuresSubtitle: "Tout ce dont vous avez besoin pour maîtriser la cybersécurité offensive et défensive dans un environnement unifié et pratique.",
        featLabsTitle: "Laboratoires Cyber en Navigateur",
        featLabsDesc: "Plongez dans les captures de paquets Wireshark, bac à sable d'injection SQL, calculateurs de sous-réseaux VLSM et décodeurs cryptographiques.",
        featWargameTitle: "Simulateur de Crise SOC en Direct",
        featWargameDesc: "Prenez le rôle de commandant d'incident lors d'attaques d'entreprise en direct. Contenez les ransomwares, stoppez le tunneling DNS APT et prévenez le Kerberoasting.",
        featMitreTitle: "Matrice MITRE ATT&CK",
        featMitreDesc: "Explorez les 13 tactiques d'entreprise et 26 techniques avec règles de détection SIEM, profils d'acteurs de menaces APT et remédiations.",
        featCtfTitle: "Arène de Défis CTF Pratiques",
        featCtfDesc: "Relevez 8 énigmes de capture du drapeau multi-catégories. Décodez des payloads Base64/Hex/ROT13, contournez les authentifications et validez vos flags.",
        featExamTitle: "Simulateur d'Examen FEDE",
        featExamDesc: "Préparez la certification du Bachelor Européen avec des examens aléatoires de 60 questions, chronomètre, correction détaillée et diplôme officiel.",
        featFlashcardsTitle: "Cartes Mémoire à Répétition Espacée",
        featFlashcardsDesc: "Mémorisez durablement les ports de protocoles, normes RFC, primitives cryptographiques et commandes d'investigation numérique avec le système Leitner.",
        featTutorialsTitle: "Masterclasses Vidéo & Guides Débutants",
        featTutorialsDesc: "Tutoriels vidéo détaillés et explications simplifiées (ELIF5) couvrant chaque fonctionnalité et concept sans prérequis.",
        featCareerTitle: "Feuilles de Route Métiers Interactives",
        featCareerDesc: "Choisissez entre Analyste SOC, Pentesteur, DevSecOps et Auditeur GRC avec jalons structurés et fourchettes de salaires.",
        featThreatRadarTitle: "Radar Mondial des Menaces en Direct",
        featThreatRadarDesc: "Cartographie interactive des cyberattaques avec arcs vectoriels, cibles mondiales et flux SIEM en temps réel.",
        btnLaunchSection: "Lancer l'Expérience →",
        bottomCtaTitle: "Prêt à Accélérer Votre Carrière en Cybersécurité ?",
        bottomCtaDesc: "Rejoignez la cohorte d'élite des candidats au Bachelor Européen maîtrisant la défense réseau moderne, le DevSecOps et la réponse aux incidents.",

        // Landing Navbar Links
        navLandingOverview: "Présentation",
        navLandingSyllabus: "Programme",
        navLandingSteps: "Fonctionnement",
        navLandingFeatures: "Fonctionnalités",
        navLandingTutorials: "Tutoriels & Vidéos",
        navLandingCareer: "Parcours Métiers",

        // Tutorials & Video Masterclasses Hub
        tutHeaderTitle: "🎓 Masterclasses Vidéo Cybersécurité & Guides Débutants",
        tutHeaderSub: "Des tutoriels vidéo complets pas-à-pas avec explications sans jargon (ELIF5), quiz interactifs et exercices pratiques. Conçu pour que personne ne soit perdu.",
        tutSearchPlaceholder: "🔍 Rechercher un tutoriel, vidéo, mot-clé (Wireshark, SQLi, Linux, CTF, Nmap)...",
        tutFilterAll: "Tous les Tutoriels",
        tutFilterBeginners: "🚀 Débutants Absolus (Zéro Prérequis)",
        tutFilterLabs: "🧪 Guides des Laboratoires Virtuels",
        tutFilterCtf: "🚩 Masterclass Arène CTF",
        tutFilterMitre: "🦅 MITRE ATT&CK & Menaces APT",
        tutFilterWargame: "🚨 Gestion de Crise SOC",
        tutFilterExam: "⏱️ Stratégie Examen & Mémorisation",
        tutStatTotal: "Total Masterclasses",
        tutStatCompleted: "Tutoriels Validés",
        tutStatWatchTime: "Temps Total de Visionnage",
        tutStatXpEarned: "XP Remportée",
        tutElif5Title: "💡 Explication Simplifiée (Sans Jargon)",
        tutKeyTermsTitle: "🔑 Notions Clés & Vocabulaire",
        tutStepsTitle: "🛠️ Procédure Pratique Pas-à-Pas",
        tutPitfallsTitle: "⚠️ Erreurs Classiques à Éviter",
        tutQuizTitle: "🎯 Mini-Quiz de Validation des Connaissances",
        tutMarkCompleteBtn: "✓ Marquer comme Vu & Validé (+50 XP)",
        tutCompletedBadge: "✓ Validé (+50 XP)",
        tutModalClose: "✕ Fermer le Tutoriel",
        tutWatchBtn: "▶ Visionner la Vidéo & Guide Détaillé",
        tutChaptersTitle: "📑 Chapitres Vidéo & Repères",

        explainTag: "Pédagogie Académique & Pratique",
        explainTitle: "Qu'est-ce que CyberOps Academy ?",
        explainSub: "Un environnement d'apprentissage complet et 100% interactif conçu spécifiquement pour le Bachelor Européen en Cybersécurité & Réseaux (MIAGE / FEDE).",
        pillar1Title: "Syllabus Officiel de 19 Modules",
        pillar1Desc: "Programme académique européen structuré couvrant Systèmes Linux/Windows, Réseaux Cisco, Cryptographie, DevSecOps et Gouvernance ISO 27001.",
        pillar2Title: "6 Laboratoires Virtuels en Navigateur",
        pillar2Desc: "Captures de trames Wireshark, bac à sable d'injections SQL, calculateurs de sous-réseaux VLSM et décodeurs cryptographiques sans aucune installation.",
        pillar3Title: "Simulation d'Incidents SOC en Direct",
        pillar3Desc: "Entraînez-vous comme un analyste SOC. Contenez des ransomwares réels, stoppez le tunneling DNS APT, résolvez des défis CTF et préparez l'examen FEDE.",
        stepsTag: "Parcours Étudiant",
        stepsTitle: "Comment ça marche en 3 étapes simples",
        step1Title: "1. Authentification Étudiante",
        step1Desc: "Accédez à votre espace académique avec votre email universitaire et vos identifiants pour démarrer votre formation.",
        step2Title: "2. Validez les Modules & Débloquez les Labs",
        step2Desc: "Gagnez de l'XP, débloquez les tactiques MITRE, résolvez des défis CTF et défendez les serveurs d'entreprise en temps réel.",
        step3Title: "3. Réussissez l'Examen FEDE Certifié",
        step3Desc: "Mesurez-vous au simulateur chronométré de 60 questions du Bachelor Européen et exportez votre attestation officielle.",

        // Student Auth Modal
        authModalTitle: "Accès au Portail Étudiant",
        authModalSub: "Bachelor Européen en Cybersécurité & Réseaux",
        authTabSignIn: "🔑 Connexion",
        authTabSignUp: "✨ Inscription",
        authEmail: "Email Étudiant / Identifiant FEDE",
        authPass: "Mot de passe",
        authName: "Nom & Prénom Étudiant",
        authProgram: "Spécialisation Académique",
        authBtnSignIn: "🚀 Se Connecter à l'Académie",
        authBtnSignUp: "✨ Créer un Compte Étudiant",
        oauthTitle: "Connexion Rapide via OAuth",
        oauthGoogle: "Google",
        oauthGithub: "GitHub",
        oauthDiscord: "Discord",
        oauthOrEmail: "OU CONTINUER AVEC EMAIL ACADÉMIQUE",
        rememberMe: "Mémoriser cet appareil",
        forgotPass: "Mot de passe oublié ?",
        passStrengthTitle: "Niveau de Sécurité du Mot de Passe",
        strengthWeak: "Faible",
        strengthMedium: "Moyen",
        strengthStrong: "Robuste",
        strengthMaster: "Niveau Cyber",
        noAccountPrompt: "Pas encore de compte ?",
        hasAccountPrompt: "Vous avez déjà un compte ?",
        academicTrack: "Parcours Académique",
        signedInAs: "Étudiant :",
        btnSignOut: "Déconnexion",

        // Live SOC Crisis Wargame
        wargameTitle: "🚨 Simulateur de Crise Cyber & Réponse aux Incidents SOC",
        wargameSub: "Prenez le commandement lors d'incidents critiques d'entreprise. Contenez des ransomwares, stoppez les exfiltrations APT et protégez les infrastructures hybrides.",

        // MITRE ATT&CK Matrix Navigator
        mitreTitle: "🦅 Navigateur Interactif de la Matrice MITRE ATT&CK",
        mitreSub: "Explorez les tactiques, techniques d'attaque d'entreprise, acteurs APT réels, règles de détection SIEM et remédiations.",
        mitreSearchPlaceholder: "Rechercher des techniques, identifiants (ex: T1059) ou mots-clés...",

        // CTF Arena
        ctfTitle: "🚩 Arène de Défis CTF & Énigmes Pratiques",
        ctfSub: "Analysez des captures réseau, cassez des chiffrements, exploitez des failles web et soumettez vos drapeaux.",
        ctfDecoderTitle: "⚡ Outil de Décodage Rapide Interactif (Base64, Hex, ROT13, URL)",
        ctfAll: "Tous les Défis",
        ctfSolved: "✓ Résolus",
        ctfUnsolved: "⏳ Non Résolus",

        // Hero Dashboard
        heroTitle: "Centre de Commandement des Opérations de Sécurité 🚀",
        heroSub: "Maîtrisez le programme européen, réalisez des laboratoires pratiques, entraînez-vous avec l'IA multi-modèles et préparez l'examen FEDE.",
        completionRate: "Taux d'Avancement Global du Programme",
        statModules: "Modules Validés",
        statXp: "Expérience SecOps",
        statStreak: "Série d'Étude",
        pomodoroTitle: "Minuteur de Concentration Pomodoro",
        pomodoroStart: "▶ Démarrer",
        pomodoroPause: "⏸ Pause",

        // Ranks
        rankL1: "Cadet Script",
        rankL2: "Sentinelle Réseau",
        rankL3: "Analyste SOC N1",
        rankL4: "Chasseur de Menaces N2",
        rankL5: "Architecte Sécurité",
        rankL6: "Commandant SecOps",

        // Curriculum Filter Pills
        filterAll: "Tous les Modules (19)",
        filterPhase1: "Phase 1 : Fondations",
        filterPhase2: "Phase 2 : Durcissement",
        filterPhase3: "Phase 3 : AppSec & SOC",
        filterPhase4: "Phase 4 : Gouvernance",
        filterPhase5: "Phase 5 : Tronc FEDE",
        filterCompleted: "✓ Validés",
        filterInProgress: "⏳ En Cours",
        searchPlaceholder: "🔍 Rechercher modules, commandes Linux, SQL, ISO 27001...",
        exploreDossier: "Explorer le Syllabus, Labs & Fiche Mémo →",

        // Modal Dossier Tabs
        tabSyllabus: "📖 Syllabus & Contenu",
        tabCheats: "⚡ Commandes & Fiche Mémo",
        tabPracticalLabs: "🧪 Travaux Pratiques (TP)",
        tabQuiz: "🎯 Contrôle des Connaissances (QCM)",
        tabCerts: "🏆 Certifications & Notes",
        tabAi: "🤖 Professeur Virtuel IA",

        // Labs
        labsHubTitle: "🧪 Pôle de Laboratoires Cyber Sécurité Interactifs",
        labsHubSub: "Expérimentez les primitives cryptographiques, calculez les masques CIDR, simulez les injections SQL et requêtes préparées, auditez du code avec l'IA et analysez les poignées de main TCP.",
        labCrypto: "🔐 Lab Cryptographie",
        labSubnet: "🌐 Calculateur CIDR & Sous-Réseau",
        labSqli: "🛡️ Bac à Sable SQLi",
        labScanner: "🔍 Scanner de Code & Logs IA",
        labPacket: "📦 Poignée de Main TCP (3-Way)",
        labPassword: "🔑 Entropie & Casseur de Mots de Passe",

        // Exam Simulator
        examTitle: "Simulateur d'Examen Officiel du Bachelor Européen FEDE",
        examIntroDesc: "Simulateur d'épreuve officielle chronométrée pour le Bachelor Européen en Cybersécurité et Gestion des Réseaux (Groupe MIAGE / FEDE).",
        examRule1: "⏱️ Durée de l'épreuve : 15 Minutes compte à rebours",
        examRule2: "📋 Format : 10 questions à choix multiples tirées au sort sur les 19 modules",
        examRule3: "🎯 Seuil d'admissibilité : Note minimale de 10/20 (50%) requise pour validation",
        examRule4: "📜 Livrable officiel : Attestation Européenne de Réussite imprimable avec signature numérique",
        btnStartExam: "🚀 Démarrer l'Examen Chronométré",
        btnPrev: "← Précédent",
        btnNext: "Suivant →",
        btnFlag: "🏳️ Marquer pour Révision",
        btnSubmitExam: "✓ Soumettre et Finaliser l'Examen",
        retakeExam: "🔄 Repasser l'Examen",
        viewCert: "📜 Consulter le Certificat de Réussite",

        // Flashcards
        fcTitle: "🗂️ Cartes Mémoire de Répétition Espacée (Cybersécurité)",
        fcSub: "Cliquez sur la carte ou appuyez sur Espace pour la retourner. Utilisez les flèches pour naviguer.",
        fcFlip: "🔄 Retourner la Carte",
        fcMaster: "✓ Marquer comme Maîtrisé (+15 XP)",

        // Terminal
        termTitle: "⚡ TERMINAL CYBER AEGIS v2.8 [ÉMULATEUR BASH / POWERSHELL]",
        termPlaceholder: "Tapez une commande (help, modules, show, scan, ai, status)...",

        // Authentication & Student Portal
        authModalTitle: "Portail Étudiant CyberOps",
        authModalSub: "Bachelor Européen en Cybersécurité & Réseaux • MIAGE / FEDE",
        authSocialLabel: "Accès Rapide via SSO Académique",
        authDivider: "OU CONTINUER AVEC EMAIL",
        authTabSignIn: "🔑 Se Connecter",
        authTabSignUp: "✨ Créer un Compte",
        authEmailLabel: "Adresse Email Académique",
        authPasswordLabel: "Mot de Passe de Sécurité",
        authNewPasswordLabel: "Mot de Passe Maître",
        authFullNameLabel: "Nom Complet",
        authSpecLabel: "Spécialisation Académique",
        authForgotPass: "Oublié ?",
        authBtnSignIn: "⚡ S'authentifier & Accéder au Command Center",
        authBtnSignUp: "🛡️ S'inscrire & Initialiser le Passeport",
        authSignOut: "🚪 Déconnexion"
      }
    };
  }

  getLanguage() {
    return this.currentLang;
  }

  t(key) {
    const lang = this.currentLang;
    if (this.translations[lang] && this.translations[lang][key] !== undefined) {
      return this.translations[lang][key];
    }
    return this.translations.en[key] || key;
  }

  setLanguage(lang) {
    if (lang !== 'en' && lang !== 'fr') return;
    this.currentLang = lang;
    localStorage.setItem('cyberops_lang', lang);

    document.documentElement.lang = lang;

    // Update active state of language toggle buttons
    document.querySelectorAll('#btn-lang-en, #btn-lang-en-landing').forEach(btn => btn.classList.toggle('active', lang === 'en'));
    document.querySelectorAll('#btn-lang-fr, #btn-lang-fr-landing').forEach(btn => btn.classList.toggle('active', lang === 'fr'));

    // Update DOM elements with data-i18n
    this.applyTranslations();

    // Re-render dynamic modules, hero, and active views
    if (window.ModuleViewer) window.ModuleViewer.render();
    if (window.CtfArena) window.CtfArena.render();
    if (window.MitreNav) window.MitreNav.render();
    if (window.WargameSim) window.WargameSim.renderScenarioSelector();
    if (window.TutorialsHub) window.TutorialsHub.render();
    if (window.CareerRoadmaps) window.CareerRoadmaps.render();
    if (window.CheatsheetVault) window.CheatsheetVault.render();
    if (window.BadgesPassport) window.BadgesPassport.renderNavbarBadgeCounter();
    if (window.app && window.app.updateHeroStats) window.app.updateHeroStats();
    if (window.app && window.app.updateProgressionModeButton) window.app.updateProgressionModeButton();
    if (window.app && window.app.updateNavTabLocks) window.app.updateNavTabLocks();

    if (window.CyberAudio) window.CyberAudio.playKeypress();
    if (window.CyberUtils) {
      window.CyberUtils.showToast(lang === 'fr' ? 'Langue changée : Français 🇫🇷' : 'Language switched: English 🇬🇧', 'info');
    }
  }

  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const text = this.t(key);
      if (text) {
        if (el.dataset.i18nAttr) {
          el.setAttribute(el.dataset.i18nAttr, text);
        } else {
          el.innerHTML = text;
        }
      }
    });

    // Handle placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      const text = this.t(key);
      if (text) el.placeholder = text;
    });
  }
}

window.CyberI18n = new CyberI18nEngine();
