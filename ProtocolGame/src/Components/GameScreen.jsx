import { useEffect, useState } from 'react';
import '../Styles/GameScreen.css';
import CustomerView from './CustomerView.jsx';
import Monitor from './Monitor.jsx';
import TextBox from './TextBox.jsx';

import { useGameState } from './GameState.jsx';

const GameScreen = () => {

  const [isManualVisible, setManualVisible] = useState(false);
  const { state, dispatch } = useGameState();

  useEffect(() => {
    setManualVisible(state.manualVisible);
  }, [state.manualVisible])


  return (
      <div className="GameScreen">
          <CustomerView className="CustomerView"/>
          <Monitor className="Monitor"/>
          <TextBox 
            dialogueType="characters"
            startDialogueId="daniel_intro_6"
            onComplete={() => {
                // What happens when dialogue sequence ends
                console.log("Dialogue finished!");
            }}
            />
            <img src="/Manual/user manual icon.png" className={`user-manual-icon ${isManualVisible ? "showcase" : ""}`} style={{ display: isManualVisible ? 'block' : 'none' }} />
      </div>
  );
}

export default GameScreen;
