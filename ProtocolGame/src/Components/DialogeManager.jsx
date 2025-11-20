import React, { useEffect, useState, useRef } from 'react';
import { useGameState, hasCompleted } from './GameState.jsx';
import { dialogueData } from '../dialogueData.js';
import TypeWriter from './TypeWriter.jsx';
import Question from './Question.jsx';

const DialogueManager = ({ 
  dialogueType, 
  startDialogueId, 
  onComplete,
  triangleColor = "var(--white)",
  triangleSize = "1.5vw",
  triangleMargin = "0 1vw 0 0",
  textSize = "var(--font-regular)",
  defaultSpeed = 60
}) => {

  const { state, dispatch } = useGameState();
  const [waitingFor, setWaitingFor] = useState(null);
  const [textDone, setTextDone] = useState(false);
  const prevChapterRef = useRef(state.flags.currentChapter);

  const chapterKey = `chapter_${state.flags.currentChapter}`;

  // Initialize dialogue + handle chapter changes
  useEffect(() => {
    if (state.flags.currentChapter !== prevChapterRef.current) {
      prevChapterRef.current = state.flags.currentChapter;
      setDialogue(startDialogueId);
    } else if (!state.currentDialogue || state.dialogueType !== dialogueType) {
      setDialogue(startDialogueId);
    }
  }, [startDialogueId, dialogueType, state.flags.currentChapter]);

  const setDialogue = (dialogueId) => {
    const dialogue = dialogueData[dialogueType]?.[chapterKey]?.[dialogueId];
    if (!dialogue) return;

    dispatch({
      type: 'SET_DIALOGUE',
      dialogueId,
      dialogueType,
      emotion: dialogue.emotion || null,
      character: dialogue.character || null
    });

    if (dialogue.onEnter) {
      dialogue.onEnter.forEach(action => dispatch(action));
    }

    if (dialogue.waitFor) {
      setWaitingFor(dialogue.waitFor);
    } else {
      setWaitingFor(null);
    }

    setTextDone(false);
  };

  const getCurrentDialogue = () => {
    if (!state.currentDialogue) return null;
    return dialogueData[dialogueType]?.[chapterKey]?.[state.currentDialogue];
  };

  const advanceDialogue = () => {
    const currentDialogue = getCurrentDialogue();
    if (!currentDialogue) return;

    let nextId = currentDialogue.next;
    if (typeof nextId === 'function') nextId = nextId(state);

    if (nextId) {
      setDialogue(nextId);
    } else if (onComplete) {
      onComplete();
    }
  };

  const currentDialogue = getCurrentDialogue();

  // --- AUTO-ADVANCE WAIT-FOR LOGIC ---
  useEffect(() => {
    if (!waitingFor || !textDone) return;

    const completedOK = waitingFor.completed ? hasCompleted(state, waitingFor.completed) : true;
    const flagOK = waitingFor.flag ? !!state.flags[waitingFor.flag] : true;

    if (completedOK && flagOK) {
      advanceDialogue();
    }
  }, [waitingFor, textDone, state.completed, state.flags]);

  if (!currentDialogue) return null;

  const waiting =
    (waitingFor?.completed && !hasCompleted(state, waitingFor.completed)) ||
    (waitingFor?.flag && !state.flags[waitingFor.flag]);

  const textSpeed = currentDialogue.speed || defaultSpeed;

  return (
    <div className="DialogueManager">

      {currentDialogue?.type !== 'question' && (
        <TypeWriter
          text={currentDialogue.text}
          name={currentDialogue.name || null}
          nameColor={currentDialogue.nameColor || null}
          textColor={currentDialogue.textColor || "var(--white)"}
          speed={textSpeed}

          onTypingComplete={() => setTimeout(() => setTextDone(true), 2000)}

          autoAdvance={waitingFor && !waiting}
          showTriangle={!waiting}

          triangleColor={triangleColor}
          triangleSize={triangleSize}
          triangleMargin={triangleMargin}
          textSize={textSize}
          fontSize={currentDialogue.fontSize || null}

          onComplete={!waiting ? advanceDialogue : null}
        />
      )}

      {currentDialogue?.type === 'question' && (
        <Question dialogue={currentDialogue} />
      )}
    </div>
  );
}

export default DialogueManager;
