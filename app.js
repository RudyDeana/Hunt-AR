// app.js
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('register-username').value;
            const password = document.getElementById('register-password').value;

            let users = JSON.parse(localStorage.getItem('users')) || {};

            if (users[username]) {
                alert('User already exists');
            } else {
                users[username] = password;
                localStorage.setItem('users', JSON.stringify(users));
                alert('Registration successful');
                window.location.href = 'login.html'; // Redirect to login page after registration
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            let users = JSON.parse(localStorage.getItem('users')) || {};

            if (users[username] === password) {
                alert('Login successful');
                window.location.href = 'index.html'; // Redirect to home page after login
            } else {
                alert('Invalid credentials');
            }
        });
    }
});