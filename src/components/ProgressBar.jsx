import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ currentQuestionIndex, totalQuestions }) => {
  const attendedQuestions = currentQuestionIndex + 1;

  return (
    <div className="progress-container">
      <div className="progress-info">
        <span className="Progress-title">Progress</span>
        <span className="progress-percentage">
          {attendedQuestions}/{totalQuestions}
        </span>
      </div>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${(attendedQuestions / totalQuestions) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
