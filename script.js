// List of possible words
const words = ["javascript", "programming", "developer", "hangman", "algorithm", "interface"];

let selectedWord = "";
let guessedLetters = [];
let wrongGuesses = 0;
let displayWord = [];

// DOM elements
const wordDisplay = document.getElementById("wordDisplay");
const guessedLettersSpan = document.getElementById("guessedLetters");
const wrongGuessesSpan = document.getElementById("wrongGuesses");
const letterInput = document.getElementById("letterInput");
const guessBtn = document.getElementById("guessBtn");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

// Initialize game
function initGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongGuesses = 0;
    displayWord = Array(selectedWord.length).fill("_");

    wordDisplay.textContent = displayWord.join(" ");
    guessedLettersSpan.textContent = "None";
    wrongGuessesSpan.textContent = wrongGuesses;
    message.textContent = "";
    letterInput.value = "";
}

function updateDisplay() {
    wordDisplay.textContent = displayWord.join(" ");
    guessedLettersSpan.textContent = guessedLetters.length ? guessedLetters.join(", ") : "None";
    wrongGuessesSpan.textContent = wrongGuesses;
}

function checkGuess() {
    const guess = letterInput.value.toLowerCase();
    letterInput.value = "";

    if (!guess || guess.length !== 1 || !/[a-z]/.test(guess)) {
        alert("Please enter a valid letter (a-z).");
        return;
    }

    if (guessedLetters.includes(guess)) {
        alert("You already guessed that letter!");
        return;
    }

    guessedLetters.push(guess);

    if (selectedWord.includes(guess)) {
        // Reveal all occurrences of the letter
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === guess) {
                displayWord[i] = guess;
            }
        }
        message.textContent = "Good guess!";
    } else {
        wrongGuesses++;
        message.textContent = "Incorrect guess!";
    }

    updateDisplay();
    checkWin();
}

function checkWin() {
    if (!displayWord.includes("_")) {
        message.textContent = "Congratulations! You guessed the word!";
    }
}

// Event listeners
guessBtn.addEventListener("click", checkGuess);
letterInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") checkGuess();
});

restartBtn.addEventListener("click", initGame);

// Start the game on page load
initGame();
