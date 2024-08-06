document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    document.getElementById('language-selector').value = savedLanguage;
    applyLanguage(savedLanguage);

    document.getElementById('language-selector').addEventListener('change', function() {
        const selectedLanguage = this.value;
        localStorage.setItem('language', selectedLanguage);
        applyLanguage(selectedLanguage);
    });
});

function applyLanguage(language) {
    const translations = {
        en: {
            welcome: "Welcome to AR Treasure Hunt",
            play: "Play Game",
            login: "Login",
            register: "Register",
            instructions: "Instructions",
            start: "Start Scanning",
            hint: "Get ready to start your hunt!",
            found: "Congratulations! You found the treasure!",
            scan: "Scan Your Home"
        },
        it: {
            welcome: "Benvenuto in AR Treasure Hunt",
            play: "Gioca",
            login: "Accedi",
            register: "Registrati",
            instructions: "Istruzioni",
            start: "Inizia la Scansione",
            hint: "Preparati a iniziare la tua caccia!",
            found: "Congratulazioni! Hai trovato il tesoro!",
            scan: "Scansiona la tua casa"
        }
    };

    const translation = translations[language] || translations.en;
    document.querySelector('h1').innerText = translation.welcome || translation.scan;
    document.querySelector('a[href="game.html"]').innerText = translation.play;
    document.querySelector('a[href="login.html"]').innerText = translation.login;
    document.querySelector('a[href="register.html"]').innerText = translation.register;
    document.querySelector('#hint').innerText = translation.hint;
    document.querySelector('button[onclick="startScan()"]').innerText = translation.start;
}