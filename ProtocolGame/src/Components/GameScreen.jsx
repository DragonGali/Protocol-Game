import { useEffect, useState } from 'react';
import '../Styles/GameScreen.css';
import CustomerView from './CustomerView.jsx';
import Monitor from './Monitor.jsx';
import TextBox from './TextBox.jsx';
import Manual from './Manual.jsx';

import { useGameState } from './GameState.jsx';

const GameScreen = () => {

  const [isManualVisible, setManualVisible] = useState(false);
  const [isManualUnlocked, setManualUnlocked] = useState(false);
  const [isManualOpen, setManualOpen] = useState(false);

  const { state } = useGameState();

  useEffect(() => {
    setManualVisible(state.manualVisible);
    setManualUnlocked(state.manualUnlocked);
  }, [state.manualVisible, state.manualUnlocked, state.manualRead]);

  return (
      <div className="GameScreen">
          <CustomerView className="CustomerView"/>
          {/* <Monitor className="Monitor"/> */}
          <TextBox 
            dialogueType="characters"
            startDialogueId="daniel_intro_1"
            onComplete={() => {
                // What happens when dialogue sequence ends
                console.log("Dialogue finished!");
            }}
          />
          
          {/* User Manual Icon */}
          <img src={`/Manual/user manual icon${!state.manualRead ? ' new' : ''}.png`}
            className={`user-manual-icon ${isManualVisible ? "showcase" : ""} ${isManualUnlocked ? "clickable" : ""} ${!state.manualRead ? "new" : ""}`}
             style={{ display: ((isManualVisible || isManualUnlocked) && !isManualOpen) ? 'block' : 'none', pointerEvents: isManualUnlocked ? 'auto' : 'none' }}
             onClick={() => {setManualOpen(true)}}
          />

          {isManualOpen && <Manual className="Manual" onClose={() => {setManualOpen(false)}}/>}
      </div>
  );
}

export default GameScreen;