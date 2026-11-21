/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <0dh4mm@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

// =========================================================================
// MIAGE / FEDE - European Bachelor in Cybersecurity & Network Management
// Complete & Comprehensive Curriculum Database (French & English)
// =========================================================================

const CURRICULUM_DATA = [
  // -------------------------------------------------------------
  // PHASE 1 : FOUNDATIONS & SYSTEMS
  // -------------------------------------------------------------
  {
    id: "math-optim",
    num: 1,
    phase: 1,
    phaseTitle: "Phase 1 : Foundations & Systems",
    category: "Mathematics & Algorithmic Optimization",
    badge: "Cryptographic Core",
    titleFr: "Mathématiques appliquées et optimisation algorithmique",
    titleEn: "Applied Mathematics and Algorithmic Optimization",
    durationHours: 35,
    ects: 3,
    summary: "This fundamental course bridges theoretical mathematics with real-world cybersecurity engineering. It covers modular arithmetic (the bedrock of RSA, Diffie-Hellman, and Elliptic Curves), Boolean algebra for firewall rule evaluation, graph theory for routing algorithms (Dijkstra/OSPF), and algorithmic complexity analysis (Big-O) to prevent algorithmic Denial of Service (ReDoS).",
    keyObjectives: [
      "Master modular arithmetic, prime numbers theory, and Euclidean algorithms powering modern public-key cryptography.",
      "Apply Boolean algebra to optimize access control lists (ACLs) and stateful packet filtering logic.",
      "Analyze algorithmic time and space complexity (Big-O) to identify computational bottlenecks and ReDoS vectors.",
      "Understand graph theory algorithms (Dijkstra, Bellman-Ford, Spanning Tree) applied to network topology and pathfinding."
    ],
    chapters: [
      {
        title: "Chapter 1 : Modular Arithmetic & Cryptosystems",
        points: [
          "Prime numbers, Extended Euclidean Algorithm, and modular multiplicative inverses.",
          "Fermat's Little Theorem and the Chinese Remainder Theorem (CRT).",
          "RSA key generation mechanics and fast modular exponentiation."
        ]
      },
      {
        title: "Chapter 2 : Boolean Algebra & Packet Filtering Logic",
        points: [
          "Fundamental logic gates (AND, OR, NOT, XOR) and truth tables.",
          "XOR properties in symmetric encryption (One-Time Pad, Feistel networks in AES/DES).",
          "Optimization and simplification of packet filtering rules and subnet bitmasks."
        ]
      },
      {
        title: "Chapter 3 : Graph Theory & Network Routing Optimization",
        points: [
          "Graph representations: adjacency matrices, lists, and weighted topologies.",
          "Dijkstra's shortest path algorithm (OSPF/IS-IS) and Bellman-Ford (RIP/BGP).",
          "Minimum Spanning Tree (MST) algorithms to prevent layer-2 switching loops (STP)."
        ]
      },
      {
        title: "Chapter 4 : Algorithmic Complexity (Big-O Notation)",
        points: [
          "Time and space complexity classes: O(1), O(log n), O(n), O(n²), O(2^n).",
          "Computational feasibility of brute-force attacks against cryptographic key sizes.",
          "Regular Expression Denial of Service (ReDoS) vulnerabilities and mitigation."
        ]
      }
    ],
    cheatSheet: [
      {
        desc: "Fast Modular Exponentiation & GCD in Python (Cryptographic arithmetic)",
        code: `import math\n# Greatest Common Divisor (Euclidean algorithm)\ngcd_val = math.gcd(35, 14) # -> 7\n# Modular Exponentiation: (base^exp) % mod (Ultra-fast for RSA)\nresult = pow(7, 256, 13) # Equivalent to (7**256) % 13 in O(log exp)`
      },
      {
        desc: "Symmetric XOR Cipher implementation in Python",
        code: `def xor_crypt(data: bytes, key: int) -> bytes:\n    return bytes([b ^ key for b in data])\n\nsecret = xor_crypt(b"SecOps2026", 0x5A)\noriginal = xor_crypt(secret, 0x5A) # Reversible property: A ^ B ^ B = A`
      }
    ],
    practicalLabs: [
      {
        title: "Lab 1 : Manual RSA Key Generation & Encryption Simulator",
        scenario: "Select two prime numbers (p=61, q=53), compute modulus n and Euler totient phi, pick public exponent e, calculate private key d via Extended Euclidean algorithm, and encrypt a numeric payload.",
        deliverable: "Interactive Python script executing and detailing each mathematical step."
      },
      {
        title: "Lab 2 : Dijkstra Shortest Path Routing Simulator",
        scenario: "Construct a 6-router topology with varying link metrics/costs, implement Dijkstra's algorithm to determine the optimal secure packet delivery path from Router A to Router F.",
        deliverable: "Documented Python source code with topological visualization."
      }
    ],
    quiz: [
      {
        q: "Why does the security of the RSA cryptosystem rely heavily on very large prime numbers?",
        options: [
          "Because adding prime numbers is unsupported on modern microprocessors.",
          "Multiplying two large primes is trivial, but factoring their product back into primes is computationally infeasible without the private key.",
          "Prime numbers cannot be represented in binary format.",
          "Prime numbers automatically reduce network bandwidth consumption by 50%."
        ],
        answer: 1,
        explanation: "RSA security is anchored in the Prime Factorization Problem. Factoring a 2048-bit composite number requires astronomical computing resources without knowing the private totient."
      }
    ],
    certifications: ["CompTIA PenTest+ (Crypto fundamentals)", "Coursera: Cryptography I (Stanford)"],
    careers: ["Cryptanalyst", "Security Researcher", "Algorithmic Security Engineer"],
    freeResources: [
      { name: "CryptoHack (Interactive Cryptography Challenges)", url: "https://cryptohack.org" },
      { name: "Khan Academy: Journey into Cryptography", url: "https://www.khanacademy.org/computing/computer-science/cryptography" }
    ]
  },

  {
    id: "sql-db",
    num: 2,
    phase: 1,
    phaseTitle: "Phase 1 : Foundations & Systems",
    category: "Databases & Data Security",
    badge: "Primary Attack Vector",
    titleFr: "Les bases de données SQL",
    titleEn: "Relational SQL Databases & Security",
    durationHours: 40,
    ects: 4,
    summary: "Databases host the crown jewels of any enterprise: credentials, customer data, and financial transactions. This course covers relational database design (UML/ERD), advanced SQL queries, strict access controls (Least Privilege), database hardening, and defense against the most prevalent database attack: SQL Injection (SQLi).",
    keyObjectives: [
      "Master relational modeling, schema normalization (1NF, 2NF, 3NF), and referential integrity.",
      "Author complex SQL queries with joins, subqueries, aggregations, and window functions.",
      "Enforce database security: user privilege isolation (DCL: GRANT/REVOKE), TDE, and audit logging.",
      "Immunize applications against SQL Injection vulnerabilities using Parameterized Queries / Prepared Statements."
    ],
    chapters: [
      {
        title: "Chapter 1 : Relational Modeling & Schema Design",
        points: [
          "Translating conceptual entity-relationship diagrams (ERD) into physical relational schemas.",
          "Primary keys, Foreign keys, unique constraints, and cascade update/delete policies.",
          "Database Normalization (1NF, 2NF, 3NF) to eliminate data redundancy and anomalies."
        ]
      },
      {
        title: "Chapter 2 : Advanced SQL Language (DML, DDL, DCL)",
        points: [
          "Complex joins: INNER, LEFT, RIGHT, FULL OUTER, and CROSS JOIN.",
          "Subqueries, Common Table Expressions (WITH / CTE), and indexing strategies (B-Tree).",
          "Transactions and ACID properties (Atomicity, Consistency, Isolation, Durability)."
        ]
      },
      {
        title: "Chapter 3 : Database Server Administration & Hardening",
        points: [
          "User and Role-Based Access Control (RBAC): applying Principle of Least Privilege.",
          "Encryption at rest (TDE - Transparent Data Encryption) and in transit (SSL/TLS enforced).",
          "Auditing sensitive read/write transactions (pgaudit, MySQL enterprise audit)."
        ]
      },
      {
        title: "Chapter 4 : SQL Injection Attacks & Defense Mechanisms",
        points: [
          "SQLi attack classes: In-band (Union, Error-based), Blind (Boolean, Time-based), Out-of-band.",
          "Secure development with Parameterized Queries / Prepared Statements across Python and PHP.",
          "Hardening database daemon permissions (disabling xp_cmdshell, dropping root/sa privileges)."
        ]
      }
    ],
    cheatSheet: [
      {
        desc: "Creating a hardened, least-privilege database user (MySQL/PostgreSQL)",
        code: `CREATE USER 'app_sec'@'localhost' IDENTIFIED BY 'StrongPass#2026';\nGRANT SELECT, INSERT, UPDATE ON company_db.* TO 'app_sec'@'localhost';\nREVOKE DROP, ALTER, GRANT OPTION ON company_db.* FROM 'app_sec'@'localhost';\nFLUSH PRIVILEGES;`
      },
      {
        desc: "Secure Parameterized Query in Python (100% immune to SQLi)",
        code: `import psycopg2\n# ALWAYS use parameter substitution tuple, NEVER string concatenation (f-strings)\ncursor.execute(\n    "SELECT id, username, role FROM users WHERE email = %s AND active = %s",\n    (user_email, True)\n)\nuser_record = cursor.fetchone()`
      }
    ],
    practicalLabs: [
      {
        title: "Lab 1 : Exploiting & Patching SQL Injection on DVWA",
        scenario: "Deploy DVWA (Damn Vulnerable Web App), extract schema names and password hashes using Union-based and Time-based SQLi, then refactor the vulnerable source code using Prepared Statements to verify complete remediation.",
        deliverable: "Penetration test report and patched source code diff."
      },
      {
        title: "Lab 2 : PostgreSQL Server Security Audit & Hardening",
        scenario: "Enforce TLS connections, configure `pg_hba.conf` for subnet-restricted authentication with SCRAM-SHA-256, enable `pgaudit` to track SELECT queries on sensitive tables, and lock default superusers.",
        deliverable: "Hardened configuration files (`postgresql.conf`, `pg_hba.conf`) and audit log sample."
      }
    ],
    quiz: [
      {
        q: "What is the industry-standard architectural defense that completely prevents SQL Injection vulnerabilities?",
        options: [
          "Encrypting user passwords with MD5 hashing.",
          "Using Parameterized Queries (Prepared Statements) with bound variables.",
          "Changing the database table names periodically.",
          "Installing a web server without modifying source code."
        ],
        answer: 1,
        explanation: "Prepared Statements strictly segregate SQL code from user-supplied data. The database compiles the query structure first; user inputs are treated exclusively as literal parameters, neutralizing injection attempts."
      }
    ],
    certifications: ["Oracle Database SQL Certified", "PostgreSQL Associate DBA"],
    careers: ["Database Security Administrator (DBA)", "Backend Security Engineer", "AppSec Specialist"],
    freeResources: [
      { name: "PortSwigger Web Security Academy: SQL Injection", url: "https://portswigger.net/web-security/sql-injection" },
      { name: "SQLZoo Interactive SQL Platform", url: "https://sqlzoo.net" }
    ]
  },

  {
    id: "python-cyber",
    num: 3,
    phase: 1,
    phaseTitle: "Phase 1 : Foundations & Systems",
    category: "Programming & Security Automation",
    badge: "Offensive & Defensive Scripting",
    titleFr: "Programmation en Python",
    titleEn: "Python Programming for Cybersecurity & Networks",
    durationHours: 50,
    ects: 5,
    summary: "Python is the undisputed programming language of cybersecurity. In this course, you transition from basic scripting to offensive and defensive tooling: building network scanners, manipulating raw network packets with Scapy, parsing security event logs, and automating SOC triage with threat intelligence APIs.",
    keyObjectives: [
      "Master advanced Python concepts: OOP, socket networking, exception handling, and regular expressions.",
      "Build custom network scanning, port enumeration, and banner-grabbing tools.",
      "Forge, capture, and inspect raw network packets using the Scapy library.",
      "Automate security operations: parse SIEM logs, query Threat Intelligence APIs (VirusTotal, Shodan), and dispatch alerts."
    ],
    chapters: [
      {
        title: "Chapter 1 : Core Python & Security Data Manipulation",
        points: [
          "Advanced data structures: list/dict comprehensions, generators, and binary byte manipulation.",
          "Robust file I/O: parsing massive JSON, CSV, and Syslog log files efficiently.",
          "Regular expressions (re) for extracting IPv4/IPv6 addresses, URLs, and leaked credentials."
        ]
      },
      {
        title: "Chapter 2 : Low-Level Network Programming with Sockets",
        points: [
          "The `socket` module architecture: creating robust TCP/UDP clients and servers.",
          "Building a multi-threaded, high-concurrency port scanner with timeout handling.",
          "Banner grabbing and service version identification over raw sockets."
        ]
      },
      {
        title: "Chapter 3 : Packet Crafting & Analysis with Scapy",
        points: [
          "Layered packet manipulation: IP, TCP, UDP, ICMP, and DNS layers.",
          "Sending and receiving packets (send, sr, sr1, sniff) and building custom probes.",
          "Detecting and simulating ARP Spoofing and DNS cache poisoning attacks."
        ]
      },
      {
        title: "Chapter 4 : Security Automation & SOC Tooling",
        points: [
          "Consuming REST APIs via `requests` to automate IP reputation checks (VirusTotal, AbuseIPDB).",
          "Automated PCAP packet capture extraction and suspicious payload harvesting.",
          "Building alerting pipelines via webhooks (Slack, Discord, Microsoft Teams)."
        ]
      }
    ],
    cheatSheet: [
      {
        desc: "Multi-threaded Port Scanner in Python",
        code: `import socket\n\ndef scan_target_port(target_ip: str, port: int) -> bool:\n    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:\n        s.settimeout(0.5)\n        if s.connect_ex((target_ip, port)) == 0:\n            print(f"[+] Port {port} is OPEN on {target_ip}")\n            return True\n    return False\n\nfor p in [21, 22, 80, 443, 3306, 8080]:\n    scan_target_port("192.168.1.1", p)`
      },
      {
        desc: "Live DNS Query Sniffer using Scapy",
        code: `from scapy.all import sniff, DNSQR\n\ndef process_dns_packet(pkt):\n    if pkt.haslayer(DNSQR):\n        domain_queried = pkt[DNSQR].qname.decode('utf-8')\n        print(f"[DNS Query Detected] -> {domain_queried}")\n\nsniff(filter="udp port 53", prn=process_dns_packet, store=0)`
      }
    ],
    practicalLabs: [
      {
        title: "Lab 1 : Building an Automated ARP Poisoning Detection Tool",
        scenario: "Develop a Python daemon using Scapy that builds a dynamic IP-to-MAC mapping table and triggers an instant alert with the attacker's MAC address upon observing conflicting ARP replies.",
        deliverable: "Verified Python script tested inside a virtual test network."
      },
      {
        title: "Lab 2 : Automated Web Access Log Analyzer for Web Attacks",
        scenario: "Ingest a multi-gigabyte Nginx access log file, extract suspicious IP addresses attempting SQL Injection or directory traversal, query AbuseIPDB API, and generate an executive JSON incident report.",
        deliverable: "Python script and generated threat intelligence report."
      }
    ],
    quiz: [
      {
        q: "Which Python library is the industry standard for creating, capturing, forging, and dissecting raw network packets?",
        options: ["NumPy", "Scapy", "Pandas", "Matplotlib"],
        answer: 1,
        explanation: "Scapy is the premier Python library for packet manipulation, capable of crafting arbitrary packet structures across all network layers and performing packet sniffing."
      }
    ],
    certifications: ["Python Institute PCAP (Certified Associate in Python)", "TCM Security: Python for Hackers"],
    careers: ["Security Automation Engineer", "SOC Analyst", "Threat Hunter", "Penetration Tester"],
    freeResources: [
      { name: "Automate the Boring Stuff with Python", url: "https://automatetheboringstuff.com" },
      { name: "Official Scapy Documentation", url: "https://scapy.readthedocs.io" }
    ]
  },

  {
    id: "admin-sys-net",
    num: 4,
    phase: 1,
    phaseTitle: "Phase 1 : Foundations & Systems",
    category: "Systems & Network Administration",
    badge: "Infrastructure Backbone",
    titleFr: "Introduction à l'administration des systèmes et réseaux",
    titleEn: "Introduction to Systems and Network Administration",
    durationHours: 60,
    ects: 6,
    summary: "To defend a system, you must master how it operates. This course provides comprehensive foundations in IT infrastructure: the OSI and TCP/IP models, IPv4/IPv6 subnetting, routing and switching, core network services (DNS, DHCP, NAT), and system administration on Linux (Debian/Ubuntu) and Windows Server.",
    keyObjectives: [
      "Understand the OSI 7-layer and TCP/IP 4-layer network models and transport protocols.",
      "Calculate IPv4/IPv6 subnets using CIDR notation and configure router interfaces and VLANs.",
      "Administer Linux servers: directory hierarchy, file permissions, systemd services, and cron jobs.",
      "Deploy and manage Windows Server core enterprise roles (DNS, DHCP, Active Directory foundations)."
    ],
    chapters: [
      {
        title: "Chapter 1 : Network Models & Essential Protocols",
        points: [
          "Comparison of the OSI 7-layer architecture and the TCP/IP suite.",
          "IPv4 address classes, Subnet Masks, CIDR notation, and public vs private addressing (RFC 1918).",
          "Core services: DNS resolution hierarchy, DHCP DORA process, ARP, and ICMP diagnostics."
        ]
      },
      {
        title: "Chapter 2 : Switching, VLANs & Routing Fundamentals",
        points: [
          "Layer 2 switching: MAC address learning tables, broadcast domains, and 802.1Q trunking.",
          "Virtual Local Area Networks (VLANs) for departmental segmentation.",
          "Static routing, Router-on-a-Stick (Inter-VLAN routing), and NAT/PAT translation."
        ]
      },
      {
        title: "Chapter 3 : Linux Server Administration",
        points: [
          "Linux Filesystem Hierarchy Standard (FHS): /etc, /var/log, /proc, /dev.",
          "Permissions model: chmod (rwx), chown, and special bits (SUID, SGID, Sticky Bit).",
          "Service and process lifecycle management using `systemctl` and `journalctl`."
        ]
      },
      {
        title: "Chapter 4 : Windows Server & Enterprise Services",
        points: [
          "Configuring authoritative DNS zones (Forward and Reverse Lookup).",
          "Deploying enterprise DHCP scopes, exclusions, and MAC reservations.",
          "Remote management via PowerShell and Windows Remote Management (WinRM)."
        ]
      }
    ],
    cheatSheet: [
      {
        desc: "Essential Linux System & Network Diagnostic Commands",
        code: `# Display listening network sockets with associated PIDs\nsudo ss -tulpn\n# Display kernel routing table and default gateway\nip route show\n# Manage services and view live system logs\nsudo systemctl restart nginx\nsudo journalctl -u nginx -f\n# Inspect sensitive permission files\nls -la /etc/passwd /etc/shadow`
      },
      {
        desc: "Essential Windows Server PowerShell Diagnostic Commands",
        code: `# Test TCP port connectivity to remote host\nTest-NetConnection -ComputerName 192.168.1.10 -Port 443\n# Inspect local IPv4 interfaces and default gateways\nGet-NetIPAddress -AddressFamily IPv4\n# Check service status\nGet-Service -Name W3SVC | Restart-Service`
      }
    ],
    practicalLabs: [
      {
        title: "Lab 1 : Enterprise Network Architecture on Cisco Packet Tracer",
        scenario: "Design an enterprise topology with 3 segmented departments (VLAN 10 Admin, VLAN 20 Accounting, VLAN 30 Guests), configure 802.1Q trunking between switches, and set up Router-on-a-Stick with centralized DHCP pools.",
        deliverable: "Completed `.pkt` network file with verified inter-VLAN routing."
      },
      {
        title: "Lab 2 : Deploying & Securing an Ubuntu Linux Web Server",
        scenario: "Install Ubuntu Server on a virtual machine, assign static IP, configure Nginx, and lock down host firewall via UFW allowing only ports 22, 80, and 443.",
        deliverable: "Execution log and firewall status report."
      }
    ],
    quiz: [
      {
        q: "What protocol and port does standard DNS resolution use for client queries?",
        options: ["TCP port 80", "UDP port 53", "TCP port 443", "UDP port 67"],
        answer: 1,
        explanation: "Standard DNS client queries operate over UDP port 53 for speed and minimal overhead. TCP port 53 is used for zone transfers and responses exceeding 512 bytes."
      }
    ],
    certifications: ["Cisco Certified Network Associate (CCNA 200-301)", "CompTIA Network+", "LPI LPIC-1 Linux Administrator"],
    careers: ["Network Administrator", "Systems Administrator", "Infrastructure Support Engineer"],
    freeResources: [
      { name: "Cisco Networking Academy: Skills for All", url: "https://skillsforall.com" },
      { name: "Linux Journey: Interactive Tutorials", url: "https://linuxjourney.com" }
    ]
  },

  // -------------------------------------------------------------
  // PHASE 2 : INFRASTRUCTURE HARDENING & DEFENSE
  // -------------------------------------------------------------
  {
    id: "os-hardening",
    num: 5,
    phase: 2,
    phaseTitle: "Phase 2 : Infrastructure Hardening & Defense",
    category: "Operating Systems Security",
    badge: "First Line of Defense",
    titleFr: "Durcissement et sécurité des systèmes d’exploitation",
    titleEn: "Operating System Hardening & Security",
    durationHours: 45,
    ects: 4,
    summary: "Default operating system installations are notoriously insecure. OS Hardening is the discipline of closing attack vectors: eliminating unnecessary services, securing kernel parameters, strictly isolating credentials, enforcing CIS Benchmarks, and configuring Mandatory Access Control (SELinux / AppArmor).",
    keyObjectives: [
      "Implement Center for Internet Security (CIS) Benchmarks on Linux and Windows Server environments.",
      "Harden OpenSSH daemon (disable root, enforce key pairs, Ed25519, Fail2ban integration).",
      "Deploy Mandatory Access Control (MAC) frameworks: SELinux and AppArmor profiles.",
      "Audit file system integrity using FIM tools (AIDE, Tripwire) and secure filesystem mount points."
    ],
    chapters: [
      {
        title: "Chapter 1 : Core Hardening Principles & Benchmarks",
        points: [
          "Attack Surface Reduction (ASR) and Defense-in-Depth strategies.",
          "Industry hardening benchmarks: CIS Benchmarks and DISA STIGs.",
          "Automated auditing using Lynis on Linux and Security Compliance Toolkit on Windows."
        ]
      },
      {
        title: "Chapter 2 : Linux Server Hardening in Practice",
        points: [
          "Securing SSH: key-based authentication, non-default ports, and brute-force prevention with Fail2ban.",
          "Kernel hardening via `/etc/sysctl.conf`: disabling IP forwarding, enabling SYN cookies, and ASLR.",
          "Securing mount points in `/etc/fstab`: `noexec, nosuid, nodev` flags on `/tmp` and `/var/tmp`.",
          "Local firewalling with `nftables` and `ufw`."
        ]
      },
      {
        title: "Chapter 3 : Mandatory Access Control (MAC): SELinux & AppArmor",
        points: [
          "Discretionary Access Control (DAC) vs Mandatory Access Control (MAC).",
          "SELinux modes (Enforcing, Permissive), contexts, and boolean policies.",
          "Creating and enforcing AppArmor application profiles for Nginx and Apache."
        ]
      },
      {
        title: "Chapter 4 : Windows Server Hardening & Group Policies",
        points: [
          "Applying CIS GPO templates across Active Directory organizational units.",
          "Deprecating weak legacy protocols: SMBv1, NTLMv1, TLS 1.0/1.1, and enforcing SMB signing.",
          "Hardware-backed memory isolation: Windows Credential Guard, BitLocker, and Exploit Protection."
        ]
      }
    ],
    cheatSheet: [
      {
        desc: "Hardened OpenSSH Configuration (/etc/ssh/sshd_config)",
        code: `# Production Hardened SSH Daemon Config\nPort 2222\nPermitRootLogin no\nPasswordAuthentication no\nPubkeyAuthentication yes\nKexAlgorithms curve25519-sha256\nCiphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com\nMaxAuthTries 3\nClientAliveInterval 300\nClientAliveCountMax 2`
      },
      {
        desc: "Automated Linux Hardening Audit using Lynis",
        code: `# Install and run comprehensive Lynis audit\nsudo apt update && sudo apt install lynis -y\nsudo lynis audit system --quick\n# Inspect hardening score and critical warnings\ncat /var/log/lynis-report.dat | grep -E "^hardening_index|^suggestion|^warning"`
      }
    ],
    practicalLabs: [
      {
        title: "Lab 1 : Hardening Ubuntu Server from 55 to 85+ Lynis Score",
        scenario: "Take a default Ubuntu VM, perform an initial Lynis audit, apply CIS recommendations (SSH lockdown, kernel sysctl flags, mount flags, password policies), and re-audit to verify measurable compliance.",
        deliverable: "Before-and-after Lynis comparison report with hardening scripts."
      },
      {
        title: "Lab 2 : Deploying Fail2ban against Hydra Brute-Force Attacks",
        scenario: "Configure Fail2ban with strict SSH jail (3 failed attempts within 5 minutes results in 24-hour iptables ban), launch a simulated Hydra password brute-force from Kali Linux, and verify automatic IP ban.",
        deliverable: "Fail2ban jail configuration and iptables ban logs."
      }
    ],
    quiz: [
      {
        q: "What is the primary security benefit of adding the `noexec` option to `/tmp` in `/etc/fstab`?",
        options: [
          "It prevents any downloaded malicious binaries or scripts in `/tmp` from being directly executed by the kernel.",
          "It accelerates filesystem read and write speeds.",
          "It automatically deletes files older than 5 days.",
          "It blocks non-root users from writing files to `/tmp`."
        ],
        answer: 0,
        explanation: "Attackers commonly download exploit payloads to world-writable directories such as `/tmp`. The `noexec` mount flag prevents the execution of binaries directly from that filesystem partition."
      }
    ],
    certifications: ["Red Hat Certified Specialist in Security: Linux", "CompTIA Linux+ / Security+"],
    careers: ["Hardening & Systems Security Engineer", "DevSecOps Engineer", "Linux Security Specialist"],
    freeResources: [
      { name: "CIS Benchmarks Free Guidelines", url: "https://www.cisecurity.org/cis-benchmarks" },
      { name: "The Practical Linux Hardening Guide (GitHub)", url: "https://github.com/trimstray/the-practical-linux-hardening-guide" }
    ]
  },

  {
    id: "network-sec",
    num: 6,
    phase: 2,
    phaseTitle: "Phase 2 : Infrastructure Hardening & Defense",
    category: "Network Defense & Monitoring",
    badge: "Perimeter Firewall & Detection",
    titleFr: "Sécurité des réseaux : segmentation, pare-feux et surveillance",
    titleEn: "Network Security: Segmentation, Firewalls and Surveillance",
    durationHours: 60,
    ects: 6,
    summary: "This core module addresses defensive network architecture: isolating corporate zones with VLANs and Demilitarized Zones (DMZs), deploying next-generation firewalls (pfSense/OPNsense), implementing Intrusion Detection & Prevention Systems (Snort/Suricata), and analyzing packet flows with Wireshark to detect lateral movement.",
    keyObjectives: [
      "Architect secure network perimeters using micro-segmentation, DMZs, and Zero Trust principles.",
      "Deploy, configure, and maintain stateful firewalls and NAT/PAT translation policies.",
      "Implement and tune network IDS/IPS engines (Snort, Suricata) and write custom detection rules.",
      "Perform Deep Packet Inspection (DPI) with Wireshark to hunt for covert channels and malicious beacons."
    ],
    chapters: [
      {
        title: "Chapter 1 : Defensive Network Architecture & Segmentation",
        points: [
          "Zero Trust Network Architecture (ZTNA) and the death of the trusted internal perimeter.",
          "Security zones: Internal LAN, External WAN, and public Demilitarized Zone (DMZ).",
          "Layer 2 and Layer 3 isolation using VLANs and Access Control Lists (ACLs)."
        ]
      },
      {
        title: "Chapter 2 : Firewalls (Stateful & Next-Gen) & VPNs",
        points: [
          "Firewall generations: Packet Filtering, Stateful Inspection, and Next-Gen (NGFW) with App-ID.",
          "Firewall rule ordering logic (Top-to-Bottom processing) and the Default Deny principle.",
          "Site-to-Site and Remote Access VPNs: IPsec (IKEv2) and OpenVPN / WireGuard."
        ]
      },
      {
        title: "Chapter 3 : Intrusion Detection & Prevention (IDS / IPS)",
        points: [
          "Passive detection via SPAN/TAP ports (IDS) vs active inline packet dropping (IPS).",
          "Detection paradigms: signature-based matching vs anomaly-based behavioral heuristics.",
          "Authoring custom Snort and Suricata rules to detect port scans, web attacks, and exploits."
        ]
      },
      {
        title: "Chapter 4 : Traffic Analysis & Threat Hunting with Wireshark",
        points: [
          "Analyzing protocol handshakes, TLS renegotiation, DNS queries, and TCP reset flags.",
          "Identifying malware Command-and-Control (C2) heartbeat beacons and data exfiltration channels.",
          "Flow monitoring via NetFlow / IPFIX for macro-level network visibility."
        ]
      }
    ],
    cheatSheet: [
      {
        desc: "Custom Snort IDS Rule to detect aggressive Nmap SYN scans",
        code: `alert tcp any any -> $HOME_NET any (msg:"[SEC-ALERT] Nmap SYN Port Scan Detected"; flags:S,12; threshold:type both, track by_src, count 25, seconds 3; sid:1000001; rev:1;)`
      },
      {
        desc: "Essential Wireshark Display Filters for Threat Hunting",
        code: `# Filter for SYN packets with no ACK (Port scanning activity)\ntcp.flags.syn == 1 && tcp.flags.ack == 0\n# Filter for suspicious high-entropy DNS queries (potential DNS tunneling)\ndns.flags.response == 0 && frame.len > 120\n# Extract HTTP POST requests (credential harvesting / exfiltration)\nhttp.request.method == "POST"`
      }
    ],
    practicalLabs: [
      {
        title: "Lab 1 : Deploying a Production-Grade pfSense Firewall with DMZ",
        scenario: "Install pfSense on a dual-interface VM, create a dedicated DMZ for a public web server, configure port forwarding, and enforce firewall rules preventing the DMZ from initiating connections into the corporate LAN.",
        deliverable: "Network topology diagram, firewall rules export, and isolation verification."
      },
      {
        title: "Lab 2 : Investigating Real Malware Traffic via PCAP in Wireshark",
        scenario: "Analyze a real-world ransomware infection PCAP: trace DNS queries to identify malicious domains, reconstruct HTTP file downloads to extract the dropper payload, and isolate infected internal hosts.",
        deliverable: "Comprehensive Technical Incident Report with IoCs (IPs, Domains, Hashes)."
      }
    ],
    quiz: [
      {
        q: "What is the decisive operational difference between an IDS and an IPS?",
        options: [
          "An IDS operates exclusively in the cloud, while an IPS operates on-premises.",
          "An IDS operates passively out-of-band to inspect and alert, whereas an IPS sits inline and can drop malicious packets in real time.",
          "An IDS decrypts traffic, while an IPS encrypts traffic.",
          "There is no difference; they are identical terms."
        ],
        answer: 1,
        explanation: "An IDS (Intrusion Detection System) passively monitors copied traffic (e.g., via SPAN port) and issues alerts. An IPS (Intrusion Prevention System) sits directly inline in the traffic path and can actively block/drop malicious flows."
      }
    ],
    certifications: ["Cisco Certified CyberOps Associate", "Palo Alto PCNSA", "CompTIA Security+"],
    careers: ["Network Security Engineer", "SOC Analyst Tier 1/2", "Perimeter Defense Specialist"],
    freeResources: [
      { name: "TryHackMe: Network Security Pathway", url: "https://tryhackme.com/path/outline/networksecurity" },
      { name: "Wireshark Sample Captures Repository", url: "https://wiki.wireshark.org/SampleCaptures" }
    ]
  },

  {
    id: "iam-access",
    num: 7,
    phase: 2,
    phaseTitle: "Phase 2 : Infrastructure Hardening & Defense",
    category: "Identity & Access Management",
    badge: "The New Security Perimeter",
    titleFr: "Sécurité des identités et des accès (IAM)",
    titleEn: "Identity and Access Management (IAM) Security",
    durationHours: 40,
    ects: 4,
    summary: "In the modern cloud and zero-trust landscape, Identity is the new security perimeter. Most catastrophic breaches originate from compromised credentials. This course covers Active Directory hardening, federated authentication (OAuth2, OpenID Connect, SAML), Multi-Factor Authentication (MFA), and Privileged Access Management (PAM).",
    keyObjectives: [
      "Master the AAA framework (Authentication, Authorization, Accounting) and access models (RBAC, ABAC).",
      "Deploy, manage, and harden Microsoft Active Directory Domain Services (AD DS) and Group Policies.",
      "Understand modern identity federation protocols: Kerberos, LDAP/S, SAML 2.0, OAuth 2.0, and OpenID Connect (OIDC).",
      "Implement Privileged Access Management (PAM) architectures: Just-in-Time (JIT) access and Tiering models."
    ],
    chapters: [
      {
        title: "Chapter 1 : Core Identity Concepts & Access Models",
        points: [
          "Digital identity lifecycle: provisioning, role lifecycle, and immediate deprovisioning.",
          "Multi-Factor Authentication (MFA): FIDO2, WebAuthn, hardware tokens, and authenticator apps.",
          "Access control paradigms: Role-Based (RBAC), Attribute-Based (ABAC), and Policy-Based (PBAC)."
        ]
      },
      {
        title: "Chapter 2 : Active Directory & Kerberos Security",
        points: [
          "Active Directory structure: Forests, Domains, Organizational Units (OUs), and Group Policy Objects (GPO).",
          "Kerberos authentication mechanics: Ticket Granting Ticket (TGT), Service Tickets, and Key Distribution Center (KDC).",
          "Classic AD attacks: Pass-the-Hash, Kerberoasting, Golden Ticket, and Silver Ticket.",
          "Enterprise hardening: Microsoft Tiering Model (Tier 0, Tier 1, Tier 2) isolating domain controllers."
        ]
      },
      {
        title: "Chapter 3 : Identity Federation & Modern Single Sign-On (SSO)",
        points: [
          "Single Sign-On (SSO) architecture and cross-domain authentication.",
          "SAML 2.0 protocol: Identity Provider (IdP) and Service Provider (SP) trust relationships.",
          "OAuth 2.0 (Delegated Authorization) and OpenID Connect (Authentication) using JSON Web Tokens (JWT)."
        ]
      },
      {
        title: "Chapter 4 : Privileged Access Management (PAM) & Zero Trust",
        points: [
          "Just-In-Time (JIT) access and ephemeral administrative elevation.",
          "Privileged credential vaulting, automated password rotation, and break-glass accounts.",
          "Session recording, keystroke auditing, and anomalous behavior analytics."
        ]
      }
    ],
    cheatSheet: [
      {
        desc: "PowerShell Active Directory Audit for Privileged Accounts",
        code: `# Enumerate members of the privileged Domain Admins group\nGet-ADGroupMember -Identity "Domain Admins" | Select-Object Name, SamAccountName\n# Detect active user accounts with non-expiring passwords\nGet-ADUser -Filter {PasswordNeverExpires -eq $true -and Enabled -eq $true} -Properties PasswordNeverExpires | Select-Object Name, UserPrincipalName\n# Enable AD Recycle Bin feature to prevent accidental object deletion\nEnable-ADOptionalFeature 'Recycle Bin Feature' -Scope ForestOrConfigurationSet -Target (Get-ADForest).RootDomain`
      },
      {
        desc: "Decoding and validating a JWT Token payload in Python",
        code: `import jwt\n# Decode JWT payload without verification to inspect claims\ndecoded_claims = jwt.decode(token_str, options={"verify_signature": False})\nprint("Subject (User ID):", decoded_claims.get("sub"))\nprint("Assigned Roles:", decoded_claims.get("roles"))`
      }
    ],
    practicalLabs: [
      {
        title: "Lab 1 : Active Directory Tiering Model & Password Policy Enforcement",
        scenario: "Deploy Windows Server AD DS, create segmented OUs, enforce GPO password complexity and lockout policies, and configure strict logon rights to prevent Tier 0 credentials from being used on Tier 1/2 workstations.",
        deliverable: "GPO result report (`gpresult /h report.html`) and architecture audit."
      },
      {
        title: "Lab 2 : Deploying Keycloak SSO with OAuth2/OIDC and MFA",
        scenario: "Deploy Keycloak in a Docker container, configure a custom realm, integrate an external web application with OpenID Connect, and enforce Time-based One-Time Password (TOTP) MFA.",
        deliverable: "Operational SSO integration with enforced multi-factor authentication."
      }
    ],
    quiz: [
      {
        q: "What is the primary architectural purpose of the OAuth 2.0 protocol?",
        options: [
          "Encrypting operating system hard drives.",
          "Enabling delegated authorization, allowing third-party applications to access specific resources on behalf of a user without exposing their password.",
          "Mitigating distributed denial-of-service attacks on core network switches.",
          "Assigning dynamic IPv4 addresses to host devices."
        ],
        answer: 1,
        explanation: "OAuth 2.0 is an authorization framework designed for delegation. It enables applications to obtain limited access to user accounts via access tokens without sharing credentials."
      }
    ],
    certifications: ["Microsoft Certified: Identity and Access Administrator (SC-300)", "Certified Identity and Access Manager (CIAM)"],
    careers: ["IAM Security Engineer", "Active Directory Specialist", "Cloud Identity Architect"],
    freeResources: [
      { name: "Microsoft Learn: SC-300 Exam Guide", url: "https://learn.microsoft.com/certifications/exams/sc-300/" },
      { name: "Keycloak Official Getting Started Guides", url: "https://www.keycloak.org/guides" }
    ]
  },

  {
    id: "crypto-data",
    num: 8,
    phase: 2,
    phaseTitle: "Phase 2 : Infrastructure Hardening & Defense",
    category: "Cryptography & Data Protection",
    badge: "Mathematical Confidentiality",
    titleFr: "Cryptographie et protection des données",
    titleEn: "Cryptography and Data Protection",
    durationHours: 45,
    ects: 4,
    summary: "Cryptography is the foundational science of digital trust: securing online banking, web traffic, and confidential enterprise storage. This course covers symmetric ciphers (AES-GCM), asymmetric cryptosystems (RSA, ECC), cryptographic hash functions, Public Key Infrastructure (PKI), TLS 1.3, and Post-Quantum Cryptography.",
    keyObjectives: [
      "Understand symmetric block ciphers (AES-128/256) and authenticated modes (GCM, ChaCha20-Poly1305).",
      "Master asymmetric cryptography: RSA, Elliptic Curve Cryptography (ECC), and ECDH key exchange.",
      "Apply cryptographic hash functions (SHA-2, SHA-3) and Hash-based Message Authentication Codes (HMAC).",
      "Deploy and manage enterprise Public Key Infrastructure (PKI), X.509 certificates, and TLS 1.3 handshakes."
    ],
    chapters: [
      {
        title: "Chapter 1 : Symmetric Encryption & Authenticated Modes",
        points: [
          "Advanced Encryption Standard (AES) architecture: substitution-permutation networks and key schedules.",
          "Block cipher modes of operation: ECB (insecure), CBC (with IV), and AEAD modes (AES-GCM).",
          "Cryptographic hash functions: collision resistance, SHA-256, SHA-3, and message integrity verification via HMAC."
        ]
      },
      {
        title: "Chapter 2 : Asymmetric Cryptography & Digital Signatures",
        points: [
          "Mathematical principles of RSA: key generation, encryption, decryption, and padding schemes (OAEP).",
          "Elliptic Curve Cryptography (ECC: Curve25519, secp256k1): high security with smaller key sizes.",
          "Diffie-Hellman key exchange (ECDHE) and Perfect Forward Secrecy (PFS).",
          "Digital signatures (ECDSA, Ed25519) for non-repudiation and code signing."
        ]
      },
      {
        title: "Chapter 3 : Public Key Infrastructure (PKI) & TLS 1.3",
        points: [
          "Hierarchical Certificate Authorities (Root CA, Intermediate CA, End-Entity certificates).",
          "X.509 certificate standards, Certificate Revocation Lists (CRL), and OCSP Stapling.",
          "TLS 1.3 handshake optimization, deprecation of legacy algorithms, and 0-RTT risks."
        ]
      },
      {
        title: "Chapter 4 : Enterprise Data Protection & Post-Quantum Cryptography",
        points: [
          "Data at rest encryption: BitLocker, Linux LUKS, and Hardware Security Modules (HSM / KMS).",
          "Key management lifecycle: generation, rotation, escrow, and cryptographic destruction.",
          "Introduction to Post-Quantum Cryptography (NIST standards: CRYSTALS-Kyber, Dilithium)."
        ]
      }
    ],
    cheatSheet: [
      {
        desc: "Generating private keys and self-signed certificates with OpenSSL",
        code: `# Generate strong Elliptic Curve private key (Prime256v1 / P-256)\nopenssl ecparam -name prime256v1 -genkey -noout -out server.key\n# Generate Certificate Signing Request (CSR)\nopenssl req -new -key server.key -out server.csr\n# Issue self-signed X.509 certificate valid for 365 days\nopenssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt\n# Verify certificate details\nopenssl x509 -in server.crt -text -noout`
      },
      {
        desc: "File Encryption & Decryption via OpenSSL AES-256-GCM",
        code: `# Encrypt file using AES-256-GCM with PBKDF2 key derivation\nopenssl enc -aes-256-gcm -pbkdf2 -in confidential.pdf -out confidential.enc\n# Decrypt file\nopenssl enc -d -aes-256-gcm -pbkdf2 -in confidential.enc -out decrypted.pdf`
      }
    ],
    practicalLabs: [
      {
        title: "Lab 1 : Building a Custom Private Enterprise Root Certificate Authority",
        scenario: "Construct a two-tier PKI (Offline Root CA and Online Intermediate CA) using OpenSSL, issue TLS certificates to internal Nginx servers, install the Root CA in client trust stores, and verify HTTPS with no browser warnings.",
        deliverable: "PKI certificate chain and working Nginx SSL configuration."
      },
      {
        title: "Lab 2 : Password Hashing Benchmark: MD5 vs SHA-256 vs Argon2id",
        scenario: "Develop a Python benchmarking tool to compare hashing algorithms against GPU-accelerated cracking (Hashcat), demonstrating why slow memory-hard algorithms (Argon2id, bcrypt) are mandatory for credential storage.",
        deliverable: "Benchmark analysis script and speed comparison graph."
      }
    ],
    quiz: [
      {
        q: "Why is AES-GCM preferred over AES-CBC in modern network and cloud protocols?",
        options: [
          "AES-GCM uses a key size exceeding 4096 bits.",
          "AES-GCM is an Authenticated Encryption with Associated Data (AEAD) mode that provides both confidentiality and data integrity verification against tampering.",
          "AES-CBC does not require an Initialization Vector (IV).",
          "AES-GCM is completely immune to quantum computers."
        ],
        answer: 1,
        explanation: "AES-GCM combines symmetric encryption with an authentication tag (GMAC), preventing bit-flipping and padding oracle attacks that affect unauthenticated modes like CBC."
      }
    ],
    certifications: ["EC-Council Certified Encryption Specialist (ECES)", "GIAC Cryptography Certification"],
    careers: ["Cryptographer", "Data Protection Officer (DPO)", "Security Software Engineer"],
    freeResources: [
      { name: "Crypto101 - A Free Online Course for Beginners", url: "https://www.crypto101.io" },
      { name: "Mozilla SSL Configuration Generator", url: "https://ssl-config.mozilla.org" }
    ]
  },

  // -------------------------------------------------------------
  // PHASE 3 : APPLICATION SECURITY & SOC OPERATIONS
  // -------------------------------------------------------------
  {
    id: "app-sec",
    num: 9,
    phase: 3,
    phaseTitle: "Phase 3 : Application Security & SOC Operations",
    category: "Application & Web Security",
    badge: "Web Vulnerability Hunter",
    titleFr: "Sécurité des applications et services numériques",
    titleEn: "Application and Digital Services Security (AppSec)",
    durationHours: 50,
    ects: 5,
    summary: "Web applications and APIs are the primary exposed attack surfaces of modern enterprises. This course covers the OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, IDOR, SSRF), offensive intercepting proxies (Burp Suite), secure coding principles, and automated security scanning (SAST/DAST/SCA) in DevSecOps pipelines.",
    keyObjectives: [
      "Master the OWASP Top 10 web application vulnerabilities and their exploitation/mitigation mechanisms.",
      "Intercept, analyze, and manipulate HTTP/HTTPS traffic using Burp Suite Community & Professional.",
      "Apply secure software development practices: strict input sanitization, output encoding, and CSRF protection.",
      "Integrate automated security testing tools (SAST, DAST, SCA) inside CI/CD automation pipelines."
    ],
    chapters: [
      {
        title: "Chapter 1 : Major Web Vulnerabilities (OWASP Top 10)",
        points: [
          "A01: Broken Access Control (Insecure Direct Object References - IDOR, privilege escalation).",
          "A02: Cryptographic Failures (cleartext credentials, weak cipher suites).",
          "A03: Injection (SQL Injection, Command Injection, LDAP Injection).",
          "A05: Security Misconfiguration (default passwords, directory listing, verbose error stack traces).",
          "A07: Identification & Authentication Failures (session hijacking, brute-force vulnerabilities)."
        ]
      },
      {
        title: "Chapter 2 : Client-Side & Server-Side Web Attacks",
        points: [
          "Cross-Site Scripting (XSS: Stored, Reflected, DOM-based) and cookie hijacking.",
          "Cross-Site Request Forgery (CSRF) and defenses: SameSite cookies and anti-CSRF tokens.",
          "Server-Side Request Forgery (SSRF) and cloud metadata endpoint exploitation (169.254.169.254).",
          "API Security Top 10: Broken Object Level Authorization (BOLA) and mass assignment."
        ]
      },
      {
        title: "Chapter 3 : Web Auditing Tools & Intercepting Proxies",
        points: [
          "Burp Suite mastery: Proxy, Repeater, Intruder, Decoder, and Collaborator.",
          "Static Application Security Testing (SAST) with SonarQube and Semgrep.",
          "Dynamic Application Security Testing (DAST) using OWASP ZAP."
        ]
      },
      {
        title: "Chapter 4 : DevSecOps & Operational Protection",
        points: [
          "Shift-Left Security: embedding security testing directly into developer commit workflows.",
          "Software Composition Analysis (SCA) to identify vulnerable open-source dependencies (Trivy, Snyk).",
          "Web Application Firewalls (WAF: ModSecurity, Cloudflare WAF) and Content Security Policy (CSP)."
        ]
      }
    ],
    cheatSheet: [
      {
        desc: "Hardened Security Headers configuration for Nginx web server",
        code: `# Production Hardened HTTP Security Headers in Nginx\nadd_header X-Frame-Options "DENY" always;\nadd_header X-Content-Type-Options "nosniff" always;\nadd_header X-XSS-Protection "1; mode=block" always;\nadd_header Content-Security-Policy "default-src 'self'; script-src 'self' https://trustedcdn.com;" always;\nadd_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;\nadd_header Referrer-Policy "strict-origin-when-cross-origin" always;`
      },
      {
        desc: "Automated Python SAST vulnerability scanning with Bandit",
        code: `# Install and execute automated SAST scan against Python source code\npip install bandit\nbandit -r ./app_src/ -f html -o security_audit_report.html`
      }
    ],
    practicalLabs: [
      {
        title: "Lab 1 : IDOR Vulnerability Exploitation & Remediation on PortSwigger",
        scenario: "Intercept account password update requests in Burp Suite, manipulate user identifiers to bypass authorization and takeover administrative accounts, then rewrite the backend access control logic to enforce session-bound authorization.",
        deliverable: "Exploitation walkthrough and patched backend controller source code."
      },
      {
        title: "Lab 2 : Integrating Semgrep SAST into a GitHub Actions CI/CD Pipeline",
        scenario: "Configure a GitHub Actions workflow that executes Semgrep on every pull request, automatically blocking code merges containing hardcoded API secrets or unparameterized database queries.",
        deliverable: "Workflow file (`.github/workflows/security.yml`) and pull request pipeline log."
      }
    ],
    quiz: [
      {
        q: "What critical category of web vulnerability is primarily mitigated by enforcing a strict Content Security Policy (CSP)?",
        options: [
          "Distributed Denial of Service (DDoS) attacks.",
          "Cross-Site Scripting (XSS) and unauthorized script injection.",
          "Database hard drive failure.",
          "Wi-Fi wireless eavesdropping."
        ],
        answer: 1,
        explanation: "Content Security Policy (CSP) restricts the domains from which browsers are allowed to load and execute scripts, preventing untrusted scripts injected via XSS from running."
      }
    ],
    certifications: ["Burp Suite Certified Practitioner (BSCP)", "Certified Application Security Engineer (CASE)", "GIAC Web Application Defender (GWEB)"],
    careers: ["Application Security Engineer (AppSec)", "Web Penetration Tester", "DevSecOps Consultant"],
    freeResources: [
      { name: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security" },
      { name: "OWASP Top 10 Official Documentation", url: "https://owasp.org/www-project-top-ten/" }
    ]
  },

  {
    id: "incident-response",
    num: 10,
    phase: 3,
    phaseTitle: "Phase 3 : Application Security & SOC Operations",
    category: "SOC & Incident Response",
    badge: "Cyber Crisis Center",
    titleFr: "Réponse aux incidents et gestion des crises cyber",
    titleEn: "Incident Response and Cyber Crisis Management",
    durationHours: 55,
    ects: 5,
    summary: "The golden rule of cybersecurity is not whether an organization will be breached, but when. This course immerses you in the Security Operations Center (SOC): SIEM log correlation (Wazuh, Splunk), digital forensics (RAM/Disk analysis), building incident response playbooks (NIST/SANS), and managing ransomware crises.",
    keyObjectives: [
      "Master the Incident Response lifecycle in accordance with NIST SP 800-61 and SANS guidelines.",
      "Deploy and operate open-source SIEM / XDR platforms (Wazuh, Splunk) for centralized log correlation.",
      "Perform digital forensic investigations: RAM memory capture analysis (Volatility) and Windows Event Logs (Sysmon).",
      "Author incident response playbooks for rapid containment of ransomware and compromised credentials."
    ],
    chapters: [
      {
        title: "Chapter 1 : The Security Operations Center (SOC) & SIEM",
        points: [
          "SOC tiering roles: Tier 1 (Alert Triage), Tier 2 (Deep Investigation), and Tier 3 (Threat Hunting).",
          "SIEM architecture: log collection, parsing, normalization, and correlation rule authoring.",
          "Indicators of Compromise (IoCs: file hashes, malicious IPs) and Indicators of Attack (IoAs)."
        ]
      },
      {
        title: "Chapter 2 : Incident Response Lifecycle (NIST SP 800-61)",
        points: [
          "Phase 1 - Preparation: tooling, incident response team formation, and offline backups.",
          "Phase 2 - Detection & Analysis: scoping breach severity and correlating alerts.",
          "Phase 3 - Containment: network isolation, firewall drops, and credential resets.",
          "Phase 4 - Eradication & Recovery: malware removal, system reimaging, and service restoration.",
          "Phase 5 - Post-Incident Activity: root cause analysis (RCA) and lessons learned."
        ]
      },
      {
        title: "Chapter 3 : Digital Forensics & Evidence Preservation",
        points: [
          "Chain of Custody principles and legal admissibility of electronic evidence.",
          "Order of Volatility: preserving CPU registers, RAM, network connections before disk storage.",
          "Live memory forensics using Volatility 3: detecting injected DLLs and malicious hidden processes.",
          "Windows event log forensics: analyzing Sysmon Event ID 1 (Process Creation) and Event ID 3 (Network Connections)."
        ]
      },
      {
        title: "Chapter 4 : Cyber Crisis Management & Ransomware Response",
        points: [
          "Crisis communication strategies: technical reporting vs executive C-suite advisories.",
          "Ransomware containment playbooks and immutable 3-2-1 backup strategies.",
          "Regulatory breach notification requirements under GDPR / CNDP (72-hour notification rule)."
        ]
      }
    ],
    cheatSheet: [
      {
        desc: "PowerShell Sysmon Query to detect suspicious process execution",
        code: `# Query Sysmon Operational Log for recent process creation events (Event ID 1)\nGet-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Sysmon/Operational'; Id=1} -MaxEvents 30 | \n    Select-Object TimeCreated, @{Name="Process"; Expression={$_.Properties[4].Value}}, @{Name="CommandLine"; Expression={$_.Properties[10].Value}}`
      },
      {
        desc: "RAM Memory Forensics using Volatility 3",
        code: `# Enumerate all active processes from a memory dump\npython3 vol.py -f memory.dmp windows.pslist\n# Scan for hidden injected shellcode and rogue memory regions\npython3 vol.py -f memory.dmp windows.malfind\n# Dump suspicious executable memory region\npython3 vol.py -f memory.dmp -o ./output windows.dumpfiles --pid 1420`
      }
    ],
    practicalLabs: [
      {
        title: "Lab 1 : Deploying Wazuh SIEM & Active Response Automation",
        scenario: "Deploy a Wazuh SIEM manager, connect a Linux agent, simulate an SSH brute-force attack using Hydra, verify detection in Wazuh alerts dashboard, and configure Wazuh Active Response to ban the attacking IP automatically.",
        deliverable: "SIEM dashboard screenshots and active response rule configuration."
      },
      {
        title: "Lab 2 : Memory Forensics Investigation on an Infected Host",
        scenario: "Analyze a memory capture of an infected workstation: identify a rogue svchost.exe process running from an abnormal path, extract the injected malware payload, calculate SHA-256 hash, and correlate on VirusTotal.",
        deliverable: "Comprehensive Forensic Investigation Report with IoCs."
      }
    ],
    quiz: [
      {
        q: "According to the Order of Volatility in digital forensics, which evidence source must be captured first before shutting down an infected machine?",
        options: [
          "The mechanical hard drive contents.",
          "The live volatile RAM memory and active network connections.",
          "The archived tape backups in the server room.",
          "The printed paper network documentation."
        ],
        answer: 1,
        explanation: "Live RAM (Random Access Memory) is completely volatile and lost the moment the system loses power. It contains active network sockets, injected malware, and decrypted keys, and must be imaged first."
      }
    ],
    certifications: ["EC-Council Certified Incident Handler (ECIH)", "CompTIA CySA+ (Cybersecurity Analyst)", "Blue Team Level 1 (BTL1)"],
    careers: ["Incident Response Analyst (CSIRT/CERT)", "SOC Analyst Tier 2/3", "Digital Forensics Investigator"],
    freeResources: [
      { name: "Let's Defend: Blue Team Training Platform", url: "https://letsdefend.io" },
      { name: "Wazuh SIEM Official Documentation", url: "https://documentation.wazuh.com" }
    ]
  },

  {
    id: "cloud-bigdata-sec",
    num: 11,
    phase: 3,
    phaseTitle: "Phase 3 : Application Security & SOC Operations",
    category: "Cloud & Big Data Security",
    badge: "Cloud Perimeter & Containers",
    titleFr: "Sécurisation des environnements cloud et Big Data",
    titleEn: "Securing Cloud Environments and Big Data",
    durationHours: 50,
    ects: 5,
    summary: "Enterprises have migrated their mission-critical operations to public clouds (AWS, Azure, GCP) and containerized microservices (Docker, Kubernetes). This course covers cloud security architecture: the Shared Responsibility Model, Cloud IAM least privilege, container hardening, S3 data leak prevention, and Big Data encryption.",
    keyObjectives: [
      "Understand the Cloud Shared Responsibility Model across IaaS, PaaS, and SaaS environments.",
      "Enforce strict Cloud Identity & Access Management (IAM), roles, and least-privilege security policies.",
      "Harden containerized workloads: secure Dockerfiles, non-root execution, image vulnerability scanning (Trivy).",
      "Secure Big Data storage and data pipelines (S3 buckets, Azure Blobs, Kafka streams, and Data Lakes)."
    ],
    chapters: [
      {
        title: "Chapter 1 : Cloud Security Fundamentals & Architecture",
        points: [
          "The Shared Responsibility Model: cloud provider obligations vs enterprise customer duties.",
          "Virtual Private Clouds (VPC): private and public subnets, internet gateways, and security groups.",
          "Cloud encryption key management: AWS KMS, Azure Key Vault, and Google Cloud KMS."
        ]
      },
      {
        title: "Chapter 2 : Container Security (Docker) & Microservices",
        points: [
          "Risks of root-running containers; enforcing rootless Docker containers.",
          "Static container image scanning for known CVEs using Trivy and Docker Scout.",
          "Kubernetes security fundamentals: Network Policies, Pod Security Standards, and Secrets management."
        ]
      },
      {
        title: "Chapter 3 : Securing Big Data & Data Lakes",
        points: [
          "Securing cloud object storage (Amazon S3 / Azure Blob) and preventing public exposure.",
          "Big Data cluster protection: Kerberos authentication, Apache Ranger authorization, and Atlas auditing.",
          "Securing real-time streaming pipelines (Apache Kafka security with TLS and SASL/SCRAM)."
        ]
      },
      {
        title: "Chapter 4 : Cloud Security Posture Management (CSPM)",
        points: [
          "Cloud Security Posture Management (CSPM) and automated misconfiguration detection.",
          "Cloud audit logging: AWS CloudTrail, AWS GuardDuty, and Azure Monitor.",
          "Automated cloud configuration auditing using open-source tools: Prowler and ScoutSuite."
        ]
      }
    ],
    cheatSheet: [
      {
        desc: "Automated AWS Security Posture Audit with Prowler (CIS Benchmark)",
        code: `# Install Prowler security tool via pip\npip install prowler\n# Execute comprehensive CIS AWS Foundations Benchmark compliance scan\nprowler aws --compliance cis_1.5_aws --output-modes html,json`
      },
      {
        desc: "Scanning Docker Container Images for Critical CVEs with Trivy",
        code: `# Scan local container image for HIGH and CRITICAL vulnerabilities\ntrivy image --severity HIGH,CRITICAL myapp:latest\n# Scan Dockerfile for security misconfigurations\ntrivy config ./Dockerfile`
      }
    ],
    practicalLabs: [
      {
        title: "Lab 1 : Hardening a Vulnerable Dockerfile to Zero Vulnerabilities",
        scenario: "Inspect a poorly configured Dockerfile (runs as root, uses bloated base image, contains exposed secrets), scan with Trivy, refactor into a multi-stage non-root build using a minimal Alpine/Distroless base, and verify elimination of critical CVEs.",
        deliverable: "Hardened Dockerfile and Trivy security comparison scan."
      },
      {
        title: "Lab 2 : Securing Amazon S3 Buckets & CloudTrail Logging",
        scenario: "Provision an S3 bucket, enforce 'Block All Public Access', configure a strict JSON bucket policy requiring TLS 1.2+ encryption in transit, enable KMS server-side encryption, and configure CloudTrail alerts for access anomalies.",
        deliverable: "JSON Bucket Policy configuration and CloudTrail event log export."
      }
    ],
    quiz: [
      {
        q: "Under the Cloud Shared Responsibility Model for Infrastructure-as-a-Service (IaaS), who is responsible for applying operating system security patches to virtual machines?",
        options: [
          "The cloud service provider (e.g., AWS / Azure) exclusively.",
          "The customer enterprise.",
          "The computer hardware manufacturer.",
          "The international standards organization."
        ],
        answer: 1,
        explanation: "In IaaS (like AWS EC2), the cloud provider manages the physical data center, servers, and hypervisor. The customer is entirely responsible for the installed operating system, its configuration, and security patching."
      }
    ],
    certifications: ["AWS Certified Security - Specialty", "Microsoft Certified: Azure Security Engineer (AZ-500)", "Certified Cloud Security Professional (CCSP)"],
    careers: ["Cloud Security Engineer (Cloud SecOps)", "DevSecOps Specialist", "Cloud Solutions Architect"],
    freeResources: [
      { name: "AWS Security Free Digital Training", url: "https://aws.amazon.com/training/digital/" },
      { name: "Official Kubernetes Security Concepts", url: "https://kubernetes.io/docs/concepts/security/" }
    ]
  },

  // -------------------------------------------------------------
  // PHASE 4 : GOVERNANCE, THREAT INTEL & PROJECTS
  // -------------------------------------------------------------
  {
    id: "iso-risk-compliance",
    num: 12,
    phase: 4,
    phaseTitle: "Phase 4 : Governance, Threat Intel & Projects",
    category: "Governance & Risk Management (GRC)",
    badge: "International Standards & Compliance",
    titleFr: "Normes, conformité et gestion des risques en cybersécurité",
    titleEn: "Cybersecurity Standards, Compliance and Risk Management",
    durationHours: 40,
    ects: 4,
    summary: "Cybersecurity is as much an organizational and legal discipline as it is technical. Major enterprises and banks must comply with international standards (ISO/IEC 27001), perform structured risk assessments (EBIOS RM, ISO 27005), and adhere to data privacy regulations including European GDPR and Moroccan Law 09-08 (CNDP).",
    keyObjectives: [
      "Understand the ISO/IEC 27000 family and build an Information Security Management System (ISMS / SMSI).",
      "Master quantitative and qualitative cyber risk assessment methodologies: EBIOS RM, ISO 27005, and MEHARI.",
      "Understand privacy legislation: European GDPR and Moroccan Law 09-08 (CNDP commission requirements).",
      "Author Information Security Policies (PSSI) and Business Continuity / Disaster Recovery plans (BCP/DRP)."
    ],
    chapters: [
      {
        title: "Chapter 1 : ISO/IEC 27001 Standard & ISMS Implementation",
        points: [
          "Structure of ISO 27001 and the Deming Continuous Improvement Cycle (PDCA: Plan-Do-Check-Act).",
          "Annex A controls: the 93 updated security controls across Organizational, People, Physical, and Technological themes.",
          "The Statement of Applicability (SoA) and internal audit procedures."
        ]
      },
      {
        title: "Chapter 2 : Cyber Risk Management Methodologies (EBIOS RM & ISO 27005)",
        points: [
          "Identifying primary assets (business processes, data) and supporting assets (hardware, software, networks).",
          "Risk formula: Impact (Severity) x Likelihood (Vulnerability x Threat capability).",
          "The 5 EBIOS RM workshops: Security baseline, Risk sources, Strategic scenarios, Operational scenarios, Risk treatment."
        ]
      },
      {
        title: "Chapter 3 : Legal Compliance & Data Privacy Regulations",
        points: [
          "Moroccan Law 09-08 on the protection of individuals with regard to the processing of personal data (CNDP).",
          "European General Data Protection Regulation (GDPR): rights, financial penalties, and 72-hour breach notification.",
          "The role and duties of the Data Protection Officer (DPO)."
        ]
      },
      {
        title: "Chapter 4 : Security Policy (PSSI) & Business Continuity (BCP / DRP)",
        points: [
          "Drafting and publishing corporate Information Security Policies (PSSI).",
          "Business Continuity Planning (BCP / PCA) to ensure operational resilience during disasters.",
          "Disaster Recovery Planning (DRP / PRA): defining Recovery Time Objective (RTO) and Recovery Point Objective (RPO)."
        ]
      }
    ],
    cheatSheet: [
      {
        desc: "Cyber Risk Calculation Formula & Treatment Options",
        code: `# Mathematical Risk Formula:\nRisk Level = Impact (Severity) x Likelihood (Probability)\n\n# 4 Universal Risk Treatment Options:\n1. Reduction / Mitigation : Implement technical controls (firewalls, encryption) to reduce risk\n2. Transfer / Sharing    : Procure cyber-insurance policy or outsource to specialized MSSP\n3. Avoidance             : Terminate the high-risk activity altogether\n4. Acceptance / Retention: Formal executive sign-off accepting residual risk after cost-benefit analysis`
      },
      {
        desc: "Core Business Continuity Metrics (RTO vs RPO)",
        code: `# RTO (Recovery Time Objective): Maximum acceptable duration of downtime before system recovery\n# RPO (Recovery Point Objective): Maximum acceptable data loss volume measured in time (determines backup frequency)`
      }
    ],
    practicalLabs: [
      {
        title: "Lab 1 : Complete EBIOS RM Cyber Risk Assessment for a Financial Institution",
        scenario: "Identify critical business assets (online banking database), model threat actors (cybercriminal ransomware syndicates, insider threats), map risk matrices, and recommend targeted Annex A controls to achieve acceptable residual risk.",
        deliverable: "Formal Risk Assessment Document (Dossier d'Analyse des Risques)."
      },
      {
        title: "Lab 2 : Drafting an Information Security Policy & CNDP Compliance Declaration",
        scenario: "Draft an enterprise Information Security Charter (PSSI) for a Moroccan enterprise and prepare the required regulatory notification dossier for processing personal customer data under CNDP Law 09-08.",
        deliverable: "PSSI policy document and CNDP compliance notification template."
      }
    ],
    quiz: [
      {
        q: "What does the Recovery Point Objective (RPO) specifically define in Disaster Recovery Planning?",
        options: [
          "The time required for emergency responders to arrive at the data center.",
          "The maximum acceptable duration of data loss measured back in time, which dictates the necessary frequency of data backups.",
          "The total number of staff members authorized in the server room.",
          "The budget allocated to purchase replacement network hardware."
        ],
        answer: 1,
        explanation: "RPO defines the maximum tolerable age of files that must be recovered from backup storage for normal operations to resume. If RPO = 2 hours, backups must occur at least every 2 hours."
      }
    ],
    certifications: ["ISO/IEC 27001 Lead Auditor / Implementer", "Certified Information Systems Auditor (CISA)", "CRISC (Risk & Information Systems Control)"],
    careers: ["Governance, Risk & Compliance (GRC) Consultant", "Chief Information Security Officer (CISO / RSSI)", "ISO 27001 Auditor"],
    freeResources: [
      { name: "ANSSI: Official EBIOS Risk Manager Guide (PDF)", url: "https://cyber.gouv.fr/la-methode-ebios-risk-manager" },
      { name: "CNDP Morocco Official Portal", url: "https://www.cndp.ma" }
    ]
  },

  {
    id: "threat-intel",
    num: 13,
    phase: 4,
    phaseTitle: "Phase 4 : Governance, Threat Intel & Projects",
    category: "Threat Intelligence & Cyber Radar",
    badge: "Proactive Defense Radar",
    titleFr: "Veille et prospective en cybersécurité",
    titleEn: "Cyber Threat Intelligence (CTI) & Horizon Scanning",
    durationHours: 35,
    ects: 3,
    summary: "Static defense is dead. Modern adversaries evolve continuously, deploying zero-days and living-off-the-land techniques. This course teaches Cyber Threat Intelligence (CTI): tracking Advanced Persistent Threats (APTs), applying the MITRE ATT&CK framework, monitoring dark web disclosures, and automating threat feeds via STIX/TAXII.",
    keyObjectives: [
      "Understand the CTI lifecycle across Strategic, Tactical, and Operational intelligence tiers.",
      "Apply the MITRE ATT&CK framework to map adversary Tactics, Techniques, and Procedures (TTPs).",
      "Track and prioritize software vulnerabilities across global databases (CVE, NVD, CISA KEV).",
      "Deploy open-source threat intelligence sharing platforms (MISP, OpenCTI) using STIX/TAXII."
    ],
    chapters: [
      {
        title: "Chapter 1 : Introduction to Cyber Threat Intelligence (CTI)",
        points: [
          "The CTI lifecycle: Direction, Collection, Processing, Analysis, and Dissemination.",
          "David Bianco's Pyramid of Pain (from trivial Hash values to challenging TTPs).",
          "Strategic CTI (for executives), Tactical CTI (for defenders), and Operational CTI (for SOCs)."
        ]
      },
      {
        title: "Chapter 2 : Attack Frameworks & Adversary Modeling",
        points: [
          "MITRE ATT&CK matrix: Tactics (goals), Techniques (actions), and Procedures (execution).",
          "The Lockheed Martin Cyber Kill Chain (Reconnaissance to Actions on Objectives).",
          "The Diamond Model of Intrusion Analysis (Adversary, Capability, Infrastructure, Victim)."
        ]
      },
      {
        title: "Chapter 3 : Vulnerability Tracking & Dark Web Reconnaissance",
        points: [
          "Common Vulnerabilities and Exposures (CVE) and Common Vulnerability Scoring System (CVSS v3/v4).",
          "CISA Known Exploited Vulnerabilities (KEV) catalog for real-world risk prioritization.",
          "Dark web forums, paste sites, and Telegram monitoring for leaked enterprise credentials."
        ]
      },
      {
        title: "Chapter 4 : Threat Sharing Standards & OpenCTI / MISP",
        points: [
          "Structured Threat Information Expression (STIX 2.1) and TAXII transport protocols.",
          "Operating MISP (Malware Information Sharing Platform) for cross-organizational IoC sharing.",
          "Threat actor attribution and campaign tracking in OpenCTI."
        ]
      }
    ],
    cheatSheet: [
      {
        desc: "Automated NIST NVD API Query in Python for Critical CVEs",
        code: `import requests\n\nurl = "https://services.nvd.nist.gov/rest/json/cves/2.0?cvssV3Severity=CRITICAL&resultsPerPage=5"\nheaders = {"User-Agent": "CyberSec-CTI-Bot"}\nresponse = requests.get(url, headers=headers).json()\n\nfor item in response.get("vulnerabilities", []):\n    cve = item["cve"]\n    print(f"[{cve['id']}] Score: {cve['metrics']['cvssMetricV31'][0]['cvssData']['baseScore']} - {cve['descriptions'][0]['value'][:80]}...")`
      },
      {
        desc: "Advanced Shodan OSINT search queries for exposed assets",
        code: `# Discover exposed SMBv1 services on the Internet\nport:445 "SMBv1"\n# Discover unauthenticated industrial control or IoT web interfaces\n"default password" org:"Target-Organization"`
      }
    ],
    practicalLabs: [
      {
        title: "Lab 1 : Mapping a Real Ransomware Campaign on MITRE ATT&CK Navigator",
        scenario: "Analyze a technical CTI report for a LockBit 3.0 ransomware attack, extract techniques across the kill chain (Phishing T1566, PowerShell T1059, Mimikatz T1003), and construct an interactive ATT&CK Navigator layer to highlight defensive blind spots.",
        deliverable: "Interactive JSON layer and defensive gap analysis."
      },
      {
        title: "Lab 2 : Building an Automated Threat Intelligence Telegram Bot",
        scenario: "Author a Python daemon that monitors RSS feeds from CISA, CERT-FR, and BleepingComputer, filters for zero-day disclosures, and dispatches structured alerts with CVE IDs to a SOC Telegram channel.",
        deliverable: "Python source code and verified webhook alert notifications."
      }
    ],
    quiz: [
      {
        q: "In David Bianco's 'Pyramid of Pain', what is the most difficult indicator for an adversary to change when defenders detect and deny it?",
        options: [
          "External IP address.",
          "Tactics, Techniques, and Procedures (TTPs).",
          "Malware file hash (SHA-256).",
          "Domain name."
        ],
        answer: 1,
        explanation: "TTPs sit at the top of the Pyramid of Pain. While attackers can recompile a payload to change its hash in seconds, abandoning their core tactics and tradecraft forces them to reinvent their entire operational playbook."
      }
    ],
    certifications: ["Certified Threat Intelligence Analyst (CTIA)", "GIAC Cyber Threat Intelligence (GCTI)"],
    careers: ["Cyber Threat Intelligence (CTI) Analyst", "Threat Hunter", "Security Researcher"],
    freeResources: [
      { name: "MITRE ATT&CK Navigator", url: "https://mitre-attack.github.io/attack-navigator/" },
      { name: "AlienVault Open Threat Exchange (OTX)", url: "https://otx.alienvault.com" }
    ]
  },

  {
    id: "project-mgmt",
    num: 14,
    phase: 4,
    phaseTitle: "Phase 4 : Governance, Threat Intel & Projects",
    category: "IT Project Management & Leadership",
    badge: "Agile Leadership",
    titleFr: "Initiation à la conduite de projets informatiques",
    titleEn: "IT Project Management and Agile Methodologies",
    durationHours: 35,
    ects: 3,
    summary: "A great cybersecurity engineer must also know how to lead IT initiatives: deploying a company-wide SIEM or migrating firewalls requires financial budgeting, stakeholder alignment, and agile sprints. This course covers Scrum/Agile project lifecycles, specifications drafting, and risk/cost management.",
    keyObjectives: [
      "Understand the IT project lifecycle from feasibility study to production handover.",
      "Master Agile / Scrum frameworks: Sprints, User Stories, Daily Standups, and Retrospectives.",
      "Draft formal technical specifications (Cahier des charges) and compute Return on Security Investment (ROSI).",
      "Utilize project planning tools (Gantt, PERT charts) and issue tracking platforms (Jira / Confluence)."
    ],
    chapters: [
      {
        title: "Chapter 1 : Project Management Fundamentals & ROI",
        points: [
          "The Triple Constraint model: Scope, Cost, and Time.",
          "Roles in IT projects: Project Owner (MOA) and Project Implementer (MOE).",
          "Calculating Return on Security Investment (ROSI) to justify cybersecurity budgets to executives."
        ]
      },
      {
        title: "Chapter 2 : Agile Methodologies & Scrum Framework",
        points: [
          "The Agile Manifesto and its 12 core operating principles.",
          "Scrum roles: Product Owner (PO), Scrum Master (SM), and Cross-functional Developers.",
          "Scrum ceremonies: Sprint Planning, Daily Scrum, Sprint Review, and Retrospective.",
          "Authoring User Stories with INVEST criteria and calculating team sprint velocity."
        ]
      },
      {
        title: "Chapter 3 : Traditional Planning & Tracking Tools",
        points: [
          "Work Breakdown Structure (WBS) decomposition.",
          "Gantt charts and critical path analysis using PERT networks.",
          "Project workflow management using Jira boards and Confluence documentation."
        ]
      },
      {
        title: "Chapter 4 : Change Management & Project Closeout",
        points: [
          "Organizational change management (conduite du changement) when enforcing strict security policies.",
          "User acceptance testing (UAT / Recette technique et fonctionnelle).",
          "Post-mortem project review and lessons learned documentation."
        ]
      }
    ],
    cheatSheet: [
      {
        desc: "Return on Security Investment (ROSI) Formula",
        code: `# ROSI Formula:\nROSI = ((Avoided Loss x Mitigation Ratio) - Solution Cost) / Solution Cost\n\n# Example: Ransomware loss = $500,000; Firewall stops 95% of attacks; Cost = $50,000\n# ROSI = (($500,000 x 0.95) - $50,000) / $50,000 = 850% (High return investment)`
      },
      {
        desc: "Standard Security User Story Template in Scrum",
        code: `As a [Role: e.g., SOC Analyst]\nI want [Capability: e.g., to receive instant alerts when a domain admin logs in after hours]\nSo that [Business Benefit: e.g., I can detect compromised executive accounts within 2 minutes]\nAcceptance Criteria: Alert includes Source IP, Timestamp, and User Principal Name.`
      }
    ],
    practicalLabs: [
      {
        title: "Lab 1 : Building a Cybersecurity Project Board on Jira for 3 Sprints",
        scenario: "Configure a Scrum board on Jira for deploying company-wide Multi-Factor Authentication (MFA), break down tasks into User Stories, assign Story Points, and plan Sprint 1 deliverables.",
        deliverable: "Exported Jira backlog and Sprint 1 burndown chart."
      },
      {
        title: "Lab 2 : Drafting Technical Specifications for Next-Gen Firewall Acquisition",
        scenario: "Author a formal procurement specification document (Cahier des charges) specifying throughput, SSL inspection, high-availability, budgeting, and delivery milestones for a corporate firewall upgrade.",
        deliverable: "Comprehensive Technical Specifications Document (PDF)."
      }
    ],
    quiz: [
      {
        q: "What is the primary objective of the 'Sprint Retrospective' meeting in Scrum?",
        options: [
          "Demonstrating the finished software features to external clients for sales.",
          "An internal team meeting to evaluate operational processes, identify bottlenecks, and commit to actionable improvements for the next sprint.",
          "Penalizing developers who failed to finish their assigned tasks.",
          "Writing code under high pressure to compensate for delays."
        ],
        answer: 1,
        explanation: "The Sprint Retrospective is dedicated to team self-improvement. The team reflects on what went well, what struggled, and what concrete process changes will be implemented in the next sprint."
      }
    ],
    certifications: ["Professional Scrum Master (PSM I)", "CAPM (Project Management Institute)", "PRINCE2 Foundation"],
    careers: ["Cybersecurity Project Manager", "Scrum Master", "IT Director"],
    freeResources: [
      { name: "Official Scrum Guide", url: "https://scrumguides.org" },
      { name: "Atlassian Agile Coach Tutorials", url: "https://www.atlassian.com/agile" }
    ]
  },

  {
    id: "iot-bigdata-app",
    num: 15,
    phase: 4,
    phaseTitle: "Phase 4 : Governance, Threat Intel & Projects",
    category: "Integrative Capstone Project",
    badge: "Technical Capstone Project",
    titleFr: "Projet de développement d’une application avec Big Data, IoT et modélisation UML",
    titleEn: "Application Development Project with Big Data, IoT and UML Modeling",
    durationHours: 60,
    ects: 6,
    summary: "This is your premier technical capstone project! You integrate software engineering, connected devices, and Big Data: architecting an application with rigorous UML diagrams, collecting telemetry from IoT sensors over encrypted protocols (MQTTS), streaming records into Big Data pipelines (Kafka/NoSQL), and securing every layer.",
    keyObjectives: [
      "Produce comprehensive object-oriented designs using UML (Use Case, Class, Sequence, and Activity diagrams).",
      "Program and secure IoT communication protocols (MQTT over TLS 8883, CoAP, WebSockets).",
      "Architect a Big Data ingestion and processing pipeline with NoSQL storage and real-time visualization.",
      "Apply Security-by-Design principles across Edge, Transport, Cloud, and Frontend layers."
    ],
    chapters: [
      {
        title: "Chapter 1 : UML Modeling & Object-Oriented Architecture",
        points: [
          "Use Case diagrams and detailed functional specification requirements.",
          "Class diagrams: inheritance, composition, aggregation, and design patterns.",
          "Sequence diagrams modeling encrypted authentication flows and token exchange."
        ]
      },
      {
        title: "Chapter 2 : Internet of Things (IoT) Security",
        points: [
          "IoT security challenges: constrained compute resources, default credentials, and Mirai botnets.",
          "MQTT protocol and encryption via MQTTS (TLS 8883) with mutual authentication (mTLS).",
          "Secure Over-The-Air (OTA) firmware cryptographic verification and updates."
        ]
      },
      {
        title: "Chapter 3 : Big Data Streaming & Storage Architecture",
        points: [
          "Message brokers for high-throughput sensor telemetry: Apache Kafka and RabbitMQ.",
          "NoSQL databases for time-series telemetry storage (MongoDB, InfluxDB).",
          "Data privacy engineering: pseudonymization, tokenization, and encryption at rest."
        ]
      },
      {
        title: "Chapter 4 : End-to-End Integration & Real-Time Monitoring",
        points: [
          "Developing secure RESTful APIs with JWT authentication for data access.",
          "Constructing real-time monitoring dashboards (Grafana or React).",
          "Comprehensive penetration testing and threat modeling of the completed application."
        ]
      }
    ],
    cheatSheet: [
      {
        desc: "Python MQTTS Client with Mutual TLS (mTLS) Encryption",
        code: `import paho.mqtt.client as mqtt\nimport ssl\n\nclient = mqtt.Client(client_id="Secure-Edge-Sensor-01")\n# Enforce TLS 1.2+ encryption with client certificates\nclient.tls_set(\n    ca_certs="ca.crt",\n    certfile="client.crt",\n    keyfile="client.key",\n    tls_version=ssl.PROTOCOL_TLSv1_2\n)\nclient.connect("mqtt.enterprisebroker.com", 8883, 60)\nclient.publish("telemetry/metrics", '{"temperature": 23.4, "status": "secure"}')`
      },
      {
        desc: "UML Sequence Diagram in PlantUML Syntax",
        code: `@startuml\nactor Client\nparticipant "IoT Edge Device" as IoT\nparticipant "MQTTS Broker" as Broker\ndatabase "Big Data Store" as DB\n\nClient -> IoT: Authenticate via mTLS\nIoT -> Broker: Publish telemetry over TLS 8883\nBroker -> DB: Stream validated events\n@enduml`
      }
    ],
    practicalLabs: [
      {
        title: "Lab 1 : Deploying a Hardened Mosquitto MQTTS Broker with mTLS",
        scenario: "Install Mosquitto on a virtual machine, issue X.509 server and client certificates, configure `mosquitto.conf` to disable unencrypted port 1883 and require mTLS on port 8883, and test communication with Python scripts.",
        deliverable: "Broker configuration file and Wireshark capture proving packet encryption."
      },
      {
        title: "Lab 2 : End-to-End UML Architectural Dossier for IoT Big Data Platform",
        scenario: "Construct the complete architectural dossier: Use Case diagram, Class diagram, Sequence diagram for key exchange, and physical deployment diagram for an IoT Big Data application.",
        deliverable: "Formal UML Architectural Specification Dossier (PDF)."
      }
    ],
    quiz: [
      {
        q: "What is the standard IANA network port reserved for secure MQTT communication over TLS (MQTTS)?",
        options: ["Port 1883", "Port 8883", "Port 80", "Port 443"],
        answer: 1,
        explanation: "Port 1883 is standard unencrypted MQTT. Port 8883 is the IANA-assigned standard port for secure MQTT over TLS (MQTTS)."
      }
    ],
    certifications: ["IoT Security Foundation Certified", "Certified Professional in Python (PCAP)"],
    careers: ["Embedded Systems & IoT Security Engineer", "Data Security Engineer", "Solutions Architect"],
    freeResources: [
      { name: "PlantUML Online Editor", url: "https://www.plantuml.com/plantuml/uml/" },
      { name: "Mosquitto MQTT Official Documentation", url: "https://mosquitto.org/documentation/" }
    ]
  },

  // -------------------------------------------------------------
  // PHASE 5 : FEDE CORE MODULES & PROFESSIONAL INTERNSHIP (PFE)
  // -------------------------------------------------------------
  {
    id: "fede-europe-project",
    num: 16,
    phase: 5,
    phaseTitle: "Phase 5 : FEDE Core & Graduation (PFE)",
    category: "General European Culture (FEDE Core)",
    badge: "Official FEDE Diploma Requirement",
    titleFr: "Le projet européen : culture et démocratie pour une citoyenneté en action",
    titleEn: "The European Project: Culture and Democracy for Active Citizenship",
    durationHours: 30,
    ects: 3,
    summary: "This mandatory course prepares candidates for the official FEDE European Culture examination. It covers the history of European construction, foundational treaties (Rome, Maastricht, Lisbon), governance institutions (Parliament, Commission, Court of Justice), fundamental human rights, and European cyber directives (NIS 2, DORA).",
    keyObjectives: [
      "Understand the historical milestones of European construction from the Schuman Declaration to the present.",
      "Master the roles of core EU institutions: Commission, European Parliament, Council of the EU, and CJEU.",
      "Understand European citizenship rights, the Schengen Area, and the Four Fundamental Freedoms.",
      "Prepare thoroughly to succeed in the official FEDE European Culture examination."
    ],
    chapters: [
      {
        title: "Chapter 1 : Historical Milestones of European Integration",
        points: [
          "Post-WWII integration: The Schuman Declaration (May 9, 1950) and the ECSC Treaty.",
          "The Treaty of Rome (1957) establishing the European Economic Community (EEC).",
          "The Maastricht Treaty (1992): founding the European Union and the single Euro currency.",
          "The Treaty of Lisbon (2009): institutional modernization and legal personality."
        ]
      },
      {
        title: "Chapter 2 : Institutions of the European Union",
        points: [
          "The European Commission: executive branch, monopoly of legislative initiative.",
          "The European Parliament: co-legislative power and democratic representation.",
          "The Council of the European Union and the European Council.",
          "The Court of Justice of the European Union (CJEU) and the European Central Bank (ECB)."
        ]
      },
      {
        title: "Chapter 3 : Citizenship, Fundamental Rights & Cyber Regulations",
        points: [
          "The Charter of Fundamental Rights of the European Union.",
          "The Four Freedoms: free movement of goods, services, capital, and persons (Schengen).",
          "European cyber legislation and its international impact: NIS 2 Directive, DORA, and Cyber Resilience Act."
        ]
      }
    ],
    cheatSheet: [
      {
        desc: "Essential Chronological Dates for the FEDE European Exam",
        code: `May 9, 1950    : Schuman Declaration (Europe Day)\nMarch 25, 1957 : Treaty of Rome (Creation of the EEC)\nFeb 7, 1992    : Treaty of Maastricht (Founding of the EU and Euro)\nDec 1, 2009    : Treaty of Lisbon (Modern institutional governance)`
      }
    ],
    practicalLabs: [
      {
        title: "Lab 1 : Case Study: Impact of EU NIS 2 & DORA Directives on Partner Countries",
        scenario: "Author an analysis detailing how European cyber regulations (NIS 2 Directive and DORA) impose stringent supply chain security requirements on IT service providers and banks in Morocco and Mediterranean partner nations.",
        deliverable: "3-page executive regulatory compliance report."
      }
    ],
    quiz: [
      {
        q: "Which treaty officially founded the European Union and paved the way for the creation of the single Euro currency?",
        options: ["Treaty of Rome (1957)", "Treaty of Maastricht (1992)", "Treaty of Versailles (1919)", "Treaty of Paris (1951)"],
        answer: 1,
        explanation: "The Maastricht Treaty, signed on February 7, 1992, officially established the European Union and set the timeline and convergence criteria for the Euro single currency."
      }
    ],
    certifications: ["FEDE European Culture Certificate"],
    careers: ["International IT Consultant", "European Compliance Officer", "Global Project Manager"],
    freeResources: [
      { name: "Toute l'Europe: History and Institutions Portal", url: "https://www.touteleurope.eu" },
      { name: "FEDE Official Education Guidelines", url: "https://fede.education" }
    ]
  },

  {
    id: "fede-intercultural-mgmt",
    num: 17,
    phase: 5,
    phaseTitle: "Phase 5 : FEDE Core & Graduation (PFE)",
    category: "Management & Human Resources in Europe",
    badge: "Official FEDE Diploma Requirement",
    titleFr: "Le management interculturel et les ressources humaines en Europe",
    titleEn: "Intercultural Management and Human Resources in Europe",
    durationHours: 30,
    ects: 3,
    summary: "Cybersecurity professionals operate within global, cross-border teams (Europe, Americas, Asia). This course provides intercultural communication and leadership skills: analyzing cultural dimensions (Hofstede, Hall), managing remote engineering teams, resolving professional conflicts, and understanding European HR practices.",
    keyObjectives: [
      "Master cultural analysis frameworks: Geert Hofstede's 6 dimensions and Edward T. Hall's context model.",
      "Communicate effectively within cross-border and multinational engineering teams.",
      "Lead distributed cybersecurity teams and manage professional workplace conflicts constructively.",
      "Understand IT talent recruitment, retention strategies, and European labor standards."
    ],
    chapters: [
      {
        title: "Chapter 1 : Cultural Dimensions in Management",
        points: [
          "Geert Hofstede's 6 dimensions: Power Distance (PDI), Individualism vs Collectivism, Uncertainty Avoidance.",
          "Edward T. Hall's communication models: High-context vs Low-context cultures.",
          "Monochronic vs Polychronic time management across different national cultures."
        ]
      },
      {
        title: "Chapter 2 : Leadership & Cross-Cultural Team Dynamics",
        points: [
          "Overcoming cultural stereotypes and cognitive biases in international negotiations.",
          "Managing remote, distributed SecOps and development teams across multiple time zones.",
          "Conflict resolution strategies: mediation, arbitration, and integrative bargaining."
        ]
      },
      {
        title: "Chapter 3 : Human Resource Management in the Tech Sector",
        points: [
          "Cybersecurity talent acquisition and retention in a competitive global market.",
          "Performance evaluation, career development (GPEC), and continuous skills development.",
          "Workplace ergonomics, mental health, and remote-work regulations in Europe."
        ]
      }
    ],
    cheatSheet: [
      {
        desc: "Hofstede's 6 Cultural Dimensions Overview",
        code: `1. Power Distance Index (PDI)        : Degree of hierarchy and authority acceptance\n2. Individualism vs Collectivism (IDV): Priority of individual autonomy vs group cohesion\n3. Masculinity vs Femininity (MAS)   : Competition and achievement vs cooperation and quality of life\n4. Uncertainty Avoidance Index (UAI) : Level of anxiety toward ambiguity and unexpected change\n5. Long-Term Orientation (LTO)       : Future-focused pragmatism vs traditional preservation\n6. Indulgence vs Restraint (IND)     : Freedom of gratification vs strict social norms`
      }
    ],
    practicalLabs: [
      {
        title: "Lab 1 : Diagnosing & Resolving a Cross-Cultural Conflict in a Global SOC Team",
        scenario: "A multi-regional SOC team comprising engineers from Germany, Morocco, and India faces communication friction over incident escalation protocol; diagnose using Hall and Hofstede dimensions and author a unified Team Charter.",
        deliverable: "Conflict resolution diagnosis and Multicultural Team Operating Charter."
      }
    ],
    quiz: [
      {
        q: "According to Edward T. Hall's cultural framework, what characterizes a 'Low-Context Culture' (such as Germany or Switzerland)?",
        options: [
          "Communication is direct, explicit, and precise, where words carry the full meaning with minimal reliance on subtle hints.",
          "Messages rely heavily on body language and unstated background assumptions.",
          "Email communication is strictly prohibited in corporate environments.",
          "Decisions are made purely on emotional impulses."
        ],
        answer: 0,
        explanation: "In low-context cultures (e.g., Germany, Netherlands, Scandinavian nations), communication is explicit, direct, and transparent. The message is completely encoded in the literal text rather than implicit contextual cues."
      }
    ],
    certifications: ["FEDE Intercultural Management Certificate"],
    careers: ["Engineering Manager", "International Scrum Master", "IT Human Resources Director"],
    freeResources: [
      { name: "Hofstede Insights Country Comparison Tool", url: "https://www.hofstede-insights.com/country-comparison-tool" }
    ]
  },

  {
    id: "cyber-english",
    num: 18,
    phase: 5,
    phaseTitle: "Phase 5 : FEDE Core & Graduation (PFE)",
    category: "Languages & Professional Communication",
    badge: "The Universal Language of Cyber",
    titleFr: "Langue Vivante : Anglais technique & de cybersécurité",
    titleEn: "Technical English for Cybersecurity",
    durationHours: 35,
    ects: 3,
    summary: "English is the undisputed global language of cybersecurity: 99% of CVE disclosures, whitepapers, exploits, and premier conferences (DEF CON, Black Hat) are in English. This course focuses on specialized technical terminology, authoring incident reports, delivering technical presentations, and passing English interviews.",
    keyObjectives: [
      "Master specialized technical terminology in systems, networking, and offensive/defensive security.",
      "Author professional cybersecurity deliverables in English: Incident Reports and Pentest Summaries.",
      "Deliver technical presentations and participate in simulated War Room incident calls in English.",
      "Prepare for international English proficiency examinations (TOEIC, IELTS, FEDE English exam)."
    ],
    chapters: [
      {
        title: "Chapter 1 : Technical Cybersecurity Jargon & Acronyms",
        points: [
          "Threat taxonomy: Vulnerability, Exploit, Zero-Day, Ransomware, Phishing, Payload, Data Breach.",
          "Defensive concepts: Hardening, Patch Management, Threat Hunting, Air-Gapping, Least Privilege, Zero Trust.",
          "Industry acronyms: CVE, SIEM, SOAR, EDR, XDR, IAM, WAF, DLP, SOC."
        ]
      },
      {
        title: "Chapter 2 : Authoring Professional Incident & Audit Reports",
        points: [
          "Structuring security findings: Executive Summary, Scope, Vulnerability, Severity, and Remediation.",
          "Action-oriented terminology: Mitigate, Remediate, Deprecate, Isolate, Neutralize, Patch.",
          "Drafting an urgent security advisory email to executive C-suite management."
        ]
      },
      {
        title: "Chapter 3 : Technical Job Interviews & Public Speaking",
        points: [
          "Answering technical and behavioral interview questions in English using the STAR method.",
          "Explaining complex cybersecurity risks to non-technical business stakeholders.",
          "Listening comprehension: analyzing international cybersecurity podcasts and news interviews."
        ]
      }
    ],
    cheatSheet: [
      {
        desc: "Professional Executive Security Finding Template in English",
        code: `Finding Title: Critical Remote Code Execution (RCE) in Apache HTTP Server\nSeverity     : CRITICAL (CVSS v3.1: 9.8)\nDescription  : An unauthenticated remote threat actor can execute arbitrary code on the underlying host via crafted HTTP request headers.\nImpact       : Complete loss of system confidentiality, integrity, and availability, with potential lateral network movement.\nRemediation  : Immediately upgrade Apache to version 2.4.52 or higher and restrict inbound port 80/443 traffic at the perimeter firewall.`
      },
      {
        desc: "Key Phrases for International Cybersecurity Job Interviews",
        code: `"I specialize in threat detection, log correlation, and network micro-segmentation."\n"When triage confirms an active intrusion, the immediate operational priority is containment."\n"I have extensive hands-on experience hardening Linux distributions and automating workflows via Python scripts."`
      }
    ],
    practicalLabs: [
      {
        title: "Lab 1 : Writing an Executive Summary & Technical Pentest Report in English",
        scenario: "Take a raw vulnerability finding from an internal penetration test and author a 2-page formal report in English containing both a high-level Executive Summary for the CEO and technical remediation steps for systems engineers.",
        deliverable: "Formal 2-page Technical Security Report in English (Markdown / PDF)."
      }
    ],
    quiz: [
      {
        q: "What does the cybersecurity term 'Zero-Day Vulnerability' specifically designate?",
        options: [
          "A vulnerability that took exactly zero days to patch.",
          "A security flaw that is known to attackers or publicly disclosed before the software vendor has created and released a security patch.",
          "A vulnerability that can only be exploited at midnight.",
          "A minor flaw that causes zero financial losses."
        ],
        answer: 1,
        explanation: "A 'Zero-Day' refers to a flaw that is actively known or exploited while the developers have had 'zero days' to develop a fix, leaving systems vulnerable until an official patch is published."
      }
    ],
    certifications: ["TOEIC Listening and Reading (785+)", "EF SET Certificate (C1 Level)"],
    careers: ["International Cyber Consultant", "SOC Analyst in Multinational", "Technical Security Writer"],
    freeResources: [
      { name: "Darknet Diaries Podcast (Listen & Learn)", url: "https://darknetdiaries.com" },
      { name: "SANS Glossary of Cybersecurity Terms", url: "https://www.sans.org/security-resources/glossary-of-terms/" }
    ]
  },

  {
    id: "stage-pfe",
    num: 19,
    phase: 5,
    phaseTitle: "Phase 5 : FEDE Core & Graduation (PFE)",
    category: "Final Graduation Internship & Thesis (PFE)",
    badge: "Diploma Capstone & Career Gateway",
    titleFr: "Stage en entreprise ou Projet tuteuré (PFE)",
    titleEn: "End-of-Studies Internship & Graduation Thesis (PFE)",
    durationHours: 120,
    ects: 12,
    summary: "The graduation internship (Stage de fin d'études) is the culmination of your Bachelor program and your premier gateway to the job market! You spend at least 12 weeks embedded inside an enterprise, solving real cybersecurity challenges (deploying a SOC, hardening infrastructure, or auditing against ISO 27001), authoring a professional thesis, and defending it before a jury.",
    keyObjectives: [
      "Integrate into a professional enterprise IT environment and apply theoretical and lab skills to production systems.",
      "Solve a tangible cybersecurity problem and architect concrete engineering solutions.",
      "Author an academically rigorous and professionally formatted Graduation Thesis (Mémoire de fin d'études).",
      "Deliver a compelling oral defense (Soutenance orale) before academic professors and industry experts."
    ],
    chapters: [
      {
        title: "Chapter 1 : Internship Search & Topic Definition",
        points: [
          "Crafting a high-impact cybersecurity CV and targeted cover letter.",
          "Top in-demand PFE topics: Open-Source SOC deployment (Wazuh), Active Directory security audit, ISO 27001 risk implementation, DevSecOps pipeline automation, Cloud security hardening.",
          "Formulating the core problem statement (Problématique) and measurable deliverables."
        ]
      },
      {
        title: "Chapter 2 : Thesis Authoring Methodology (Mémoire)",
        points: [
          "Thesis structural architecture: Acknowledgments, Introduction, Enterprise Presentation, State-of-the-Art & Problem Statement, Proposed Technical Solution, Implementation & Testing, Conclusion & Perspectives.",
          "Academic citation standards (IEEE / APA), avoiding plagiarism, and structuring architectural diagrams.",
          "Cost-benefit analysis and technical benchmark comparisons."
        ]
      },
      {
        title: "Chapter 3 : Oral Defense Preparation (Soutenance devant Jury)",
        points: [
          "Designing professional presentation slides: visual clarity, architecture diagrams, avoiding text clutter.",
          "Rigorous timing management (20-minute presentation followed by 15-minute question-and-answer session).",
          "Handling challenging technical cross-examination and defending engineering choices with composure."
        ]
      }
    ],
    cheatSheet: [
      {
        desc: "Top 5 High-Value PFE Topics Guaranteed to Attract Recruiters",
        code: `1. Architecture and Deployment of an Open-Source SOC using Wazuh, TheHive, and Cortex\n2. Security Audit and Implementation of Active Directory Tiering Architecture\n3. Micro-Segmentation and Deployment of a High-Availability pfSense Firewall Cluster\n4. Implementing an Automated DevSecOps CI/CD Security Pipeline (SonarQube, Trivy, Vault)\n5. Cyber Risk Assessment using EBIOS RM and Readiness Preparation for ISO/IEC 27001 Certification`
      }
    ],
    practicalLabs: [
      {
        title: "Lab 1 : Mock Oral Defense Simulation with Slide Deck Preparation",
        scenario: "Construct a 15-slide PowerPoint deck summarizing an infrastructure hardening project, rehearse the presentation within a strict 20-minute timer, and address 5 difficult cross-examination questions regarding budget and alternative technologies.",
        deliverable: "Completed slide presentation deck and jury Q&A preparation guide."
      }
    ],
    quiz: [
      {
        q: "What is the single most critical aspect evaluated by the jury during the graduation thesis defense (Soutenance PFE)?",
        options: [
          "The total number of printed pages in the physical thesis document.",
          "The candidate's thorough comprehension of the business problem, personal technical contribution, and ability to justify engineering choices.",
          "Wearing an expensive designer business suit.",
          "Listing as many commercial hacking tools as possible."
        ],
        answer: 1,
        explanation: "Jury members look for engineering maturity: Did the student deeply grasp the real enterprise problem? Did they build the technical solution hands-on? Can they logically justify their architectural decisions over alternatives?"
      }
    ],
    certifications: ["Professional Internship Certificate", "Maître de Stage Recommendation Letter"],
    careers: ["Junior Cybersecurity Engineer", "Junior Security Consultant", "Network & Systems Security Specialist"],
    freeResources: [
      { name: "FEDE Official Thesis Writing Guidelines", url: "https://fede.education" },
      { name: "Overleaf Academic LaTeX Thesis Templates", url: "https://www.overleaf.com/latex/templates" }
    ]
  }
];

// Helper: Retrieve module by ID
function getModuleById(id) {
  return CURRICULUM_DATA.find(m => m.id === id);
}

// Global browser export
if (typeof window !== 'undefined') {
  window.CURRICULUM_DATA = CURRICULUM_DATA;
  window.getModuleById = getModuleById;
}
