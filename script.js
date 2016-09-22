var lettersInWord = [];
var wordBank = [];
var wordArray = ["mario", "luigi", "link", "zelda", "samus", "littlemac", "megaman", "solidsnake", "ganon", "rygar", "toad", "ryu"];
var wordSelected;
var letterCount;
var wordDisplay;
var letterGuessed;
var letterArray = [];
var guesses = 10;
var points = 0;

//document.getElement variables

var currentWord = document.getElementById('currentWord');
var results = document.getElementById('results');
var guessesLeft = document.getElementById('guessesLeft');
var lettersGuessed = document.getElementById('lettersGuessed');
var wordsRemaining = document.getElementById('wordsRemaining');
var score = document.getElementById('points');

guessesLeft.innerHTML = guesses;
score.innerHTML = points;
wordsRemaining.innerHTML = wordArray.length;
selectWord();

function selectWord() {
		
	wordSelected = wordArray[Math.floor(Math.random() * wordArray.length)];
	
	lettersInWord = wordSelected.split("");
	letterCount = lettersInWord.length;

	for (var i = 0; i < lettersInWord.length; i++) {
		wordBank.push("_");
	}

	wordDisplay = wordBank.join(" ");

	currentWord.innerHTML = wordDisplay;
}

function letterGuess() {

	var letterFound = false;

	for (var i = 0; i < lettersInWord.length; i++) {

		if (letterGuessed === lettersInWord[i]) {
			letterCount--;
			letterFound = true;
		}
	}

	if (letterFound === true) {
		for (var i = 0; i < lettersInWord.length; i++) {

			if (lettersInWord[i] === letterGuessed) {
				wordBank[i] = letterGuessed;
				wordDisplay = wordBank.join(" ");
			}
		}
		currentWord.innerHTML = wordDisplay;	
		results.innerHTML = "<i>You are correct!</i>";
	}
	else {
		results.innerHTML = "<i>You are incorrect!</i>";
		guesses--;
		guessesLeft.innerHTML = guesses;
	}

	if (letterCount === 0) {

		var index = wordArray.indexOf(wordSelected);
		wordArray.splice(index, 1);
		wordsRemaining.innerHTML = wordArray.length;
		points++;

		if (points === 12) {
			score.innerHTML = points;
			results.innerHTML = "<i>You have guessed all the words! You win! Press any key to restart!</i>"
			document.onkeyup = function(event) {
				location.reload();
			}
		}
		else {
			guesses = 10;
			score.innerHTML = points;
			guessesLeft.innerHTML = guesses;
			document.getElementById('list').insertAdjacentHTML('afterend', "<li>" + wordSelected + "</li>");
			wordBank = [];
			letterArray = [];
			showGuesses = letterArray.join();
			lettersGuessed.innerHTML = showGuesses;
			results.innerHTML = "<i>You guessed the word correctly! Try guessing the new word!</i>"
			selectWord();
		}
	}

	if (guesses === 0) {
		results.innerHTML = "<i>You have run out of guesses. Game over. Press any key to restart!</i>"
		document.getElementById('list').insertAdjacentHTML('afterend', "<li>" + wordSelected + "</li>");		
		document.onkeyup = function(event) {
			location.reload();
		}

	}
}

document.onkeyup = function(event) {
	letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();

	letterArray.push(letterGuessed);
	showGuesses = letterArray.join();
	lettersGuessed.innerHTML = showGuesses;
	letterGuess();

}
