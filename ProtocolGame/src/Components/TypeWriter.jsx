import React, { useState, useEffect } from 'react';
import "../Styles/TypeWriter.css"

// Helper function to convert CSS color to filter
const getColorFilter = (color) => {
  // This is a simplified approach - you might want to use a more robust solution
  const colorMap = {
    'var(--orange)': 'invert(73%) sepia(53%) saturate(464%) hue-rotate(359deg) brightness(92%) contrast(89%)'
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
  textSize
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [canAdvance, setCanAdvance] = useState(false);

  useEffect(() => {
    let charIndex = 0;
    setDisplayedText('');
    setIsTyping(true);
    setCanAdvance(false);

    const typeInterval = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayedText(text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        // Text finished typing
        clearInterval(typeInterval);
        setIsTyping(false);
        
        // Wait then allow advancing
        setTimeout(() => {
          setCanAdvance(true);
        }, delayAfterComplete);
      }
    }, speed);

    return () => clearInterval(typeInterval);
  }, [text, speed, delayAfterComplete]);

  const handleClick = () => {
    if (canAdvance && onComplete) {
      onComplete();
    }
  };

  return (
    <div className="typewriter-container" onClick={handleClick}>
      <div 
        className="typewriter-text clickable"
        style={{ color: textColor, fontSize: textSize }}
      >
        {displayedText}
        {canAdvance && (
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
      </div>
    </div>
  );
};

export default TypewriterText;