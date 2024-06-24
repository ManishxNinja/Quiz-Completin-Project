import { useState, useCallback } from "react"
import QUESTIONS from "../question";
import Question from "./Question";
import quizCompleteImg from '../assets/quiz-complete.png' 


export default function Quiz() {
  const [answerState, setAnswerState] = useState('');
  const[usersAnswers,setUserAnswers] = useState([]);

  const activeQuestionIndex = answerState === '' ? usersAnswers.length : usersAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setAnswerState('answered');

    setUserAnswers(prevAnswers => [...prevAnswers, selectedAnswer]);

    setTimeout(() => {
      if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
        setAnswerState('correct');
      }
      else {
        setAnswerState('wrong');
      }

      setTimeout(() => {
        setAnswerState('')
      }, 2000);

    }, 1000);


  },[activeQuestionIndex]); 
  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

  if(quizIsComplete) {
    return <div id ="summary">
      <img src={quizCompleteImg} alt="Trophy icon" />
      <h2>Quiz Completed!</h2>

    </div>
  }
  
  
  return (
      <div id="quiz">
        <Question 
          key={activeQuestionIndex}
          questionText={QUESTIONS[activeQuestionIndex].text}
          answers={QUESTIONS[activeQuestionIndex].answers}
          onSelectAnswer={handleSelectAnswer }
          selectedAnswer={usersAnswers[usersAnswers.length - 1]}
          answerState={answerState}
          onSkipAnswer={handleSkipAnswer}
        />

      </div>
  );
  
  
}