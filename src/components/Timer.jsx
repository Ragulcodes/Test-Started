import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import './Timer.css';
import clockImage from './assets/clock.svg';

const Timer = forwardRef(({ onTimeUp }, ref) => {
  const [timeLeft, setTimeLeft] = useState(5); // 5 seconds for simplicity

  useImperativeHandle(ref, () => ({
    getTimeSpent: () => 5 - timeLeft, // Time spent on the current question
  }));

  useEffect(() => {
    let interval;
    
    // Only set up the interval when timeLeft is more than 0
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(interval); 
            // Invoke the onTimeUp function in an async manner, outside of the render cycle
            setTimeout(() => {
              if (onTimeUp) onTimeUp();
            }, 0);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [timeLeft, onTimeUp]);

  useEffect(() => {
    // Reset the timer whenever the component mounts or key changes
    setTimeLeft(5);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="timer-container">
      <div className="timer">
        <img role="img" aria-label="clock" src={clockImage} alt="Clock" />
        <span>{formatTime(timeLeft)} min</span>
      </div>
      <div className="time-left">Time left</div>
    </div>
  );
});

export default Timer;
