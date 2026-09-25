import React, { useEffect, useState, useRef } from 'react';
import { useGameState, hasCompleted, isVisible } from './GameState.jsx';
import { dialogueData } from '../data_files/dialogueData.js';
import { characterConfig } from '../data_files/characterConfig.js';
import TypeWriter from './TypeWriter.jsx';
import Question from './Question.jsx';


/*
  Dialogue Manager Component
  --------------------------

  This component manages the flow of dialogues in the game, handling dialogue progression,
  conditions for advancement, global waits, and rendering of dialogue text.

  The actual text is rendered using the TypeWriter component, and questions are handled with the Question component.
  This combonent is used to track all the dialogues and events that happen in the game, since this game
  has a huge amount of dialogue and its logic is complicated.


*/

const DialogueManager = ({
  dialogueType,
  startDialogueId,
  onComplete,
  triangleColor = "var(--white)",
  triangleSize = "1.5vw",
  triangleMargin = "0 1vw 0 0",
  textSize = "var(--font-regular)",
  defaultSpeed = 10 //40 (The original spped is 40, but if you're debugging you can change it to something less)
}) => {

  const { state, dispatch } = useGameState();
  const [waitingFor, setWaitingFor] = useState(null); // What condition is this dialogue waiting for?
  const [textDone, setTextDone] = useState(false); // Has the typewriter finished?
  const prevChapterRef = useRef(state.flags.currentChapter); // Track chapter changes

  const chapterKey = `chapter_${state.flags.currentChapter}`;

  /* -------------------- CONDITIONS -------------------- */

  // Check if a single condition is met (completed, flag, or visible)
  const checkCondition = (cond) => {
    if (cond.completed && !hasCompleted(state, cond.completed)) return false;
    if (cond.flag && !state.flags[cond.flag]) return false;
    if (cond.visible && !isVisible(state, cond.visible)) return false;
    return true;
  };

  // Evaluate waitFor - returns null (no wait), true (condition met), or false (condition not met)
  const evaluateWaitFor = (wait) => {
    if (!wait) return null; // No condition = proceed immediately
    if (wait.completedAny) {
      return wait.completedAny.some(cond => checkCondition(cond));
    }
    else if(wait.completedAll) {
      return wait.completedAll.every(cond => checkCondition(cond));
    }
    return checkCondition(wait);
  };

  /* -------------------- GLOBAL WAIT -------------------- */

  // Check if any global wait is active and its condition is met
  // Global waits can interrupt dialogue flow at any point in a range
  const checkGlobalWait = () => {
    if (!state.currentDialogue) return null;

    const match = state.currentDialogue.match(/^dialogue_(\d+)$/);
    if (!match) return null;

    const currentNum = Number(match[1]);

    for (const gw of state.globalWaits || []) {
      if (!gw.from || !gw.to) continue;

      const fromNum = Number(gw.from.split("_")[1]);
      const toNum = Number(gw.to.split("_")[1]);

      // Check if we're in the range and condition is met
      if (currentNum >= fromNum && currentNum <= toNum) {
        const conditionMet = evaluateWaitFor(gw.condition);
        if (conditionMet === true) {
          return gw; // Found an active global wait
        }
      }
    }

    return null;
  };

  /* -------------------- DIALOGUE SETUP -------------------- */

  // Reset dialogue when chapter changes or type changes
  useEffect(() => {
    if (state.flags.currentChapter !== prevChapterRef.current) {
      prevChapterRef.current = state.flags.currentChapter;
      setDialogue(startDialogueId);
    } else if (!state.currentDialogue || state.dialogueType !== dialogueType) {
      setDialogue(startDialogueId);
    }
  }, [startDialogueId, dialogueType, state.flags.currentChapter]);

  // Load a dialogue and run its setup (onEnter actions, waitFor, globalWait)
  const setDialogue = (dialogueId) => {
    const dialogue = dialogueData[dialogueType]?.[chapterKey]?.[dialogueId];
    if (!dialogue) return;

    dispatch({
      type: 'SET_DIALOGUE',
      dialogueId,
      dialogueType,
      prevDialogue: dialogueData[dialogueType][chapterKey][state.currentDialogue]?.noPrev ? state.prevDialogue : state.currentDialogue,
      emotion: dialogue.emotion || null,
      character: dialogue.character || null
    });

    // Run setup actions (show/hide, set flags, etc.)
    if (dialogue.onEnter) {
      dialogue.onEnter.forEach(action => dispatch(action));
    }

    // Register global waits for this dialogue
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

  // Move to next dialogue (checks global waits first, then evaluates next)
  const advanceDialogue = () => {
    // Check global waits FIRST - they have highest priority
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

  /* -------------------- ADVANCEMENT LOGIC -------------------- */
  
  // Single effect handling all dialogue advancement
  // This runs when text finishes typing or any state changes
  useEffect(() => {
    if (!textDone) return; // Don't advance until text is done

    const currentDialogue = getCurrentDialogue();
    if (!currentDialogue) return;

    // Check for global wait override (highest priority)
    const globalWait = checkGlobalWait();
    if (globalWait) {
      setDialogue(globalWait.destination);
      dispatch({ type: 'REMOVE_GLOBAL_WAIT', id: globalWait.id });
      return;
    }

    // Evaluate this dialogue's waitFor condition
    const waitConditionStatus = evaluateWaitFor(waitingFor);

    // Auto-advance only if there's a waitFor AND its condition is met
    if (waitingFor && waitConditionStatus === true) {
      advanceDialogue();
    }
    // Otherwise, stay on screen for player to click
  }, [textDone, waitingFor, state.completed, state.flags, state.visible, state.globalWaits]);

  /* -------------------- RENDER -------------------- */

  const currentDialogue = getCurrentDialogue();
  if (!currentDialogue) return null;

  const waitConditionStatus = evaluateWaitFor(waitingFor);
  // Block UI only if waitFor exists but condition is FALSE
  const isBlocked = waitingFor && waitConditionStatus === false;
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
          autoAdvance={false}
          showTriangle={!isBlocked} // Hide triangle if blocked by unmet condition
          triangleColor={triangleColor}
          triangleSize={triangleSize}
          triangleMargin={triangleMargin}
          textSize={textSize}
          fontSize={currentDialogue.fontSize || null}
          onComplete={!isBlocked ? advanceDialogue : null} // Only allow clicks if not blocked
        />
      )}

      {currentDialogue.type === 'question' && (
        <Question dialogue={currentDialogue} />
      )}
    </div>
  );
};

export default DialogueManager;