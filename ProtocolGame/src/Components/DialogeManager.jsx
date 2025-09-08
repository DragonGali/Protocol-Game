// DialogueManager.jsx
import React, { useEffect } from 'react';
import { useGameState } from './GameState.jsx';
import { dialogueData } from '../dialogueData.js';
import TypeWriter from './TypeWriter.jsx';

const DialogueManager = ({ 
  dialogueType, 
  startDialogueId, 
  onComplete,
  triangleColor,
  triangleSize,
  triangleMargin,
  textSize,
}) => {
  const { state, dispatch } = useGameState();

  // Helper to set dialogue + fire its events
  const setDialogue = (dialogueId, dialogueType) => {
    const dialogue = dialogueData[dialogueType][dialogueId];
    if (!dialogue) return;

    // Set the dialogue in state
    dispatch({
      type: 'SET_DIALOGUE',
      dialogueId,
      dialogueType,
      emotion: dialogue.emotion,
      character: dialogueId.split('_')[0]
    });

    // Trigger events immediately when dialogue is entered
    if (dialogue.events && dialogue.events.length > 0) {
      dialogue.events.forEach(eventName => {
        dispatch({
          type: 'TRIGGER_EVENT',
          eventName
        });
      });
    }
  };

  // Initialize dialogue when component mounts
  useEffect(() => {
    if (startDialogueId) {
      setDialogue(startDialogueId, dialogueType);
    }
  }, [startDialogueId, dialogueType]);

  // Gets the current line of dialogue from gameState
  const getCurrentDialogue = () => {
    if (!state.currentDialogue || !state.dialogueType) return null;
    return dialogueData[state.dialogueType][state.currentDialogue];
  };

  const advanceDialogue = () => {
    const currentDialogue = getCurrentDialogue();
    if (!currentDialogue || !canAdvanceNow()) return;

    if (currentDialogue.nextDialogue) {
      setDialogue(currentDialogue.nextDialogue, state.dialogueType);
    } else {
      if (onComplete) {
        onComplete();
      }
    }
  };

  const currentDialogue = getCurrentDialogue();
  if (!currentDialogue) return null;

  const canAdvanceNow = () => {
    if (typeof currentDialogue.canAdvance === "function") {
      return currentDialogue.canAdvance(state);
    }
    return !!currentDialogue.canAdvance;
  };

  return (
    <div className="dialogue-manager">
      <TypeWriter 
        text={currentDialogue.text}
        name={currentDialogue.name}
        nameColor={currentDialogue.nameColor}
        onComplete={advanceDialogue}
        speed={60}
        delayAfterComplete={1000}
        textColor={currentDialogue.textColor}
        triangleColor={triangleColor}
        triangleSize={triangleSize}
        triangleMargin={triangleMargin}
        textSize={textSize}
        advanceDialogue={canAdvanceNow()}
      />
    </div>
  );
};


export default DialogueManager;