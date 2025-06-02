const questions = [
  {
    text: "あなたの好きな色は？",
    choices: ["赤", "青", "緑"]
  },
  {
    text: "好きな動物は？",
    choices: ["猫", "犬", "鳥"]
  },
  {
    text: "好きな季節は？",
    choices: ["春", "夏", "冬"]
  }
];

let currentQuestion = 0;
let selectedAnswers = [];

const questionTitle = document.getElementById("question-title");
const choicesContainer = document.getElementById("choices");
const nextButton = document.getElementById("next-button");
const resultContainer = document.getElementById("result-container");
const questionContainer = document.getElementById("question-container");
const userAnswersEl = document.getElementById("user-answers");
const recommendationEl = document.getElementById("recommendation");
const restartButton = document.getElementById("restart-button");

// すべての結果パターンをここで定義（例として一部）
const resultsMap = {
  "0-0-0": "あなたは情熱的で繊細なタイプです！",
  "0-0-1": "あなたは情熱的で元気なタイプです！",
  "0-0-1": "あなたは情熱的で元気なタイプです！",
  "0-0-1": "あなたは情熱的で元気なタイプです！",
  "0-0-1": "あなたは情熱的で元気なタイプです！",
  "0-0-1": "あなたは情熱的で元気なタイプです！",
  "0-0-1": "あなたは情熱的で元気なタイプです！",
  "0-0-1": "あなたは情熱的で元気なタイプです！",
  "0-0-1": "あなたは情熱的で元気なタイプです！",
  "0-0-1": "あなたは情熱的で元気なタイプです！",
  "0-0-1": "あなたは情熱的で元気なタイプです！",
  "0-0-1": "あなたは情熱的で元気なタイプです！",
  "0-0-1": "あなたは情熱的で元気なタイプです！",
  "0-0-1": "あなたは情熱的で元気なタイプです！",
  "0-0-1": "あなたは情熱的で元気なタイプです！",
  "0-0-1": "あなたは情熱的で元気なタイプです！",
  "0-0-1": "あなたは情熱的で元気なタイプです！",
  "0-0-1": "あなたは情熱的で元気なタイプです！",
  "0-0-1": "あなたは情熱的で元気なタイプです！",
  "0-0-1": "あなたは情熱的で元気なタイプです！",
  "0-0-1": "あなたは情熱的で元気なタイプです！",
  "0-0-1": "あなたは情熱的で元気なタイプです！",
  "0-0-1": "あなたは情熱的で元気なタイプです！",
  "0-0-1": "あなたは情熱的で元気なタイプです！",



};

// 質問を表示
function displayQuestion(index) {
  const question = questions[index];
  questionTitle.textContent = question.text;
  choicesContainer.innerHTML = "";
  nextButton.disabled = true;

  question.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.classList.add("choice-button");
    btn.onclick = () => {
      selectedAnswers[index] = i;
      Array.from(choicesContainer.children).forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      nextButton.disabled = false;
    };
    choicesContainer.appendChild(btn);
  });
}

// 次へ進む
nextButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    displayQuestion(currentQuestion);
  } else {
    showResult();
  }
});

// 結果を表示
function showResult() {
  questionContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");

  // 選択肢のテキストを表示
  const answerTexts = selectedAnswers.map((ans, i) => questions[i].choices[ans]);
  userAnswersEl.textContent = `あなたの回答: ${answerTexts.join(" → ")}`;

  // キーを作成して結果を取得
  const resultKey = selectedAnswers.join("-");
  const resultText = resultsMap[resultKey] || "個性的な組み合わせですね！";

  recommendationEl.textContent = resultText;
}

// リスタート
restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  selectedAnswers = [];
  questionContainer.classList.remove("hidden");
  resultContainer.classList.add("hidden");
  displayQuestion(0);
});

displayQuestion(0);
