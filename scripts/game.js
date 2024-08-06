function startScan() {
    if (localStorage.getItem('userLoggedIn') === 'true') {
        // Simulate starting the AR scan
        alert("Starting AR scan...");
        // Normally, you'd use WebRTC or another library to access the camera
    } else {
        alert('You need to be logged in to start the game.');
        window.location.href = 'login.html';
    }
}