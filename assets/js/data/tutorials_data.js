/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <adamcherkaoui99@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - Comprehensive Video Tutorials & Masterclass Database
 * Bilingual (EN & FR) step-by-step guides for complete beginners to advanced analysts.
 * Features ELIF5 (Explain Like I'm 5), video embeds, timestamps, key terms,
 * detailed procedures, pitfalls, and knowledge check quizzes.
 */
window.TutorialsData = [
  {
    id: "tut-01-welcome-cyber",
    track: "beginners",
    level: "beginner",
    duration: "12 min",
    videoUrl: "https://www.youtube-nocookie.com/embed/inWWhr5tnEA",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    en: {
      title: "Absolute Beginner's Guide: What is Cybersecurity & How the Internet Works",
      tagline: "Start here if you have zero IT experience — friendly, visual, and jargon-free.",
      elif5: "Imagine your computer is a house, the internet is a network of roads, and an IP address is your postal address. Hackers test doors and windows to see if any were left unlocked, while cybersecurity defenders install deadbolts, alarm systems, and security cameras (firewalls and SIEM).",
      keyTerms: [
        { term: "IP Address", def: "A unique numerical label (e.g., 192.168.1.1) assigned to every device connected to a computer network." },
        { term: "Port", def: "A standardized virtual door on a computer for specific communication (e.g., Port 80 for HTTP, 443 for HTTPS, 22 for SSH)." },
        { term: "Packet", def: "A small chunk of data transmitted over the internet, containing header info (source/destination) and payload (the content)." },
        { term: "Vulnerability", def: "A flaw or weakness in software code or system configuration that can be exploited by an attacker." }
      ],
      chapters: [
        { time: "00:00", title: "Introduction: Why Cybersecurity Matters" },
        { time: "02:30", title: "How Packets Travel from Server to Browser" },
        { time: "05:15", title: "IP Addresses, Ports, and DNS Demystified" },
        { time: "08:40", title: "The CIA Triad: Confidentiality, Integrity, Availability" },
        { time: "10:50", title: "How to Navigate CyberOps Academy Step-by-Step" }
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Understand the Core Mission: The CIA Triad",
          detail: "All cybersecurity decisions revolve around three pillars: Confidentiality (keeping secret data private), Integrity (preventing unauthorized tampering), and Availability (ensuring systems stay up and running)."
        },
        {
          stepNumber: 2,
          title: "Follow the Data Flow (Client -> Router -> DNS -> Server)",
          detail: "When you visit a website, your computer asks a DNS server (the internet's phonebook) for the server's IP address. Packets then route through multiple routers before reaching the destination server."
        },
        {
          stepNumber: 3,
          title: "Explore the European Bachelor Syllabus",
          detail: "In CyberOps Academy, start with Phase 1: Module 01 (Foundations) and Module 02 (Network Architecture). Don't jump to complex hacking before understanding basic networking."
        }
      ],
      pitfalls: [
        "Trying to learn advanced penetration testing before understanding basic TCP/IP networking.",
        "Memorizing tools like Nmap or Metasploit without understanding the underlying protocols they scan.",
        "Feeling overwhelmed by terminology — remember that every expert started from absolute zero."
      ],
      quiz: {
        question: "What is the primary role of a DNS (Domain Name System) server in internet networking?",
        options: [
          "Encrypting user passwords before sending them to databases",
          "Translating human-friendly domain names (like example.com) into IP addresses",
          "Blocking malicious malware packets from entering a home WiFi router",
          "Speeding up CPU processing speed during heavy computer computations"
        ],
        answerIndex: 1,
        explanation: "DNS acts as the internet's phonebook: it translates domain names you type in a browser into numerical IP addresses that computers use to find each other."
      }
    },
    fr: {
      title: "Guide Débutant Absolu : Qu'est-ce que la Cybersécurité et Comment Fonctionne Internet",
      tagline: "Commencez ici si vous n'avez aucune expérience en informatique — visuel, clair et sans jargon.",
      elif5: "Imaginez que votre ordinateur est une maison, qu'Internet est un réseau routier et qu'une adresse IP est votre adresse postale. Les pirates vérifient les portes et fenêtres non verrouillées, tandis que les défenseurs installent des serrures, alarmes et caméras (pare-feu et SIEM).",
      keyTerms: [
        { term: "Adresse IP", def: "Un identifiant numérique unique (ex: 192.168.1.1) attribué à chaque appareil connecté à un réseau." },
        { term: "Port", def: "Une porte virtuelle sur un système pour un service précis (ex: Port 80 pour HTTP, 443 pour HTTPS, 22 pour SSH)." },
        { term: "Paquet", def: "Un petit bloc de données transmis sur le réseau, composé d'un en-tête et d'une charge utile (payload)." },
        { term: "Vulnérabilité", def: "Une faille ou faiblesse dans un logiciel ou une configuration exploitable par un attaquant." }
      ],
      chapters: [
        { time: "00:00", title: "Introduction : L'importance de la cybersécurité" },
        { time: "02:30", title: "Comment les paquets voyagent du serveur au navigateur" },
        { time: "05:15", title: "Adresses IP, Ports et DNS expliqués simplement" },
        { time: "08:40", title: "La Triade CIA : Confidentialité, Intégrité, Disponibilité" },
        { time: "10:50", title: "Comment progresser sur CyberOps Academy pas à pas" }
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Comprendre le socle : La Triade CIA",
          detail: "Toute la sécurité informatique repose sur 3 piliers : Confidentialité (garder les données secrètes), Intégrité (empêcher toute altération frauduleuse) et Disponibilité (garantir l'accès aux services)."
        },
        {
          stepNumber: 2,
          title: "Suivre le chemin d'un paquet réseau",
          detail: "Lorsque vous saisissez une URL, votre machine consulte le serveur DNS pour obtenir l'adresse IP de destination, puis les paquets transitent de routeur en routeur."
        },
        {
          stepNumber: 3,
          title: "Commencer par la Phase 1 du Bachelor Européen",
          detail: "Débutez par le Module 01 (Fondamentaux) et Module 02 (Architecture Réseau). Maîtriser les réseaux est indispensable avant d'aborder l'audit ou le pentest."
        }
      ],
      pitfalls: [
        "Vouloir faire du piratage sans comprendre le fonctionnement fondamental de TCP/IP.",
        "Mémoriser des commandes d'outils sans comprendre les protocoles sous-jacents.",
        "Se décourager face au vocabulaire technique — tout le monde commence par zéro."
      ],
      quiz: {
        question: "Quel est le rôle principal d'un serveur DNS (Domain Name System) sur Internet ?",
        options: [
          "Chiffrer les mots de passe avant l'enregistrement en base de données",
          "Traduire les noms de domaine lisibles (comme exemple.com) en adresses IP numériques",
          "Bloquer les paquets malveillants avant leur entrée sur le réseau local",
          "Accélérer la cadence du processeur pour les calculs lourds"
        ],
        answerIndex: 1,
        explanation: "Le DNS est l'annuaire téléphonique d'Internet : il convertit les noms de domaine en adresses IP utilisables par les machines."
      }
    },
    actionTarget: "curriculum",
    actionLabelEn: "📚 Open Curriculum (Module 1)",
    actionLabelFr: "📚 Ouvrir le Curriculum (Module 1)"
  },
  {
    id: "tut-02-cli-terminal",
    track: "beginners",
    level: "beginner",
    duration: "15 min",
    videoUrl: "https://www.youtube-nocookie.com/embed/s3ii48qYBxA",
    thumbnail: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80",
    en: {
      title: "Terminal & Linux Command Line Masterclass for Non-Techies",
      tagline: "Learn the essential bash commands so you can navigate files and inspect systems with confidence.",
      elif5: "Graphical windows with icons are like walking on paved sidewalks: easy, but you can only go where the sidewalks lead. The command line terminal is like having a helicopter: you type the exact coordinates and arrive instantly anywhere on the system.",
      keyTerms: [
        { term: "Terminal / Shell", def: "A text-based user interface used to run commands, manage files, and automate tasks." },
        { term: "Working Directory", def: "The specific folder in the file system where your terminal session is currently located (`pwd`)." },
        { term: "Flag / Option", def: "A modifier passed to a command (like `-l` or `-a` in `ls -la`) to change how it behaves." },
        { term: "Piping (`|`)", def: "Sending the output of one command directly as the input to another command (e.g., `cat log.txt | grep ERROR`)." }
      ],
      chapters: [
        { time: "00:00", title: "Why Security Analysts Live in the Terminal" },
        { time: "03:10", title: "Where Am I? Navigation with pwd, ls, and cd" },
        { time: "07:20", title: "Reading & Searching Files with cat, head, and grep" },
        { time: "11:00", title: "File Permissions (chmod, chown) Explained" },
        { time: "13:30", title: "Using the Aegis Terminal Shell in CyberOps Academy" }
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Find your location with `pwd`",
          detail: "Type `pwd` (print working directory) to see your current directory path (e.g. `/home/student`)."
        },
        {
          stepNumber: 2,
          title: "List files with `ls -la`",
          detail: "The `-l` flag shows detailed permissions, owner, and file size, while `-a` reveals hidden files starting with a dot."
        },
        {
          stepNumber: 3,
          title: "Filter output using `grep`",
          detail: "Run `grep 'failed' /var/log/auth.log` to search for failed login attempts in system logs."
        }
      ],
      pitfalls: [
        "Typing `rm -rf /` or deleting files without double-checking the working directory.",
        "Forgetting that Linux is case-sensitive: `File.txt` and `file.txt` are two completely different files.",
        "Panicking when password characters don't show on screen when typing `sudo` — Linux hides them intentionally for security."
      ],
      quiz: {
        question: "Which Linux command displays your current directory location in the file system tree?",
        options: [
          "`ls -la`",
          "`pwd`",
          "`cd ..`",
          "`cat /etc/passwd`"
        ],
        answerIndex: 1,
        explanation: "`pwd` stands for 'Print Working Directory' and prints the full absolute path of your current location."
      }
    },
    fr: {
      title: "Masterclass Ligne de Commande & Terminal Linux pour Débutants",
      tagline: "Apprenez les commandes bash indispensables pour explorer, analyser et naviguer avec aisance.",
      elif5: "Les fenêtres graphiques sont comme des trottoirs balisés : simples mais limités. Le terminal est un hélicoptère : vous entrez les coordonnées exactes et vous arrivez n'importe où en une fraction de seconde.",
      keyTerms: [
        { term: "Terminal / Shell", def: "Une interface textuelle permettant d'exécuter des commandes et d'administrer le système d'exploitation." },
        { term: "Répertoire Courant", def: "Le dossier du système de fichiers dans lequel se trouve actuellement votre session (`pwd`)." },
        { term: "Option / Flag", def: "Un argument (ex: `-l` ou `-a` dans `ls -la`) qui modifie le comportement de la commande." },
        { term: "Piping (`|`)", def: "Rediriger la sortie d'une commande comme entrée directe d'une autre (ex: `cat log.txt | grep ERROR`)." }
      ],
      chapters: [
        { time: "00:00", title: "Pourquoi les analystes SOC utilisent le terminal" },
        { time: "03:10", title: "Navigation de base : pwd, ls, et cd" },
        { time: "07:20", title: "Lecture et recherche : cat, head, et grep" },
        { time: "11:00", title: "Permissions de fichiers (chmod, chown) démystifiées" },
        { time: "13:30", title: "Pratiquer dans le Terminal Aegis de la plateforme" }
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Vérifier son emplacement avec `pwd`",
          detail: "Tapez `pwd` (print working directory) pour afficher le chemin absolu du dossier actif (ex: `/home/etudiant`)."
        },
        {
          stepNumber: 2,
          title: "Lister les fichiers détaillés avec `ls -la`",
          detail: "L'option `-l` affiche les droits, le propriétaire et la taille, tandis que `-a` affiche les fichiers cachés."
        },
        {
          stepNumber: 3,
          title: "Filtrer des journaux avec `grep`",
          detail: "Exécutez `grep 'failed' /var/log/auth.log` pour extraire instantanément les tentatives de connexion échouées."
        }
      ],
      pitfalls: [
        "Supprimer des fichiers avec `rm` sans vérifier attentivement son dossier courant.",
        "Oublier que Linux est sensible à la casse : `Fichier.txt` et `fichier.txt` sont deux fichiers distincts.",
        "Penser que le mot de passe ne s'écrit pas lors d'un `sudo` (Linux masque la saisie par sécurité)."
      ],
      quiz: {
        question: "Quelle commande Linux permet d'afficher le chemin complet du répertoire dans lequel vous vous trouvez ?",
        options: [
          "`ls -la`",
          "`pwd`",
          "`cd ..`",
          "`cat /etc/passwd`"
        ],
        answerIndex: 1,
        explanation: "`pwd` (Print Working Directory) affiche le chemin absolu du répertoire de travail actuel."
      }
    },
    actionTarget: "terminal",
    actionLabelEn: "💻 Open In-Browser Terminal (Ctrl+`)",
    actionLabelFr: "💻 Ouvrir le Terminal Intégré (Ctrl+`)"
  },
  {
    id: "tut-03-crypto-lab",
    track: "labs",
    level: "beginner",
    duration: "14 min",
    videoUrl: "https://www.youtube-nocookie.com/embed/jhXCTbFnK8o",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    en: {
      title: "Demystifying Cryptography: Hashes, Symmetric AES & Public Keys",
      tagline: "Hands-on guide to hashing vs encryption with our in-browser Cryptography Lab.",
      elif5: "Hashing is like blending a fruit smoothie: you can turn a banana into a drink, but you can NEVER un-blend it back into a banana (one-way). Encryption is like putting a secret letter into a locked safe: if you have the key, you can lock it and unlock it anytime (two-way).",
      keyTerms: [
        { term: "Cryptographic Hash", def: "A one-way mathematical function that turns data of any size into a fixed-length string (e.g. SHA-256 is 64 hex characters)." },
        { term: "Symmetric Encryption", def: "An encryption scheme where the EXACT same secret key is used for both encrypting and decrypting (e.g., AES-256-GCM)." },
        { term: "Asymmetric Encryption", def: "A scheme using a pair of keys: a Public Key (given to anyone) to encrypt, and a Private Key (kept secret) to decrypt (e.g., RSA)." },
        { term: "Avalanche Effect", def: "A small change of a single character in the input causes a completely different, unrecognizable hash output." }
      ],
      chapters: [
        { time: "00:00", title: "Hashing vs Encryption: The Crucial Difference" },
        { time: "03:40", title: "SHA-256 and the Avalanche Effect Demo" },
        { time: "07:15", title: "AES-256-GCM Symmetric Encryption & PBKDF2" },
        { time: "10:30", title: "Base64: Why Encoding is NOT Encryption" },
        { time: "12:45", title: "Hands-on Exercise in the CyberOps Crypto Lab" }
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Open the Cryptography Lab",
          detail: "Navigate to the Cyber Labs tab and select the Cryptography Lab."
        },
        {
          stepNumber: 2,
          title: "Generate a SHA-256 Hash",
          detail: "Type 'Password123' and note the 64-character hash. Change the last character to '4' and observe how every single letter of the hash changes."
        },
        {
          stepNumber: 3,
          title: "Test AES-256 Symmetric Encryption",
          detail: "Enter a secret passphrase, encrypt a confidential message, copy the ciphertext, and decrypt it back to prove reversible confidentiality."
        }
      ],
      pitfalls: [
        "Confusing Base64 encoding with encryption — anyone can decode Base64 in 1 second without a key.",
        "Storing plaintext passwords in a database instead of salted hashes (bcrypt/Argon2).",
        "Using obsolete algorithms like MD5 or SHA-1 which suffer from collision vulnerabilities."
      ],
      quiz: {
        question: "Why can you NOT decrypt a SHA-256 hash back into the original plain text?",
        options: [
          "Because you need an expensive supercomputer to download the secret key",
          "Because hashing is a strictly one-way mathematical reduction where information is irreversibly compressed",
          "Because SHA-256 requires a private certificate issued by Microsoft",
          "Because hashes expire after 24 hours"
        ],
        answerIndex: 1,
        explanation: "Cryptographic hashes are one-way functions designed by mathematics to be computationally impossible to reverse back into the original input."
      }
    },
    fr: {
      title: "Démystifier la Cryptographie : Hashes, Chiffrement Symétrique AES & Clés Publiques",
      tagline: "Guide pratique pour comprendre la différence entre hachage et chiffrement dans notre Lab interactif.",
      elif5: "Le hachage est comme mixer un smoothie : vous pouvez mixer une fraise en jus, mais vous ne pourrez JAMAIS reconstituer la fraise à partir du jus (sens unique). Le chiffrement est un coffre-fort : avec la clé, vous pouvez le verrouiller et le déverrouiller à volonté (réversible).",
      keyTerms: [
        { term: "Hachage Cryptographique", def: "Une fonction mathématique à sens unique qui produit une empreinte de taille fixe (ex: SHA-256 fait 64 caractères hex)." },
        { term: "Chiffrement Symétrique", def: "Un algorithme utilisant la MÊME clé secrète pour chiffrer et déchiffrer (ex: AES-256-GCM)." },
        { term: "Chiffrement Asymétrique", def: "Un système à deux clés : une Clé Publique pour chiffrer, et une Clé Privée secrète pour déchiffrer (ex: RSA)." },
        { term: "Effet Avalanche", def: "La modification d'un seul caractère d'entrée bouleverse entièrement l'empreinte produite." }
      ],
      chapters: [
        { time: "00:00", title: "Hachage vs Chiffrement : La différence fondamentale" },
        { time: "03:40", title: "Démonstration de SHA-256 et de l'effet avalanche" },
        { time: "07:15", title: "Chiffrement AES-256-GCM et dérivation PBKDF2" },
        { time: "10:30", title: "Base64 : Pourquoi l'encodage N'EST PAS du chiffrement" },
        { time: "12:45", title: "Exercice guidé dans le Lab Cryptographie" }
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Accéder au Lab Cryptographie",
          detail: "Cliquez sur l'onglet Cyber Labs puis sélectionnez l'atelier Cryptographie."
        },
        {
          stepNumber: 2,
          title: "Calculer une empreinte SHA-256",
          detail: "Saisissez 'MotDePasse123' et observez le résultat. Modifiez une lettre et constatez la transformation totale du condensat."
        },
        {
          stepNumber: 3,
          title: "Tester le chiffrement symétrique AES-256",
          detail: "Définissez un mot de passe maître, chiffrez un message confidentiel puis déchiffrez-le pour constater la réversibilité."
        }
      ],
      pitfalls: [
        "Confondre l'encodage Base64 avec du chiffrement (Base64 se décode sans aucune clé).",
        "Enregistrer des mots de passe en clair au lieu d'utiliser un hachage salé (bcrypt ou Argon2).",
        "Utiliser des algorithmes obsolètes comme MD5 ou SHA-1 qui présentent des collisions."
      ],
      quiz: {
        question: "Pourquoi est-il mathématiquement impossible de 'déchiffrer' une empreinte SHA-256 vers son texte d'origine ?",
        options: [
          "Parce qu'il faut acheter une clé privée auprès d'une autorité de certification",
          "Parce que le hachage est une fonction irréversible à sens unique qui compresse l'information",
          "Parce que SHA-256 nécessite une connexion Internet permanente",
          "Parce que les empreintes s'autodétruisent après 24 heures"
        ],
        answerIndex: 1,
        explanation: "Le hachage est une opération à sens unique (one-way function) conçue pour qu'il soit impossible de retrouver les données sources à partir du hash."
      }
    },
    actionTarget: "labs:crypto",
    actionLabelEn: "🔐 Launch Cryptography Lab",
    actionLabelFr: "🔐 Lancer le Lab Cryptographie"
  },
  {
    id: "tut-04-networking-subnet",
    track: "labs",
    level: "beginner",
    duration: "16 min",
    videoUrl: "https://www.youtube-nocookie.com/embed/s_Ntt6eTn94",
    thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80",
    en: {
      title: "Subnetting & CIDR Made Simple: Never Fail IP Calculations",
      tagline: "Calculate network addresses, broadcast boundaries, and usable host ranges without headaches.",
      elif5: "Imagine an apartment building with 256 rooms. If everyone yells at once, it's pure chaos (broadcast storm). Subnetting is like dividing the building into 4 quiet floors of 64 rooms each, with an intercom router between floors so only necessary traffic gets passed along.",
      keyTerms: [
        { term: "CIDR Prefix (`/24`)", def: "The count of bits set to 1 in the subnet mask, indicating how many bits belong to the Network ID." },
        { term: "Network Address", def: "The very first address in a subnet (all host bits 0), identifying the network itself (unusable for devices)." },
        { term: "Broadcast Address", def: "The very last address in a subnet (all host bits 1), used to send messages to every machine on that subnet." },
        { term: "Usable Host Range", def: "All the IP addresses strictly between the Network Address and the Broadcast Address ($2^{host\\_bits} - 2$)." }
      ],
      chapters: [
        { time: "00:00", title: "Why Networks Must Be Segmented" },
        { time: "03:15", title: "IPv4 Anatomy: 32 Bits Broken into 4 Octets" },
        { time: "06:40", title: "The Magic Formula: $2^{(32 - CIDR)} - 2$" },
        { time: "10:10", title: "Step-by-Step Calculation of a `/26` Subnet" },
        { time: "13:30", title: "Using the In-Browser CIDR Calculator" }
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Identify the CIDR mask",
          detail: "For an IP like `192.168.10.50/26`, the prefix is 26 bits. Host bits = $32 - 26 = 6$ bits."
        },
        {
          stepNumber: 2,
          title: "Calculate Block Size",
          detail: "Total addresses = $2^6 = 64$. Subnets increment in steps of 64: `0`, `64`, `128`, `192`."
        },
        {
          stepNumber: 3,
          title: "Find the Network and Broadcast",
          detail: "Since 50 falls between 0 and 63: Network = `192.168.10.0`, Broadcast = `192.168.10.63`, Usable Hosts = `.1` to `.62` (62 usable devices)."
        }
      ],
      pitfalls: [
        "Assigning the Network address (.0) or Broadcast address (.255 in /24) to a computer.",
        "Confusing private IP ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) with routable public internet IPs.",
        "Overcomplicating binary conversions — use the block size shortcut ($256 - \\text{mask octet}$)."
      ],
      quiz: {
        question: "How many USABLE host IP addresses exist on a `/24` subnet (subnet mask `255.255.255.0`)?",
        options: [
          "256",
          "254",
          "128",
          "512"
        ],
        answerIndex: 1,
        explanation: "A `/24` has $32 - 24 = 8$ host bits, yielding $2^8 = 256$ total addresses. Subtract 2 (one for the Network address and one for the Broadcast address) = 254 usable host addresses."
      }
    },
    fr: {
      title: "Le Découpage Réseau & CIDR Simplifié : Réussir vos Calculs IP à Coup Sûr",
      tagline: "Calculez adresses réseau, adresses de diffusion et plages d'hôtes sans vous tromper.",
      elif5: "Imaginez un immeuble de 256 pièces où tout le monde crie en même temps (tempête de diffusion). Le découpage en sous-réseaux divise l'immeuble en 4 étages calmes de 64 pièces chacun, reliés par un interphone (routeur).",
      keyTerms: [
        { term: "Préfixe CIDR (`/24`)", def: "Le nombre de bits à 1 dans le masque, indiquant la portion identifiant le réseau." },
        { term: "Adresse Réseau", def: "La toute première adresse du sous-réseau (bits d'hôte à 0), non attribuable à un poste." },
        { term: "Adresse de Diffusion (Broadcast)", def: "La toute dernière adresse (bits d'hôte à 1) qui envoie un message à tous les postes du sous-réseau." },
        { term: "Plage d'Hôtes Utilisables", def: "Toutes les adresses situées entre l'adresse réseau et l'adresse de diffusion ($2^{bits\\_hote} - 2$)." }
      ],
      chapters: [
        { time: "00:00", title: "Pourquoi segmenter les réseaux locaux" },
        { time: "03:15", title: "Anatomie d'une adresse IPv4 : 32 bits et 4 octets" },
        { time: "06:40", title: "La formule magique : $2^{(32 - CIDR)} - 2$" },
        { time: "10:10", title: "Calcul pas à pas d'un sous-réseau en `/26`" },
        { time: "13:30", title: "Vérification dans le Calculateur CIDR intégré" }
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Identifier le préfixe CIDR",
          detail: "Pour `192.168.10.50/26`, le masque utilise 26 bits. Bits d'hôtes restants = $32 - 26 = 6$ bits."
        },
        {
          stepNumber: 2,
          title: "Calculer la taille du bloc",
          detail: "Nombre total d'adresses = $2^6 = 64$. Les blocs avancent de 64 en 64 : `0`, `64`, `128`, `192`."
        },
        {
          stepNumber: 3,
          title: "Déterminer Réseau et Broadcast",
          detail: "Comme 50 se situe entre 0 et 63 : Réseau = `192.168.10.0`, Broadcast = `192.168.10.63`, Hôtes utilisables = `.1` à `.62` (62 postes)."
        }
      ],
      pitfalls: [
        "Attribuer l'adresse réseau (.0) ou de diffusion (.255 en /24) à une interface machine.",
        "Confondre les plages privées RFC 1918 (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) avec les adresses publiques routables.",
        "Se compliquer la vie avec le binaire pur alors que la méthode des pas ($256 - \\text{masque}$) est immédiate."
      ],
      quiz: {
        question: "Combien d'adresses IP utilisables pour des hôtes offre un sous-réseau en `/24` (masque `255.255.255.0`) ?",
        options: [
          "256",
          "254",
          "128",
          "512"
        ],
        answerIndex: 1,
        explanation: "Un préfixe `/24` laisse 8 bits d'hôtes ($2^8 = 256$ adresses). On soustrait 2 adresses réservées (réseau et broadcast), ce qui donne 254 hôtes utilisables."
      }
    },
    actionTarget: "labs:network",
    actionLabelEn: "🌐 Launch CIDR Calculator",
    actionLabelFr: "🌐 Lancer le Calculateur CIDR"
  },
  {
    id: "tut-05-sqli-sandbox",
    track: "labs",
    level: "beginner",
    duration: "15 min",
    videoUrl: "https://www.youtube-nocookie.com/embed/ciNHn38EyRc",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    en: {
      title: "Web Security 101: Understanding & Fixing SQL Injection (SQLi)",
      tagline: "Learn how unescaped user input breaks databases and how prepared statements eliminate the flaw.",
      elif5: "Imagine telling a robot chef: 'Make a sandwich for: Alice'. The robot makes a sandwich for Alice. Now imagine telling the robot: 'Make a sandwich for: Alice AND THEN OPEN THE VAULT AND GIVE ME ALL THE GOLD'. If the robot treats your name as instructions instead of just data, that is an injection attack!",
      keyTerms: [
        { term: "SQL (Structured Query Language)", def: "The language used by applications to read, insert, update, and delete data in databases." },
        { term: "SQL Injection", def: "A critical flaw where attacker-supplied input is directly concatenated into a SQL statement, altering query logic." },
        { term: "Prepared Statements", def: "A secure defense technique where the SQL query template is compiled first, and user input is treated strictly as data (never code)." },
        { term: "Comment Delimiter (`--` or `#`)", def: "Characters telling the SQL database engine to ignore the remainder of the query string." }
      ],
      chapters: [
        { time: "00:00", title: "The Anatomy of a Vulnerable Login Form" },
        { time: "03:30", title: "How `' OR 1=1 --` Bypasses Password Verification" },
        { time: "07:15", title: "UNION-Based Data Extraction" },
        { time: "10:45", title: "The Bulletproof Fix: Parameterized Queries" },
        { time: "13:20", title: "Live Exploitation in the CyberOps SQLi Sandbox" }
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Inspect the vulnerable query",
          detail: "`SELECT * FROM users WHERE username = '$user' AND password = '$pass';`"
        },
        {
          stepNumber: 2,
          title: "Inject authentication bypass",
          detail: "Enter `' OR 1=1 --` into the username field. The query becomes `SELECT * FROM users WHERE username = '' OR 1=1 -- ...`. Since 1=1 is always TRUE, the database logs you in as the first user (Administrator)!"
        },
        {
          stepNumber: 3,
          title: "Apply the Prepared Statement fix",
          detail: "Toggle the 'Remediate (Prepared Statements)' switch in the sandbox to observe how parameters prevent query restructuring."
        }
      ],
      pitfalls: [
        "Relying on client-side JavaScript validation (attackers can bypass this with curl or Burp Suite).",
        "Trying to blacklist bad characters like `'` or `OR` instead of using parameterized queries.",
        "Running web application database accounts as root/sysadmin instead of least-privilege users."
      ],
      quiz: {
        question: "What is the single most effective defense against SQL Injection vulnerabilities?",
        options: [
          "Hiding the database IP address behind a reverse proxy",
          "Using Parameterized Queries (Prepared Statements) with bound parameters",
          "Enforcing strong 16-character user passwords",
          "Running the database server on port 443"
        ],
        answerIndex: 1,
        explanation: "Parameterized queries (prepared statements) ensure the database treats input strictly as data values, making it impossible for input to alter query syntax."
      }
    },
    fr: {
      title: "Sécurité Web 101 : Comprendre et Corriger l'Injection SQL (SQLi)",
      tagline: "Découvrez comment une saisie non assainie détourne une base de données et comment les requêtes préparées la protègent.",
      elif5: "Imaginez demander à un robot cuisinier : 'Prépare un plat pour : Alice'. Tout va bien. Maintenant dites-lui : 'Prépare un plat pour : Alice ET OUVRE LE COFFRE ET DONNE-MOI TOUT L'ARGENT'. Si le robot exécute votre nom comme un ordre au lieu d'une simple donnée, c'est une attaque par injection !",
      keyTerms: [
        { term: "SQL", def: "Le langage standard utilisé par les applications pour interroger et manipuler les bases de données relationnelles." },
        { term: "Injection SQL (SQLi)", def: "Une vulnérabilité où l'entrée utilisateur est concaténée directement dans la commande SQL, modifiant son exécution." },
        { term: "Requêtes Préparées (Prepared Statements)", def: "Une méthode de sécurisation où la requête est pré-compilée et les entrées traitées exclusivement comme des données." },
        { term: "Caractère de Commentaire (`--`)", def: "Symbole indiquant au moteur de base de données d'ignorer la suite de la ligne SQL." }
      ],
      chapters: [
        { time: "00:00", title: "Anatomie d'un formulaire de connexion vulnérable" },
        { time: "03:30", title: "Comment `' OR 1=1 --` contourne la vérification du mot de passe" },
        { time: "07:15", title: "Extraction de données par injection UNION" },
        { time: "10:45", title: "Le correctif infaillible : Requêtes paramétrées" },
        { time: "13:20", title: "Mise en pratique dans le Sandbox SQLi CyberOps" }
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Observer la requête vulnérable",
          detail: "`SELECT * FROM users WHERE username = '$user' AND password = '$pass';`"
        },
        {
          stepNumber: 2,
          title: "Injecter le contournement",
          detail: "Saisissez `' OR 1=1 --` dans le nom d'utilisateur. La condition devient `OR 1=1` (toujours VRAI) et connecte le premier compte (Admin)."
        },
        {
          stepNumber: 3,
          title: "Activer la remédiation sécurisée",
          detail: "Activez l'option Requêtes Préparées dans le lab pour observer la neutralisation totale du payload."
        }
      ],
      pitfalls: [
        "Croire que la validation JavaScript côté navigateur protège l'application (facilement contournée via Burp Suite).",
        "Tenter de filtrer manuellement les guillemets au lieu d'adopter systématiquement les requêtes préparées.",
        "Connecter l'application web avec le compte `root` ou `sa` de la base de données."
      ],
      quiz: {
        question: "Quelle est la mesure de protection la plus efficace contre les injections SQL ?",
        options: [
          "Masquer l'adresse IP du serveur de base de données",
          "L'utilisation systématique de Requêtes Préparées (Prepared Statements) avec liaison de paramètres",
          "Exiger des mots de passe de plus de 16 caractères pour les utilisateurs",
          "Changer le port d'écoute standard de MySQL"
        ],
        answerIndex: 1,
        explanation: "Les requêtes préparées séparent le code SQL des données utilisateur, empêchant tout payload d'altérer la structure de la requête."
      }
    },
    actionTarget: "labs:websec",
    actionLabelEn: "🛡️ Launch SQLi Sandbox",
    actionLabelFr: "🛡️ Lancer le Sandbox SQLi"
  },
  {
    id: "tut-06-packet-analysis",
    track: "labs",
    level: "intermediate",
    duration: "18 min",
    videoUrl: "https://www.youtube-nocookie.com/embed/qpnwtzTqQ0w",
    thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80",
    en: {
      title: "Wireshark & TCP 3-Way Handshake: Reading Network Packets",
      tagline: "Inspect SYN, SYN-ACK, and ACK packet exchanges to spot network anomalies and port scans.",
      elif5: "Before two people have a phone conversation, Person A says 'Hello? Can you hear me?' (SYN). Person B says 'Yes, I hear you! Can you hear me?' (SYN-ACK). Person A replies 'Yes, loud and clear!' (ACK). Now they can safely talk. That 3-step agreement is the TCP 3-way handshake.",
      keyTerms: [
        { term: "SYN (Synchronize)", def: "The first TCP packet sent by a client initiating a connection, containing an initial sequence number (ISN)." },
        { term: "SYN-ACK", def: "The server's response confirming receipt of SYN and sending its own sequence synchronization number." },
        { term: "ACK (Acknowledge)", def: "The final handshake packet from the client confirming the connection is established and ready for data." },
        { term: "RST (Reset)", def: "A packet sent when a destination port is closed or when a connection is abruptly terminated." }
      ],
      chapters: [
        { time: "00:00", title: "The Foundation of Reliable Internet Traffic" },
        { time: "04:10", title: "Frame by Frame Breakdown: SYN -> SYN-ACK -> ACK" },
        { time: "08:30", title: "How SYN Stealth Port Scanning (nmap -sS) Works" },
        { time: "12:15", title: "Essential Wireshark Filters for Analysts" },
        { time: "15:40", title: "Interactive Packet Simulation in CyberOps" }
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Initiate Handshake in Lab",
          detail: "Open the TCP 3-Way Handshake Lab and click 'Send SYN Packet' from Client to Server."
        },
        {
          stepNumber: 2,
          title: "Observe Sequence Numbers",
          detail: "Notice how the Server increments the Client's Sequence Number by 1 ($Seq + 1$) in the Acknowledgment Number field."
        },
        {
          stepNumber: 3,
          title: "Complete the Session & Transmit Data",
          detail: "Send the final ACK. Once established, HTTP or TLS encrypted application data can begin flowing."
        }
      ],
      pitfalls: [
        "Assuming all network traffic uses TCP (UDP does not use handshakes, making it faster but unreliable for things like DNS and video streaming).",
        "Getting lost in thousands of Wireshark packets instead of applying display filters like `tcp.port == 80` or `ip.addr == 192.168.1.5`.",
        "Ignoring RST packets, which often indicate firewall blocks or closed ports during reconnaissance."
      ],
      quiz: {
        question: "During a normal TCP 3-Way Handshake, which packet is sent by the SERVER in response to a client's initial connection request?",
        options: [
          "FIN packet",
          "SYN-ACK packet",
          "RST packet",
          "DHCP Offer"
        ],
        answerIndex: 1,
        explanation: "The server responds to the client's SYN packet with a SYN-ACK packet, synchronizing sequence numbers in both directions."
      }
    },
    fr: {
      title: "Wireshark & Handshake TCP à 3 Voies : Analyser les Paquets Réseau",
      tagline: "Examinez les échanges SYN, SYN-ACK et ACK pour repérer les scans de ports et les anomalies de flux.",
      elif5: "Avant d'entamer une conversation téléphonique, vous dites 'Allô, tu m'entends ?' (SYN). Votre ami répond 'Oui je t'entends, et toi tu m'entends ?' (SYN-ACK). Vous confirmez 'Oui c'est bon !' (ACK). C'est exactement le handshake TCP en 3 étapes.",
      keyTerms: [
        { term: "SYN (Synchronize)", def: "Le premier paquet envoyé par le client pour initier la connexion avec son numéro de séquence initial." },
        { term: "SYN-ACK", def: "La réponse du serveur accusant réception du SYN et proposant sa propre séquence." },
        { term: "ACK (Acknowledge)", def: "Le dernier paquet du client validant que la liaison bidirectionnelle est prête pour les données applicatives." },
        { term: "RST (Reset)", def: "Un paquet émis pour clore brutalement une session ou signaler qu'un port est fermé." }
      ],
      chapters: [
        { time: "00:00", title: "Le principe de fiabilité du protocole TCP" },
        { time: "04:10", title: "Décomposition paquet par paquet : SYN -> SYN-ACK -> ACK" },
        { time: "08:30", title: "Fonctionnement du scan furtif Nmap (`nmap -sS`)" },
        { time: "12:15", title: "Filtres Wireshark essentiels pour analyste SOC" },
        { time: "15:40", title: "Simulation interactive dans le Lab TCP CyberOps" }
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Lancer le Handshake dans le Lab",
          detail: "Rendez-vous dans le Lab TCP Handshake et cliquez sur 'Envoyer SYN' du client vers le serveur."
        },
        {
          stepNumber: 2,
          title: "Observer les numéros d'acquittement",
          detail: "Remarquez comment le serveur incrémente de 1 le numéro de séquence client dans le champ Acknowledgment ($Seq + 1$)."
        },
        {
          stepNumber: 3,
          title: "Établir la session et transférer les données",
          detail: "Envoyez l'ACK final pour finaliser l'établissement du canal et autoriser le flux applicatif HTTP/TLS."
        }
      ],
      pitfalls: [
        "Penser que tout le trafic web utilise TCP (UDP est sans connexion, plus rapide pour DNS ou streaming).",
        "Se noyer dans les milliers de trames Wireshark sans utiliser de filtres de vue précis (`tcp.port == 443`).",
        "Négliger les paquets RST qui révèlent souvent des ports fermés ou des blocages par pare-feu."
      ],
      quiz: {
        question: "Lors d'un Handshake TCP standard, quel paquet le SERVEUR envoie-t-il en réponse à la demande initiale du client ?",
        options: [
          "Un paquet FIN",
          "Un paquet SYN-ACK",
          "Un paquet RST",
          "Une offre DHCP"
        ],
        answerIndex: 1,
        explanation: "Le serveur répond au paquet SYN émis par le client par un paquet SYN-ACK pour synchroniser la communication dans les deux sens."
      }
    },
    actionTarget: "labs:packet",
    actionLabelEn: "📦 Launch TCP Handshake Lab",
    actionLabelFr: "📦 Lancer le Lab Handshake TCP"
  },
  {
    id: "tut-07-ctf-arena",
    track: "ctf",
    level: "beginner",
    duration: "14 min",
    videoUrl: "https://www.youtube-nocookie.com/embed/8ev9ZX9J45A",
    thumbnail: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80",
    en: {
      title: "CTF Arena Beginner Guide: How to Capture Your First Flag",
      tagline: "Learn the secrets of Jeopardy-style Capture The Flag competitions and solve cryptographic puzzles.",
      elif5: "A CTF (Capture The Flag) is an educational hacking puzzle competition. Organizers hide a secret code word (the flag, formatted like `FLAG{secret_code}`) inside an encoded message, website, or network packet. Your goal is to find it, prove you cracked the puzzle, and earn points on the scoreboard!",
      keyTerms: [
        { term: "Flag Format", def: "A standardized string token, e.g., `FLAG{crypto_master_2026}`, submitted to verify challenge completion." },
        { term: "ROT13 / Caesar", def: "A simple classical substitution cipher that rotates letters by 13 positions in the alphabet." },
        { term: "Hexadecimal (Base16)", def: "A base-16 number system using digits 0-9 and letters A-F commonly used to represent raw bytes." },
        { term: "CyberChef", def: "A legendary browser-based utility known as the 'Cyber Swiss Army Knife' for encoding, decoding, and analyzing data." }
      ],
      chapters: [
        { time: "00:00", title: "What is a CTF and Why Are They the Best Way to Learn?" },
        { time: "03:15", title: "Recognizing Common Encodings: Base64 vs Hex vs Binary" },
        { time: "06:45", title: "Cracking Challenge 1: The Caesar & ROT13 Mystery" },
        { time: "10:20", title: "Validating Flags with Instant SHA-256 Checksums" },
        { time: "12:30", title: "Climbing the CyberOps Academy CTF Scoreboard" }
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Access the CTF Arena tab",
          detail: "Open the CTF Arena from the top portal navigation bar."
        },
        {
          stepNumber: 2,
          title: "Read the mission briefing",
          detail: "Inspect Challenge 1: 'The Ancient Cipher'. Notice the ciphertext is shifted by 13 positions."
        },
        {
          stepNumber: 3,
          title: "Decode and Submit",
          detail: "Rotate the letters back 13 positions, reveal the plaintext flag `FLAG{caesar_was_an_analyst}`, enter it in the flag box, and submit to earn +100 XP!"
        }
      ],
      pitfalls: [
        "Submitting extra whitespace or lowercase characters when the flag is case-sensitive.",
        "Overthinking simple clues: in beginner CTFs, the description often hints directly at the tool or encoding used.",
        "Giving up too quickly — half of real cybersecurity is patience and methodical elimination of possibilities."
      ],
      quiz: {
        question: "If a CTF challenge provides you with the ciphertext `SYNT{ebg13}`, what cipher was used to encode it?",
        options: [
          "AES-256-CBC with a 128-bit key",
          "ROT13 (Caesar substitution with a shift of 13)",
          "SHA-512 cryptographic hash",
          "RSA public key encryption"
        ],
        answerIndex: 1,
        explanation: "ROT13 rotates letters by 13 spots: 'S' becomes 'F', 'Y' becomes 'L', 'N' becomes 'A', and 'T' becomes 'G' (spelling 'FLAG{rot13}')."
      }
    },
    fr: {
      title: "Guide Débutant CTF Arena : Comment Valider votre Premier Flag",
      tagline: "Découvrez les rouages des compétitions Capture The Flag et résolvez vos premières énigmes cryptographiques.",
      elif5: "Un CTF (Capture The Flag) est un jeu d'énigmes de piratage éthique. Les concepteurs dissimulent un mot de passe secret (le 'flag', souvent au format `FLAG{mot_de_passe}`) dans un message codé, une page web ou un fichier. Votre but est de le trouver pour gagner des points !",
      keyTerms: [
        { term: "Format de Flag", def: "Une chaîne de caractères normalisée (ex: `FLAG{crypto_master_2026}`) à soumettre pour valider l'épreuve." },
        { term: "ROT13 / César", def: "Un chiffrement historique par substitution qui décale les lettres de 13 positions dans l'alphabet." },
        { term: "Hexadécimal (Base16)", def: "Un système de numération à base 16 (0-9 et A-F) couramment utilisé pour représenter des octets bruts." },
        { term: "CyberChef", def: "L'outil web de référence surnommé le 'couteau suisse de la cybersécurité' pour décoder et analyser des données." }
      ],
      chapters: [
        { time: "00:00", title: "Qu'est-ce qu'un CTF et pourquoi est-ce la meilleure méthode d'apprentissage" },
        { time: "03:15", title: "Reconnaître les encodages : Base64, Hexadécimal et Binaire" },
        { time: "06:45", title: "Résolution de l'Épreuve 1 : Le Mystère César & ROT13" },
        { time: "10:20", title: "Validation instantanée du Flag par empreinte SHA-256" },
        { time: "12:30", title: "Gagner des points et progresser dans le classement CTF" }
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Ouvrir l'onglet CTF Arena",
          detail: "Cliquez sur l'onglet CTF Arena dans la barre de commande supérieure."
        },
        {
          stepNumber: 2,
          title: "Lire attentivement l'indice",
          detail: "L'épreuve 1 'The Ancient Cipher' vous fournit un texte décalé par une substitution classique."
        },
        {
          stepNumber: 3,
          title: "Décoder et soumettre le Flag",
          detail: "Décalez les lettres de 13 crans pour obtenir `FLAG{caesar_was_an_analyst}` et validez pour remporter +100 XP !"
        }
      ],
      pitfalls: [
        "Copier-coller des espaces involontaires avant ou après le flag lors de la soumission.",
        "Chercher des explications trop complexes alors que l'énoncé donne souvent un indice direct.",
        "Se décourager : la clé en CTF est la persévérance et le test méthodique des hypothèses."
      ],
      quiz: {
        question: "Si une épreuve CTF affiche la chaîne `SYNT{ebg13}`, quel algorithme classique a été utilisé pour la chiffrer ?",
        options: [
          "AES-256 en mode CBC",
          "ROT13 (chiffrement de César avec décalage de 13 lettres)",
          "Une fonction de hachage SHA-512",
          "Le chiffrement asymétrique RSA"
        ],
        answerIndex: 1,
        explanation: "En décalant chaque lettre de 13 rangs (ROT13), 'SYNT' devient 'FLAG', ce qui révèle la solution."
      }
    },
    actionTarget: "ctf",
    actionLabelEn: "🚩 Enter CTF Arena",
    actionLabelFr: "🚩 Entrer dans l'Arène CTF"
  },
  {
    id: "tut-08-mitre-navigator",
    track: "mitre",
    level: "intermediate",
    duration: "16 min",
    videoUrl: "https://www.youtube-nocookie.com/embed/4Y2nIqZ4bE0",
    thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=80",
    en: {
      title: "How to Read the MITRE ATT&CK Matrix Like a Real Cyber Pro",
      tagline: "Demystifying the 13 Enterprise Tactics, 26 Techniques, and SIEM Detection Rules.",
      elif5: "Imagine a master burglary playbook that documents every single move a bank robber could make: from casing the building (Reconnaissance), picking the lock (Initial Access), disabling alarms (Defense Evasion), to stealing the vault cash (Impact). MITRE ATT&CK is that exact encyclopedia, but for state-sponsored cyber attackers and ransomware gangs.",
      keyTerms: [
        { term: "Tactic", def: "The attacker's overarching objective (the 'WHY', e.g., Initial Access, Persistence, Privilege Escalation)." },
        { term: "Technique", def: "The specific method or technology used to achieve a tactic (the 'HOW', e.g., T1566 Phishing, T1059 Command Execution)." },
        { term: "APT (Advanced Persistent Threat)", def: "Sophisticated, usually nation-state hacking groups (like APT28 Fancy Bear or APT29 Cozy Bear)." },
        { term: "SIEM Detection Rule", def: "A query written in languages like Sigma or Splunk SPL that flags suspicious telemetry matching a technique." }
      ],
      chapters: [
        { time: "00:00", title: "The Philosophy of Threat-Informed Defense" },
        { time: "03:40", title: "The 13 Tactics Chronology: From Recon to Impact" },
        { time: "07:20", title: "Deep Dive into T1566 (Phishing) and T1059 (PowerShell)" },
        { time: "11:15", title: "How SOC Analysts Write SIEM Rules from MITRE IDs" },
        { time: "14:00", title: "Navigating the CyberOps ATT&CK Matrix Explorer" }
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Understand the Horizontal Flow",
          detail: "Columns run chronologically from left (Reconnaissance, Resource Development) to right (Exfiltration, Impact)."
        },
        {
          stepNumber: 2,
          title: "Click on any Technique in the Matrix",
          detail: "Open technique T1566 (Phishing) in the CyberOps MITRE view to inspect threat actors, detection rules, and mitigations."
        },
        {
          stepNumber: 3,
          title: "Study the Associated SIEM Sigma Rule",
          detail: "Notice how defensive SIEM systems look for command lines like `powershell -enc` or suspicious macro launches in Office files."
        }
      ],
      pitfalls: [
        "Assuming MITRE ATT&CK is a compliance checklist (it is a behavioral knowledge base of adversary activity).",
        "Focusing only on the Initial Access column and neglecting Persistence and Privilege Escalation.",
        "Ignoring mitigation advice: MITRE lists exact defensive controls (M1049, M1020) to neutralize each attack vector."
      ],
      quiz: {
        question: "In the MITRE ATT&CK Enterprise Matrix, what is the distinction between a 'Tactic' and a 'Technique'?",
        options: [
          "A tactic is an antivirus brand, while a technique is a computer virus",
          "A tactic describes the attacker's objective (the 'Why'), while a technique describes the specific action taken (the 'How')",
          "A tactic is for Windows only, while a technique is for Linux only",
          "There is no difference; they are interchangeable marketing terms"
        ],
        answerIndex: 1,
        explanation: "Tactics define the adversary's tactical goal (e.g., Persistence), while Techniques explain the exact technical mechanism used to reach that goal (e.g., Scheduled Task)."
      }
    },
    fr: {
      title: "Comment Lire la Matrice MITRE ATT&CK Comme un Vrai Expert Cyber",
      tagline: "Démystifiez les 13 tactiques d'entreprise, les 26 techniques et les règles de détection SIEM.",
      elif5: "Imaginez le guide exhaustif d'un cambrioleur professionnel qui détaille chaque étape : repérer le bâtiment (Reconnaissance), crocheter la serrure (Accès Initial), éteindre les alarmes (Évasion de Défense) et vider le coffre (Impact). MITRE ATT&CK est cette encyclopédie exacte appliquée aux cyberattaques réelles.",
      keyTerms: [
        { term: "Tactique", def: "L'objectif stratégique de l'attaquant (le 'POURQUOI', ex: Accès Initial, Persistance, Élévation de Privilèges)." },
        { term: "Technique", def: "La méthode technique précise employée pour atteindre l'objectif (le 'COMMENT', ex: T1566 Phishing, T1059 Scripting)." },
        { term: "APT (Advanced Persistent Threat)", def: "Groupe d'attaquants très qualifié, souvent financé par un État (ex: APT28, APT29)." },
        { term: "Règle de Détection SIEM", def: "Une règle (en Sigma ou SPL) qui analyse les journaux pour alerter sur l'utilisation d'une technique." }
      ],
      chapters: [
        { time: "00:00", title: "La philosophie de la défense guidée par le renseignement sur les menaces" },
        { time: "03:40", title: "Chronologie des 13 tactiques : de la reconnaissance à l'impact" },
        { time: "07:20", title: "Étude de cas : T1566 (Hameçonnage) et T1059 (Interpréteurs de commandes)" },
        { time: "11:15", title: "Comment un analyste SOC écrit une règle SIEM à partir du framework" },
        { time: "14:00", title: "Utiliser la matrice interactive de CyberOps Academy" }
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Observer la progression horizontale",
          detail: "Les colonnes se lisent de gauche à droite, depuis la préparation jusqu'à l'exfiltration ou la destruction de données."
        },
        {
          stepNumber: 2,
          title: "Cliquer sur une technique dans la matrice",
          detail: "Consultez la technique T1566 (Phishing) pour visualiser les groupes APT associés et les signatures de détection."
        },
        {
          stepNumber: 3,
          title: "Examiner la règle de détection SIEM",
          detail: "Observez comment les règles surveillent l'exécution de processus suspects comme `powershell.exe -ExecutionPolicy Bypass`."
        }
      ],
      pitfalls: [
        "Considérer MITRE ATT&CK comme une simple liste de conformité (c'est une cartographie vivante des comportements adverses).",
        "Se focaliser uniquement sur l'accès initial en oubliant la persistance et le mouvement latéral.",
        "Ignorer les mesures de mitigation documentées pour chaque technique."
      ],
      quiz: {
        question: "Dans le framework MITRE ATT&CK, quelle est la différence entre une 'Tactique' et une 'Technique' ?",
        options: [
          "Une tactique est un logiciel antivirus, une technique est un virus informatique",
          "Une tactique représente l'objectif de l'attaquant (le Pourquoi), alors qu'une technique décrit l'action technique précise (le Comment)",
          "Les tactiques s'appliquent uniquement à Windows et les techniques à Linux",
          "Il n'y a aucune différence, ce sont des synonymes commerciaux"
        ],
        answerIndex: 1,
        explanation: "La tactique représente l'intention ou l'objectif de l'attaquant (ex: Persistance), tandis que la technique décrit le mode opératoire technique précis (ex: Création d'une tâche planifiée)."
      }
    },
    actionTarget: "mitre",
    actionLabelEn: "🦅 Open MITRE Matrix Navigator",
    actionLabelFr: "🦅 Ouvrir le Navigateur MITRE ATT&CK"
  },
  {
    id: "tut-09-soc-wargame",
    track: "wargame",
    level: "advanced",
    duration: "20 min",
    videoUrl: "https://www.youtube-nocookie.com/embed/3hQ6ZtV-g8E",
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    en: {
      title: "SOC Incident Commander: How to Solve Crisis Wargames",
      tagline: "Master live SIEM telemetry, contain ransomware outbreaks, and eliminate persistent malware.",
      elif5: "When an emergency happens in a hospital, the chief surgeon coordinates doctors, stops bleeding, and isolates infections. In a cybersecurity crisis, the Incident Commander does the exact same thing: triages alerts, cuts off infected computers from the network before ransomware spreads, and recovers clean data from backups.",
      keyTerms: [
        { term: "SIEM (Security Information & Event Management)", def: "A centralized software platform that aggregates and correlates log data from servers, firewalls, and endpoints." },
        { term: "EDR (Endpoint Detection & Response)", def: "Software installed on laptops and servers that continuously monitors process activity and allows remote network isolation." },
        { term: "Containment", def: "The critical phase of incident response where compromised systems are quarantined to prevent lateral movement." },
        { term: "Lateral Movement", def: "Techniques cyber adversaries use to spread from an initial compromised computer to other machines on the network." }
      ],
      chapters: [
        { time: "00:00", title: "The High-Stakes World of Incident Response" },
        { time: "04:15", title: "Triaging the 3 Enterprise Wargame Scenarios" },
        { time: "08:30", title: "Reading Live SIEM Log Telemetry in Real-Time" },
        { time: "12:45", title: "Deciding Between Host Isolation vs Service Shutdown" },
        { time: "17:10", title: "Post-Incident Eradication, Recovery & Lessons Learned" }
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Analyze Scenario 1 (Ransomware Outbreak)",
          detail: "Observe SIEM alerts indicating excessive `.locked` file renames and Canary honeypot triggers on FileServer-01."
        },
        {
          stepNumber: 2,
          title: "Execute Immediate Network Isolation",
          detail: "Isolate the patient zero endpoint (Workstation-84) via EDR to sever communication with the attacker's Command & Control (C2) server."
        },
        {
          stepNumber: 3,
          title: "Restore from Immutable Offline Backups",
          detail: "Never pay the ransom. Validate backup snapshots taken prior to the breach and restore clean data."
        }
      ],
      pitfalls: [
        "Rebooting an infected machine immediately (this destroys volatile RAM evidence needed for forensic investigation).",
        "Assuming an attack is over after deleting one infected file without checking for persistent backdoor scheduled tasks.",
        "Failing to communicate with executive leadership and legal teams during a data breach."
      ],
      quiz: {
        question: "When responding to an active ransomware outbreak spreading across the local subnet, what is the FIRST critical operational action?",
        options: [
          "Format all hard drives and reinstall Windows from a USB key",
          "Isolate compromised endpoints from the network to stop lateral spread while preserving RAM evidence",
          "Send an email to the attackers asking for a discount on the decryption key",
          "Turn off building electricity"
        ],
        answerIndex: 1,
        explanation: "Network isolation stops the ransomware from reaching other servers or calling home to C2, while preserving volatile memory (RAM) for incident forensics."
      }
    },
    fr: {
      title: "Commandant d'Incident SOC : Résoudre les Wargames de Crise",
      tagline: "Maîtrisez la télémétrie SIEM en direct, endiguez un ransomware et éradiquez les menaces persistantes.",
      elif5: "En salle d'urgence médicale, le médecin chef coordonne les soins, stoppe les hémorragies et isole les infections. Lors d'une cyberattaque, le commandant d'incident fait pareil : il analyse les alertes, coupe les postes infectés du réseau avant la propagation et restaure les sauvegardes saines.",
      keyTerms: [
        { term: "SIEM", def: "Une plateforme centrale qui collecte, indexe et corrèle les journaux d'événements de toute l'infrastructure." },
        { term: "EDR", def: "Un agent logiciel installé sur les postes surveillant les comportements anormaux et permettant l'isolement réseau." },
        { term: "Confinement (Containment)", def: "L'étape cruciale où l'on isole les machines compromises pour bloquer la propagation latérale." },
        { term: "Mouvement Latéral", def: "Les techniques employées par l'attaquant pour passer du poste initialement infecté aux serveurs critiques." }
      ],
      chapters: [
        { time: "00:00", title: "Les enjeux critiques de la gestion de crise cyber" },
        { time: "04:15", title: "Présentation des 3 scénarios de wargame d'entreprise" },
        { time: "08:30", title: "Interprétation des logs SIEM en temps réel" },
        { time: "12:45", title: "Arbitrer entre isolement d'hôte et arrêt de service" },
        { time: "17:10", title: "Éradication, reprise d'activité et retour d'expérience (RETEX)" }
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Analyser le Scénario 1 (Attaque Ransomware)",
          detail: "Repérez les alertes SIEM de renommage massif d'extensions en `.locked` et le déclenchement du leurre Canary."
        },
        {
          stepNumber: 2,
          title: "Déclencher l'isolement réseau immédiat",
          detail: "Isolez le poste source 'Workstation-84' via l'EDR pour couper le flux de commande et contrôle (C2) de l'attaquant."
        },
        {
          stepNumber: 3,
          title: "Restaurer les données depuis les sauvegardes immuables",
          detail: "Ne jamais payer de rançon. Validez l'intégrité des snapshots préalables à l'intrusion et redémarrez les services."
        }
      ],
      pitfalls: [
        "Éteindre ou redémarrer brutalement la machine (ce qui détruit les preuves volatiles contenues dans la mémoire RAM).",
        "Supprimer un exécutable sans chercher les mécanismes de persistance (tâches planifiées, clés de registre Run).",
        "Négliger la communication de crise avec la direction et les autorités compétentes (RGPD/CNIL)."
      ],
      quiz: {
        question: "Face à une épidémie active de ransomware sur un réseau d'entreprise, quelle est la PREMIÈRE action opérationnelle à mener ?",
        options: [
          "Formater tous les disques durs sans analyse préalable",
          "Isoler immédiatement les hôtes compromis du réseau pour stopper le mouvement latéral tout en préservant la RAM",
          "Négocier immédiatement le montant de la rançon par email",
          "Couper l'électricité générale du bâtiment"
        ],
        answerIndex: 1,
        explanation: "L'isolement réseau neutralise la propagation et coupe la communication avec les attaquants tout en conservant la mémoire vive indispensable à l'analyse médico-légale."
      }
    },
    actionTarget: "wargame",
    actionLabelEn: "🚨 Enter SOC Crisis Wargame",
    actionLabelFr: "🚨 Entrer dans le Wargame SOC"
  },
  {
    id: "tut-10-srs-flashcards",
    track: "exam",
    level: "beginner",
    duration: "10 min",
    videoUrl: "https://www.youtube-nocookie.com/embed/ukPnVv_dKz0",
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80",
    en: {
      title: "Study Hacking: How Spaced Repetition (SRS) Guarantees Exam Success",
      tagline: "Learn the memory science behind the SuperMemo SM-2 algorithm and ace your European Bachelor.",
      elif5: "When you learn a new cybersecurity concept, your brain forgets 70% of it within 48 hours (the Forgetting Curve). But if you review it right before you forget it, the memory becomes dramatically stronger. Spaced Repetition is a smart schedule that tests you right before you forget, locking information permanently into long-term memory.",
      keyTerms: [
        { term: "Forgetting Curve", def: "The mathematical decay of human memory over time when no attempt is made to retain it (discovered by Hermann Ebbinghaus)." },
        { term: "Active Recall", def: "Testing your memory by answering before looking at the solution, creating much stronger neural pathways than passive reading." },
        { term: "Spaced Repetition System (SRS)", def: "An algorithm that spaces out card reviews at increasing intervals based on how easily you remembered them." },
        { term: "SM-2 Algorithm", def: "The proven algorithm used by Anki and CyberOps Academy that calculates intervals (1 day, 3 days, 6 days, etc.)." }
      ],
      chapters: [
        { time: "00:00", title: "Why Cramming the Night Before Always Fails" },
        { time: "02:45", title: "The Ebbinghaus Forgetting Curve Explained" },
        { time: "05:10", title: "Active Recall: The 3D Flip Card Effect" },
        { time: "07:30", title: "Rating Your Recall: Again, Hard, Good, Easy" },
        { time: "08:50", title: "How to Build a 10-Minute Daily Study Routine" }
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Open the Flashcards (SRS) Tab",
          detail: "Select a module or choose 'All Modules' to generate an intelligent deck of review cards."
        },
        {
          stepNumber: 2,
          title: "Attempt to Answer in Your Head First",
          detail: "Read the prompt (e.g. 'What is the default port for DNS?'). Formulate your answer BEFORE clicking the card to flip."
        },
        {
          stepNumber: 3,
          title: "Rate Your Performance Honestly",
          detail: "Click 'Again' (if forgotten), 'Hard' (hesitated), 'Good' (correct), or 'Easy' (effortless). The system recalculates optimal review intervals automatically."
        }
      ],
      pitfalls: [
        "Flipping the card immediately without trying to recall the answer first (passive reading gives a false illusion of competence).",
        "Rating cards as 'Easy' when you actually guessed, leading to premature interval increases.",
        "Skipping days: SRS works with minimal effort (10 mins/day), but requires daily consistency."
      ],
      quiz: {
        question: "Why is 'Active Recall' vastly superior to simply re-reading textbook pages multiple times?",
        options: [
          "Because active recall uses less battery power on laptops",
          "Because retrieving knowledge from memory stimulates neural plasticity and solidifies long-term synaptic connections",
          "Because exams are always multiple choice",
          "Because textbooks contain outdated information"
        ],
        answerIndex: 1,
        explanation: "Cognitive science proves that the mental effort of retrieving an answer from memory strengthens neural pathways far more than passive recognition through reading."
      }
    },
    fr: {
      title: "Hacking Mémoriel : Comment la Répétition Espacée (SRS) Garantit la Réussite",
      tagline: "Découvrez la science de l'algorithme SuperMemo SM-2 pour mémoriser durablement le programme FEDE.",
      elif5: "Quand vous apprenez une notion, votre cerveau en oublie 70% en 48 heures (la courbe de l'oubli). Mais si vous la révisez juste avant de l'oublier, le souvenir s'ancre plus profondément. La répétition espacée calcule l'instant précis où vous devez revoir chaque carte pour la graver dans votre mémoire à long terme.",
      keyTerms: [
        { term: "Courbe de l'Oubli", def: "Le déclin naturel de la rétention mnésique au fil du temps sans rappel actif (Hermann Ebbinghaus)." },
        { term: "Rappel Actif (Active Recall)", def: "L'effort de formuler la réponse avant de retourner la carte, stimulant les connexions neuronales." },
        { term: "Répétition Espacée (SRS)", def: "Un système algorithmique qui espace les révisions selon votre niveau de maîtrise pour maximiser la rétention." },
        { term: "Algorithme SM-2", def: "L'algorithme de référence (utilisé par Anki et CyberOps) qui calcule les intervalles de révision optimaux." }
      ],
      chapters: [
        { time: "00:00", title: "Pourquoi réviser la veille de l'examen est inefficace" },
        { time: "02:45", title: "Comprendre la courbe de l'oubli d'Ebbinghaus" },
        { time: "05:10", title: "Le pouvoir du rappel actif et l'animation 3D des cartes" },
        { time: "07:30", title: "Comment s'auto-évaluer : À revoir, Difficile, Bon, Facile" },
        { time: "08:50", title: "Créer une routine quotidienne de 10 minutes" }
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Accéder à l'onglet Flashcards (SRS)",
          detail: "Sélectionnez un module spécifique ou l'ensemble du cursus pour générer votre deck de révision."
        },
        {
          stepNumber: 2,
          title: "Formuler la réponse mentalement",
          detail: "Lisez la question (ex: 'Quel est le port par défaut du service SSH ?'). Répondez mentalement AVANT de retourner la carte."
        },
        {
          stepNumber: 3,
          title: "Noter votre restitution avec honnêteté",
          detail: "Cliquez sur 'À revoir', 'Difficile', 'Bon' ou 'Facile' pour que le moteur ajuste automatiquement la prochaine date de rappel."
        }
      ],
      pitfalls: [
        "Retourner la carte trop vite sans faire l'effort d'extraire la réponse de sa mémoire.",
        "Se mentir à soi-même en cochant 'Facile' lorsqu'on a simplement deviné.",
        "Accumuler des retards : 10 minutes par jour suffisent, mais la régularité est indispensable."
      ],
      quiz: {
        question: "Pourquoi le 'Rappel Actif' est-il scientifiquement supérieur à la relecture passive de ses cours ?",
        options: [
          "Parce qu'il consomme moins d'énergie sur écran",
          "Parce que l'effort cognitif d'extraction de l'information stimule la plasticité cérébrale et ancre les connexions synaptiques",
          "Parce que les examens sont tous des questionnaires simples",
          "Parce que les livres de cours sont trop volumineux"
        ],
        answerIndex: 1,
        explanation: "L'effort de recherche en mémoire lors du rappel actif renforce les réseaux neuronaux de manière infiniment plus robuste qu'une simple lecture passive."
      }
    },
    actionTarget: "flashcards",
    actionLabelEn: "🗂️ Open Flashcards (SRS)",
    actionLabelFr: "🗂️ Ouvrir les Flashcards (SRS)"
  },
  {
    id: "tut-11-fede-exam-prep",
    track: "exam",
    level: "intermediate",
    duration: "13 min",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80",
    en: {
      title: "FEDE European Bachelor Exam Simulator: Strategy & Blueprint",
      tagline: "How to tackle 60 randomized questions in 90 minutes, score 70%+, and print your graduation certificate.",
      elif5: "An exam is not a memory contest, it is a game of strategy. By learning how to eliminate obviously wrong answers, manage your 90-minute timer, and focus on high-yield network and security questions, you turn a stressful test into a predictable win.",
      keyTerms: [
        { term: "FEDE European Bachelor", def: "The official academic accreditation in Cybersecurity & Networks granted by the European Federation of Schools." },
        { term: "Pass Threshold (70%)", def: "Students must score at least 42 correct answers out of 60 questions (70%) to qualify for certification." },
        { term: "Process of Elimination", def: "A test-taking strategy where you identify and strike out 2 improbable options, raising your success odds from 25% to 50%." },
        { term: "Certificate of Completion", def: "A cryptographic verifiable PDF diploma generated in-browser upon meeting the graduation criteria." }
      ],
      chapters: [
        { time: "00:00", title: "Overview of the FEDE European Bachelor Standard" },
        { time: "03:10", title: "Anatomy of the 60-Question Randomized Bank" },
        { time: "06:30", title: "Time Management: 90 Seconds Per Question Strategy" },
        { time: "09:45", title: "Reviewing Wrong Answers and Weak Topic Diagnostic" },
        { time: "11:30", title: "Earning and Printing Your Official Certificate" }
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Launch Exam Simulator",
          detail: "Open the FEDE Exam Simulator tab. Select 60 questions and start the official 90-minute countdown."
        },
        {
          stepNumber: 2,
          title: "Flag Doubts for Later Review",
          detail: "Don't get stuck on one difficult question for 10 minutes. Pick your best guess, bookmark it, and return at the end."
        },
        {
          stepNumber: 3,
          title: "Analyze Score Breakdown & Generate Diploma",
          detail: "Review your percentage by category (Networking, Linux, Crypto, Governance). If score $\\ge 70\\%$, enter your name to generate your verified certificate."
        }
      ],
      pitfalls: [
        "Spending 5 minutes on the first 3 questions and running out of time on the last 20 questions.",
        "Misreading 'NOT' or 'EXCEPT' in question stems (e.g. 'Which of the following is NOT a symmetric cipher?').",
        "Leaving questions blank (there is no negative marking penalty in this simulator)."
      ],
      quiz: {
        question: "What is the official passing score threshold required to graduate the CyberOps Academy FEDE Exam Simulator?",
        options: [
          "50% (30/60 questions)",
          "70% (42/60 questions)",
          "85% (51/60 questions)",
          "100% (60/60 questions)"
        ],
        answerIndex: 1,
        explanation: "The European Bachelor FEDE standard requires candidates to achieve a minimum passing threshold of 70% (at least 42 correct answers out of 60 questions)."
      }
    },
    fr: {
      title: "Simulateur d'Examen Bachelor Européen FEDE : Stratégie & Réussite",
      tagline: "Comment aborder 60 questions aléatoires en 90 minutes, obtenir plus de 70% et générer votre diplôme.",
      elif5: "Un examen n'est pas un piège, c'est un jeu stratégique. En apprenant à éliminer les réponses absurdes, à surveiller votre chronomètre de 90 minutes et à cibler les questions clés de réseau et sécurité, vous transformez l'épreuve en succès garanti.",
      keyTerms: [
        { term: "Bachelor Européen FEDE", def: "La certification académique officielle en Cybersécurité et Réseaux de la Fédération Européenne des Écoles." },
        { term: "Seuil de Réussite (70%)", def: "Le candidat doit obtenir au minimum 42 bonnes réponses sur 60 (70%) pour valider l'examen." },
        { term: "Élimination Raisonnée", def: "Une technique consistant à exclure immédiatement 2 réponses incohérentes pour porter sa probabilité de succès à 50%." },
        { term: "Certificat d'Accomplissement", def: "Un diplôme numérique généré dans le navigateur avec identifiant unique et horodatage une fois le seuil atteint." }
      ],
      chapters: [
        { time: "00:00", title: "Présentation du référentiel Bachelor Européen FEDE" },
        { time: "03:10", title: "Structure du pool de 60 questions aléatoires" },
        { time: "06:30", title: "Gestion du temps : la règle des 90 secondes par question" },
        { time: "09:45", title: "Analyse des erreurs et diagnostic par domaine" },
        { time: "11:30", title: "Génération et impression du diplôme officiel" }
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Démarrer une session d'examen",
          detail: "Rendez-vous dans l'onglet Simulateur FEDE, activez le mode officiel (60 questions) et lancez le chronomètre de 90 minutes."
        },
        {
          stepNumber: 2,
          title: "Marquer les questions incertaines",
          detail: "Ne bloquez jamais plus de 2 minutes sur une question difficile. Notez votre meilleure hypothèse et revenez-y à la fin."
        },
        {
          stepNumber: 3,
          title: "Valider et imprimer le certificat",
          detail: "Consultez votre analyse par module. Si votre note est $\\ge 70\\%$, générez votre diplôme officiel nominatif imprimable."
        }
      ],
      pitfalls: [
        "Passer trop de temps sur les premières questions et se retrouver à court de temps pour les 15 dernières.",
        "Lire trop vite les énoncés négatifs contenant 'NE fait PAS partie' ou 'SAUF'.",
        "Laisser des questions sans réponse (il n'y a aucun point négatif pour les mauvaises réponses)."
      ],
      quiz: {
        question: "Quel est le seuil de réussite minimal exigé pour valider l'examen du Bachelor Européen FEDE dans le simulateur ?",
        options: [
          "50% (30/60 questions)",
          "70% (42/60 questions)",
          "85% (51/60 questions)",
          "100% (60/60 questions)"
        ],
        answerIndex: 1,
        explanation: "Le référentiel d'évaluation européenne FEDE exige un score minimal de 70% de réussite (au moins 42 bonnes réponses sur 60) pour l'obtention du titre."
      }
    },
    actionTarget: "exam",
    actionLabelEn: "⏱️ Open Exam Simulator",
    actionLabelFr: "⏱️ Ouvrir le Simulateur d'Examen"
  },
  {
    id: "tut-12-ai-scanner",
    track: "labs",
    level: "intermediate",
    duration: "12 min",
    videoUrl: "https://www.youtube-nocookie.com/embed/5a8eFwK4V_I",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    en: {
      title: "AI Vulnerability Scanner & Code Auditing (SAST & CVE Analysis)",
      tagline: "Use integrated multi-provider AI to spot security vulnerabilities and audit server logs in seconds.",
      elif5: "Reading 10,000 lines of code to find a single security flaw is like finding a needle in a haystack for a human. An AI code auditor is like an ultra-powerful magnet that sweeps through the haystack in 2 seconds, pulls out the needle, and even tells you how to replace it with a safe plastic needle!",
      keyTerms: [
        { term: "SAST (Static Application Security Testing)", def: "Analyzing source code for security vulnerabilities without executing the program." },
        { term: "CVE (Common Vulnerabilities & Exposures)", def: "A globally recognized dictionary of publicly disclosed cybersecurity vulnerabilities (e.g., CVE-2021-44228 Log4j)." },
        { term: "False Positive", def: "An alert indicating a vulnerability is present when, in reality, the code is safe and secure." },
        { term: "Remediation Snippet", def: "Exact, safe replacement code that neutralizes the reported vulnerability." }
      ],
      chapters: [
        { time: "00:00", title: "Why Code Auditing is Critical in Modern DevSecOps" },
        { time: "02:50", title: "Paste Vulnerable PHP, Python, and JavaScript Code" },
        { time: "05:40", title: "Running the AI SAST Engine: Gemini, Groq, and Ollama" },
        { time: "08:15", title: "Interpreting CVE Risk Scores & Remediation Suggestions" },
        { time: "10:30", title: "Auditing Live Apache & Linux Server Log Files" }
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Open the AI Scanner Lab",
          detail: "Navigate to the Cyber Labs hub and click on the 'AI Code & Log Scanner' tool."
        },
        {
          stepNumber: 2,
          title: "Select a Vulnerable Code Sample",
          detail: "Load the pre-packaged 'SQL Injection in PHP' or 'Command Injection in Python' preset."
        },
        {
          stepNumber: 3,
          title: "Trigger the Analysis",
          detail: "Click 'Analyze Code with AI'. Observe the detailed breakdown of the CWE flaw, severity rating, and secure patch code."
        }
      ],
      pitfalls: [
        "Blindly trusting AI suggestions without understanding the patch logic yourself.",
        "Sending proprietary company secret keys or customer passwords to public cloud AI endpoints without proper redaction.",
        "Ignoring log scanning: examining firewall and web server logs often detects active intrusions before code audits do."
      ],
      quiz: {
        question: "What does SAST (Static Application Security Testing) do?",
        options: [
          "It launches active brute force password attacks against a production server",
          "It analyzes source code for vulnerabilities and security flaws without running the code",
          "It scans physical hardware wires for electromagnetic radiation leaks",
          "It tests battery discharge rates during cyberattacks"
        ],
        answerIndex: 1,
        explanation: "SAST inspects non-running source code or binaries (static analysis) to identify security flaws before software is deployed into production."
      }
    },
    fr: {
      title: "Scanner de Vulnérabilités IA & Audit de Code (SAST & Analyse CVE)",
      tagline: "Utilisez l'IA multi-modèle pour identifier les failles de sécurité et auditer les logs de serveurs.",
      elif5: "Lire 10 000 lignes de code pour trouver une faille, c'est chercher une aiguille dans une botte de foin. L'IA d'audit est un aimant surpuissant qui passe sur la botte en 2 secondes, attrape l'aiguille et vous explique comment la remplacer par une aiguille inoffensive.",
      keyTerms: [
        { term: "SAST (Static Application Security Testing)", def: "L'analyse statique du code source à la recherche de failles sans exécuter le programme." },
        { term: "CVE (Common Vulnerabilities & Exposures)", def: "Le registre mondial répertoriant les vulnérabilités de sécurité connues du public." },
        { term: "Faux Positif", def: "Une alerte signalant une vulnérabilité alors que le code est en réalité parfaitement sécurisé." },
        { term: "Snippet de Remédiation", def: "Le bloc de code corrigé prêt à l'emploi qui neutralise définitivement la faille." }
      ],
      chapters: [
        { time: "00:00", title: "Pourquoi l'audit de code est au cœur du DevSecOps" },
        { time: "02:50", title: "Charger un exemple vulnérable (PHP, Python, JS)" },
        { time: "05:40", title: "Exécuter le moteur IA SAST (Gemini, Groq, Ollama)" },
        { time: "08:15", title: "Comprendre les scores de criticité et les correctifs" },
        { time: "10:30", title: "Auditer des fichiers de logs Apache et Linux" }
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Accéder au Lab Scanner IA",
          detail: "Cliquez sur l'onglet Cyber Labs puis activez l'outil 'Scanner de Code & Logs par IA'."
        },
        {
          stepNumber: 2,
          title: "Sélectionner un extrait de code vulnérable",
          detail: "Chargez l'un des exemples prédéfinis : injection SQL en PHP ou injection de commandes en Python."
        },
        {
          stepNumber: 3,
          title: "Lancer l'audit de sécurité",
          detail: "Cliquez sur 'Analyser le code avec l'IA' pour générer le rapport détaillé, le niveau de risque et le code corrigé."
        }
      ],
      pitfalls: [
        "Appliquer aveuglément les correctifs proposés par l'IA sans les tester ni comprendre leur logique.",
        "Transmettre des secrets ou des clés d'API sensibles dans des prompts d'IA publiques sans anonymisation.",
        "Oublier l'analyse des journaux serveur qui permet souvent de détecter une attaque en cours."
      ],
      quiz: {
        question: "En quoi consiste l'analyse SAST (Static Application Security Testing) ?",
        options: [
          "À tenter de pirater un serveur de production en ligne par force brute",
          "À analyser le code source à la recherche de failles de sécurité sans exécuter le programme",
          "À mesurer la température physique des serveurs en salle machine",
          "À tester la résistance des câbles réseau contre les interférences"
        ],
        answerIndex: 1,
        explanation: "L'analyse statique (SAST) inspecte le code source au repos sans l'exécuter, identifiant les vulnérabilités potentielles avant la mise en production."
      }
    },
    actionTarget: "scanner",
    actionLabelEn: "🔍 Launch AI Security Scanner",
    actionLabelFr: "🔍 Lancer le Scanner IA"
  }
];
