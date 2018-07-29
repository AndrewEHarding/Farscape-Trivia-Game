// I love waiting to see how things go South.
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
    var timerDiv = $("#timer-div");
    var gameBody = $("#game-body");
    var scoreCounter = 0;
    var totalScore = questions.length - 1;
    var q = 0;
    var timeLeft = 15;
    var chsCrctAnswr;
    var intervalId;
    var timerId;

    // =====COUNTDOWN TIMER=====
    function countdown() {
        if (timeLeft == 0) {
            clearTimeout(timerId);
            timeRanOut();
        } else {
            timerDiv.text(timeLeft + ' microts remaining.');
            timeLeft--;
        }
    }

    // =====TIME RAN OUT PAGE=====
    function timeRanOut() {
        timerDiv.empty();
        gameBody.empty();
        gameBody.append("<h4>You fekkik, you ran out of time!</h4>");
        var btn = $("<button>");
        btn.addClass("btn btn-secondary next-button");
        btn.text("Next");
        gameBody.append("<br>");
        gameBody.append(btn);
    }

    // =====ANSWER ASSESSMENT=====
    function postQuestion() {
        timerDiv.empty();
        gameBody.empty();
        clearInterval(intervalId);
        if (chsCrctAnswr == true) {
            gameBody.append("<h4>You Got it!</h4>");
            gameBody.append("<h4>" + questions[q].correctAnswer + "</h4>");
            gameBody.append("<img id='answer-img' src='" + questions[q].answerImage + "'>");
        }
        else {
            gameBody.append("<h4>Sorry, incorrect.</h4>");
        }
        var btn = $("<button>");
        btn.addClass("btn btn-secondary next-button");
        btn.text("Next");
        gameBody.append("<br>");
        gameBody.append(btn);
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
        gameBody.empty();
        gameBody.html("<h4>How much do you know about the Sci-Fi cult classic?</h4>");
        var btn = $("<button>");
        btn.addClass("btn btn-secondary start-button");
        btn.text("Start Game!");
        gameBody.append(btn);
    }

    // =====NEXT QUESTION=====
    function nextQuestion() {
        chsCrctAnswr = false;
        timeLeft = 15;
        clearInterval(intervalId);
        countdown();
        intervalId = setInterval(countdown, 1333);
        var answerArray = questions[q].incorrectAnswers.concat(questions[q].correctAnswer);
        randomize(answerArray);
        gameBody.empty();
        questionScreen = "<h4>" + questions[q].question + "</h4>";
        gameBody.html(questionScreen);
        for (var i = 0; i < answerArray.length; i++) {
            if (answerArray[i] == questions[q].correctAnswer) {
                var answr = $("<button>");
                answr.addClass("correct-answer btn btn-outline-secondary mx-1 mb-2");
                answr.text(answerArray[i]);
                gameBody.append(answr);
            }
            else {
                var answr = $("<button>");
                answr.addClass("incorrect-answer btn btn-outline-secondary mx-1 mb-2");
                answr.text(answerArray[i]);
                gameBody.append(answr);
            }
        }
        var btn = $("<button>");
        btn.addClass("btn btn-secondary post-question");
        btn.text("Next");
        gameBody.append("<br>");
        gameBody.append(btn);
    }

    // =====NEW GAME=====
    function newGame() {
        q = 0;
        scoreCounter = 0;
        nextQuestion();
    }

    // =====NEXT BUTTON FUNCTION=====
    function nextButton() {
        if (chsCrctAnswr == true) {
            scoreCounter++;
        }

        if (q == totalScore) {
            endGame();
        }
        else {
            q++;
            nextQuestion();
        }
    }

    // =====END GAME=====
    function endGame() {
        clearInterval(intervalId);
        timerDiv.empty();
        gameBody.empty();
        gameBody.append("<h4>Game Over!</h4>");
        gameBody.append("<h5>Your Final Score is " + scoreCounter + "/" + parseInt(totalScore + 1) + "!");
        if (scoreCounter == 0) {
            gameBody.append("<h6>Oh, yotz. You didn't get any of them.</h6>");
        }
        if (scoreCounter == parseInt(totalScore + 1)) {
            gameBody.append("<h6>You got them all! You're the draddest!</h6>")
        }
        var btn = $("<button>");
        btn.addClass("btn btn-secondary restart-button");
        btn.text("Restart!");
        gameBody.append(btn);
    }

    startScreen();
    $(document).on("click", ".correct-answer", function () {
        chsCrctAnswr = true;
    });
    $(document).on("click", ".incorrect-answer", function () {
        chsCrctAnswr = false;
    });
    $(document).on("click", ".start-button", newGame);
    $(document).on("click", ".next-button", nextButton);
    $(document).on("click", ".restart-button", startScreen);
    $(document).on("click", ".post-question", postQuestion);
});