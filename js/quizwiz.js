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
// const selectedAnswers = [];
// // const selectedAnswers = new Array(questionData.results.length).fill(null);
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
  // console.log("Paul's function works!:");
  // console.log(questionData.results);
  console.log(player);
  playerPool.currentCorrectAnswers = 0;
  playerPool.currentNumberAskedQuestions = 0;
  // console.log('hi' + questionPool);
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
    label.textContent = option;
    label.setAttribute('for', `option${i}`);
    li.appendChild(label);
    optionsElement.appendChild(li);
  }
  nextBtn.textContent =
    currentQuestion === questionPool.results.length - 1 ? 'Submit' : 'Next';
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

function showResults() {
  // Display the user's selected answers (you can customize the output as per your requirements)
  let resultsHTML = '<h2>Results</h2>';
  for (let i = 0; i < NUMBER_OF_QUESTIONS; i++) {
    const userAnswer = selectedAnswers[i];
    const correctAnswer = questionPool.results[i].correct_answer;
    const isCorrect = userAnswer === correctAnswer;
    resultsHTML += `<p>Question ${
      i + 1
    }: Your answer - ${userAnswer}, Correct answer - ${correctAnswer}, ${
      isCorrect ? 'Correct' : 'Incorrect'
    }</p>`;
  }
  document.body.innerHTML = resultsHTML;
}

nextBtn.addEventListener('click', goToNextQuestion);
