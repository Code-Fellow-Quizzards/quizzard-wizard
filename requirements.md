# Software Requirements

## Vision
We feel as though education needs to be more fun. Our mission is to provide an engaging education platform that is competitive and fun!

## Scope (In/Out)
### IN - What will your product do

### Product Features 

- Loading/saving user data Player registration
- Game design (10 number of questions = 1 round)
- Instructions on how to play
- Display current score at all times of the quiz
- Basic reports (# q's asked vs #q's correct)
- Loading trivia/multiple choice questions from a list


### OUT - What will your product not do.
- no user created quizzes
- data will not be transferable outside of the app
- no multiplayer quizzes


## MVP vs Stretch Goals
### MVP Goals
- Loading/saving user data Player registration
- Simple game design (multiple choice questions)
- instructions how to play
- loading questions
- basic Leaderboard report (name and accuracy score)

### Stretch Goals
- Difficulty setting
- delete user
- Timed questions
- Typing speed quiz
- Collect questions via API
- more comprehensive reporting (name, high score per difficulty; q's asked vs answered correctly)
- dynamically moving objects
- a "Previous" button


## Functional Requirements

### Game functionality

- A player will be asked their name
- if that name exists, it'll load relevant data, otherwise it'll create a new player
- a game is then started, one round is 10 questions
- multiple choice questions are asked (app tracks total number of q's asked in a round, and in total)
- if the player gets a correct answer, their score is updated and next question is asked
- if they get it wrong, they will know, and the next question will be asked
- the player will see Question x of 10, where x is the current question number
- at the end of the game, the user will see their rounds score, their total score and have the option to play again, or to view results chart

### Data Flow

- users data is saved/loaded from localStorage
- it is updated every question
- there is a counter on the number of questions shown during play
- during play data is stored in 'current' data handlers (currentScore, currentTotalQuestionsAsked), and at the end of every round, these totals are added to lifetime counters
- when generating a leaderboard report, data is loaded into the chart so that the user can see visually how they rank against other players
