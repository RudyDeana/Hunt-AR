function startScan() {
    if (localStorage.getItem('userLoggedIn') === 'true') {
        // Simulate starting the AR scan
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                const video = document.createElement('video');
                video.srcObject = stream;
                video.autoplay = true;
                video.style.position = 'absolute';
                video.style.top = '0';
                video.style.left = '0';
                video.style.width = '100%';
                video.style.height = '100%';
                document.body.appendChild(video);

                // Simulate AR scanning with a delay
                setTimeout(() => {
                    alert("Scanned your home and found a clue!");
                    document.body.removeChild(video);
                }, 5000); // Adjust the time as needed
            })
            .catch(err => {
                alert('Error accessing the camera: ' + err);
            });
    } else {
        alert('You need to be logged in to start the game.');
        window.location.href = 'login.html';
    }
}