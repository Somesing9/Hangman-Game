var computerPick;
var wins = document.getElementById('wins');
var losses = document.getElementById('losses');
var lives = document.getElementById('lives');
var lettersGuessed = document.getElementById("letters-guessed");
var firstGame = true;
var gameOver = false;
startGame();

function startGame() {
    if (firstGame) {
        wins.innerHTML = 0;
        losses.innerHTML = 0;
        lives.innerHTML = 10;
        lettersGuessed.innerHTML = "<br />";
        firstGame = false;
    } else {
        lives.innerHTML = 10;
        lettersGuessed.innerHTML = "<br />";
    }
    computerPick = getComputerPick();
    console.log(computerPick);


    document.onkeydown = function(event) {
        var userInput = event.key;
        checkGuess(userInput);
    }
}


// Get the letter to guess
function getComputerPick() {
    var possible = "abcdefghijklmnopqrstuvwxyz";
    return possible.charAt(Math.floor(Math.random() * possible.length));
}

function checkGuess(userGuess) {
    if (userGuess === computerPick.toString()) {
        var numberOfWins = parseInt(wins.innerHTML);
        wins.innerHTML = ++numberOfWins;
        alert("You WON! " + userGuess + "  was the correct guess!")
        startGame();
    } else {
        var livesLeft = parseInt(lives.innerHTML)
        lives.innerHTML = --livesLeft;
        lettersGuessed.innerHTML += userGuess + "  |  ";
        if (livesLeft < 1) {
            var numberOfLosses = parseInt(losses.innerHTML);
            losses.innerHTML = ++numberOfLosses;
            startGame();
        }
    }
}
