const inputs = document.querySelector(".inputs");
const resetBtn = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const typingInput = document.querySelector(".typing-input");


let randObj;
let word;

function randomWord(){
    randObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = randObj.word;
    console.log(word);

    //Getting length of selected word and adding the amount of text inputs
    let html = "";
    for(let i = 0; i < word.length; i++){
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;

    //now time to provide the user the word's hint
    hint.innerHTML = randObj.hint;
}//end of randomWord function
randomWord();



function initGame(e){
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/)){
        console.log(key);
        if(word.includes(key)){//if chosen key includes the word 
            //loops through the selected word if letter match certain key
            for(let i = 0; i < word.length;i++){
                if(word[i] === key){
                    //change thee direct input box
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        }else{
            console.log("letter not found");
        }
    }
    //empty the input once the user enter the key
    typingInput.value = "";

}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
document.addEventListener("keydown", () => typingInput.focus());


