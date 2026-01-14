import { useState } from 'react';
import '../Styles/PauseScreen.css';
import { useGameState, hasCompleted } from './GameState';

import NavigationScreen from './NavigationScreen.jsx';

/* 
    Pause Screen
    ------------

    This pause screen opens every time the player pressed 'Tab',
    the pause screen can be used to open the navigationMap that
    can switch chapter's, or exit the game. the navigationMap is
    only unlocked if the player has already finished the game.

*/

const PauseScreen = ({restart, quit, selectChapter}) => {
    const { state, dispatch } = useGameState();
    const [openNavigation, setOpenNavigation] = useState(false);

    const handleSelectChapter = (chapter) => {
        closingProcedure();
        if (chapter === 'title') {
            restart();
        }
        else {
            dispatch({type: 'CHAPTER_SELECT', value: chapter});
            selectChapter(chapter);
        }
    }

    const closingProcedure = () => {
        dispatch({type: 'RESET_FLAGS'});
        dispatch({type: 'RESET_COMPLETED'});
        dispatch({type: 'HIDE', id: 'submit-animation'});
        dispatch({type: 'SET_FLAG', key: 'stampedElement', value: null});
        dispatch({type: 'CLEAR_GLOBAL_WAITS'});
  }

    return (
        <div className='PauseScreen'>
            {!openNavigation && <div className='options'>
                <div className='option clickable' id='new-game' onClick={() => {restart();}}><p>משחק חדש</p></div>
                <div className={`option ${/*!hasCompleted(state, 'finsihed_game') ? 'disabled' :*/ 'clickable'}`} id='choose-chapter' onClick={() => {setOpenNavigation(true);}}><p>בחירת פרק</p></div>
                <div className='option clickable' id='exit' onClick={() => {quit();}}><p>יציאה</p></div>
            </div>}
            {openNavigation && <NavigationScreen selectChapter={(chapter) => {handleSelectChapter(chapter);}}></NavigationScreen>}
        </div>
    );
}

export default PauseScreen;