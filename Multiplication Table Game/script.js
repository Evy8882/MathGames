var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

var correctSound = document.getElementById("correct-sound");
var wrongSound = document.getElementById("wrong-sound");
var gameOverSound = document.getElementById("gameover-sound"); 

document.getElementById("startButton").onclick = function() {
    document.getElementById("intro-screen").style.display = "none";
    document.getElementById("container").style.display = "block";

    
    startGame();
};

document.getElementById("startreset").onclick = function() {
    if (playing == true) {
        resetGame();
    } else {
        startGame();
    }
};

for (var i = 1; i <= 4; i++) {
    document.getElementById("box" + i).onclick = function() {
        if (playing == true) {
            if (this.innerHTML == correctAnswer) {
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                hide("wrong");
                show("correct");
                setTimeout(function() {
                    hide("correct");
                }, 1000);

                correctSound.play();
                generateQA();
            } else {
                hide("correct");
                show("wrong");
                setTimeout(function() {
                    hide("wrong");
                }, 1000);

                wrongSound.play();
            }
        }
    };
}

function startGame() {
    playing = true;
    score = 0;
    document.getElementById("scorevalue").innerHTML = score;
    show("timeremaining");
    timeremaining = 60;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    hide("gameOver");
    document.getElementById("startreset").innerHTML = "Reset Game";
    
    startCountdown();
    generateQA();
}

function resetGame() {
    playing = false;
    hide("timeremaining");
    hide("correct");
    hide("wrong");
    show("gameOver");
    document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";
    document.getElementById("startreset").innerHTML = "Start Game";
 
    score = 0;
    document.getElementById("scorevalue").innerHTML = score;
    timeremaining = 60;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    clearInterval(action); 
}

function startCountdown() {
    action = setInterval(function() {
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if (timeremaining == 0) {
            stopCountdown();
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
            
            gameOverSound.play(); 
        }
    }, 1000);
}

function stopCountdown() {
    clearInterval(action);
}

function show(Id) {
    document.getElementById(Id).style.display = "block";
}

function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

function generateQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + " x " + y;

    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer; 
    
    var answers = [correctAnswer];
    for (var i = 1; i <= 4; i++) {
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random())); 
            } while (answers.indexOf(wrongAnswer) > -1); 

            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}
