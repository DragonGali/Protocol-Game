// DialogueManager.jsx
import React, { useEffect } from 'react';
import { useGameState } from './GameState.jsx';
import { dialogueData } from '../dialogueData.js';
import TypeWriter from './TypeWriter.jsx';

const DialogueManager = ({ 
  dialogueType, 
  startDialogueId, 
  onComplete,
  textColor,
  triangleColor,
  triangleSize,
  triangleMargin,
  textSize
}) => {
  const { state, dispatch } = useGameState();

  // Initialize dialogue when component mounts
  useEffect(() => {
    if (startDialogueId) {
      const dialogue = dialogueData[dialogueType][startDialogueId];
      dispatch({
        type: 'SET_DIALOGUE',
        dialogueId: startDialogueId,
        dialogueType: dialogueType,
        emotion: dialogue.emotion
      });
    }
  }, [startDialogueId, dialogueType, dispatch]);

  const getCurrentDialogue = () => {
    if (!state.currentDialogue || !state.dialogueType) return null;
    return dialogueData[state.dialogueType][state.currentDialogue];
  };

  const advanceDialogue = () => {
    const currentDialogue = getCurrentDialogue();
    if (!currentDialogue) return;

    // Trigger any events
    currentDialogue.events.forEach(eventName => {
      dispatch({
        type: 'TRIGGER_EVENT',
        eventName: eventName
      });
    });

    // Move to next dialogue or complete
    if (currentDialogue.nextDialogue) {
      const nextDialogue = dialogueData[state.dialogueType][currentDialogue.nextDialogue];
      dispatch({
        type: 'SET_DIALOGUE',
        dialogueId: currentDialogue.nextDialogue,
        dialogueType: state.dialogueType,
        emotion: nextDialogue.emotion
      });
    } else {
      // End of dialogue sequence
      if (onComplete) {
        onComplete();
      }
    }
  };

  const currentDialogue = getCurrentDialogue();
  if (!currentDialogue) return null;

  return (
    <div className="dialogue-manager">
      <TypeWriter 
        text={currentDialogue.text}
        onComplete={advanceDialogue}
        speed={50}
        delayAfterComplete={1000}
        textColor={textColor}
        triangleColor={triangleColor}
        triangleSize={triangleSize}
        triangleMargin={triangleMargin}
        textSize={textSize}
      />
    </div>
  );
};

export default DialogueManager;