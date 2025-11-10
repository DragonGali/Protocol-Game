import { useEffect, useState } from 'react';
import '../Styles/GameScreen.css';
import CustomerView from './CustomerView.jsx';
import Monitor from './Monitor.jsx';
import TextBox from './TextBox.jsx';
import Manual from './Manual.jsx';
import { useGameState, isVisible, isUnlocked, hasCompleted } from './GameState.jsx';

import dialogueData from '../dialogueData.js';

const GameScreen = () => {
  const { state, dispatch } = useGameState();
  const [isManualOpen, setManualOpen] = useState(false);
  
  // Check if manual has new unread content
  const hasNewManualContent = !hasCompleted(state, `read_manual_ch${state.flags.currentChapter}`) && hasCompleted(state, 'update_manual');

  return (
    <div className="GameScreen">
      <CustomerView />
      <TextBox 
        dialogueType="characters"
        startDialogueId={ Object.keys(dialogueData.characters[`chapter_${state.flags.currentChapter}`])[10] }
        onComplete={() => {
          dispatch({type: 'SET_FLAG', key: 'currentChapter', value: state.flags.currentChapter + 1});
          dispatch({type: 'RESET_COMPLETED'});
        }}
      />
      
      {/* User Manual Icon */}
      {(isVisible(state, 'manual_icon') || isUnlocked(state, 'manual')) && !isManualOpen && (
        <img 
          src={`/Manual/user manual icon${hasNewManualContent ? ' new' : ''}.png`}
          className={`user-manual-icon 
            ${isVisible(state, 'manual_icon_showcase') ? 'showcase' : ''} 
            ${isUnlocked(state, 'manual') ? 'clickable' : ''}
            ${hasNewManualContent ? 'new' : ''}`}
          style={{ 
            pointerEvents: isUnlocked(state, 'manual') ? 'auto' : 'none' 
          }}
          onClick={() => setManualOpen(true)}
          alt="User manual"
        />
      )}

      {isManualOpen && <Manual onClose={() => setManualOpen(false)} />}

      <Monitor className="Monitor"/>
    </div>
  );
}

export default GameScreen;