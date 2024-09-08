import React, { useState, useRef } from 'react';
import QuestionArea from './components/QuestionArea';
import Timer from './components/Timer';
import ProgressBar from './components/ProgressBar';
import questionsData from './data/questionData';
import './App.css';

const App = () => {
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
    <div className="app-container">
      {/* Placeholder for the Navbar */}
      <div className="navbar-placeholder"></div> 
      
      <div className="wrapper">

      <div className="header-title">Problems on Logarithm</div>
      <div className="sub-title">MCQs-Test</div>

      {/* Progress bar with current progress and total questions */}
      <ProgressBar currentQuestionIndex={currentQuestionIndex} totalQuestions={questionsData.length} />
      </div>

      <div className="content-container">
      
       <Timer key={timerKey} ref={timerRef} />
        <br></br>
        <QuestionArea
          questions={questionsData}
          onNext={handleNext}
          timerRef={timerRef}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
        />
      </div>
    </div>
    
  );
};

export default App;
