let text = document.getElementById("text");
let targetText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque malesuada tortor. Suspendisse non dictum nisi. Vestibulum ullamcorper dapibus dictum. Quisque fringilla sollicitudin tortor ut euismod. Cras tincidunt ante at viverra maximus. Phasellus commodo interdum magna, et accumsan odio dictum id. Vestibulum et tincidunt justo. Cras non pellentesque augue. Proin sodales enim at lectus viverra, ut rhoncus eros ornare. Nunc aliquet orci lobortis magna rhoncus, ut tincidunt leo commodo. Nulla eget ante sed nulla varius volutpat vel ut velit.".toLocaleLowerCase();
targetText = targetText.replace(/[^\p{L}\p{N}\p{Z}]/gu, '');
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
        if(targetText[currentChar] == " "){
            typed += '<span class="typed">' + targetText[currentChar] + '</span>';
            text.innerHTML = typed + targetText.slice(currentChar+1,targetText.length);
            currentChar++;
        }
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
            if (currentChar > 0){
            errors += 1;
            errorsText.innerHTML = "Errors: " + errors;
            }
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
