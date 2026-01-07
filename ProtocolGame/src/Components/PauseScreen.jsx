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

const PauseScreen = ({restart, quit}) => {
    const { state } = useGameState();
    const [openNavigation, setOpenNavigation] = useState(false);

    return (
        <div className='PauseScreen'>
            {!openNavigation && <div className='options'>
                <div className='option clickable' id='new-game' onClick={() => {restart();}}><p>משחק חדש</p></div>
                <div className={`option ${/*!hasCompleted(state, 'finsihed_game') ? 'disabled' :*/ 'clickable'}`} id='choose-chapter' onClick={() => {setOpenNavigation(true);}}><p>בחירת פרק</p></div>
                <div className='option clickable' id='exit' onClick={() => {quit();}}><p>יציאה</p></div>
            </div>}
            {openNavigation && <NavigationScreen></NavigationScreen>}
        </div>
    );
}

export default PauseScreen;