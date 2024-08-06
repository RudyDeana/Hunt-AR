document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    applyLanguage(savedLanguage);

    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.value = savedLanguage;
        languageSelector.addEventListener('change', function() {
            const selectedLanguage = this.value;
            localStorage.setItem('language', selectedLanguage);
            applyLanguage(selectedLanguage);
        });
    }
});

function applyLanguage(language) {
    const translations = {
        en: {
            welcome: "Welcome to AR Treasure Hunt",
            play: "Play Game",
            login: "Login",
            register: "Register",
            start: "Start Scanning",
            credits: "Credits",
            hint: "Get ready to start your hunt!",
            found: "Congratulations! You found the treasure!",
            scan: "Scan Your Home"
        },
        it: {
            welcome: "Benvenuto in AR Treasure Hunt",
            play: "Gioca",
            login: "Accedi",
            register: "Registrati",
            start: "Inizia la Scansione",
            credits: "Crediti",
            hint: "Preparati a iniziare la tua caccia!",
            found: "Congratulazioni! Hai trovato il tesoro!",
            scan: "Scansiona la tua casa"
        }
    };

    const translation = translations[language] || translations.en;
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        el.innerText = translation[key] || key;
    });
}