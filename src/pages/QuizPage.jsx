import React, { useState, useRef, useEffect } from 'react';
import Timer from '../components/Timer';
import ProgressBar from '../components/ProgressBar';
import QuestionArea from '../components/QuestionArea';
import questionsData from '../data/questionData.json';
// import './QuizPage.css';

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const timerRef = useRef();

  // Reset the timer when the question index changes
  useEffect(() => {
    resetTimer(); // Reset the timer after the question has changed
  }, [currentQuestionIndex]);

  const resetTimer = () => {
    setTimerKey((prevKey) => prevKey + 1); // This will re-render Timer with a new key
  };

  const handleNext = () => {
    // Ensure state updates before interacting with the timer
    if (currentQuestionIndex < questionsData.length ) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + .5);
    }
  };

  const handleTimeUp = () => {
    // Move to the next question when time runs out
    if (currentQuestionIndex < questionsData.length - 1) {
      handleNext();
    }
  };

  return (
    <div className="quiz-container">
      <ProgressBar
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questionsData.length}
      />
      <Timer key={timerKey} ref={timerRef} onTimeUp={handleTimeUp} />
      <QuestionArea
        questions={questionsData}
        currentQuestionIndex={currentQuestionIndex}
        onNext={handleNext}
        timerRef={timerRef}
      />
    </div>
  );
};

export default QuizPage;
