let text = document.getElementById("text");
let targetText = "Lorem ipsum dolor sit amet".toLocaleLowerCase();
text.innerHTML = targetText;
let currentChar = 0;
let typed = "";
let errors = 0;
let errorsText = document.getElementById("errors");
let startingTimestamp = 0;
let finishTimestamp;
let totalSeconds;
let timeText = document.getElementById("timer");
let wpm = document.getElementById("wpm");
let resetBtn = document.getElementById("reset");

document.addEventListener("keydown", function(e){
    if(currentChar < targetText.length){
        if(e.key == targetText[currentChar]){
            if(startingTimestamp == 0){
                startingTimestamp = Date.now();
            }
            typed += '<span class="typed">' + targetText[currentChar] + '</span>';
            text.innerHTML = typed + targetText.slice(currentChar+1,targetText.length);
            currentChar++;
            if(currentChar > 0){
                timeText.innerHTML = "...";
            }
            if(currentChar == targetText.length){
                finishTimestamp = Date.now();
                totalSeconds = (finishTimestamp - startingTimestamp)/1000;
                timeText.innerHTML = "Timer: "+totalSeconds+"s";
                wpm.innerHTML = "Words per minute: " + ((60 * targetText.match(/(\w+)/g).length) / totalSeconds).toFixed(2) ;
            }
        }else{
            errors += 1;
            errorsText.innerHTML = "Errors: " + errors;
        }
    }
});

resetBtn.addEventListener("click", function(){
    currentChar = 0;
    typed = "";
    errors = 0;
    startingTimestamp = 0;
    finishTimestamp = 0;
    totalSeconds = 0;
    errorsText.innerHTML = "Errors: 0";
    timeText.innerHTML = "Type the first character to start."
    wpm.innerHTML = "Words per minute: 0";
    text.innerHTML = targetText;
});
