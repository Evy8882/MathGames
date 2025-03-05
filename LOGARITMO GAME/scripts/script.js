let time = 500;
let interval = 10;
let rightAnswers = 0;
let timer = setInterval(() => {
    time = Math.min(500,time)
    time -= 1;
    if (time <= 0) {
        clearInterval(timer);
        gameOver();
    }
    document.querySelector(".timer").style.width = `${time / 5}%`;
}, interval);

function gameOver(){
    //verificar para não criar 2 game overs
    if(document.querySelector(".game-over")){
        return
    }
    let gameOverElement = document.createElement("div");
    gameOverElement.classList.add("game-over");
    gameOverElement.innerText = "Game Over!";
    document.body.appendChild(gameOverElement);
    let audio = new Audio('./sounds/game_over.wav');
    audio.play();
    setTimeout(()=>{
        window.location.href = "index.html";
    },2500)
}

function reverseArrow() {
    var element = document.querySelector(".arrow");
    element.classList.toggle("reverse");
}
var values = [];
function generateLog() {
    let element = document.querySelectorAll(".val");
    let pots = [];
    element.forEach((el) => {
        el.classList.add("jump");
        setTimeout(() => {
            el.classList.remove("jump");
        }, 200)
        // a base não pode ser 0
        let base = Math.floor(Math.random() * 10) + 2;
        let pot = Math.floor(Math.random() * 5);
        pots.push(pot);
        let res = Math.pow(base, pot);
        el.innerHTML = `Log<sub>${base}</sub>${res}`;
    })
    //repetir caso os valores seja iguais
    while (pots[0] === pots[1]) {
        pots = []
        element.forEach((el) => {
            el.classList.add("jump");
            setTimeout(() => {
                el.classList.remove("jump");
            }, 200)
            // a base não pode ser 0 nem 1
            let base = Math.floor(Math.random() * 10) + 2;
            let pot = Math.floor(Math.random() * 5);
            pots.push(pot);
            let res = Math.pow(base, pot);
            el.innerHTML = `Log<sub>${base}</sub>${res}`;
        })
    }
    return pots;
}
values = generateLog();

//apenas o menor número vai mudar de valor
//classe jump para animação
function changeLog(num) {
    let element = document.querySelectorAll(".val")[num];
    element.classList.add("jump");
    setTimeout(() => {
        element.classList.remove("jump");
    }, 200)
    // a base não pode ser 0 nem 1
    let base = Math.floor(Math.random() * 10) + 2;
    let pot = Math.floor(Math.random() * 5);
    values[num] = pot;
    let res = Math.pow(base, pot);
    element.innerHTML = `Log<sub>${base}</sub>${res}`;
    //se os valores forem iguais, alterar os dois
    if (values[0] === values[1]) {
        values = generateLog();
    }
}

function verifyGuess(sign){
    if (values[1 - sign] > values[sign]) {
        // alert("Correct");
        time += 100;
        rightAnswers++;
        document.querySelector(".right-answers").innerText = rightAnswers;
        document.querySelector(".game").classList.add("shake");
        setTimeout(() => {
            document.querySelector(".game").classList.remove("shake");
        }, 500)
        let audio = new Audio('./sounds/correct.wav');
        audio.play();
        changeLog(sign)
        return true;
    }
    return false;
}

function guess() {
    let sign = document.querySelector(".arrow").classList.contains("reverse") ? 0 : 1;
    if (verifyGuess(sign)){
        return
    }
    gameOver()
    return
}