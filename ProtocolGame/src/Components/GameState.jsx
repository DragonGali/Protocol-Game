import React, { createContext, useContext, useEffect, useReducer } from 'react';

const GameStateContext = createContext();

const initialState = {
  //dialogue
  currentDialogue: null,
  dialogueType: null,
  currentCharacter: null,
  currentEmotion: null,
  isTalking: false,

  //for globalWait
  prevDialogue: null,
  
  // GENERIC tracking
  completed: new Set(["update_manual"]),// Things player has done
  unlocked: new Set(["manual", "monitor", "mail_list", "stamp", "network", "terminal"]),// Things player can use
  visible: new Set(),// Things player can see
  flags: {// indicators and such
    currentChapter: 19,
    link_state: false
  },
  globalWaits: []             
};

function gameStateReducer(state, action) {
  switch (action.type) {
    case 'SET_DIALOGUE':
      return {
        ...state,
        currentDialogue: action.dialogueId,
        prevDialogue: action.prevDialogue || state.currentDialogue,
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

    case 'CORRECT_MISTAKE': //For correcting mistakes
    const mistakeData = state.flags[action.id];
    const currentLocation = typeof mistakeData === 'object' ? mistakeData.location : mistakeData;
    
    return {
      ...state,
      flags: {
        ...state.flags,
        [action.id]: {
          location: currentLocation,
          correction: action.correction,
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

    case 'RESET_FLAGS':
      return { ...state, flags: {} };

    case 'ADD_GLOBAL_WAIT': {
      const wait = action.wait;

      // Hard requirement: every globalWait MUST have an id
      if (!wait?.id) {
        console.error('GlobalWait missing id:', wait);
        return state;
      }

      // Prevent duplicates
      if (state.globalWaits.some(w => w.id === wait.id)) {
        return state;
      }

      return {
        ...state,
        globalWaits: [...state.globalWaits, wait]
      };
    }


    case 'REMOVE_GLOBAL_WAIT':
      return {
        ...state,
        globalWaits: state.globalWaits.filter(gWait => gWait.id !== action.id)
    };

    case 'CLEAR_GLOBAL_WAITS':
      return {
        ...state,
        globalWaits: []
    };
      
    default:
      return state;
  }
}


export const GameStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameStateReducer, initialState);
  console.log("GameState Updated:", state);
  
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
