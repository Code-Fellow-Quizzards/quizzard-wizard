let scoreData = {
  score: 100,
  age: 47,
  favoriteNumbers: [ 33, 42 ],
  favoriteClassics: [
    'The Shawshank Redemption',
    'Inception',
    'The Godfather',
    'Pulp Fiction',
    'The Dark Knight'
  ],
  favoriteHorrors: [
    'The Exorcist',
    'The Shining',
    'Psycho',
    'Get Out',
    'A Nightmare on Elm Street',
  ],
};
let responseFromAPI = 
{
  response_code: 0,
  results: [
    {
      category: 'Mythology',
      type: 'multiple',
      difficulty: 'easy',
      question: 'Who was the only god from Greece who did not get a name change in Rome?',
      correct_answer: 'Apollo',
      incorrect_answers: [Array]
    },
    {
      category: 'Mythology',
      type: 'multiple',
      difficulty: 'easy',
      question: 'The ancient Roman god of war was commonly known as which of the following?',
      correct_answer: 'Mars',
      incorrect_answers: [Array]
    },
    {
      category: 'Mythology',
      type: 'multiple',
      difficulty: 'easy',
      question: 'Who was the King of Gods in Ancient Greek mythology?',
      correct_answer: 'Zeus',
      incorrect_answers: [Array]
    },
    {
      category: 'Mythology',
      type: 'multiple',
      difficulty: 'easy',
      question: 'Which Greek &amp; Roman god was known as the god of music, truth and prophecy, healing, the sun and light, plague, poetry, and more?',
      correct_answer: 'Apollo',
      incorrect_answers: [Array]
    },
    {
      category: 'Mythology',
      type: 'multiple',
      difficulty: 'easy',
      question: 'The greek god Poseidon was the god of what?',
      correct_answer: 'The Sea',
      incorrect_answers: [Array]
    },
    {
      category: 'Mythology',
      type: 'multiple',
      difficulty: 'easy',
      question: 'Which figure from Greek mythology traveled to the underworld to return his wife Eurydice to the land of the living?',
      correct_answer: 'Orpheus',
      incorrect_answers: [Array]
    },
    {
      category: 'Mythology',
      type: 'multiple',
      difficulty: 'easy',
      question: 'In Greek mythology, who is the god of wine?',
      correct_answer: 'Dionysus',
      incorrect_answers: [Array]
    },
    {
      category: 'Mythology',
      type: 'multiple',
      difficulty: 'easy',
      question: 'In most traditions, who was the wife of Zeus?',
      correct_answer: 'Hera',
      incorrect_answers: [Array]
    },
    {
      category: 'Mythology',
      type: 'multiple',
      difficulty: 'easy',
      question: 'What mythology did the god &quot;Apollo&quot; come from?',
      correct_answer: 'Greek and Roman',
      incorrect_answers: [Array]
    },
    {
      category: 'Mythology',
      type: 'multiple',
      difficulty: 'easy',
      question: 'What mytological creatures have women&#039;s faces and vultures&#039; bodies?',
      correct_answer: 'Harpies',
      incorrect_answers: [Array]
    }
  ]
};

// In your app.js file

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
