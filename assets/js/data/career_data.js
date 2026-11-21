/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <0dh4mm@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - Professional Cybersecurity Career Roadmaps Database
 * Structured bilingual pathways (EN & FR) for 4 high-demand industry specializations:
 * 1. SOC Analyst & Incident Responder (Blue Team)
 * 2. Ethical Hacker & Penetration Tester (Red Team)
 * 3. DevSecOps & Cloud Security Architect
 * 4. GRC Analyst & ISO 27001 Auditor (Governance, Risk & Compliance)
 */
window.CareerRoadmapsData = [
  {
    id: "soc_analyst",
    icon: "🛡️",
    badge: "BLUE TEAM DEFENSE",
    color: "#00f0ff",
    en: {
      title: "SOC Analyst & Incident Responder",
      tagline: "Defend enterprise networks, investigate SIEM telemetry, and contain high-severity cyber attacks.",
      targetRoles: ["SOC Analyst L1/L2", "Incident Response Officer", "Threat Hunter", "SIEM Detection Engineer"],
      salary: "€45,000 – €75,000 / $75,000 – $115,000",
      overview: "Security Operations Center (SOC) analysts are the frontline digital firefighters of cybersecurity. You monitor network traffic 24/7, analyze suspicious endpoint behavior, correlate SIEM alerts, and quarantine compromised hosts before ransomware or APTs can inflict damage.",
      certifications: ["CompTIA Security+", "CompTIA CySA+", "Blue Team Level 1 (BTL1)", "EC-Council ECIH", "GIAC Certified Incident Handler (GCIH)"],
      stages: [
        {
          stageNumber: 1,
          name: "Networking & Linux Foundations",
          description: "Master TCP/IP protocols, subnetting, Wireshark packet analysis, and essential Linux log navigation.",
          modules: ["mod-01", "mod-02"],
          labs: ["network", "packet"],
          tutorials: ["tut-01-welcome-cyber", "tut-02-cli-terminal", "tut-04-networking-subnet"]
        },
        {
          stageNumber: 2,
          name: "Threat Detection & MITRE ATT&CK",
          description: "Map adversary tactics to the MITRE framework, write Sigma SIEM rules, and inspect host memory artifacts.",
          modules: ["mod-08", "mod-14"],
          labs: ["scanner", "password"],
          tutorials: ["tut-06-packet-analysis", "tut-08-mitre-navigator"]
        },
        {
          stageNumber: 3,
          name: "Live SOC Crisis & Incident Containment",
          description: "Act as Incident Commander during multi-phase ransomware outbreaks, DNS exfiltration, and cloud Kerberoasting.",
          modules: ["mod-15"],
          labs: ["crypto"],
          tutorials: ["tut-09-soc-wargame"]
        },
        {
          stageNumber: 4,
          name: "European Bachelor Capstone Certification",
          description: "Consolidate long-term memory with SRS flashcards and validate academic mastery via the 60-question FEDE exam.",
          modules: ["mod-17", "mod-18"],
          labs: ["scanner"],
          tutorials: ["tut-10-srs-flashcards", "tut-11-fede-exam-prep"]
        }
      ]
    },
    fr: {
      title: "Analyste SOC & Réponse aux Incidents",
      tagline: "Défendez les réseaux d'entreprise, analysez la télémétrie SIEM et contenez les cyberattaques majeures.",
      targetRoles: ["Analyste SOC N1/N2", "Responsable Réponse à Incident", "Chasseur de Menaces (Threat Hunter)", "Ingénieur Détection SIEM"],
      salary: "45 000 € – 75 000 € / an",
      overview: "Les analystes SOC sont les pompiers du cyberespace. Vous surveillez les flux 24/7, analysez les comportements suspects sur les postes, corrélez les alertes SIEM et isolez les machines infectées avant la propagation des ransomwares.",
      certifications: ["CompTIA Security+", "CompTIA CySA+", "Blue Team Level 1 (BTL1)", "EC-Council ECIH", "GIAC Certified Incident Handler (GCIH)"],
      stages: [
        {
          stageNumber: 1,
          name: "Socle Réseau & Systèmes Linux",
          description: "Maîtrisez TCP/IP, le calcul de sous-réseaux, les captures Wireshark et l'analyse de journaux bash.",
          modules: ["mod-01", "mod-02"],
          labs: ["network", "packet"],
          tutorials: ["tut-01-welcome-cyber", "tut-02-cli-terminal", "tut-04-networking-subnet"]
        },
        {
          stageNumber: 2,
          name: "Détection des Menaces & MITRE ATT&CK",
          description: "Cartographiez les techniques adverses, rédigez des règles SIEM Sigma et analysez la mémoire vive.",
          modules: ["mod-08", "mod-14"],
          labs: ["scanner", "password"],
          tutorials: ["tut-06-packet-analysis", "tut-08-mitre-navigator"]
        },
        {
          stageNumber: 3,
          name: "Gestion de Crise SOC & Confinement",
          description: "Prenez le rôle de commandant d'incident face à des ransomwares, du tunneling DNS et des attaques Kerberos.",
          modules: ["mod-15"],
          labs: ["crypto"],
          tutorials: ["tut-09-soc-wargame"]
        },
        {
          stageNumber: 4,
          name: "Certification Bachelor Européen FEDE",
          description: "Ancrez vos connaissances avec les flashcards SRS et validez l'examen officiel de 60 questions.",
          modules: ["mod-17", "mod-18"],
          labs: ["scanner"],
          tutorials: ["tut-10-srs-flashcards", "tut-11-fede-exam-prep"]
        }
      ]
    }
  },
  {
    id: "pentester",
    icon: "⚔️",
    badge: "RED TEAM OFFENSE",
    color: "#ff0055",
    en: {
      title: "Ethical Hacker & Penetration Tester",
      tagline: "Simulate real-world adversary attacks to uncover vulnerabilities before malicious hackers exploit them.",
      targetRoles: ["Junior Penetration Tester", "Web Application Security Auditor", "Vulnerability Assessor", "Bug Bounty Hunter"],
      salary: "€50,000 – €85,000 / $85,000 – $130,000",
      overview: "Penetration testers think like attackers to protect organizations. With explicit legal authorization, you probe networks, break into web applications via SQLi/XSS, crack hashes, exploit privilege escalation flaws, and deliver actionable remediation blueprints to developers.",
      certifications: ["eLearnSecurity Junior Penetration Tester (eJPT)", "CompTIA PenTest+", "Offensive Security Certified Professional (OSCP)", "Certified Ethical Hacker (CEH)"],
      stages: [
        {
          stageNumber: 1,
          name: "Offensive Foundations & Reconnaissance",
          description: "Active port scanning with Nmap, DNS enumeration, banner grabbing, and Linux command-line exploitation.",
          modules: ["mod-01", "mod-03"],
          labs: ["network", "password"],
          tutorials: ["tut-01-welcome-cyber", "tut-02-cli-terminal", "tut-07-password-cracking"]
        },
        {
          stageNumber: 2,
          name: "Web Application Exploitation (OWASP Top 10)",
          description: "Exploit authentication bypasses, SQL injections, parameter tampering, and source code auditing.",
          modules: ["mod-07", "mod-09"],
          labs: ["websec", "scanner"],
          tutorials: ["tut-05-sqli-sandbox", "tut-12-ai-scanner"]
        },
        {
          stageNumber: 3,
          name: "Cryptanalysis & CTF Arena Puzzles",
          description: "Crack Caesar/ROT13 ciphers, decode Base64/Hex payloads, and solve multi-tier capture-the-flag challenges.",
          modules: ["mod-13"],
          labs: ["crypto"],
          tutorials: ["tut-03-crypto-lab", "tut-07-ctf-arena"]
        },
        {
          stageNumber: 4,
          name: "Offensive Reporting & Graduation",
          description: "Learn how to write executive pentest reports, prioritize CVSS scores, and validate European Bachelor standards.",
          modules: ["mod-16", "mod-19"],
          labs: ["scanner"],
          tutorials: ["tut-11-fede-exam-prep"]
        }
      ]
    },
    fr: {
      title: "Hacker Éthique & Testeur d'Intrusion (Pentester)",
      tagline: "Simulez des attaques réelles pour découvrir et corriger les failles avant les cybercriminels.",
      targetRoles: ["Pentesteur Junior", "Auditeur Sécurité Applicative Web", "Consultant Sécurité Offensive", "Chasseur de Primes aux Failles (Bug Hunter)"],
      salary: "50 000 € – 85 000 € / an",
      overview: "Les testeurs d'intrusion pensent comme des cyberattaquants pour mieux protéger les entreprises. Avec mandat légal, vous sondez les réseaux, exploitez les injections SQL/XSS, cassez des mots de passe et fournissez des recommandations de remédiation indispensables.",
      certifications: ["eLearnSecurity Junior Penetration Tester (eJPT)", "CompTIA PenTest+", "Offensive Security Certified Professional (OSCP)", "Certified Ethical Hacker (CEH)"],
      stages: [
        {
          stageNumber: 1,
          name: "Fondamentaux Offensifs & Reconnaissance",
          description: "Balayage de ports avec Nmap, énumération DNS, prise d'empreintes et maîtrise du terminal Linux.",
          modules: ["mod-01", "mod-03"],
          labs: ["network", "password"],
          tutorials: ["tut-01-welcome-cyber", "tut-02-cli-terminal", "tut-07-password-cracking"]
        },
        {
          stageNumber: 2,
          name: "Sécurité des Applications Web (OWASP Top 10)",
          description: "Exploitation d'injections SQL, contournement de login, falsification de requêtes et audit de code source.",
          modules: ["mod-07", "mod-09"],
          labs: ["websec", "scanner"],
          tutorials: ["tut-05-sqli-sandbox", "tut-12-ai-scanner"]
        },
        {
          stageNumber: 3,
          name: "Cryptanalyse & Arène de Défis CTF",
          description: "Cassez des chiffrements classiques, décodez des chaînes Base64/Hex et validez vos flags sous SHA-256.",
          modules: ["mod-13"],
          labs: ["crypto"],
          tutorials: ["tut-03-crypto-lab", "tut-07-ctf-arena"]
        },
        {
          stageNumber: 4,
          name: "Rapports d'Audit & Validation Européenne",
          description: "Rédigez des rapports de pentest exécutifs, pondérez les scores CVSS et validez le diplôme FEDE.",
          modules: ["mod-16", "mod-19"],
          labs: ["scanner"],
          tutorials: ["tut-11-fede-exam-prep"]
        }
      ]
    }
  },
  {
    id: "devsecops",
    icon: "☁️",
    badge: "CLOUD & DEVSECOPS",
    color: "#a855f7",
    en: {
      title: "DevSecOps & Cloud Security Architect",
      tagline: "Embed security into CI/CD automated pipelines, container registries, and hyperscale cloud infrastructure.",
      targetRoles: ["Cloud Security Engineer", "DevSecOps Specialist", "AppSec Engineer", "Infrastructure Security Architect"],
      salary: "€60,000 – €95,000 / $95,000 – $145,000",
      overview: "Modern organizations ship code continuously to AWS, Azure, and Google Cloud. DevSecOps architects ensure that security isn't a bottleneck at the end, but an automated gate integrated directly into Git repositories, Docker containers, Kubernetes clusters, and Terraform configurations.",
      certifications: ["AWS Certified Security - Specialty", "Certified Kubernetes Security Specialist (CKS)", "Certified Cloud Security Professional (CCSP)", "GitHub Security Certified"],
      stages: [
        {
          stageNumber: 1,
          name: "Linux Systems & Virtualization Foundations",
          description: "Master Linux system administration, bash automation, network bridges, and identity access fundamentals.",
          modules: ["mod-01", "mod-04"],
          labs: ["network", "password"],
          tutorials: ["tut-01-welcome-cyber", "tut-02-cli-terminal"]
        },
        {
          stageNumber: 2,
          name: "Automated SAST & Software Supply Chain",
          description: "Run automated static application security testing (SAST) and audit code for known CVEs and dependency flaws.",
          modules: ["mod-10", "mod-11"],
          labs: ["scanner", "websec"],
          tutorials: ["tut-05-sqli-sandbox", "tut-12-ai-scanner"]
        },
        {
          stageNumber: 3,
          name: "Cloud IAM & Cryptographic Microservices",
          description: "Harden cloud IAM roles, prevent Kerberoasting, and implement AES-256-GCM encryption in distributed apps.",
          modules: ["mod-13", "mod-16"],
          labs: ["crypto"],
          tutorials: ["tut-03-crypto-lab", "tut-09-soc-wargame"]
        },
        {
          stageNumber: 4,
          name: "Enterprise Architecture & Bachelor Validation",
          description: "Design resilient multi-cloud architectures adhering to European ISO 27001 and CIS benchmarks.",
          modules: ["mod-17", "mod-19"],
          labs: ["scanner"],
          tutorials: ["tut-11-fede-exam-prep"]
        }
      ]
    },
    fr: {
      title: "Architecte DevSecOps & Sécurité Cloud",
      tagline: "Intégrez la sécurité automatisée dans les pipelines CI/CD, les conteneurs et les architectures cloud.",
      targetRoles: ["Ingénieur Sécurité Cloud", "Spécialiste DevSecOps", "Ingénieur Sécurité Applicative (AppSec)", "Architecte Sécurité Infrastructure"],
      salary: "60 000 € – 95 000 € / an",
      overview: "Les entreprises déploient du code en continu sur AWS, Azure et GCP. L'ingénieur DevSecOps automatise les contrôles de sécurité au cœur des dépôts Git, conteneurs Docker, clusters Kubernetes et templates Terraform.",
      certifications: ["AWS Certified Security - Specialty", "Certified Kubernetes Security Specialist (CKS)", "Certified Cloud Security Professional (CCSP)", "GitHub Security Certified"],
      stages: [
        {
          stageNumber: 1,
          name: "Systèmes Linux & Fondations de Virtualisation",
          description: "Administration système Linux avancée, scripts bash, commutation réseau et gestion des identités.",
          modules: ["mod-01", "mod-04"],
          labs: ["network", "password"],
          tutorials: ["tut-01-welcome-cyber", "tut-02-cli-terminal"]
        },
        {
          stageNumber: 2,
          name: "Audit SAST Automatisé & Chaîne d'Approvisionnement",
          description: "Analyse statique du code source (SAST), détection des CVEs et sécurisation des dépendances logicielles.",
          modules: ["mod-10", "mod-11"],
          labs: ["scanner", "websec"],
          tutorials: ["tut-05-sqli-sandbox", "tut-12-ai-scanner"]
        },
        {
          stageNumber: 3,
          name: "Gestion des Accès Cloud (IAM) & Cryptographie",
          description: "Verrouillage des rôles IAM, prévention des attaques Kerberos et chiffrement symétrique AES-256-GCM.",
          modules: ["mod-13", "mod-16"],
          labs: ["crypto"],
          tutorials: ["tut-03-crypto-lab", "tut-09-soc-wargame"]
        },
        {
          stageNumber: 4,
          name: "Architecture d'Entreprise & Validation FEDE",
          description: "Conception d'architectures résilientes conformes aux standards européens ISO 27001 et CIS Benchmarks.",
          modules: ["mod-17", "mod-19"],
          labs: ["scanner"],
          tutorials: ["tut-11-fede-exam-prep"]
        }
      ]
    }
  },
  {
    id: "grc_auditor",
    icon: "📜",
    badge: "GOVERNANCE & AUDIT",
    color: "#ffaa00",
    en: {
      title: "GRC Analyst & ISO 27001 Auditor",
      tagline: "Govern enterprise risk, enforce European compliance (GDPR/NIS2), and align security with business goals.",
      targetRoles: ["GRC Analyst", "Information Security Officer (CISO assistant)", "ISO 27001 Lead Auditor", "Cyber Risk Consultant"],
      salary: "€50,000 – €85,000 / $80,000 – $125,000",
      overview: "GRC (Governance, Risk, and Compliance) professionals establish the policies, legal compliance, and risk frameworks that dictate how multi-million dollar corporations safeguard their digital assets. You translate complex security concepts into executive risk metrics.",
      certifications: ["ISO/IEC 27001 Lead Auditor / Implementer", "ISACA CISA (Certified Information Systems Auditor)", "ISACA CRISC (Risk & Information Systems Control)", "CIPP/E (Certified Information Privacy Professional/Europe)"],
      stages: [
        {
          stageNumber: 1,
          name: "Information Security Management Systems (ISMS)",
          description: "Understand ISO/IEC 27001 controls, PDCA continuous improvement cycle, and asset classification.",
          modules: ["mod-05", "mod-06"],
          labs: ["password"],
          tutorials: ["tut-01-welcome-cyber"]
        },
        {
          stageNumber: 2,
          name: "Cyber Risk Assessment Methodologies",
          description: "Apply EBIOS RM and ISO 27005 risk assessment matrices to identify attack vectors and calculate impact scores.",
          modules: ["mod-12", "mod-14"],
          labs: ["scanner"],
          tutorials: ["tut-08-mitre-navigator"]
        },
        {
          stageNumber: 3,
          name: "European Regulatory Frameworks (GDPR & NIS2)",
          description: "Audit data breach notification protocols, critical infrastructure resilience, and third-party supplier risk.",
          modules: ["mod-17", "mod-18"],
          labs: ["crypto"],
          tutorials: ["tut-09-soc-wargame", "tut-10-srs-flashcards"]
        },
        {
          stageNumber: 4,
          name: "FEDE European Bachelor Examination",
          description: "Pass the comprehensive 60-question academic exam and receive your verified European Bachelor diploma.",
          modules: ["mod-19"],
          labs: ["scanner"],
          tutorials: ["tut-11-fede-exam-prep"]
        }
      ]
    },
    fr: {
      title: "Analyste GRC & Auditeur ISO 27001",
      tagline: "Gouvernez le risque d'entreprise, pilotez la conformité européenne (RGPD / NIS 2) et alignez la sécurité.",
      targetRoles: ["Analyste GRC (Gouvernance, Risques, Conformité)", "Adjoint RSSI", "Auditeur Certifié ISO 27001", "Consultant en Gestion des Cyber-Risques"],
      salary: "50 000 € – 85 000 € / an",
      overview: "Les spécialistes GRC définissent les politiques de sécurité, gèrent les risques d'entreprise et garantissent la conformité réglementaire (RGPD, NIS 2, DORA). Vous traduisez les menaces techniques en décisions stratégiques pour la direction générale.",
      certifications: ["ISO/IEC 27001 Lead Auditor / Implementer", "ISACA CISA", "ISACA CRISC", "CIPP/E (Protection des Données Personnelles)"],
      stages: [
        {
          stageNumber: 1,
          name: "Systèmes de Management de la Sécurité (SMSI)",
          description: "Comprenez les exigences de l'ISO 27001, la boucle d'amélioration continue PDCA et la classification des actifs.",
          modules: ["mod-05", "mod-06"],
          labs: ["password"],
          tutorials: ["tut-01-welcome-cyber"]
        },
        {
          stageNumber: 2,
          name: "Méthodologies d'Analyse de Risques (EBIOS RM / ISO 27005)",
          description: "Appliquez les matrices de vraisemblance et d'impact pour cartographier les scénarios de cybermenace.",
          modules: ["mod-12", "mod-14"],
          labs: ["scanner"],
          tutorials: ["tut-08-mitre-navigator"]
        },
        {
          stageNumber: 3,
          name: "Réglementations Européennes (RGPD, NIS 2 & DORA)",
          description: "Supervisez les notifications de violation de données (CNIL/ANSSI) et la résilience des chaînes de sous-traitance.",
          modules: ["mod-17", "mod-18"],
          labs: ["crypto"],
          tutorials: ["tut-09-soc-wargame", "tut-10-srs-flashcards"]
        },
        {
          stageNumber: 4,
          name: "Examen Bachelor Européen FEDE",
          description: "Validez l'examen officiel de 60 questions et obtenez votre diplôme européen certifié.",
          modules: ["mod-19"],
          labs: ["scanner"],
          tutorials: ["tut-11-fede-exam-prep"]
        }
      ]
    }
  }
];
