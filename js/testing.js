'use strict';

function fetchQuizData(url) {
  // GPT helping out with the API pull request

  // fetch('https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple')
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

let urlToGet = 'https://opentdb.com/api_category.php';

fetchQuizData(urlToGet);


// // Function to fetch the JSON data from the file
// async function fetchQuizData() {
//   try {
//     const response = await fetch('./quizData.json');
//     const data = await response.json();
//     // Once the data is fetched, you can use it in your app
//     console.log(data); // Do something with the data
//   } catch (error) {
//     console.error('Error fetching quiz data:', error);
//   }
// }

// Call the function to fetch the data
// fetchQuizData();


// function Question(question,correctAnswer, difficultyLevel) {
//   player.questions.push({
//     question: question,
//     choices: choices,
//     correctAnswer: correctAnswer,
//     difficultyLevel: difficultyLevel, // Added difficulty level to the question
//   });
// }  


// JSON {
//   difficultyLevel: 
//     level: 1
//     questions:  {
//       category: {
//         movies: {
//           question: "Question goes here",
//           correctAnswer: "2001",
//           incorrectAnswer: ["1999", "1888"],
//         },
//         anime: {
    
//         },
//     }
//   }
// }


// let questionPool = {
//   questionText: "A slug's blood is green.", 
//   questionNumber: 1,
//   correctAnswer: "t",
// };

// let questionPool = {
//   questionText: "What color is a slug's", 
//   questionNumber: 1,
//   correctAnswer: "Green",
//   incorrectAnswers: ["Blue", "yellow", "pink"],
// };
