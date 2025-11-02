import React, { createContext, useContext, useReducer } from 'react';

const GameStateContext = createContext();

const initialState = {
  // Core dialogue
  currentDialogue: null,
  dialogueType: null,
  currentCharacter: null,
  currentEmotion: null,
  isTalking: false,
  
  // GENERIC tracking
  completed: new Set(),        // Things player has done
  unlocked: new Set(["manual", "monitor", "mail_list", "stamp"]),         // Things player can use
  visible: new Set(),          // Things player can see
  flags: {
    currentChapter: 1,
  },                   // Any temporary state
};

function gameStateReducer(state, action) {
  switch (action.type) {
    case 'SET_DIALOGUE':
      return {
        ...state,
        currentDialogue: action.dialogueId,
        dialogueType: action.dialogueType,
        currentEmotion: action.emotion || state.currentEmotion,
        currentCharacter: action.character || state.currentCharacter,
        isTalking: false
      };

    case 'SET_TALKING':
      return { ...state, isTalking: action.value };

    case 'MARK_COMPLETED':
      return {
        ...state,
        completed: new Set([...state.completed, action.id])
      };

    case 'CORRECT_MISTAKE':
      // Handles both single and multiple corrections
      // action.id = mistake key (e.g., 'mistake_2')
      // action.corrections = single value OR array of values
      // action.fields = optional - if multiple corrections, specify which fields (e.g., ['linkName', 'linkSource'])
      
      const mistakeData = state.flags[action.id];
      const currentLocation = typeof mistakeData === 'object' ? mistakeData.location : mistakeData;
      const corrections = Array.isArray(action.corrections) ? action.corrections : [action.corrections];
      const fields = action.fields || (corrections.length === 1 ? ['value'] : []);
      
      // Build corrections object
      let correctionsObj = {};
      if (Array.isArray(action.corrections) && action.fields) {
        // Multiple corrections with field names
        action.fields.forEach((field, index) => {
          correctionsObj[field] = action.corrections[index];
        });
      } else {
        // Single correction
        correctionsObj = action.corrections;
      }
      
      return {
        ...state,
        flags: {
          ...state.flags,
          [action.id]: {
            location: currentLocation,
            corrections: correctionsObj,
            timestamp: Date.now()
          }
        },
        completed: new Set([...state.completed, action.id])
      };

    case 'UNLOCK':
      return {
        ...state,
        unlocked: new Set([...state.unlocked, action.id])
      };

    case 'SHOW':
      return {
        ...state,
        visible: new Set([...state.visible, action.id])
      };

    case 'HIDE':
      const newVisible = new Set(state.visible);
      newVisible.delete(action.id);
      return { ...state, visible: newVisible };

    case 'SET_FLAG':
      return {
        ...state,
        flags: { ...state.flags, [action.key]: action.value }
      };

    case 'CLEAR_COMPLETED':
      const newCompleted = new Set(state.completed);
      newCompleted.delete(action.id);
      return { ...state, completed: newCompleted };

    case 'RESET_COMPLETED':
      return { ...state, completed: new Set() };
      
    default:
      return state;
  }
}


export const GameStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameStateReducer, initialState);
  
  return (
    <GameStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within GameStateProvider');
  }
  return context;
};

// Helper functions
export const hasCompleted = (state, id) => state.completed.has(id);
export const isUnlocked = (state, id) => state.unlocked.has(id);
export const isVisible = (state, id) => state.visible.has(id);
export const getFlag = (state, key) => state.flags[key];
