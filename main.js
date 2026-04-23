const themeToggle = document.getElementById("theme-toggle");
const imageUpload = document.getElementById("image-upload");
const previewImage = document.getElementById("preview-image");
const previewPlaceholder = document.getElementById("preview-placeholder");
const labelContainer = document.getElementById("label-container");
const resultTitle = document.getElementById("result-title");
const resultDescription = document.getElementById("result-description");
const statusMessage = document.getElementById("status-message");

const THEME_STORAGE_KEY = "preferred-theme";
const MODEL_URL = "https://teachablemachine.withgoogle.com/models/z4MPBl_oq/";

const resultCopy = {
    dog: {
        title: "강아지상",
        description: "밝고 친근한 분위기가 강한 인상입니다. 부드럽고 활발한 이미지로 읽힐 가능성이 높습니다."
    },
    cat: {
        title: "고양이상",
        description: "도도하고 또렷한 분위기가 강한 인상입니다. 세련되고 날렵한 이미지로 읽힐 가능성이 높습니다."
    }
};

let model;

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

function getDisplayName(className) {
    const normalizedName = className.trim().toLowerCase();
    if (normalizedName.includes("dog") || normalizedName.includes("강아지")) {
        return "강아지상";
    }
    if (normalizedName.includes("cat") || normalizedName.includes("고양이")) {
        return "고양이상";
    }
    return className;
}

function updateResultCard(topPrediction) {
    const normalizedName = topPrediction.className.trim().toLowerCase();
    const resultType = normalizedName.includes("dog") || normalizedName.includes("강아지") ? "dog" : "cat";
    const probability = `${(topPrediction.probability * 100).toFixed(1)}%`;

    resultTitle.textContent = `${resultCopy[resultType].title} ${probability}`;
    resultDescription.textContent = resultCopy[resultType].description;
}

function createPredictionRows(predictions) {
    labelContainer.innerHTML = "";

    predictions.forEach(({ className }) => {
        const row = document.createElement("div");
        row.className = "prediction-row";
        row.innerHTML = `
            <span class="prediction-label">${getDisplayName(className)}</span>
            <div class="prediction-bar">
                <div class="prediction-fill" style="width: 0%"></div>
            </div>
            <span class="prediction-value">0%</span>
        `;
        labelContainer.appendChild(row);
    });
}

async function ensureModelLoaded() {
    if (model) {
        return;
    }

    const modelURL = `${MODEL_URL}model.json`;
    const metadataURL = `${MODEL_URL}metadata.json`;
    model = await tmImage.load(modelURL, metadataURL);
}

async function predict(imageElement) {
    const predictions = await model.predict(imageElement);
    const sortedPredictions = [...predictions].sort((left, right) => right.probability - left.probability);

    if (!labelContainer.children.length) {
        createPredictionRows(sortedPredictions);
    }

    sortedPredictions.forEach((prediction, index) => {
        const row = labelContainer.children[index];
        const fill = row.querySelector(".prediction-fill");
        const value = row.querySelector(".prediction-value");

        row.querySelector(".prediction-label").textContent = getDisplayName(prediction.className);
        fill.style.width = `${(prediction.probability * 100).toFixed(1)}%`;
        value.textContent = `${Math.round(prediction.probability * 100)}%`;
    });

    updateResultCard(sortedPredictions[0]);
}

async function handleImageUpload(file) {
    if (!file) {
        return;
    }

    statusMessage.textContent = "모델과 이미지를 준비하고 있습니다.";
    resultTitle.textContent = "분석 중";
    resultDescription.textContent = "잠시만 기다려 주세요.";

    try {
        await ensureModelLoaded();

        const objectUrl = URL.createObjectURL(file);
        previewImage.src = objectUrl;
        previewImage.hidden = false;
        previewPlaceholder.hidden = true;

        await new Promise((resolve, reject) => {
            previewImage.onload = resolve;
            previewImage.onerror = reject;
        });

        await predict(previewImage);
        statusMessage.textContent = "분석이 완료됐습니다. 다른 사진도 다시 업로드할 수 있습니다.";
        URL.revokeObjectURL(objectUrl);
    } catch (error) {
        statusMessage.textContent = "이미지 분석에 실패했습니다. 다른 사진으로 다시 시도해 주세요.";
        resultTitle.textContent = "분석 실패";
        resultDescription.textContent = "페이지 새로고침 후 다시 시도해 주세요.";
        console.error(error);
    }
}

imageUpload.addEventListener("change", async (event) => {
    const [file] = event.target.files;
    await handleImageUpload(file);
});
