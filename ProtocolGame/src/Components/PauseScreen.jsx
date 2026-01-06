import { useState, useEffect } from 'react';
import '../Styles/PauseScreen.css';

/* 
    Pause Screen
    ------------

    This pause screen opens every time the player pressed 'Tab',
    the pause screen can be used to open the navigationMap that
    can switch chapter's, or exit the game. the navigationMap is
    only unlocked if the player has already finished the game.

*/

const PauseScreen = () => {
    return (
        <div className='PauseScreen'>
            <div className='options'>
                <div className='option clickable' id='new-game'><p>משחק חדש</p></div>
                <div className='option clickable' id='choose-chapter'><p>בחירת פרק</p></div>
                <div className='option clickable' id='exit'><p>יציאה</p></div>
            </div>
        </div>
    );
}

export default PauseScreen;