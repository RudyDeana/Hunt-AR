let credits = 100;
let treasurePosition;
let hintsUsed = 0;

function startScan() {
    if (localStorage.getItem('userLoggedIn') === 'true') {
        document.getElementById('home-container').classList.add('hidden');
        document.getElementById('game-container').classList.remove('hidden');

        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                video.play();

                video.addEventListener('loadeddata', () => {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    scan();
                });

                function scan() {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                    // Simula la scansione con puntini verdi su oggetti rilevati
                    const points = [{ x: 100, y: 100 }, { x: 200, y: 150 }, { x: 300, y: 200 }];
                    ctx.fillStyle = 'green';
                    points.forEach(point => {
                        ctx.beginPath();
                        ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
                        ctx.fill();
                    });

                    requestAnimationFrame(scan);
                }

                setTimeout(() => {
                    alert("Scanned your home. Click 'Finish' to complete.");
                    document.getElementById('finish-button').classList.remove('hidden');
                }, 10000);
            })
            .catch(err => {
                alert('Error accessing the camera: ' + err);
            });
    } else {
        alert('You need to be logged in to start the game.');
        window.location.href = 'login.html';
    }
}

function finishScan() {
    document.getElementById('finish-button').classList.add('hidden');
    alert("Start finding hidden objects around your home!");

    // Posiziona il tesoro in un punto casuale tra quelli scansionati
    treasurePosition = { x: Math.random() * canvas.width, y: Math.random() * canvas.height };
    console.log('Treasure position:', treasurePosition); // Per debug
}

function getHint() {
    if (confirm('Are you sure? This will cost you 50 credits.')) {
        if (credits >= 50) {
            credits -= 50;
            document.getElementById('credit-count').innerText = credits;
            hintsUsed++;
            alert(`Hint #${hintsUsed}: The treasure is somewhere near (${treasurePosition.x.toFixed(0)}, ${treasurePosition.y.toFixed(0)})`);
        } else {
            alert('Not enough credits.');
        }
    }
}

function exitGame() {
    document.getElementById('home-container').classList.remove('hidden');
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('finish-button').classList.add('hidden');
    const video = document.getElementById('video');
    const stream = video.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(track => track.stop());
    video.srcObject = null;
    hintsUsed = 0;
    treasurePosition = null;
}