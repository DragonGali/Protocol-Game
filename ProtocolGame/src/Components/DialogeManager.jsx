import React, { useEffect } from 'react';
import { useGameState } from './GameState.jsx';
import { dialogueData } from '../dialogueData.js';
import TypeWriter from './TypeWriter.jsx';

const DialogueManager = ({ 
  dialogueType, 
  startDialogueId, 
  onComplete,
  triangleColor = "var(--white)",
  triangleSize = "1.5vw",
  triangleMargin = "0 1vw 0 0",
  textSize = "var(--font-regular)",
}) => {
  const { state, dispatch } = useGameState();

  // Initialize dialogue on mount
  useEffect(() => {
    if (startDialogueId && !state.currentDialogue) {
      setDialogue(startDialogueId);
    }
  }, [startDialogueId]);

  const setDialogue = (dialogueId) => {
    const dialogue = dialogueData[dialogueType][dialogueId];
    if (!dialogue) return;

    // Set current dialogue
    dispatch({
      type: 'SET_DIALOGUE',
      dialogueId,
      dialogueType,
      emotion: dialogue.emotion || null,
      character: dialogue.character || null
    });

    // Execute onEnter actions
    if (dialogue.onEnter) {
      dialogue.onEnter.forEach(action => {
        dispatch(action);
      });
    }
  };

  const getCurrentDialogue = () => {
    if (!state.currentDialogue) return null;
    return dialogueData[dialogueType]?.[state.currentDialogue];
  };

  const advanceDialogue = () => {
    const currentDialogue = getCurrentDialogue();
    if (!currentDialogue) return;

    const nextId = currentDialogue.next;
    
    if (nextId) {
      setDialogue(nextId);
    } else {
      // End of dialogue
      if (onComplete) onComplete();
    }
  };

  const currentDialogue = getCurrentDialogue();
  if (!currentDialogue) return null;

  return (
    <div className="dialogue-manager">
      <TypeWriter 
        text={currentDialogue.text}
        name={currentDialogue.name || null}
        nameColor={currentDialogue.nameColor || null}
        onComplete={advanceDialogue}
        speed={60}
        delayAfterComplete={1000}
        textColor={currentDialogue.textColor || "var(--white)"}
        triangleColor={triangleColor}
        triangleSize={triangleSize}
        triangleMargin={triangleMargin}
        textSize={textSize}
      />
    </div>
  );
};

export default DialogueManager;