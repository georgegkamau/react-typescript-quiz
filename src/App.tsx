import React, { useState } from 'react';
import './App.css';
import QuestionCard from './components/QuestionCard';
import { Difficulty, Question, QuestionState, fetchQuiz } from './API';


// type Props = {
//   question: string;
//   answer: string[];
//   callBack: (e: React.MouseEvent<HTMLButtonElement>) => void;
//   userAnswer: string;
//   questionNum: number;
//   totalQuestions: number;
// }

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

//
function App() {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)


  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    //
    const nextQuestions = await fetchQuiz(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    )

    setQuestions(nextQuestions);
    setScore(0)
    setNumber(0);
    setUserAnswers([]);
    setLoading(false)

  }


  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    // const checkAnswer = (e: React.MouseEvent) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer == answer;
      if (correct) setScore(prev => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, answerObject])
    }
  }

  //
  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion)
    }

  }

  // const question: Props = { question: 'hwllow' }
  // console.log('appt page ', fetchQuiz(TOTAL_QUESTIONS, Difficulty.EASY));
  //
  if (questions.length > 0) {
    console.log('answers ', questions[number].answers);
  }



  return (
    <div className="App">
      <h2> Quiz</h2>
      <div>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button onClick={startTrivia}> Start</button>
        ) : null}
      </div>
      <div>
        {!gameOver ? <p> score: {score} </p> : null}
        {loading && <p> Loading quuestions.... </p>}


        {!loading && !gameOver && (
          // question, answers, callBack, userAnswer, questionNum, totalQuestions


          <QuestionCard
            question={questions[number].question}
            answers={questions[number].answers}
            callBack={checkAnswer}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            // userAnswer={undefined}
            questionNum={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
          />
        )}
      </div>
      <div>
        {!gameOver && !loading && userAnswers.length === number + 1
          && number !== TOTAL_QUESTIONS - 1 ? (
          <button onClick={nextQuestion}> Next</button>
        ) : null}
      </div>
    </div>
  );
}

export default App;
