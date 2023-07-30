'use strict';

console.log('results.js loaded');

let state = new AppState();
state.loadDefaultPlayers();
console.log(state.allPlayers);
