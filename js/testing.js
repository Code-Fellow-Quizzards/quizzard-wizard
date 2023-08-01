'use strict';

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

// let urlToGet = 'https://opentdb.com/api_category.php';
let urlToGet = 'https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple';


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



let questionPool = fetchAndReturnQuestionData();
questionPool.then(askQuestions);

// fetchAndReturnQuestionData.then(askQuestions);
