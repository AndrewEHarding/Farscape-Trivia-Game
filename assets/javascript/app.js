$(document).ready(function () {
    var questions = [
        {
            question: "What is the name of the star ship that Farscape takes place on?",
            correctAnswer: "Moya",
            incorrectAnswers: ["Talyn", "Rygel", "Serenity"],
            answerImage: "assets/images/answer-image00.jpg"
        },
        {
            question: "How did John Crichton leave Earth in the first episode?",
            correctAnswer: "A Wormhole",
            incorrectAnswers: ["Abducted", "Time Travel", "A Stargate"],
            answerImage: "assets/images/answer-image01.jpg"
        },
        {
            question: "What is John Crichton's rank?",
            correctAnswer: "Commander",
            incorrectAnswers: ["Captain", "Lieutenant", "Sergeant"],
            answerImage: "assets/images/answer-image02.jpg"
        },
        {
            question: "What two characters did Lani Tupu play in the series?",
            correctAnswer: "Crais and Pilot",
            incorrectAnswers: ["Crais and Scorpius", "Scorpius and Talyn", "D'Argo and Rygel"],
            answerImage: "assets/images/answer-image03.jpg"
        },
        {
            question: "What character is classified as a plant?",
            correctAnswer: "Zhaan",
            incorrectAnswers: ["Aeryn", "Chiana", "Jool"],
            answerImage: "assets/images/answer-image04.jpg"
        },
        {
            question: "What is Rygel's full title?",
            correctAnswer: "Dominar Rygel XVI",
            incorrectAnswers: ["Commander Rygel", "Dominar Rygel XXIII", "Commander Rygel VIII"],
            answerImage: "assets/images/answer-image05.jpg"
        }
    ];
    var scoreCounter = 0;
    var totalScore = questions.length - 1;
    // q is the counter for the questions array
    var q = 0;
    var timeLeft = 15;
    var timerDiv = document.getElementById('timer-div');
    // a microt is roughly a second and a third
    var timerId = setInterval(countdown, 1333);

    // =====COUNTDOWN TIMER=====
    function countdown() {
        if (timeLeft == 0) {
            clearTimeout(timerId);
            nextQuestion();
        } else {
            timerDiv.innerHTML = timeLeft + ' microts remaining.';
            timeLeft--;
        }
    }

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
        timeLeft = 15;
        countdown();
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
        if (scoreCounter == 0) {
            $("#game-body").append("<h6>Oh, yotz. You didn't get any of them.</h6>");
        }
        if (scoreCounter == parseInt(totalScore + 1)) {
            $("#game-body").append("<h6>You got them all! You're the draddest!</h6>")
        }
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