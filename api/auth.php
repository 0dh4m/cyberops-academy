<?php
/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <adamcherkaoui99@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - Authentication API
 * Supports: Sign Up (Password Hashing), Sign In (Verification), OAuth (Google, Discord, GitHub)
 * Targets: MySQL / MariaDB (cyberops database)
 */
require_once __DIR__ . '/db.php';

if (!$pdo) {
    echo json_encode([
        'success' => false,
        'fallback' => true,
        'error' => 'Database connection unavailable'
    ]);
    exit;
}

if (!function_exists('handleSignUp')) {
function handleSignUp($pdo, $data) {
    $name = trim($data['name'] ?? '');
    $email = strtolower(trim($data['email'] ?? ''));
    $password = $data['password'] ?? '';
    $specialization = trim($data['specialization'] ?? 'European Bachelor in Cybersecurity & Networks');

    if (empty($name) || empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Full student name, valid academic email, and password are required.']);
        return;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid email address format.']);
        return;
    }

    if (strlen($password) < 6) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Password must contain at least 6 characters.']);
        return;
    }

    // Check if email already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = :email LIMIT 1");
    $stmt->execute(['email' => $email]);
    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode(['success' => false, 'error' => 'A student cadet account with this email already exists. Please sign in instead.']);
        return;
    }

    $userId = generate_uuid();
    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $pdo->prepare("
        INSERT INTO users (id, email, password_hash, full_name, role, oauth_provider, is_active, created_at, last_login_at)
        VALUES (:id, :email, :pass, :name, 'student', 'local', 1, NOW(), NOW())
    ");
    $stmt->execute([
        'id' => $userId,
        'email' => $email,
        'pass' => $passwordHash,
        'name' => $name
    ]);

    // Generate unique student ID
    $prefix = strtoupper(substr(preg_replace('/[^a-zA-Z]/', '', $name) ?: 'CAD', 0, 3));
    $studentId = 'FEDE-' . $prefix . '-' . mt_rand(1000, 9999);

    $stmt = $pdo->prepare("
        INSERT INTO student_profiles (user_id, student_id, specialization, preferred_lang, current_xp, rank_level, rank_title, created_at)
        VALUES (:uid, :sid, :spec, 'en', 100, 1, 'Script Cadet', NOW())
    ");
    $stmt->execute([
        'uid' => $userId,
        'sid' => $studentId,
        'spec' => $specialization
    ]);

    $profile = [
        'id' => $userId,
        'name' => $name,
        'email' => $email,
        'studentId' => $studentId,
        'specialization' => $specialization,
        'currentXp' => 100,
        'rankLevel' => 1,
        'rankTitle' => 'Script Cadet',
        'provider' => 'email',
        'avatar' => '🛡️',
        'isAuthenticated' => true
    ];

    echo json_encode([
        'success' => true,
        'message' => "Student Cadet account successfully created in CyberOps Database.",
        'profile' => $profile
    ]);
}
}

if (!function_exists('handleSignIn')) {
function handleSignIn($pdo, $data) {
    $email = strtolower(trim($data['email'] ?? ''));
    $password = $data['password'] ?? '';

    if (empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Email and password are required.']);
        return;
    }

    $stmt = $pdo->prepare("
        SELECT u.*, p.student_id, p.specialization, p.current_xp, p.rank_level, p.rank_title, p.preferred_lang
        FROM users u
        LEFT JOIN student_profiles p ON u.id = p.user_id
        WHERE u.email = :email
        LIMIT 1
    ");
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch();

    if (!$user) {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'No account registered with this email. Please click Sign Up to create your student passport.']);
        return;
    }

    if (empty($user['password_hash'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => "This account was registered via {$user['oauth_provider']}. Please sign in using the {$user['oauth_provider']} button."]);
        return;
    }

    if (!password_verify($password, $user['password_hash'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Incorrect password. Access denied.']);
        return;
    }

    // Update last login
    $pdo->prepare("UPDATE users SET last_login_at = NOW() WHERE id = :id")->execute(['id' => $user['id']]);

    // Ensure student profile exists
    $studentId = $user['student_id'];
    if (!$studentId) {
        $studentId = 'FEDE-CAD-' . mt_rand(1000, 9999);
        $pdo->prepare("
            INSERT INTO student_profiles (user_id, student_id, specialization, preferred_lang, current_xp, rank_level, rank_title, created_at)
            VALUES (:uid, :sid, 'European Bachelor in Cybersecurity & Networks', 'en', 100, 1, 'Script Cadet', NOW())
        ")->execute(['uid' => $user['id'], 'sid' => $studentId]);
    }

    $profile = [
        'id' => $user['id'],
        'name' => $user['full_name'],
        'email' => $user['email'],
        'studentId' => $studentId,
        'specialization' => $user['specialization'] ?: 'European Bachelor in Cybersecurity & Networks',
        'currentXp' => (int)($user['current_xp'] ?: 100),
        'rankLevel' => (int)($user['rank_level'] ?: 1),
        'rankTitle' => $user['rank_title'] ?: 'Script Cadet',
        'provider' => $user['oauth_provider'] ?: 'email',
        'avatar' => $user['avatar_url'] ?: '🛡️',
        'isAuthenticated' => true
    ];

    echo json_encode([
        'success' => true,
        'message' => "Welcome back, {$profile['name']}!",
        'profile' => $profile
    ]);
}
}

if (!function_exists('handleOAuth')) {
function handleOAuth($pdo, $data) {
    $provider = strtolower(trim($data['provider'] ?? 'google'));
    $name = trim($data['name'] ?? '');
    $email = strtolower(trim($data['email'] ?? ''));
    $oauthId = trim($data['oauth_id'] ?? $data['id'] ?? '');
    $avatar = trim($data['avatar_url'] ?? $data['avatar'] ?? '');

    if (empty($name)) {
        $name = ucfirst($provider) . ' Cadet';
    }
    if (empty($email)) {
        $cleanName = preg_replace('/[^a-zA-Z0-9]/', '', $name);
        $email = strtolower($cleanName) . "@{$provider}.user";
    }

    // Check if user exists by email or provider id
    $stmt = $pdo->prepare("
        SELECT u.*, p.student_id, p.specialization, p.current_xp, p.rank_level, p.rank_title
        FROM users u
        LEFT JOIN student_profiles p ON u.id = p.user_id
        WHERE u.email = :email OR (u.oauth_provider = :provider AND u.oauth_provider_id = :oauth_id)
        LIMIT 1
    ");
    $stmt->execute([
        'email' => $email,
        'provider' => $provider,
        'oauth_id' => $oauthId ?: $email
    ]);
    $user = $stmt->fetch();

    if ($user) {
        $userId = $user['id'];
        $pdo->prepare("
            UPDATE users SET full_name = :name, avatar_url = :avatar, last_login_at = NOW()
            WHERE id = :id
        ")->execute([
            'name' => $name,
            'avatar' => $avatar,
            'id' => $userId
        ]);
        $studentId = $user['student_id'] ?: ('FEDE-' . strtoupper(substr($provider, 0, 3)) . '-' . mt_rand(1000, 9999));
        $specialization = $user['specialization'] ?: 'European Bachelor in Cybersecurity & Networks';
        $currentXp = (int)($user['current_xp'] ?: 150);
        $rankLevel = (int)($user['rank_level'] ?: 1);
        $rankTitle = $user['rank_title'] ?: 'Script Cadet';
    } else {
        $userId = generate_uuid();
        $stmt = $pdo->prepare("
            INSERT INTO users (id, email, password_hash, full_name, avatar_url, role, oauth_provider, oauth_provider_id, is_active, created_at, last_login_at)
            VALUES (:id, :email, NULL, :name, :avatar, 'student', :provider, :oauth_id, 1, NOW(), NOW())
        ");
        $stmt->execute([
            'id' => $userId,
            'email' => $email,
            'name' => $name,
            'avatar' => $avatar,
            'provider' => $provider,
            'oauth_id' => $oauthId ?: $email
        ]);

        $prefix = strtoupper(substr($provider, 0, 3));
        $studentId = 'FEDE-' . $prefix . '-' . mt_rand(1000, 9999);
        $specialization = 'European Bachelor in Cybersecurity & Networks';
        $currentXp = 150;
        $rankLevel = 1;
        $rankTitle = 'Script Cadet';

        $pdo->prepare("
            INSERT INTO student_profiles (user_id, student_id, specialization, preferred_lang, current_xp, rank_level, rank_title, created_at)
            VALUES (:uid, :sid, :spec, 'en', :xp, 1, 'Script Cadet', NOW())
        ")->execute([
            'uid' => $userId,
            'sid' => $studentId,
            'spec' => $specialization,
            'xp' => $currentXp
        ]);
    }

    $profile = [
        'id' => $userId,
        'name' => $name,
        'email' => $email,
        'studentId' => $studentId,
        'specialization' => $specialization,
        'currentXp' => $currentXp,
        'rankLevel' => $rankLevel,
        'rankTitle' => $rankTitle,
        'provider' => $provider,
        'avatar' => $avatar ?: '🛡️',
        'isAuthenticated' => true
    ];

    echo json_encode([
        'success' => true,
        'message' => "Successfully authenticated via " . ucfirst($provider),
        'profile' => $profile
    ]);
}
}

if (!function_exists('handleCheck')) {
function handleCheck($pdo, $data) {
    $userId = $data['user_id'] ?? '';
    if (!$userId) {
        echo json_encode(['success' => false, 'authenticated' => false]);
        return;
    }
    $stmt = $pdo->prepare("
        SELECT u.id, u.email, u.full_name, u.role, u.oauth_provider, p.student_id, p.specialization, p.current_xp, p.rank_level, p.rank_title
        FROM users u
        LEFT JOIN student_profiles p ON u.id = p.user_id
        WHERE u.id = :id AND u.is_active = 1
        LIMIT 1
    ");
    $stmt->execute(['id' => $userId]);
    $user = $stmt->fetch();
    if ($user) {
        echo json_encode([
            'success' => true,
            'authenticated' => true,
            'profile' => [
                'id' => $user['id'],
                'name' => $user['full_name'],
                'email' => $user['email'],
                'studentId' => $user['student_id'],
                'specialization' => $user['specialization'],
                'currentXp' => (int)$user['current_xp'],
                'rankLevel' => (int)$user['rank_level'],
                'rankTitle' => $user['rank_title'],
                'provider' => $user['oauth_provider'],
                'isAuthenticated' => true
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'authenticated' => false]);
    }
}
}

// Dispatch Request
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?: $_POST;
$action = $_GET['action'] ?? $data['action'] ?? '';

switch ($action) {
    case 'signup':
        handleSignUp($pdo, $data);
        break;
    case 'signin':
        handleSignIn($pdo, $data);
        break;
    case 'oauth':
        handleOAuth($pdo, $data);
        break;
    case 'check':
        handleCheck($pdo, $data);
        break;
    default:
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Unknown authentication action requested.']);
        break;
}
