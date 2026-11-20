/**
 * CyberOps Academy - CTF Challenges Database
 * Realistic hands-on capture the flag puzzles with SHA-256 flag verification
 * and 3-Tier Progressive Hint System (Nudge ➔ Clue ➔ Full Solution Walkthrough).
 */
const CtfChallengesData = [
  {
    id: "ctf-crypto-1",
    category: "Cryptography",
    icon: "🔐",
    difficulty: "Easy",
    points: 100,
    titleEn: "The Roman Messenger's Secret",
    titleFr: "Le Secret du Messager Romain",
    descriptionEn: "We intercepted an encrypted transmission sent by an ancient general with a shift of +7. Decrypt the message to obtain the flag.",
    descriptionFr: "Nous avons intercepté une transmission chiffrée envoyée par un général romain avec un décalage de +7. Déchiffrez le message pour obtenir le drapeau.",
    artifactType: "cipher",
    artifact: "MSHN{jhlzhy_zopma_pz_aypcphs_2026}",
    hints: [
      "Tier 1 (Nudge): This is a classic Caesar substitution cipher where each letter of the alphabet has been shifted forward by 7 positions.",
      "Tier 2 (Clue): Shift each letter backwards by 7 positions (-7 or +19 in mod 26). In our Quick-Decoder or Cryptography Lab, select Caesar with Shift = 19 (or -7).",
      "Tier 3 (Walkthrough): 'M' - 7 = 'F', 'S' - 7 = 'L', 'H' - 7 = 'A', 'N' - 7 = 'G'. The complete decrypted plaintext flag is: FLAG{caesar_shift_is_trivial_2026}"
    ],
    flagHash: "81be1eaaa9c0da01a4bab80d318161486db3eeedb35b058f61df4c2039b1d229"
  },
  {
    id: "ctf-crypto-2",
    category: "Cryptography",
    icon: "🔐",
    difficulty: "Medium",
    points: 150,
    titleEn: "Multi-Layer Enigma",
    titleFr: "L'Énigme Multicouches",
    descriptionEn: "The adversary obfuscated the flag using two distinct layers: first Hexadecimal encoding, then Base64 transport encoding. Peel back the layers!",
    descriptionFr: "L'adversaire a obfusqué le drapeau en utilisant deux couches distinctes : d'abord un encodage Hexadécimal, puis un encodage Base64. Décodez les deux couches !",
    artifactType: "cipher",
    artifact: "NDY0YzQxNDc3YjZjNjE3OTY1NzI2NTY0NWY2NDY1NjM2ZjY0Njk2ZTY3NWY2ZDYxNzM3NDY1NzI3ZA==",
    hints: [
      "Tier 1 (Nudge): Look at the trailing '=='. This signals standard Base64 encoding. Decoding Base64 will reveal the next layer.",
      "Tier 2 (Clue): Paste the artifact into the Quick-Decoder with 'Base64 Decode'. You will get a hex string starting with '464c41477b...'. Then decode Hex to ASCII.",
      "Tier 3 (Walkthrough): Base64 decode yields hex bytes '46 4c 41 47 7b...'. In ASCII, 0x46='F', 0x4c='L', 0x41='A', 0x47='G'. The resulting flag is: FLAG{layered_decoding_master}"
    ],
    flagHash: "9ad72d8be2fb0d2aaf3811c1ad1f7e1ff863c8aca98c0e5ce45293a7adf81c19"
  },
  {
    id: "ctf-crypto-3",
    category: "Cryptography",
    icon: "🔐",
    difficulty: "Hard",
    points: 250,
    titleEn: "Weak RSA Small Public Exponent",
    titleFr: "RSA Faible à Petit Exposant Public",
    descriptionEn: "A misconfigured RSA system used a public exponent e=3 without padding. Because m^3 < N, no modular reduction occurred! Compute the cube root of ciphertext C to recover the plaintext.",
    descriptionFr: "Un système RSA mal configuré a utilisé un exposant e=3 sans bourrage (padding). Comme m^3 < N, aucune réduction modulaire n'a eu lieu ! Calculez la racine cubique de C.",
    artifactType: "math",
    artifact: "Public Exponent: e = 3\nModulus N: 1048576... (2048 bits)\nCiphertext C: 74258908389659024098254098235098230598230498230498230498234\nPlaintext Flag: FLAG{rsa_small_e_cube_root}",
    hints: [
      "Tier 1 (Nudge): In textbook RSA, C = m^e mod N. If the message m is small and e=3, m^3 is smaller than the 2048-bit modulus N.",
      "Tier 2 (Clue): Since m^3 < N, the modulo operation never wrapped around! You can simply take the integer cube root of C directly.",
      "Tier 3 (Walkthrough): The problem statement explicitly demonstrates the plaintext message recovery: FLAG{rsa_small_e_cube_root}"
    ],
    flagHash: "967babed0b3f3fc272962e5215576d8b85bc57fac33dbd01284ef46eb68a9ab8"
  },
  {
    id: "ctf-web-1",
    category: "Web Security",
    icon: "🌐",
    difficulty: "Medium",
    points: 150,
    titleEn: "JWT Algorithm Confusion (None Attack)",
    titleFr: "Confusion d'Algorithme JWT (Attaque None)",
    descriptionEn: "An API server accepts JWT tokens with `alg: \"none\"`, ignoring cryptographic signatures. Inspect the token and extract the administrator flag payload.",
    descriptionFr: "Un serveur d'API vulnérable accepte les jetons JWT avec `alg: \"none\"`, ignorant la signature. Inspectez le jeton et extrayez le drapeau administrateur.",
    artifactType: "jwt",
    artifact: "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoicm9vdCIsImZsYWciOiJGTEFHe2p3dF9hbGdfbm9uZV9hZG1pbl9ieXBhc3N9In0.",
    hints: [
      "Tier 1 (Nudge): A JSON Web Token (JWT) is composed of three parts separated by periods: Header.Payload.Signature.",
      "Tier 2 (Clue): Copy the middle section: 'eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoicm9vdCIsImZsYWciOiJGTEFHe2p3dF9hbGdfbm9uZV9hZG1pbl9ieXBhc3N9In0' and paste it into the Base64 Quick-Decoder.",
      "Tier 3 (Walkthrough): Decoding the payload JSON reveals {\"user\":\"admin\",\"role\":\"root\",\"flag\":\"FLAG{jwt_alg_none_admin_bypass}\"}. The flag is: FLAG{jwt_alg_none_admin_bypass}"
    ],
    flagHash: "97ee69d9b2e55cf8d7c0c579d90e35b3204685e687eb274a4bdcbc7d541260ae"
  },
  {
    id: "ctf-web-2",
    category: "Web Security",
    icon: "🌐",
    difficulty: "Hard",
    points: 250,
    titleEn: "Blind Boolean SQL Injection",
    titleFr: "Injection SQL Booléenne Aveugle",
    descriptionEn: "A login endpoint responds with '200 OK (User Exists)' only when the condition is TRUE. An auditor extracted characters using `SUBSTRING(secret, 1, 1) = 'F'`. Reconstruct the extracted secret.",
    descriptionFr: "Un endpoint répond par '200 OK' seulement quand la condition SQL est VRAIE. Un auditeur a extrait les caractères. Reconstituez le secret extrait.",
    artifactType: "log",
    artifact: "PAYLOAD LOG:\n1. SUBSTRING(flag,1,5)='FLAG{' ➔ 200 OK (TRUE)\n2. SUBSTRING(flag,6,12)='sqli_boolean' ➔ 200 OK (TRUE)\n3. SUBSTRING(flag,18,17)='_blind_extracted}' ➔ 200 OK (TRUE)",
    hints: [
      "Tier 1 (Nudge): Blind SQL injection works by asking True/False questions. The log shows 3 successful substring checks verified by 200 OK responses.",
      "Tier 2 (Clue): Concatenate the 3 verified substring segments in order: positions 1..5, positions 6..17, and positions 18..34.",
      "Tier 3 (Walkthrough): Joining 'FLAG{' + 'sqli_boolean' + '_blind_extracted}' produces the complete flag: FLAG{sqli_boolean_blind_extracted}"
    ],
    flagHash: "41ffcb6aa6182452208c5cee308649415a88dfbec1ce0f7cbd8c6eaf28c1ace7"
  },
  {
    id: "ctf-web-3",
    category: "Web Security",
    icon: "🌐",
    difficulty: "Easy",
    points: 100,
    titleEn: "Insecure Direct Object Reference (IDOR)",
    titleFr: "Référence Directe à un Objet Non Sécurisée (IDOR)",
    descriptionEn: "The user portal loads profile data via `/api/profile?user_id=1054`. What happens when an attacker manipulates the parameter to target `user_id=1` (Super Admin)?",
    descriptionFr: "Le portail charge les profils via `/api/profile?user_id=1054`. Que se passe-t-il si un attaquant modifie le paramètre pour cibler `user_id=1` (Super Admin) ?",
    artifactType: "http",
    artifact: "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  \"user_id\": 1,\n  \"username\": \"administrator\",\n  \"role\": \"global_ciso\",\n  \"secret_token\": \"FLAG{idor_unauthorized_profile_access}\"\n}",
    hints: [
      "Tier 1 (Nudge): Look closely at the raw HTTP JSON response body shown in the challenge card.",
      "Tier 2 (Clue): The JSON field 'secret_token' holds the sensitive credentials leaked by the missing authorization check.",
      "Tier 3 (Walkthrough): The flag is the exact string inside 'secret_token': FLAG{idor_unauthorized_profile_access}"
    ],
    flagHash: "dd5deb76425a19d8978ecc873112424c8bfa18ad678db7e4c2862061925efb07"
  },
  {
    id: "ctf-net-1",
    category: "Forensics",
    icon: "🔍",
    difficulty: "Medium",
    points: 150,
    titleEn: "Cleartext Telnet Packet Capture",
    titleFr: "Capture de Paquets Telnet en Clair",
    descriptionEn: "We captured unencrypted Telnet (Port 23) network traffic during an internal breach. Analyze the packet stream to uncover the transmitted password.",
    descriptionFr: "Nous avons capturé du trafic Telnet (Port 23) non chiffré durant une intrusion. Analysez le flux de paquets pour découvrir le mot de passe transmis.",
    artifactType: "pcap",
    artifact: "Frame 42: TCP 192.168.1.45:51234 ➔ 192.168.1.1:23 [PSH, ACK] Data: 'login: admin\\r\\n'\nFrame 44: TCP 192.168.1.1:23 ➔ 192.168.1.45:51234 [ACK] Data: 'Password: '\nFrame 46: TCP 192.168.1.45:51234 ➔ 192.168.1.1:23 [PSH, ACK] Data: 'FLAG{pcap_telnet_cleartext_creds}\\r\\n'\nFrame 48: TCP 192.168.1.1:23 ➔ 192.168.1.45:51234 [PSH, ACK] Data: 'Welcome to Core-Router-01# '",
    hints: [
      "Tier 1 (Nudge): Telnet is an ancient protocol that does not encrypt traffic. Everything transmitted is plain ASCII text.",
      "Tier 2 (Clue): Read Frame 46. It shows the client sending data in response to the 'Password: ' prompt in Frame 44.",
      "Tier 3 (Walkthrough): Frame 46 explicitly contains: FLAG{pcap_telnet_cleartext_creds}"
    ],
    flagHash: "e9ee00ff51044797aba0da533bc55ec906b7423e83bc2ee8f55de4ec481d61b0"
  },
  {
    id: "ctf-sys-1",
    category: "Linux & Systems",
    icon: "🐧",
    difficulty: "Hard",
    points: 200,
    titleEn: "SUID Privilege Escalation Escapade",
    titleFr: "Escalade de Privilèges via Binaire SUID",
    descriptionEn: "During a host security audit, we ran `find / -perm -4000 2>/dev/null` and found a custom binary executing with root permissions that dropped a root shell.",
    descriptionFr: "Durant un audit, la commande `find / -perm -4000 2>/dev/null` a révélé un binaire personnalisé avec privilèges root qui a ouvert un shell root.",
    artifactType: "log",
    artifact: "devops@ubuntu:~$ ls -la /usr/local/bin/backup_agent\n-rwsr-xr-x 1 root root 16428 Oct 26 04:00 /usr/local/bin/backup_agent\n\ndevops@ubuntu:~$ /usr/local/bin/backup_agent --shell\nroot@ubuntu:~# cat /root/root.txt\nFLAG{suid_privilege_escalation_root}",
    hints: [
      "Tier 1 (Nudge): SUID binaries run with the privileges of their owner (root). The log shows an operator running the backup_agent binary.",
      "Tier 2 (Clue): Notice the command `cat /root/root.txt` executed in the spawned root shell (# prompt).",
      "Tier 3 (Walkthrough): The flag stored inside /root/root.txt is: FLAG{suid_privilege_escalation_root}"
    ],
    flagHash: "ca93c253c13c1547f004ed56b7027184e7ef36a5068f43d6000aeb1c2faa0faf"
  }
];

window.CtfChallengesData = CtfChallengesData;
