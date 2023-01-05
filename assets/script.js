let startButton = document.querySelector(".startButton");
let timerText = document.querySelector(".timerText");
let questions = document.querySelector(".questions");
let buttonContainer = document.querySelector(".buttonContainer");
let scoreText = document.querySelector(".scoreText");
let highScoreList = document.querySelector(".highScoreList");
let feedbackText = document.querySelector(".feedbackText");
let highScoresDisplayButton = document.querySelector(".highScoresDisplay");
let clearHighScoresButton = document.querySelector(".clearHighScores")

let finalSeconds = 0;
let questionNum = 0;
let score = 0;

let userAnswer;
let userName;

//highScores will pull localStorage item of "highScores" otherwise will be an empty array
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];


// Questions for the game. Don't cheat! ;)
let questionsArray = [
    {
        question: "Who lives in a pineapple under the sea?",
        choices: ["Spongebob Squarepants", "Bart Simpson", "Tom & Jerry", "Ren & Stimpy"],
        answer: "Spongebob Squarepants"
    },

    {
        question: "Who is not a Power Puff Girl?",
        choices: ["Bubbles", "Blossom", "Princess", "Buttercup"],
        answer: "Princess",
    },

    {
        question: "Who is NOT a Teenage Mutant Ninja Turtle?",
        choices: ["Donatello","Michelangelo", "Shredder", "Raphael"],
        answer: "Shredder"
    },

    {
        question: "What is Dexter's sister's name from Dexter's Laboratory",
        choices: ["DeeDee","Kiki","Mimi","LeeLee",],
        answer: "DeeDee",
    },

    {
        question: "Where do the Simpsons live?",
        choices: ["Kansas City","St. Louis","Springfield","Edwardsville",],
        answer: "Springfield",
    },

    {
        question: "What number did Lightning McQueen have?",
        choices: ["75","80","65","95",],
        answer: "95",
    },

	{
        question: "Who is NOT from the cartoon DuckTales?",
        choices: ["Louie","Stewey","Huey","Dewey",],
        answer: "Stewey",
    },

    {
        question: "What is the dog's name from Rocko's Modern Life?",
        choices: ["Conky","Spunky","Lunky","Dunkey",],
        answer: "Spunky",
    },

	{
        question: "Who is NOT a Street Shark?",
        choices: ["Streex","Ripster","Slammu","Jaws",],
        answer: "Jaws",
    },

	{
        question: "Who is Garfield's owner?",
        choices: ["Jon Bon Jovi","Jon Stewart","Jon Arbuckle","Jon Davis",],
        answer: "Jon Arbuckle",
    },

	{
        question: "Who is Yogi Bear's friend?",
        choices: ["Loo-Loo","Boo-Boo","Coo-Coo","Moo-Moo",],
        answer: "Boo-Boo",
    },

	{
        question: "What is the name of Mickey Mouse's Dog?",
        choices: ["Mars","Pluto","Jupiter","Neptune",],
        answer: "Pluto",
    },

	{
        question: "What is the name of Nemo's dad from Finding Nemo",
        choices: ["Marvin","Martin","Marlin","Melvin",],
        answer: "Marlin",
    },

	{
        question: "What is the name of the teacher from the Magic School Bus?",
        choices: ["Ms. Drizzle","Ms. Wizzle","Ms. Rizzle","Ms. Frizzle",],
        answer: "Ms. Frizzle",
    },

	{
        question: "Who is Arnold's best friend in Hey Arnold!",
        choices: ["Harold","Sid","Helga","Gerald",],
        answer: "Gerald",
    },

	{
        question: "What's the name of the Panther that discovered Mowgli in the Jungle Book?",
        choices: ["Baloo","Bagheera","King Louie","Kaa",],
        answer: "Bagheera",
    },

	{
        question: "What is the name of Goofy's son from A Goofy Movie?",
        choices: ["Max Goof","Jax Goof","Lax Goof","Tax Goof",],
        answer: "Max Goof",
    },

	{
        question: "In the Emperor's New Groove what is the name of Yzma's henchman?",
        choices: ["Kronk","Kuzco","Pacha","Bucky",],
        answer: "Kronk",
    },

	{
        question: "What is the name of the antagonist from the Little Mermaid?",
        choices: ["Alana","Sara","Ursula","Aquata",],
        answer: "Ursula",
    },

	{
        question: "What does Boo call Sully in the movie Monster's Inc?",
        choices: ["Fluffy","Sully","Mike Wackowski","Kitty",],
        answer: "Kitty",
    },

	{
        question: "What does Pinky and the Brain do every night?",
        choices: ["Play video games","Try to take over the world","Watch TV","Practice JavaScript",],
        answer: "Try to take over the world",
    },

	{
        question: "Who is NOT from the Animaniacs?",
        choices: ["Yakko","Wakko","Dot","Spot",],
        answer: "Spot",
    },

	{
        question: "What is the name of Hank Hill's Laotian neighbor?",
        choices: ["Khan","Kirk","Kane","Kai",],
        answer: "Khan",
    },

	{
        question: "Who is not part of the gang in Scooby-Doo?",
        choices: ["Matthew","Daphne","Velma","Fred",],
        answer: "Matthew",
    },

	{
        question: "What is the name of the antagonist from Who Framed Roger Rabbit?",
        choices: ["Judge Dredd","Judge Dead","Judge Demise","Judge Doom",],
        answer: "Judge Doom",
    },

	{
        question: "What's the name of the super hero from Ren & Stimpy?",
        choices: ["Powdered Milk Man","Powdered Toast Man","The Crimson Chin","Major Glory",],
        answer: "Powdered Toast Man",
    },

];

/*EZ Copy Paste for more questions.
    {
        question: "",
        choices: ["","","","",],
        answer: "",
    }
*/


//Timer for the Game | +5 seconds for every question in the Array
let secondsLeft = (questionsArray.length * 5)



//Start Game function that occurs when "Start Game" button is clicked (event listener down below)
function startGame () {
    
    //removes start button after being clicked.
    startButton.setAttribute("style", "display:none");

    //timer
    let timeInterval = setInterval(function() {
        
        secondsLeft -= 1;        

        //Runs questionContent function (displays the question on screen) and 
        //Displays the timer on screen
        if (secondsLeft > 0) {
            questionContent();
            timerText.textContent ='Timer: ' +secondsLeft;

        //once the timer reaches 0 will end the game.
        } else {
            clearInterval(timeInterval);
            timerText.textContent = "GAME OVER";
            buttonContainer.textContent = ``;
            questions.textContent = "GAME OVER";
            
            //Total Score which will add secondsLeft + Score
            let totalScore;
            //if finalSeconds is less than 0 then just make it 0
            if (finalSeconds < 0) finalSeconds = 0;
            //users totalScore will be the final seconds left of the game the score (questions answered correctly)
            totalScore = finalSeconds + score;
            
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
    
    //if user answers correctly adds +1 to score, otherwise 5sec are removed from secondsLeft
    if (userAnswer ===  questionsArray[questionNum].answer) {
        score += 1;
        scoreText.textContent = "Score: " +score;

        feedbackText.textContent = "Previous Choice: CORRECT"

    } else {
        secondsLeft -= 5;

        feedbackText.textContent = "Previous Choice: INCORRECT"

    }
    //regardless if user answers correctly - moves on to the next question 
    questionNum += 1;
    //after user answers (right or wrong) moves onto next question
    questionContent();

}


function highScoresDisplay () {


//Splices the highscore list in local storage to be only 5 (top 5 High Scores) and setItem to localStorage
if (highScores.length >= 6) {
    highScores.splice(4, 1);
    localStorage.setItem("highScores", JSON.stringify(highScores))
    
}

    //displays highScorelist and the button as block display
    highScoreList.style.display = "block"
    
    clearHighScoresButton.style.display = "block"

    
    //writes High Score List on the screen
    if (highScores.length > 0) {

        highScores = JSON.parse(localStorage.getItem("highScores")) 
        for (i=0; i < highScores.length ; i+=1){
        document.getElementById("#"+(i+1)).innerHTML = highScores[i].name +" with a score of "+ highScores[i].score
        }
    } else {
        return;
    }


}

//Clears the HighScores list with an alert making sure the user wants to clear from local storage
function clearHighScores () {
    userAlert = confirm("Are you sure you want to clear the High Scores?");
    
    if (userAlert === true) {
        window.location.reload();
        highScores = JSON.parse(localStorage.removeItem("highScores"));


        for (i=0; i < highScores.length ; i+=1){
            document.getElementById("#"+(i+1)).innerHTML = ``;
            }

    } else {
        return;
    }

}

//Hides the highscores when highScoresDisplayButton is DoubleClicked
function hideScores () {
    highScoreList.style.display ="none";
    clearHighScoresButton.style.display = "none"
}




//Writes text to the UI
timerText.textContent ='Timer: '+secondsLeft;
scoreText.textContent = "Score: ";
//hides HighScore list until button clicked
highScoreList.style.display = "none"

//hides Clear HighScore Button until HighScores is clicked
clearHighScoresButton.style.display = "none"
//clears High Scores
clearHighScoresButton.addEventListener("click", clearHighScores)


//listens for the StartButton to be clicked
startButton.addEventListener("click", startGame);

//displays high scores
highScoresDisplayButton.addEventListener("click", highScoresDisplay)
//if user double clicks highscore button it will make it disappear
highScoresDisplayButton.addEventListener("dblclick", hideScores)


//confirming JS is linked
//console.log("Script is linked");