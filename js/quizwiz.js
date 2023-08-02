'use strict';

console.log('quizwiz.js loaded');

// USED TO TEST IT
// const questionData = {
//   response_code: 0,
//   results: [
//     {
//       category: 'Mythology',
//       type: 'multiple',
//       difficulty: 'easy',
//       question:
//         'Who was the only god from Greece who did not get a name change in Rome?',
//       correct_answer: 'Apollo',
//       incorrect_answers: ['Zeus', 'Hermes', 'Poseidon'],
//     },
//     {
//       category: 'Mythology',
//       type: 'multiple',
//       difficulty: 'easy',
//       question:
//         'The ancient Roman god of war was commonly known as which of the following?',
//       correct_answer: 'Mars',
//       incorrect_answers: ['Jupiter', 'Mercury', 'Venus'],
//     },
//     {
//       category: 'Mythology',
//       type: 'multiple',
//       difficulty: 'easy',
//       question: 'Who was the King of Gods in Ancient Greek mythology?',
//       correct_answer: 'Zeus',
//       incorrect_answers: ['Hera', 'Poseidon', 'Ares'],
//     },
//   ],
// };

// function Player(playerName) {
//   this.name = playerName;
//   // this.difficultyLevel = EASY_DIFFICULTY;

//   this.highScore = 0;
//   this.singleSessionBestScore = 0;
//   this.currentCategory = 0;
//   this.currentCorrectAnswers = 0;
//   this.currentNumberAskedQuestions = 0;
//   this.totalNumberCorrectAnswers = 0;
//   this.totalNumberAskedQuestions = 0;
// }

let currentPlayer = '';
let questionData = '';
playQuizWiz(activePlayer, quizData);
console.log(quizData);
askQuestions();


function playQuizWiz(player, data) {
  currentPlayer = player;
  questionData = data;
  console.log(questionData);
  loadQuestion();
}

const NUMBER_ANSWER_OPTION = 4;

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
const selectedAnswers = new Array(questionData.results.length).fill(null);

function loadQuestion() {
  const currentQuestionData = questionData.results[currentQuestion];
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
    currentQuestion === questionData.results.length - 1 ? 'Submit' : 'Next';
}

function evaluateAnswer(userAnswer, actualAnswer) {
  if (userAnswer === actualAnswer) {
    player.currentCorrectAnswers++;
    player.currentNumberAskedQuestions++;
  } else {
    player.currentNumberAskedQuestions++;
  }
}

function goToNextQuestion() {
  if (currentQuestion < questionData.results.length - 1) {
    currentQuestion++;
    evaluateAnswer(
      selectedAnswers[currentQuestion - 1],
      questionData.results[currentQuestion - 1].correct_answer
    );
    console.log(player);
    loadQuestion();
  } else {
    // Submit the quiz (you can add your submission logic here)
    showResults();
  }
}

function showResults() {
  // Display the user's selected answers (you can customize the output as per your requirements)
  let resultsHTML = '<h2>Results</h2>';
  for (let i = 0; i < questionData.results.length; i++) {
    const userAnswer = selectedAnswers[i];
    const correctAnswer = questionData.results[i].correct_answer;
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

// Load the first question
// loadQuestion();
