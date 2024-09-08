import React, { useState, useEffect } from 'react';
import './QuestionArea.css';

// QuestionArea component
const QuestionArea = ({ questions, onNext, timerRef }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const currentQuestion = questions[currentQuestionIndex];

    const handleOptionChange = (index) => {
        setSelectedOption(index);
    };

    useEffect(() => {
        if (!localStorage.getItem('questionData')) {
            localStorage.setItem('questionData', JSON.stringify([]));
        }
    }, []);

    useEffect(() => {
        const handleTimerExpire = () => {
            if (currentQuestionIndex < questions.length - 1) {
                handleNextClick(); // Automatically move to next question
            } else {
                setShowDialog(true); // Show dialog for the last question
            }
        };

        if (timerRef.current) {
            timerRef.current.onTimeUp = handleTimerExpire;
        }

        return () => {
            if (timerRef.current) {
                timerRef.current.onTimeUp = null; // Clean up
            }
        };
    }, [currentQuestionIndex, questions.length, timerRef]);

    const handleNextClick = () => {
        if (currentQuestionIndex < questions.length - 1) {
            if (selectedOption !== null) {
                const timeSpent = timerRef.current.getTimeSpent();
                const newEntry = {
                    questionId: currentQuestion.id,
                    selectedAnswer: selectedOption,
                    timeSpent: timeSpent,
                };
                const existingData = JSON.parse(localStorage.getItem('questionData'));
                const updatedData = [...existingData, newEntry];
                localStorage.setItem('questionData', JSON.stringify(updatedData));
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                setSelectedOption(null);
                onNext();
            }
        } else {
            if (selectedOption !== null) {
                const timeSpent = timerRef.current.getTimeSpent();
                const newEntry = {
                    questionId: currentQuestion.id,
                    selectedAnswer: selectedOption,
                    timeSpent: timeSpent,
                };
                const existingData = JSON.parse(localStorage.getItem('questionData'));
                const updatedData = [...existingData, newEntry];
                localStorage.setItem('questionData', JSON.stringify(updatedData));
                setShowDialog(true); // Show dialog on last question
            }
        }
    };

    const handleDialogSubmit = () => {
        if (inputValue.trim() === 'Confirm') {
            alert('Form submitted successfully!');
            setShowDialog(false);
            // Add form submission logic here
        } else {
            setErrorMessage('⚠️ Check the spelling & retry');
        }
    };

    const handleDialogClose = () => {
        setShowDialog(false);
        setErrorMessage('');
    };

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
                <p className="see-explanation">See explanation</p>
                <div className="buttons">
                    <button className="nav-button back" disabled={currentQuestionIndex === 0}>
                        Back
                    </button>
                    <button className="nav-button next" onClick={handleNextClick} disabled={selectedOption === null}>
                        {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
                    </button>
                </div>
            </div>

            {showDialog && (
                <div className="dialog-overlay">
                    <div className="dialog-box">
                        <button className="close-button" onClick={handleDialogClose}>✕</button>
                        <p className="prompt-message">
                            Do you want to submit your answer? Type "<span>Confirm</span>" in the box.
                        </p>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Confirm"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleDialogSubmit();
                                }
                            }}
                        />
                        <button className="submit-button" onClick={handleDialogSubmit}>Submit</button>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionArea;
