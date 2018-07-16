$(document).ready(function () {
    var questions = [
        {
            question: "This is question 0.",
            correctAnswer: "Correct answer",
            incorrectAnswers: ["incorrect answer 0", "incorrect answer 1", "incorrect answer 2"],
            answerImage: "assets/images/answer-image00.jpg"
        },
        {
            question: "This is question 1.",
            correctAnswer: "Correct answer",
            incorrectAnswers: ["incorrect answer 0", "incorrect answer 1", "incorrect answer 2"],
            answerImage: "assets/images/answer-image01.jpg"
        },
        {
            question: "This is question 2.",
            correctAnswer: "Correct answer",
            incorrectAnswers: ["incorrect answer 0", "incorrect answer 1", "incorrect answer 2"],
            answerImage: "assets/images/answer-image02.jpg"
        }
    ];
    var scoreCounter = 0;
    var totalScore = questions.length - 1;
    // q is the counter for the questions array
    var q = 0;

    //=====ARRAY RANDOMIZER======
    function randomize(array) {
        var j, x, i;
        for (i = array.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = array[i];
            array[i] = array[j];
            array[j] = x;
        }
    }

    // =====START SCREEN=====
    function startScreen() {
        console.log("New Game!");
        $("#game-body").empty();
        $("#game-body").html("<h4>This is my trivia game.</h4>");

        // This bit of code let's me make dynamic buttons that have functionality
        // an hour and a half later of mashing the "next question" button with no result
        var btn = document.createElement("button");
        btn.addEventListener('click', newGame, false);
        btn.classList.add("btn", "btn-secondary", "m-1");
        btn.innerHTML = "Start Game!";
        btn.type = "button";
        document.getElementById("game-body").appendChild(btn);
    }
    startScreen();

    // =====GAME START=====
    function nextQuestion() {
        console.log("Question number " + q);
        var answerArray = questions[q].incorrectAnswers.concat(questions[q].correctAnswer);
        console.log(answerArray);
        randomize(answerArray);
        // Answers are now randomized
        console.log(answerArray);
        $("#game-body").empty();
        // Add question
        questionScreen = "<h4>" + questions[q].question + "</h4>";
        $("#game-body").html(questionScreen);
        // Add answer buttons
        for (var i = 0; i < answerArray.length; i++) {
            if (answerArray[i] == questions[q].correctAnswer) {
                // Correct answer has "correct-answer" class
                $("#game-body").append("<button type='button' class='correct-answer btn btn-outline-secondary m-1'>" + answerArray[i] + "</button>");
            }
            else {
                $("#game-body").append("<button type='button' class='btn btn-outline-secondary m-1'>" + answerArray[i] + "</button>");
            }
        }
        // Add next question button
        var btn = document.createElement("button");
        btn.addEventListener('click', nextButton, false);
        btn.classList.add("btn", "btn-secondary", "next-button", "m-1");
        btn.innerHTML = "Next Question!";
        btn.type = "button";
        $("#game-body").append("<br>");
        // jQuery does't like appending vars
        document.getElementById("game-body").appendChild(btn);
    }

    // =====NEW GAME=====
    function newGame() {
        console.log("Start button pressed");
        q = 0;
        scoreCounter = 0;
        nextQuestion();
    }

    // =====NEXT BUTTON FUNCTION=====
    function nextButton() {
        // var x = document.getElementsByClassName("correct-answer");
        if (document.getElementsByClassName("correct-answer").selected == true) {
            scoreCounter++;
        }

        console.log("Current score is " + scoreCounter);

        if (q == totalScore) {
            endGame();
        }
        else {
            console.log("Next question button pressed")
            q++;
            nextQuestion();
        }
    }

    // =====END GAME=====
    function endGame() {
        console.log("Game Over!");
        $("#game-body").empty();
        $("#game-body").append("<h4>Game Over!</h4>");
        $("#game-body").append("<h5>Your Final Score is " + scoreCounter + "/" + parseInt(totalScore + 1) + "!");

        var btn = document.createElement("button");
        btn.addEventListener('click', startScreen, false);
        btn.classList.add("btn", "btn-secondary", "m-1");
        btn.innerHTML = "New Game!";
        btn.type = "button";
        document.getElementById("game-body").appendChild(btn);
    }
});

// Look into changing the event listeners into targetting the classes correct-answer and incorrect-answer
// Add timer to each nextQuestion(); with an end timer result of incorrect answer function, later make "time up" page