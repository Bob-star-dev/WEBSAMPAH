// Auth Page JavaScript

// Switch between login and register tabs
function switchTab(tab) {
    // Remove active class from all tabs and forms
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    
    // Add active class to selected tab and form
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    document.getElementById(`${tab}Form`).classList.add('active');
}

// Tab click handlers
document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        switchTab(tabName);
    });
});

// Toggle password visibility
function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);
    const icon = button.querySelector('i');
    
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

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    
    // Simulate login process
    const btn = form.querySelector('.btn-auth');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
    btn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // In real app, this would be an API call
        console.log('Login attempt:', { email, password });
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
        
        // Reset button (in case of error)
        // btn.innerHTML = originalText;
        // btn.disabled = false;
    }, 1500);
}

// Handle register form submission
function handleRegister(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    
    // Validate password match
    if (password !== confirmPassword) {
        alert('Password dan konfirmasi password tidak cocok!');
        return;
    }
    
    // Validate password length
    if (password.length < 8) {
        alert('Password minimal 8 karakter!');
        return;
    }
    
    // Simulate registration process
    const btn = form.querySelector('.btn-auth');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mendaftar...';
    btn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // In real app, this would be an API call
        console.log('Registration attempt:', { name, email, password });
        
        // Show success message
        alert('Pendaftaran berhasil! Silakan login.');
        
        // Switch to login tab
        switchTab('login');
        
        // Reset button
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 1500);
}

// Handle Google login
function handleGoogleLogin() {
    // In real app, this would integrate with Google OAuth
    console.log('Google login initiated');
    
    // Simulate Google OAuth
    const btn = document.querySelector('.btn-google');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
    btn.disabled = true;
    
    setTimeout(() => {
        // Redirect to dashboard after successful Google login
        window.location.href = 'dashboard.html';
    }, 1500);
}

// Handle Google register
function handleGoogleRegister() {
    // In real app, this would integrate with Google OAuth
    console.log('Google registration initiated');
    
    // Simulate Google OAuth
    const btn = document.querySelectorAll('.btn-google')[1];
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
    btn.disabled = true;
    
    setTimeout(() => {
        // Redirect to dashboard after successful Google registration
        window.location.href = 'dashboard.html';
    }, 1500);
}

// Form validation
document.getElementById('registerFormElement').addEventListener('submit', function(e) {
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    if (password !== confirmPassword) {
        e.preventDefault();
        alert('Password dan konfirmasi password tidak cocok!');
        return false;
    }
});

// Auto-focus first input
document.addEventListener('DOMContentLoaded', function() {
    const activeForm = document.querySelector('.auth-form.active');
    if (activeForm) {
        const firstInput = activeForm.querySelector('input[type="email"], input[type="text"]');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 300);
        }
    }
});

