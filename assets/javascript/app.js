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
    var totalScore = questions.length;
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
        startScreen = "<h4>This is my trivia game.</h4><button type='button' class='btn btn-secondary start-button'>Start Game!</button>";
        $("#game-body").html(startScreen);
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
        for (var i = 0; i < answerArray.length; i++){
            $("#game-body").append("<button type='button' class='btn btn-outline-secondary m-1'>" + answerArray[i] + "</button>");
        }
        // Add next question button
        $("#game-body").append("<br><button type='button' class='btn btn-secondary next-button m-1'>Next Question!</button>");
    }

    // =====NEXT QUESTION BUTTON PRESS=====
    $(".next-button").on("click", function () {
        console.log("Next question button pressed")
        q++;
        nextQuestion();
    });

    // =====NEW GAME BUTTON PRESS=====
    $(".start-button").on("click", function () {
        console.log("Start button pressed");
        nextQuestion();
    });
});

// Need to add correct answer checker and timer, next button might by unessisary