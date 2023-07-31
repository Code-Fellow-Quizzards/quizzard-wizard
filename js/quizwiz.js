'use strict';

console.log('quizwiz.js loaded');

let ACTIVE_PLAYER = 'Daddy'; // this will be automated

let state = new AppState();
let player = state.loadPlayerData(ACTIVE_PLAYER);
// let player = state.load(ACTIVE_PLAYER);
// state.loadDefaultPlayers();
// state.loadSpecificPlayer(ACTIVE_PLAYER);






// // Let the player object be the active player
// let player = state.allPlayers.find(playerObject => playerObject.name === ACTIVE_PLAYER);

console.log(player.name, player.highScore, player.difficultyLevel);

player.highScore = 40;

// // Save the changes
// // state.saveAllPlayers();

// // Log Daddy's new high score
console.log(player.name, player.highScore, player.difficultyLevel);


state.save(player);
