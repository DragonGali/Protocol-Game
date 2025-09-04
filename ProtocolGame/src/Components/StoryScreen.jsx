import React from 'react';
import DialogueManager from './DialogeManager.jsx';
import { useGameState } from './GameState';
import "../Styles/StoryScreen.css"

const StoryScreen = ({ onContinue }) => {
  const { dispatch } = useGameState();

  const handleStoryComplete = () => {
    // Navigate to game when story is complete
    dispatch({
      type: 'NAVIGATE_TO_PAGE',
      page: 'game'
    });
    onContinue();
  };

  return (
    <div className="StoryScreen">
      <DialogueManager
        className="dialogue-manager"
        dialogueType="story"
        startDialogueId="story_1"
        onComplete={handleStoryComplete}
        textColor='var(--orange)'
        triangleColor='var(--orange)'
        triangleSize='1.5vw'
        triangleMargin='0 0 0 0.7vw'
        textSize='2vw'
      />
    </div>
  );
};

export default StoryScreen;