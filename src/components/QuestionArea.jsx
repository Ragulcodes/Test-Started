import React, { useState, useEffect } from 'react';
import './QuestionArea.css';

const QuestionArea = ({ questions, currentQuestionIndex, onNext, timerRef }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  // Get the current question based on the index
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionChange = (index) => {
    setSelectedOption(index);
  };

  const handleNextClick = () => {
    if (selectedOption !== null) {
      const timeSpent = timerRef.current.getTimeSpent();
      const newEntry = {
        questionId: currentQuestion.id,
        selectedAnswer: selectedOption,
        timeSpent: timeSpent,
      };
      const existingData = JSON.parse(localStorage.getItem('questionData')) || [];
      const updatedData = [...existingData, newEntry];
      localStorage.setItem('questionData', JSON.stringify(updatedData));

      setSelectedOption(null); // Reset the selected option for the next question
      onNext(); // Move to the next question
    }
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="question-area">
      <p className="question-title">Question</p>
      <p className="question-text">{currentQuestionIndex + 1}. {currentQuestion.question}</p>
      <div className="line"></div>
      <ul className="options-list">
        {currentQuestion.options.map((option, index) => (
          <li key={index} className={`option-item ${selectedOption === index ? 'selected' : ''}`}>
            <input
              type="radio"
              name="option"
              id={`option-${index}`}
              checked={selectedOption === index}
              onChange={() => handleOptionChange(index)}
            />
            <label htmlFor={`option-${index}`}>
              <span className="circle"></span> {option}
            </label>
          </li>
        ))}
      </ul>
      <div className="navigation-buttons">
        <button
          className="nav-button next"
          onClick={handleNextClick}
          disabled={selectedOption === null}
        >
          {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuestionArea;
