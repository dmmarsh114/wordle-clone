/*
    TODO:
    * better user interface: type into tiles, not submit box
    * error handling: is a valid word
    * randomly generate new word
    * improve styling
*/

let word;
let currentRow;
let gameIsRunning;

let inputID = document.getElementById('guess-box');
let button = document.getElementById('guess-button');
button.addEventListener('click', submitGuess);

let message = document.getElementById('message');
let newGameContainer = document.getElementById('new-game-container');

newGame();

function newGame() 
{
    newGameContainer.style.visibility = 'hidden';
    word = newWord();
    currentRow = 0;
    message.innerHTML = '';
    gameIsRunning = true;
    buildGameBoard();
}

function newWord() 
{
    let possibleWords = ['boobs', 'cocks', 'penis', 'vagin'];
    let randomIndex = Math.floor(Math.random()*possibleWords.length);
    return possibleWords[randomIndex];
}

function buildGameBoard() 
{
    let rowContainer = document.getElementById('row-container');

    // clear current game board
    while(rowContainer.firstChild) { rowContainer.removeChild(rowContainer.lastChild); }
    
    for (let i = 0; i < 6; i++)
    {
        let newRow = document.createElement('div');
        newRow.classList.add('row');
        newRow.id = 'row ' + i.toString();
    
        let newTileContainer = document.createElement('div');
        newTileContainer.classList.add('tile-container');
        
        for (let j = 0; j < 5; j++)
        {
            let newTile = document.createElement('div');
            newTile.id = `r${i} t${j}`;
            newTile.classList.add('tile');
            
            let letterSpace = document.createElement('p');
            newTile.appendChild(letterSpace);    
            newTileContainer.appendChild(newTile);
        }
    
        newRow.appendChild(newTileContainer);
        rowContainer.appendChild(newRow);
    }
}

function submitGuess() 
{
    if (gameIsRunning)
    {
        console.clear();
    
        if (currentRow <= 5)
        {
            message.innerHTML = '';
            if (tryGuess()) { currentRow++; }
        }
        else
        {
            message.innerHTML = `Out of guesses! The word was: ${word}`;
            endGame();
        }
    }

    inputID.value = '';
}

function tryGuess() 
{
    console.log(`current row: ${currentRow}`);
    let guess = inputID.value;
    if (guess.length == 5)
    {
        console.log('guess: ' + guess);

        updateGameBoard(guess);

        if (guess == word) 
        { 
            message.innerHTML = 'Correct! You are a master of Wordle'; 
            endGame();
        }

        return true;            
    }
    else 
    {
        message.innerHTML = 'You must guess a 5 letter word';
        return false;
    }
}

function updateGameBoard(guess) 
{
    for (let i = 0; i < guess.length; i++)
    {
        let currentTile = document.getElementById(`r${currentRow} t${i}`);
        currentTile.firstChild.innerHTML = guess[i];
        if (guess[i] == word[i]) { currentTile.classList.add('correct'); }
        else if (word.includes(guess[i])) { currentTile.classList.add('includes'); }
        else { currentTile.classList.add('incorrect'); }
    }
}

function endGame() 
{
    gameIsRunning = false;

    newGameContainer.style.visibility = 'visible'
    let newGameBtn = document.getElementById('new-game-btn');
    newGameBtn.addEventListener('click', newGame);
}
