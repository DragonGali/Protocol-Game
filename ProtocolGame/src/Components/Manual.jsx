import { useState, useEffect } from 'react';
import '../Styles/Manual.css';

import ManualText from './ManualText';
import { useGameState } from './GameState';
import { manualData } from '../ManualData';

const Manual = ({onClose}) => {

   const { state, dispatch } = useGameState();

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isNewSection, setIsNewSection] = useState(true);
    const [finishedReading, setFinishedReading] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(state.currentChapter);
    const [closeManual, setCloseManual] = useState(false);


    const closeProcedure = () => {
      if (finishedReading && selectedChapter === state.currentChapter) {
        dispatch({type:'TRIGGER_EVENT', eventName: "FINISH_READING_MANUAL"});//Marking new manual chapter as read, once you close the screen.
        setCloseManual(true);
        if (state.manualRead) {
          onClose();
        }
      }

      else {
        onClose()
      }

    }

    useEffect(() => {
      if (state.manualRead && closeManual) {
        onClose();
      }
    }, [state.manualRead])

  return (
    <div className="Manual">
        <img src="/General/close-button.png" id='manual-close-button' className='clickable' onClick={() => closeProcedure()}/>
        <div className='select-bar'>
            <div className={`select-bar-item ${isNewSection ? 'new' : ''} clickable ${selectedCategory === 'new' ? 'selected' : ''}`} onClick={() => { setSelectedCategory('new'); setIsNewSection(false); }}><span style={{ color: "var(--red)" }}>!</span>חדש</div>
            <div className={`select-bar-item clickable ${selectedCategory === 'name' ? 'selected' : ''}`} onClick={() => setSelectedCategory('name')}>שם</div>
            <div className={`select-bar-item clickable ${selectedCategory === 'category' ? 'selected' : ''}`} onClick={() => setSelectedCategory('category')}>קטגוריה</div>
        </div>

        {selectedCategory == null && <img src="/Manual/manual home page view.png" className='manual-home-page-view'></img>}
        {selectedCategory === 'new' && <ManualText chapter={selectedChapter} onFinish={() => {setFinishedReading(true)}}/>}
    </div>
  );
}

export default Manual;
