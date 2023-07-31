'use strict';

console.log('app.js loaded');

let EASY_DIFFICULTY = 1;
let MEDIUM_DIFFICULTY = 2;
let HIGH_DIFFICULTY = 3;

// TODO: create a namespace for safe data retrieval
// function QuizWhiz() {
//   this.allPlayers = [];
//   this.activePlayer = null;
// }

function Player (playerName, highScore = 0, difficultyLevel = EASY_DIFFICULTY) {
  this.name = playerName;
  this.highScore = highScore;
  this.difficultyLevel = difficultyLevel;
}


function savePlayerData(playerName) {
  const playerData = JSON.stringify(playerName);
  localStorage.setItem(playerName, playerData);
  console.log('saved: ' + playerName);
}


function loadPlayerData(playerName) {
  let existingPlayerData = localStorage.getItem(playerName);
  if (!existingPlayerData) {
    console.log('making new player: ' + playerName);
    savePlayerData(playerName);
    return new Player(playerName);
  } else {
    console.log('loading existing player: ' + playerName);
    existingPlayerData = localStorage.getItem(playerName);
    const playerData = JSON.parse(existingPlayerData);
    return new Player(playerData.name, playerData.highScore, playerData.difficultyLevel);
  }
    
}

function submitForm() {
  // GPT helped here
  const playerNameInput = document.getElementById('player-name');
  const playerName = playerNameInput.value.trim();

  if (playerName) {
    const activePlayer = loadPlayerData(playerName);
    savePlayerData(activePlayer);
  } else {
    console.log('no playerName');
  }
}


// QuizWhiz.prototype.loadDefaultPlayers = function (activePlayerName) {
//   // This function loads players that have previously played the game
//   // for now, I'm doing this manually
//   // TODO: use localStorage to save/write this information
  
//   console.log('loading default players');
  
//   let tempPlayers = ['Daddy', 'Mattie', 'Amy'];
//   let highScores = [40, 6, 4];
//   this.activePlayer = activePlayerName;
  
//   for (let i = 0; i < tempPlayers.length; i++) {
//     let playerName = tempPlayers[i];
//     let playerScore = highScores[i];
//     this.allPlayers.push(new Player(playerName, playerScore));
//   }

// };

// QuizWhiz.prototype.save = function (playerObject) {
//   console.log(playerObject.name);

//   console.log(this['Daddy']);

//   let rawPlayerData = JSON.stringify(this);
//   // console.log(rawPlayerData);
//   localStorage.setItem('playerData', rawPlayerData);

//   console.log('data saved');
// };

// QuizWhiz.prototype.loadPlayerData = function () {
//   // const playerNameInput = document.getElementById('playerName');
//   // console.log(playerNameInput);
//   console.log('clicked');
// };

// // document.getElementById('start-game-btn').addEventListener('click', loadPlayerData);


// QuizWhiz.prototype.ORIGINALloadPlayer = function (activePlayerName) {
//   let rawPlayerData = localStorage.getItem('playerData');

//   const playerData = JSON.parse(rawPlayerData);
//   const activePlayerObj = playerData.allPlayers.find(playerObject => playerObject.name === activePlayerName);

//   if (activePlayerObj){
//     console.log('successfully loaded ' + activePlayerName);
//     return(activePlayerObj);
//   } else {
//     this.loadDefaultPlayers(activePlayerName);
//     console.log('creating new user ' + activePlayerName);
//     return (new Player(activePlayerName));
//   }
// };


// QuizWhiz.prototype.loadSpecificPlayer = function (playerName) {
//   // Loads existing player
//   // if no existing player, cr  eates a new player

//   this.activePlayer = playerName;
//   // console.log(this.allPlayers[0]);

//   // TODO: This should return a single Player object
// };

