<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Modilo</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <style>
        .login-container {
            max-width: 450px;
            margin: 60px auto;
            padding: 40px;
            background-color: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .login-header {
            text-align: center;
            margin-bottom: 30px;
        }
        .login-header h1 {
            font-family: 'DM Serif Text', serif;
            font-size: 2.5rem;
            color: #333;
            margin-bottom: 10px;
        }
        .login-header p {
            color: #777;
            font-size: 1rem;
        }
        .form-tabs {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 30px;
            border-bottom: 2px solid #e0e0e0;
        }
        .form-tabs button {
            flex: 1;
            padding: 12px;
            border: none;
            background: none;
            color: #777;
            font-size: 1.1rem;
            font-family: 'Noto Serif', serif;
            cursor: pointer;
            transition: all 0.3s;
            position: relative;
        }
        .form-tabs button.active {
            color: #007BFF;
        }
        .form-tabs button.active::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #007BFF;
        }
        .form-container {
            display: none;
        }
        .form-container.active {
            display: block;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #333;
            font-size: 0.95rem;
        }
        .form-group input {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
            font-family: 'Noto Serif', serif;
            transition: border-color 0.3s;
        }
        .form-group input:focus {
            border-color: #007BFF;
            outline: none;
        }
        .password-toggle {
            position: relative;
        }
        .password-toggle i {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            color: #777;
        }
        .submit-btn {
            width: 100%;
            padding: 14px;
            background-color: #007BFF;
            color: #fff;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s;
            font-family: 'Noto Serif', serif;
        }
        .submit-btn:hover {
            background-color: #0056b3;
        }
        .submit-btn:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
        .alert {
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
            display: none;
        }
        .alert.success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .alert.error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .form-footer {
            text-align: center;
            margin-top: 20px;
            color: #777;
        }
        .form-footer a {
            color: #007BFF;
            text-decoration: none;
        }
        .form-footer a:hover {
            text-decoration: underline;
        }
        .loading {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid #fff;
            border-radius: 50%;
            border-top-color: transparent;
            animation: spin 0.6s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <!--<header>
        <img src="../images/logo.png" alt="Modilo Logo" style="width: 100px;height: 70px;"/>
        <nav>
            <a href="../index.html">Home</a>
    </header>-->

    <main>
        <div class="login-container">
            <div class="login-header">
                <h1>Welcome Back</h1>
                <p>Login or create an account to continue</p>
            </div>

            <div id="alert" class="alert"></div>

            <div class="form-tabs">
                <button class="active" onclick="switchForm('login')">Login</button>
                <button onclick="switchForm('register')">Register</button>
            </div>

            <!-- Login Form -->
            <div id="login-form" class="form-container active">
                <form id="loginForm" onsubmit="handleLogin(event)">
                    <div class="form-group">
                        <label for="login-email">Email Address</label>
                        <input type="email" id="login-email" name="email" required placeholder="Enter your email">
                    </div>
                    <div class="form-group">
                        <label for="login-password">Password</label>
                        <div class="password-toggle">
                            <input type="password" id="login-password" name="password" required placeholder="Enter your password">
                            <i class="fas fa-eye" onclick="togglePassword('login-password', this)"></i>
                        </div>
                    </div>
                    <button type="submit" class="submit-btn" id="login-btn">Login</button>
                </form>
                <div class="form-footer">
                    <p><a href="#">Forgot password?</a></p>
                </div>
            </div>

            <!-- Register Form -->
            <div id="register-form" class="form-container">
                <form id="registerForm" onsubmit="handleRegister(event)">
                    <div class="form-group">
                        <label for="register-name">Full Name</label>
                        <input type="text" id="register-name" name="name" required placeholder="Enter your full name">
                    </div>
                    <div class="form-group">
                        <label for="register-email">Email Address</label>
                        <input type="email" id="register-email" name="email" required placeholder="Enter your email">
                    </div>
                    <div class="form-group">
                        <label for="register-password">Password</label>
                        <div class="password-toggle">
                            <input type="password" id="register-password" name="password" required placeholder="Create a password" minlength="6">
                            <i class="fas fa-eye" onclick="togglePassword('register-password', this)"></i>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="register-confirm">Confirm Password</label>
                        <div class="password-toggle">
                            <input type="password" id="register-confirm" name="confirm" required placeholder="Confirm your password" minlength="6">
                            <i class="fas fa-eye" onclick="togglePassword('register-confirm', this)"></i>
                        </div>
                    </div>
                    <button type="submit" class="submit-btn" id="register-btn">Create Account</button>
                </form>
            </div>
        </div>
    </main>

    <footer>
        <p>&copy; 2024 Modilo. All rights reserved.</p>
        <div id="footer-socials">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-linkedin-in"></i></a>
        </div>
    </footer>

    <script src="../js/cart.js"></script>
    <script>
        // Switch between login and register forms
        function switchForm(formType) {
            const loginForm = document.getElementById('login-form');
            const registerForm = document.getElementById('register-form');
            const tabs = document.querySelectorAll('.form-tabs button');
            
            tabs.forEach(tab => tab.classList.remove('active'));
            
            if (formType === 'login') {
                loginForm.classList.add('active');
                registerForm.classList.remove('active');
                tabs[0].classList.add('active');
            } else {
                registerForm.classList.add('active');
                loginForm.classList.remove('active');
                tabs[1].classList.add('active');
            }
            
            hideAlert();
        }

        // Toggle password visibility
        function togglePassword(inputId, icon) {
            const input = document.getElementById(inputId);
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }

        // Show alert message
        function showAlert(message, type) {
            const alert = document.getElementById('alert');
            alert.textContent = message;
            alert.className = `alert ${type}`;
            alert.style.display = 'block';
            
            setTimeout(() => {
                if (type !== 'error') hideAlert();
            }, 5000);
        }

        function hideAlert() {
            const alert = document.getElementById('alert');
            alert.style.display = 'none';
        }

        // Handle Login with PHP backend
       async function handleLogin(event) {
    event.preventDefault();
    
    const btn = document.getElementById('login-btn');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="loading"></span> Logging in...';
    
    const formData = new FormData(event.target);
    formData.append('action', 'login');
    
    try {
        const response = await fetch('auth.php', {
            method: 'POST',
            body: formData
        });
        
        const text = await response.text();
        
        // Log the EXACT response
        console.log('=== RAW RESPONSE START ===');
        console.log(text);
        console.log('=== RAW RESPONSE END ===');
        console.log('Response length:', text.length);
        console.log('First 100 chars:', text.substring(0, 100));
        
        // Try to parse
        const data = JSON.parse(text);
        
        if (data.success) {
            showAlert('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showAlert(data.message || 'Login failed', 'error');
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('An error occurred: ' + error.message, 'error');
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}

        // Handle Login with PHP backend
async function handleLogin(event) {
    event.preventDefault();
    
    const btn = document.getElementById('login-btn');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="loading"></span> Logging in...';
    
    const formData = new FormData(event.target);
    formData.append('action', 'login');
    
    try {
        const response = await fetch('auth.php', {
            method: 'POST',
            body: formData
        });
        
        // Check if response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Get response text first to see what we're getting
        const text = await response.text();
        console.log('Raw response:', text);
        
        // Try to parse as JSON
        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            console.error('JSON parse error:', e);
            showAlert('Server error. Check console for details.', 'error');
            btn.disabled = false;
            btn.innerHTML = originalText;
            return;
        }
        
        if (data.success) {
            showAlert('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showAlert(data.message || 'Login failed', 'error');
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        showAlert('Connection error: ' + error.message, 'error');
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}

// Handle Registration with PHP backend
async function handleRegister(event) {
    event.preventDefault();
    
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
    
    if (password !== confirm) {
        showAlert('Passwords do not match!', 'error');
        return;
    }
    
    const btn = document.getElementById('register-btn');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="loading"></span> Creating account...';
    
    const formData = new FormData(event.target);
    formData.append('action', 'register');
    
    try {
        const response = await fetch('auth.php', {
            method: 'POST',
            body: formData
        });
        
        // Check if response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Get response text first
        const text = await response.text();
        console.log('Raw response:', text);
        
        // Try to parse as JSON
        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            console.error('JSON parse error:', e);
            showAlert('Server error. Check console for details.', 'error');
            btn.disabled = false;
            btn.innerHTML = originalText;
            return;
        }
        
        if (data.success) {
            showAlert('Account created successfully! You can now login.', 'success');
            event.target.reset();
            setTimeout(() => {
                switchForm('login');
            }, 2000);
        } else {
            showAlert(data.message || 'Registration failed', 'error');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        showAlert('Connection error: ' + error.message, 'error');
    }
    
    btn.disabled = false;
    btn.innerHTML = originalText;
}

// Check login status on page load
async function checkLoginStatus() {
    try {
        const formData = new FormData();
        formData.append('action', 'check');
        
        const response = await fetch('auth.php', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            console.error('Check login failed:', response.status);
            return;
        }
        
        const text = await response.text();
        console.log('Check login response:', text);
        
        const data = JSON.parse(text);
        
        if (data.loggedIn) {
            showAlert(`Welcome back, ${data.user.name}! Redirecting...`, 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    } catch (error) {
        console.error('Error checking login status:', error);
    }
}

document.addEventListener('DOMContentLoaded', checkLoginStatus);
    </script>
</body>
</html>