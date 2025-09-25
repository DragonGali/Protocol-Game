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

  // NEW: Check if dialogue should advance based on conditions
  const checkConditionalAdvancement = () => {
    const currentDialogue = getCurrentDialogue();
    if (!currentDialogue) return false;

    // Check if dialogue has a condition property
    if (currentDialogue.condition) {
      // If condition is a string, check if that state property is true
      if (typeof currentDialogue.condition === 'string') {
        return !!state[currentDialogue.condition];
      }
      
      // If condition is a function, call it with current state
      if (typeof currentDialogue.condition === 'function') {
        return currentDialogue.condition(state);
      }
      
      // If condition is an object, check multiple conditions
      if (typeof currentDialogue.condition === 'object') {
        return Object.entries(currentDialogue.condition).every(([key, value]) => {
          if (typeof value === 'function') {
            return value(state[key]);
          }
          return state[key] === value;
        });
      }
    }
    
    return false;
  };

  // NEW: Force advance dialogue when conditions are met
  const forceAdvanceDialogue = () => {
    const currentDialogue = getCurrentDialogue();
    if (!currentDialogue) return;

    if (currentDialogue.nextDialogue) {
      setDialogue(currentDialogue.nextDialogue, state.dialogueType);
    } else {
      if (onComplete) {
        onComplete();
      }
    }
  };

  // NEW: Effect to watch for conditional advancement
  // You can customize which state properties to watch
  useEffect(() => {
    if (checkConditionalAdvancement()) {
      forceAdvanceDialogue();
    }
  }, [
    // Add the state properties you want to watch for changes
    state.manualRead,
    state.manualVisible, 
    state.manualUnlocked,
    // Add any other state properties that might trigger dialogue advancement
    state.currentDialogue
  ]);

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