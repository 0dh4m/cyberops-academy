# 🛡️ CyberOps Academy — Cybersecurity & Network Defense Study Platform

<div align="center">

[![Author](https://img.shields.io/badge/Author-0dh4m-00E5FF?style=for-the-badge&logo=github&logoColor=white)](https://github.com/0dh4m)
[![Stack](https://img.shields.io/badge/Stack-PHP%208%20%7C%20Vanilla%20JS%20%7C%20MySQL-0284c7?style=for-the-badge)](https://github.com/0dh4m/cyberops-academy)
[![Modules](https://img.shields.io/badge/Curriculum-19%20Modules-FF0080?style=for-the-badge)](https://github.com/0dh4m/cyberops-academy)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)](LICENSE)

**An interactive cybersecurity study platform built around the MIAGE / FEDE cybersecurity curriculum.**
19 academic modules, in-browser labs, a CTF arena, the MITRE ATT&CK matrix, SOC crisis wargames, and multi-provider AI assistance.

[Features](#-features) • [Quick Start](#-quick-start) • [Project Structure](#-project-structure) • [Database](#-optional-php--mysql-backend) • [License](#-license)

</div>

> **Disclaimer:** this is an independent educational project. It is **not affiliated with, endorsed by, or accredited by FEDE or Groupe MIAGE**, and the exam simulator is a practice tool — not an official certification exam.

---

## ✨ Features

- 📚 **19-module curriculum** organised in 5 pedagogical phases, with syllabus, cheat sheets, QCM and per-module notes.
- 🧪 **6 in-browser labs**: cryptography (Web Crypto AES-GCM / SHA-256), CIDR & subnetting, SQL injection sandbox, packet/handshake visualiser, password entropy, AI code & log scanner.
- 🚩 **8 CTF challenges** with SHA-256 flag validation, hints and decoder tools.
- 🦅 **MITRE ATT&CK navigator** with tactics, techniques, APT profiles and SIEM detection notes.
- 🚨 **SOC crisis wargames** with multi-phase incident response scenarios.
- 🧠 **Spaced-repetition flashcards**, 12 video-style tutorials and interactive career roadmaps.
- 🏛️ **FEDE-style practice exam**: 10 randomized questions from a 12-question bank, 15-minute timer, printable practice certificate.
- 🤖 **Multi-provider AI mentor** (Gemini, Groq, OpenAI, OpenRouter, local Ollama) using your own API key.
- 🌍 **Bilingual EN / FR** interface with local progress stored in `localStorage`.

---

## 🚀 Quick Start

### Static mode (no backend)

```bash
git clone https://github.com/0dh4m/cyberops-academy.git
cd cyberops-academy
npm start          # npx serve -l 3000 .
# or simply open index.html in a browser
```

Open `http://localhost:3000`.

### Optional PHP / MySQL backend

The student portal can persist accounts through the small PHP API in `api/`:

1. Create a MySQL/MariaDB database and import `database/schema_mysql.sql` (or use `schema_postgres.sql` with PostgreSQL).
2. Point your web server at the repository root and enable PHP 8+.
3. Configure the connection with environment variables (defaults are local development values):

```text
CYBEROPS_DB_HOST=localhost
CYBEROPS_DB_NAME=cyberops
CYBEROPS_DB_USER=root
CYBEROPS_DB_PASS=
```

If the API is unreachable, the front end keeps working and falls back to local browser storage.

---

## 📂 Project Structure

```text
cyberops-academy/
├── index.html                 # Landing page + student workspace shell
├── assets/
│   ├── css/                   # 24 stylesheets (design tokens, labs, exam, CTF…)
│   ├── js/
│   │   ├── app.js             # Application orchestrator & view router
│   │   ├── core/              # i18n, state, audio, utils, voice mentor
│   │   ├── data/              # Curriculum, exam, CTF, MITRE, tutorials, careers
│   │   ├── labs/              # 6 interactive labs + hub
│   │   └── components/        # Module viewer, exam, CTF, wargame, AI service…
│   └── icons/shield.svg
├── api/                       # Optional PHP 8 auth & database gateway
├── database/                  # MySQL / PostgreSQL schemas + guide
├── deploy/                    # Dockerfile, docker-compose, nginx config
├── scripts/                   # Windows launcher + verification script
├── .github/workflows/         # GitHub Pages deployment workflow
├── vercel.json / netlify.toml / _headers
├── package.json
└── README.md
```

---

## 🧪 Local Verification

```bash
npm test        # node scripts/verify_all.js
```

The verifier checks that referenced assets and data files exist and that the JavaScript loads cleanly.

---

## 🌐 Deployment

Pre-configured for:

- **GitHub Pages** via `.github/workflows/deploy.yml`
- **Vercel** via `vercel.json`
- **Netlify** via `netlify.toml`
- **Cloudflare Pages** via `_headers`
- **Docker / Nginx** via `deploy/docker-compose.yml`

See the deployment comments in each config file for the exact build settings (static output, no build step).

---

## 👤 Author

**Adham Cherkaoui Eddeqaqi (0dh4m)**
- 🌐 Portfolio: [0dh4m.github.io](https://0dh4m.github.io/)
- 🐙 GitHub: [@0dh4m](https://github.com/0dh4m)
- ✉️ Email: 0dh4mm@gmail.com

---

## 📄 License

Proprietary and confidential — see [LICENSE](LICENSE). Unauthorized copying or distribution is prohibited.

*Copyright © 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.*
