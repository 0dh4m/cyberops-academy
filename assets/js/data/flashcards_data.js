/**
 * CyberOps Academy - Spaced Repetition Cybersecurity Flashcard Decks
 */
const FlashcardDecks = {
  ports: {
    name: "Core Ports & Protocols (Ports Réseau Indispensables)",
    icon: "🌐",
    cards: [
      { q: "Port 22 / TCP", a: "SSH (Secure Shell) — Encrypted remote console login and SFTP file transfer using public-key cryptography." },
      { q: "Port 53 / UDP & TCP", a: "DNS (Domain Name System) — Resolves human-readable domain names to IP addresses. Zone transfers use TCP 53." },
      { q: "Port 88 / TCP & UDP", a: "Kerberos — Key Distribution Center (KDC) authentication protocol used extensively in Microsoft Active Directory." },
      { q: "Port 443 / TCP", a: "HTTPS (HTTP over TLS) — Encrypted web traffic with TLS session negotiation." },
      { q: "Port 389 vs 636", a: "LDAP (389 plaintext) vs LDAPS (636 over TLS) — Lightweight Directory Access Protocol for querying user directories." },
      { q: "Port 445 / TCP", a: "SMB (Server Message Block) — Network file sharing in Windows networks (Historically targeted by EternalBlue / WannaCry)." },
      { q: "Port 161 / UDP", a: "SNMP (Simple Network Management Protocol) — Network telemetry and monitoring. Always enforce SNMPv3 with encryption!" },
      { q: "Port 179 / TCP", a: "BGP (Border Gateway Protocol) — Exterior gateway protocol routing traffic across Autonomous Systems (AS) on the Internet." }
    ]
  },
  linux: {
    name: "Linux Hardening & Forensics (Commandes Essentielles)",
    icon: "🐧",
    cards: [
      { q: "ss -tulpn", a: "Displays all listening TCP/UDP sockets with process IDs and program names (modern replacement for netstat)." },
      { q: "find / -perm -4000 -type f 2>/dev/null", a: "Discovers all SUID binary executables on the system — vital for detecting privilege escalation vectors." },
      { q: "chattr +i /etc/resolv.conf", a: "Sets immutable attribute on a file, preventing even the root user from modifying or deleting it until attribute is removed (-i)." },
      { q: "journalctl -u sshd --since '1 hour ago'", a: "Inspects systemd journal logs specifically for the SSH daemon within the last hour." },
      { q: "tcpdump -nn -i eth0 'tcp[tcpflags] & tcp-syn != 0'", a: "Captures and displays raw network packets on interface eth0 with SYN flags set (analyzing connection attempts)." }
    ]
  },
  governance: {
    name: "ISO 27001, EBIOS RM & Cryptography (Gouvernance & Normes)",
    icon: "📜",
    cards: [
      { q: "The CIA Triad (Confidentialité, Intégrité, Disponibilité)", a: "Confidentiality (Only authorized parties access data), Integrity (Data accuracy & prevention of tampering), Availability (Systems accessible when needed)." },
      { q: "EBIOS Risk Manager (ANSSI)", a: "French/European standardized risk assessment methodology analyzing threat actors, strategic scenarios, and operational risk mitigation." },
      { q: "Diffie-Hellman Key Exchange", a: "Cryptographic protocol enabling two untrusted parties to establish a shared secret key over an insecure communication channel." },
      { q: "GDPR Article 33 Breach Notification", a: "Mandates reporting personal data breaches to the national supervisory authority (e.g. CNDP, CNIL) within 72 hours." }
    ]
  },
  soc: {
    name: "SOC Operations & Threat Hunting (Analyste SOC & CTI)",
    icon: "🦅",
    cards: [
      { q: "MITRE ATT&CK Framework", a: "Globally accessible knowledge base of adversary tactics, techniques, and procedures (TTPs) based on real-world cyber observations." },
      { q: "CVSS v3.1 Score Tiers", a: "Low (0.1–3.9), Medium (4.0–6.9), High (7.0–8.9), Critical (9.0–10.0). Formed by Base, Temporal, and Environmental metrics." },
      { q: "YARA Rules", a: "Pattern-matching swiss knife used by malware researchers to classify, detect, and hunt malicious binary artifacts and memory samples." }
    ]
  }
};

window.FlashcardDecks = FlashcardDecks;
