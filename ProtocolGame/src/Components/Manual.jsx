import { useState, useEffect } from 'react';
import '../Styles/Manual.css';
import ManualText from './ManualText';
import { useGameState, hasCompleted } from './GameState';

const Manual = ({ onClose }) => {
  const { state, dispatch } = useGameState();
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [finishedReading, setFinishedReading] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(state.flags.currentChapter || 1);
  const [shouldClose, setShouldClose] = useState(false);

  // Check if this chapter has been read
  const chapterCompleted = hasCompleted(state, `read_manual_ch${selectedChapter}`);

  const closeProcedure = () => {
    if (finishedReading && selectedChapter === state.flags.currentChapter) {
      // Dispatch the completion
      dispatch({ 
        type: 'MARK_COMPLETED', 
        id: `read_manual_ch${selectedChapter}` 
      });
      setShouldClose(true);
    } else {
      onClose();
    }
  };

  // Wait for the state to update before closing
  useEffect(() => {
    if (shouldClose && chapterCompleted) {
      onClose();
    }
  }, [chapterCompleted, shouldClose]);

  const hasNewContent = !hasCompleted(state, `read_manual_ch${selectedChapter}`);

  return (
    <div className="Manual">
      <img 
        src="/General/close-button.png" 
        id='manual-close-button' 
        className='clickable' 
        onClick={closeProcedure}
      />
      <div className='select-bar'>
        <div 
          className={`select-bar-item ${hasNewContent ? 'new' : ''} clickable ${selectedCategory === 'new' ? 'selected' : ''}`} 
          onClick={() => setSelectedCategory('new')}
        >
          <span style={{ color: "var(--red)" }}>!</span>חדש
        </div>
        <div 
          className={`select-bar-item clickable ${selectedCategory === 'name' ? 'selected' : ''}`} 
          onClick={() => setSelectedCategory('name')}
        >
          שם
        </div>
        <div 
          className={`select-bar-item clickable ${selectedCategory === 'category' ? 'selected' : ''}`} 
          onClick={() => setSelectedCategory('category')}
        >
          קטגוריה
        </div>
      </div>

      {selectedCategory == null && <img src="/Manual/manual home page view.png" className='manual-home-page-view' alt="Manual home" />}
      {selectedCategory === 'new' && (
        <ManualText 
          chapter={selectedChapter} 
          onFinish={() => setFinishedReading(true)}
        />
      )}
    </div>
  );
}

export default Manual;