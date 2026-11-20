-- =============================================================================
-- CYBEROPS ACADEMY - ENTERPRISE RELATIONAL DATABASE SCHEMA (MYSQL & MARIADB)
-- Target: MySQL 5.7+ / 8.0+ & MariaDB 10.2+ (phpMyAdmin / XAMPP / Laragon / Cloud SQL)
-- Character Set: utf8mb4 (Full Unicode & Emoji Support)
-- Storage Engine: InnoDB (Full ACID & Foreign Key Constraints)
-- Version: 3.1.0 (Production-Ready)
-- =============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. USERS & IDENTITY MANAGEMENT
CREATE TABLE IF NOT EXISTS `users` (
    `id` VARCHAR(36) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NULL,
    `full_name` VARCHAR(150) NOT NULL,
    `avatar_url` VARCHAR(500) NULL,
    `role` ENUM('student', 'instructor', 'mentor', 'admin') NOT NULL DEFAULT 'student',
    `oauth_provider` ENUM('local', 'google', 'github', 'discord') NOT NULL DEFAULT 'local',
    `oauth_provider_id` VARCHAR(255) NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `is_email_verified` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `last_login_at` DATETIME NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_users_email` (`email`),
    INDEX `idx_users_oauth` (`oauth_provider`, `oauth_provider_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `student_profiles` (
    `user_id` VARCHAR(36) NOT NULL,
    `student_id` VARCHAR(50) NOT NULL,
    `specialization` VARCHAR(150) NOT NULL DEFAULT 'European Bachelor in Cybersecurity & Networks',
    `preferred_lang` ENUM('en', 'fr') NOT NULL DEFAULT 'en',
    `active_career_path` ENUM('soc_analyst', 'pentester', 'devsecops', 'grc_auditor') NOT NULL DEFAULT 'soc_analyst',
    `progression_mode` ENUM('progressive', 'free_access') NOT NULL DEFAULT 'progressive',
    `current_xp` INT UNSIGNED NOT NULL DEFAULT 0,
    `rank_level` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `rank_title` VARCHAR(50) NOT NULL DEFAULT 'Script Cadet',
    `study_streak_days` INT UNSIGNED NOT NULL DEFAULT 1,
    `last_active_date` DATE NULL,
    `bio` TEXT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`user_id`),
    UNIQUE KEY `uq_student_id` (`student_id`),
    INDEX `idx_student_xp` (`current_xp` DESC),
    CONSTRAINT `fk_student_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. CURRICULUM
CREATE TABLE IF NOT EXISTS `curriculum_phases` (
    `phase_number` INT NOT NULL,
    `name_en` VARCHAR(100) NOT NULL,
    `name_fr` VARCHAR(100) NOT NULL,
    `required_xp` INT NOT NULL DEFAULT 0,
    `sort_order` INT NOT NULL DEFAULT 1,
    PRIMARY KEY (`phase_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `modules` (
    `id` VARCHAR(50) NOT NULL,
    `phase_number` INT NOT NULL,
    `module_number` INT NOT NULL,
    `code` VARCHAR(50) NOT NULL,
    `title_en` VARCHAR(200) NOT NULL,
    `title_fr` VARCHAR(200) NOT NULL,
    `duration_hours` INT NOT NULL DEFAULT 20,
    `ects_credits` DECIMAL(3, 1) NOT NULL DEFAULT 3.0,
    `badge_label` VARCHAR(100) NULL,
    `summary_en` TEXT NULL,
    `summary_fr` TEXT NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_modules_phase` (`phase_number`),
    CONSTRAINT `fk_modules_phase` FOREIGN KEY (`phase_number`) REFERENCES `curriculum_phases` (`phase_number`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `user_module_progress` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `module_id` VARCHAR(50) NOT NULL,
    `is_completed` TINYINT(1) NOT NULL DEFAULT 0,
    `score_percentage` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `notes_markdown` TEXT NULL,
    `completed_at` DATETIME NULL,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_user_module` (`user_id`, `module_id`),
    INDEX `idx_module_prog_user` (`user_id`, `is_completed`),
    CONSTRAINT `fk_progress_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_progress_module` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. TUTORIALS
CREATE TABLE IF NOT EXISTS `tutorials` (
    `id` VARCHAR(50) NOT NULL,
    `track` VARCHAR(50) NOT NULL,
    `difficulty_level` ENUM('beginner', 'intermediate', 'advanced') NOT NULL DEFAULT 'beginner',
    `duration_label` VARCHAR(20) NOT NULL,
    `duration_seconds` INT NOT NULL,
    `video_url` VARCHAR(500) NOT NULL,
    `thumbnail_url` VARCHAR(500) NULL,
    `action_target` VARCHAR(100) NULL,
    `title_en` VARCHAR(200) NOT NULL,
    `title_fr` VARCHAR(200) NOT NULL,
    `tagline_en` TEXT NULL,
    `tagline_fr` TEXT NULL,
    `elif5_en` TEXT NULL,
    `elif5_fr` TEXT NULL,
    `xp_reward` INT NOT NULL DEFAULT 50,
    `sort_order` INT NOT NULL DEFAULT 1,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `user_tutorial_progress` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `tutorial_id` VARCHAR(50) NOT NULL,
    `is_completed` TINYINT(1) NOT NULL DEFAULT 0,
    `quiz_passed` TINYINT(1) NOT NULL DEFAULT 0,
    `watch_seconds` INT NOT NULL DEFAULT 0,
    `completed_at` DATETIME NULL,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_user_tutorial` (`user_id`, `tutorial_id`),
    INDEX `idx_tut_prog_user` (`user_id`, `is_completed`),
    CONSTRAINT `fk_tut_prog_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_tut_prog_tut` FOREIGN KEY (`tutorial_id`) REFERENCES `tutorials` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. CTF ARENA
CREATE TABLE IF NOT EXISTS `ctf_challenges` (
    `id` VARCHAR(50) NOT NULL,
    `category` VARCHAR(50) NOT NULL,
    `difficulty` ENUM('Easy', 'Medium', 'Hard') NOT NULL DEFAULT 'Easy',
    `points` INT NOT NULL DEFAULT 100,
    `icon` VARCHAR(10) NOT NULL DEFAULT '🚩',
    `title_en` VARCHAR(200) NOT NULL,
    `title_fr` VARCHAR(200) NOT NULL,
    `description_en` TEXT NOT NULL,
    `description_fr` TEXT NOT NULL,
    `artifact_type` VARCHAR(50) NULL,
    `artifact_content` TEXT NULL,
    `flag_sha256` VARCHAR(64) NOT NULL,
    `hint_nudge_en` TEXT NULL,
    `hint_nudge_fr` TEXT NULL,
    `hint_clue_en` TEXT NULL,
    `hint_clue_fr` TEXT NULL,
    `hint_walkthrough_en` TEXT NULL,
    `hint_walkthrough_fr` TEXT NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ctf_submissions` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `challenge_id` VARCHAR(50) NOT NULL,
    `submitted_flag` VARCHAR(255) NOT NULL,
    `is_correct` TINYINT(1) NOT NULL,
    `hints_viewed` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `points_awarded` INT NOT NULL DEFAULT 0,
    `ip_address` VARCHAR(45) NULL,
    `submitted_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_ctf_sub_user` (`user_id`, `is_correct`),
    CONSTRAINT `fk_ctf_sub_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_ctf_sub_chal` FOREIGN KEY (`challenge_id`) REFERENCES `ctf_challenges` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. EXAMS & CERTIFICATES
CREATE TABLE IF NOT EXISTS `exam_questions` (
    `id` VARCHAR(50) NOT NULL,
    `module_id` VARCHAR(50) NULL,
    `category` VARCHAR(50) NOT NULL,
    `question_en` TEXT NOT NULL,
    `question_fr` TEXT NOT NULL,
    `options_en` JSON NOT NULL,
    `options_fr` JSON NOT NULL,
    `correct_option_index` TINYINT NOT NULL,
    `explanation_en` TEXT NULL,
    `explanation_fr` TEXT NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_exam_q_mod` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `exam_sessions` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `total_questions` INT NOT NULL DEFAULT 10,
    `correct_answers` INT NOT NULL DEFAULT 0,
    `score_out_of_20` DECIMAL(4, 2) NOT NULL,
    `percentage` INT NOT NULL,
    `is_passed` TINYINT(1) NOT NULL,
    `time_taken_seconds` INT NOT NULL,
    `answers_summary` JSON NULL,
    `started_at` DATETIME NOT NULL,
    `completed_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_exam_sess_user` (`user_id`, `is_passed`),
    CONSTRAINT `fk_exam_sess_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `certificates` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `exam_session_id` VARCHAR(36) NOT NULL,
    `certificate_number` VARCHAR(50) NOT NULL,
    `verification_hash` VARCHAR(64) NOT NULL,
    `recipient_name` VARCHAR(150) NOT NULL,
    `final_score_out_of_20` DECIMAL(4, 2) NOT NULL,
    `honors_mention` VARCHAR(50) NULL,
    `issued_date` DATE NOT NULL,
    `qr_code_data` TEXT NULL,
    `pdf_url` VARCHAR(500) NULL,
    `is_revoked` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_cert_number` (`certificate_number`),
    UNIQUE KEY `uq_cert_hash` (`verification_hash`),
    UNIQUE KEY `uq_cert_session` (`exam_session_id`),
    CONSTRAINT `fk_cert_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_cert_exam` FOREIGN KEY (`exam_session_id`) REFERENCES `exam_sessions` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. WARGAME SIMULATIONS
CREATE TABLE IF NOT EXISTS `wargame_scenarios` (
    `id` VARCHAR(50) NOT NULL,
    `title_en` VARCHAR(200) NOT NULL,
    `title_fr` VARCHAR(200) NOT NULL,
    `difficulty` VARCHAR(20) NOT NULL,
    `duration_seconds` INT NOT NULL DEFAULT 300,
    `target_environment` VARCHAR(100) NULL,
    `tactics_tested` JSON NULL,
    `phases_data` JSON NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `wargame_runs` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `scenario_id` VARCHAR(50) NOT NULL,
    `outcome` ENUM('won', 'breached', 'timeout') NOT NULL,
    `final_integrity` TINYINT UNSIGNED NULL,
    `final_loss` TINYINT UNSIGNED NULL,
    `xp_earned` INT NOT NULL DEFAULT 0,
    `decisions_taken` JSON NULL,
    `duration_seconds` INT NOT NULL,
    `started_at` DATETIME NOT NULL,
    `finished_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_wargame_user` (`user_id`, `outcome`),
    CONSTRAINT `fk_wargame_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_wargame_scen` FOREIGN KEY (`scenario_id`) REFERENCES `wargame_scenarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. BADGES & PASSPORT
CREATE TABLE IF NOT EXISTS `badges` (
    `id` VARCHAR(50) NOT NULL,
    `icon` VARCHAR(10) NOT NULL,
    `color_hex` VARCHAR(10) NOT NULL DEFAULT '#00f0ff',
    `xp_reward` INT NOT NULL DEFAULT 50,
    `category` VARCHAR(50) NOT NULL DEFAULT 'milestone',
    `title_en` VARCHAR(150) NOT NULL,
    `title_fr` VARCHAR(150) NOT NULL,
    `desc_en` TEXT NOT NULL,
    `desc_fr` TEXT NOT NULL,
    `sort_order` INT NOT NULL DEFAULT 1,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `user_badges` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `badge_id` VARCHAR(50) NOT NULL,
    `unlocked_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_user_badge` (`user_id`, `badge_id`),
    INDEX `idx_ubadge_user` (`user_id`),
    CONSTRAINT `fk_ubadge_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_ubadge_badge` FOREIGN KEY (`badge_id`) REFERENCES `badges` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. BEGINNER ONBOARDING & DIAGNOSTIC QUIZ
CREATE TABLE IF NOT EXISTS `user_first_day_quests` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `task_id` VARCHAR(50) NOT NULL,
    `is_completed` TINYINT(1) NOT NULL DEFAULT 1,
    `completed_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_user_quest` (`user_id`, `task_id`),
    CONSTRAINT `fk_uquest_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `user_diagnostics` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `experience_level` VARCHAR(50) NOT NULL,
    `primary_interest` VARCHAR(50) NOT NULL,
    `weekly_hours` VARCHAR(50) NOT NULL,
    `recommended_path` VARCHAR(50) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_udiag_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. CYBER GLOSSARY
CREATE TABLE IF NOT EXISTS `glossary_terms` (
    `id` VARCHAR(50) NOT NULL,
    `term` VARCHAR(50) NOT NULL,
    `category` VARCHAR(50) NOT NULL,
    `icon` VARCHAR(10) NOT NULL DEFAULT '📖',
    `full_name_en` VARCHAR(200) NOT NULL,
    `full_name_fr` VARCHAR(200) NOT NULL,
    `analogy_en` TEXT NOT NULL,
    `analogy_fr` TEXT NOT NULL,
    `definition_en` TEXT NOT NULL,
    `definition_fr` TEXT NOT NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. AUDIT LOGS
CREATE TABLE IF NOT EXISTS `audit_logs` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NULL,
    `event_type` VARCHAR(100) NOT NULL,
    `ip_address` VARCHAR(45) NULL,
    `user_agent` TEXT NULL,
    `details` JSON NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_audit_logs` (`event_type`, `created_at` DESC),
    CONSTRAINT `fk_audit_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. LEADERBOARD VIEW
CREATE OR REPLACE VIEW `v_student_leaderboard` AS
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
    COUNT(DISTINCT CASE WHEN ump.is_completed = 1 THEN ump.module_id ELSE NULL END) AS completed_modules
FROM users u
JOIN student_profiles p ON u.id = p.user_id
LEFT JOIN user_badges ub ON u.id = ub.user_id
LEFT JOIN ctf_submissions cs ON u.id = cs.user_id AND cs.is_correct = 1
LEFT JOIN user_module_progress ump ON u.id = ump.user_id
WHERE u.is_active = 1
GROUP BY u.id, u.full_name, u.avatar_url, p.student_id, p.specialization, p.rank_level, p.rank_title, p.current_xp, p.study_streak_days
ORDER BY p.current_xp DESC;

-- 12. SEED DATA
INSERT IGNORE INTO `curriculum_phases` (`phase_number`, `name_en`, `name_fr`, `required_xp`, `sort_order`)
VALUES 
    (1, 'Phase 1: Systems & Network Foundations', 'Phase 1 : Fondations Systèmes & Réseaux', 0, 1),
    (2, 'Phase 2: Security Hardening & Cryptography', 'Phase 2 : Durcissement & Cryptographie', 250, 2),
    (3, 'Phase 3: Offensive Security & Web Defense', 'Phase 3 : Sécurité Offensive & Défense Web', 600, 3),
    (4, 'Phase 4: Incident Response & Threat Hunting', 'Phase 4 : Réponse à Incident & Threat Hunting', 1200, 4),
    (5, 'Phase 5: Governance & European Certification', 'Phase 5 : Gouvernance & Certification Européenne', 2000, 5);

INSERT IGNORE INTO `badges` (`id`, `icon`, `color_hex`, `xp_reward`, `category`, `title_en`, `title_fr`, `desc_en`, `desc_fr`, `sort_order`)
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
    ('badge-secops-legend', '👑', '#ffd700', 1000, 'mastery', 'SecOps Operations Legend', 'Légende des Opérations', 'Attained Level 6 Commander rank with 4,000+ XP.', 'Rang suprême de Commandant atteint avec plus de 4 000 XP.', 13);

INSERT IGNORE INTO `users` (`id`, `email`, `password_hash`, `full_name`, `role`, `oauth_provider`, `is_active`, `is_email_verified`)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'admin@cyberops-academy.eu', '$2b$10$EPf4vUoM3rFhUqQv6Oa05uE9E2rYI.t9q6WkWL5zQ4G1b3X.WpQum', 'Chief Information Security Officer', 'admin', 'local', 1, 1),
    ('22222222-2222-2222-2222-222222222222', 'alex.durand@miage-fede.eu', '$2b$10$EPf4vUoM3rFhUqQv6Oa05uE9E2rYI.t9q6WkWL5zQ4G1b3X.WpQum', 'Alexandre Durand', 'student', 'local', 1, 1);

INSERT IGNORE INTO `student_profiles` (`user_id`, `student_id`, `specialization`, `preferred_lang`, `active_career_path`, `current_xp`, `rank_level`, `rank_title`, `study_streak_days`)
VALUES 
    ('22222222-2222-2222-2222-222222222222', 'FEDE-2026-4821', 'European Bachelor in Cybersecurity & Networks', 'en', 'soc_analyst', 150, 1, 'Script Cadet', 3);

INSERT IGNORE INTO `user_badges` (`id`, `user_id`, `badge_id`)
VALUES 
    ('33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'badge-welcome');

SET FOREIGN_KEY_CHECKS = 1;
