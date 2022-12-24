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
        choices: ["Shredder","Michelangelo", "Leonardo", "Raphael"],
        answer: "Shredder"
    }
]




let secondsLeft = 15;

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
            return;
        } 
    }, 1000)
   //presented with question

    questionContent()


    //console.log("this worked")




}

let questionNum = 0

let score = 0

let userAnswer;


function questionContent() {
    
    questions.textContent = questionsArray[questionNum].question
    buttonContainer.textContent = ``;

    // Writes the answers to buttons
    for (let i = 0; i < 4 ; i++) {
        let btnElement = document.createElement("button")



        btnElement.textContent = questionsArray[questionNum].choices[i]
        buttonContainer.append(btnElement)

        btnElement.addEventListener("click", questionAnswer)

    }

    //get user input with button
    
    
    


}


function questionAnswer (e) {




    userAnswer = e.target.innerText

    if (userAnswer ===  questionsArray[questionNum].answer) {
        score += 1
        console.log("the score is "+score)
    } else {
        secondsLeft -= 10
        console.log("the score is "+score)
    }



    questionNum += 1
    console.log(userAnswer)
    console.log(e)

    

    console.log("The questionNum is " +questionNum)





    questionContent()

}


startButton.addEventListener("click", startGame)

console.log("Script is linked")