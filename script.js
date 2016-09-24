var lettersInWord = [];
var wordBank = [];
var wordArray = ["mario", "luigi", "link", "zelda", "samus", "littlemac", "megaman", "solidsnake", "ganon", "rygar", "toad", "ryu"];
var wordSelected;
var letterCount;
var letterFound;
var wordDisplay;
var letterGuessed;
var firstClick = true;
var letterArray = [];
var guesses = 10;
var points = 0;
var chances = 3;
var arrayNum;

//document.getElement variables

var currentWord = document.getElementById('currentWord');
var results = document.getElementById('results');
var guessesLeft = document.getElementById('guessesLeft');
var lettersGuessed = document.getElementById('lettersGuessed');
var wordsRemaining = document.getElementById('wordsRemaining');
var score = document.getElementById('points');
var chancesLeft = document.getElementById('chancesLeft');
var hintSpan = document.getElementById('hintSpan');

//hint descriptions 

var hints = ["The iconic plumber", "The plumber's brother", "The elvish hero garbed in green", "The princess in distress", "Alien fighting heroine", "Mike Tyson's challenger", "The little blue android", "Military super soldier", "The villain of the golden cartridge", "The warrior of Argus", "'Our princess is in another castle.'", "Nintendo's Ninja" ]

guessesLeft.innerHTML = guesses;
score.innerHTML = points;
wordsRemaining.innerHTML = wordArray.length;
chancesLeft.innerHTML = chances;

selectWord();

function selectWord() {

	arrayNum = Math.floor(Math.random() * wordArray.length);
	
	wordSelected = wordArray[arrayNum];
	hintSpan.innerHTML = hints[arrayNum];
	console.log(wordSelected);
	console.log(hints[arrayNum]);
	
	lettersInWord = wordSelected.split("");
	letterCount = lettersInWord.length;

	for (var i = 0; i < lettersInWord.length; i++) {
		wordBank.push("_");
	}

	wordDisplay = wordBank.join(" ");



	currentWord.innerHTML = wordDisplay;
}

function letterGuess() {

	letterFound = false;
	notInArray = null;

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
		hints.splice(index, 1);
		wordsRemaining.innerHTML = wordArray.length;
		points++;

		if (points === 12) {
			score.innerHTML = points;
			results.innerHTML = "<i>You have guessed all the words! You win! Press any key to restart!</i>"
			results.className += " blink2";
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
		chances--;
		chancesLeft.innerHTML = chances;
		if (chances === 0) {
			results.innerHTML = "<i>You have run out of chances. Game over. Press any key to restart!</i>"
			document.getElementById('list').insertAdjacentHTML('afterend', "<li>" + wordSelected + "</li>");		
			document.onkeyup = function(event) {
			location.reload();
			}
		}
		else {
			guesses = 10;
			guessesLeft.innerHTML = guesses;
			wordBank = [];
			letterArray = [];
			showGuesses = letterArray.join();
			lettersGuessed.innerHTML = showGuesses;
			results.innerHTML = "<i>You have run out of guesses. Try guessing the next word.</i>";
			selectWord();
		}
	}
}


function processLetter() {

		letterArray.push(letterGuessed);
		console.log(letterArray);
		showGuesses = letterArray.join();
		lettersGuessed.innerHTML = showGuesses;
		letterGuess();
}

function letterCheck() {

	var inArray = false;

	console.log('Checking letter');
	for (var i = 0; i < letterArray.length; i++) {
		if (letterGuessed == letterArray[i]) {
			console.log('Letter found in array');
			results.innerHTML = "<i>You already guessed that letter. Guess again.</i>";
			inArray = true;
		}
	}
	
	if (inArray === false) {
		processLetter();
	}
	else {
		console.log("Letter already used");
	}
}

document.onkeyup = function() {

	letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	console.log(letterGuessed);

	if (firstClick === true) {
		processLetter();
		firstClick = false;
		console.log(firstClick);
	}
	else {
		letterCheck();
	}
}
