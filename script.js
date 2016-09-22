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

document.getElementById('guessesLeft').innerHTML = guesses;
document.getElementById('points').innerHTML = points;
document.getElementById('wordsRemaining').innerHTML = wordArray.length;
selectWord();

function selectWord() {
		
	wordSelected = wordArray[Math.floor(Math.random() * wordArray.length)];
	
	lettersInWord = wordSelected.split("");
	letterCount = lettersInWord.length;

	for (var i = 0; i < lettersInWord.length; i++) {
		wordBank.push("_");
	}

	wordDisplay = wordBank.join(" ");

	document.getElementById('currentWord').innerHTML = wordDisplay;
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
		document.getElementById('currentWord').innerHTML = wordDisplay;	
		document.getElementById('results').innerHTML = "<i>You are correct!</i>";
	}
	else {
		document.getElementById('results').innerHTML = "<i>You are incorrect!</i>";
		guesses--;
		document.getElementById('guessesLeft').innerHTML = guesses;
	}

	if (letterCount === 0) {

		var index = wordArray.indexOf(wordSelected);
		wordArray.splice(index, 1);
		document.getElementById('wordsRemaining').innerHTML = wordArray.length;
		points++;

		if (points === 12) {
			document.getElementById('results').innerHTML = "<i>You have guessed all the words! You win! Press any key to restart!</i>"
			
			document.onkeyup = function(event) {
				location.reload();
			}
		}
		else {
			guesses = 10;
			document.getElementById('points').innerHTML = points;
			document.getElementById('guessesLeft').innerHTML = guesses;
			document.getElementById('list').insertAdjacentHTML('afterend', "<li>" + wordSelected + "</li>");
			wordBank = [];
			letterArray = [];
			showGuesses = letterArray.join();
			document.getElementById('lettersGuessed').innerHTML = showGuesses;
			document.getElementById('results').innerHTML = "<i>You guessed the word correctly! Try guessing the new word!</i>"
			selectWord();
		}
	}

	if (guesses === 0) {
		document.getElementById('results').innerHTML = "<i>You have run out of guesses. Game over. Press any key to restart!</i>"
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
	document.getElementById('lettersGuessed').innerHTML = showGuesses;
	letterGuess();

}
