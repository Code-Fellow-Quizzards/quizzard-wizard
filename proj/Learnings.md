
Function to collect data from Trivia provider

```javascript 
// Function to fetch data from the API
async function fetchData() {
  const url = 'https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Usage example:
fetchData().then((data) => {
  if (data) {
    console.log(data);
    // Now you can work with the data object
    // For example, if the data contains questions and answers, you can display them on your page
  }
});
```


Response from OTDB (Mythology, Multiple Choice, Easy)
```javascript 
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
}
```

## Data Explained Page 2:
> Can you explain the design principles that might be in effect here?

Here is the response:

1. **Consistency**: The JSON data maintains consistency throughout its structure. Each question object follows the same format with consistent property names. This makes it easy to parse and handle the data programmatically.

2. **Semantic Naming**: Property names in the JSON data are named descriptively, reflecting the content they hold. For example, `category`, `type`, `difficulty`, `question`, `correct_answer`, and `incorrect_answers` are all self-explanatory.

3. **Hierarchical Structure**: The data is structured in a hierarchical manner. The root object contains two properties, `response_code` and `results`. The `results` property is an array of question objects, each containing information about a specific question.

> 4. **Reusability**: Some questions might have the same category or correct answer, like the two questions about Apollo. By reusing the same value, the JSON data reduces redundancy and saves space.

5. **Flexibility**: The data is designed to accommodate multiple-choice questions with varying difficulty levels and categories. This flexibility allows the API to serve a wide range of quiz questions.

6. **Simplicity**: The JSON structure is kept simple and easy to understand. Complex nested structures are avoided, making it straightforward to parse and access the data.

7. **Standardized Values**: The data uses standardized values for the `difficulty` property, such as 'easy', 'medium', or 'hard', ensuring consistency and uniformity across questions.

8. **Scalability**: The API can easily scale to accommodate more questions by adding new objects to the `results` array.

9. **Predictability**: The consistent structure and naming of properties make the data predictable. Developers can confidently access specific information without worrying about unexpected variations.

10. **Error Handling**: The `response_code` property helps in error handling. If the value is set to 0, it indicates that the request was successful, while non-zero values might signify errors or specific response types.

Overall, these design principles help create well-organized, easy-to-understand, and maintainable JSON data that can efficiently serve quiz questions for various applications.


Why is the `incorrect_answers` listed as an Array?

Listing `incorrect_answers` as an array in the JSON data allows for flexibility and scalability when dealing with multiple-choice questions. There are several reasons why using an array is beneficial:

1. **Multiple Options**: In a multiple-choice question, there can be more than one incorrect answer. Using an array allows for storing multiple incorrect options, and developers can easily access and iterate through them when presenting the choices to the user.

2. **Consistent Data Structure**: By representing all answers (correct and incorrect) as elements of the same array, the data maintains a consistent structure across all questions. This consistency simplifies data processing and manipulation.

3. **Easy Expansion**: If the number of incorrect options changes for future questions, using an array allows for seamless expansion without modifying the data structure. Additional incorrect answers can be added to the array without affecting the overall JSON format.

4. **Simplified Parsing**: When retrieving the question data programmatically, accessing and processing the incorrect answers becomes straightforward because they are all stored in a single array.

5. **Standardization**: Representing the incorrect answers in an array adheres to the general best practices of using arrays to store collections of related data. It aligns with the concept of grouping similar items together.

6. **Data Transformation**: Arrays are commonly used in JavaScript for data transformation operations like filtering, mapping, or shuffling. Using an array allows for easy manipulation of the answer choices.

In summary, listing `incorrect_answers` as an array provides a well-structured, scalable, and standardized approach to representing multiple-choice options in the JSON data. This design choice enables smooth handling of question data and ensures compatibility with various programming languages and frameworks that work with JSON data.


## Completing the data

GPT Prompt: 
> adjust the object data such that each incorrect_answers has an array of incorrect answers. these incorrect answers should be consistent with the correct answer. show me the first iteration to make sure you inderstand me

