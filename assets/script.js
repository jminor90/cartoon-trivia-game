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
    },
    {
        question: "Which is NOT a Teenage Mutant Ninja Turtle?",
        choices: ["Shredder","Michelangelo", "Leonardo", "Raphael"]
    }
]




let secondsLeft = 5;

timerText.textContent ='Timer: '+secondsLeft

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

let qNum = 0


function questionContent() {


    questions.textContent = questionsArray[qNum].question

    // Writes the answers to buttons
    for (let i = 0; i < 4 ; i++) {
        let btnElement = document.createElement("button")
        btnElement.textContent = questionsArray[qNum].choices[i]
        buttonContainer.append(btnElement)
        btnElement.addEventListener("click", questionAnswer)
        
        
    }
}

function questionAnswer () {
    qNum += 1

    


    console.log(qNum)





    questionContent()

}


startButton.addEventListener("click", startGame)

console.log("Script is linked")