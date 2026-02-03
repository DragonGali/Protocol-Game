import { useState, useEffect } from "react";
import "../Styles/Letter.css";
import monitorData from "../data_files/monitorData";
import { useStampable } from "../hooks/useStampable.jsx";
import { useGameState, isVisible, hasCompleted } from "./GameState.jsx"


/* 

    Letter Component
    ----------------

    This component represents the letter that the player receives in each chapter.
    It is very messy, so I'm sorry in advance... (who am I kidding no one is reading this, who would learn react in this tiny base ither than me...)

    The letter can be opened and closed, also it can be stamped so this Component hadles it's interactions with the stamp tool.
    When the player hover's the stamp over a line it is red, when he clicks it is selected and an event ususally plays,
    if it doesnt it means that iv'e forgotten to add a globalWait somewhere.

    Once the event is over from dialogueData, and the player has indeed stamped the right element a dispatch
    to fix the mistake will be sent and data from MonitorData will be used to update the selecte line, but it will
    remain green, until you switch to the next chapter.

    Just relised theres one letter missing from this Component...can't have it feel lonely(z)
*/

const Letter = ({ onClose, openPopUp, onElementStamp }) => {
  const { state, dispatch } = useGameState();
  const [openLetter, setOpenLetter] = useState(false);
  const [spamPopups, setSpamPopups] = useState([]);
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

  const triggerPopupSpam = (title, imgLink) => {
    const popupCount = 40;
    const popups = [];

    // Spawn popups one after another with 50ms delay
    for (let i = 0; i < popupCount; i++) {
      setTimeout(() => {
        const id = `spam-${Date.now()}-${i}`;
        const randomTop = Math.random() * 40 + 'vh';
        const randomLeft = Math.random() * 20 + 'vw';
        
        setSpamPopups(prev => [...prev, {
          id,
          title,
          imgLink,
          top: randomTop,
          left: randomLeft
        }]);
      }, i * 50);
    }

    // Delete all popups after 2 seconds
    setTimeout(() => {
      setSpamPopups([]);
    }, 2000);
  };

  const handleLinkClick = (displayLink, displayLinkSource) => {
    // Check if chapter 12 AND terminal mistake is solved
    if (state.flags.currentChapter === 12 && hasCompletedTerminalMistake) {
      triggerPopupSpam(displayLink, displayLinkSource);
    } else {
      // Normal behavior
      openPopUp(displayLink, displayLinkSource);
      dispatch({type: 'SET_FLAG', key: 'link_state', value: true});
    }
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
  const displayHeader = data.header ? getDisplayValue('header', data.header, header.mistakeKey) : '------HEADER------';
  const displayFooter = data.footer ? getDisplayValue('footer', data.footer, footer.mistakeKey) : '---FOOTER---';

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
                  handleLinkClick(displayLink, displayLinkSource);
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
        <div style={{fontSize: data.protocolFontSize || 'clamp(1rem, 5vw, var(--font-largest))'}} dangerouslySetInnerHTML={{ __html: data.protocol }} />
      </div>

      {/* Source Address */}
      <div
        className={srcAddress.getClassNames('src-adress')}
        onClick={handleStampClick(srcAddress.handleStamp)}
      >
        <p>מאת: {displaySourceAddress}</p>
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

      {/* Spam Popups */}
      {spamPopups.map(popup => (
        <div
          key={popup.id}
          className="spam-popup"
          style={{
            top: popup.top,
            left: popup.left
          }}
        >
          <div className="spam-popup-header">
            {popup.title}
          </div>
          <img 
            src={popup.imgLink} 
            alt="popup"
          />
        </div>
      ))}
    </div>
  );
};

export default Letter;