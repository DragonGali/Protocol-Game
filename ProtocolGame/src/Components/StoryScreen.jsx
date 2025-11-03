import React from 'react';
import DialogueManager from './DialogeManager.jsx';
import { useGameState } from './GameState.jsx';
import "../Styles/StoryScreen.css"

const StoryScreen = ({ onContinue }) => {
  const { state, dispatch } = useGameState();

  const handleStoryComplete = () => {
    // Navigate to game when story is complete, and update currentChapter
    dispatch({ type: 'SET_FLAG', key: 'currentChapter', value: 1 });
    dispatch({ type: 'SET_FLAG', key: 'currentPage', value: 'game' });

    onContinue();
  };

  return (
    <div className="StoryScreen">
      <div className='dialogue-manager'>
        <DialogueManager
          dialogueType="story"
          startDialogueId="story_1"
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