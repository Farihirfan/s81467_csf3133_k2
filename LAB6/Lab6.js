// Questions Array: stores questions, options, and correct answer
const questions = [
    {
        question: "Which HTML tag is used to define an internal CSS style sheet?",
        options: ["<css>", "<style>", "<script>", "<link>"],
        answer: "<style>"
    },
    {
        question: "Which CSS property is used to change the background color?",
        options: ["color", "bgcolor", "background-color", "background-style"],
        answer: "background-color"
    },
    {
        question: "Which keyword is used to declare a block-scoped variable in JavaScript?",
        options: ["var", "let", "define", "int"],
        answer: "let"
    },
    {
        question: "Which semantic HTML tag is best used for introductory content or navigation?",
        options: ["<header>", "<bottom>", "<section>", "<span>"],
        answer: "<header>"
    },
    {
        question: "Which JavaScript method repeats a function at a set time interval?",
        options: ["setTimeout()", "setInterval()", "repeatTimer()", "startLoop()"],
        answer: "setInterval()"
    }
];

let quizQuestions = [];
let currentIndex = 0;
let score = 0;
let selectedAnswer = "";
let timeLeft = 15;
let timerId = null;

const questionNumberEl = document.getElementById("question-number");
const timerEl = document.getElementById("timer");
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");
const feedbackSectionEl = document.getElementById("feedback-section");
const feedbackMessageEl = document.getElementById("feedback-message");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreTextEl = document.getElementById("score-text");

// Randomly shuffles the questions array
function shuffleQuestions() {
    quizQuestions = questions.slice();
    for (let i = quizQuestions.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const temp = quizQuestions[i];
        quizQuestions[i] = quizQuestions[randomIndex];
        quizQuestions[randomIndex] = temp;
    }
}

// Starts countdown timer for the current question
function startTimer() {
    clearInterval(timerId);
    timeLeft = 15;
    timerEl.textContent = "Time: " + timeLeft + "s";

    timerId = setInterval(function () {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft + "s";

        if (timeLeft <= 0) {
            clearInterval(timerId);
            disableOptions();
            highlightCorrectAnswer();

            const currentQuestion = quizQuestions[currentIndex];
            feedbackMessageEl.textContent = "Time's up! Correct answer: " + currentQuestion.answer;
            feedbackSectionEl.className = "feedback wrong-msg";

            submitBtn.classList.add("hidden");
            nextBtn.classList.remove("hidden");
        }
    }, 1000);
}

// Displays current question and answer options
function displayQuestion() {
    const currentQuestion = quizQuestions[currentIndex];
    selectedAnswer = "";

    questionNumberEl.textContent = "Question " + (currentIndex + 1) + " of " + quizQuestions.length;
    questionTextEl.textContent = currentQuestion.question;
    optionsContainerEl.innerHTML = "";

    feedbackMessageEl.textContent = "";
    feedbackSectionEl.className = "feedback hidden";

    submitBtn.disabled = true;
    submitBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
    restartBtn.classList.add("hidden");

    for (let i = 0; i < currentQuestion.options.length; i++) {
        const optionText = currentQuestion.options[i];
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "option-btn";
        btn.textContent = optionText;

        btn.onclick = function () {
            const allButtons = document.querySelectorAll(".option-btn");
            for (let j = 0; j < allButtons.length; j++) {
                allButtons[j].classList.remove("selected");
            }
            btn.classList.add("selected");
            selectedAnswer = optionText;
            submitBtn.disabled = false;
        };

        optionsContainerEl.appendChild(btn);
    }
}

function disableOptions() {
    const allButtons = document.querySelectorAll(".option-btn");
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].disabled = true;
    }
}

function highlightCorrectAnswer() {
    const correctAnswer = quizQuestions[currentIndex].answer;
    const allButtons = document.querySelectorAll(".option-btn");
    for (let i = 0; i < allButtons.length; i++) {
        if (allButtons[i].textContent === correctAnswer) {
            allButtons[i].classList.add("correct");
        }
    }
}

function updateScoreDisplay() {
    scoreTextEl.textContent = "Score: " + score + " / " + quizQuestions.length;
}

// Checks selected answer and updates score
function checkAnswer() {
    if (selectedAnswer === "") {
        return;
    }

    clearInterval(timerId);
    disableOptions();

    const currentQuestion = quizQuestions[currentIndex];
    const allButtons = document.querySelectorAll(".option-btn");

    for (let i = 0; i < allButtons.length; i++) {
        if (allButtons[i].textContent === currentQuestion.answer) {
            allButtons[i].classList.add("correct");
        } else if (allButtons[i].textContent === selectedAnswer) {
            allButtons[i].classList.add("wrong");
        }
    }

    if (selectedAnswer === currentQuestion.answer) {
        score++;
        feedbackMessageEl.textContent = "Correct! Good job.";
        feedbackSectionEl.className = "feedback correct-msg";
    } else {
        feedbackMessageEl.textContent = "Incorrect! Correct answer: " + currentQuestion.answer;
        feedbackSectionEl.className = "feedback wrong-msg";
    }

    updateScoreDisplay();
    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
}

// Moves to next question, resets timer, and updates score
function nextQuestion() {
    updateScoreDisplay();
    currentIndex++;

    if (currentIndex < quizQuestions.length) {
        displayQuestion();
        startTimer();
    } else {
        clearInterval(timerId);
        questionNumberEl.textContent = "Quiz Finished";
        timerEl.textContent = "Time: 0s";
        questionTextEl.textContent = "You completed the quiz!";
        optionsContainerEl.innerHTML = "";
        feedbackMessageEl.textContent = "Your final score is " + score + " out of " + quizQuestions.length + ".";
        feedbackSectionEl.className = "feedback correct-msg";
        scoreTextEl.textContent = "Final Score: " + score + " / " + quizQuestions.length;

        submitBtn.classList.add("hidden");
        nextBtn.classList.add("hidden");
        restartBtn.classList.remove("hidden");
    }
}

// Starts quiz: shuffles questions, displays first question, and starts timer
function startQuiz() {
    currentIndex = 0;
    score = 0;
    shuffleQuestions();
    updateScoreDisplay();
    displayQuestion();
    startTimer();
}

startQuiz();