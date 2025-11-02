import { useState, useEffect } from "react";
import "../Styles/Letter.css";
import monitorData from "../monitorData";
import { useStampable } from "../hooks/useStampable.jsx";
import { useGameState, isVisible } from "./GameState.jsx"

const Letter = ({ onClose, openPopUp, onElementStamp }) => {
  const { state } = useGameState();
  const [openLetter, setOpenLetter] = useState(false);
  const data = monitorData[`chapter_${state.flags.currentChapter}`];

  // Create stampable hooks for each element
  const header = useStampable('header');
  const text = useStampable('text');
  const link = useStampable('link');
  const imgLink = useStampable('imgLink');
  const footer = useStampable('footer');
  const srcAddress = useStampable('src-address');
  const destAddress = useStampable('dest-address');
  const port = useStampable('port');

  // Helper function to get the display value (either original or corrected)
  const getDisplayValue = (elementId, originalValue, mistakeKey) => {
    if (!mistakeKey) return originalValue;
    
    const mistakeData = state.flags[mistakeKey];
    if (!mistakeData || typeof mistakeData !== 'object') return originalValue;
    
    // For single value corrections
    if (typeof mistakeData.corrections === 'string' || typeof mistakeData.corrections === 'number') {
      return mistakeData.corrections;
    }
    
    // For multi-field corrections, you'll need to specify which field
    return originalValue;
  };

  // Helper function for multi-field corrections (like links)
  const getDisplayValues = (elementId, originalValue, mistakeKey, fieldName) => {
    if (!mistakeKey) return originalValue;
    
    const mistakeData = state.flags[mistakeKey];
    if (!mistakeData || typeof mistakeData !== 'object') return originalValue;
    
    // If corrections is an object with field names
    if (typeof mistakeData.corrections === 'object' && fieldName) {
      return mistakeData.corrections[fieldName] || originalValue;
    }
    
    return originalValue;
  };

  useEffect(() => {
    if (isVisible(state, 'using_stamp')) {
      setOpenLetter(true);
    }
  }, [isVisible(state, 'using_stamp'), state]);

  const handleLetterClick = () => {
    if (!isVisible(state, 'using_stamp')) {
      setOpenLetter(!openLetter);
    }
  };

  const handleStampClick = (stampHandler) => (e) => {
    stampHandler(e);
    if (isVisible(state, 'using_stamp')) {
      onElementStamp();
    }
  };

  // Get corrected values
  const displayPort = getDisplayValue('port', data.port, port.mistakeKey);
  const displayLink = getDisplayValues('link', data.link, link.mistakeKey, 'linkName');
  const displayLinkSource = getDisplayValues('imgLink', data.imgLink, imgLink.mistakeKey, 'linkSource');
  const displayText = getDisplayValues('text', data.text, text.mistakeKey, 'textContent');
  const displayHeader = getDisplayValues('header', "------<HEADER>------", header.mistakeKey, 'headerContent');
  const displayFooter = state.flags.currentChapter === 1 && !footer.isCompleted
    ? "------"
    : getDisplayValue('footer', "---<FOOTER>---", footer.mistakeKey);

  return (
    <div
      className={`Letter ${openLetter ? (isVisible(state, 'using_stamp') ? 'open' : 'open closable') : 'closed openable'}`}
      onClick={handleLetterClick}
    >
      {openLetter && (
        <div className="letter-text-container">
          {/* Header */}
          <div
            className={header.getClassNames('header')}
            onClick={handleStampClick(header.handleStamp)}
          >
            <p>{displayHeader}</p>
          </div>

          {/* Text */}
          <div
            className={text.getClassNames('letter-text')}
            onClick={handleStampClick(text.handleStamp)}
          >
            <div dangerouslySetInnerHTML={{ __html: displayText || data.text }} />
          </div>

          {/* Link */}
          {data.link !== null && (
            <div
              className={link.getClassNames('link')}
              onClick={handleStampClick(link.handleStamp)}
            >
              <span 
                className="clickable" 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  openPopUp(displayLink, displayLinkSource);
                }}
              >
                {displayLink}
              </span>
              {' '}:קישור מצורף
            </div>
          )}

          {/* Footer */}

          <div
            className={footer.getClassNames('footer')}
            onClick={handleStampClick(footer.handleStamp)}
            >
            <p>{displayFooter}</p>
          </div>

        </div>
      )}

      {/* Protocol */}
      <div className="protocol">
        <p>{data.protocol}</p>
      </div>

      {/* Source Address */}
      <div
        className={srcAddress.getClassNames('src-adress')}
        onClick={handleStampClick(srcAddress.handleStamp)}
      >
        <p>מאית: {data.sourceAddress}</p>
      </div>

      {/* Destination Address */}
      <div
        className={destAddress.getClassNames('dest-adress')}
        onClick={handleStampClick(destAddress.handleStamp)}
      >
        <p>לכבוד: {data.destinationAddress}</p>
      </div>

      {/* Port */}
      <div
        className={port.getClassNames('port')}
        onClick={handleStampClick(port.handleStamp)}
      >
        <p>פורט: {displayPort}</p>
      </div>
    </div>
  );
};

export default Letter;