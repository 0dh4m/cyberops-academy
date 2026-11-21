/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <adamcherkaoui99@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - Live SOC Incident Response Crisis Wargame Data
 * High-fidelity enterprise cyber crisis simulations based on real-world threat actors and NIST SP 800-61r2.
 * Language: Strictly English and French.
 */
window.WargameScenariosData = [
  {
    id: "scenario-ransomware-outbreak",
    titleEn: "Operation DarkVault: BlackCat / ALPHV Ransomware Infiltration",
    titleFr: "Opération DarkVault : Infiltration Ransomware BlackCat / ALPHV",
    severity: "CRITICAL",
    tactics: ["Initial Access", "Lateral Movement", "Impact"],
    summaryEn: "An unmanaged endpoint executed an obfuscated macro payload. Adversaries gained Domain Admin credentials and are staging PsExec lateral spread to deploy ESXi and Hyper-V encryptors within 10 minutes.",
    summaryFr: "Un poste non géré a exécuté une macro obfusquée. Les attaquants ont obtenu les privilèges Administrateur de Domaine et déploient PsExec pour chiffrer l'infrastructure ESXi sous 10 minutes.",
    timeLimitSeconds: 300,
    initialIntegrity: 85,
    initialDataLoss: 10,
    slaTarget: "5 minutes",
    xpReward: 150,
    logs: [
      { timestamp: "00:01", source: "EDR-AGENT-042", level: "CRIT", text: "Suspicious powershell.exe spawned by EXCEL.EXE with EncodedCommand bypass" },
      { timestamp: "00:45", source: "WIN-DC-01", level: "WARN", text: "Kerberos TGS-REQ received for SPN MSSQLSvc with RC4-HMAC cipher downgrade (Event ID 4769)" },
      { timestamp: "01:12", source: "FIREWALL-CORE", level: "CRIT", text: "Outbound HTTPS beaconing to known Cobalt Strike C2: 185.220.101.5:443 [Tor Exit Node]" },
      { timestamp: "01:50", source: "ESXI-CLUSTER-PROD", level: "CRIT", text: "SSH root login accepted from internal pivot 192.168.10.42. vSphere volume snapshots being unmounted" }
    ],
    phases: [
      {
        phaseId: 1,
        nameEn: "Phase 1: Detection & Initial Triage",
        nameFr: "Phase 1 : Détection & Triage Initial",
        situationEn: "SOC SIEM triggers a Sev-1 alert: A finance workstation (192.168.10.42) executed a PowerShell cradle downloading an ELF/PE loader. Cobalt Strike beacon confirmed. How do you triage?",
        situationFr: "Le SIEM du SOC déclenche une alerte Niv-1 : Un poste comptable (192.168.10.42) a exécuté un script PowerShell téléchargeant un chargeur Cobalt Strike. Quelle est votre action de triage ?",
        options: [
          {
            id: "opt-1a",
            titleEn: "Immediate Network Isolation via EDR API + Memory Dump Capture",
            titleFr: "Isolation Réseau Immédiate via API EDR + Capture Mémoire Vive",
            isBest: true,
            integrityChange: +10,
            dataLossChange: -5,
            feedbackEn: "Exemplary action! Isolating the endpoint stops lateral movement while preserving volatile RAM artifacts for memory analysis.",
            feedbackFr: "Action exemplaire ! Isoler le poste bloque le pivotement latéral tout en préservant la RAM pour l'analyse forensique."
          },
          {
            id: "opt-1b",
            titleEn: "Reboot the workstation immediately to kill malicious processes",
            titleFr: "Redémarrer immédiatement la machine pour tuer les processus malveillants",
            isBest: false,
            integrityChange: -20,
            dataLossChange: +15,
            feedbackEn: "Critical Error! Rebooting destroyed vital RAM forensic artifacts and triggered persistence runkeys upon restart.",
            feedbackFr: "Erreur critique ! Le redémarrage détruit la mémoire vive et déclenche les clés de persistance au démarrage."
          },
          {
            id: "opt-1c",
            titleEn: "Passive packet sniffing on the switch port to observe threat actor actions",
            titleFr: "Capture passive de paquets sur le port du switch pour observer l'attaquant",
            isBest: false,
            integrityChange: -15,
            dataLossChange: +25,
            feedbackEn: "High Risk! While capturing packets, the adversary leveraged PsExec to push ransomware binaries to 14 domain computers.",
            feedbackFr: "Risque élevé ! Pendant l'écoute passive, l'attaquant a utilisé PsExec pour infecter 14 postes du domaine."
          }
        ]
      },
      {
        phaseId: 2,
        nameEn: "Phase 2: Lateral Containment & Active Directory Shielding",
        nameFr: "Phase 2 : Confinement Latéral & Protection Active Directory",
        situationEn: "Active Directory logs reveal that the adversary obtained a Ticket Granting Service (TGS) ticket and attempted DCSync replication (Event ID 4662). How do you contain the identity store?",
        situationFr: "Les journaux Active Directory montrent que l'adversaire tente une réplication DCSync (Event ID 4662). Comment contenez-vous le magasin d'identités ?",
        options: [
          {
            id: "opt-2a",
            titleEn: "Perform two consecutive KRBTGT account password resets & enforce PAWS",
            titleFr: "Effectuer une double réinitialisation du mot de passe KRBTGT & imposer des PAW",
            isBest: true,
            integrityChange: +15,
            dataLossChange: -10,
            feedbackEn: "Excellent SecOps mastery! Double KRBTGT rotation invalidates existing Golden Tickets and stops DCSync privilege reuse.",
            feedbackFr: "Excellente maîtrise SecOps ! La double rotation KRBTGT invalide les tickets Golden Ticket existants."
          },
          {
            id: "opt-2b",
            titleEn: "Disable the entire Active Directory domain service cluster",
            titleFr: "Désactiver l'ensemble du cluster de services Active Directory",
            isBest: false,
            integrityChange: -30,
            dataLossChange: +10,
            feedbackEn: "Uncontrolled Disruption! Shutting down all Domain Controllers brought down emergency healthcare and production services.",
            feedbackFr: "Interruption non maîtrisée ! Couper tous les contrôleurs de domaine paralyse les services de production critiques."
          },
          {
            id: "opt-2c",
            titleEn: "Change only the compromised user's Windows password",
            titleFr: "Changer uniquement le mot de passe Windows de l'utilisateur compromis",
            isBest: false,
            integrityChange: -25,
            dataLossChange: +20,
            feedbackEn: "Ineffective! The attacker already dumped NTDS.dit hashes; simple user password change did not invalidate forged Kerberos tickets.",
            feedbackFr: "Inefficace ! L'attaquant dispose déjà des hashs NTDS.dit ; le simple changement de mot de passe n'invalide pas les tickets Kerberos."
          }
        ]
      },
      {
        phaseId: 3,
        nameEn: "Phase 3: Hypervisor Defense & Immutable Backup Recovery",
        nameFr: "Phase 3 : Défense des Hyperviseurs & Restauration Immuable",
        situationEn: "Adversaries attempted to reach the VMware ESXi cluster management network (VLAN 99) to execute an ELF ransomware payload on virtual storage datastores. What is your eradication decision?",
        situationFr: "L'adversaire tente d'accéder au réseau d'administration VMware ESXi (VLAN 99) pour chiffrer les banques de données virtuelles. Quelle est votre décision d'éradication ?",
        options: [
          {
            id: "opt-3a",
            titleEn: "Sever ESXi management interface, lock down SSH, and verify Air-gapped Immutable WORM Backups",
            titleFr: "Couper l'interface de gestion ESXi, verrouiller SSH et vérifier les sauvegardes WORM immuables",
            isBest: true,
            integrityChange: +10,
            dataLossChange: -15,
            feedbackEn: "Decisive incident commander action! Storage is defended and immutable air-gapped snapshots guarantee rapid zero-ransom restoration.",
            feedbackFr: "Action décisive de commandant d'incident ! Les sauvegardes WORM immuables garantissent une restauration sans rançon."
          },
          {
            id: "opt-3b",
            titleEn: "Negotiate with the ransomware gang via their dark web portal to buy time",
            titleFr: "Négocier avec le gang sur leur portail Dark Web pour gagner du temps",
            isBest: false,
            integrityChange: -25,
            dataLossChange: +30,
            feedbackEn: "Violation of European & French cybersecurity doctrine! Paying or negotiating finances cybercrime and does not stop exfiltration.",
            feedbackFr: "Violation des doctrines de cybersécurité ! Négocier finance le cybercrime et ne garantit en rien la récupération."
          }
        ]
      }
    ]
  },
  {
    id: "scenario-dns-tunneling",
    titleEn: "Operation SilentExfil: Advanced DNS Tunneling & C2 Extraction (APT29)",
    titleFr: "Opération SilentExfil : Tunneling DNS Furtif & Exfiltration C2 (APT29)",
    severity: "HIGH",
    tactics: ["Command and Control", "Exfiltration", "Defense Evasion"],
    summaryEn: "A high-tier nation-state threat actor is exfiltrating research IP via Base32/Base64 encoded subdomains over DNS TXT queries, bypassing traditional web application proxies.",
    summaryFr: "Un groupe étatique exfiltre des brevets industriels via des sous-domaines encodés en Base32/Base64 sur des requêtes DNS TXT, contournant les proxys web traditionnels.",
    timeLimitSeconds: 240,
    initialIntegrity: 90,
    initialDataLoss: 15,
    slaTarget: "4 minutes",
    xpReward: 140,
    logs: [
      { timestamp: "00:10", source: "DNS-RESOLVER-01", level: "WARN", text: "Surge in DNS query entropy detected on domain '*.ns1-sync-cdn.net' (12,400 queries/min)" },
      { timestamp: "00:35", source: "ZEEK-NSM", level: "WARN", text: "Abnormal TXT record payloads averaging 210 bytes with high Shannon entropy (7.84)" },
      { timestamp: "01:05", source: "ENDPOINT-RND-12", level: "CRIT", text: "Process git.exe making non-standard UDP 53 calls to external public DNS 194.26.29.112" },
      { timestamp: "01:40", source: "WAF-APIGW", level: "INFO", text: "HTTP/HTTPS inspection clean. Threat actor evading L7 Layer entirely via DNS protocol abuse" }
    ],
    phases: [
      {
        phaseId: 1,
        nameEn: "Phase 1: Protocol Anomaly Confirmation",
        nameFr: "Phase 1 : Confirmation de l'Anomalie Protocolaire",
        situationEn: "Zeek Network Security Monitor flags thousands of subdomains like 'a8f93e2b.ns1-sync-cdn.net' with 7.84 entropy. How do you confirm DNS Tunneling vs legitimate CDN traffic?",
        situationFr: "Le moniteur Zeek signale des milliers de sous-domaines avec une entropie de 7.84. Comment confirmez-vous le tunneling DNS face à un trafic CDN légitime ?",
        options: [
          {
            id: "opt-dns-1a",
            titleEn: "Inspect query frequency, Shannon entropy, TXT record size, and Authoritative Name Server reputation",
            titleFr: "Analyser la fréquence de requêtes, l'entropie de Shannon, la taille des champs TXT et la réputation du NS",
            isBest: true,
            integrityChange: +10,
            dataLossChange: -5,
            feedbackEn: "Spot on! High entropy combined with anomalous TXT record length and NXDOMAIN ratios definitively proves Iodine/DNSCat tunneling.",
            feedbackFr: "Exactement ! L'entropie élevée associée à la taille anormale des enregistrements TXT confirme formellement le tunneling DNS."
          },
          {
            id: "opt-dns-1b",
            titleEn: "Ignore DNS traffic because UDP port 53 is an allowed core infrastructure service",
            titleFr: "Ignorer le trafic DNS car le port UDP 53 est un service d'infrastructure autorisé",
            isBest: false,
            integrityChange: -25,
            dataLossChange: +35,
            feedbackEn: "Fatal negligence! DNS is one of the most common covert channels used by state actors to bypass perimeter firewalls.",
            feedbackFr: "Négligence fatale ! Le DNS est l'un des canaux cachés les plus exploités pour contourner les pare-feu périmétriques."
          }
        ]
      },
      {
        phaseId: 2,
        nameEn: "Phase 2: DNS Sinkholing & Resolver Hardening",
        nameFr: "Phase 2 : Sinkholing DNS & Durcissement des Résolveurs",
        situationEn: "The exfiltration channel is active. If you just block UDP 53 on the internal resolver, internal DNS resolution might collapse. How do you intercept the channel safely?",
        situationFr: "Le canal d'exfiltration est actif. Bloquer sauvagement le port UDP 53 paralyserait la résolution interne. Comment interceptez-vous le canal en toute sécurité ?",
        options: [
          {
            id: "opt-dns-2a",
            titleEn: "Enforce Response Policy Zones (RPZ) on internal DNS + Sinkhole apex domain to 127.0.0.1 + Block direct outbound UDP/TCP 53 to Internet",
            titleFr: "Appliquer une RPZ sur le DNS interne + Rediriger le domaine vers 127.0.0.1 (Sinkhole) + Bloquer le port 53 sortant direct",
            isBest: true,
            integrityChange: +15,
            dataLossChange: -15,
            feedbackEn: "Brilliant SOC engineering! RPZ sinkholing instantly neuters the exfiltration while blocking direct outbound DNS forces all endpoints through inspection.",
            feedbackFr: "Brillante ingénierie SOC ! La zone RPZ neutralise l'exfiltration et le blocage sortant impose l'inspection obligatoire."
          },
          {
            id: "opt-dns-2b",
            titleEn: "Shut down the primary DNS server cluster to cut off internet access",
            titleFr: "Éteindre le cluster DNS principal pour couper tout accès internet",
            isBest: false,
            integrityChange: -30,
            dataLossChange: +10,
            feedbackEn: "Self-inflicted Denial of Service! Shutting down core DNS broke all domain controllers, email, and ERP databases.",
            feedbackFr: "Déni de service auto-infligé ! Couper le DNS principal bloque tous les contrôleurs de domaine, e-mails et ERP."
          }
        ]
      }
    ]
  },
  {
    id: "scenario-kerberoast-cloud",
    titleEn: "Operation GoldenCrown: Active Directory Kerberoasting & Cloud Pivot",
    titleFr: "Opération GoldenCrown : Kerberoasting Active Directory & Pivot Cloud",
    severity: "CRITICAL",
    tactics: ["Credential Access", "Privilege Escalation", "Lateral Movement"],
    summaryEn: "Attackers requested TGS service tickets for high-privilege service accounts (SPNs) with weak RC4 encryption, cracked the service hash offline, and generated a Golden Ticket to pivot to Azure AD / Entra ID.",
    summaryFr: "Les attaquants ont demandé des tickets TGS pour des comptes de service privilégiés (SPN) en RC4, ont cassé le hash hors-ligne et forgé un Golden Ticket pour pivoter vers Azure AD / Entra ID.",
    timeLimitSeconds: 270,
    initialIntegrity: 80,
    initialDataLoss: 20,
    slaTarget: "4.5 minutes",
    xpReward: 160,
    logs: [
      { timestamp: "00:05", source: "SIEM-SPLUNK", level: "WARN", text: "Mass Event ID 4769: Kerberos ticket requested for SPN 'MSSQLSvc/sql-prod.corp:1433' with Encryption 0x17 (RC4)" },
      { timestamp: "00:40", source: "HONEYPOT-SVC", level: "CRIT", text: "Decoy account svc_backup_prod accessed. Honeytoken triggered alarm" },
      { timestamp: "01:15", source: "ENTRA-ID-AUDIT", level: "CRIT", text: "Unusual sync token from AAD Connect server requesting Directory.ReadWrite.All role" },
      { timestamp: "01:55", source: "KALI-PIVOT", level: "CRIT", text: "Mimikatz lsadump::dcsync command observed on domain controller replicate session" }
    ],
    phases: [
      {
        phaseId: 1,
        nameEn: "Phase 1: Kerberoasting Attack Neutralization",
        nameFr: "Phase 1 : Neutralisation de l'Attaque Kerberoasting",
        situationEn: "SOC alerts confirm that an adversary is harvesting SPNs to crack Kerberos tickets offline. What is the immediate defense-in-depth mitigation?",
        situationFr: "Le SOC confirme la collecte de SPN pour casser des tickets Kerberos hors-ligne. Quelle est la mesure de durcissement immédiate ?",
        options: [
          {
            id: "opt-kerb-1a",
            titleEn: "Migrate service accounts to Group Managed Service Accounts (gMSA) with 128-char passwords & enforce AES256-only Kerberos encryption",
            titleFr: "Migrer les comptes vers des gMSA avec mots de passe de 128 caractères & imposer le chiffrement Kerberos AES256 uniquement",
            isBest: true,
            integrityChange: +15,
            dataLossChange: -10,
            feedbackEn: "Gold standard Active Directory hardening! gMSA automates password rotation with cryptographically unbreakable keys, rendering Kerberoasting impossible.",
            feedbackFr: "Standard d'excellence Active Directory ! Les gMSA automatisent les rotations avec des clés incassables, rendant le Kerberoasting impossible."
          },
          {
            id: "opt-kerb-1b",
            titleEn: "Delete all service accounts immediately from the domain",
            titleFr: "Supprimer immédiatement tous les comptes de service du domaine",
            isBest: false,
            integrityChange: -35,
            dataLossChange: +15,
            feedbackEn: "Catastrophic impact! Deleting service accounts instantly crashed production databases, web servers, and backup routines.",
            feedbackFr: "Impact catastrophique ! Supprimer les comptes de service plante instantanément les bases SQL, serveurs web et sauvegardes."
          }
        ]
      },
      {
        phaseId: 2,
        nameEn: "Phase 2: Hybrid Cloud & Entra ID Tenant Isolation",
        nameFr: "Phase 2 : Isolation Hybride & Tenant Cloud Entra ID",
        situationEn: "The attacker is attempting to pivot from on-premise AD to Entra ID (Azure AD) via the Azure AD Connect synchronization server. How do you protect cloud assets?",
        situationFr: "L'attaquant tente de pivoter de l'AD interne vers Entra ID via le serveur Azure AD Connect. Comment protégez-vous les ressources cloud ?",
        options: [
          {
            id: "opt-kerb-2a",
            titleEn: "Isolate Azure AD Connect sync server, revoke all Cloud Admin refresh tokens, and enforce FIDO2 Phishing-Resistant MFA",
            titleFr: "Isoler le serveur Azure AD Connect, révoquer tous les jetons d'administration cloud et imposer le MFA FIDO2",
            isBest: true,
            integrityChange: +15,
            dataLossChange: -15,
            feedbackEn: "Masterful Incident Response! Revoking refresh tokens and isolating the hybrid sync bridge prevents on-prem blast radius from compromising the cloud tenant.",
            feedbackFr: "Excellente réponse à incident ! Révoquer les jetons et isoler la passerelle empêche la compromission de se propager au cloud."
          },
          {
            id: "opt-kerb-2b",
            titleEn: "Send an email warning to all cloud users to be careful with passwords",
            titleFr: "Envoyer un e-mail d'avertissement aux utilisateurs pour faire attention aux mots de passe",
            isBest: false,
            integrityChange: -20,
            dataLossChange: +25,
            feedbackEn: "Ineffective! Adversaries with forged cloud admin tokens do not need user passwords to access email inboxes and SharePoint data.",
            feedbackFr: "Inefficace ! Un attaquant disposant de jetons d'administration n'a pas besoin des mots de passe des utilisateurs."
          }
        ]
      }
    ]
  }
];
