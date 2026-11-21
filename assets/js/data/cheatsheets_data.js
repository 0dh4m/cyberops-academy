/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <0dh4mm@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - Cybersecurity Cheat Sheets & Payloads Database
 * Extensive, categorized quick-reference commands with 1-click clipboard copy
 * and direct execution into the in-browser Aegis Terminal shell.
 */
window.CheatsheetsData = [
  // --- LINUX COMMANDS & FORENSICS ---
  {
    id: "cmd-linux-find-suid",
    category: "linux",
    risk: "safe",
    command: "find / -perm -4000 -type f -exec ls -la {} + 2>/dev/null",
    en: {
      title: "Find SUID Privilege Escalation Binaries",
      desc: "Searches the entire filesystem for executables that run with root privileges (SUID bit set). Critical for identifying local privilege escalation vectors (GTFOBins)."
    },
    fr: {
      title: "Rechercher les Binaires SUID pour Élévation de Privilèges",
      desc: "Scanne l'arborescence à la recherche des fichiers exécutables s'exécutant avec les privilèges root (bit SUID). Indispensable pour détecter les failles d'élévation locale."
    },
    tags: ["Linux", "PrivEsc", "Forensics", "Root"]
  },
  {
    id: "cmd-linux-netstat",
    category: "linux",
    risk: "safe",
    command: "ss -tulpn | grep LISTEN",
    en: {
      title: "Inspect All Listening TCP/UDP Ports & Associated PIDs",
      desc: "Displays active listening network sockets, protocol (TCP/UDP), local address, port number, and the exact PID and process name bound to each port."
    },
    fr: {
      title: "Lister les Ports TCP/UDP en Écoute et Processus Associés",
      desc: "Affiche tous les ports ouverts en écoute, le protocole (TCP/UDP) et le nom exact du binaire ou PID rattaché."
    },
    tags: ["Linux", "Network", "Sockets", "Ports"]
  },
  {
    id: "cmd-linux-auth-logs",
    category: "linux",
    risk: "safe",
    command: "grep 'Failed password' /var/log/auth.log | awk '{print $1,$2,$3,$9,$11}' | tail -n 25",
    en: {
      title: "Extract SSH Brute Force & Failed Login Attempts",
      desc: "Filters authentication logs to highlight the last 25 failed password attempts with timestamps, target username, and attacker source IP."
    },
    fr: {
      title: "Extraire les Tentatives d'Attaque par Force Brute SSH",
      desc: "Filtre les journaux d'authentification pour isoler les 25 derniers échecs de connexion SSH avec l'horodatage et l'IP source."
    },
    tags: ["Linux", "SIEM", "Logs", "BruteForce"]
  },
  {
    id: "cmd-linux-crontab",
    category: "linux",
    risk: "safe",
    command: "ls -la /etc/cron* /var/spool/cron/crontabs/",
    en: {
      title: "Inspect Scheduled Tasks for Persistence Backdoors",
      desc: "Audits system crontabs and scheduled cron directories to detect persistence mechanisms planted by attackers."
    },
    fr: {
      title: "Auditer les Tâches Planifiées (Persistance Adversaire)",
      desc: "Inspecte les répertoires cron pour identifier d'éventuels scripts malveillants programmés pour maintenir l'accès."
    },
    tags: ["Linux", "Persistence", "Cron", "Auditing"]
  },

  // --- NMAP NETWORK SCANNING ---
  {
    id: "cmd-nmap-stealth",
    category: "nmap",
    risk: "caution",
    command: "nmap -sS -sV -sC -T4 -p- 192.168.1.0/24 -oA network_audit",
    en: {
      title: "SYN Stealth Scan with Service Version & Default Scripts",
      desc: "Runs half-open SYN scanning across all 65,535 TCP ports on a subnet, probes for service versions (`-sV`), executes safe NSE scripts (`-sC`), and exports results in all formats."
    },
    fr: {
      title: "Scan Furtif SYN avec Détection de Versions et Scripts",
      desc: "Exécute un scan SYN semi-ouvert sur tous les 65 535 ports TCP d'un réseau, identifie les bannières de version et génère un rapport complet."
    },
    tags: ["Nmap", "Reconnaissance", "Scanning", "NSE"]
  },
  {
    id: "cmd-nmap-vuln",
    category: "nmap",
    risk: "caution",
    command: "nmap -p 80,443,445,3389 --script vuln 192.168.1.50",
    en: {
      title: "Audit High-Risk Ports for Known CVE Vulnerabilities",
      desc: "Scans targeted services (HTTP, HTTPS, SMB, RDP) using the Nmap Vuln engine to check for exploitable flaws like EternalBlue (MS17-010) or Log4j."
    },
    fr: {
      title: "Scanner les Ports Critiques avec le Moteur de Vulnérabilités NSE",
      desc: "Vérifie les services HTTP, SMB et RDP à la recherche de CVEs connues et exploitables (comme EternalBlue MS17-010)."
    },
    tags: ["Nmap", "CVE", "Vulnerabilities", "Auditing"]
  },
  {
    id: "cmd-nmap-fast",
    category: "nmap",
    risk: "safe",
    command: "nmap -F --open 10.0.0.1",
    en: {
      title: "Fast Port Scan Showing Only Open Ports",
      desc: "Scans the top 100 most common ports in under 2 seconds and displays only ports that are confirmed open."
    },
    fr: {
      title: "Scan Rapide des 100 Ports les Plus Courants",
      desc: "Scanne les 100 ports les plus fréquents en moins de 2 secondes et ne filtre que les ports ouverts."
    },
    tags: ["Nmap", "Fast", "Discovery"]
  },

  // --- WIRESHARK & PACKET DISPLAY FILTERS ---
  {
    id: "cmd-wireshark-syn-flood",
    category: "wireshark",
    risk: "safe",
    command: "tcp.flags.syn == 1 && tcp.flags.ack == 0",
    en: {
      title: "Filter Initial SYN Packets (Port Scans & SYN Floods)",
      desc: "Displays only TCP connection requests where SYN is 1 and ACK is 0. An overwhelming number of these packets from a single source signals an ongoing port scan or SYN flood DDoS."
    },
    fr: {
      title: "Filtrer les Paquets SYN Initiaux (Scans & Inondation SYN)",
      desc: "Isole les requêtes TCP où seul le drapeau SYN est actif. Un volume anormal révèle un scan furtif ou une attaque DDoS par inondation."
    },
    tags: ["Wireshark", "Filters", "DDoS", "TCP"]
  },
  {
    id: "cmd-wireshark-cleartext",
    category: "wireshark",
    risk: "safe",
    command: "http.request.method == \"POST\" || ftp || telnet",
    en: {
      title: "Detect Plaintext Credentials in Unencrypted Traffic",
      desc: "Filters for cleartext web POST submissions, FTP credentials, and Telnet sessions that expose student or corporate passwords to network eavesdropping."
    },
    fr: {
      title: "Détecter les Mots de Passe Transmis en Clair",
      desc: "Filtre les requêtes POST non chiffrées (HTTP), FTP et Telnet exposant les identifiants sur le réseau local."
    },
    tags: ["Wireshark", "Credentials", "Cleartext", "HTTP"]
  },
  {
    id: "cmd-wireshark-dns-tunnel",
    category: "wireshark",
    risk: "safe",
    command: "dns.qry.name.len > 45 || dns.flags.response == 0",
    en: {
      title: "Identify DNS Covert Tunneling & Data Exfiltration",
      desc: "Detects suspiciously long DNS queries (e.g. `a4b7f9...evil.com`) commonly used by malware to smuggle stolen data past corporate firewalls."
    },
    fr: {
      title: "Détecter l'Exfiltration de Données par Tunneling DNS",
      desc: "Repère les requêtes DNS excessivement longues utilisées par les malwares pour exfiltrer des données à travers le pare-feu."
    },
    tags: ["Wireshark", "DNS", "Tunneling", "Exfiltration"]
  },

  // --- SQL INJECTION & WEB SECURITY PAYLOADS ---
  {
    id: "cmd-sqli-auth-bypass",
    category: "sqli",
    risk: "caution",
    command: "' OR '1'='1' -- ",
    en: {
      title: "Universal SQLi Authentication Bypass",
      desc: "Classic Boolean payload that forces the SQL `WHERE` clause to evaluate to TRUE, authenticating the user as the first account in the table (usually Admin)."
    },
    fr: {
      title: "Contournement d'Authentification SQL Universel",
      desc: "Payload booléen classique forçant la clause SQL `WHERE` à VRAI pour se connecter sans mot de passe sous le compte Administrateur."
    },
    tags: ["SQLi", "WebSec", "AuthBypass", "OWASP"]
  },
  {
    id: "cmd-sqli-union-extract",
    category: "sqli",
    risk: "caution",
    command: "' UNION SELECT null, table_name, column_name FROM information_schema.columns -- ",
    en: {
      title: "UNION-Based Schema & Column Enumeration",
      desc: "Appends a secondary query to extract database table names and column names directly into the visible web page output."
    },
    fr: {
      title: "Énumération des Tables et Colonnes par Injection UNION",
      desc: "Greffe une seconde requête pour extraire l'architecture des tables et colonnes de la base de données via information_schema."
    },
    tags: ["SQLi", "UNION", "Database", "Extraction"]
  },
  {
    id: "cmd-sqli-sleep-blind",
    category: "sqli",
    risk: "caution",
    command: "' OR IF(1=1, SLEEP(5), 0) -- ",
    en: {
      title: "Time-Based Blind SQL Injection Payload",
      desc: "Causes the database server to pause execution for 5 seconds if the condition is true. Used to extract data when no error messages or query results are returned on screen."
    },
    fr: {
      title: "Injection SQL Aveugle Temporelle (Time-Based Blind)",
      desc: "Provoque une pause de 5 secondes du serveur de base de données si la condition est vérifiée, utile quand aucune sortie n'est affichée à l'écran."
    },
    tags: ["SQLi", "TimeBased", "Blind", "Timing"]
  },

  // --- WINDOWS DEFENSE & ACTIVE DIRECTORY ---
  {
    id: "cmd-win-event-logons",
    category: "powershell",
    risk: "safe",
    command: "Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4624,4625} -MaxEvents 50 | Format-Table TimeCreated, Id, Message",
    en: {
      title: "Extract Successful (4624) & Failed (4625) Logon Events",
      desc: "Queries the Windows Security Event Log for logon activity, identifying rogue account access or brute-force sprays across domain controllers."
    },
    fr: {
      title: "Extraire les Événements de Connexion Windows (4624 / 4625)",
      desc: "Interroge les journaux de sécurité Windows pour auditer les connexions réussies et échouées sur le domaine."
    },
    tags: ["PowerShell", "ActiveDirectory", "EventLogs", "Auditing"]
  },
  {
    id: "cmd-win-kerberoast-audit",
    category: "powershell",
    risk: "safe",
    command: "Get-ADUser -Filter {ServicePrincipalName -ne \"$null\"} -Properties ServicePrincipalName",
    en: {
      title: "Audit Service Principal Names (SPN) Vulnerable to Kerberoasting",
      desc: "Enumerates Active Directory user accounts associated with SPNs. These accounts can be targeted by attackers to request and crack Kerberos TGS tickets offline."
    },
    fr: {
      title: "Lister les Comptes de Service (SPN) Vulnérables au Kerberoasting",
      desc: "Énumère les comptes d'utilisateurs Active Directory dotés d'un SPN susceptibles de faire l'objet d'une attaque Kerberoast."
    },
    tags: ["PowerShell", "ActiveDirectory", "Kerberos", "SPN"]
  },

  // --- CRYPTOGRAPHY & OPENSSL ---
  {
    id: "cmd-crypto-aes-encrypt",
    category: "crypto",
    risk: "safe",
    command: "openssl enc -aes-256-cbc -salt -pbkdf2 -iter 100000 -in secret.txt -out secret.enc",
    en: {
      title: "Encrypt File with Industry-Standard AES-256-CBC & PBKDF2",
      desc: "Encrypts confidential data using symmetric AES-256 with cryptographic salting and 100,000 PBKDF2 key derivation iterations to resist GPU brute forcing."
    },
    fr: {
      title: "Chiffrer un Fichier avec AES-256-CBC et Dérivation PBKDF2",
      desc: "Chiffre un document avec l'algorithme symétrique AES-256 en appliquant 100 000 itérations PBKDF2 pour neutraliser les attaques par GPU."
    },
    tags: ["OpenSSL", "AES", "Encryption", "Symmetric"]
  },
  {
    id: "cmd-crypto-sha256-verify",
    category: "crypto",
    risk: "safe",
    command: "sha256sum backup.iso | grep \"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855\"",
    en: {
      title: "Verify File Integrity Against Official SHA-256 Checksum",
      desc: "Computes the cryptographic digest of a downloaded ISO or executable to ensure it hasn't been tampered with or infected with a trojan."
    },
    fr: {
      title: "Vérifier l'Intégrité d'un Fichier via son Empreinte SHA-256",
      desc: "Calcule le condensat SHA-256 d'une archive ou exécutable pour s'assurer de sa conformité et de l'absence de falsification."
    },
    tags: ["OpenSSL", "SHA256", "Integrity", "Hash"]
  }
];
