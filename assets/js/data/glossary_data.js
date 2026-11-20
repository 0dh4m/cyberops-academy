/**
 * CyberOps Academy - Cyber Lexicon & Acronyms Glossary Database
 * 40+ essential cybersecurity terms and acronyms explained with zero jargon
 * and real-world analogies for complete beginners.
 * Fully bilingual (EN & FR).
 */
window.CyberGlossaryData = [
  {
    id: "siem",
    term: "SIEM",
    fullNameEn: "Security Information and Event Management",
    fullNameFr: "Gestion des Informations et des Événements de Sécurité",
    category: "blue_team",
    icon: "📹",
    en: {
      analogy: "Like a building's CCTV security control room that aggregates video feeds from every hallway, door, and elevator into one giant command wall.",
      definition: "A central platform that collects, aggregates, and correlates log data from servers, network devices, and firewalls in real time to detect security incidents."
    },
    fr: {
      analogy: "Comme la salle de contrôle vidéo d'un bâtiment qui rassemble les caméras de chaque couloir et porte sur un grand mur de surveillance.",
      definition: "Une plateforme centrale qui collecte, agrège et corrèle en temps réel les journaux (logs) de tous les serveurs et pare-feu pour détecter les cyberattaques."
    }
  },
  {
    id: "firewall",
    term: "Firewall",
    fullNameEn: "Network Security Boundary Filter",
    fullNameFr: "Pare-feu de Filtrage Réseau",
    category: "network",
    icon: "🧱",
    en: {
      analogy: "Like a security guard at the nightclub door checking IDs and guest lists: if you are not on the list or look suspicious, you cannot enter.",
      definition: "A network device or software that inspects incoming and outgoing traffic based on predetermined security rules, blocking unauthorized connections."
    },
    fr: {
      analogy: "Comme un vigile à l'entrée d'un club qui vérifie les pièces d'identité et la liste d'invités : si vous n'êtes pas sur la liste, vous ne rentrez pas.",
      definition: "Un équipement matériel ou logiciel qui filtre le trafic entrant et sortant selon des règles de sécurité prédéfinies pour bloquer les connexions non autorisées."
    }
  },
  {
    id: "dns",
    term: "DNS",
    fullNameEn: "Domain Name System",
    fullNameFr: "Système de Noms de Domaine",
    category: "network",
    icon: "📖",
    en: {
      analogy: "Like the contacts list in your smartphone: you don't remember 10-digit phone numbers, you tap 'Mom'. DNS translates friendly names like 'google.com' into IP addresses.",
      definition: "The Internet's phonebook system that translates human-readable domain names into machine-readable numerical IP addresses (IPv4/IPv6)."
    },
    fr: {
      analogy: "Comme le carnet d'adresses de votre smartphone : vous ne mémorisez pas les numéros à 10 chiffres, vous appuyez sur 'Maman'. Le DNS traduit 'google.com' en adresse IP.",
      definition: "L'annuaire d'Internet qui convertit les noms de domaine compréhensibles par les humains en adresses IP numériques compréhensibles par les machines."
    }
  },
  {
    id: "cidr",
    term: "CIDR",
    fullNameEn: "Classless Inter-Domain Routing",
    fullNameFr: "Routage Inter-Domaines sans Classe",
    category: "network",
    icon: "🌐",
    en: {
      analogy: "Like a postal zip code that groups neighborhood street addresses together so mail trucks don't have to navigate house-by-house.",
      definition: "A notation (e.g. 192.168.1.0/24) used to allocate IP addresses and define subnet masks efficiently, allowing routers to group network routes together."
    },
    fr: {
      analogy: "Comme un code postal qui regroupe les adresses d'un quartier pour que les camions de livraison n'aient pas à chercher maison par maison.",
      definition: "Une notation (ex. 192.168.1.0/24) utilisée pour allouer les adresses IP et définir les masques de sous-réseau afin d'optimiser le routage."
    }
  },
  {
    id: "edr",
    term: "EDR",
    fullNameEn: "Endpoint Detection and Response",
    fullNameFr: "Détection et Réponse sur les Terminaux",
    category: "blue_team",
    icon: "🕵️",
    en: {
      analogy: "Like an undercover detective stationed inside every office computer, recording every keystroke, opened file, and network handshake in case someone turns rogue.",
      definition: "Advanced software installed on laptops and servers that continuously monitors process activity, memory, and behavior to intercept malware and alert the SOC."
    },
    fr: {
      analogy: "Comme un détective infiltré dans chaque ordinateur de l'entreprise, enregistrant chaque action et fichier ouvert au cas où une anomalie surviendrait.",
      definition: "Un logiciel de pointe installé sur les ordinateurs et serveurs qui surveille en continu la mémoire et les processus pour neutraliser les malwares."
    }
  },
  {
    id: "soc",
    term: "SOC",
    fullNameEn: "Security Operations Center",
    fullNameFr: "Centre des Opérations de Sécurité",
    category: "blue_team",
    icon: "🛡️",
    en: {
      analogy: "Like a 24/7 city fire department headquarters, ready to dispatch firefighters the moment a smoke detector or heat sensor alarms.",
      definition: "A dedicated facility or team of cybersecurity professionals responsible for monitoring, analyzing, and defending an enterprise against cyber incidents around the clock."
    },
    fr: {
      analogy: "Comme une caserne de pompiers opérationnelle 24h/24, prête à intervenir à la moindre alerte de détecteur de fumée.",
      definition: "Une équipe ou un centre dédié de spécialistes en cybersécurité chargé de surveiller, analyser et défendre le système d'information de l'entreprise jour et nuit."
    }
  },
  {
    id: "apt",
    term: "APT",
    fullNameEn: "Advanced Persistent Threat",
    fullNameFr: "Menace Persistante Avancée",
    category: "threat_intel",
    icon: "🥷",
    en: {
      analogy: "Like a highly trained espionage spy team that quietly slips into a vault, hides in the ceiling for months, and slowly photographs blueprints without setting off alarms.",
      definition: "A stealthy, well-funded threat actor (often state-sponsored) that maintains an unauthorized, prolonged presence inside a network to steal sensitive intelligence."
    },
    fr: {
      analogy: "Comme une équipe d'espions surentraînés qui s'infiltre dans un coffre-fort, s'y cache pendant des mois et vole des documents secrets sans jamais déclencher l'alarme.",
      definition: "Un groupe de cyberattaquants sophistiqué et souvent financé par un État, qui s'infiltre discrètement et durablement dans un réseau pour exfiltrer des données sensibles."
    }
  },
  {
    id: "cve",
    term: "CVE",
    fullNameEn: "Common Vulnerabilities and Exposures",
    fullNameFr: "Vulnérabilités et Expositions Communes",
    category: "governance",
    icon: "🏷️",
    en: {
      analogy: "Like an official car recall bulletin with a unique tracking number (e.g., CVE-2021-44228) so mechanics worldwide know exactly which part is defective.",
      definition: "A publicly standardized catalog of known information security vulnerabilities and exposures, uniquely identified by year and number."
    },
    fr: {
      analogy: "Comme un rappel constructeur automobile officiel avec un numéro unique (ex. CVE-2021-44228) pour que tous les garages sachent quelle pièce réparer.",
      definition: "Un registre public standardisé de failles de sécurité connues, identifiées de manière unique par année et numéro pour faciliter leur suivi mondial."
    }
  },
  {
    id: "sqli",
    term: "SQLi",
    fullNameEn: "SQL Injection",
    fullNameFr: "Injection SQL",
    category: "red_team",
    icon: "💉",
    en: {
      analogy: "Like ordering at a coffee shop and saying: 'A black coffee, and also give me all the cash in the register --'. If the barista follows every word blindly, they hand over the money.",
      definition: "A web vulnerability where malicious SQL commands are inserted into user input fields, forcing the backend database to execute unauthorized queries and dump confidential tables."
    },
    fr: {
      analogy: "Comme commander un café en disant : 'Un café noir, et donne-moi aussi tout le contenu de la caisse --'. Si le serveur obéit aveuglément, il donne la caisse.",
      definition: "Une vulnérabilité web où du code SQL malveillant est injecté dans un formulaire pour forcer la base de données à exécuter des requêtes interdites et voler des données."
    }
  },
  {
    id: "xss",
    term: "XSS",
    fullNameEn: "Cross-Site Scripting",
    fullNameFr: "Script Inter-Sites",
    category: "red_team",
    icon: "📜",
    en: {
      analogy: "Like sticking a fake sign onto a public billboard that says 'Free Donuts inside, please hand your wallet to the person at the door'. Visitors trust the billboard and get tricked.",
      definition: "A vulnerability where an attacker injects malicious JavaScript into a trusted website, executing inside the browsers of unsuspecting visitors to hijack session tokens."
    },
    fr: {
      analogy: "Comme coller une fausse affiche sur un panneau municipal disant 'Pâtisseries gratuites, donnez votre portefeuille à l'accueil'. Les passants font confiance et se font piéger.",
      definition: "Une faille permettant à un pirate d'injecter du code JavaScript malveillant dans un site web pour voler les cookies ou sessions des utilisateurs qui visitent la page."
    }
  },
  {
    id: "mitre",
    term: "MITRE ATT&CK",
    fullNameEn: "Adversarial Tactics, Techniques, and Common Knowledge",
    fullNameFr: "Tactiques, Techniques et Connaissances Communes de l'Adversaire",
    category: "threat_intel",
    icon: "🦅",
    en: {
      analogy: "Like a sports playbook detailing every trick play the opposing team could ever run: from initial kickoff to scoring goals.",
      definition: "A globally accessible knowledge base of real-world cyber adversary tactics and techniques, structured in a matrix used to assess defensive coverage."
    },
    fr: {
      analogy: "Comme le carnet de jeu d'une équipe de football qui répertorie toutes les tactiques et feintes que l'équipe adverse est susceptible d'utiliser.",
      definition: "Une matrice de référence mondiale qui documente les tactiques et techniques réelles employées par les cybercriminels pour aider à structurer la défense."
    }
  },
  {
    id: "ransomware",
    term: "Ransomware",
    fullNameEn: "Extortion Cryptomalware",
    fullNameFr: "Rançongiciel d'Extorsion",
    category: "threat_intel",
    icon: "🔒",
    en: {
      analogy: "Like a burglar who sneaks into your house, puts a heavy padlock on your personal safe, and leaves a note demanding $1,000 in exchange for the key.",
      definition: "Malicious software that encrypts a victim's files and databases using unbreakable algorithms, demanding a digital currency payment to provide the decryption key."
    },
    fr: {
      analogy: "Comme un voleur qui s'infiltre chez vous, met un cadenas incassable sur votre coffre-fort et laisse un mot exigeant 1 000 € pour vous donner la clé.",
      definition: "Un logiciel malveillant qui chiffre les fichiers et serveurs d'une victime et exige une rançon en cryptomonnaie en échange de la clé de déchiffrement."
    }
  },
  {
    id: "phishing",
    term: "Phishing",
    fullNameEn: "Deceptive Social Engineering Lure",
    fullNameFr: "Hameçonnage Social",
    category: "red_team",
    icon: "🎣",
    en: {
      analogy: "Like an angler dangling a plastic worm on a hook: the fish thinks it's dinner, bites, and gets caught.",
      definition: "A fraudulent attempt to obtain sensitive information like passwords and credit card details by disguising as a trustworthy entity in email or messaging."
    },
    fr: {
      analogy: "Comme un pêcheur qui agite un ver en plastique : le poisson pense que c'est de la nourriture, mord à l'hameçon et se retrouve piégé.",
      definition: "Une technique frauduleuse consistant à se faire passer pour un tiers de confiance (banque, impôts, collègue) afin de dérober des identifiants ou mots de passe."
    }
  },
  {
    id: "zero_trust",
    term: "Zero Trust",
    fullNameEn: "Zero Trust Architecture",
    fullNameFr: "Architecture Zéro Confiance",
    category: "governance",
    icon: "🛡️",
    en: {
      analogy: "Like a high-security submarine where every single watertight compartment requires a fingerprint scan to open, even if you are already inside the submarine.",
      definition: "A security model based on the principle 'Never Trust, Always Verify', requiring strict identity verification for every person and device attempting to access resources."
    },
    fr: {
      analogy: "Comme un sous-marin de haute sécurité où chaque porte étanche exige un scan biométrique pour s'ouvrir, même si vous êtes déjà monté à bord.",
      definition: "Un paradigme de sécurité reposant sur le principe 'Ne jamais faire confiance, toujours vérifier', exigeant l'authentification continue de chaque utilisateur et appareil."
    }
  },
  {
    id: "hash",
    term: "Hash / Hashing",
    fullNameEn: "One-Way Cryptographic Digest",
    fullNameFr: "Condensat Cryptographique Unidirectionnel",
    category: "crypto",
    icon: "🥩",
    en: {
      analogy: "Like a meat grinder: you can easily turn a steak into ground meat, but it is physically impossible to turn ground meat back into the original steak.",
      definition: "A mathematical algorithm (e.g. SHA-256) that transforms any arbitrary data into a fixed-length string of characters in one direction only. Used for storing passwords safely."
    },
    fr: {
      analogy: "Comme un hachoir à viande : vous pouvez facilement transformer un steak en viande hachée, mais il est impossible de reconstituer le steak d'origine à partir de la viande hachée.",
      definition: "Une fonction mathématique unidirectionnelle (ex. SHA-256) qui transforme des données de taille quelconque en une empreinte de longueur fixe. Idéal pour stocker les mots de passe."
    }
  },
  {
    id: "c2",
    term: "C2 / C&C",
    fullNameEn: "Command and Control Server",
    fullNameFr: "Serveur de Commande et Contrôle",
    category: "threat_intel",
    icon: "📡",
    en: {
      analogy: "Like a puppet master holding the strings: the puppets (infected computers) only move and attack when the master backstage pulls the wires.",
      definition: "A centralized server controlled by a cybercriminal used to send tactical commands and receive stolen data from malware-infected devices (botnets)."
    },
    fr: {
      analogy: "Comme un marionnettiste tenant les fils : les marionnettes (ordinateurs infectés) n'agissent et n'attaquent que lorsque le maître en coulisse tire les ficelles.",
      definition: "Un serveur central administré par un attaquant servant à envoyer des ordres et à collecter les données volées sur les machines compromises (botnet)."
    }
  },
  {
    id: "brute_force",
    term: "Brute Force",
    fullNameEn: "Exhaustive Key / Password Search",
    fullNameFr: "Attaque par Force Brute",
    category: "red_team",
    icon: "🔨",
    en: {
      analogy: "Like a burglar with a massive keychain of 100,000 keys trying every single key into your front door lock until one finally turns.",
      definition: "A trial-and-error method used by automated software to guess passwords or cryptographic keys by systematically testing every possible combination."
    },
    fr: {
      analogy: "Comme un cambrioleur avec un trousseau de 100 000 clés qui essaye chaque clé l'une après l'autre dans votre serrure jusqu'à ce que la porte s'ouvre.",
      definition: "Une attaque automatisée consistant à tester systématiquement toutes les combinaisons possibles de mots de passe ou clés jusqu'à trouver la bonne."
    }
  },
  {
    id: "vpn",
    term: "VPN",
    fullNameEn: "Virtual Private Network",
    fullNameFr: "Réseau Privé Virtuel",
    category: "network",
    icon: "🚇",
    en: {
      analogy: "Like driving through a sealed armored underground tunnel instead of driving on a crowded highway where everyone can see your car and license plate.",
      definition: "An encrypted tunnel established across a public network (like the Internet) that shields your traffic from eavesdropping and connects remote workers securely to the office."
    },
    fr: {
      analogy: "Comme rouler dans un tunnel souterrain blindé plutôt que sur une autoroute publique où tout le monde voit votre véhicule et votre plaque.",
      definition: "Un tunnel chiffré établi sur Internet qui protège les communications contre l'interception et permet de relier des télétravailleurs au réseau interne de l'entreprise."
    }
  },
  {
    id: "kerberoasting",
    term: "Kerberoasting",
    fullNameEn: "Active Directory Service Ticket Hash Extraction",
    fullNameFr: "Attaque d'Extraction de Tickets Kerberos",
    category: "red_team",
    icon: "🎟️",
    en: {
      analogy: "Like a visitor in a museum politely asking the front desk for a stamped entry ticket to the VIP vault, then taking the ticket home to forge the master wax seal offline.",
      definition: "An Active Directory attack where a domain user requests Kerberos TGS service tickets for accounts with SPNs, then extracts and cracks the password hashes offline."
    },
    fr: {
      analogy: "Comme un visiteur dans un musée demandant poliment un ticket d'accès tamponné pour la salle VIP, puis rentrant chez lui pour fabriquer un double du sceau en toute tranquillité.",
      definition: "Une attaque Active Directory où un utilisateur standard demande un ticket de service Kerberos (TGS) puis tente de casser le mot de passe du compte de service hors ligne."
    }
  },
  {
    id: "iso27001",
    term: "ISO/IEC 27001",
    fullNameEn: "Information Security Management System Standard",
    fullNameFr: "Norme de Système de Management de la Sécurité de l'Information",
    category: "governance",
    icon: "🏛️",
    en: {
      analogy: "Like the strict health & safety building code for skyscrapers: architects, electricians, and inspectors must follow proven blueprints so the building never collapses.",
      definition: "The leading international standard defining the requirements for establishing, implementing, maintaining, and continually improving an Information Security Management System (ISMS)."
    },
    fr: {
      analogy: "Comme les normes strictes de construction pour les gratte-ciel : ingénieurs et inspecteurs doivent respecter des règles éprouvées pour éviter tout effondrement.",
      definition: "La norme internationale de référence fixant les exigences pour mettre en place, gérer et améliorer en continu un Système de Management de la Sécurité de l'Information (SMSI)."
    }
  }
];
