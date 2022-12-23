//Variables

let startButton = document.querySelector(".startButton")
let timerText = document.querySelector(".timerText")
let questions = document.querySelector(".questions")
let buttonContainer = document.querySelector(".buttonContainer")

let questionsArray = [
    {
        question: "Who lives in a pineapple under the sea?",
        choices: ["Spongebob", "Bart Simpson", "Tom & Jerry", "Ren & Stimpy"],
        answer: "Spongebob"
    },
    {
        question: "Hero of the Lion King?",
        choices: ["Simba", "Scar", "Peter Pan", "Captain Hook"],
        answer: "Simba"
    }
]


const Q1 = {

}

let secondsLeft = 5;

function startGame () {
    //timer
 
    let timeInterval = setInterval(function() {
        secondsLeft -= 1;
        timerText.textContent ='Timer: ' +secondsLeft
        console.log(secondsLeft)
        if (secondsLeft === 0) {
            clearInterval(timeInterval)
            console.log("Timer stopped")
        } 
    }, 1000)
   //presented with question

    questionContent()


    console.log("this worked")




}

function questionContent() {
    questions.textContent = questionsArray[0].question
    for (let i = 0; i < 4 ; i++) {
        let btnElement = document.createElement("button")
    btnElement.textContent = questionsArray[0].choices[i]
    buttonContainer.append(btnElement)
    btnElement.addEventListener("click", questionAnswer)
    }
}

function questionAnswer () {
    console.log("user clicked a choice")
}


startButton.addEventListener("click", startGame)

console.log("Script is linked")