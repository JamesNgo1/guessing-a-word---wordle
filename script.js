//retrieve the specific elements of htmml to manipulate elements 
const inputs = document.querySelector(".inputs");
const resetBtn = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const wrongLetter = document.querySelector(".wrong-letter span");
const typingInput = document.querySelector(".typing-input");
const guessLeft = document.querySelector(".guess-left span");

//initializing variables
let randObj;
let word;
let incorrects = [];
let corrects = [];
let maxGuesses

/**
 * randomWord() function that executes to pick a random word
 * 
 */
function randomWord(){
    //variable holds random object from wordList and holds word property
    randObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = randObj.word;
   
    //default guess and list for correct / in each start of game
    maxGuesses = 8; 
    incorrects = [];
    corrects = [];

    //Getting length of selected word and adding the amount of text inputs
    let html = "";
    for(let i = 0; i < word.length; i++){
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;

    //display the certain text on screen
    hint.innerText = randObj.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrects;

}//end of randomWord function

randomWord(); //call the function to start the game



function initGame(e){
    let key = e.target.value;
    //if is in the alphabet and not included in the correct or incorrect list
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`) && !corrects.includes(key)){
        if(word.includes(key)){//if chosen key includes the word 
            //loops through the selected word if letter match certain key
            for(let i = 0; i < word.length;i++){
                if(word[i] === key){
                    //change thee direct input box
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        }else{
            maxGuesses--;
            incorrects.push(` ${key}`);
        }
        wrongLetter.innerText = incorrects;
        guessLeft.innerText = maxGuesses;
    }
    //empty the input once the user enter the key
    typingInput.value = "";

    //delay to have word fulfill boxes
    setTimeout(() => {
        if(corrects.length === word.length){
            alert(`congrats! you found the word ${word.toUpperCase()}`);
            randomWord();
        }else if(maxGuesses < 1){
            alert("game over");
            for(let i = 0; i < word.length; i++){
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    });
  
}//end of initGame function


//button event listener of recalling random word function
resetBtn.addEventListener("click", randomWord);


typingInput.addEventListener("input", initGame);

//input from phone device or keyboard press
document.addEventListener("keydown", () => typingInput.focus());
inputs.addEventListener("click", () => typingInput.focus());


