text = document.querySelector(".text p"),
inputField = document.querySelector(".inputField"),
mistakeTag = document.querySelector(".mistake span"),
timeTag = document.querySelector(".time span b"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
tryButton = document.querySelector("button");

let timer,
maxTime = 90,
timeLeft = maxTime,
characterIndex = mistakes = isTyping =  0;

const randomParagraph = () => {
    //get random number
    let randomIndex = Math.floor(Math.random() * data.length);
    text.innerHTML = "";

    //splits all characters from data
    data[randomIndex].split("")
        .forEach(span => {
            let spanTag = `<span>${span}</span>`;

            //making each character as <span></span> and appending it to <p></p>
            text.innerHTML += spanTag;
        });

    //focuses the inputField 
    document.addEventListener("keydown", () => {
        inputField.focus();
    });
    document.addEventListener("click", () => {
        inputField.focus();
    });
};

const initTyping = () => {
    const characters = text.querySelectorAll("span");

    //characterIndex will only return the 1st value (0)
    let typedCharacter = inputField.value.split("")[characterIndex];
    
    //restrains the user from typing if timeLeft = 0
    if (characterIndex < characters.length - 1 && timeLeft > 0){
        //once the timer starts, it wont trigger every input
        if (!isTyping){
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }   

        //changing the color of character if correct/incorrect
        if (characters[characterIndex].innerText === typedCharacter){
            characters[characterIndex].classList.add("correct");
        } else {
            mistakes ++; //for every incorrect, mistakes increases
            characters[characterIndex].classList.add("incorrect");
        }

        //increments characterIndex either user typed correct or incorrect character
        characterIndex ++;

    } else {
        inputField.value = ""; //clears the input
        clearInterval(timer);
    }

    //set blinking class on active character
    characters.forEach(span => span.classList.remove("active")); //firstly remove the active class on pasts characters
    characters[characterIndex].classList.add("active");

    mistakeTag.innerText = mistakes;

    let cpm = characterIndex - mistakes;
    let wpm = ((cpm / 5) / (maxTime - timeLeft) * 60); //we assume that character index / word is 5
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

    mistakeTag.innerText = mistakes;
    cpmTag.innerText = cpm; //mistakes will not be counted
    wpmTag.innerText = Math.round(wpm);
};

const initTimer = () => {
    //if timeLeft is > 0 then decrease the timeLeft
    if (timeLeft > 0){
        timeLeft --;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
};

const reset = () => {
    //sets everything to default
    randomParagraph();
    timeLeft = maxTime;
    characterIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
    inputField.value = "";
    clearInterval(timer);
}

randomParagraph();
inputField.addEventListener("input", initTyping);
tryButton.addEventListener("click", reset);