import React, { useEffect, useState, useRef } from 'react';
import { useGameState, hasCompleted, isVisible } from './GameState.jsx';
import { dialogueData } from '../data_files/dialogueData.js';
import { characterConfig } from '../data_files/characterConfig.js';
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

  /* -------------------- CONDITIONS -------------------- */

  const checkCondition = (cond) => {
    if (cond.completed && !hasCompleted(state, cond.completed)) return false;
    if (cond.flag && !state.flags[cond.flag]) return false;
    if (cond.visible && !isVisible(state, cond.visible)) return false;
    return true;
  };

  const evaluateWaitFor = (wait) => {
    if (!wait) return true;
    if (wait.completedAny) {
      return wait.completedAny.some(cond => checkCondition(cond));
    }
    return checkCondition(wait);
  };

  /* -------------------- GLOBAL WAIT -------------------- */

  const checkGlobalWait = () => {
    if (!state.currentDialogue) return null;

    const match = state.currentDialogue.match(/^dialogue_(\d+)$/);
    if (!match) return null;

    const currentNum = Number(match[1]);

    for (const gw of state.globalWaits || []) {
      if (!gw.from || !gw.to) continue;

      const fromNum = Number(gw.from.split("_")[1]);
      const toNum = Number(gw.to.split("_")[1]);

      if (currentNum >= fromNum && currentNum <= toNum) {
        if (evaluateWaitFor(gw.condition)) {
          return gw;
        }
      }
    }

    return null;
  };

  /* -------------------- DIALOGUE SETUP -------------------- */

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

    if (dialogue.globalWait) {
      dispatch({
        type: 'ADD_GLOBAL_WAIT',
        wait: dialogue.globalWait
      });
    }

    setWaitingFor(dialogue.waitFor || null);
    setTextDone(false);
  };

  const getCurrentDialogue = () => {
    if (!state.currentDialogue) return null;
    return dialogueData[dialogueType]?.[chapterKey]?.[state.currentDialogue];
  };

  /* -------------------- ADVANCE -------------------- */

  const advanceDialogue = () => {
    const globalWait = checkGlobalWait();
    if (globalWait) {
      setDialogue(globalWait.destination);
      dispatch({ type: 'REMOVE_GLOBAL_WAIT', id: globalWait.id });
      return;
    }

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

  /* -------------------- WAIT EFFECT -------------------- */

  useEffect(() => {
    if (!waitingFor || !textDone) return;
    if (evaluateWaitFor(waitingFor)) {
      advanceDialogue();
    }
  }, [waitingFor, textDone, state.completed, state.flags, state.visible]);

  /* -------------------- GLOBAL WAIT EFFECT -------------------- */

  useEffect(() => {
    if (!textDone) return;

    const globalWait = checkGlobalWait();
    if (globalWait) {
      setDialogue(globalWait.destination);
      dispatch({ type: 'REMOVE_GLOBAL_WAIT', id: globalWait.id });
    }
  }, [textDone, state.completed, state.flags, state.visible]);

  /* -------------------- RENDER -------------------- */

  const currentDialogue = getCurrentDialogue();
  if (!currentDialogue) return null;

  const waiting = !evaluateWaitFor(waitingFor);
  const textSpeed = currentDialogue.speed || defaultSpeed;

  return (
    <div className="DialogueManager">

      {currentDialogue.type !== 'question' && (
        <TypeWriter
          text={currentDialogue.text}
          name={currentDialogue.name || characterConfig[state.currentCharacter].name}
          nameColor={
            currentDialogue.nameColor ||
            (currentDialogue.name === 'אני'
              ? characterConfig.player.nameColor
              : characterConfig[state.currentCharacter].nameColor)
          }
          textColor={
            currentDialogue.textColor ||
            (currentDialogue.name === 'אני' && /^\[.*\]$/.test(currentDialogue.text)
              ? characterConfig.player.thinkingText
              : "var(--white)")
          }
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

      {currentDialogue.type === 'question' && (
        <Question dialogue={currentDialogue} />
      )}
    </div>
  );
};

export default DialogueManager;
