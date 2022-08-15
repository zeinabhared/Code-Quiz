var timeElement = document.querySelector("#time");
var leaderboard = document.querySelector("#scores");
var welcomePageEl = document.querySelector(".welcome");
var btnElement = document.querySelector("#start");
var divContEL = document.querySelector(".divContainer");
var hElement = document.querySelector("#title");
var orderListEl = document.querySelector("#q-list");
var finishDiv = document.querySelector(".finish-section");
var finalScore = document.querySelector("#result");
var errMsg = document.querySelector("#errorMsg");
var initialInput = document.querySelector("#inputInitial").value;
var submitEl = document.querySelector(".btn");
var responseDiv = document.querySelector("#response");
var lastPageEl = document.querySelector(".last-page");
var initialAndScore = document.querySelector("#staticEmail");

 // Function to display questions on page 
 function displayQuestions() {
    var holdQ1Title = questions[i].title
    hElement.textContent = holdQ1Title
    var holdq1Choice1 = questions[i].choices[0];
    var holdq1Choice2 = questions[i].choices[1];
    var holdq1Choice3 = questions[i].choices[2];
    var holdq1Choice4 = questions[i].choices[3];

    orderListEl.innerHTML = '';

    var liTag1 = document.createElement("li");
    liTag1.setAttribute("class", "all_li")
    var btn = document.createElement('button');
    btn.setAttribute("class", "all_btn")
    btn.textContent = holdq1Choice1;
    liTag1.appendChild(btn)
    orderListEl.appendChild(liTag1);
    divContEL.appendChild(orderListEl);

    var liTag2 = document.createElement("li");
    liTag2.setAttribute("class", "all_li");
    var btn2 = document.createElement('button');
    btn2.setAttribute("class", "all_btn")
    btn2.textContent = holdq1Choice2;
    liTag2.appendChild(btn2)
    orderListEl.appendChild(liTag2)
    divContEL.appendChild(orderListEl);

    var liTag3 = document.createElement("li");
    liTag3.setAttribute("class", "all_li")
    var btn3 = document.createElement('button');
    btn3.setAttribute("class", "all_btn")
    btn3.textContent = holdq1Choice3;
    liTag3.appendChild(btn3)
    orderListEl.appendChild(liTag3)
    divContEL.appendChild(orderListEl);

    var liTag4 = document.createElement("li");
    liTag4.setAttribute("class", "all_li")
    var btn4 = document.createElement('button');
    btn4.setAttribute("class", "all_btn");
    btn4.textContent = holdq1Choice4;
    liTag4.appendChild(btn4);
    orderListEl.appendChild(liTag4);
    divContEL.appendChild(orderListEl);
    var allBtnEl = document.querySelectorAll(".all_btn")
    allBtnEl.forEach(function (event) {
        event.addEventListener("click", onclickHandler)
    });
}

// Timer function 
var timer = 60;
var timeCount;
function setupTimer() {
    timeCount = setInterval(function() {
        timer--;
        var timeReset = timeElement.textContent = "Time:" + " " + timer;
       timer = timer;
        if (timer <= 0) {         
            clearInterval(timeCount);
              
            timeElement.textContent = timeReset;
        }
    }, 1000)
}

// Event Listener to start timer and hide quiz button
document.addEventListener("click", function (event) {
    if (event.target === btnElement) {
        welcomePageEl.style.display = "none";
        setupTimer()
        displayQuestions();
    }
})

// Function to compare the answers and display each questions as the buttons are clicked.
var i = 0;
function onclickHandler(event) {
     
    if (timer === 0) {
        clearInterval(timeCount);
        divContEL.style.display="none";
        displayResult();
    }
    var answerText = event.target.textContent 
    if (answerText === questions[i].answer) {
        timer = timer;
        responseDiv.setAttribute("style", "color: green")
        responseDiv.textContent = "Correct!";
    } else {
        responseDiv.setAttribute("style", "color: red")
        responseDiv.textContent = "Wrong!";
        timer = timer - 15;
     }
     
    if (i < questions.length - 1) {
      i++;
      setTimeout(function() {
      displayQuestions();
      responseDiv.textContent = "";
    }, 1000)

    } else {
        setTimeout(function() {
            responseDiv.textContent = "";
            displayResult();
            clearInterval(timeCount);

        }, 500)

        divContEL.innerHTML = '';
     }
     
// Function to display user high score
    function displayResult() {
        finishDiv.style.visibility = "visible";
        timeElement.textContent = "Time:" + " " + timer;
        var HighScores = timer;
        localStorage.getItem(HighScores)
        finalScore.textContent = "Your final score is: " + HighScores;
        localStorage.setItem("HighScores", HighScores)
    }
}

// Init function so you can view scores 
function init() {
    leaderboard.addEventListener("click", showScores);
}

// Function to show the last page 
function renderLastItem() {
    var yourScore = localStorage.getItem("HighScores");
     var yourInitial = localStorage.getItem("Initial");
     if (yourScore && yourInitial === "") {
        return
    }
    finishDiv.textContent = "";
    var lastPageEl = document.querySelector(".last-page");
    lastPageEl.style.visibility = "visible";
    var initialAndScore = document.querySelector("#staticEmail");
    initialAndScore.value = yourInitial + ":" + " " + yourScore;
}
 
// Event Listener to submit the initial and final score to local storage 
document.addEventListener("submit", function (event) {
    event.preventDefault();
    var initialInput = document.querySelector("#inputInitial").value;
    if (initialInput === "") {
        errMsg.setAttribute("style", "color: red")
        errMsg.textContent = "Initial input field cannot be empty"
    } else {
        errMsg.textContent = "";
        localStorage.getItem(initialInput)
        localStorage.setItem("Initial", initialInput)
         renderLastItem()
    }
})

// Function to refresh the page and send user back to first page 
function init() {
     location.reload();
}

// Function to clear scores on scoreboard 
function clearScore() {
    initialAndScore.value = "";
}