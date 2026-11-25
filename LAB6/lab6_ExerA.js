// Game state variables
let started = false;
let wins = 0;
let losses = 0;
let draws = 0;
let round = 0;
let results = [];

// Validates name and starts the game
function startGame() {
    let name = document.getElementById("playerName").value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    // Reset previous round data first, then start the game
    resetGame();
    started = true;

    document.getElementById("playerName").value = name;
    document.getElementById("welcomeMessage").innerHTML = "Welcome, " + name + "!";
    document.getElementById("startTime").innerHTML = "Started on: " + new Date();
}

// Randomly selects rock, paper, or scissors for computer
function getComputerChoice() {
    let options = ["rock", "paper", "scissors"];
    let index = Math.floor(Math.random() * 3);
    return options[index];
}

// Plays one round and updates UI, score, and history
function playRound(playerChoice) {
    if (!started) {
        alert("Click Start Game first.");
        return;
    }

    let computerChoice = getComputerChoice();
    round++;

    // Update both images
    document.getElementById("playerImg").src = playerChoice + ".png";
    document.getElementById("computerImg").src = computerChoice + ".png";

    let outcome = "";
    let resultParagraph = document.getElementById("result");

    // Decide winner using if...else
    if (playerChoice === computerChoice) {
        outcome = "Draw";
        draws++;
        resultParagraph.style.color = "grey";
        resultParagraph.innerHTML = "Round " + round + ": Draw!";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        outcome = "Win";
        wins++;
        resultParagraph.style.color = "green";
        resultParagraph.innerHTML = "Round " + round + ": You Win!";
    } else {
        outcome = "Lose";
        losses++;
        resultParagraph.style.color = "red";
        resultParagraph.innerHTML = "Round " + round + ": You Lose!";
    }

    // Update scoreboard
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Store result in array and add a new row to history table using innerHTML +=
    results.push(outcome);
    document.getElementById("historyBody").innerHTML +=
        "<tr><td>" + round + "</td><td>" + playerChoice + "</td><td>" + computerChoice + "</td><td>" + outcome + "</td></tr>";
}

// Loops through results to display rounds played and win percentage
function showSummary() {
    if (results.length === 0) {
        document.getElementById("summaryText").innerHTML = "You played 0 rounds and won 0%.";
        return;
    }

    let totalWins = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            totalWins++;
        }
    }

    let winPercent = Math.round((totalWins / results.length) * 100);
    document.getElementById("summaryText").innerHTML =
        "You played " + results.length + " rounds and won " + winPercent + "%.";
}

// Resets scores, results array, table, and result display
function resetGame() {
    started = false;
    wins = 0;
    losses = 0;
    draws = 0;
    round = 0;
    results = [];

    document.getElementById("wins").innerHTML = "0";
    document.getElementById("losses").innerHTML = "0";
    document.getElementById("draws").innerHTML = "0";
    document.getElementById("historyBody").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("summaryText").innerHTML = "";
    document.getElementById("playerImg").src = "ferrari.jpg";
    document.getElementById("computerImg").src = "petronas.jpg";
}