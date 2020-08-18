// ***** DECLARED VARIABLES *****
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const letterButton = document.querySelectorAll('button');
let missed = 0;

const phrases = [
    "the lion king",
    "beauty and the beast",
    "the little mermaid",
    "the jungle book",
    "lady and the tramp"
]

// ***** FUNCTIONS *****

// Step 5
function getRandomPhraseAsArray(arr) {
    let pickedPhrase = '';
    // Set random number to pick phrase
    const pickPhraseNumber = Math.floor(Math.random() * 5 );

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

const pickedPhraseArray = getRandomPhraseAsArray(phrases);

// Step 6
function addPhraseToDisplay (arr) {
    // Get ul element.
    const ul = document.getElementById('phrase').firstElementChild;

    // Loop through picked phrase array (letters)
    for (let i = 0; i < arr.length; i++ ) {
        const li = document.createElement('li');
        li.innerHTML = arr[i];
        ul.appendChild(li);

        // If character is not a space add class
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

    if (missed >= 5) {
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
    overlayTitle.innerHTML = `YOU ${result} THE GAME`;
    startButton.innerHTML = 'Start New Game'
}


// *****  START GAME  *****

const overlay = document.getElementById('overlay');
overlay.addEventListener('click', (e) => {
    
    if (event.target.className === 'btn__reset') {
        overlay.style.display = 'none';
    }
});

addPhraseToDisplay(pickedPhraseArray);

// Step 8, litlen for letter click and 
qwerty.addEventListener('click', (e) => {  
    if (event.target = letterButton) {
    const letter = event.target;
    letter.className = 'chosen';
    
    const letterFound = checkLetter(letter.textContent)
  
    // Step 9 
    // Increase missed variable if letter not result
        if (letterFound === null) {
            missed++
        }
    }
    // Step 10
    checkWin();
});









