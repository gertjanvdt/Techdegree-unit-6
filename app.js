// DECLARED VARIABLES
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;

const phrases = [
    "The Lion King",
    "Beauty and the Beast",
    "The Little Mermaid",
    "The Jungle Book",
    "Lady and the Tramp"
]

// START GAME
const overlay = document.getElementById('overlay');
overlay.addEventListener('click', (e) => {
    
    if (event.target.className === 'btn__reset') {
        overlay.style.display = 'none';
    }
});

// FUNCTIONS

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

addPhraseToDisplay(pickedPhraseArray);

// Step 7
function checkLetter(letter) {
    // Get all li elements with class: letter
    const liLetters = document.getElementsByClassName('letter');
    
    // Loop through all li letters and check if match with pressed letter
    for (let i = 0; i < liLetters.length; i++) {
        if (liLetters.textContent[i] === letter) {
            liLetters.className[i] = 'show';
            const guessedLetter = liLetters[i];
            return guessedLetter;
        } else {
            return null;
        }
   } 
}

// Step 8
qwerty.addEventListener('click', (e) => {
    if (event.target.tagName === 'button') {
        const letter = event.target;
        letter.className = 'chosen';
        checkLetter(letter.textContent);
        console.log('letter clicked')
        
    } else {console.log('if not working');}
});



