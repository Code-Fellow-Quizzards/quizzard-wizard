/* eslint-disable no-unused-vars */
'use strict';

console.log('app.js loaded');

let EASY_DIFFICULTY = 1;
let MEDIUM_DIFFICULTY = 2;
let HIGH_DIFFICULTY = 3;

function Player (playerName, difficultyLevel = EASY_DIFFICULTY) {
  this.name = playerName;
  this.difficultyLevel = difficultyLevel;

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
    highScore: 0,
    singleSessionBestScore: 0,
    currentCategory: 0,
    currentCorrectAnswers: 0,
    currentNumberAskedQuestions: 0,
    totalNumberCorrectAnswers: 0,
    totalNumberAskedQuestions: 0,
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
  return new Player(playerData.name, playerData.difficultyLevel);
}

function fetchQuizData(url) {
  // GPT helping out with the API pull request
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Use the data here
      console.log(data);
    })
    .catch(error => {
      console.error('Error fetching quiz data:', error);
    });
}

////////////////////////////////////////////////////////////////////////////////
// We'll be experimenting with a few URL's here
////////////////////////////////////////////////////////////////////////////////
let urlToGet = 'https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple';
// let urlToGet = 'https://opentdb.com/api_category.php';
// let urlToGet = '';
// let urlToGet = '';
// let urlToGet = '';
////////////////////////////////////////////////////////////////////////////////

    
function submitForm() {
  const playerNameInput = document.getElementById('player-name');
  const playerName = playerNameInput.value.trim();

  // localStorage.clear();

  if (playerName) {
    let existingPlayerData = localStorage.getItem(playerName);

    if (!existingPlayerData) {
      // console.log('need to make a new player obj');
      let activePlayer = new Player(playerName);
      activePlayer.savePlayer();
    } else {
      // console.log('need to load a player obj');
      let activePlayer = loadPlayer(playerName);

      // Info for loading data into Quiz Game
      console.log('This is the Player object I can pass to the Quiz Game:');
      console.log(activePlayer);
      console.log('This is the quizPool object I can pass to the Quiz Game:');
      fetchQuizData(urlToGet);

      // To be added 
      // playQuiz(activePlayer);

    }
  } else {
    console.log('no playerName');
  }
}
