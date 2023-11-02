// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score

// Timer function, when timer hits 0 end quiz
// Interval, conditional for when timer hits 0

// Quiz function
//Display quiz and the questions

// Next question function and check answer
// Move to next question, if selected answer is wrong, subtract time
// When all questions have been answered end quiz
// Conditional plus display next question

// Save score
// Local storage

var startBtn = document.getElementById('startBtn');
var questionBox = document.getElementById('questionBox');
var timerEl = document.getElementById('timer');
var questionEl = document.getElementById('question');
var remainTime = 60;
var choicesSec = document.getElementById('choices');
var score = 0;
var timeInterval;
var questionIndex = 0;

var questions = [
    {
        question: 'What does HTML stand for?',
        choices: ['Hyper Text Makeup Language', 'Hippo Text Markup Language', 'Hyper Text Markup Language', 'Hyper Test Markup Language'],
        answer: 'Hyper Text Markup Language'
    },
    {
        question: 'What does CSS stand for?',
        choices: ['Cascading Stem Sheets', 'Casting Style Sheets', 'Cascading Style Sheeps', 'Cascading Style Sheets'],
        answer: 'Cascading Style Sheets',
    },
    {
        question: 'Which tag do you link your CSS file?',
        choices: ['header tag', 'footer tag', 'link tag', 'body tag'],
        answer: 'link tag',
    },
    {
        question: 'Which tag do you link your JavaScript file?',
        choices: ['title tag', 'script tag', 'body tag', 'head tag'],
        answer: 'script tag',
    },
    {
        question: 'In what section do you keep the link tag?',
        choices: ['head', 'body', 'footer', 'header'],
        answer: 'head',
    }
];

// Timer function
function minTimer() {
    timeInterval = setInterval(function () {
        if (remainTime > 1) {
            timerEl.textContent = 'Timer: ' + remainTime + ' seconds';
            remainTime--;
        } else if (remainTime === 1) {
            timerEl.textContent = 'Timer: ' + remainTime + ' second';
            remainTime--;
        } else {
            timerEl.textContent = '';
            clearInterval(timeInterval);
            quizDone();
        }
    }, 1000);
};

function displayQuestions() {
    questionEl.textContent = questions[questionIndex].question;
    choicesSec.innerHTML = '';
    for (let index = 0; index < questions[questionIndex].choices.length; index++) {
        var button = document.createElement('button');
        button.textContent = questions[questionIndex].choices[index];
        choicesSec.append(button);
    }
};

function quizDone() {
    clearInterval(timeInterval);
    timerEl.textContent = '';

    var maxScore = questions.length * 5;
    var userScore = score * (100 / maxScore);

    questionEl.textContent = 'Quiz Complete! Your Score: ' + userScore + '/100';

    localStorage.setItem('userScore', userScore);
};

startBtn.addEventListener('click', function () {
    startBtn.style.display = 'none';
    minTimer();
    displayQuestions();
});

choicesSec.addEventListener('click', function (event) {
    //check answer function
    if (event.target.textContent != questions[questionIndex].answer) {
        remainTime -= 5;
    } else {
        score += 5;
    }

    questionIndex++;

    if (questionIndex < questions.length) {
        displayQuestions();
    } else {
        quizDone();
    }
});