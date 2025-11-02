import { useGameState, isVisible, hasCompleted, getFlag } from '../Components/GameState.jsx';

export const useStampable = (elementId) => {
  const { state, dispatch } = useGameState();

  const isStampMode = isVisible(state, 'using_stamp');
  
  const isStamped = getFlag(state, 'stampedElement') === elementId;
  
  // Check if this element is a completed mistake
  let isCompleted = false;
  let mistakeKey = null;
  
  Object.keys(state.flags).forEach(key => {
    if (key.startsWith('mistake_')) {
      const mistakeData = state.flags[key];
      
      // Handle both old format (string) and new format (object with location)
      if (typeof mistakeData === 'string') {
        // Old format: "mistake_1": "footer"
        if (mistakeData === elementId) {
          mistakeKey = key;
          if (hasCompleted(state, key)) {
            isCompleted = true;
          }
        }
      } else if (typeof mistakeData === 'object') {
        // New format: "mistake_3": { location: "link", corrections: {...} }
        const elementToCheck = mistakeData.location;
        if (elementToCheck === elementId) {
          mistakeKey = key;
          if (hasCompleted(state, key)) {
            isCompleted = true;
          }
        }
      }
    }
  });

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
    mistakeKey,
    
    // Handlers
    handleStamp,
    
    // Utility
    getClassNames
  };
};