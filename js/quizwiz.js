/* eslint-disable no-unused-vars */
'use strict';

const NUMBER_ANSWER_OPTION = 4;
let questionPool = null;
let playerPool = null;


function addEasterEgg(indexNumber) {
  // This is a very important Easter Egg - so we can seem like we know ALL the answers
  // We're keeping an eye out for the number of periods after the footer, that's index number of the correct answer
  const easterEggText = document.getElementById('easter-egg');
  for (let i = 0; i < indexNumber; i++) {
    easterEggText.innerHTML += '.';
  }
}

// Randomizes the location of the correct answers inside an array with the incorrect answers
function randomAnswerArray(answers) {
  const answerArray = [];
  let randomIndex = Math.floor(Math.random() * NUMBER_ANSWER_OPTION);
  let incorrectAnswer = answers.incorrect_answers;
  const easterEggText = document.getElementById('easter-egg');
  easterEggText.innerHTML = 'Handcrafted in WA, USA';

  for (let i = 0; i < NUMBER_ANSWER_OPTION; i++) {
    if (i === randomIndex) {
      answerArray.push(answers.correct_answer);
    } else {
      answerArray.push(incorrectAnswer.pop());
    }
  }
  addEasterEgg(randomIndex);
  return answerArray;
}

let currentQuestion = 0;
const questionXofY = document.getElementById('question-x-of-y');
const pickAnswerAlert = document.getElementById('pick-answer-alert');
const questionTextElement = document.getElementById('question-text');
const optionsElement = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const selectedAnswers = new Array(10).fill(null);
let radioSelected = false;

// loads the questions from the data object and displays it using list items

function fetchQuizData(activePlayer, url) {
  // GPT helping out with the API pull request
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((questionData) => {
      // We now have questionData Promise resolved, calling the main logic function
      playQuizWiz(activePlayer, questionData);
    })
    .catch((error) => {
      console.error('Error fetching quiz data:', error);
    });
}

function prepareQuiz(activePlayer, urlToGet) {
  fetchQuizData(activePlayer, urlToGet); // fires off a function to get async data from an API
}

function playQuizWiz(player, questionData) {
  questionPool = questionData;
  playerPool = player;
  console.log(player);
  playerPool.currentCorrectAnswers = 0;
  playerPool.currentNumberAskedQuestions = 0;
  loadQuestion();
}

function loadQuestion() {
  const currentQuestionData = questionPool.results[currentQuestion];
  questionXofY.innerHTML = `Question #${currentQuestion + 1} of ${
    questionPool.results.length
  }`;
  questionTextElement.innerHTML = currentQuestionData.question;
   pickAnswerAlert.innerHTML = '';
  optionsElement.innerHTML = '';
  const options = randomAnswerArray(currentQuestionData);

  for (let i = 0; i < NUMBER_ANSWER_OPTION; i++) {
    const option = options[i];

    const li = document.createElement('li');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'option';
    input.value = option;
    input.id = `option${i}`;
    input.checked = selectedAnswers[currentQuestion] === option;
    input.addEventListener('change', function () {
      if (input.checked) {
        selectedAnswers[currentQuestion] = option;
        radioSelected = true; // sets radioSelected to true if player picks an answer
      } else {
        selectedAnswers[currentQuestion] = null;
        radioSelected = false; // keeps radioSelected as false if player doesn't pick an answer
      }
    });
    li.appendChild(input);
    const label = document.createElement('label');
    label.innerHTML = option;
    label.setAttribute('for', `option${i}`);
    li.appendChild(label);
    optionsElement.appendChild(li);
  }
  nextBtn.innerHTML =
    currentQuestion === questionPool.results.length - 1 ? 'Submit' : 'Next';
}

// checks the players answers with the actual answers and iterates the score and questions ask counter accordingly
function evaluateAnswer(userAnswer, actualAnswer) {
  playerPool.currentNumberAskedQuestions++;
  playerPool.totalNumberAskedQuestions++;
  if (userAnswer === actualAnswer) {
    playerPool.currentCorrectAnswers++;
    playerPool.totalNumberCorrectAnswers++;
    playerPool.highScore += playerPool.difficultyLevel;
    playerPool.savePlayer();
  } else {
    playerPool.savePlayer();
  }
}

// this is a callback function for the next button event listener.
function goToNextQuestion() {
  if (radioSelected) {
    if (currentQuestion < NUMBER_OF_QUESTIONS - 1) {
      currentQuestion++;
      evaluateAnswer(
        selectedAnswers[currentQuestion - 1],
        questionPool.results[currentQuestion - 1].correct_answer
      );
      radioSelected = false;
      loadQuestion();
    } else {
      currentQuestion++;
      evaluateAnswer(
        selectedAnswers[currentQuestion - 1],
        questionPool.results[currentQuestion - 1].correct_answer
      );
      // Submit the quiz (you can add your submission logic here)
      radioSelected = false;
      showResults();
    }
  } else {
     pickAnswerAlert.innerHTML = `Please select an answer!`;
  }
}

const QUIZ_NAVIGATION = document.getElementById('navigation');
const GAME_COMPLETE = document.getElementById('gameStatus');

// Display the user's selected answers (you can customize the output as per your requirements)
function showResults() {
  let playAgainButton = document.createElement('button');
  let leaderboardButton = document.createElement('button');
  playAgainButton.setAttribute('id', 'playBtn');
  leaderboardButton.setAttribute('id', 'leadBtn');
  GAME_COMPLETE.innerHTML = `<span>Game Complete</span>`;
  questionTextElement.textContent = `Thanks for playing ${playerPool.name}`;
  optionsElement.innerHTML = `<p>Correct Answers = ${playerPool.currentCorrectAnswers}</p><br /><p>Number of Questions = ${playerPool.currentNumberAskedQuestions}</p><br /><p>Lifetime Correct Answers = ${playerPool.totalNumberCorrectAnswers}</p><br /><p>Lifetime Number of Questions = ${playerPool.totalNumberAskedQuestions}</p><br />`;
  playAgainButton.textContent = 'Play Again';
  leaderboardButton.textContent = 'Leaderboard';

  playAgainButton.addEventListener('click', resetPage);
  leaderboardButton.addEventListener('click', showLeaderboardPage);
  hideButton();
  hideQuestionXofY();
  QUIZ_NAVIGATION.appendChild(playAgainButton);
  QUIZ_NAVIGATION.appendChild(leaderboardButton);
}

nextBtn.addEventListener('click', goToNextQuestion);

// reloads the current page
function resetPage() {
  // save player to local variable, we'll check if it exists before we play every game. if it exists, we'll delete it after we start the game
  localStorage.setItem('quizwiz', playerPool.name);
  location.reload();
}

function showLeaderboardPage() {
  window.location.href = 'leaderboard.html';
}

function hideButton() {
  let hideThisButton = document.getElementById('nextBtn');
  hideThisButton.parentNode.removeChild(hideThisButton);
}

function hideQuestionXofY() {
  let hideQuestionCounter = document.getElementById('question-x-of-y');
  hideQuestionCounter.parentNode.removeChild(hideQuestionCounter);
}

document.getElementById('start-button').addEventListener('click', function () {
  document.getElementById('formContainer').style.display = 'none';

  document.getElementById('quizContainer').style.display = 'block';
});
