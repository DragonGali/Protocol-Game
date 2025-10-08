import React, { useEffect, useState } from 'react';
import { useGameState, hasCompleted } from './GameState.jsx';
import { dialogueData } from '../dialogueData.js';
import TypeWriter from './TypeWriter.jsx';

const DialogueManager = ({ 
  dialogueType, 
  startDialogueId, 
  onComplete,
  triangleColor = "var(--white)",
  triangleSize = "1.5vw",
  triangleMargin = "0 1vw 0 0",
  textSize = "var(--font-regular)"
}) => {
  const { state, dispatch } = useGameState();
  const [waitingFor, setWaitingFor] = useState(null);

  // Initialize dialogue
  useEffect(() => {
    if (startDialogueId && (!state.currentDialogue || state.dialogueType !== dialogueType)) {
      setDialogue(startDialogueId);
    }
  }, [startDialogueId, dialogueType]);

  const setDialogue = (dialogueId) => {
    const dialogue = dialogueData[dialogueType][dialogueId];
    if (!dialogue) return;

    dispatch({
      type: 'SET_DIALOGUE',
      dialogueId,
      dialogueType,
      emotion: dialogue.emotion || null,
      character: dialogue.character || null
    });

    // Run onEnter actions
    if (dialogue.onEnter) {
      dialogue.onEnter.forEach(action => dispatch(action));
    }

    // Store wait condition if present
    if (dialogue.waitFor?.completed) {
      setWaitingFor(dialogue.waitFor.completed);
    } else {
      setWaitingFor(null);
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

    if (typeof nextId === 'function') {
      nextId = nextId(state);//giving gameState to dialougueData
    }

    if (nextId) {
      setDialogue(nextId);
    } else if (onComplete) {
      onComplete();
    }
  };

  const currentDialogue = getCurrentDialogue();

  // --- Check completion for waitFor ---
  useEffect(() => {
    if (waitingFor && hasCompleted(state, waitingFor)) {
      // Once completed, move forward
      advanceDialogue();
    }
  }, [state.completed, waitingFor]);

  if (!currentDialogue) return null;

  const waiting = waitingFor && !hasCompleted(state, waitingFor);

  return (
    <div className="dialogue-manager">
      <TypeWriter 
        text={currentDialogue.text}
        name={currentDialogue.name || null}
        nameColor={currentDialogue.nameColor || null}
        textColor={currentDialogue.textColor || "var(--white)"}
        speed={60}
        delayAfterComplete={1000}
        onComplete={!waiting ? advanceDialogue : null}
        showTriangle={!waiting}
        triangleColor={triangleColor}
        triangleSize={triangleSize}
        triangleMargin={triangleMargin}
        textSize={textSize}
      />
    </div>
  );
};

export default DialogueManager;
