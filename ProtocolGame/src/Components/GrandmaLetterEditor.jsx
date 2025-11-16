import { useState, useEffect } from 'react';
import { useGameState, isVisible, getFlag } from './GameState.jsx';
import monitorData from '../monitorData';
import '../Styles/GrandmaLetterEditor.css';

const GrandmaLetterEditor = ({ onClose, openPopUp, onElementStamp }) => {
  const { state, dispatch } = useGameState();
  const [openLetter, setOpenLetter] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [letterState, setLetterState] = useState('crappy');




  return (
    <div
      className={`GrandmaLetterEditor ${openLetter ? 'open' : 'closed openable'} ${letterState}`}
    >
      {openLetter && (
        <div className="letter-text-container">
        </div>
      )}

    </div>
  );
};

export default GrandmaLetterEditor;