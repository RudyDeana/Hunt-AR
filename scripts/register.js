document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple client-side validation
    if (name && email && password) {
        localStorage.setItem('user', JSON.stringify({ name, email, password }));
        alert('Registration successful! Please log in.');
        window.location.href = 'login.html';
    } else {
        alert('Please fill in all fields.');
    }
});