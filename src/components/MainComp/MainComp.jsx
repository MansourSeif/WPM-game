import React, { useState, useEffect } from 'react';
import './MainComp.css';

const paragraph = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, cupiditate architecto at, earum facere libero quis hic repudiandae ipsam explicabo non rem autem sint! Debitis aliquid modi corporis. Ipsum, adipisci.";
const theText = paragraph.trim().split('');

const MainComp = () => {
  const [word, setWord] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    if (isTyping) {
      const elapsedTime = (new Date() - startTime) / 1000 / 60;
      const calculatedWpm = Math.floor(correctChars / 5 / elapsedTime); 
      setWpm(calculatedWpm);
    }
  }, [correctChars, isTyping, startTime]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (!isTyping) {
      setIsTyping(true);
      setStartTime(new Date());
    }

    if (inputValue[inputValue.length - 1] === theText[currentCharIndex]) {
      setCorrectChars(correctChars + 1);
      setCurrentCharIndex(currentCharIndex + 1);
    } else {
      setErrorCount(errorCount + 1); 
    }

    if (e.key === 'Backspace') {
      setErrorCount(errorCount -1)

    }



    if (inputValue[inputValue.length - 1] === ' ' || inputValue[inputValue.length - 1] === '\n') {
      setWord('');
    } else {
      setWord(inputValue); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      if (currentCharIndex > 0) {
        setCurrentCharIndex(currentCharIndex - 1);
        setCorrectChars(correctChars > 0 ? correctChars - 1 : 0);
      }
    }
  };

  const getCharClass = (index) => {
    if (index < currentCharIndex) {
      return 'correct-char';
    } else if (index === currentCharIndex) {
      return 'current-char';
    } else {
      return 'char';
    }
  };

  return (
    <>
      <div className='container'>
        <div className='textarea-container'>
          <h1>WPM Game</h1>
          <div className="subbar">

        <div className='card'>
          WPM: {wpm}
        </div>
          <div className="card">
         Errors: {errorCount}
          </div>
          </div>
          <div className='text-placeholder'>
            <div className='header'>Paragraph</div>
            <div className='paragraph'>
              <p className='text'>
                {theText.map((char, index) => (
                  <span className={getCharClass(index)} key={index}>
                    {char}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
        <div className='input-container'>
          <input
            type='text'
            value={word}
            className='input-bar'
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </>
  );
};

export default MainComp;
