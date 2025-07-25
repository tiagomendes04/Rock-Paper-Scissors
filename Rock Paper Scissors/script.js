// GAME LOGIC

let playerScore = 0;
let computerScore = 0;
let tieScore = 0;
let winrate = 0;
let gameInProgress = false;

const Choices = {
    ROCK: 0,
    PAPER: 1,
    SCISSORS: 2
}
const { ROCK, PAPER, SCISSORS } = Choices;

const Winners = {
    PLAYER: 0,
    COMPUTER: 1
}
const { PLAYER, COMPUTER, TIE } = Winners;

const rockButton = document.querySelector('#rock-icon');
rockButton.addEventListener('click', () => {
    if (!gameInProgress) {
        gameInProgress = true;
        playRound(ROCK);
    }
});

const paperButton = document.querySelector('#paper-icon');
paperButton.addEventListener('click', () => {
    if (!gameInProgress) {
        gameInProgress = true;
        playRound(PAPER);
    }
});

const scissorsButton = document.querySelector('#scissors-icon');
scissorsButton.addEventListener('click', () => {
    if (!gameInProgress) {
        gameInProgress = true;
        playRound(SCISSORS);
    }
});

function playRound(playerSelection) {
    const computerSelection = getComputerChoice();
    const result = determineWinner(playerSelection, computerSelection);

    if (result === PLAYER) {
        playerScore++;
        displayResult("You won!");
        resultAnimation(playerSelection, computerSelection, PLAYER);
    } else if (result === COMPUTER) {
        computerScore++;
        displayResult("You lost...");
        resultAnimation(playerSelection, computerSelection, COMPUTER);
    } else {
        tieScore++;
        displayResult("It's a tie!");
        resultAnimation(playerSelection, computerSelection, TIE);
    }

    winrate = (playerScore / (playerScore + computerScore + tieScore)) * 100;
        
    updateScoreDisplay();
    storeScores();
}

function getComputerChoice() {
    const values = Object.values(Choices);
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
}

function determineWinner(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return null; // Tie
    }
    if (
        (playerSelection === ROCK && computerSelection === SCISSORS) ||
        (playerSelection === PAPER && computerSelection === ROCK) ||
        (playerSelection === SCISSORS && computerSelection === PAPER)
    ) {
        return PLAYER;
    }
    return COMPUTER;
}

// RESULT DISPLAY

const resultDisplay = document.querySelector('.player-choices .text');

function displayResult(message) {
    resultDisplay.textContent = message;
    setTimeout(() => {
        resultDisplay.textContent = "Choose your weapon:";
    }, 2000);
}

const winsDisplay = document.querySelector('.wins-counter .count');
const lossesDisplay = document.querySelector('.losses-counter .count');
const tiesDisplay = document.querySelector('.ties-counter .count');
const winrateDisplay = document.querySelector('.winrate .count');

function updateScoreDisplay() {
    winsDisplay.textContent = playerScore;
    lossesDisplay.textContent = computerScore;
    tiesDisplay.textContent = tieScore;
    winrateDisplay.textContent = `${winrate.toFixed(2)}%`;
}

// LOCAL STORAGE

function storeScores() {
    localStorage.setItem('playerScore', playerScore);
    localStorage.setItem('computerScore', computerScore);
    localStorage.setItem('tieScore', tieScore);
    localStorage.setItem('winrate', winrate);
}

function loadScores() {
    playerScore = parseInt(localStorage.getItem('playerScore')) || 0;
    computerScore = parseInt(localStorage.getItem('computerScore')) || 0;
    tieScore = parseInt(localStorage.getItem('tieScore')) || 0;
    winrate = parseFloat(localStorage.getItem('winrate')) || 0;

    updateScoreDisplay();
}

// ANIMATIONS

function resultAnimation(playerSelection, computerSelection, winner) {
    let playerAnimation, computerAnimation = 'tie';
    if (winner === PLAYER) {
        playerAnimation = 'win';
        computerAnimation = 'loss';
    }
    else if (winner === COMPUTER) {
        playerAnimation = 'loss';
        computerAnimation = 'win';
    }

    if (playerSelection === ROCK) {
        rockButton.classList.add(playerAnimation);
    }
    else if (playerSelection === PAPER) {
        paperButton.classList.add(playerAnimation);
    }
    else {
        scissorsButton.classList.add(playerAnimation);
    }

    if (computerSelection === ROCK) {
        rockButton.classList.add(computerAnimation);
    }
    else if (computerSelection === PAPER) {
        paperButton.classList.add(computerAnimation);
    }
    else {
        scissorsButton.classList.add(computerAnimation);
    }

    setTimeout(() => {
        rockButton.classList.remove('win', 'loss', 'tie');
        paperButton.classList.remove('win', 'loss', 'tie');
        scissorsButton.classList.remove('win', 'loss', 'tie');
        gameInProgress = false;
    }, 2000);
}

// LINKS

const topIcon = document.querySelector('.top-icon');
topIcon.addEventListener('click', () => {

});

// SETUP

loadScores();
updateScoreDisplay();