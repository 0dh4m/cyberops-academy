# 🗄️ CyberOps Academy Database Architecture & Deployment Guide

This directory contains the SQL database schema and seed data for the **CyberOps Academy Platform**.

- **File**: [`schema.sql`](schema.sql)
- **Engine**: Fully compatible with PostgreSQL 14+, Supabase, Neon, AWS RDS, GCP Cloud SQL, or MySQL 8+ / MariaDB.

---

## 🏗️ Relational Schema Overview

The database is structured into 12 normalized domains:

| # | Domain Table | Description |
|---|---|---|
| **1** | `users` & `student_profiles` | User identity, OAuth (Google, GitHub, Discord), roles, Student IDs (`FEDE-2026-XXXX`), XP, ranks, and streaks |
| **2** | `curriculum_phases` & `modules` | 19 curriculum modules, syllabus, ECTS-style credits, and hours |
| **3** | `user_module_progress` | Module validation status, progress percentage, and personal student notes |
| **4** | `tutorials` & `user_tutorial_progress` | 12 Video Masterclasses, watch duration, ELIF5 text, and quiz completion |
| **5** | `ctf_challenges` & `ctf_submissions` | 8 multi-category CTF challenges with SHA-256 flag validation and 3-tier hints |
| **6** | `exam_questions` & `exam_sessions` | 12-question bank behind the 10-question timed practice simulator, scoring (/20), and pass status |
| **7** | `certificates` | Practice completion certificates with a local verification hash and QR payload |
| **8** | `wargame_scenarios` & `wargame_runs` | SOC Incident Response crisis runs (integrity, exfiltration loss, outcome) |
| **9** | `badges` & `user_badges` | 13 collectible gamification badges with XP rewards |
| **10** | `user_first_day_quests` | 4-step quick-start onboarding mission tracking for beginners |
| **11** | `user_diagnostics` | "Where Do I Start?" 60-second orientation test submissions and career recommendations |
| **12** | `glossary_terms` & `audit_logs` | Comprehensive cyber acronyms lexicon and immutable security telemetry audit trail |

---

## 🚀 How to Import and Run

### Option A: phpMyAdmin (MySQL / MariaDB on localhost / XAMPP / Laragon)
1. Open **phpMyAdmin** in your browser (`http://localhost/phpmyadmin`).
2. Select or create your database (e.g. `cyberops`).
3. Click on the **Import** tab.
4. Choose [`schema.sql`](file:///c:/Users/adamc/OneDrive/Desktop/AstronBot/cybersec_platform/database/schema.sql) (or copy-paste it directly into the **SQL** tab).
5. Click **Go / Exécuter**. All 12 tables, indexes, views, and seed data will import cleanly with 0 errors.

### Option B: Supabase or Neon (Cloud PostgreSQL)
1. Open your Supabase Dashboard or Neon Console.
2. Navigate to the **SQL Editor** tab.
3. Paste the contents of [`schema_postgres.sql`](file:///c:/Users/adamc/OneDrive/Desktop/AstronBot/cybersec_platform/database/schema_postgres.sql) and click **RUN**.

### Option C: Local PostgreSQL (CLI / psql)
```bash
# Create the database
createdb cyberops_academy

# Import the Postgres schema
psql -U postgres -d cyberops_academy -f database/schema_postgres.sql
```

### Option D: Docker (Instant Local PostgreSQL Container)
```bash
docker run --name cyberops-postgres \
  -e POSTGRES_PASSWORD=SecOpsPassword2026 \
  -e POSTGRES_DB=cyberops_academy \
  -p 5432:5432 -d postgres:16-alpine

# Import schema into container
docker exec -i cyberops-postgres psql -U postgres -d cyberops_academy < database/schema_postgres.sql
```

---

## 📊 Useful Pre-Built Views

### Leaderboard View (`v_student_leaderboard`)
To query the top students sorted by XP:
```sql
SELECT rank_level, rank_title, full_name, current_xp, completed_modules, solved_ctf_challenges, total_badges
FROM v_student_leaderboard
LIMIT 10;
```
