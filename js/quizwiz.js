/* eslint-disable no-unused-vars */
'use strict';

console.log('quizwiz.js loaded');

const NUMBER_ANSWER_OPTION = 4;
let questionPool = null;
let playerPool = null;

// Randomizes the location of the correct answers inside an array with the incorrect answers
function randomAnswerArray(answers) {
  const answerArray = [];
  let randomIndex = Math.floor(Math.random() * NUMBER_ANSWER_OPTION);
  let incorrectAnswer = answers.incorrect_answers;
  console.log(incorrectAnswer);

  for (let i = 0; i < NUMBER_ANSWER_OPTION; i++) {
    console.log(randomIndex);
    if (i === randomIndex) {
      answerArray.push(answers.correct_answer);
    } else {
      answerArray.push(incorrectAnswer.pop());
    }
  }
  console.log(answerArray);
  return answerArray;
}

let currentQuestion = 0;
const questionTextElement = document.getElementById('question-text');
const optionsElement = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const selectedAnswers = new Array(10).fill(null);

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
  // console.log('hi' + questionPool);
  // let questionData = fetchAndReturnQuestionData(urlToGet);
  // questionData.then(askQuestions);
  // const currentQuestionData = questionData.results[currentQuestion];
  // questionTextElement.innerHTML = currentQuestionData.question;
  playerPool.currentCorrectAnswers = 0;
  playerPool.currentNumberAskedQuestions = 0;
  loadQuestion();
}

function loadQuestion() {
  const currentQuestionData = questionPool.results[currentQuestion];
  questionTextElement.textContent = currentQuestionData.question;

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
      } else {
        selectedAnswers[currentQuestion] = null;
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
    currentQuestion === questionData.results.length - 1 ? 'Submit' : 'Next';
}

// checks the players answers with the actual answers and iterates the score and questions ask counter accordingly
function evaluateAnswer(userAnswer, actualAnswer) {
  playerPool.currentNumberAskedQuestions++;
  playerPool.totalNumberAskedQuestions++;
  if (userAnswer === actualAnswer) {
    playerPool.currentCorrectAnswers++;
    playerPool.totalNumberCorrectAnswers++;
    playerPool.savePlayer();
  } else {
    playerPool.savePlayer();
  }
}

// this is a callback function for the next button event listener.
function goToNextQuestion() {
  if (currentQuestion < NUMBER_OF_QUESTIONS - 1) {
    currentQuestion++;
    evaluateAnswer(
      selectedAnswers[currentQuestion - 1],
      questionPool.results[currentQuestion - 1].correct_answer
    );
    console.log(playerPool);
    loadQuestion();
  } else {
    currentQuestion++;
    evaluateAnswer(
      selectedAnswers[currentQuestion - 1],
      questionPool.results[currentQuestion - 1].correct_answer
    );
    // Submit the quiz (you can add your submission logic here)
    showResults();
  }
}

// function showResults() {
//   // Display the user's selected answers (you can customize the output as per your requirements)
//   let resultsHTML = '<h2>Results</h2>';
//   for (let i = 0; i < NUMBER_OF_QUESTIONS; i++) {
//     const userAnswer = selectedAnswers[i];
//     const correctAnswer = questionPool.results[i].correct_answer;
//     const isCorrect = userAnswer === correctAnswer;
//     resultsHTML += `<p>Question ${
//       i + 1
//     }: Your answer - ${userAnswer}, Correct answer - ${correctAnswer}, ${
//       isCorrect ? 'Correct' : 'Incorrect'
//     }</p>`;
//   }
//   document.body.innerHTML = resultsHTML;
// }

const QUIZ_NAVIGATION = document.getElementById('navigation');
// const playBtn = document.getElementById('playBtn');
// const leadBtn = document.getElementById('leadBtn');


// Display the user's selected answers (you can customize the output as per your requirements)
function showResults() {
  let playAgainButton = document.createElement('button');
  let leaderboardButton = document.createElement('button');
  playAgainButton.setAttribute('id', 'playBtn');
  leaderboardButton.setAttribute('id', 'leadBtn');

  questionTextElement.textContent = `Thanks for playing ${playerPool.name}`;
  optionsElement.innerHTML = `<p>Correct Answers = ${playerPool.currentCorrectAnswers}</p><br /><p>Number of Questions = ${playerPool.currentNumberAskedQuestions}</p><br /><p>Lifetime Correct Answers = ${playerPool.totalNumberCorrectAnswers}</p><br /><p>Lifetime Number of Questions = ${playerPool.totalNumberAskedQuestions}</p><br />`;
  playAgainButton.textContent = 'Play Again';
  leaderboardButton.textContent = 'Leaderboard';

  playAgainButton.addEventListener('click', resetPage);
  leaderboardButton.addEventListener('click', showLeaderboardPage);
  hideButton();
  // QUIZ_NAVIGATION.setAttribute('class', 'navigation-styling');
  QUIZ_NAVIGATION.appendChild(playAgainButton);
  QUIZ_NAVIGATION.appendChild(leaderboardButton);
}

nextBtn.addEventListener('click', goToNextQuestion);

// reloads the current page
function resetPage() {
  location.reload();
}

function showLeaderboardPage() {
  window.location.href = 'leaderboard.html';
}

function hideButton() {
  let hideThisButton = document.getElementById('nextBtn');
  hideThisButton.parentNode.removeChild(hideThisButton);
}

document.getElementById('start-button').addEventListener('click', function () {

  document.getElementById('formContainer').style.display = 'none';

  document.getElementById('quizContainer').style.display = 'block';
});
