const quizData = [
    { question: "Kolik nohou má kůň?", answers: ["3", "4", "5"], correct: "4" },
    { question: "Jak se jmenuje nejrychlejší dostihový kůň?", answers: ["Secretariat", "Black Caviar", "Seabiscuit"], correct: "Secretariat" },
    { question: "Jak dlouho trvá březost klisny?", answers: ["6 měsíců", "11 měsíců", "13 měsíců"], correct: "11 měsíců" }
];

let currentQuestion = 0;
let correctCount = 0;
let incorrectCount = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextButton = document.getElementById("next-button");
const scoreEl = document.getElementById("score");

function loadQuestion() {
    const questionData = quizData[currentQuestion];
    questionEl.textContent = questionData.question;
    answersEl.innerHTML = "";

    questionData.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => checkAnswer(answer);
        answersEl.appendChild(button);
    });

    nextButton.disabled = true;
}

function checkAnswer(answer) {
    const correctAnswer = quizData[currentQuestion].correct;
    const buttons = answersEl.querySelectorAll("button");

    buttons.forEach(btn => {
        if (btn.textContent === correctAnswer) {
            btn.classList.add("correct");
        } else if (btn.textContent === answer) {
            btn.classList.add("incorrect");
        }
        btn.disabled = true;
    });

    if (answer === correctAnswer) {
        correctCount++;
    } else {
        incorrectCount++;
    }

    scoreEl.textContent = `Správně: ${correctCount} | Špatně: ${incorrectCount}`;
    nextButton.disabled = false;
}

nextButton.onclick = () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        questionEl.textContent = "Kvíz dokončen!";
        answersEl.innerHTML = "";
        nextButton.style.display = "none";
    }
};

loadQuestion();
