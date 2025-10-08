import { useState, useEffect } from "react";
import "../Styles/Letter.css";

import monitorData from "../monitorData";
import { useGameState, isVisible } from "./GameState";

const Letter = ({ onClose, openPopUp, onElementStamp, onLetterClick }) => {
  const { state, dispatch } = useGameState(false);
  const [openLetter, setOpenLetter] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(null);
  const data = monitorData[`chapter_${state.flags.currentChapter}`];

  // The stamped element is now stored in GameState as state.stampedElement
  const stampedElement = state.stampedElement;

  useEffect(() => {
    if (isVisible(state, 'using_stamp')) {
      setOpenLetter(true);
    }
  }, [isVisible(state, 'using_stamp')]);

  const handleLetterClick = (e) => {
    if (!isVisible(state, 'using_stamp')) {
      setOpenLetter(!openLetter);
    }

  };

  const handleElementClick = (e, elementId) => {
    if (isVisible(state, 'using_stamp')) {
      e.stopPropagation();
      dispatch({ type: 'SET_FLAG', key: 'stampedElement', value: elementId }); // Store stamped element in GameState
      onElementStamp();
    }
  };

  const getElementClassName = (elementId) => {
    const isStamped = stampedElement === elementId;
    const isHovered = hoveredElement === elementId;

    let className = '';
    if (isVisible(state, 'using_stamp') && isHovered && !isStamped) {
      className += ' stamp-hover';
    }
    if (isStamped) {
      className += ' stamped';
    }
    return className;
  };

  return (
    <div
      className={`Letter ${openLetter ? (isVisible(state, 'using_stamp') ? 'open' : 'open closable') : 'closed openable'}`}
      onClick={handleLetterClick}
    >
      {openLetter && <div className="letter-text-container">
        <div
          className={`header stampable-element${getElementClassName('header')} ${isVisible(state, 'using_stamp') ? 'stamp-active' : ''}`}
          onClick={(e) => handleElementClick(e, 'header')}
          onMouseEnter={() => isVisible(state, 'using_stamp') && setHoveredElement('header')}
          onMouseLeave={() => setHoveredElement(null)}
        >
          <p>{`------<HEADER>------`}</p>
        </div>

        <div
          className={`letter-text stampable-element${getElementClassName('text')}  ${isVisible(state, 'using_stamp') ? 'stamp-active' : ''}`}
          onClick={(e) => handleElementClick(e, 'text')}
          onMouseEnter={() => isVisible(state, 'using_stamp') && setHoveredElement('text')}
          onMouseLeave={() => setHoveredElement(null)}
        >
          {data.text}
        </div>

        {data.link !== null && <div
          className={`link stampable-element${getElementClassName('link')}  ${isVisible(state, 'using_stamp') ? 'stamp-active' : ''}`}
          onClick={(e) => handleElementClick(e, 'link')}
          onMouseEnter={() => isVisible(state, 'using_stamp') && setHoveredElement('link')}
          onMouseLeave={() => setHoveredElement(null)}
        >
          <span className="clickable" onClick={(e) => { e.stopPropagation(); openPopUp(data.link, data.imgLink); }}>{data.link}</span> :קישור מצורף
        </div>}

        <div
          className={`footer stampable-element${getElementClassName('footer')} ${isVisible(state, 'using_stamp') ? 'stamp-active' : ''}`}
          onClick={(e) => handleElementClick(e, 'footer')}
          onMouseEnter={() => isVisible(state, 'using_stamp') && setHoveredElement('footer')}
          onMouseLeave={() => setHoveredElement(null)}
        >
          <p>{`---<FOOTER>---`}</p>
        </div>
      </div>}

      <div className={`protocol`}>
        <p>{data.protocol}</p>
      </div>
      <div
        className={`src-adress stampable-element${getElementClassName('src-address')} ${isVisible(state, 'using_stamp') ? 'clickable' : ''}`}
        onClick={(e) => handleElementClick(e, 'src-address')}
        onMouseEnter={() => isVisible(state, 'using_stamp') && setHoveredElement('src-address')}
        onMouseLeave={() => setHoveredElement(null)}
      >
        <p>מאית: {data.sourceAddress}</p>
      </div>
      <div
        className={`dest-adress stampable-element${getElementClassName('dest-address')} ${isVisible(state, 'using_stamp') ? 'clickable' : ''}`}
        onClick={(e) => handleElementClick(e, 'dest-address')}
        onMouseEnter={() => isVisible(state, 'using_stamp') && setHoveredElement('dest-address')}
        onMouseLeave={() => setHoveredElement(null)}
      >
        <p>לכבוד: {data.destinationAddress}</p>
      </div>
      <div
        className={`port stampable-element${getElementClassName('port')} ${isVisible(state, 'using_stamp') ? 'clickable' : ''}`}
        onClick={(e) => handleElementClick(e, 'port')}
        onMouseEnter={() => isVisible(state, 'using_stamp') && setHoveredElement('port')}
        onMouseLeave={() => setHoveredElement(null)}
      >
        <p>פורט: {data.port}</p>
      </div>
    </div>
  );
};

export default Letter;