/* eslint-disable no-unused-vars */
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

// let currentPlayer = '';
// let questionData = '';
// // debugger;
// playQuizWiz(activePlayer, quizData);
// console.log(quizData);


// askQuestions();


// function playQuizWiz(player, data) {
//   let NEWcurrentPlayer = player;
//   let NEWquestionData = data;
//   console.log(NEWcurrentPlayer);
//   console.log(NEWquestionData);
//   loadQuestion();
// }

const NUMBER_ANSWER_OPTION = 4;

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

// let currentQuestion = 0;
// const questionTextElement = document.getElementById('question-text');
// const optionsElement = document.getElementById('options');
// const nextBtn = document.getElementById('nextBtn');
// // const selectedAnswers = [];
// // const selectedAnswers = new Array(questionData.results.length).fill(null);
// const selectedAnswers = new Array(10).fill(null);

// loads the questions from the data object and displays it using list items


function fetchQuizData(activePlayer, url) {
  // GPT helping out with the API pull request
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(questionData => {
      // We now have questionData Promise resolved, calling the main logic function
      playQuizWiz(activePlayer, questionData);
    })
    .catch(error => {
      console.error('Error fetching quiz data:', error);
    });
}

function prepareQuiz(activePlayer, urlToGet) {
  fetchQuizData(activePlayer, urlToGet); // fires off a function to get async data from an API
}

function playQuizWiz(player, questionData) {

  // let questionData = fetchQuizData();

  console.log('Paul\'s function works!:');
  console.log(questionData);
  // let questionData = generateQuestionData(urlToGet);


  // console.log(player);
  
  // console.log('fix this: ' + urlToGet);
  // let questionData = fetchAndReturnQuestionData(urlToGet);
  // questionData.then(askQuestions);
  // const currentQuestionData = questionData.results[currentQuestion];
  // questionTextElement.textContent = currentQuestionData.question;

  // optionsElement.innerHTML = '';
  // const options = randomAnswerArray(currentQuestionData);

  // for (let i = 0; i < NUMBER_ANSWER_OPTION; i++) {
  //   const option = options[i];

  //   const li = document.createElement('li');
  //   const input = document.createElement('input');
  //   input.type = 'radio';
  //   input.name = 'option';
  //   input.value = option;
  //   input.id = `option${i}`;
  //   input.checked = selectedAnswers[currentQuestion] === option;
  //   input.addEventListener('change', function () {
  //     if (input.checked) {
  //       selectedAnswers[currentQuestion] = option;
  //     } else {
  //       selectedAnswers[currentQuestion] = null;
  //     }
  //   });
  //   li.appendChild(input);
  //   const label = document.createElement('label');
  //   label.textContent = option;
  //   label.setAttribute('for', `option${i}`);
  //   li.appendChild(label);
  //   optionsElement.appendChild(li);
  // }
  // nextBtn.textContent =
  //   currentQuestion === questionData.results.length - 1 ? 'Submit' : 'Next';
}

// checks the players answers with the actual answers and iterates the score and questions ask counter accordingly
function evaluateAnswer(userAnswer, actualAnswer) {
  if (userAnswer === actualAnswer) {
    player.currentCorrectAnswers++;
    player.currentNumberAskedQuestions++;
  } else {
    player.currentNumberAskedQuestions++;
  }
}

// this is a callback function for the next button event listener.
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

// NEEDS to be updates - displays players answers along with correct answers
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

// nextBtn.addEventListener('click', goToNextQuestion);

// Load the first question
// loadQuestion();
