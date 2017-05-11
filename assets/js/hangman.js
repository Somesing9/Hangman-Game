// Declare Variables
var wins = 0;
var losses = 0;
var lives = 9;
var theWord;
var wordSoFar = [];
var gameInProgress;
var wordBank = ['football', 'soccer', 'baseball', "inning", "quarter", "halftime", "playoffs", "all star game", "run",];

var possibleGuesses = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];
var guessesMade = [];

var wordDisplay = document.getElementById("theWordDisplay");
var guessesMadeDisplay = document.getElementById("guessesMadeDisplay");
var messageDisplay = document.getElementById("messageDisplay");
var winDisplay = document.getElementById("winDisplay");
var lossDisplay = document.getElementById("lossDisplay");
var livesDisplay = document.getElementById("livesDisplay");
var hangmanImg = document.getElementById("hangmanImg");

window.onload = function() {
    gameInProgress = false;
    messageDisplay.innerHTML = "Press Enter key to begin";

    document.onkeydown = function(event) {
        var userInput = event.key;
        if (!gameInProgress && event.keyCode === 13) {
            // theWord = pickWord();
            // buildWord();
            newGame();           
            gameInProgress = true;
            messageDisplay.innerHTML = "Enter a guess";
        } else {
            processGuess(userInput);
            displayWord();
		    updateGuessesDisplay();
		    updateDisplay();
        }

    }
};

function newGame() {
	// Pick a random word from the word bank
	theWord = wordBank[Math.floor(Math.random() * wordBank.length)];
	wordSoFar = [];
	guessesMade = [];
	lives = 9;

	// Set the variable wordSoFar to blank characters
	for (var i = 0; i < theWord.length; i++) {
        if (theWord[i] === " ") {
            wordSoFar.push(" ");
        } else {
            wordSoFar.push("_");
        }
    }
    displayWord();
    updateGuessesDisplay();
    livesDisplay.innerHTML = lives;
    updateDisplay();
}

// Function to update the image of the hangman game
function updateDisplay() {
	switch(lives) {
		case 8:
			hangmanImg.src = "assets/images/stage1.png";
			break;
		case 7:
			hangmanImg.src = "assets/images/stage2.png";
			break;
		case 6:
			hangmanImg.src = "assets/images/stage3.png";
			break;
		case 5:
			hangmanImg.src = "assets/images/stage4.png";
			break;
		case 4:
			hangmanImg.src = "assets/images/stage5.png";
			break;
		case 3:
			hangmanImg.src = "assets/images/stage6.png";
			break;
		case 2:
			hangmanImg.src = "assets/images/stage7.png";
			break;
		case 1:
			hangmanImg.src = "assets/images/stage8.png";
			break;
		case 0:
			hangmanImg.src = "assets/images/stage9.png";
			break;
		default:
			hangmanImg.src = "http://dummyimage.com/180x259/4d494d/686a82.gif&text=Hangman Board";
			break;
	}
}

// Display the word so far to the useer
function displayWord() {
    var str = "";
    for (var i = 0; i < wordSoFar.length; i++) {
        str += wordSoFar[i] + "&nbsp;";
    }
    wordDisplay.innerHTML = str;
}

// Display the user what keys have been pressed already
function updateGuessesDisplay() {
    guessesMade.sort();
    var str = "";
    for (var i = 0; i < guessesMade.length; i++) {
        str += guessesMade[i] + " ";
    }
    guessesMadeDisplay.innerHTML = str;
}

function updateMessage(theMessage) {
	messageDisplay.innerHTML = theMessage;
}


// Function checks the user input to make sure that it:
// 1. It is a letter
// 2. Is has not already been guessed
function processGuess(userInput) {
	if (!gameInProgress) {
		messageDisplay.innerHTML = "Press Enter key to begin";
		return;
	}

    // Check if the input is a letter
    if (possibleGuesses.indexOf(userInput) === -1) { 
        messageDisplay.innerHTML = "Only alphabetical keys are allowed.";
        return;
    }

    // Check to see if the letter was already guessed
    if (guessesMade.indexOf(userInput) != -1) {
        console.log("You already guessed that letter");
        messageDisplay.innerHTML = userInput + "<br>Was already guessed";
        return;
    }

    guessesMade.push(userInput);

    // Check to see if the users guess is in the word
    var guessFound = false;
    for (var i = 0; i < theWord.length; i++) {
        if (userInput === theWord[i]) {
            guessFound = true;
            wordSoFar[i] = userInput;
            messageDisplay.innerHTML = userInput + "<br>Was part of the word! Enter your next guess:"
        }
    }

    if (wordSoFar.indexOf("_") === -1) {
        wins++;
        winDisplay.innerHTML = wins;
        messageDisplay.innerHTML = "You won! Press enter for a new game!";
        gameInProgress = false;
    }

    if (!guessFound) {
        lives--;
        livesDisplay.innerHTML = lives;
        messageDisplay.innerHTML = userInput + "<br> Was not part of the word! Enter your next guess:"
    }

    if (lives < 1) {
        losses++;
        lossDisplay.innerHTML = losses;
        messageDisplay.innerHTML = "You lost game over! Press enter for a new game!";
        gameInProgress = false;
    }
}
