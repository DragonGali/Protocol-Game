import { useState, useEffect } from 'react';
import '../Styles/NavigationScreen.css';
import { useGameState, hasCompleted } from './GameState';

/*
    NavigationScreen
    ----------------

    This screen is used to switch between chapter's when the
    game is paused. The screen is only availible when the user has already
    finished the game at least once.

    //maybe make it all the avilible chapter's instead?

*/

const NavigationScreen = ({selectChapter}) => {
    const { state } = useGameState()

    return (
        <div className='NavigationScreen'>
            <div className='title'>
                <p>תבחרו פרק</p>
            </div>
            <div className='navigation-circles'>
                <div className='navigation-circle edge-chapter-circle'>
                    <p>מסך פתיחה</p>
                </div>
                

            </div>
        </div>
    );
}

export default NavigationScreen;
