let startButton = document.querySelector(".startButton");
let timerText = document.querySelector(".timerText");
let questions = document.querySelector(".questions");
let buttonContainer = document.querySelector(".buttonContainer");
let scoreText = document.querySelector(".scoreText");

let secondsLeft = 30;

let questionNum = 0;

let score = 0;

let userAnswer;


let questionsArray = [
    {
        question: "Who lives in a pineapple under the sea?",
        choices: ["Spongebob", "Bart Simpson", "Tom & Jerry", "Ren & Stimpy"],
        answer: "Spongebob"
    },
    {
        question: "Who is not a Power Puff Girl?",
        choices: ["Princess", "Blossom", "Bubbles", "Buttercup"],
        answer: "Princess",
    },
    {
        question: "Which is NOT a Teenage Mutant Ninja Turtle?",
        choices: ["Shredder","Michelangelo", "Leonardo", "Raphael"],
        answer: "Shredder"
    },
    {
        question: "What is Dexter's sister's name from Dexter's Laboratory",
        choices: ["DeeDee","Kiki","Mimi","LeeLee",],
        answer: "DeeDee",
    },
    {
        question: "Where do the Simpsons live?",
        choices: ["Springfield","St. Louis","Columbia","Edwardsville",],
        answer: "Springfield",
    }

];

/*EZ Copy Paste for more questions.
    {
        question: "",
        choices: ["","","","",],
        answer: "",
    }
*/


function startGame () {
    //removes start button after being clicked.
    startButton.setAttribute("style", "visibility: hidden");

    //timer
    let timeInterval = setInterval(function() {
        
        secondsLeft -= 1;        
        console.log(secondsLeft);

        if (secondsLeft > 0) {
            questionContent();
            timerText.textContent ='Timer: ' +secondsLeft;


        } else {
            clearInterval(timeInterval);
            timerText.textContent = "GAME OVER";
            console.log("Timer stopped");
            buttonContainer.textContent = ``;
            questions.textContent = "GAME OVER";
            
            /* Attempting to do a "Total Score which will add secondsLeft + Score"
            let totalScore;
            //if the SecondsLeft goes negative resets it to 0
            if (secondsLeft < 0 ) {
                secondsLeft = 0;
            }
            totalScore = score + secondsLeft
            */
            
            userAlert = alert("Your score is " +score+ " out of "+questionsArray.length+ " questions");
            
            
        }
    }, 1000);

};


function questionContent() {
    //resets buttonContainer text to nothing for each time a choice is selected
    buttonContainer.textContent = ``;

    //If we reach the end of questions array should print "No more questions", otherwise will continue to run the program
    if (questionNum === questionsArray.length) {
        questions.textContent = "NO MORE QUESTIONS";

        console.log("QuestionNum = QuestionsArray");
        secondsLeft = 0;

    } else {
        // Writes the choices to the button Elements
        for (let i = 0; i < 4 ; i++) {
            let btnElement = document.createElement("button");
    
            questions.textContent = questionsArray[questionNum].question;
            btnElement.textContent = questionsArray[questionNum].choices[i];
            buttonContainer.append(btnElement);
            btnElement.addEventListener("click", questionAnswer);
    
        }

    }

}


function questionAnswer (e) {

    //get user input with button
    userAnswer = e.target.innerText;

    //if user answers correctly adds +1 to score, otherwise 10sec are removed from secondsLeft
    if (userAnswer ===  questionsArray[questionNum].answer) {
        score += 1;
        scoreText.textContent = "Score: " +score;
        console.log("the score is "+score);
    } else {
        secondsLeft -= 10;
        console.log("the timer was reduced");
    }

    //regardless if user answers correctly - moves on to the next question 
    questionNum += 1;

    //used to track where userAnswer is
    console.log("The user chose " +userAnswer);
    //console.log(e)
    
    //tracking what question number user is on
    console.log("The questionNum is " +questionNum);

    //after user answers (right or wrong) moves onto next question
    questionContent();

}


//Writes text to the UI
timerText.textContent ='Timer: '+secondsLeft;
scoreText.textContent = "Score: ";


//listens for the StartButton to be clicked
startButton.addEventListener("click", startGame);

//confirming JS is linked
console.log("Script is linked");