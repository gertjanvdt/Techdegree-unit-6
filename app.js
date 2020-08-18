// ***** DECLARED VARIABLES *****
const overlay = document.getElementById('overlay');
const startButton = document.querySelector('.btn__reset');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const letterButton = document.querySelectorAll('button');
const ul = document.getElementById('phrase').firstElementChild;
let missed = 0;

const phrases = [
    "the lion king",
    "beauty and the beast",
    "the little mermaid",
    "the jungle book",
    "lady and the tramp",
    "pocahontas",
    "the aristocats"
]

// ***** FUNCTIONS *****

// Function to start the game or restart the game after win or lose
function startGame() {
    overlay.style.display = 'none'; 
    const pickedPhraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(pickedPhraseArray);
}

// Step 5 - Function to pick one of the phrases at random
function getRandomPhraseAsArray(arr) {
    let pickedPhrase = '';
    // Set random number to pick phrase
    const pickPhraseNumber = Math.floor(Math.random() * 7 );

    // Loop through phrase array to get phrase that is equal to random number
    for (let i = 0; i < arr.length; i++) {
        if (pickPhraseNumber === i) {
            pickedPhrase = arr[i];
        }  
    }
    // Convert picked phrase into its own array and return
    const pickedPhraseArray = pickedPhrase.split(''); 
    return pickedPhraseArray;
}

// Step 6 - Convert array of picked phrase into individual li elements inside ul
function addPhraseToDisplay (arr) {

    // Loop through picked phrase array and set as li elements (letters)
    for (let i = 0; i < arr.length; i++ ) {
        const li = document.createElement('li');
        li.innerHTML = arr[i];
        ul.appendChild(li);

        // If character is not a space add class of letter
        if (li.textContent !== ' ' ) {
            li.className = 'letter';
        }
    }
}

// Step 7 - Function to check if guessed letter is present in sentence
function checkLetter(letter) {
    // Get all li elements with class: letter
    const liLetters = document.getElementsByClassName('letter');
    // Other variables used in function 
    let letterFound = null;
    
    // Loop through all li letters and check if match with pressed letter
    for (let i = 0; i < liLetters.length; i++) {
        if (liLetters[i].textContent === letter) {
            liLetters[i].className += ' ' + 'show';
            letterFound = liLetters[i].textContent;
        }
   } 
   // If the letter is guessed return the letter or otherwise null
   return letterFound;
}

// Step 10 - Function to check if player wins or loses upon clicking the letter
function checkWin () {
    const showLetters = document.getElementsByClassName('show');
    const letters = document.getElementsByClassName('letter');
    const totalShownLetters = showLetters.length;
    const totalLetters = letters.length;

    if (missed > 4) {
        winOrLose('lose');
    } else if (totalShownLetters === totalLetters) {
        winOrLose('win');
    }   
}

// Step 10 - Function for action on win or lose result
function winOrLose (result) {
    const overlayTitle = document.querySelector('.title');
    const startButton = document.querySelector('.btn__reset');

    overlay.style.display = '';
    overlay.className = result;
    overlayTitle.innerHTML = `you ${result} the game`;
    startButton.innerHTML = 'Start New Game'

    // Reset the game after win or lose
    resetGame();
}

// Function to replace hart when guess is incorrect.
function replaceHart () {
    const harts = document.getElementsByTagName('img');

    for (let i = 0; i < harts.length; i++) {
        if (harts[i].parentElement.className === 'tries') {
            harts[i].src = 'images/lostHeart.png';
            harts[i].parentElement.className = 'used';
            break;   
        }
    }
}

// Function to reset the game
function resetGame() {
    const harts = document.getElementsByTagName('img');
    const chosenLetters = document.querySelectorAll('.chosen');
    missed = 0;

    for (let i = 0; i < harts.length; i++) {
            harts[i].src = 'images/liveHeart.png'; 
            harts[i].parentElement.className = 'tries';
    }

    while (ul.hasChildNodes()) {
        ul.removeChild(ul.firstChild);
    }

    for (let i = 0; i < chosenLetters.length; i++) {
        chosenLetters[i].className = ' ';
    } 
}

// *****  RUN THE GAME  *****
startButton.addEventListener('click', (e) => { 
        startGame();
});

// Step 8, listlen for letter click 
qwerty.addEventListener('click', (e) => {  
    if (event.target = letterButton) {
    const letter = event.target;
    letter.className = 'chosen';
    
    const letterFound = checkLetter(letter.textContent)
  
    // Step 9 
    // Increase missed variable and remove hart if letter not in sentence
        if (letterFound === null) {
            missed++
            replaceHart();
        }
    }
    // Step 10 to check if the player has wone or lost upon clicking a letter
    checkWin();
});