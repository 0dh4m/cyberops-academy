-- =============================================================================
-- CYBEROPS ACADEMY - ENTERPRISE RELATIONAL DATABASE SCHEMA (POSTGRESQL / SUPABASE)
-- Target: PostgreSQL 14+, Supabase, Neon, AWS RDS & GCP Cloud SQL
-- Version: 3.0.0
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    full_name VARCHAR(150) NOT NULL,
    avatar_url VARCHAR(500),
    role VARCHAR(30) DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'mentor', 'admin')),
    oauth_provider VARCHAR(50) DEFAULT 'local' CHECK (oauth_provider IN ('local', 'google', 'github', 'discord')),
    oauth_provider_id VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    is_email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_oauth ON users(oauth_provider, oauth_provider_id);

CREATE TABLE IF NOT EXISTS student_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    student_id VARCHAR(50) UNIQUE NOT NULL,
    specialization VARCHAR(150) DEFAULT 'European Bachelor in Cybersecurity & Networks',
    preferred_lang VARCHAR(5) DEFAULT 'en' CHECK (preferred_lang IN ('en', 'fr')),
    active_career_path VARCHAR(50) DEFAULT 'soc_analyst' CHECK (active_career_path IN ('soc_analyst', 'pentester', 'devsecops', 'grc_auditor')),
    progression_mode VARCHAR(20) DEFAULT 'progressive' CHECK (progression_mode IN ('progressive', 'free_access')),
    current_xp INTEGER DEFAULT 0 CHECK (current_xp >= 0),
    rank_level INTEGER DEFAULT 1 CHECK (rank_level BETWEEN 1 AND 6),
    rank_title VARCHAR(50) DEFAULT 'Script Cadet',
    study_streak_days INTEGER DEFAULT 1 CHECK (study_streak_days >= 0),
    last_active_date DATE DEFAULT CURRENT_DATE,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_student_xp ON student_profiles(current_xp DESC);

CREATE TABLE IF NOT EXISTS curriculum_phases (
    phase_number INTEGER PRIMARY KEY,
    name_en VARCHAR(100) NOT NULL,
    name_fr VARCHAR(100) NOT NULL,
    required_xp INTEGER DEFAULT 0,
    sort_order INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS modules (
    id VARCHAR(50) PRIMARY KEY,
    phase_number INTEGER REFERENCES curriculum_phases(phase_number) ON DELETE RESTRICT,
    module_number INTEGER NOT NULL,
    code VARCHAR(50) NOT NULL,
    title_en VARCHAR(200) NOT NULL,
    title_fr VARCHAR(200) NOT NULL,
    duration_hours INTEGER DEFAULT 20,
    ects_credits NUMERIC(3, 1) DEFAULT 3.0,
    badge_label VARCHAR(100),
    summary_en TEXT,
    summary_fr TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_modules_phase ON modules(phase_number);

CREATE TABLE IF NOT EXISTS user_module_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    module_id VARCHAR(50) REFERENCES modules(id) ON DELETE CASCADE,
    is_completed BOOLEAN DEFAULT FALSE,
    score_percentage INTEGER DEFAULT 0 CHECK (score_percentage BETWEEN 0 AND 100),
    notes_markdown TEXT,
    completed_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, module_id)
);

CREATE INDEX idx_module_progress_user ON user_module_progress(user_id, is_completed);

CREATE TABLE IF NOT EXISTS tutorials (
    id VARCHAR(50) PRIMARY KEY,
    track VARCHAR(50) NOT NULL,
    difficulty_level VARCHAR(20) DEFAULT 'beginner' CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    duration_label VARCHAR(20) NOT NULL,
    duration_seconds INTEGER NOT NULL,
    video_url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    action_target VARCHAR(100),
    title_en VARCHAR(200) NOT NULL,
    title_fr VARCHAR(200) NOT NULL,
    tagline_en TEXT,
    tagline_fr TEXT,
    elif5_en TEXT,
    elif5_fr TEXT,
    xp_reward INTEGER DEFAULT 50,
    sort_order INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS user_tutorial_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tutorial_id VARCHAR(50) REFERENCES tutorials(id) ON DELETE CASCADE,
    is_completed BOOLEAN DEFAULT FALSE,
    quiz_passed BOOLEAN DEFAULT FALSE,
    watch_seconds INTEGER DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, tutorial_id)
);

CREATE INDEX idx_tutorial_progress_user ON user_tutorial_progress(user_id, is_completed);

CREATE TABLE IF NOT EXISTS ctf_challenges (
    id VARCHAR(50) PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    difficulty VARCHAR(20) DEFAULT 'Easy' CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    points INTEGER NOT NULL DEFAULT 100,
    icon VARCHAR(10) DEFAULT '🚩',
    title_en VARCHAR(200) NOT NULL,
    title_fr VARCHAR(200) NOT NULL,
    description_en TEXT NOT NULL,
    description_fr TEXT NOT NULL,
    artifact_type VARCHAR(50),
    artifact_content TEXT,
    flag_sha256 VARCHAR(64) NOT NULL,
    hint_nudge_en TEXT,
    hint_nudge_fr TEXT,
    hint_clue_en TEXT,
    hint_clue_fr TEXT,
    hint_walkthrough_en TEXT,
    hint_walkthrough_fr TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS ctf_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    challenge_id VARCHAR(50) REFERENCES ctf_challenges(id) ON DELETE CASCADE,
    submitted_flag VARCHAR(255) NOT NULL,
    is_correct BOOLEAN NOT NULL,
    hints_viewed INTEGER DEFAULT 0 CHECK (hints_viewed BETWEEN 0 AND 3),
    points_awarded INTEGER DEFAULT 0,
    ip_address VARCHAR(45),
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ctf_submissions_user ON ctf_submissions(user_id, is_correct);

CREATE TABLE IF NOT EXISTS exam_questions (
    id VARCHAR(50) PRIMARY KEY,
    module_id VARCHAR(50) REFERENCES modules(id) ON DELETE SET NULL,
    category VARCHAR(50) NOT NULL,
    question_en TEXT NOT NULL,
    question_fr TEXT NOT NULL,
    options_en JSONB NOT NULL,
    options_fr JSONB NOT NULL,
    correct_option_index INTEGER NOT NULL CHECK (correct_option_index BETWEEN 0 AND 3),
    explanation_en TEXT,
    explanation_fr TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS exam_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    total_questions INTEGER DEFAULT 10,
    correct_answers INTEGER DEFAULT 0,
    score_out_of_20 NUMERIC(4, 2) NOT NULL,
    percentage INTEGER NOT NULL,
    is_passed BOOLEAN NOT NULL,
    time_taken_seconds INTEGER NOT NULL,
    answers_summary JSONB,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_exam_sessions_user ON exam_sessions(user_id, is_passed);

CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    exam_session_id UUID UNIQUE REFERENCES exam_sessions(id) ON DELETE RESTRICT,
    certificate_number VARCHAR(50) UNIQUE NOT NULL,
    verification_hash VARCHAR(64) UNIQUE NOT NULL,
    recipient_name VARCHAR(150) NOT NULL,
    final_score_out_of_20 NUMERIC(4, 2) NOT NULL,
    honors_mention VARCHAR(50),
    issued_date DATE DEFAULT CURRENT_DATE,
    qr_code_data TEXT,
    pdf_url VARCHAR(500),
    is_revoked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_cert_verification ON certificates(verification_hash);

CREATE TABLE IF NOT EXISTS wargame_scenarios (
    id VARCHAR(50) PRIMARY KEY,
    title_en VARCHAR(200) NOT NULL,
    title_fr VARCHAR(200) NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    duration_seconds INTEGER DEFAULT 300,
    target_environment VARCHAR(100),
    tactics_tested JSONB,
    phases_data JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS wargame_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    scenario_id VARCHAR(50) REFERENCES wargame_scenarios(id) ON DELETE CASCADE,
    outcome VARCHAR(20) CHECK (outcome IN ('won', 'breached', 'timeout')),
    final_integrity INTEGER CHECK (final_integrity BETWEEN 0 AND 100),
    final_loss INTEGER CHECK (final_loss BETWEEN 0 AND 100),
    xp_earned INTEGER DEFAULT 0,
    decisions_taken JSONB,
    duration_seconds INTEGER NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL,
    finished_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_wargame_runs_user ON wargame_runs(user_id, outcome);

CREATE TABLE IF NOT EXISTS badges (
    id VARCHAR(50) PRIMARY KEY,
    icon VARCHAR(10) NOT NULL,
    color_hex VARCHAR(10) DEFAULT '#00f0ff',
    xp_reward INTEGER DEFAULT 50,
    category VARCHAR(50) DEFAULT 'milestone',
    title_en VARCHAR(150) NOT NULL,
    title_fr VARCHAR(150) NOT NULL,
    desc_en TEXT NOT NULL,
    desc_fr TEXT NOT NULL,
    sort_order INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS user_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    badge_id VARCHAR(50) REFERENCES badges(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, badge_id)
);

CREATE INDEX idx_user_badges ON user_badges(user_id);

CREATE TABLE IF NOT EXISTS user_first_day_quests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    task_id VARCHAR(50) NOT NULL,
    is_completed BOOLEAN DEFAULT TRUE,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, task_id)
);

CREATE TABLE IF NOT EXISTS user_diagnostics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    experience_level VARCHAR(50) NOT NULL,
    primary_interest VARCHAR(50) NOT NULL,
    weekly_hours VARCHAR(50) NOT NULL,
    recommended_path VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS glossary_terms (
    id VARCHAR(50) PRIMARY KEY,
    term VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    icon VARCHAR(10) DEFAULT '📖',
    full_name_en VARCHAR(200) NOT NULL,
    full_name_fr VARCHAR(200) NOT NULL,
    analogy_en TEXT NOT NULL,
    analogy_fr TEXT NOT NULL,
    definition_en TEXT NOT NULL,
    definition_fr TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    event_type VARCHAR(100) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_event ON audit_logs(event_type, created_at DESC);

CREATE OR REPLACE VIEW v_student_leaderboard AS
SELECT 
    u.id AS user_id,
    u.full_name,
    u.avatar_url,
    p.student_id,
    p.specialization,
    p.rank_level,
    p.rank_title,
    p.current_xp,
    p.study_streak_days,
    COUNT(DISTINCT ub.badge_id) AS total_badges,
    COUNT(DISTINCT cs.challenge_id) AS solved_ctf_challenges,
    COUNT(DISTINCT ump.module_id) FILTER (WHERE ump.is_completed = TRUE) AS completed_modules
FROM users u
JOIN student_profiles p ON u.id = p.user_id
LEFT JOIN user_badges ub ON u.id = ub.user_id
LEFT JOIN ctf_submissions cs ON u.id = cs.user_id AND cs.is_correct = TRUE
LEFT JOIN user_module_progress ump ON u.id = ump.user_id
WHERE u.is_active = TRUE
GROUP BY u.id, u.full_name, u.avatar_url, p.student_id, p.specialization, p.rank_level, p.rank_title, p.current_xp, p.study_streak_days
ORDER BY p.current_xp DESC;

INSERT INTO curriculum_phases (phase_number, name_en, name_fr, required_xp, sort_order)
VALUES 
    (1, 'Phase 1: Systems & Network Foundations', 'Phase 1 : Fondations Systèmes & Réseaux', 0, 1),
    (2, 'Phase 2: Security Hardening & Cryptography', 'Phase 2 : Durcissement & Cryptographie', 250, 2),
    (3, 'Phase 3: Offensive Security & Web Defense', 'Phase 3 : Sécurité Offensive & Défense Web', 600, 3),
    (4, 'Phase 4: Incident Response & Threat Hunting', 'Phase 4 : Réponse à Incident & Threat Hunting', 1200, 4),
    (5, 'Phase 5: Governance & European Certification', 'Phase 5 : Gouvernance & Certification Européenne', 2000, 5)
ON CONFLICT (phase_number) DO NOTHING;

INSERT INTO badges (id, icon, color_hex, xp_reward, category, title_en, title_fr, desc_en, desc_fr, sort_order)
VALUES 
    ('badge-welcome', '🎖️', '#00f0ff', 50, 'milestone', 'Student Cadet Enrolled', 'Cadet Inscrit', 'Welcome to CyberOps Academy! Initialized student profile.', 'Bienvenue sur CyberOps Academy ! Profil étudiant initialisé.', 1),
    ('badge-first-mission', '🎯', '#ffaa00', 100, 'milestone', 'First Breach Defended', 'Première Intrusion Repoussée', 'Completed the 4-step First-Day Mission.', 'Mission du premier jour accomplie au SOC.', 2),
    ('badge-tutorial-master', '🎓', '#10b981', 50, 'learning', 'Knowledge Seeker', 'Chercheur de Savoir', 'Completed first comprehensive Video Masterclass.', 'Premier tutoriel vidéo validé avec quiz.', 3),
    ('badge-crypto-key', '🔐', '#a855f7', 75, 'labs', 'Cipher Architect', 'Architecte du Chiffre', 'Generated SHA-256 hashes and AES-256-GCM encryption.', 'Calcul d''empreintes et chiffrement symétrique testés.', 4),
    ('badge-subnet-pro', '🌐', '#38bdf8', 75, 'labs', 'CIDR Subnetting Pro', 'Expert Sous-Réseaux CIDR', 'Calculated network boundaries and usable host blocks.', 'Calculs de masques et adresses de diffusion validés.', 5),
    ('badge-sqli-hunter', '💉', '#ef4444', 100, 'labs', 'SQLi Hunter', 'Chasseur de Failles SQLi', 'Exploited and patched an authentication bypass vulnerability.', 'Contournement d''authentification SQL exploité et corrigé.', 6),
    ('badge-packet-whisperer', '📦', '#00f0ff', 75, 'labs', 'Packet Whisperer', 'Analyste de Flux Réseau', 'Analyzed TCP 3-way handshake in Wireshark simulator.', 'Analyse du handshake TCP 3 voies dans le simulateur.', 7),
    ('badge-ctf-first-blood', '🚩', '#ff0055', 100, 'ctf', 'CTF First Blood', 'Premier Sang CTF', 'Captured your very first puzzle flag in the CTF arena.', 'Premier drapeau capturé dans l''arène CTF.', 8),
    ('badge-mitre-scholar', '🦅', '#a855f7', 100, 'mitre', 'MITRE ATT&CK Scholar', 'Spécialiste MITRE ATT&CK', 'Explored enterprise tactics and mapped defensive SIEM rules.', 'Exploration des tactiques et règles de détection SIEM.', 9),
    ('badge-wargame-commander', '🚨', '#ff0055', 250, 'wargame', 'Incident Commander', 'Commandant de Crise', 'Repelled an enterprise ransomware cyber attack.', 'Attaque par rançongiciel neutralisée dans le wargame.', 10),
    ('badge-srs-ninja', '🗂️', '#10b981', 75, 'flashcards', 'Memory Master', 'Maître de la Mémoire', 'Mastered 10+ Spaced Repetition flashcards.', '10+ cartes mémoire maîtrisées avec le système Leitner.', 11),
    ('badge-fede-certified', '🏛️', '#00ff9d', 500, 'exam', 'FEDE European Bachelor Certified', 'Diplômé Bachelor FEDE', 'Passed the official 60-question European exam.', 'Examen officiel européen réussi avec mention.', 12),
    ('badge-secops-legend', '👑', '#ffd700', 1000, 'mastery', 'SecOps Operations Legend', 'Légende des Opérations', 'Attained Level 6 Commander rank with 4,000+ XP.', 'Rang suprême de Commandant atteint avec plus de 4 000 XP.', 13)
ON CONFLICT (id) DO NOTHING;

INSERT INTO users (id, email, password_hash, full_name, role, oauth_provider, is_active, is_email_verified)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'admin@cyberops-academy.eu', '$2b$10$EPf4vUoM3rFhUqQv6Oa05uE9E2rYI.t9q6WkWL5zQ4G1b3X.WpQum', 'Chief Information Security Officer', 'admin', 'local', TRUE, TRUE),
    ('22222222-2222-2222-2222-222222222222', 'alex.durand@miage-fede.eu', '$2b$10$EPf4vUoM3rFhUqQv6Oa05uE9E2rYI.t9q6WkWL5zQ4G1b3X.WpQum', 'Alexandre Durand', 'student', 'local', TRUE, TRUE)
ON CONFLICT (email) DO NOTHING;

INSERT INTO student_profiles (user_id, student_id, specialization, preferred_lang, active_career_path, current_xp, rank_level, rank_title, study_streak_days)
VALUES 
    ('22222222-2222-2222-2222-222222222222', 'FEDE-2026-4821', 'European Bachelor in Cybersecurity & Networks', 'en', 'soc_analyst', 150, 1, 'Script Cadet', 3)
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO user_badges (user_id, badge_id)
VALUES 
    ('22222222-2222-2222-2222-222222222222', 'badge-welcome')
ON CONFLICT (user_id, badge_id) DO NOTHING;
