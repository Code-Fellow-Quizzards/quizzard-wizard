'use strict';

console.log('results.js loaded');

// let state = new QuizWhiz();
// let state = loadPlayerData('qqq');
// let state = loadPlayerData('rrr');

// console.log(state);

function loadleaderboard() {
  const leaderboardBody = document.getElementById('leaderboard-body');

//   leaderboardBody.innerHTML = '';

  const players = [];
  for (let i = 0; i<localStorage.length; i++) {
    const playerName = localStorage.key(i); //got this from W3 to get the player names from localstorage.
    const playerData = JSON.parse(localStorage.getItem(playerName));
    players.push(playerData);
  }

  players.sort((a, b) => b.highScore - a.highScore);

  const topTwenty = Math.min(players.length, 20); //i asked gtp to help me show only top 20.

  for (let rank = 1; rank <= topTwenty; rank++) {
    const player = players[rank-1];
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${rank}</td>
        <td>${player.name}</td>
        <td>${player.highScore}</td>
       `;
    leaderboardBody.appendChild(row);
  }
}

loadleaderboard();
