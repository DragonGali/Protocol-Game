// GameState.jsx
import React, { createContext, useContext, useReducer } from 'react';
import { gameEvents } from '../dialogueData.js';

const GameStateContext = createContext();

const initialState = {
  // Current dialogue
  currentDialogue: null,
  dialogueType: null, // 'story' or 'characters'
  
  // Character state
  currentEmotion: null,
  
  // Game progress
  currentPage: 'title',
  storyComplete: false,
  
  // Tools and features
  availableTools: [],
  mailingIconEnabled: false,
  
  // UI state
  manualOpen: false,
  monitorOpen: false
};

function gameStateReducer(state, action) {
  switch (action.type) {
    case 'SET_DIALOGUE':
      return {
        ...state,
        currentDialogue: action.dialogueId,
        dialogueType: action.dialogueType,
        currentEmotion: action.emotion || state.currentEmotion
      };
      
    case 'NAVIGATE_TO_PAGE':
      return {
        ...state,
        currentPage: action.page
      };
      
    case 'TRIGGER_EVENT':
      const event = gameEvents[action.eventName];
      if (!event) return state;
      
      switch (event.action) {
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
      
    case 'SET_EMOTION':
      return {
        ...state,
        currentEmotion: action.emotion
      };
      
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