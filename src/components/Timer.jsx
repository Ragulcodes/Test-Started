import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import './Timer.css';
import clockImage from './assets/clock.svg';

const Timer = forwardRef(({ onTimeUp }, ref) => {
    const [timeLeft, setTimeLeft] = useState(5); // 5 minutes in seconds

    useImperativeHandle(ref, () => ({
        getTimeSpent: () => 5 - timeLeft // Time spent on the current question
    }));

    useEffect(() => {
        setTimeLeft(5); // Reset timer to 5 minutes
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    if (onTimeUp) onTimeUp(); // Call the callback when time is up
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [onTimeUp]);

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
