import { useState, useCallback } from "react"
import QUESTIONS from "../question";
import QuestionTimer from "./QuestionTimer";
import quizCompleteImg from '../assets/quiz-complete.png' 


export default function Quiz() {

  const[usersAnswers,setUserAnswers] = useState([]);

  const activeQuestionIndex = usersAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevUserAnswer) => {
      return [...prevUserAnswer,selectedAnswer];
    }); 
  },[])
  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

  if(quizIsComplete) {
    return <div id ="summary">
      <img src={quizCompleteImg} alt="Trophy icon" />
      <h2>Quiz Completed!</h2>

    </div>
  }
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

   
  return (
      <div id="quiz">
        <div id="question">
          <QuestionTimer 
            key={activeQuestionIndex}
            timeout={10000} 
            onTimeout={handleSkipAnswer }
          />
          <h2>
            {QUESTIONS[activeQuestionIndex].text}
          </h2>
          <ul id="answers">
            { shuffledAnswers.map((answer) => {
              return (
                <li key={answer} className="answer">
                  <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                </li>
              )
            })}
          </ul>

      </div> 

    </div>
  );
  
  
}