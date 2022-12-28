let startButton = document.querySelector(".startButton");
let timerText = document.querySelector(".timerText");
let questions = document.querySelector(".questions");
let buttonContainer = document.querySelector(".buttonContainer");
let scoreText = document.querySelector(".scoreText");
let highScoreList = document.querySelector(".highScoreList");
let feedbackText = document.querySelector(".feedbackText");
let highScoresDisplayButton = document.querySelector(".highScoresDisplay");

//Timer for the Game
let secondsLeft = 30;

let finalSeconds = 0;
let questionNum = 0;
let score = 0;

let userAnswer;
let userName;

//highScores will pull localStorage item of "highScores" otherwise will be an empty array
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
//console.log(highScores)

// Questions for the game. Don't cheat! ;)
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



//Start Game function that occurs when "Start Game" button is clicked (event listener down below)
function startGame () {
    
    //removes start button after being clicked.
    startButton.setAttribute("style", "display:none");

    //timer
    let timeInterval = setInterval(function() {
        
        secondsLeft -= 1;        
        console.log(secondsLeft);

        //Runs questionContent function (displays the question on screen) and 
        //Displays the timer on screen
        if (secondsLeft > 0) {
            questionContent();
            timerText.textContent ='Timer: ' +secondsLeft;

        //once the timer reaches 0 will end the game.
        } else {
            clearInterval(timeInterval);
            timerText.textContent = "GAME OVER";
            console.log("Timer stopped");
            buttonContainer.textContent = ``;
            questions.textContent = "GAME OVER";
            
            //Total Score which will add secondsLeft + Score
            let totalScore;
            //if finalSeconds is less than 0 then just make it 0
            if (finalSeconds < 0) finalSeconds = 0;
            //users totalScore will be the final seconds left of the game the score (questions answered correctly)
            totalScore = finalSeconds + score;
            console.log(finalSeconds)
            console.log(totalScore)
            

            //End of game give score and ask for name input for High Score List
            userAlert = alert("Your answered " +score+ " out of "+questionsArray.length+ " questions correct. With "+finalSeconds+" seconds left.");
            userName = prompt("Enter your name")
            userAlert = alert(userName+" your Total Score (time left + correct answers) was "+totalScore)

            //Makes a finalScore Object in Local storage
            const finalScore = {
                score: totalScore,
                name: userName
            }
            
            //adds User name and Score to the Object
            highScores.push(finalScore);
            //Sorts the objects to Highest score to lowest
            highScores.sort((a,b) => b.score - a.score);
            //adds most recent user to local storage (but only top 5 are displayed on the page)
            localStorage.setItem("highScores", JSON.stringify(highScores))
            console.log(highScores)
            
        }
    }, 1000);


};



//this function displays the question and the answers in buttons
function questionContent() {

    //resets buttonContainer text to nothing for each time a choice is selected
    buttonContainer.textContent = ``;

    //If we reach the end of questions array should print "No more questions", otherwise will continue to run the program
    if (questionNum === questionsArray.length) {
        questions.textContent = "NO MORE QUESTIONS";

        console.log("QuestionNum = QuestionsArray");
        //takes the secondsLeft from the clock and adds them to a new variable finalSeconds which is used for the total score
        finalSeconds = secondsLeft;
        secondsLeft = 1;

    } else {
        // Writes the choices to the button Elements using for loop
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

        feedbackText.textContent = "Previous Choice: CORRECT"
        console.log("the score is "+score);
    } else {
        secondsLeft -= 10;

        feedbackText.textContent = "Previous Choice: INCORRECT"
        console.log("the timer was reduced");
        console.log("the score is "+score);
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


function highScoresDisplay () {
    console.log(highScores.length)
    console.log(highScores)

//Splices the highscore list in local storage to be only 5 (top 5 High Scores)
//still not working as intended at this time...a temporary fix is to change line 22 - replace highscores.length with 5, but still  saves in local storage. need to find a way to limit this..
if (highScores.length >= 6) {
    
    //console.log(spliceHigh)
    //highScores.splice(4,1);
    highScores.splice(4, 1);
    
    console.log(highScores.length)
}


    highScoreList.style.display = "block"
    //console.log(highScores)
    

    
    //writes High Score List on the screen
    if (highScores.length > 0) {

        //console.log(typeof highScores)
        //console.log(localStorage.getItem("highScores"))

        highScores = JSON.parse(localStorage.getItem("highScores")) 
        for (i=0; i < highScores.length ; i+=1){
        document.getElementById("#"+(i+1)).innerHTML = highScores[i].name +" with a score of "+ highScores[i].score
        }
    } else {
        return;
    }

    console.log("highScoreDisplay was clicked")
}







//Writes text to the UI
timerText.textContent ='Timer: '+secondsLeft;
scoreText.textContent = "Score: ";
//hides HighScore list until button clicked
highScoreList.style.display = "none"



//listens for the StartButton to be clicked
startButton.addEventListener("click", startGame);

//displays high scores
highScoresDisplayButton.addEventListener("click", highScoresDisplay)

//confirming JS is linked
console.log("Script is linked");