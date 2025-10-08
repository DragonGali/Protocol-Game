import {useState, useEffect} from "react";
import "../Styles/Letter.css";

import monitorData from "../monitorData";
import { useGameState } from "./GameState";

const Letter = ({ onClose, openPopUp, stampActive, stampedElements, onElementStamp, onLetterClick }) => {

  const { state, dispatch } = useGameState(false);
  const [openLetter, setOpenLetter] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(null);
  const data = monitorData[`chapter_${state.flags.currentChapter}`];

  // Auto-open letter when stamp becomes active
  useEffect(() => {
    if (stampActive) {
      setOpenLetter(true);
    }
  }, [stampActive]);

  const handleLetterClick = (e) => {
    // Only toggle letter open/close if not in stamp mode and clicking the background
    if (!stampActive && e.target.classList.contains('Letter')) {
      setOpenLetter(!openLetter);
    } else if (stampActive && e.target.classList.contains('Letter')) {
      // Clicking the letter background while stamp is active deactivates it
      onLetterClick();
    }
  };

  const handleElementClick = (e, elementId) => {
    if (stampActive) {
      e.stopPropagation();
      onElementStamp(elementId);
    }
  };

  const getElementClassName = (elementId) => {
    const isStamped = stampedElements.includes(elementId);
    const isHovered = hoveredElement === elementId;
    
    let className = '';
    if (stampActive && isHovered && !isStamped) {
      className += ' stamp-hover';
    }
    if (isStamped) {
      className += ' stamped';
    }
    return className;
  };

  return (
    <div 
      className={`Letter ${openLetter ? (stampActive ? 'open' : 'open closable') : 'closed openable'}`}
      onClick={handleLetterClick}
    >
      {openLetter && <div className="letter-text-container">
            
            <div 
              className={`header stampable-element${getElementClassName('header')}`}
              onClick={(e) => handleElementClick(e, 'header')}
              onMouseEnter={() => stampActive && setHoveredElement('header')}
              onMouseLeave={() => setHoveredElement(null)}
            >
                <p>{`------<HEADER>------`}</p>
            </div>

            <div 
              className={`letter-text stampable-element${getElementClassName('text')}`}
              onClick={(e) => handleElementClick(e, 'text')}
              onMouseEnter={() => stampActive && setHoveredElement('text')}
              onMouseLeave={() => setHoveredElement(null)}
            >
                {data.text}
            </div>

            {data.link !== null && <div 
              className={`link stampable-element${getElementClassName('link')}`}
              onClick={(e) => handleElementClick(e, 'link')}
              onMouseEnter={() => stampActive && setHoveredElement('link')}
              onMouseLeave={() => setHoveredElement(null)}
            >
                <span className="clickable" onClick={(e) => {e.stopPropagation(); openPopUp(data.link, data.imgLink)}}>{data.link}</span> :קישור מצורף
            </div>}

            <div 
              className={`footer stampable-element${getElementClassName('footer')}`}
              onClick={(e) => handleElementClick(e, 'footer')}
              onMouseEnter={() => stampActive && setHoveredElement('footer')}
              onMouseLeave={() => setHoveredElement(null)}
            >
                <p>{`---<FOOTER>---`}</p>
            </div>
            
      </div>}

      <div 
        className={`protocol stampable-element${getElementClassName('protocol')}`}
        onClick={(e) => handleElementClick(e, 'protocol')}
        onMouseEnter={() => stampActive && setHoveredElement('protocol')}
        onMouseLeave={() => setHoveredElement(null)}
      >
        <p>{data.protocol}</p>
      </div>
      <div 
        className={`src-adress stampable-element${getElementClassName('src-address')}`}
        onClick={(e) => handleElementClick(e, 'src-address')}
        onMouseEnter={() => stampActive && setHoveredElement('src-address')}
        onMouseLeave={() => setHoveredElement(null)}
      >
        <p>מאית: {data.sourceAddress}</p>
      </div>
      <div 
        className={`dest-adress stampable-element${getElementClassName('dest-address')}`}
        onClick={(e) => handleElementClick(e, 'dest-address')}
        onMouseEnter={() => stampActive && setHoveredElement('dest-address')}
        onMouseLeave={() => setHoveredElement(null)}
      >
        <p>לכבוד: {data.destinationAddress}</p>
      </div>
      <div 
        className={`port stampable-element${getElementClassName('port')}`}
        onClick={(e) => handleElementClick(e, 'port')}
        onMouseEnter={() => stampActive && setHoveredElement('port')}
        onMouseLeave={() => setHoveredElement(null)}
      >
        <p>פורט: {data.port}</p>
      </div>
    </div>
  );
};

export default Letter;