import { useState, useEffect } from 'react';
import { useGameState, isVisible, getFlag, hasCompleted } from './GameState.jsx';
import { useStampable } from '../hooks/useStampable.jsx';
import monitorData from '../monitorData';
import '../Styles/GrandmaLetterEditor.css';

const GrandmaLetterEditor = ({ onClose, openPopUp, onElementStamp }) => {
  const { state, dispatch } = useGameState();
  const [openLetter, setOpenLetter] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [letterState, setLetterState] = useState('crappy');

  const data = monitorData.chapter_6;

  useEffect(() => {
    console.log(state.flags);
    setLetterState(state.flags.letter_state);
  }, [state.flags])

  // Create stampable hooks for each letter version
  const crappyLetter = useStampable('grandmaLetterCrappy');
  const newLetter = useStampable('grandmaLetterNew');

  const handleClick = () => {
      setOpenLetter(!openLetter);
  };

  const handleCrappyLetterClick = (e) => {
    crappyLetter.handleStamp(e);
    if (isVisible(state, 'using_stamp')) {
      onElementStamp?.();
    } else {
      handleClick();
    }
  };

  const handleNewLetterClick = (e) => {
    if (isVisible(state, 'using_stamp')) {
      // New letter cannot be stamped, so just ignore
      return;
    }
    handleClick();
  };

  return (
    <>
      {/* Crappy Letter - Stampable */}
      {letterState === 'crappy' && (
        <div
          className={crappyLetter.getClassNames(
            `GrandmaLetterEditor ${openLetter ? 'open closable' : 'closed openable'} crappy`
          )}
          onClick={handleCrappyLetterClick}
        >
        </div>
      )}

      {/* New Letter - Not Stampable */}
      {letterState === 'new' && (
        <div
          className={`GrandmaLetterEditor ${openLetter ? 'open closable' : 'closed openable'} new`}
          onClick={handleNewLetterClick}
        >
          {openLetter && (
            <div className="letter-text-container">
            </div>
          )}

          {/* Protocol */}
      <div className={`protocol ${state.flags.showcaseLetterField === 'protocol' ? 'field_showcase' : ''}`}>
        {state.flags.showcaseLetterField === 'protocol' && <p className='line-cursor'>|</p>}
        <p>{hasCompleted(state, 'fixPort') ? data.port : ''}</p>
      </div>

      {/* Source Address */}
      <div
        className='src-adress'
      >
        <p>מאית: {data.sourceAddress}</p>
      </div>

      {/* Destination Address */}
      <div
        className='dest-adress'
      >
        <p>לכבוד: {data.destinationAddress}</p>
      </div>

      {/* Port */}
      <div
        className='port'
      >
        <p>פורט: {data.displayPort}</p>
      </div>
        </div>
      )}
    </>
  );
};

export default GrandmaLetterEditor;