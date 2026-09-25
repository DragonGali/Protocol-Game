import {useState, useEffect} from 'react';
import DialogueManager from './DialogeManager.jsx';
import { useGameState } from './GameState.jsx';
import "../Styles/StoryScreen.css"

/* 

    StoryScreen Component
    ---------------------

    Story slide before the game starts. Should have made this longer.

*/

const StoryScreen = ({ onContinue }) => {
  const { state, dispatch } = useGameState();

  useEffect(() => {
    dispatch({type: 'CHAPTER_SELECT', value: 0})
  }, []);

  const handleStoryComplete = () => {
    // Navigate to game when story is complete, and update currentChapter
    dispatch({ type: 'CHAPTER_SELECT', value: 1 });
    onContinue();
  };

  return (
    <div className="StoryScreen">
      <div className='dialogue-manager'>
        <DialogueManager
          dialogueType="story"
          startDialogueId="dialogue_1"
          onComplete={handleStoryComplete}
          triangleColor='var(--orange)'
          triangleSize='1.5vw'
          triangleMargin='0 1vw 0 0'
          textSize='var(--font-regular)'
        />
      </div>
    </div>
  );
};

export default StoryScreen;