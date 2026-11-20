/**
 * CyberOps Academy - Achievement Badges & Digital Cyber Passport Database
 * 12 collectible badges with XP rewards, difficulty ratings, and automated unlock criteria.
 */
window.BadgesData = [
  {
    id: "badge-welcome",
    icon: "🎖️",
    color: "#00f0ff",
    xpReward: 50,
    category: "milestone",
    en: {
      title: "Student Cadet Enrolled",
      desc: "Welcome to CyberOps Academy! Entered the command center and initialized your student profile."
    },
    fr: {
      title: "Cadet Inscrit",
      desc: "Bienvenue sur CyberOps Academy ! Accès au centre de commandement et profil étudiant initialisé."
    }
  },
  {
    id: "badge-first-mission",
    icon: "🎯",
    color: "#ffaa00",
    xpReward: 100,
    category: "milestone",
    en: {
      title: "First Breach Defended",
      desc: "Successfully completed the 4-step First-Day Mission: terminal verification, cipher decode, subnet audit, and threat quarantine."
    },
    fr: {
      title: "Première Intrusion Repoussée",
      desc: "Mission du premier jour accomplie : vérification du terminal, décodage, audit réseau et mise en quarantaine de l'IP hostile."
    }
  },
  {
    id: "badge-tutorial-master",
    icon: "🎓",
    color: "#10b981",
    xpReward: 50,
    category: "learning",
    en: {
      title: "Knowledge Seeker",
      desc: "Completed your first comprehensive Video Masterclass with ELIF5 breakdown and mini-quiz."
    },
    fr: {
      title: "Chercheur de Savoir",
      desc: "Premier tutoriel vidéo validé avec explication simplifiée (ELIF5) et mini-quiz réussi."
    }
  },
  {
    id: "badge-crypto-key",
    icon: "🔐",
    color: "#a855f7",
    xpReward: 75,
    category: "labs",
    en: {
      title: "Cipher Architect",
      desc: "Generated SHA-256 cryptographic hashes and tested symmetric AES-256-GCM encryption."
    },
    fr: {
      title: "Architecte du Chiffre",
      desc: "Calcul d'empreintes SHA-256 et chiffrement symétrique AES-256-GCM testés dans le laboratoire."
    }
  },
  {
    id: "badge-subnet-pro",
    icon: "🌐",
    color: "#38bdf8",
    xpReward: 75,
    category: "labs",
    en: {
      title: "CIDR Subnetting Pro",
      desc: "Calculated IP network boundaries, broadcast addresses, and usable host blocks."
    },
    fr: {
      title: "Expert Sous-Réseaux CIDR",
      desc: "Calcul des adresses réseau, adresses de diffusion et plages d'hôtes sans aucune erreur."
    }
  },
  {
    id: "badge-sqli-hunter",
    icon: "🛡️",
    color: "#ef4444",
    xpReward: 100,
    category: "security",
    en: {
      title: "Injection Slayer",
      desc: "Exploited web login authentication with SQLi and applied bulletproof Prepared Statements."
    },
    fr: {
      title: "Chasseur d'Injections",
      desc: "Contournement d'authentification SQLi exécuté et neutralisé avec des requêtes préparées."
    }
  },
  {
    id: "badge-packet-whisperer",
    icon: "📦",
    color: "#06b6d4",
    xpReward: 75,
    category: "labs",
    en: {
      title: "Packet Whisperer",
      desc: "Traced the SYN, SYN-ACK, and ACK 3-way handshake in the in-browser packet lab."
    },
    fr: {
      title: "Analyste de Paquets",
      desc: "Suivi pas à pas de la poignée de main TCP à 3 voies (SYN, SYN-ACK, ACK) dans le simulateur."
    }
  },
  {
    id: "badge-ctf-first-blood",
    icon: "🚩",
    color: "#ffaa00",
    xpReward: 150,
    category: "ctf",
    en: {
      title: "CTF First Blood",
      desc: "Cracked a cipher or exploit puzzle and validated your first official flag in the CTF Arena."
    },
    fr: {
      title: "Premier Flag CTF",
      desc: "Épreuve résolue et premier flag officiel validé par empreinte SHA-256 dans l'arène CTF."
    }
  },
  {
    id: "badge-mitre-scholar",
    icon: "🦅",
    color: "#f59e0b",
    xpReward: 100,
    category: "intel",
    en: {
      title: "ATT&CK Threat Scholar",
      desc: "Explored all 13 Enterprise Tactics and mapped SIEM detection rules to adversary techniques."
    },
    fr: {
      title: "Stratège MITRE ATT&CK",
      desc: "Exploration des 13 tactiques d'entreprise et association de règles SIEM aux techniques adverses."
    }
  },
  {
    id: "badge-wargame-commander",
    icon: "🚨",
    color: "#ec4899",
    xpReward: 200,
    category: "wargame",
    en: {
      title: "Crisis Commander",
      desc: "Successfully isolated infected endpoints and resolved an active enterprise crisis in SOC Wargame."
    },
    fr: {
      title: "Commandant de Crise SOC",
      desc: "Isolement réseau ordonné et crise d'entreprise majeure résolue dans le simulateur SOC."
    }
  },
  {
    id: "badge-srs-ninja",
    icon: "🗂️",
    color: "#10b981",
    xpReward: 75,
    category: "learning",
    en: {
      title: "Active Recall Ninja",
      desc: "Trained your long-term memory with 3D Spaced Repetition (SRS) flashcards."
    },
    fr: {
      title: "Maître du Rappel Actif",
      desc: "Mémorisation durable entraînée avec les flashcards 3D et l'algorithme de répétition espacée."
    }
  },
  {
    id: "badge-fede-certified",
    icon: "⏱️",
    color: "#6366f1",
    xpReward: 300,
    category: "certification",
    en: {
      title: "European Bachelor Laureate",
      desc: "Scored 70%+ on the official 60-question timed FEDE Exam Simulator and earned your verified diploma."
    },
    fr: {
      title: "Lauréat du Bachelor Européen",
      desc: "Note supérieure à 70% obtenue à l'examen officiel FEDE de 60 questions et diplôme généré."
    }
  },
  {
    id: "badge-secops-legend",
    icon: "👑",
    color: "#eab308",
    xpReward: 500,
    category: "elite",
    en: {
      title: "SecOps Supreme Commander",
      desc: "Attained Level 6 elite rank with over 4,000 XP across curriculum, labs, CTF, and wargames."
    },
    fr: {
      title: "Commandant Suprême SecOps",
      desc: "Rang élite Niveau 6 atteint avec plus de 4 000 XP cumulés sur l'ensemble de la plateforme."
    }
  }
];
