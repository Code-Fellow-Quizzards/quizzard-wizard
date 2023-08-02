/* eslint-disable no-unused-vars */
'use strict';

console.log('app.js loaded');

const EASY_DIFFICULTY = 1;
const MEDIUM_DIFFICULTY = 2;
const HIGH_DIFFICULTY = 3;
let NUMBER_OF_QUESTIONS = 0;

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
  loadedPlayerObj.currentCategory= playerData.currentCategory;
  loadedPlayerObj.currentCorrectAnswers = playerData.currentCorrectAnswers;
  loadedPlayerObj.currentNumberAskedQuestions = playerData.currentNumberAskedQuestions;
  loadedPlayerObj.totalNumberCorrectAnswers = playerData.totalNumberCorrectAnswers;
  loadedPlayerObj.totalNumberAskedQuestions = playerData.totalNumberAskedQuestions;

  return loadedPlayerObj;
}

const categoryCodes = {
  'general knowledge': 9,
  'entertainment: books': 10,
  'entertainment: film': 11,
  'entertainment: music': 12,
  'entertainment: musicals & theatres': 13,
  'entertainment: television': 14,
  'entertainment: video games': 15,
  'entertainment: board games': 16,
  'science & nature': 17,
  'science: computers': 18,
  'science: mathematics': 19,
  'mythology': 20,
  'sports': 21,
  'geography': 22,
  'history': 23,
  'politics': 24,
  'art': 25,
  'celebrities': 26,
  'animals': 27,
  'vehicles': 28,
  'entertainment: comics': 29,
  'science: gadgets': 30,
  'entertainment: japanese anime & manga': 31,
  'entertainment: cartoon & animations': 32,
};



function generateURL(gameCategory, numberQuestions, gameDifficulty) {

  let chosenCategory = categoryCodes[gameCategory];


  let newURL = 'https://opentdb.com/api.php?';
  newURL += 'amount=' + numberQuestions + '&';
  newURL += 'category=' + chosenCategory + '&';
  newURL += 'difficulty=' + gameDifficulty + '&';
  newURL += 'type=multiple';

  return newURL;
}

// Nortstar
// https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple
// Does not work
// https://opentdb.com/api.php?amount=20&category=mythology&difficulty=medium&type=multiple

////////////////////////////////////////////////////////////////////////////////

function submitForm() {
  const playerNameInput = document.getElementById('player-name');
  const playerName = playerNameInput.value.trim();
  const gameCategoryInput = document.getElementById('game-category');
  const gameCategory = gameCategoryInput.value.toLowerCase();
  const numberQuestionInput = document.getElementById('number-question');
  
//  const numberQuestions = numberQuestionInput.value;
  NUMBER_OF_QUESTIONS = numberQuestionInput.value;
  
  const gameDifficultyInput = document.querySelector('input[name="gameDifficulty"]:checked');
  const gameDifficulty = gameDifficultyInput.value.toLowerCase();

  // localStorage.clear();

  let urlToGet = generateURL(gameCategory, numberQuestions, gameDifficulty);

  if (playerName) {
    let existingPlayerData = localStorage.getItem(playerName);

    if (!existingPlayerData) {
      // console.log('need to make a new player obj');
      let activePlayer = new Player(playerName);
      activePlayer.highScore = 99;
      activePlayer.savePlayer();
      // cal load function here => invoke questions
    } else {
      // cal load function here => invoke questions
      console.log('need to load a player obj');
      let activePlayer = loadPlayer(playerName);
      console.log('player: ' + activePlayer);
      console.log('urlToGet: ' + urlToGet);

      prepareQuiz(activePlayer, urlToGet);

    }

    console.log('Selected Category', gameCategory);
  //  console.log('Number of Questions', numberQuestions);
    console.log('Number of Questions', NUMBER_OF_QUESTIONS);
    
    console.log('Difficulty Level', gameDifficulty);

  } else {
    console.log('no playerName');
  }
}
