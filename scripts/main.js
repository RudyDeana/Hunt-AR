document.addEventListener('DOMContentLoaded', () => {
    // Check if the user is logged in
    if (!localStorage.getItem('userLoggedIn')) {
        window.location.href = 'login.html';
    }
});