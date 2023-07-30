'use strict';

console.log('app.js loaded');

let EASY_DIFFICULTY = 1;
let MEDIUM_DIFFICULTY = 2;
let HIGH_DIFFICULTY = 3;

function AppState() {
  this.allPlayers = [];
  this.activePlayer = null;
}


AppState.prototype.loadDefaultPlayers = function (activePlayerName) {
  // This function loads players that have previously played the game
  // for now, I'm doing this manually
  // TODO: use localStorage to save/write this information
  
  console.log('loading default players');
  
  let tempPlayers = ['Daddy', 'Mattie', 'Amy'];
  let highScores = [40, 6, 4];
  this.activePlayer = activePlayerName;
  
  for (let i = 0; i < tempPlayers.length; i++) {
    let playerName = tempPlayers[i];
    let playerScore = highScores[i];
    this.allPlayers.push(new Player(playerName, playerScore));
  }

};

AppState.prototype.save = function (playerObject) {
  console.log(playerObject.name);

  console.log(this['Daddy']);

  let rawPlayerData = JSON.stringify(this);
  // console.log(rawPlayerData);
  localStorage.setItem('playerData', rawPlayerData);

  console.log('data saved');
};

AppState.prototype.loadPlayer = function (activePlayerName) {
  let rawPlayerData = localStorage.getItem('playerData');

  const playerData = JSON.parse(rawPlayerData);
  const activePlayerObj = playerData.allPlayers.find(playerObject => playerObject.name === activePlayerName);

  if (activePlayerObj){
    console.log('successfully loaded ' + activePlayerName);
    return(activePlayerObj);
  } else {
    this.loadDefaultPlayers(activePlayerName);
    console.log('creating new user ' + activePlayerName);
    return (new Player(activePlayerName));
  }
};


AppState.prototype.loadSpecificPlayer = function (playerName) {
  // Loads existing player
  // if no existing player, creates a new player

  this.activePlayer = playerName;
  // console.log(this.allPlayers[0]);

  // TODO: This should return a single Player object
};


function Player (playerName, highScore = 0, difficultyLevel = EASY_DIFFICULTY) {
  this.name = playerName;
  this.highScore = highScore;
  this.difficultyLevel = difficultyLevel;
}

