/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <0dh4mm@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - MITRE ATT&CK Matrix Database
 * Comprehensive mapping of Tactics, Techniques, Threat Actors (APTs), Mitigations and MIAGE Curriculum Modules.
 * Language: Strictly English and French.
 */
const MitreAttackData = {
  tactics: [
    {
      id: "TA0043",
      num: 1,
      nameEn: "Reconnaissance",
      nameFr: "Reconnaissance",
      descriptionEn: "Gathering information to plan future adversary operations.",
      descriptionFr: "Collecte d'informations pour planifier les futures cyberattaques.",
      techniques: [
        {
          id: "T1595",
          nameEn: "Active Scanning",
          nameFr: "Balayage Actif",
          descriptionEn: "Adversaries probe target network infrastructure through automated port scanning, vulnerability probing, and IP sweeping.",
          descriptionFr: "Les attaquants sondent l'infrastructure réseau via des balayages de ports automatisés (Nmap) et la détection de vulnérabilités.",
          threatActors: ["APT29 (Cozy Bear)", "Lazarus Group", "Volt Typhoon"],
          mitigations: "Enforce perimeter firewalls, block unused ports, deploy rate limiting and Intrusion Detection Systems (IDS/IPS).",
          detection: "Sigma: Multiple TCP SYN connections to non-listening ports within short time windows; high volume of ICMP echo requests.",
          moduleId: "network-sec",
          moduleName: "Module 06: Network Security & Segmentation"
        },
        {
          id: "T1589",
          nameEn: "Gather Victim Identity Info",
          nameFr: "Collecte d'Identités de la Cible",
          descriptionEn: "Harvesting administrative employee names, corporate email addresses, and roles via LinkedIn and public OSINT registries.",
          descriptionFr: "Collecte de noms, adresses email professionnelles et rôles des employés via les sources ouvertes (OSINT, LinkedIn).",
          threatActors: ["FIN7", "APT41", "Kimsuky"],
          mitigations: "Security awareness training, minimizing public employee directory exposure, and enforcing strict privacy policies.",
          detection: "Monitor suspicious domain-level external web scrapers, automated search queries against company portals.",
          moduleId: "applied-math",
          moduleName: "Module 01: Applied Mathematics & Algorithms"
        }
      ]
    },
    {
      id: "TA0001",
      num: 2,
      nameEn: "Initial Access",
      nameFr: "Accès Initial",
      descriptionEn: "Techniques used to gain an initial foothold within the network.",
      descriptionFr: "Techniques utilisées pour obtenir un premier point d'accès dans le réseau.",
      techniques: [
        {
          id: "T1566",
          nameEn: "Phishing",
          nameFr: "Hameçonnage (Phishing)",
          descriptionEn: "Sending deceptive emails containing malicious macro-enabled documents or malicious credential-harvesting links.",
          descriptionFr: "Envoi d'e-mails trompeurs contenant des pièces jointes malveillantes ou des liens de collecte d'identifiants.",
          threatActors: ["APT28 (Fancy Bear)", "Sandworm Team", "Scattered Spider"],
          mitigations: "Deploy SPF, DKIM, DMARC, anti-phishing email gateways, and enforce Multi-Factor Authentication (MFA).",
          detection: "Inbound emails with anomalous macro attachments (.docm, .xlsm), spoofed display names, and newly registered domains.",
          moduleId: "incident-response",
          moduleName: "Module 10: Incident Response & Crisis Management"
        },
        {
          id: "T1190",
          nameEn: "Exploit Public-Facing App",
          nameFr: "Exploitation d'App Exposée",
          descriptionEn: "Targeting public internet-facing servers (Nginx, Apache, VPN gateways) using unpatched zero-days or known CVEs (e.g. Log4Shell, SQLi).",
          descriptionFr: "Ciblage de serveurs web exposés (Apache, Nginx, passerelles VPN) via des vulnérabilités connues (Log4Shell, SQLi).",
          threatActors: ["Lazarus Group", "HAFNIUM", "APT41"],
          mitigations: "Deploy Web Application Firewalls (WAF), enforce strict patch management, and apply network micro-segmentation.",
          detection: "WAF alerts triggering on SQL injection syntax, directory traversal attempts (`../..`), and RCE payloads.",
          moduleId: "web-security",
          moduleName: "Module 09: Web Application Security (OWASP Top 10)"
        }
      ]
    },
    {
      id: "TA0002",
      num: 3,
      nameEn: "Execution",
      nameFr: "Exécution",
      descriptionEn: "Techniques resulting in adversary-controlled code running on a local or remote system.",
      descriptionFr: "Techniques permettant d'exécuter du code malveillant sur un système local ou distant.",
      techniques: [
        {
          id: "T1059",
          nameEn: "Command & Scripting Interpreter",
          nameFr: "Interpréteur de Commandes & Scripts",
          descriptionEn: "Adversaries abuse PowerShell, Bash, Python, or Windows Command Shell (cmd) to run malicious code, download payloads, and execute commands.",
          descriptionFr: "Utilisation détournée de PowerShell, Bash, Python ou cmd pour exécuter des scripts malveillants et télécharger des payloads.",
          threatActors: ["APT28", "Turla", "Wizard Spider"],
          mitigations: "Enable PowerShell Constrained Language Mode, restrict script execution via AppLocker/WDAC, and audit command lines.",
          detection: "Sysmon Event ID 1: Suspicious command lines such as `powershell.exe -enc`, `powershell -ExecutionPolicy Bypass -NoProfile -WindowStyle Hidden`.",
          moduleId: "python-cyber",
          moduleName: "Module 03: Python Programming for Networks & Automation"
        },
        {
          id: "T1047",
          nameEn: "Windows Management Instrumentation",
          nameFr: "Instrumentation de Gestion Windows (WMI)",
          descriptionEn: "Adversaries abuse WMI to execute malicious commands, query system configuration, and create persistent event consumers.",
          descriptionFr: "Détournement de WMI pour exécuter des commandes furtives et interroger les hôtes sans toucher au disque.",
          threatActors: ["APT29", "FIN7", "APT32"],
          mitigations: "Block remote WMI access via Windows Firewall and restrict DCOM permissions.",
          detection: "Sysmon Event ID 19, 20, 21: WmiEventConsumer creation or `wmic process call create` invocations.",
          moduleId: "systems-admin",
          moduleName: "Module 04: Systems & Network Administration"
        }
      ]
    },
    {
      id: "TA0003",
      num: 4,
      nameEn: "Persistence",
      nameFr: "Persistance",
      descriptionEn: "Techniques used to maintain an active presence across system restarts and credential changes.",
      descriptionFr: "Techniques permettant de maintenir l'accès au système malgré les redémarrages.",
      techniques: [
        {
          id: "T1053",
          nameEn: "Scheduled Task / Cron Job",
          nameFr: "Tâche Planifiée / Cron Job",
          descriptionEn: "Adversaries create persistence by scheduling automated tasks (Windows Task Scheduler) or Cron jobs (/etc/cron.d) to re-spawn backdoors.",
          descriptionFr: "Création de tâches planifiées sous Windows ou de tâches Cron sous Linux pour relancer automatiquement les portes dérobées.",
          threatActors: ["APT29", "Dragonfly", "DarkGate"],
          mitigations: "Restrict user permissions to schedule tasks, monitor scheduled task directories, and enforce GPO audit policies.",
          detection: "Windows Security Event ID 4698 (A scheduled task was created); file modifications in `/etc/cron*` and `/var/spool/cron`.",
          moduleId: "systems-admin",
          moduleName: "Module 04: Systems & Network Administration"
        },
        {
          id: "T1547",
          nameEn: "Boot or Logon Autostart Execution",
          nameFr: "Exécution Automatique au Démarrage",
          descriptionEn: "Adding malicious executable paths to Registry Run keys (HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run) or Linux systemd services.",
          descriptionFr: "Ajout de clés de démarrage dans le registre Windows (Run / RunOnce) ou création de services systemd malveillants sous Linux.",
          threatActors: ["Emotet", "Qakbot", "Lazarus"],
          mitigations: "Restrict write access to Run keys using AppLocker and enforce EDR registry integrity monitoring.",
          detection: "Sysmon Event ID 13: Registry key modification targeting `CurrentVersion\\Run` or startup folders.",
          moduleId: "os-hardening",
          moduleName: "Module 05: Operating System Hardening"
        }
      ]
    },
    {
      id: "TA0004",
      num: 5,
      nameEn: "Privilege Escalation",
      nameFr: "Élévation de Privilèges",
      descriptionEn: "Techniques adversaries use to gain higher-level permissions (SYSTEM, root, Domain Admin).",
      descriptionFr: "Techniques pour acquérir des droits d'accès plus élevés (SYSTEM, root, Domain Admin).",
      techniques: [
        {
          id: "T1548",
          nameEn: "Abuse Elevation Mechanism",
          nameFr: "Détournement des Droits d'Élévation",
          descriptionEn: "Exploiting misconfigured sudo permissions (NOPASSWD), SUID binaries on Linux, or Windows UAC bypass techniques.",
          descriptionFr: "Exploitation de sudo mal configuré (NOPASSWD), de binaires SUID sous Linux ou de contournements UAC sous Windows.",
          threatActors: ["Lazarus Group", "BlackCat (ALPHV)", "Silence"],
          mitigations: "Audit `/etc/sudoers` strictly, remove unnecessary SUID bits (`chmod u-s`), and enforce least privilege principles.",
          detection: "Auditd logs showing unexpected `setuid()` calls; monitoring sudo executions with GTFOBins command binaries.",
          moduleId: "os-hardening",
          moduleName: "Module 05: Operating System Hardening"
        },
        {
          id: "T1068",
          nameEn: "Exploitation for Privilege Escalation",
          nameFr: "Exploitation de Vulnérabilités Système",
          descriptionEn: "Exploiting local kernel vulnerabilities (e.g. Dirty COW, PwnKit CVE-2021-4034) to elevate from unprivileged user to root/SYSTEM.",
          descriptionFr: "Exploitation de failles de noyau locales (ex: PwnKit, Dirty Pipe) pour passer d'utilisateur standard à root/SYSTEM.",
          threatActors: ["Sandworm", "APT41", "LockBit"],
          mitigations: "Apply OS kernel security updates promptly, enable live patching, and enforce SELinux / AppArmor profiles.",
          detection: "Abnormal crash dumps or unexpected privilege drops in system core processes (dmesg segfaults).",
          moduleId: "os-hardening",
          moduleName: "Module 05: Operating System Hardening"
        }
      ]
    },
    {
      id: "TA0005",
      num: 6,
      nameEn: "Defense Evasion",
      nameFr: "Évasion de Défense",
      descriptionEn: "Techniques used to avoid detection by security analysts and EDR tools.",
      descriptionFr: "Techniques utilisées pour tromper les antivirus, EDR et masquer les activités.",
      techniques: [
        {
          id: "T1070",
          nameEn: "Indicator Removal on Host",
          nameFr: "Suppression des Traces d'Activité",
          descriptionEn: "Deleting Windows Event Logs (`wevtutil cl security`), tampering with `/var/log/auth.log`, or wiping bash command history.",
          descriptionFr: "Effacement des journaux d'événements Windows (`wevtutil`), modification de `/var/log/` ou suppression de `.bash_history`.",
          threatActors: ["Sandworm Team", "APT38", "Volt Typhoon"],
          mitigations: "Forward all logs immediately to an immutable, centralized external SIEM (Wazuh, Splunk, Elastic) with write-once permissions.",
          detection: "Windows Event ID 1102 (The audit log was cleared); sudden truncation or disappearance of `/var/log/syslog`.",
          moduleId: "incident-response",
          moduleName: "Module 10: Incident Response & Crisis Management"
        },
        {
          id: "T1027",
          nameEn: "Obfuscated / Encrypted Information",
          nameFr: "Données Obfusquées ou Chiffrées",
          descriptionEn: "Encoding malware payloads using multi-stage Base64, XOR, or custom packers to evade signature-based antivirus scanning.",
          descriptionFr: "Encodage de charges utiles avec Base64, XOR ou des packers personnalisés pour contourner les antivirus statiques.",
          threatActors: ["Lazarus", "APT29", "Turla"],
          mitigations: "Deploy behavior-based EDR with AMSI (Antimalware Scan Interface) memory de-obfuscation inspection.",
          detection: "High Shannon entropy in script bodies; AMSI triggers on de-obfuscated script blocks in memory.",
          moduleId: "cryptography-data",
          moduleName: "Module 08: Cryptography & Data Protection"
        }
      ]
    },
    {
      id: "TA0006",
      num: 7,
      nameEn: "Credential Access",
      nameFr: "Accès aux Identifiants",
      descriptionEn: "Techniques for stealing credentials such as plaintext passwords, NTLM hashes, and Kerberos tickets.",
      descriptionFr: "Techniques pour dérober des mots de passe, des condensats (hashs) NTLM ou des tickets Kerberos.",
      techniques: [
        {
          id: "T1003",
          nameEn: "OS Credential Dumping",
          nameFr: "Vidage d'Identifiants Système",
          descriptionEn: "Extracting password hashes from the Windows LSASS process memory using Mimikatz, or reading the Linux `/etc/shadow` file.",
          descriptionFr: "Extraction des hashs NTLM de la mémoire LSASS sous Windows (Mimikatz) ou lecture non autorisée de `/etc/shadow`.",
          threatActors: ["APT28", "FIN6", "Lazarus Group", "LockBit"],
          mitigations: "Enable Windows LSA RunAsPPL protection, deploy Credential Guard, and strictly restrict Debug Privileges (`SeDebugPrivilege`).",
          detection: "Sysmon Event ID 10: Non-standard processes requesting `PROCESS_VM_READ` access against `lsass.exe`.",
          moduleId: "iam-security",
          moduleName: "Module 07: Identity & Access Management (IAM)"
        },
        {
          id: "T1110",
          nameEn: "Brute Force",
          nameFr: "Attaque par Force Brute",
          descriptionEn: "Systematically guessing passwords against remote authentication services (SSH, RDP, Kerberos Pre-Authentication).",
          descriptionFr: "Tentatives répétées de devinettes de mots de passe sur des services distants (SSH, RDP, Kerberos).",
          threatActors: ["Lazarus", "APT33", "Turla"],
          mitigations: "Enforce account lockout thresholds, deploy Fail2ban, and mandate multi-factor authentication (MFA).",
          detection: "Event ID 4625 (Failed logon attempt) occurring in rapid succession from identical foreign source IP.",
          moduleId: "cryptography-data",
          moduleName: "Module 08: Cryptography & Data Protection"
        }
      ]
    },
    {
      id: "TA0007",
      num: 8,
      nameEn: "Discovery",
      nameFr: "Découverte",
      descriptionEn: "Techniques used to gain knowledge about the internal network, host configuration, and active users.",
      descriptionFr: "Techniques pour explorer la configuration du réseau interne, des hôtes et des utilisateurs.",
      techniques: [
        {
          id: "T1046",
          nameEn: "Network Service Discovery",
          nameFr: "Découverte des Services Réseau",
          descriptionEn: "Scanning internal subnets to find vulnerable services, database servers, and Active Directory Domain Controllers.",
          descriptionFr: "Analyse des sous-réseaux internes pour repérer les serveurs de bases de données et les contrôleurs de domaine.",
          threatActors: ["Sandworm", "APT41", "Silence"],
          mitigations: "Network micro-segmentation, VLAN isolation, and continuous network traffic behavioral monitoring.",
          detection: "Internal host opening sockets to sequential IP addresses on ports 445 (SMB), 389 (LDAP), or 3389 (RDP).",
          moduleId: "network-sec",
          moduleName: "Module 06: Network Security & Segmentation"
        },
        {
          id: "T1087",
          nameEn: "Account Discovery",
          nameFr: "Découverte des Comptes Utilisateurs",
          descriptionEn: "Enumerating local and domain accounts using commands such as `net user /domain`, PowerShell AD cmdlets, or `getent passwd`.",
          descriptionFr: "Énumération des comptes locaux et de domaine Active Directory via des commandes CLI et scripts LDAP.",
          threatActors: ["FIN7", "APT29", "Wizard Spider"],
          mitigations: "Restrict domain enumeration rights, deploy honey accounts, and monitor LDAP query bursts.",
          detection: "Process creations invoking `net.exe user /domain` or mass LDAP queries (Event ID 1644).",
          moduleId: "iam-security",
          moduleName: "Module 07: Identity & Access Management (IAM)"
        }
      ]
    },
    {
      id: "TA0008",
      num: 9,
      nameEn: "Lateral Movement",
      nameFr: "Déplacement Latéral",
      descriptionEn: "Techniques used to navigate and control remote systems across the corporate network.",
      descriptionFr: "Techniques permettant de s'étendre et de pivoter d'un ordinateur à un autre dans le réseau.",
      techniques: [
        {
          id: "T1021",
          nameEn: "Remote Services (SMB / WinRM)",
          nameFr: "Services Distants (SMB / WinRM)",
          descriptionEn: "Adversaries pivot using stolen credentials over SMB (PsExec, WMI) or Windows Remote Management (WinRM) to execute payloads on other workstations.",
          descriptionFr: "Pivotement à l'aide d'identifiants volés via SMB (PsExec, WMI) ou WinRM pour contrôler d'autres postes du réseau.",
          threatActors: ["NotPetya (Sandworm)", "Wizard Spider", "APT29"],
          mitigations: "Disable SMBv1, isolate workstation-to-workstation traffic with host firewalls, and use separate local administrator passwords (LAPS).",
          detection: "Event ID 4624 (Type 3 network logon) using privileged accounts across internal endpoint workstations.",
          moduleId: "systems-admin",
          moduleName: "Module 04: Systems & Network Administration"
        },
        {
          id: "T1550",
          nameEn: "Use Alternate Auth Material",
          nameFr: "Utilisation d'Éléments d'Auth Alternatifs",
          descriptionEn: "Authenticating without the plaintext password by passing the NTLM hash (Pass-the-Hash) or Kerberos ticket (Pass-the-Ticket).",
          descriptionFr: "Authentification sans mot de passe en clair en rejouant un hash NTLM (Pass-the-Hash) ou un ticket Kerberos.",
          threatActors: ["APT28", "Lazarus", "FIN6"],
          mitigations: "Enforce Restricted Admin mode for RDP, disable NTLM across the domain in favor of Kerberos, and protect LSASS.",
          detection: "Event ID 4624 with Logon Type 3 or 9 and KeyLength 0 or RC4 encryption downgrade.",
          moduleId: "iam-security",
          moduleName: "Module 07: Identity & Access Management (IAM)"
        }
      ]
    },
    {
      id: "TA0009",
      num: 10,
      nameEn: "Collection",
      nameFr: "Collecte",
      descriptionEn: "Techniques used to gather sensitive data of interest (documents, emails, proprietary databases).",
      descriptionFr: "Techniques visant à identifier et rassembler les données confidentielles à voler.",
      techniques: [
        {
          id: "T1005",
          nameEn: "Data from Local System",
          nameFr: "Données du Système Local",
          descriptionEn: "Searching for and staging sensitive corporate files (.pdf, .docx, .sql, .kdbx) in hidden directories prior to exfiltration.",
          descriptionFr: "Recherche et rassemblement de fichiers sensibles (.pdf, .docx, .sql, .kdbx) dans des répertoires temporaires.",
          threatActors: ["APT37", "FIN7", "MuddyWater"],
          mitigations: "Deploy Data Loss Prevention (DLP) agents and encrypt sensitive files at rest using enterprise PKI.",
          detection: "High volume of file read operations targeting user desktop and document folders within minutes.",
          moduleId: "sql-db",
          moduleName: "Module 02: Relational Databases & SQL Optimization"
        },
        {
          id: "T1114",
          nameEn: "Email Collection",
          nameFr: "Collecte de Messagerie & Emails",
          descriptionEn: "Compromising corporate mailboxes or Microsoft 365 Exchange APIs to harvest confidential email threads and attachments.",
          descriptionFr: "Extraction de boîtes e-mails professionnelles ou exploitation d'APIs M365 Exchange pour voler des correspondances sensibles.",
          threatActors: ["APT29 (Nobelium)", "HAFNIUM", "MuddyWater"],
          mitigations: "Enforce Phishing-Resistant MFA on mail portals, audit OAuth mailbox application permissions, and disable basic auth.",
          detection: "Anomalous bulk mail sync events via Exchange Web Services (EWS) or Graph API mail.read scope.",
          moduleId: "cloud-bigdata",
          moduleName: "Module 11: Cloud Infrastructure & Big Data Security"
        }
      ]
    },
    {
      id: "TA0011",
      num: 11,
      nameEn: "Command & Control",
      nameFr: "Commande & Contrôle (C2)",
      descriptionEn: "Techniques adversaries use to communicate with systems under their control within a victim network.",
      descriptionFr: "Techniques de communication entre les machines compromises et l'infrastructure de l'attaquant.",
      techniques: [
        {
          id: "T1071",
          nameEn: "Application Layer Protocol (DNS / HTTPS)",
          nameFr: "Protocole de Couche Application",
          descriptionEn: "Disguising command and control traffic within legitimate TLS HTTPS traffic or recursive DNS tunneling requests.",
          descriptionFr: "Camouflage du trafic C2 au sein de requêtes HTTPS légitimes ou de tunnels DNS récursifs.",
          threatActors: ["OilRig", "APT32", "Cobalt Strike Users"],
          mitigations: "Deploy TLS inspection proxies, enforce DNS sinkholing, and block connections to unclassified domains.",
          detection: "High entropy in DNS subdomain queries (e.g. `a9f3b1.attacker.com`); persistent beaconing intervals in HTTP traffic.",
          moduleId: "cloud-bigdata",
          moduleName: "Module 11: Cloud Infrastructure & Big Data Security"
        },
        {
          id: "T1573",
          nameEn: "Encrypted Channel",
          nameFr: "Canal de Communication Chiffré",
          descriptionEn: "Adversaries encrypt C2 traffic using asymmetric keys or custom cryptography to prevent network security appliances from reading contents.",
          descriptionFr: "Chiffrement du trafic C2 avec des clés asymétriques pour empêcher l'inspection des sondes réseau.",
          threatActors: ["Turla", "Lazarus", "APT41"],
          mitigations: "Perform deep TLS decryption and inspection at egress firewalls; check SSL certificate subject names against threat feeds.",
          detection: "Self-signed SSL/TLS certificates or connections to untrusted root certificates on outbound traffic.",
          moduleId: "cryptography-data",
          moduleName: "Module 08: Cryptography & Data Protection"
        }
      ]
    },
    {
      id: "TA0010",
      num: 12,
      nameEn: "Exfiltration",
      nameFr: "Exfiltration",
      descriptionEn: "Techniques used to steal and transfer gathered data out of the target network.",
      descriptionFr: "Techniques utilisées pour extraire et transmettre les données volées hors du réseau.",
      techniques: [
        {
          id: "T1048",
          nameEn: "Exfiltration Over Alternative Protocol",
          nameFr: "Exfiltration via Protocole Alternatif",
          descriptionEn: "Transferring compressed and encrypted archives out of the enterprise via external cloud storage (Mega, Google Drive) or encrypted webhooks.",
          descriptionFr: "Transmission d'archives chiffrées vers des services cloud grand public (Mega, Google Drive) ou des webhooks chiffrés.",
          threatActors: ["LAPSUS$", "Black Basta", "APT41"],
          mitigations: "Block unauthorized cloud storage domains via CASB (Cloud Access Security Broker) and enforce egress filtering.",
          detection: "Outbound data transfer spikes over port 443 originating from internal database servers.",
          moduleId: "cyber-threat-intel",
          moduleName: "Module 13: Cyber Threat Intelligence (CTI)"
        },
        {
          id: "T1567",
          nameEn: "Exfiltration Over Web Service",
          nameFr: "Exfiltration via Services Web Cloud",
          descriptionEn: "Exfiltrating stolen corporate data directly to public cloud storage buckets (AWS S3, Azure Blob) using stolen API keys or curl.",
          descriptionFr: "Exfiltration directe des données vers des buckets cloud publics (AWS S3, Azure Blob) via des clés API ou curl.",
          threatActors: ["Scattered Spider", "LAPSUS$", "Cl0p"],
          mitigations: "Enforce egress proxy restrictions, monitor outbound cloud API calls, and audit developer IAM access keys.",
          detection: "CloudTrail / Entra ID audit logs showing unusual bulk PUT requests originating from unmanaged IP ranges.",
          moduleId: "cloud-bigdata",
          moduleName: "Module 11: Cloud Infrastructure & Big Data Security"
        }
      ]
    },
    {
      id: "TA0040",
      num: 13,
      nameEn: "Impact",
      nameFr: "Impact",
      descriptionEn: "Techniques used to disrupt availability or compromise integrity by destroying or encrypting systems.",
      descriptionFr: "Techniques visant à détruire, manipuler ou chiffrer les données pour paralyser l'entreprise.",
      techniques: [
        {
          id: "T1486",
          nameEn: "Data Encrypted for Impact",
          nameFr: "Chiffrement des Données pour Impact (Ransomware)",
          descriptionEn: "Adversaries encrypt critical enterprise data and databases using robust symmetric ciphers (AES, ChaCha20) to demand extortion ransom.",
          descriptionFr: "Chiffrement massif des fichiers et bases de données par un rançongiciel (Ransomware) pour exiger une rançon financière.",
          threatActors: ["LockBit", "BlackCat (ALPHV)", "DarkSide", "Ryuk"],
          mitigations: "Maintain offline, air-gapped immutable 3-2-1 backups; implement least privilege access controls on network shares.",
          detection: "Rapid high-frequency file modification events, deletion of Volume Shadow Copies (`vssadmin delete shadows /all /quiet`).",
          moduleId: "iso27001-risk",
          moduleName: "Module 12: ISO/IEC 27001 Standards & Risk Assessment (EBIOS RM)"
        },
        {
          id: "T1490",
          nameEn: "Inhibit System Recovery",
          nameFr: "Neutralisation de la Récupération Système",
          descriptionEn: "Deleting recovery points, disabling Windows Startup Repair, and deleting backup catalog files (`wbadmin delete catalog -quiet`).",
          descriptionFr: "Suppression des points de restauration système et du catalogue de sauvegarde pour forcer le paiement de la rançon.",
          threatActors: ["BlackCat", "Conti", "LockBit"],
          mitigations: "Enforce immutable air-gapped backups (WORM), restrict vssadmin execution privileges, and harden backup appliances.",
          detection: "Process creation logs with arguments `vssadmin.exe Delete Shadows /All /Quiet` or `wbadmin.exe DELETE SYSTEMSTATEBACKUP`.",
          moduleId: "incident-response",
          moduleName: "Module 10: Incident Response & Crisis Management"
        }
      ]
    }
  ]
};

window.MitreAttackData = MitreAttackData;
