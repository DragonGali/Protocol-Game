import React, { useState, useEffect } from 'react';
import "../Styles/TypeWriter.css"
import { useGameState } from './GameState';

const getColorFilter = (color) => {
  const colorMap = {
    'var(--orange)': 'invert(73%) sepia(53%) saturate(464%) hue-rotate(359deg) brightness(92%) contrast(89%)',
    'var(--white)': 'invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
  };
  return colorMap[color] || colorMap['var(--white)'];
};

const TypewriterText = ({ 
  text, 
  onComplete, 
  speed = 50, 
  delayAfterComplete = 1000,
  textColor,
  triangleColor,
  triangleSize,
  triangleMargin,
  textSize,
  name,
  nameColor,
  showTriangle = true
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [canAdvance, setCanAdvance] = useState(false);
  const { dispatch } = useGameState();

  useEffect(() => {
    let charIndex = 0;
    setDisplayedText('');
    setCanAdvance(false);

    if (name && name !== "אני") dispatch({ type: 'SET_TALKING', value: true });

    const typeInterval = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayedText(text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        if (name && name !== "אני") dispatch({ type: 'SET_TALKING', value: false });

        setTimeout(() => setCanAdvance(true), delayAfterComplete);
      }
    }, speed);

    return () => {
      clearInterval(typeInterval);
      if (name && name !== "אני") dispatch({ type: 'SET_TALKING', value: false });
    };
  }, [text, speed, delayAfterComplete, name]);

  const handleClick = () => {
    if (canAdvance && onComplete) onComplete();
  };

  return (
    <div className="typewriter-container" onClick={handleClick}>
      <div 
        className={`typewriter-text ${canAdvance && showTriangle ? 'clickable' : ''}`}
        style={{ color: textColor, fontSize: textSize }}
      >
        <p>
          {name && <span style={{ color: nameColor }}>{name}:</span>} {displayedText}
          {canAdvance && showTriangle && (
            <img 
              src="./General/triangle-indicator.svg" 
              alt="Continue" 
              className="continue-triangle"
              style={{ 
                filter: `brightness(0) saturate(100%) ${getColorFilter(triangleColor)}`,
                width: triangleSize,
                margin: triangleMargin
              }}
            />
          )}
        </p>
      </div>
    </div>
  );
};

export default TypewriterText;
