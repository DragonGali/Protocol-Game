// GameState.jsx
import React, { createContext, useContext, useReducer } from 'react';
import { gameEvents } from '../dialogueData.js';

const GameStateContext = createContext();

const initialState = {
  // Current dialogue
  currentChapter: 1,
  currentDialogue: null,
  dialogueType: null, // 'story' or 'characters'

  //Character name in english to acess his animation files
  currentCharacter: null,
  isTalking: false, //Property that indicates if character is talking for switching animations

  // Character state
  currentEmotion: null,
  
  // Game progress
  currentPage: 'title',
  storyComplete: false,
  
  // Tools and features
  availableTools: [],
  mailingIconEnabled: false,
  
  // UI state
  manualVisible: false,
  manualUnlocked: false,
  manualRead: false,
  monitorOpen: false
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
    return {
      ...state,
      isTalking: action.value // <-- Set to true/false as needed
    };

    case 'UPDATE_CHAPTER': 
    return {
      ...state,
      currentChapter: currentChapter + 1
    }
      
    case 'NAVIGATE_TO_PAGE':
      return {
        ...state,
        currentPage: action.page
      };
      
    case 'TRIGGER_EVENT':
      switch (action.eventName) {

        case 'SHOW_USER_MANUAL':{
          return {
            ...state,
            manualVisible: true
          };
        }

        case 'UNLOCK_USER_MANUAL':{
          return {
            ...state,
            manualVisible: false,
            manualUnlocked: true
          };
        }


        case 'FINISH_READING_MANUAL':{
          return {
            ...state,
            manualRead: true
          }
        }

        case 'NAVIGATE_TO_GAME':
          return {
            ...state,
            currentPage: 'game',
            storyComplete: true
          };
          
        case 'ENABLE_MAILING_ICON':
          return {
            ...state,
            mailingIconEnabled: true
          };
          
        case 'UNLOCK_TOOL':
          return {
            ...state,
            availableTools: [...state.availableTools, event.payload]
          };
          
        default:
          return state;
      }
      
    case 'TOGGLE_MANUAL':
      return {
        ...state,
        manualOpen: !state.manualOpen
      };
      
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