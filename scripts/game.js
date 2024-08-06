let credits = 100;
let treasurePosition;
let hintsUsed = 0;
const gameContainer = document.getElementById('game-container');
const homeContainer = document.getElementById('home-container');
const creditCount = document.getElementById('credit-count');
const gameCreditCount = document.getElementById('game-credit-count');
const finishButton = document.getElementById('finish-button');

function startGame() {
    if (localStorage.getItem('userLoggedIn') === 'true') {
        homeContainer.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        startAR();
    } else {
        alert('You need to be logged in to start the game.');
        window.location.href = 'login.html';
    }
}

function startAR() {
    const scene = document.querySelector('a-scene');
    const marker = document.querySelector('a-marker');

    marker.addEventListener('markerFound', () => {
        alert('Marker found. Start scanning.');
        setTimeout(() => {
            alert("Scanned your home. Click 'Finish' to complete.");
            finishButton.classList.remove('hidden');
        }, 10000);
    });
}

function finishScan() {
    finishButton.classList.add('hidden');
    alert("Start finding hidden objects around your home!");

    // Posiziona il tesoro in un punto casuale
    treasurePosition = { x: Math.random() * 10, y: Math.random() * 10 };
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
    hintsUsed = 0;
    treasurePosition = null;
    credits = 100;
    creditCount.innerText = credits;
    gameCreditCount.innerText = credits;
}