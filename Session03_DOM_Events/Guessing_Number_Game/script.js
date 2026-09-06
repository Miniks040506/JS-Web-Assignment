// DOM - Document Object Model
// DOM is a programming interface for HTML and XML documents.
// DOM represents the HTML page so that programs can change the document structure, style and content.
// The DOM can be used to access and change the content, style and behavior of a document.

// document.querySelector -> tag, class, id -> css(class . | id #)
// .textContent -> return text content cua cai tag, id, class (element)
// .value -> return value of selected element

// document.querySelector('.guess').value = 10;
// document.querySelector('.message').textContent = 'KN Bel';

// Math : .trunc -> remove any fractional digits
// .floor -> tron xuong .ceil -> tron len .round -> tron gan nhat
// .random -> return a random number 0(inclusive) - 1(exclusive) [0,1)

let secretNumber = Math.trunc(Math.random() * 100) + 1; // [0,100)
let score = 100;
let highscore = 0;

const displayMessage = (message) => {
    document.querySelector('.message').textContent = message;
}

// click button -> event 
// .addEventListener(): 2 arguments: event type, callback function

//The event type contains: click, mouseover, mouseout, keypress, keydown, keyup, scroll, resize, load, unload, beforeunload, error, abort, loadstart, progress, loadend, ...
document.querySelector('.check').addEventListener('click', () => {
    const guess = Number(document.querySelector('.guess').value);
    
    if (!guess) {
        displayMessage('⛔ No number!');
    } else if (guess === secretNumber) {
        displayMessage('🎉 Correct number!');
        document.querySelector('.number').textContent = secretNumber;
        
        // .style thay doi style
        
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';
        
        if (score > highscore) {
            highscore = score;
            document.querySelector('.number').textContent = highscore;
        }
        
    } else if (guess !== secretNumber) {
        if (score > 5) {
            displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
            score -= 5;
            document.querySelector('.score').textContent = score;
        } else {
            displayMessage('💥 You lost the game!');
            document.querySelector('.score').textContent = 0;
        }
    }
})

document.querySelector('.again').addEventListener('click', () => {
    score = 100;
    secretNumber = Math.trunc(Math.random() * 100) + 1;
    
    displayMessage('Start guessing...');
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';
    
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
})