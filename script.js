const questions = [
  {
    text: "スプラはどのぐらいしてる？",
    choices: ["初心者", "ほどほど", "ガチ勢"]
  },
  {
    text: "どのタイプ？",
    choices: ["前線でガツガツキル",
      "後衛で生存意識",
      "安定の立ち回り、味方のサポート"]
  },
   {
    text: "どんなスペシャルが好み？",
    choices: ["リスクを追ってでも相手を破壊したい",
      "生存意識で使っていきたい",
      "味方のサポート要因"]
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
  "0-0-0": "スプラシューター",
  "0-0-1": "バケットスロッシャー",
  "0-0-2": "スプラローラー",
  "0-1-0": "イグザミナーヒュー",
  "0-1-1": "トライストリンガー",
  "0-1-2": "R-PEN/5H",
  "0-2-0": "プライムシューター",
  "0-2-1": "プロモデラーＲＧ",
  "0-2-2": "N-ZAP85",
  "1-0-0": "スプラマニューバー",
  "1-0-1": "パブロ",
  "1-0-2": "デンタルワイパーミント",
  "1-1-0": "クーゲルシュライパー",
  "1-1-1": "Ｒブラスターエリートデコ",
  "1-1-2": "ハイドラント",
  "1-2-0": "ケルビン525",
  "1-2-1": "わかばシューター",
  "1-2-2": "ダイナモローラー",
  "2-0-0": "シャープマーカー",
  "2-0-1": "５２ガロン",
  "2-0-2": "Ｓブラスター",
  "2-1-0": "フルイドｖ",
  "2-1-1": "エクスプロッシャー",
  "2-1-2": "リッター4K",
  "2-2-0": "キャンピングシェルターソレーラ",
  "2-2-1": "ノーチラス４７",
  "2-2-2": "LACT-450",

};

// 質問を表示
function displayQuestion(index) {
  const question = questions[index];
  questionTitle.textContent = question.text;
  choicesContainer.innerHTML = "";

  question.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.classList.add("choice-button");
    btn.onclick = () => {
      selectedAnswers[index] = i;
      Array.from(choicesContainer.children).forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      // ここで次の質問へ進む処理を直接呼び出す
      setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
          displayQuestion(currentQuestion);
        } else {
          showResult();
        }
      }, 300); // 300ms ほど待つと選択の視覚効果が見やすくなります
    };
    choicesContainer.appendChild(btn);
  });
}

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
