/* eslint-disable no-unused-vars */
'use strict';

console.log('app.js loaded');

const EASY_DIFFICULTY = 1;
const MEDIUM_DIFFICULTY = 2;
const HIGH_DIFFICULTY = 3;

function Player(playerName) {
  this.name = playerName;
  this.difficultyLevel = EASY_DIFFICULTY;

  this.highScore = 0;
  this.singleSessionBestScore = 0;
  this.currentCategory = 0;
  this.currentCorrectAnswers = 0;
  this.currentNumberAskedQuestions = 0;
  this.totalNumberCorrectAnswers = 0;
  this.totalNumberAskedQuestions = 0;
}


Player.prototype.savePlayer = function () {
    const playerData = {
      name: this.name,
      difficultyLevel: this.difficultyLevel,
      highScore: this.highScore,
      singleSessionBestScore: this.singleSessionBestScore,
      currentCategory: this.currentCategory,
      currentCorrectAnswers: this.currentCorrectAnswers,
      currentNumberAskedQuestions: this.currentNumberAskedQuestions,
      totalNumberCorrectAnswers: this.totalNumberCorrectAnswers,
      totalNumberAskedQuestions: this.totalNumberAskedQuestions,
    };

  localStorage.setItem(this.name, JSON.stringify(playerData));
  console.log('saved: ' + this.name);
};

Player.prototype.speaks = function () {
  console.log(`${this} has thus spoken`);
};

function loadPlayer(playerName) {
  console.log('loading existing player: ' + playerName);
  let existingPlayerData = localStorage.getItem(playerName);
  const playerData = JSON.parse(existingPlayerData);
  console.log('loaded name: ' + playerData.name);

  let loadedPlayerObj = new Player(playerData.name);
  loadedPlayerObj.difficultyLevel = playerData.difficultyLevel;
  loadedPlayerObj.highScore = playerData.highScore;
  loadedPlayerObj.singleSessionBestScore = playerData.singleSessionBestScore;
  loadedPlayerObj.currentCategory=  playerData.currentCategory;
  loadedPlayerObj.currentCorrectAnswers = playerData.currentCorrectAnswers;
  loadedPlayerObj.currentNumberAskedQuestions = playerData.currentNumberAskedQuestions;
  loadedPlayerObj.totalNumberCorrectAnswers = playerData.totalNumberCorrectAnswers;
  loadedPlayerObj.totalNumberAskedQuestions = playerData.totalNumberAskedQuestions;

  return loadedPlayerObj;
}

// function fetchQuizData(url) {
//   // GPT helping out with the API pull request
//   fetch(url)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => {
//       // Use the data here
//       console.log(data);
//       // return(data);
//     })
//     .catch(error => {
//       console.error('Error fetching quiz data:', error);
//     });
// }

////////////////////////////////////////////////////////////////////////////////
// We'll be experimenting with a few URL's here
////////////////////////////////////////////////////////////////////////////////
let urlToGet = 'https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple';
// let urlToGet = 'https://opentdb.com/api_category.php';
// let urlToGet = '';
// let urlToGet = '';
// let urlToGet = '';
////////////////////////////////////////////////////////////////////////////////

function fetchQuizData(url) {
  // GPT helping out with the API pull request

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Use the data here
      // console.log(data);
      return(data);
    })
    .catch(error => {
      console.error('Error fetching quiz data:', error);
    });
}

function fetchAndReturnQuestionData() {
  return fetchQuizData(urlToGet)
    .then(quizData => {
      if (quizData.response_code === 0) {
        return quizData.results;
      } else {
        console.log('There was an error collecting questions: ' + quizData.response_code);
      }
    });
}

function askQuestions(questionPool) {
  console.log('This is where your question function can go. All questions are in questionPool');
  console.log(questionPool);
}


function playQuiz(activePlayer) {
  console.log('We\'re now playing with: ' + activePlayer.name);
  // for loop (10 iteration) {
  //   questionArray = returnAnswerArray();
  //   askQuestion[i];
  //   gameLogic();
  //   activePlayer.savePlayer();
  // }
}
    
function submitForm() {
  const playerNameInput = document.getElementById('player-name');
  const playerName = playerNameInput.value.trim();

  // localStorage.clear();

  if (playerName) {
    let existingPlayerData = localStorage.getItem(playerName);

    if (!existingPlayerData) {
      // console.log('need to make a new player obj');
      let activePlayer = new Player(playerName);
      activePlayer.highScore = 99;
      activePlayer.savePlayer();
    } else {
      // console.log('need to load a player obj');
      let activePlayer = loadPlayer(playerName);
      let questionPool = fetchAndReturnQuestionData();
      questionPool.then(askQuestions);

      // console.log(activePlayer);

      let quizData = fetchQuizData(urlToGet);

      // Info for loading data into Quiz Game
      // console.log('This is the Player object I can pass to the Quiz Game:');
      // console.log(activePlayer);
      // console.log('This is the quizPool object I can pass to the Quiz Game:');
      // fetchQuizData(urlToGet);

      // To be added 
      console.log(quizData);
      // playQuizWiz(activePlayer, quizData);
      changePage('http://127.0.0.1:5501/quizwiz.html');
    }
  } else {
    console.log('no playerName');
  }
}

function changePage(url) {
  window.location.href = url;
}