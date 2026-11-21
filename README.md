# 🛡️ CYBEROPS ACADEMY — Interactive Cybersecurity & Network Defense Labs

<div align="center">

[![Author](https://img.shields.io/badge/Author-0dh4m-00E5FF?style=for-the-badge&logo=github&logoColor=white)](https://github.com/0dh4m)
[![Degree](https://img.shields.io/badge/Platform-Cybersecurity%20%26%20Network%20Labs-0284c7?style=for-the-badge)](https://github.com/0dh4m/cyberops-academy)
[![Backend](https://img.shields.io/badge/Stack-PHP%208%20%7C%20PostgreSQL%20%7C%20AI-FF0080?style=for-the-badge)](https://github.com/0dh4m/cyberops-academy)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)](https://github.com/0dh4m/cyberops-academy)

</div>


### Cybersecurity & Network Defense Labs • Interactive Simulation Platform

An enterprise-grade, interactive learning and operational training platform specifically engineered for students and professionals enrolled in the Cybersecurity & Network Defense Operations. Fully equipped with multi-provider AI integration, live in-browser security playgrounds, gamification, and zero-dependency production architecture.

---

## 📂 Project Architecture & Directory Layout / Structure du Projet

```text
cybersec_platform/
├── index.html                   # Core single-page web shell & command dashboard
├── vercel.json                  # Production configuration for Vercel deployment & security headers
├── netlify.toml                 # Production configuration for Netlify deployment
├── _headers                     # Cloudflare Pages security & caching headers
├── package.json                 # Node manifest for local development & cloud runners
├── .gitignore                   # Git exclusion rules
├── launch_portal.bat            # One-click Windows desktop launcher
├── README.md                    # Bilingual operational & hosting guide
│
├── assets/                      # Static web assets
│   ├── css/                     # Modular design system (15 files)
│   │   ├── styles.css           # Master CSS manifest importing all modules
│   │   ├── variables.css        # Colors, fonts, neon glows & design tokens
│   │   ├── base.css             # Resets, buttons, inputs, toasts & utilities
│   │   ├── navbar.css           # Command header and portal view tab navigation
│   │   ├── hero.css             # Gamification telemetry, rank badges & Pomodoro
│   │   ├── modules.css          # 19-module cards, filters & deep 6-tab modal dossier
│   │   ├── labs.css             # 6 interactive cyber playgrounds layout & visualizers
│   │   ├── exam.css             # FEDE timed exam simulator & achievement certificate
│   │   ├── flashcards.css       # 3D animated flip cards & Spaced Repetition System
│   │   ├── scanner.css          # AI Code & Log SAST / CVE vulnerability scanner UI
│   │   ├── terminal.css         # Hacker bash/powershell cyber shell emulator
│   │   ├── modals.css           # AI settings modal & system dialogs
│   │   ├── ctf.css              # CTF challenges arena, flag inputs & decoder tools
│   │   ├── mitre.css            # MITRE ATT&CK Matrix Navigator & technique dossiers
│   │   └── wargame.css          # Live SOC incident response crisis wargame & cockpit
│   │
│   ├── js/                      # Clean modular JavaScript architecture (26 files)
│   │   ├── core/
│   │   │   ├── i18n.js          # Bilingual internationalization engine (EN / FR)
│   │   │   ├── audio.js         # Web Audio API sound synthesizer
│   │   │   ├── state.js         # XP telemetry, ranks & localStorage sync
│   │   │   └── utils.js         # Clipboard copy, formatting & toast notifications
│   │   ├── data/
│   │   │   ├── modules_data.js  # 19 official curriculum modules database
│   │   │   ├── exam_data.js     # Bank of FEDE European Bachelor exam questions
│   │   │   ├── flashcards_data.js # Curated cybersecurity study decks
│   │   │   ├── ctf_data.js      # 8 real-world CTF challenges with SHA-256 hashes
│   │   │   ├── mitre_data.js    # 13 tactics, 26 techniques, APTs & SIEM rules
│   │   │   └── wargame_data.js  # 3 multi-phase live enterprise crisis scenarios
│   │   ├── labs/
│   │   │   ├── crypto_lab.js    # AES-256-GCM, SHA-256, Caesar cipher
│   │   │   ├── subnet_lab.js    # Visual CIDR & 32-bit binary bitmask calculator
│   │   │   ├── sqli_lab.js      # SQL injection bypass vs prepared statements
│   │   │   ├── scanner_lab.js   # AI Code & Log SAST / CVE vulnerability scanner
│   │   │   ├── packet_lab.js    # TCP 3-way handshake & port scanner visualizer
│   │   │   ├── password_lab.js  # Password entropy, GPU crack time & breach detector
│   │   │   └── playgrounds_hub.js # Labs hub coordinator & view switcher
│   │   ├── components/
│   │   │   ├── module_viewer.js # Curriculum cards rendering & modal dossier
│   │   │   ├── exam_engine.js   # Timed exam runner & certificate generator
│   │   │   ├── flashcards_engine.js # 3D Flashcards runner & SRS scoring
│   │   │   ├── ctf_engine.js    # CTF validator, decoder toolbar & hints
│   │   │   ├── mitre_navigator.js # Interactive matrix navigator & dossier inspector
│   │   │   ├── wargame_engine.js # Live SOC crisis simulator, timer & post-mortem
│   │   │   ├── terminal.js      # Cyber command-line shell emulator
│   │   │   └── ai_service.js    # Multi-provider AI client (Gemini, Groq, OpenAI, etc.)
│   │   └── app.js               # Main application orchestrator & view router
│   │
│   └── icons/
│       └── shield.svg           # High-resolution vector security logo & favicon
│
├── deploy/                      # Enterprise container & server deployment
│   ├── Dockerfile               # Ultra-lightweight Alpine Nginx production image (<25MB)
│   ├── docker-compose.yml       # Instant one-command stack (`docker compose up -d`)
│   └── nginx.conf               # Production Nginx reverse-proxy config with gzip & security headers
│
└── .github/
    └── workflows/
        └── deploy.yml           # Automated GitHub Pages CI/CD workflow
```

---

## 🌐 Production Hosting Guide / Guide de Déploiement & Hébergement

This platform is a modern, client-side, zero-dependency web application. It can be hosted on **any** web server or cloud provider in seconds.

### 1. 🚀 Vercel (Recommended for Instant Global CDN)
- **Option A (GitHub Integration):**
  1. Push this folder to a GitHub repository.
  2. Log into [vercel.com](https://vercel.com) and click **"Add New Project"**.
  3. Import the repository. The pre-configured `vercel.json` will automatically set up caching, clean URLs, and security headers. Click **Deploy**.
- **Option B (Vercel CLI):**
  ```bash
  npm i -g vercel
  cd cybersec_platform
  vercel --prod
  ```

---

### 2. ⚡ Netlify
- **Option A (Drag & Drop):**
  1. Log into [netlify.com](https://app.netlify.com).
  2. Drag and drop the `cybersec_platform` folder directly into the Netlify "Sites" dropzone.
  3. Your site is live immediately with HTTPS!
- **Option B (Git Repository):**
  1. Connect your Git repository. The pre-configured `netlify.toml` automatically handles headers and root directory serving.

---

### 3. 🐙 GitHub Pages (Free Automatic CI/CD)
The project includes a ready-to-use GitHub Actions workflow in `.github/workflows/deploy.yml`:
1. Push this project to a GitHub repository (`main` branch).
2. Go to **Settings** > **Pages** in your GitHub repository.
3. Under **Build and deployment** > **Source**, choose **GitHub Actions**.
4. The workflow will build and publish your site automatically at `https://<your-username>.github.io/<repo-name>/`.

---

### 4. ☁️ Cloudflare Pages
1. Log in to the Cloudflare Dashboard and select **Workers & Pages** > **Create application** > **Pages**.
2. Connect your Git repository.
3. Set **Build command** to empty (none needed) and **Build output directory** to `/`.
4. Click **Save and Deploy**. Caching rules and headers are automatically applied from `_headers`.

---

### 5. 🐳 Docker & Docker Compose (VPS, Cloud Server, CapRover, Coolify)
To run the platform inside a production-hardened, lightweight Alpine Nginx container:
```bash
# Navigate to the project root
cd cybersec_platform

# Start container with Docker Compose (mapped to port 8080)
docker compose -f deploy/docker-compose.yml up -d

# Verify container status
docker ps
```
The platform is accessible at `http://your-server-ip:8080`.

---

### 6. 🖥️ Classic VPS / Nginx / Apache / cPanel / Shared Hosting
- **Nginx VPS:**
  1. Copy the contents of `cybersec_platform` to `/var/www/cyberops/`.
  2. Copy `deploy/nginx.conf` to `/etc/nginx/sites-available/cyberops.conf`.
  3. Enable the site and restart Nginx:
     ```bash
     ln -s /etc/nginx/sites-available/cyberops.conf /etc/nginx/sites-enabled/
     nginx -t && systemctl reload nginx
     ```
- **cPanel / Apache / Shared Hosting:**
  1. Upload all files into your `public_html` directory via FTP or cPanel File Manager.
  2. Open your domain in any browser.

---

### 7. 💻 Local Execution & Development (Hors-Ligne / Local)
- **Direct Launch (No Node.js needed):**
  - Double-click `launch_portal.bat` or open `index.html` directly in your browser.
- **Node.js Local Server:**
  ```bash
  npm start
  # Opens at http://localhost:3000
  ```

---

## 🌟 Core Architecture & Features

### 1. 📚 Complete 19-Module Academic Curriculum
Structured across 5 pedagogical phases:
- **Phase 1: Foundations & Systems** (Applied Mathematics & Algorithmic Optimization, Relational SQL Databases, Python Programming for Networks, Systems & Network Administration).
- **Phase 2: Infrastructure Hardening & Defense** (Operating System Hardening, Network Security & Segmentation, Identity & Access Management - IAM, Cryptography & Data Protection).
- **Phase 3: Application Security & SOC Operations** (Web Application Security - OWASP, Incident Response & Crisis Management, Cloud & Big Data Security).
- **Phase 4: Governance, Threat Intel & Projects** (ISO/IEC 27001 Standards & Risk Assessment, Cyber Threat Intelligence, Agile IT Project Management, IoT & Big Data Capstone Project).
- **Phase 5: FEDE Core & Graduation (PFE)** (The European Project, Intercultural Management & HR in Europe, Technical English for Cybersecurity, End-of-Studies Internship & Defense).

---

### 2. ⚡ Deep Full-Screen Module Dossiers
Clicking on any module opens an extensive 6-tab deep inspection dossier:
- **📖 Syllabus & Content:** In-depth executive overview, key educational competencies, and chapter-by-chapter breakdowns.
- **⚡ Commands & Cheat Sheet:** Production-ready Linux, Bash, PowerShell, SQL, and Python snippets with **1-Click Copy to Clipboard**.
- **🧪 Hands-on Labs:** Actionable enterprise scenarios and configurations for VirtualBox, VMware, Packet Tracer, and Docker.
- **🎯 Knowledge Check (QCM):** Interactive multiple-choice examination questions with instant grading and comprehensive technical rationale.
- **🏆 Certifications & Notes:** Aligned global certifications (CompTIA, Cisco, AWS, ISO 27001), associated job titles, and a persistent local notes editor.
- **🤖 Aegis AI Virtual Professor:** Dedicated per-module AI assistant with quick prompts for deep concept breakdowns, custom lab generation, and technical interview preparation.

---

### 3. 🧪 Live In-Browser Cyber Playgrounds Hub
- **🔐 Cryptography Lab:** Hardware-accelerated Web Crypto API execution: real-time SHA-256 / SHA-512 hashing, authentic AES-256-GCM symmetric encryption with PBKDF2 key derivation, Base64 transport encoding, and an interactive Caesar cipher shift slider.
- **🌐 CIDR & Subnet Calculator:** Dynamic IPv4 subnetting with visual `/1` to `/32` prefix slider: calculates Network, Subnet Mask, Broadcast, Usable Host Range, and paints a live 32-bit binary stream distinguishing Network Bits from Host Bits.
- **🛡️ WebSec & SQLi Sandbox:** Live authentication bypass simulation: test payloads (`' OR 1=1 --`, `admin' --`), observe real-time query compilation, and toggle **Prepared Statements** to visualize how parameterization neutralizes injection attacks.

---

### 4. 🤖 Multi-Provider AI Integration (Bring Your Own Key)
Click **`⚡ AI Settings`** to configure your preferred Large Language Model provider:
- **Google Gemini** (`gemini-1.5-flash`, `gemini-1.5-pro`, `gemini-2.0-flash`)
- **Groq Cloud** (`llama-3.3-70b-versatile` - Ultra-low latency inference)
- **OpenAI** (`gpt-4o`, `gpt-4o-mini`)
- **OpenRouter** (Unified multi-model endpoint)
- **Local Ollama / Self-Hosted LLMs** (Offline privacy-first AI)
- Includes automated connectivity testing and zero-server local storage security (`localStorage`).

---

### 5. 🎮 SecOps Gamification & Command Line Terminal
- **Dynamic Rank Progression:** Climb from `Level 1: Script Cadet` to `Level 6: Elite SecOps Commander` as you validate modules.
- **Study Telemetry:** Track overall completion percentage, experience points (XP), and active study streaks.
- **Integrated Pomodoro Timer:** 25-minute focus intervals with automated audio feedback via Web Audio API.
- **Interactive Cyber Terminal Shell:** Toggle with `>_` or `Ctrl + \`` to execute commands: `help`, `modules`, `show <id>`, `status`, `scan <ip>`, `motivate`, `whoami`, `tools`, and `ai <prompt>`.

---

## 🔒 Security & Privacy Notice / Confidentialité
- **Zero Server-Side Storage:** All user notes, module completion checkboxes, XP points, and AI API keys are stored strictly inside your browser's private `localStorage`.
- No remote telemetry or analytics tracking. Your API keys are transmitted directly to the chosen AI provider via secure HTTPS requests from your browser.
