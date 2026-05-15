const wordGrid = document.getElementById("word-grid");
const quizList = document.getElementById("quiz-list");
const quizResult = document.getElementById("quiz-result");
const todayDate = document.getElementById("today-date");
const checkAnswersButton = document.getElementById("check-answers");
const resetQuizButton = document.getElementById("reset-quiz");

const wordSets = [
    [
        {
            word: "significant",
            pronunciation: "sig-NIF-i-kunt",
            meaning: "중요한, 상당한",
            example: "The study found a significant rise in urban air pollution.",
            translation: "그 연구는 도시 대기 오염의 상당한 증가를 발견했다.",
            quiz: "A _____ number of students choose IELTS for university admission.",
            tip: "IELTS Writing Task 1에서 변화의 크기나 의미를 설명할 때 자주 씁니다.",
            level: "B2"
        },
        {
            word: "factor",
            pronunciation: "FAK-ter",
            meaning: "요인, 요소",
            example: "Cost is a major factor when families choose a city to live in.",
            translation: "가족들이 살 도시를 선택할 때 비용은 주요 요인이다.",
            quiz: "Public transport is one _____ that can reduce traffic congestion.",
            tip: "원인과 영향을 분석하는 에세이에서 reason보다 객관적으로 들립니다.",
            level: "B2"
        },
        {
            word: "policy",
            pronunciation: "POL-uh-see",
            meaning: "정책, 방침",
            example: "The government introduced a new policy to support renewable energy.",
            translation: "정부는 재생 에너지를 지원하기 위한 새 정책을 도입했다.",
            quiz: "A clear environmental _____ can encourage companies to cut waste.",
            tip: "정부, 학교, 회사의 공식적인 계획이나 방침을 말할 때 씁니다.",
            level: "B2"
        },
        {
            word: "benefit",
            pronunciation: "BEN-uh-fit",
            meaning: "이점, 혜택을 주다",
            example: "Online courses can benefit people who live far from colleges.",
            translation: "온라인 강의는 대학에서 멀리 사는 사람들에게 도움이 될 수 있다.",
            quiz: "One clear _____ of public parks is that they improve community health.",
            tip: "Task 2에서 장점이나 긍정적 결과를 말할 때 명사와 동사로 모두 씁니다.",
            level: "B1"
        },
        {
            word: "approach",
            pronunciation: "uh-PROHCH",
            meaning: "접근법, 접근하다",
            example: "A balanced approach is needed to solve housing problems.",
            translation: "주거 문제를 해결하려면 균형 잡힌 접근법이 필요하다.",
            quiz: "This _____ may be more effective than simply increasing fines.",
            tip: "solution보다 넓게, 문제를 다루는 방식 전체를 가리킵니다.",
            level: "B2"
        }
    ],
    [
        {
            word: "assess",
            pronunciation: "uh-SES",
            meaning: "평가하다, 판단하다",
            example: "Researchers assess the impact of screen time on children's sleep.",
            translation: "연구자들은 화면 사용 시간이 아이들의 수면에 미치는 영향을 평가한다.",
            quiz: "Examiners _____ whether an essay answers the question directly.",
            tip: "IELTS 채점, 연구, 정책 효과를 판단할 때 자주 나오는 동사입니다.",
            level: "B2"
        },
        {
            word: "impact",
            pronunciation: "IM-pakt",
            meaning: "영향, 충격",
            example: "Tourism has a strong impact on local employment.",
            translation: "관광은 지역 고용에 큰 영향을 미친다.",
            quiz: "The long-term _____ of climate change is difficult to predict.",
            tip: "effect보다 강한 영향을 표현할 때 쓰며, 명사와 동사로 모두 가능합니다.",
            level: "B2"
        },
        {
            word: "sustainable",
            pronunciation: "suh-STAY-nuh-bl",
            meaning: "지속 가능한",
            example: "Cities need sustainable transport systems to reduce emissions.",
            translation: "도시는 배출량을 줄이기 위해 지속 가능한 교통 시스템이 필요하다.",
            quiz: "Many countries are investing in _____ farming methods.",
            tip: "환경, 경제, 도시 계획 주제에서 매우 자주 쓰입니다.",
            level: "B2"
        },
        {
            word: "evidence",
            pronunciation: "EV-i-dens",
            meaning: "증거, 근거",
            example: "Strong evidence is essential in academic writing.",
            translation: "학술적 글쓰기에서는 강한 근거가 필수적이다.",
            quiz: "Without enough _____, the argument sounds like a personal opinion.",
            tip: "주장을 뒷받침하는 자료나 사례를 말할 때 사용합니다.",
            level: "B1"
        },
        {
            word: "fluctuate",
            pronunciation: "FLUK-choo-ayt",
            meaning: "변동하다, 오르내리다",
            example: "Fuel prices tend to fluctuate throughout the year.",
            translation: "연료 가격은 일 년 내내 변동하는 경향이 있다.",
            quiz: "The unemployment rate may _____ during periods of economic change.",
            tip: "Task 1 그래프에서 수치가 계속 오르내릴 때 정확한 동사입니다.",
            level: "C1"
        }
    ],
    [
        {
            word: "interpret",
            pronunciation: "in-TUR-prit",
            meaning: "해석하다, 이해하다",
            example: "Students must interpret data before writing a clear summary.",
            translation: "학생들은 명확한 요약을 쓰기 전에 데이터를 해석해야 한다.",
            quiz: "It is important to _____ the chart before describing the trend.",
            tip: "그래프, 통계, 연구 결과를 읽고 의미를 파악할 때 씁니다.",
            level: "B2"
        },
        {
            word: "allocate",
            pronunciation: "AL-uh-kayt",
            meaning: "배분하다, 할당하다",
            example: "Schools should allocate more time to practical science lessons.",
            translation: "학교는 실용적인 과학 수업에 더 많은 시간을 배분해야 한다.",
            quiz: "The city plans to _____ extra funds to public libraries.",
            tip: "시간, 예산, 자원을 공식적으로 나눠 배정할 때 사용합니다.",
            level: "C1"
        },
        {
            word: "consequence",
            pronunciation: "KON-si-kwens",
            meaning: "결과, 영향",
            example: "A possible consequence of overfishing is damage to marine ecosystems.",
            translation: "남획의 가능한 결과는 해양 생태계 손상이다.",
            quiz: "One serious _____ of poor urban planning is longer commuting time.",
            tip: "나쁜 결과를 말할 때 result보다 격식 있고 논리적으로 들립니다.",
            level: "B2"
        },
        {
            word: "indicate",
            pronunciation: "IN-di-kayt",
            meaning: "나타내다, 보여 주다",
            example: "The figures indicate that demand for electric cars is increasing.",
            translation: "그 수치는 전기차 수요가 증가하고 있음을 보여 준다.",
            quiz: "These results _____ a clear preference for online shopping.",
            tip: "Task 1에서 data shows를 반복하지 않게 해 주는 유용한 동사입니다.",
            level: "B2"
        },
        {
            word: "priority",
            pronunciation: "pry-OR-uh-tee",
            meaning: "우선순위",
            example: "Public health should be a priority when governments plan budgets.",
            translation: "정부가 예산을 계획할 때 공중 보건은 우선순위가 되어야 한다.",
            quiz: "For many families, affordable housing is the highest _____.",
            tip: "무엇을 먼저 처리해야 하는지 말할 때 에세이에 자주 쓰입니다.",
            level: "B2"
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
        const options = getOptions(words, index).map((option) => `
            <label class="option">
                <input type="radio" name="question-${index}" value="${option}">
                <span>${option}</span>
            </label>
        `).join("");

        return `
            <div class="quiz-item" data-answer="${item.word}">
                <p>${index + 1}. ${item.quiz}</p>
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
