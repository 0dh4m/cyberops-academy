/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <0dh4mm@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - FEDE European Bachelor Official Exam Question Bank
 * Comprehensive examination questions covering the entire 19-module syllabus.
 */
const ExamQuestionBank = [
  {
    id: "q1",
    category: "Networking",
    question: "Which TCP control flag sequence is transmitted during the normal 3-way connection termination teardown?",
    options: [
      "SYN ➔ SYN-ACK ➔ ACK",
      "FIN ➔ ACK ➔ FIN ➔ ACK",
      "RST ➔ ACK ➔ FIN",
      "URG ➔ PSH ➔ ACK"
    ],
    correct: 1,
    explanation: "TCP connection graceful termination is a 4-step sequence: Client sends FIN, Server returns ACK, Server sends its own FIN, Client sends final ACK."
  },
  {
    id: "q2",
    category: "Networking",
    question: "In IPv4 subnetting, how many usable host addresses are available in a /27 subnet mask (255.255.255.224)?",
    options: [
      "32 hosts",
      "30 hosts",
      "62 hosts",
      "14 hosts"
    ],
    correct: 1,
    explanation: "A /27 prefix leaves 32 - 27 = 5 host bits. Total addresses = 2^5 = 32. Usable hosts = 32 - 2 (subtracting Network and Broadcast IDs) = 30."
  },
  {
    id: "q3",
    category: "Security & OWASP",
    question: "What is the primary architectural defense against SQL Injection (OWASP A03:2021) vulnerabilities?",
    options: [
      "Client-side regex verification of input characters",
      "Base64 encoding all database parameters before sending",
      "Parameterized Queries / Prepared Statements",
      "Increasing database connection timeout limits"
    ],
    correct: 2,
    explanation: "Prepared Statements (Parameterized Queries) ensure that input parameters are treated strictly as data literals and never compiled as executable SQL command syntax."
  },
  {
    id: "q4",
    category: "Cryptography & IAM",
    question: "Which cryptographic mode provides Authenticated Encryption with Associated Data (AEAD), ensuring both confidentiality and message integrity?",
    options: [
      "AES-ECB (Electronic Codebook)",
      "AES-CBC (Cipher Block Chaining)",
      "AES-GCM (Galois/Counter Mode)",
      "DES-EDE3"
    ],
    correct: 2,
    explanation: "AES-GCM is an AEAD mode that combines Counter mode encryption with Galois authentication tag computation, preventing ciphertext tampering and bit-flipping attacks."
  },
  {
    id: "q5",
    category: "Operating Systems",
    question: "Under Linux, which file permission octal notation allows owner Read/Write/Execute, group Read/Execute, and others No access?",
    options: [
      "chmod 755",
      "chmod 750",
      "chmod 640",
      "chmod 700"
    ],
    correct: 1,
    explanation: "Owner: 4+2+1=7 (rwx), Group: 4+1=5 (r-x), Others: 0 (---) ➔ 750."
  },
  {
    id: "q6",
    category: "Governance & FEDE",
    question: "What is the primary objective of the ISO/IEC 27001 standard in cybersecurity governance?",
    options: [
      "Mandating specific proprietary antivirus software for corporate endpoints",
      "Establishing, implementing, and continuously improving an Information Security Management System (ISMS)",
      "Standardizing software source code formatting across European development teams",
      "Eliminating 100% of network latency in wide area networks"
    ],
    correct: 1,
    explanation: "ISO/IEC 27001 specifies requirements for establishing, maintaining, and continually improving an ISMS (Information Security Management System) based on PDCA (Plan-Do-Check-Act) and risk assessment."
  },
  {
    id: "q7",
    category: "Security & OWASP",
    question: "Which HTTP header instructs the browser never to load the site inside an <iframe>, mitigating Clickjacking attacks?",
    options: [
      "X-Content-Type-Options: nosniff",
      "X-Frame-Options: DENY",
      "Strict-Transport-Security: max-age=31536000",
      "Access-Control-Allow-Origin: *"
    ],
    correct: 1,
    explanation: "X-Frame-Options: DENY prevents the webpage from being rendered in any frame or iframe, neutralizing Clickjacking and UI redressing attacks."
  },
  {
    id: "q8",
    category: "Cryptography & IAM",
    question: "In Public Key Infrastructure (PKI), which entity cryptographically signs digital X.509 certificates to bind a public key to an identity?",
    options: [
      "Certificate Authority (CA)",
      "Dynamic Host Configuration Protocol (DHCP) Server",
      "Border Gateway Protocol (BGP) Router",
      "NTP Time Server"
    ],
    correct: 0,
    explanation: "A Certificate Authority (CA) acts as the trusted third party that validates identities and issues digitally signed X.509 certificates."
  },
  {
    id: "q9",
    category: "Operating Systems",
    question: "In Active Directory Domain Services (AD DS), which Kerberos ticket is issued by the KDC Authentication Service (AS) upon successful login?",
    options: [
      "Ticket Granting Service (TGS) ticket",
      "Ticket Granting Ticket (TGT)",
      "Service Principal Name (SPN) token",
      "SAML Assertion"
    ],
    correct: 1,
    explanation: "During Kerberos authentication, the Authentication Service (AS) returns a Ticket Granting Ticket (TGT) encrypted with the krbtgt account key."
  },
  {
    id: "q10",
    category: "Governance & FEDE",
    question: "Under the European General Data Protection Regulation (GDPR / RGPD), what is the mandatory notification window for reporting a data breach to the supervisory authority (e.g., CNIL / CNDP)?",
    options: [
      "Within 24 hours",
      "Within 72 hours of becoming aware of the breach",
      "Within 30 calendar days",
      "Only after the end of financial quarter"
    ],
    correct: 1,
    explanation: "Article 33 of GDPR mandates that personal data breaches must be notified to the competent supervisory authority without undue delay and, where feasible, not later than 72 hours after having become aware of it."
  },
  {
    id: "q11",
    category: "Networking",
    question: "Which routing protocol uses Dijkstra's Shortest Path First (SPF) algorithm and operates as an interior link-state protocol?",
    options: [
      "RIP (Routing Information Protocol)",
      "BGP (Border Gateway Protocol)",
      "OSPF (Open Shortest Path First)",
      "EGP (Exterior Gateway Protocol)"
    ],
    correct: 2,
    explanation: "OSPF is a link-state routing protocol that maintains a topology database and uses Dijkstra's SPF algorithm to calculate loop-free shortest paths."
  },
  {
    id: "q12",
    category: "Security & OWASP",
    question: "What type of attack involves an adversary injecting malicious JavaScript into a web forum that later executes in unsuspecting users' browsers?",
    options: [
      "Stored Cross-Site Scripting (Stored XSS)",
      "Reflected XSS",
      "SQL Injection",
      "Server-Side Request Forgery (SSRF)"
    ],
    correct: 0,
    explanation: "Stored (Persistent) XSS occurs when malicious script is permanently stored in the server database (e.g. comments/profiles) and served to all future visitors."
  }
];

window.ExamQuestionBank = ExamQuestionBank;
