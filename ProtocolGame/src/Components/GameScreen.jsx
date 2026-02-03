import { useEffect, useState } from 'react';
import '../Styles/GameScreen.css';
import CustomerView from './CustomerView.jsx';
import Monitor from './Monitor.jsx';
import TextBox from './TextBox.jsx';
import Manual from './Manual.jsx';
import { useGameState, isVisible, isUnlocked, hasCompleted } from './GameState.jsx';

import dialogueData from '../data_files/dialogueData.js';


/*

  Game Screen Component
  ---------------------

  This component represents the main game screen where the player interacts with customers,
  manages tasks, and accesses the monitor and user manual. It handles chapter progression, manual access, and the Monitor.

*/

const GameScreen = ({chapterSelect, onFinish, pauseScreen}) => {
  const { state, dispatch } = useGameState();
  const [isManualOpen, setManualOpen] = useState(false);

  useEffect (() => {// For Handling Chapter Selection from the Pause Menu
    if(chapterSelect) {
      closingProcedure();
      dispatch({type: 'CHAPTER_SELECT', value: chapterSelect});
      chapterSelect = null;
    }
  }, [chapterSelect]);

  const closingProcedure = () => {// Resetting everything before going to the next chapter
    dispatch({type: 'RESET_FLAGS'});
    dispatch({type: 'SET_FLAG', key: 'currentChapter', value: state.flags.currentChapter + 1});
    dispatch({type: 'RESET_COMPLETED'});
    dispatch({type: 'HIDE', id: 'submit-animation'});
    dispatch({type: 'SET_FLAG', key: 'stampedElement', value: null});
    dispatch({type: 'CLEAR_GLOBAL_WAITS'});
  }
  
  // Check if manual has new unread content
  const hasNewManualContent = !hasCompleted(state, `read_manual_ch${state.flags.currentChapter}`) && hasCompleted(state, 'update_manual');

  return (
    <div className="GameScreen">
      <CustomerView />
      <TextBox 
        dialogueType="characters"
        startDialogueId={ Object.keys(dialogueData.characters[`chapter_${state.flags.currentChapter}`])[0] }
        onComplete={() => { closingProcedure(); if(state.flags.currentChapter >= 19) { onFinish(); } }}
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

      <Monitor className="Monitor" pauseScreen={() => {pauseScreen();}}/>

      {isVisible(state, 'manual_command_table') && <div className='manual-command-table'><img src='./General/close-button.png' className='close-button clickable' onClick={() => {dispatch({type: 'HIDE', id: 'manual_command_table'})}}/></div>}
    </div>
  );
}

export default GameScreen;