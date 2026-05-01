const wordGrid = document.getElementById("word-grid");
const quizList = document.getElementById("quiz-list");
const quizResult = document.getElementById("quiz-result");
const todayDate = document.getElementById("today-date");
const checkAnswersButton = document.getElementById("check-answers");
const resetQuizButton = document.getElementById("reset-quiz");

const wordSets = [
    [
        {
            word: "subtle",
            pronunciation: "SUH-tl",
            meaning: "미묘하지만 중요한",
            example: "The report shows a subtle change in customer behavior.",
            translation: "그 보고서는 고객 행동의 미묘한 변화를 보여준다.",
            tip: "작지만 알아차릴 가치가 있는 차이를 말할 때 씁니다.",
            level: "B2"
        },
        {
            word: "retain",
            pronunciation: "ri-TAYN",
            meaning: "유지하다, 보유하다",
            example: "Short reviews help learners retain new vocabulary.",
            translation: "짧은 복습은 학습자가 새 어휘를 유지하는 데 도움을 준다.",
            tip: "keep보다 격식 있는 글에서 자주 보입니다.",
            level: "B1"
        },
        {
            word: "context",
            pronunciation: "KON-tekst",
            meaning: "문맥, 상황",
            example: "A word becomes clearer when you read it in context.",
            translation: "단어는 문맥 속에서 읽을 때 더 분명해진다.",
            tip: "단어 뜻이 하나로 고정되지 않을 때 확인해야 하는 기준입니다.",
            level: "B1"
        },
        {
            word: "reliable",
            pronunciation: "ri-LY-uh-bl",
            meaning: "믿을 수 있는",
            example: "A reliable routine is better than a perfect plan.",
            translation: "믿고 지속할 수 있는 루틴은 완벽한 계획보다 낫다.",
            tip: "사람, 정보, 시스템 모두에 사용할 수 있습니다.",
            level: "B1"
        },
        {
            word: "clarify",
            pronunciation: "KLAIR-uh-fy",
            meaning: "명확히 하다",
            example: "The teacher clarified the difference between the two words.",
            translation: "선생님은 두 단어의 차이를 명확히 설명했다.",
            tip: "explain보다 '흐린 것을 분명하게 만든다'는 느낌이 강합니다.",
            level: "B2"
        }
    ],
    [
        {
            word: "consistent",
            pronunciation: "kun-SIS-tunt",
            meaning: "일관된, 꾸준한",
            example: "Consistent practice makes difficult words feel familiar.",
            translation: "꾸준한 연습은 어려운 단어를 익숙하게 만든다.",
            tip: "행동이나 품질이 흔들리지 않을 때 씁니다.",
            level: "B1"
        },
        {
            word: "evaluate",
            pronunciation: "ih-VAL-yoo-ayt",
            meaning: "평가하다",
            example: "Evaluate each source before you trust the information.",
            translation: "정보를 믿기 전에 각 출처를 평가하라.",
            tip: "단순히 보다가 아니라 기준을 두고 판단한다는 뜻입니다.",
            level: "B2"
        },
        {
            word: "practical",
            pronunciation: "PRAK-ti-kul",
            meaning: "실용적인, 현실적인",
            example: "This guide gives practical examples for daily study.",
            translation: "이 가이드는 매일 공부할 수 있는 실용적인 예를 제공한다.",
            tip: "실제로 사용할 수 있는 해결책에 잘 어울립니다.",
            level: "B1"
        },
        {
            word: "evidence",
            pronunciation: "EV-i-dens",
            meaning: "증거, 근거",
            example: "Good writing supports every claim with evidence.",
            translation: "좋은 글은 모든 주장에 근거를 붙인다.",
            tip: "의견과 사실을 구분할 때 자주 등장합니다.",
            level: "B1"
        },
        {
            word: "improve",
            pronunciation: "im-PROOV",
            meaning: "개선하다, 나아지다",
            example: "You can improve your reading speed by reviewing key words.",
            translation: "핵심 단어를 복습하면 읽기 속도를 개선할 수 있다.",
            tip: "사람의 실력과 제품 품질 모두에 씁니다.",
            level: "A2"
        }
    ],
    [
        {
            word: "relevant",
            pronunciation: "REL-uh-vunt",
            meaning: "관련 있는, 적절한",
            example: "Choose examples that are relevant to your goal.",
            translation: "목표와 관련 있는 예문을 선택하라.",
            tip: "주제와 직접 연결될 때 쓰며 important와 다릅니다.",
            level: "B1"
        },
        {
            word: "avoid",
            pronunciation: "uh-VOID",
            meaning: "피하다",
            example: "Avoid memorizing long lists without examples.",
            translation: "예문 없이 긴 목록을 외우는 것은 피하라.",
            tip: "나쁜 결과를 만들 수 있는 행동을 하지 않는다는 뜻입니다.",
            level: "A2"
        },
        {
            word: "specific",
            pronunciation: "spi-SIF-ik",
            meaning: "구체적인, 특정한",
            example: "Specific feedback is easier to act on.",
            translation: "구체적인 피드백은 실행하기 더 쉽다.",
            tip: "general의 반대말로 자주 출제됩니다.",
            level: "B1"
        },
        {
            word: "benefit",
            pronunciation: "BEN-uh-fit",
            meaning: "이점, 이익을 얻다",
            example: "Learners benefit from seeing a word in several sentences.",
            translation: "학습자는 단어를 여러 문장에서 볼 때 이점을 얻는다.",
            tip: "명사와 동사로 모두 쓰입니다.",
            level: "B1"
        },
        {
            word: "accurate",
            pronunciation: "AK-yur-it",
            meaning: "정확한",
            example: "An accurate translation preserves the writer's intent.",
            translation: "정확한 번역은 글쓴이의 의도를 보존한다.",
            tip: "맞고 틀림이 중요한 숫자, 정보, 설명에 씁니다.",
            level: "B1"
        }
    ]
];

function getDayIndex() {
    const start = new Date("2026-01-01T00:00:00Z");
    const now = new Date();
    const diff = now.getTime() - start.getTime();
    return Math.floor(diff / 86400000);
}

function getTodayWords() {
    return wordSets[Math.abs(getDayIndex()) % wordSets.length];
}

function renderDate() {
    const formatter = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
    });
    todayDate.textContent = formatter.format(new Date());
}

function renderWords(words) {
    wordGrid.innerHTML = words.map((item) => `
        <article class="word-card">
            <span class="level">${item.level}</span>
            <h3>${item.word}</h3>
            <p class="pronunciation">${item.pronunciation}</p>
            <p class="meaning">${item.meaning}</p>
            <p class="example">${item.example}</p>
            <p>${item.translation}</p>
            <p class="tip">${item.tip}</p>
        </article>
    `).join("");
}

function getOptions(words, answerIndex) {
    const answer = words[answerIndex].word;
    const candidates = words
        .map((item) => item.word)
        .filter((word) => word !== answer)
        .slice(0, 2);
    return [answer, ...candidates].sort((left, right) => left.localeCompare(right));
}

function renderQuiz(words) {
    quizResult.textContent = "";
    quizList.innerHTML = words.map((item, index) => {
        const sentence = item.example.replace(item.word, "_____");
        const options = getOptions(words, index).map((option) => `
            <label class="option">
                <input type="radio" name="question-${index}" value="${option}">
                <span>${option}</span>
            </label>
        `).join("");

        return `
            <div class="quiz-item" data-answer="${item.word}">
                <p>${index + 1}. ${sentence}</p>
                <div class="options">${options}</div>
            </div>
        `;
    }).join("");
}

function checkAnswers() {
    const items = [...document.querySelectorAll(".quiz-item")];
    let score = 0;

    items.forEach((item) => {
        const answer = item.dataset.answer;
        const checked = item.querySelector("input:checked");

        item.querySelectorAll(".option").forEach((option) => {
            option.classList.remove("correct", "incorrect");
            const input = option.querySelector("input");
            if (input.value === answer) {
                option.classList.add("correct");
            }
            if (checked && input === checked && input.value !== answer) {
                option.classList.add("incorrect");
            }
        });

        if (checked && checked.value === answer) {
            score += 1;
        }
    });

    quizResult.textContent = `${items.length}문항 중 ${score}문항을 맞혔습니다. 틀린 단어는 예문을 한 번 더 읽어 보세요.`;
}

function resetQuiz() {
    renderQuiz(getTodayWords());
}

const todayWords = getTodayWords();
renderDate();
renderWords(todayWords);
renderQuiz(todayWords);

checkAnswersButton.addEventListener("click", checkAnswers);
resetQuizButton.addEventListener("click", resetQuiz);
