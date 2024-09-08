import React, { createContext, useState, useRef } from 'react';

export const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const timerRef = useRef();

  const resetTimer = () => {
    setTimerKey(prevKey => prevKey + 1); // Reset the timer on each question
  };

  const handleNext = () => {
    resetTimer();
    setCurrentQuestionIndex(prevIndex => prevIndex + 1); // Move to the next question
  };

  return (
    <QuizContext.Provider value={{
      currentQuestionIndex,
      setCurrentQuestionIndex,
      timerRef,
      handleNext,
      timerKey
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
