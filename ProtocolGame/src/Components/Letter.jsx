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
  const footer = useStampable('footer');
  const srcAddress = useStampable('src-address');
  const destAddress = useStampable('dest-address');
  const port = useStampable('port');

  useEffect(() => {
    if (isVisible(state, 'using_stamp')) {
      setOpenLetter(true);
    }
  }, [isVisible(state, 'using_stamp')]);

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
            <p>{`------<HEADER>------`}</p>
          </div>

          {/* Text */}
          <div
            className={text.getClassNames('letter-text')}
            onClick={handleStampClick(text.handleStamp)}
          >
            <div dangerouslySetInnerHTML={{ __html: data.text }} />
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
                  openPopUp(data.link, data.imgLink); 
                }}
              >
                {data.link}
              </span>
              {' '}:קישור מצורף
            </div>
          )}

          {/* Footer */}
          <div
            className={footer.getClassNames('footer')}
            onClick={handleStampClick(footer.handleStamp)}
          >
            <p>
              {state.flags.currentChapter === 1 && !footer.isCompleted
                ? "------"
                : "---<FOOTER>---"}
            </p>
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
        <p>פורט: {data.port}</p>
      </div>
    </div>
  );
};

export default Letter;