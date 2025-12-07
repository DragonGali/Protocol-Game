import { useState, useEffect, use } from "react";
import "../Styles/Letter.css";
import monitorData from "../monitorData";
import { useStampable } from "../hooks/useStampable.jsx";
import { useGameState, isVisible, hasCompleted } from "./GameState.jsx"

const Letter = ({ onClose, openPopUp, onElementStamp }) => {
  const { state, dispatch } = useGameState();
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

  //for changing text if command needs to be done first
  const [hasCompletedTerminalMistake, setHasCompletedTerminalMistake] = useState(null);

 // Helper function to get the display value (either original or corrected)
  const getDisplayValue = (elementId, originalValue, mistakeKey) => {
    if (!mistakeKey) return originalValue;
    
    const mistakeData = state.flags[mistakeKey];
    if (!mistakeData || typeof mistakeData !== 'object') return originalValue;
    
    // Return the corrected value if it exists
    if (mistakeData.correction !== undefined) {
      return mistakeData.correction;
    }
    
    return originalValue;
  };

  useEffect(() => {
    if (isVisible(state, 'using_stamp') || hasCompleted(state, 'mistake_6')) {
      setOpenLetter(true);
    }

    if (isVisible(state, 'submit-animation')) {
      setOpenLetter(false);
    }
  }, [isVisible(state, 'using_stamp'), state]);

  const handleLetterClick = () => {
    if (!isVisible(state, 'using_stamp')) {
      setOpenLetter(!openLetter);
      dispatch({type: 'SET_FLAG', key: 'letter_state', value: !openLetter});
    }
  };

  const handleStampClick = (stampHandler) => (e) => {
    stampHandler(e);
    if (isVisible(state, 'using_stamp')) {
      onElementStamp();
    }
  };

  useEffect(() => {
    const mistakeKey = `mistake_${state.flags.currentChapter}`;
    const mistakeValue = state.flags[mistakeKey];
    setHasCompletedTerminalMistake(mistakeValue === 'terminal' ? hasCompleted(state, mistakeKey) : true);
  }, [state.completed, state.flags]);

  // Get corrected values
  const displayPort = getDisplayValue('port', data.port, port.mistakeKey);
  const displayLink = getDisplayValue('link', data.link, link.mistakeKey);
  const displayLinkSource = getDisplayValue('imgLink', data.imgLink, imgLink.mistakeKey);
  const displayText = getDisplayValue('text', data.text, text.mistakeKey);
  const displayHeader = getDisplayValue('header', "------<HEADER>------", header.mistakeKey);
  const displayFooter = state.flags.currentChapter === 1 && !footer.isCompleted
    ? "------"
    : getDisplayValue('footer', "---<FOOTER>---", footer.mistakeKey);

  const displaySourceAddress = getDisplayValue('src-address', data.sourceAddress, srcAddress.mistakeKey)
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
            {hasCompletedTerminalMistake && <div dangerouslySetInnerHTML={{ __html: displayText || data.text }} />}
            {!hasCompletedTerminalMistake && <div dangerouslySetInnerHTML={{ __html:data.commandWaitingText}} />}
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
        <div dangerouslySetInnerHTML={{ __html: data.protocol }} />
      </div>

      {/* Source Address */}
      <div
        className={srcAddress.getClassNames('src-adress')}
        onClick={handleStampClick(srcAddress.handleStamp)}
      >
        <p>מאית: {displaySourceAddress}</p>
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