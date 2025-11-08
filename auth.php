<?php
session_start();

// Prevent any output before JSON
ob_start();

header('Content-Type: application/json');

require_once 'config.php';

$action = $_POST['action'] ?? '';

switch($action) {
    case 'register':
        handleRegister();
        break;
    case 'login':
        handleLogin();
        break;
    case 'logout':
        handleLogout();
        break;
    case 'check':
        checkLogin();
        break;
    default:
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
}

function handleRegister() {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    
    if (empty($name) || empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email format']);
        exit;
    }
    
    if (strlen($password) < 6) {
        echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters']);
        exit;
    }
    
    $conn = getDBConnection();
    
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'Email already registered']);
        $stmt->close();
        $conn->close();
        exit;
    }
    
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $hashedPassword);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Registration successful']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Registration failed: ' . $stmt->error]);
    }
    
    $stmt->close();
    $conn->close();
    exit;
}

function handleLogin() {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    
    if (empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Email and password are required']);
        exit;
    }
    
    $conn = getDBConnection();
    
    $stmt = $conn->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
        $stmt->close();
        $conn->close();
        exit;
    }
    
    $user = $result->fetch_assoc();
    
    if (password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        $_SESSION['user_email'] = $user['email'];
        
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'user' => [
                'name' => $user['name'],
                'email' => $user['email']
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
    }
    
    $stmt->close();
    $conn->close();
    exit;
}

function handleLogout() {
    session_destroy();
    echo json_encode(['success' => true, 'message' => 'Logged out successfully']);
    exit;
}

function checkLogin() {
    if (isset($_SESSION['user_id'])) {
        echo json_encode([
            'success' => true,
            'loggedIn' => true,
            'user' => [
                'name' => $_SESSION['user_name'],
                'email' => $_SESSION['user_email']
            ]
        ]);
    } else {
        echo json_encode(['success' => true, 'loggedIn' => false]);
    }
    exit;
}

// Clean any accidental output
ob_end_clean();