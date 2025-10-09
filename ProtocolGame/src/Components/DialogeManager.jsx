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

    // Run onEnter actions if any
    if (dialogue.onEnter) {
      dialogue.onEnter.forEach(action => dispatch(action));
    }

    // Store wait condition if present
    if (dialogue.waitFor) {
      setWaitingFor(dialogue.waitFor);
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

    let nextId = currentDialogue.next;
    if (typeof nextId === 'function') {
      nextId = nextId(state); // allow dynamic branching
    }

    if (nextId) {
      setDialogue(nextId);
    } else if (onComplete) {
      onComplete();
    }
  };

  const currentDialogue = getCurrentDialogue();

  // --- Check for completion or flag conditions ---
  useEffect(() => {
    if (!waitingFor) return;

    const completedOK = waitingFor.completed ? hasCompleted(state, waitingFor.completed) : true;
    const flagOK = waitingFor.flag ? !!state.flags[waitingFor.flag] : true;

    console.log(state.flags);

    // advance when all wait conditions are met
    if (completedOK && flagOK) {
      advanceDialogue();
    }
  }, [state.completed, state.flags, waitingFor]);

  if (!currentDialogue) return null;

  const waiting =
    (waitingFor?.completed && !hasCompleted(state, waitingFor.completed)) ||
    (waitingFor?.flag && !state.flags[waitingFor.flag]);

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
