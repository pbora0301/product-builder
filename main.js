const words = [
    { word: "Ephemeral", meaning: "Lasting for a very short time." },
    { word: "Ubiquitous", meaning: "Present, appearing, or found everywhere." },
    { word: "Mellifluous", meaning: "(Of a voice or words) sweet or musical; pleasant to hear." },
    { word: "Pulchritudinous", meaning: "Having great physical beauty." },
    { word: "Serendipity", meaning: "The occurrence and development of events by chance in a happy or beneficial way." },
    { word: "Cacophony", meaning: "A harsh, discordant mixture of sounds." },
    { word: "Ephemeral", meaning: "Lasting for a very short time." },
    { word: "Esoteric", meaning: "Intended for or likely to be understood by only a small number of people with a specialized knowledge or interest." },
    { word: "Ineffable", meaning: "Too great or extreme to be expressed or described in words." },
    { word: "Petrichor", meaning: "A pleasant smell that frequently accompanies the first rain after a long period of warm, dry weather." }
];

const getWordsBtn = document.getElementById("get-words-btn");
const wordList = document.getElementById("word-list");
const themeToggle = document.getElementById("theme-toggle");

const THEME_STORAGE_KEY = "preferred-theme";

function applyTheme(theme) {
    const isDarkMode = theme === "dark";
    document.body.classList.toggle("dark-mode", isDarkMode);
    themeToggle.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
    themeToggle.setAttribute("aria-pressed", String(isDarkMode));
}

function getInitialTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "dark" || savedTheme === "light") {
        return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

applyTheme(getInitialTheme());

themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
});

getWordsBtn.addEventListener("click", () => {
    wordList.innerHTML = "";
    const shuffledWords = words.sort(() => 0.5 - Math.random());
    const selectedWords = shuffledWords.slice(0, 5);

    selectedWords.forEach(word => {
        const wordDiv = document.createElement("div");
        wordDiv.classList.add("word-card");
        wordDiv.innerHTML = `
            <h3>${word.word}</h3>
            <p>${word.meaning}</p>
        `;
        wordList.appendChild(wordDiv);
    });
});
