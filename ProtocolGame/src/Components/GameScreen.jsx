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
        startDialogueId={ Object.keys(dialogueData.characters[`chapter_${state.flags.currentChapter}`])[0] }
        onComplete={() => {
          dispatch({type: 'RESET_FLAGS'});
          dispatch({type: 'SET_FLAG', key: 'currentChapter', value: state.flags.currentChapter + 1});
          dispatch({type: 'RESET_COMPLETED'});
          dispatch({type: 'HIDE', id: 'submit-animation'});
          dispatch({type: 'SET_FLAG', key: 'stampedElement', value: null});
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

      {isVisible(state, 'manual_command_table') && <div className='manual-command-table'><img src='./General/close-button.png' className='close-button clickable' onClick={() => {dispatch({type: 'HIDE', id: 'manual_command_table'})}}/></div>}
    </div>
  );
}

export default GameScreen;