let score = 0;
let timer;
let timeLeft;
let currentQuestion;
let gameStarted = false;

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("start-btn").addEventListener("click", startGame);
    document.getElementById("check-btn").addEventListener("click", checkAnswer);
    document.getElementById("reset-btn").addEventListener("click", resetGame);
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateComplexQuestion() {
    let difficulty = document.getElementById("difficulty").value;
    let num1, num2, num3, num4, num5;
    let question, correctAnswer;

    if (difficulty === "easy") {
        num1 = getRandomInt(1, 10);
        num2 = getRandomInt(1, 10);
        num3 = getRandomInt(1, 5);
        question = `${num1} + ${num2} - ${num3}`;
        correctAnswer = num1 + num2 - num3;
    } else if (difficulty === "medium") {
        num1 = getRandomInt(1, 20);
        num2 = getRandomInt(1, 20);
        num3 = getRandomInt(1, 10);
        num4 = getRandomInt(1, 10);
        question = `( ${num1} + ${num2} ) * ${num3} - ${num4}`;
        correctAnswer = (num1 + num2) * num3 - num4;
    } else {
        num1 = getRandomInt(1, 50);
        num2 = getRandomInt(1, 30);
        num3 = getRandomInt(1, 20);
        num4 = getRandomInt(1, 10);
        num5 = getRandomInt(1, 5); 

        question = `(( ${num1} + ${num2} ) * ${num3}) - (${num4} / ${num5})`;
        correctAnswer = eval(question);
    }

    return {
        question: question,
        correctAnswer: Math.round(correctAnswer * 100) / 100
    };
}

function startGame() {
    score = 0;
    timeLeft = 300;
    gameStarted = true;

    document.getElementById("score").textContent = " Pontuação: 0";
    document.getElementById("timer").textContent = ` Tempo: 00:00`;
    document.getElementById("result").textContent = "";
    document.getElementById("answer").value = "";
    document.getElementById("answer").disabled = false;
    document.getElementById("check-btn").disabled = false;
    document.getElementById("reset-btn").disabled = false;
    document.getElementById("start-btn").disabled = true;
    
    newQuestion();
    startTimer();
}

function newQuestion() {
    if (!gameStarted) return;

    currentQuestion = generateComplexQuestion();
    document.getElementById("question").textContent = currentQuestion.question;
}

function checkAnswer() {
    let userAnswer = document.getElementById("answer").value;
    let resultElement = document.getElementById("result");

    if (isNaN(userAnswer) || userAnswer.trim() === "") {
        resultElement.textContent = "Digite um número válido!";
        resultElement.style.color = "orange";
        return;
    }

    userAnswer = parseFloat(userAnswer);

    if (userAnswer === currentQuestion.correctAnswer) {
        score += 10;
        resultElement.textContent = " Resposta correta!";
        resultElement.style.color = "green";
    } else {
        resultElement.textContent = ` Resposta incorreta! Resposta certa: ${currentQuestion.correctAnswer}`;
        resultElement.style.color = "red";
    }

    document.getElementById("score").textContent = ` Pontuação: ${score}`;
    document.getElementById("answer").value = "";
    timeLeft = 10;
    newQuestion();
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            document.getElementById("timer").textContent = ` Tempo: ${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
        } else {
            clearInterval(timer);
            document.getElementById("result").textContent = " Tempo esgotado! Reinicie o jogo.";
            document.getElementById("result").style.color = "red";
            document.getElementById("answer").disabled = true;
            document.getElementById("check-btn").disabled = true;
        }
    }, 1000);
}

function resetGame() {
    clearInterval(timer);
    document.getElementById("question").textContent = "Clique em 'Iniciar Jogo' para começar!";
    document.getElementById("result").textContent = "";
    document.getElementById("score").textContent = " Pontuação: 0";
    document.getElementById("timer").textContent = " Tempo: --:--";
    document.getElementById("answer").value = "";
    document.getElementById("answer").disabled = true;
    document.getElementById("check-btn").disabled = true;
    document.getElementById("reset-btn").disabled = true;
    document.getElementById("start-btn").disabled = false;
    gameStarted = false;
}
