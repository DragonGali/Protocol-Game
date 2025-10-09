import { useGameState, isVisible, hasCompleted, getFlag } from '../Components/GameState.jsx';

/**
 * Custom hook for managing stampable element behavior
 * @param {string} elementId - The unique identifier for this element
 * @returns {Object} - Stamping state and handlers
 */
export const useStampable = (elementId) => {
  const { state, dispatch } = useGameState();

  // Check if we're in stamp mode
  const isStampMode = isVisible(state, 'using_stamp');
  
  // Check if this specific element is stamped
  const isStamped = getFlag(state, 'stampedElement') === elementId;
  
  // Check if this element is a completed mistake
  // Look through all flags to find any mistake_X that matches this elementId
  let isCompleted = false;
  Object.keys(state.flags).forEach(key => {
    if (key.startsWith('mistake_') && state.flags[key] === elementId) {
      // This element is marked as a mistake, check if it's completed
      if (hasCompleted(state, key)) {
        isCompleted = true;
      }
    }
  });

  // Handle stamping this element
  const handleStamp = (e) => {
    if (isStampMode) {
      e.stopPropagation();
      dispatch({ 
        type: 'SET_FLAG', 
        key: 'stampedElement', 
        value: elementId 
      });
    }
  };

  // Generate className string
  const getClassNames = (baseClass) => {
    return [
      baseClass,
      'stampable-element',
      isStampMode && 'stamp-active',
      isStamped && 'stamped',
      isCompleted && 'completed-mistake',
      isStampMode && !isStamped && 'clickable'
    ].filter(Boolean).join(' ');
  };

  return {
    // State
    isStampMode,
    isStamped,
    isCompleted,
    
    // Handlers
    handleStamp,
    
    // Utility
    getClassNames
  };
};