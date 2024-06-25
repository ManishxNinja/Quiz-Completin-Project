import { useState, useCallback } from "react"
import QUESTIONS from "../question";
import Question from "./Question";
import Summary from "./Summary";


export default function Quiz() {
  const[usersAnswers,setUserAnswers] = useState([]);

  const activeQuestionIndex = usersAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setUserAnswers(prevAnswers => [...prevAnswers, selectedAnswer]);

  },[]); 
  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

  if(quizIsComplete) {
    return <Summary userAnswers = {usersAnswers}/>
  }
  
  
  return (
      <div id="quiz">
        <Question 
          key={activeQuestionIndex}
          index={activeQuestionIndex}
          onSelectAnswer={handleSelectAnswer }
          onSkipAnswer={handleSkipAnswer}
        />

      </div>
  );
  
  
}