import { useState, useEffect } from 'react';
import '../Styles/Manual.css';

import ManualText from './ManualText';
import { useGameState } from './GameState';

const Manual = ({onClose}) => {

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isNewSection, setIsNewSection] = useState(true);

    const { state, dispatch } = useGameState();

    useEffect(() => {
    }, []);

  return (
    <div className="Manual">
        <img src="/General/close-button.png" id='manual-close-button' className='clickable' onClick={onClose}/>
        <div className='select-bar'>
            <div className={`select-bar-item ${isNewSection ? 'new' : ''} clickable ${selectedCategory === 'new' ? 'selected' : ''}`} onClick={() => { setSelectedCategory('new'); setIsNewSection(false); }}><span style={{ color: "var(--red)" }}>!</span>חדש</div>
            <div className={`select-bar-item clickable ${selectedCategory === 'name' ? 'selected' : ''}`} onClick={() => setSelectedCategory('name')}>שם</div>
            <div className={`select-bar-item clickable ${selectedCategory === 'category' ? 'selected' : ''}`} onClick={() => setSelectedCategory('category')}>קטגוריה</div>
        </div>

        {selectedCategory == null && <img src="/Manual/manual home page view.png" className='manual-home-page-view'></img>}
        {selectedCategory === 'new' && <ManualText chapter={state.currentChapter}/>}
    </div>
  );
}

export default Manual;
