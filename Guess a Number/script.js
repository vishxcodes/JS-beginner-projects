let randomNum = parseInt(Math.random()*100 +1)
console.log(randomNum)
const inputVal = document.querySelector('.inputNum')
const submit = document.querySelector('.submit')
const LowOrHigh = document.querySelector('.LowOrHigh')
const allGuess = document.querySelector('.allGuesses')
const lastGuess = document.querySelector('.lastGuess ')
const remGuess = document.querySelector('.remainingGuesses')
const warn = document.querySelector('.warning')
const startOver = document.querySelector('.update')

let numOfGuess = 1
let prevGuessArray = []

let p = document.createElement('p')

let playGame = true 
if (playGame) {
    submit.addEventListener('click', function(e){
        e.preventDefault()
        const guess = parseInt((inputVal).value)
        console.log(guess)
        checkValid(guess)
    });
}

function checkValid(num){
    if (num <=0 || num>100 || isNaN(num)) {
        warn.innerHTML = "Enter a valid number between 1-100"
    }
    else {
        compareNum(num)
        prevGuessArray.push(num)
        if (numOfGuess === 11) {
            displayGuess(num)
            LowOrHigh.innerHTML = "OOPS! Number of Guesses exceeded!"
            endGame()
        }
        else
        {
            displayGuess(num)
            compareNum(num)
        }
    }
}

function compareNum(num){
    if(num < randomNum){
        LowOrHigh.innerHTML= "Hint: Choose a Higher Number!"
    }
    else if(num > randomNum){
        LowOrHigh.innerHTML= "Hint: Choose a Lower Number!"
    }
    else {
        LowOrHigh.innerHTML= "Yayyy!!! You won!!!"
        endGame()
    }
}

function displayGuess(guess){
    warn.innerHTML = ''
    inputVal.value = ''
    allGuess.innerHTML += `${guess}   `
    numOfGuess++
    lastGuess.innerHTML = `${11-numOfGuess}`
}

function endGame(){
    inputVal.value = ''
    inputVal.setAttribute('disabled', '')
    p.classList.add('button')
    p.innerHTML = `<h2 id="newGame">Start NEW GAME!</h2>`
    startOver.appendChild(p)
    playGame = false
    newGame()
}
function newGame(){
    const newGameBtn = document.querySelector('#newGame')
    newGameBtn.addEventListener('click', function(e){
        randomNum = parseInt(Math.random()*100 +1)
        prevGuessArray = []
        warn.innerHTML= ''
        numOfGuess = 1
        LowOrHigh.innerHTML = ""
        lastGuess.innerHTML = `${11-numOfGuess}`
        inputVal.removeAttribute('disabled')
        allGuess.innerHTML= ''
        startOver.removeChild(p)
        playGame= true
    })
}