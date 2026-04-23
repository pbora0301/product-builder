const words = [
    { word: "Analyze", meaning: "분석하다" },
    { word: "Assess", meaning: "평가하다" },
    { word: "Authority", meaning: "권위, 권한" },
    { word: "Benefit", meaning: "이점, 혜택" },
    { word: "Challenge", meaning: "도전, 난제" },
    { word: "Complex", meaning: "복잡한" },
    { word: "Conclude", meaning: "결론짓다" },
    { word: "Consequence", meaning: "결과, 영향" },
    { word: "Consumer", meaning: "소비자" },
    { word: "Context", meaning: "맥락, 배경" },
    { word: "Decline", meaning: "감소하다, 하락" },
    { word: "Demonstrate", meaning: "입증하다, 보여주다" },
    { word: "Economic", meaning: "경제의, 경제적인" },
    { word: "Emphasis", meaning: "강조" },
    { word: "Establish", meaning: "확립하다, 설립하다" },
    { word: "Evidence", meaning: "증거" },
    { word: "Factor", meaning: "요인" },
    { word: "Impact", meaning: "영향" },
    { word: "Indicate", meaning: "나타내다, 시사하다" },
    { word: "Individual", meaning: "개인, 개개의" },
    { word: "Interpret", meaning: "해석하다" },
    { word: "Issue", meaning: "문제, 쟁점" },
    { word: "Justify", meaning: "정당화하다, 근거를 대다" },
    { word: "Maintain", meaning: "유지하다, 주장하다" },
    { word: "Method", meaning: "방법" },
    { word: "Occur", meaning: "발생하다" },
    { word: "Participate", meaning: "참여하다" },
    { word: "Policy", meaning: "정책" },
    { word: "Primary", meaning: "주요한, 1차의" },
    { word: "Relevant", meaning: "관련 있는" }
];

const getWordsBtn = document.getElementById("get-words-btn");
const wordList = document.getElementById("word-list");
const themeToggle = document.getElementById("theme-toggle");

const THEME_STORAGE_KEY = "preferred-theme";
const WORDS_PER_ROUND = 5;

let previousSelectionKey = "";

function applyTheme(theme) {
    const isDarkMode = theme === "dark";
    document.body.classList.toggle("dark-mode", isDarkMode);
    themeToggle.textContent = isDarkMode ? "화이트 모드" : "다크 모드";
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

function getRandomSelection() {
    const shuffledWords = [...words];

    for (let index = shuffledWords.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffledWords[index], shuffledWords[randomIndex]] = [shuffledWords[randomIndex], shuffledWords[index]];
    }

    return shuffledWords.slice(0, WORDS_PER_ROUND);
}

function renderWords(selectedWords) {
    wordList.innerHTML = "";

    selectedWords.forEach(word => {
        const wordDiv = document.createElement("div");
        wordDiv.classList.add("word-card");
        wordDiv.innerHTML = `
            <h3>${word.word}</h3>
            <p>뜻: ${word.meaning}</p>
        `;
        wordList.appendChild(wordDiv);
    });
}

getWordsBtn.addEventListener("click", () => {
    let selectedWords = getRandomSelection();
    let selectionKey = selectedWords.map(({ word }) => word).join("|");

    while (selectionKey === previousSelectionKey && words.length > WORDS_PER_ROUND) {
        selectedWords = getRandomSelection();
        selectionKey = selectedWords.map(({ word }) => word).join("|");
    }

    previousSelectionKey = selectionKey;
    renderWords(selectedWords);
});
