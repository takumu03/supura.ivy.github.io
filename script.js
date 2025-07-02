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
  "0-0-0": {
    name: "スプラシューター",
    image: "images-bukisindan/susi.png",
    sub:"images-bukisindan/kyu-banbom.png",
    special:"images-bukisindan/urutprashotto.png",
    description: `スプラシューターは機動力があり、とても動きやすいブキだ！<br>
    前線で相手を倒していきながら<br>
    ウルトラショットで射程の長いチャージャーまで<br>
    狙いを定めてWIPEOUTをしよう!`,
    className: "splashooter"
  },
  "0-0-1": {
    name: "バケットスロッシャー",
    image: "images-bukisindan/bakesuro.png",
    sub:"images-bukisindan/supurasshubom.png",
    special:"images-bukisindan/torune-do.png",
    description: `メインとサブのスプラッシュボムを組み合わせることで<br>
    壁裏の相手まで狙うことができる万能なブキだ！<br>
    スペシャルのトリプルトルネードで相手の行く手を阻もう！`,
    className: "bucketslosher"
  },
  "0-0-2": {
    name: "スプラローラー",
    image: "images-bukisindan/supuraro-ra-.png",
    sub:"images-bukisindan/ka-ringu.png",
    special:"images-bukisindan/baria.png",
    description: `潜伏キルがとても狙いやすいスプラローラー！<br>
    カーリングボムで相手をうまく翻弄していきながら<br>
    スペシャルのグレートバリアで味方のフォローもしていこう！`,
    className: "supuraro-ra-"
  },
  "0-1-0": {
    name: "イグザミナーヒュー",
    image: "images-bukisindan/iguzamina-.png",
    sub:"images-bukisindan/supurasshubom.png",
    special:"images-bukisindan/kanitank.png",
    description: `中後衛の動きができるスピナーブキ！<br>
    スペシャルのカニタンクではさらに射程を伸ばしながら<br>
    味方のラインを維持していこう！`,
    className: "iguzamina-hyu-"
  },
  "0-1-1": {
    name: "トライストリンガー",
    image: "images-bukisindan/torasuto.png",
    sub:"images-bukisindan/poison.png",
    special:"images-bukisindan/megahon.png",
    description: `壁裏を狙いながら３本の矢で一確も狙うことができるブキ！<br>
    スペシャルのメガホンレーザーで相手の位置を把握して<br>
    サブのポイズンミストで動きを遅くしてキルを狙っていこう！`,
    className: "toraistoringa-"
  },
  "0-1-2": {
    name: "R-PEN/5H",
    image: "images-bukisindan/Rpen.png",
    sub:"images-bukisindan/supurinkura-.png",
    special:"images-bukisindan/enasuta.png",
    description: `メインとサブのスプリンクラーで塗りができるチャージャーブキ！<br>
    スペシャルのエナジードリンクをためて味方のサポートをしながら<br>
    自分は生存意識をすれば勝利の道に近づくぞ！`,
    className: "R-PEN/5H"
  },
  "0-2-0": {
    name: "プライムシューター",
    image: "images-bukisindan/puraimshu-ta-.png",
    sub:"images-bukisindan/rainma-ka-.png",
    special:"images-bukisindan/kanitank.png",
    description: `シューターの中では射程の長いブキ！<br>
    サブのラインマーカーとスペシャルのカニタンクで<br>
    射程を生かしながら非常に動きやすいブキだ！`,
    className: "puraimshu-ta-"
  },
  "0-2-1": {
    name: "プロモデラーRG",
    image: "images-bukisindan/puromodera-RG.png",
    sub:"images-bukisindan/supurinkura-.png",
    special:"images-bukisindan/naisudama.png",
    description: `メインとサブのスプリンクラー塗りに特化したブキ！<br>
    スペシャルのナイスダマをたくさんためて、攻めや打開など<br>
    色々な状況に応じて使っていこう！`,
    className: "puromodera-RG"
  },
  "0-2-2": {
    name: "N-ZAP85",
    image: "images-bukisindan/N-ZAP.png",
    sub:"images-bukisindan/kyu-banbom.png",
    special:"images-bukisindan/enasuta.png",
    description: `ヒト速がシューターの中でもかなり速いブキ！
    サブのキューバンボムの塗りを生かしながらスペシャルのエナジードリンクで<br>
    さらにヒト速やイカ速をあげて相手との対面に勝っていこう！`,
    className: "N-ZAP85"
  },
  "1-0-0": {
    name: "スプラマニューバー",
    image: "images-bukisindan/kyu-banbom.png",
    sub:"images-bukisindan/kyu-banbom.png",
    special:"images-bukisindan/kanitank.png",
    description: `スライド２回をうまく使うことで<br>
    ほかのブキにはできない立ち回りができるブキ！<br>
    前線でスペシャルのカニタンクを使いながら<br>
    味方のラインをどんどん前に上げていこう！`,
    className: "supuramanyu-ba-"
  },
  "1-0-1": {
    name: "パブロ",
    image: "images-bukisindan/paburo.png",
    sub:"images-bukisindan/supurasshubom.png",
    special:"images-bukisindan/megahon.png",
    description: `ヒト速を生かして相手の裏を取ることを得意とするブキ！<br>
    相手の背後からスペシャルのメガホンレーザーを放って<br>
    相手の後衛ブキの妨害していこう！`,
    className: "paburo"
  },
  "1-0-2": {
    name: "デンタルワイパーミント",
    image: "images-bukisindan/dentaru.png",
    sub:"images-bukisindan/kyu-banbom.png",
    special:"images-bukisindan/baria.png",
    description: `インクを出すときに一歩前に踏み出して<br>
    相手を斬ってキルをすることができるブキ！<br>
    スペシャルのグレートバリアを使うことでうまく相手のヘイトを向けて<br>
    近くに来た相手をぶった切っていこう！`,
    className: "dentaruwaipa-"
  },
  "1-1-0": {
    name: "クーゲルシュライパー",
    image: "images-bukisindan/ku-geru.png",
    sub:"images-bukisindan/tansanbom.png",
    special:"images-bukisindan/jettosuipa-.png",
    description: `チャージをため方によって射程を変えていく特殊なブキ！<br>
    短射程モードをうまく活用して、スペシャルのジェットスイーパーをため、<br>
    高い位置からキルを狙っていこう！`,
    className: "ku-geru"
  },
  "1-1-1": {
    name: "Ｒブラスターエリートデコ",
    image: "images-bukisindan/Rburosuta-deko.png",
    sub:"images-bukisindan/rainma-ka-.png",
    special:"images-bukisindan/megahon.png",
    description: `ブラスターの中でもかなり射程の長いブキ！<br>
    サブのラインマーカーとスペシャルのメガホンレーザーで<br>
    相手の後衛にも攻撃を仕掛けていこう！`,
    className: "Rburasuta-"
  },
  "1-1-2": {
    name: "ハイドラント圧",
    image: "images-bukisindan/haidoranto atu.png",
    sub:"images-bukisindan/supurinkura-.png",
    special:"images-bukisindan/baria.png",
    description: `スピナーの中で最も射程の長いブキ！<br>
    特にスペシャルのグレートバリアを使うことで<br>
    壁裏に隠れなくても安全にチャージして<br>
    一気にキルを狙うことができる！`,
    className: "haidoranto"
  },
  "1-2-0": {
    name: "ケルビン525",
    image: "images-bukisindan/kerubin.png",
    sub:"images-bukisindan/si-rudo.png",
    special:"images-bukisindan/naisudama.png",
    description: `52ガロンや96ガロンの用にメインで<br>
    2確をすることができる唯一のマニューバーブキ!
    サブのスプラッシュシールドとスペシャルのナイスダマで<br>
    生存意識した固い立ち回りをしていこう！`,
    className: "kerubin"
  },
  "1-2-1": {
    name: "わかばシューター",
    image: "images-bukisindan/wakaba.png",
    sub:"images-bukisindan/supurasshubom.png",
    special:"images-bukisindan/baria.png",
    description: `サブがスプラッシュボム、スペシャルがグレートバリアで<br>
    味方をサポートをしながら味方のラインも維持することができるブキ！<br>
    初心者の人はこのブキを最初に持つがメインの扱いが難しいため<br>
    スプラになれるまではほかのブキをできるだけおすすめしたい！`,
    className: "wakabashu-ta-"
  },
  "1-2-2": {
    name: "ダイナモローラー",
    image: "images-bukisindan/dainamo.png",
    sub:"images-bukisindan/supurinkura-.png",
    special:"images-bukisindan/enasuta.png",
    description: `ローラーの中でも一番塗りに特化したブキ！<br>
    メインとサブのスプリンクラーで自陣の塗りを固めて、<br>
    スペシャルのエナジードリンクで味方のサポートをしていこう！`,
    className: "dainamoro-ra-"
  },
  "2-0-0": {
    name: "シャープマーカー",
    image: "images-bukisindan/shapuma.png",
    sub:"images-bukisindan/kuikkubom.png",
    special:"images-bukisindan/kanitank.png",
    description: `射程は短いがキル速が非常に速いブキ！<br>
    サブのクイックボムの組み合わせることで<br>
    自分の足場を塗ることができ、キルもより狙いやすくなる！<br>
    スペシャルのカニタンクの射程を生かして<br>
    相手の後衛ブキにも圧をかけていこう！`,
    className: "sha-puma-ka-"
  },
  "2-0-1": {
    name: "52ガロン",
    image: "images-bukisindan/52garon.png",
    sub:"images-bukisindan/si-rudo.png",
    special:"images-bukisindan/megahon.png",
    description: `サブのスプラッシュシールドでリスクなく前線に出ることができるブキ！<br>
    スぺシャルのメガホンレーザーも生かしながら相手の潜伏を探り出し<br>
    味方のラインをあげていこう！`,
    className: "52garon"
  },
  "2-0-2": {
    name: "sブラスター",
    image: "images-bukisindan/Sburasuta-.png",
    sub:"images-bukisindan/kuikkubom.png",
    special:"images-bukisindan/naisudama.png",
    description: `長射程モードと短射程モードを切り替えることができる<br>
    唯一無二なブラスター！<br>
    特にサブのクイックボムとの相性はよく、足場塗りができるのが優秀だ！<br>
    スペシャルのナイスダマで前線を維持していこう！`,
    className: "Sbura"
  },
  "2-1-0": {
    name: "フルイドｖ",
    image: "images-bukisindan/huruidoV.png",
    sub:"images-bukisindan/robottobom.png",
    special:"images-bukisindan/urutorahanko.png",
    description: `５本の矢を飛ばすことでガチホコのバリアやシールドを<br>
    すぐに壊すことができるストリンガーブキ！<br>
    特にスペシャルのウルトラハンコで<br>
    近くまで詰めてきた相手を返り討ちにしよう！`,
    className: "huruido"
  },
  "2-1-1": {
    name: "エクスプロッシャー",
    image: "images-bukisindan/ex.png",
    sub:"images-bukisindan/pointsensa-.png",
    special:"images-bukisindan/amehurasi.png",
    description: `スロッシャーの中で最も射程の長いブキ！<br>
    メインは相手の足場を一気にとることができるので優秀だ！<br>
    サブのポイントセンサーで相手の位置を把握し<br>
    スペシャルのアメフラシで自陣の塗りを広げていこう！`,
    className: "ex"
  },
  "2-1-2": {
    name: "リッター4K",
    image: "images-bukisindan/ritta-4k.png",
    sub:"images-bukisindan/torappu.png",
    special:"images-bukisindan/hoppusona-.png",
    description: `全ブキの中でも射程が非常に長いブキ！<br>
    エイムに優れているプレイヤーには一番おすすめしたいブキだ！<br>
    サブのトラップ、スペシャルのホップソナーで<br>
    近づいてくる相手に対抗しよう！`,
    className: "retta-"
  },
  "2-2-0": {
    name: "キャンピングシェルターソレーラ",
    image: "images-bukisindan/kyanp.png",
    sub:"images-bukisindan/torappu.png",
    special:"images-bukisindan/urutprashotto.png",
    description: `パージを駆使することで前線を維持しながら戦うことができるブキ！<br>
    相手のサブウェポンに注意しながら<br>
    パージを利用していくスキルが求められる<br>
    スペシャルのウルトラショットで<br>
    時には相手の後衛ブキも狙ってキルしていこう！`,
    className: "kyanpu"
  },
  "2-2-1": {
    name: "ノーチラス47",
    image: "images-bukisindan/no-tirasu.png",
    sub:"images-bukisindan/pointsensa-.png",
    special:"images-bukisindan/amehurasi.png",
    description: `チャージした状態でインクに潜ることができる唯一のスピナーブキ！<br>
    サブのポイントセンサーで潜伏している相手を探り出し<br>
    キル速を生かして相手を倒していこう！`,
    className: "no-tiras"
  },
  "2-2-2": {
    name: "LACT-450",
    image: "images-bukisindan/rakuto.png",
    sub:"images-bukisindan/ka-ringu.png",
    special:"images-bukisindan/marutimisairu.png",
    description: `メインの塗りが全ブキの中でも非常に特化しているブキ！<br>
    スペシャルのマルチミサイルをためて、味方のサポートをしながら<br>
    メインの塗りを生かして自陣の塗りを広げ<br>
    より味方が動きやすい戦況を作り上げていこう！`,
    className: "rakuto"
  },

};

// インク画像の一覧（質問数 × 選択肢数 で必要）
const choiceimages = [
  ["../images-index/ink_mizuiro.png", "../images-index/ink-kiiro.png", "../images-index/pinkuink.png"], // Q1
  ["../images-index/ink_mizuiro.png", "../images-index/ink-kiiro.png", "../images-index/pinkuink.png"], // Q2
  ["../images-index/ink_mizuiro.png", "../images-index/ink-kiiro.png", "../images-index/pinkuink.png"]  // Q3
];

// 質問を表示
function displayQuestion(index) {
  choicesContainer.innerHTML = "";
  const question = questions[index];
  questionTitle.textContent = question.text;

  const colors = [
    ["#2f97ec", "#ffe100", "#ec35b2"],
    ["#2f97ec", "#ffe100", "#ec35b2"],
    ["#2f97ec", "#ffe100", "#ec35b2"]
  ];

  question.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.classList.add("choice-button");

    // 背景色とホバー画像を設定
    btn.style.backgroundColor = colors[index][i];
    btn.style.setProperty('--hover-image', `url('${choiceimages[index][i]}')`);

    const label = document.createElement("div");
    label.classList.add("choice-label");
    label.textContent = choice;

    btn.appendChild(label);

    btn.onclick = () => {
      selectedAnswers[index] = i;
      Array.from(choicesContainer.children).forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");

      setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
          displayQuestion(currentQuestion);
        } else {
          showResult();
        }
      }, 300);
    };

    choicesContainer.appendChild(btn);
  });
}


// 結果を表示
function showResult() {
  questionContainer.classList.add("hidden");

  // ★ まず resultContainer の中身をクリア（前回のクラスをリセット）
  resultContainer.className = "result-container";
  resultContainer.classList.remove("hidden");

  const resultKey = selectedAnswers.join("-");
  const result = resultsMap[resultKey];

  if (result) {
    document.getElementById("weapon-name").textContent = result.name;
    document.getElementById("weapon-image").src = result.image;
    document.getElementById("weapon-image").alt = result.name;
    document.getElementById("weapon-description").innerHTML = result.description;


    // サブとスペシャル画像も設定
    document.getElementById("sub-image").src = result.sub;
    document.getElementById("sub-image").alt = "サブ";
    document.getElementById("special-image").src = result.special;
    document.getElementById("special-image").alt = "スペシャル";


    // ★ 武器に対応したスタイルクラスを追加
    resultContainer.classList.add(result.className);
  } else {
    document.getElementById("weapon-name").textContent = "未定義";
    document.getElementById("weapon-image").src = "";
    document.getElementById("weapon-description").textContent = "個性的な選択肢です！";
  }
}



// リスタート
restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  selectedAnswers = [];

  // 質問画面の表示・結果画面の非表示
  questionContainer.classList.remove("hidden");
  resultContainer.classList.add("hidden");

  // 内容リセット
  document.getElementById("weapon-name").textContent = "";
  document.getElementById("weapon-image").src = "";
  document.getElementById("weapon-image").alt = "";
  document.getElementById("weapon-description").textContent = "";
  document.getElementById("sub-image").src = "";
  document.getElementById("special-image").src = "";
  document.getElementById("sub-image").alt = "";
  document.getElementById("special-image").alt = "";


  // ★前回の武器スタイルクラスをすべて削除（保持しておかないと消えない）
  resultContainer.className = "result-container hidden";  // ← ここが重要！

  displayQuestion(currentQuestion);
});

window.onload = () => {
  // 初期状態として、質問を表示・結果を非表示に
  currentQuestion = 0;
  selectedAnswers = [];

  questionContainer.classList.remove("hidden");
  resultContainer.classList.add("hidden");

  // 質問を最初から表示
  displayQuestion(currentQuestion);

  restartButton.style.backgroundColor = "#2f97ec";
  restartButton.style.setProperty('--hover-image', `url('../images-index/ink_mizuiro.png')`);
};






