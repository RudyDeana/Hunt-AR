let credits = 100;
let treasurePosition;
let hintsUsed = 0;
const gameContainer = document.getElementById('game-container');
const homeContainer = document.getElementById('home-container');
const creditCount = document.getElementById('credit-count');
const gameCreditCount = document.getElementById('game-credit-count');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const finishButton = document.getElementById('finish-button');

function startGame() {
    if (localStorage.getItem('userLoggedIn') === 'true') {
        homeContainer.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        startScan();
    } else {
        alert('You need to be logged in to start the game.');
        window.location.href = 'login.html';
    }
}

function startScan() {
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
                finishButton.classList.remove('hidden');
            }, 10000);
        })
        .catch(err => {
            alert('Error accessing the camera: ' + err);
        });
}

function finishScan() {
    finishButton.classList.add('hidden');
    alert("Start finding hidden objects around your home!");

    // Posiziona il tesoro in un punto casuale tra quelli scansionati
    treasurePosition = { x: Math.random() * canvas.width, y: Math.random() * canvas.height };
    console.log('Treasure position:', treasurePosition); // Per debug
}

function getHint() {
    if (confirm('Are you sure? This will cost you 50 credits.')) {
        if (credits >= 50) {
            credits -= 50;
            gameCreditCount.innerText = credits;
            hintsUsed++;
            alert(`Hint #${hintsUsed}: The treasure is somewhere near (${treasurePosition.x.toFixed(0)}, ${treasurePosition.y.toFixed(0)})`);
        } else {
            alert('Not enough credits.');
        }
    }
}

function exitGame() {
    homeContainer.classList.remove('hidden');
    gameContainer.classList.add('hidden');
    finishButton.classList.add('hidden');
    const stream = video.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(track => track.stop());
    video.srcObject = null;
    hintsUsed = 0;
    treasurePosition = null;
    credits = 100;
    creditCount.innerText = credits;
    gameCreditCount.innerText = credits;
}