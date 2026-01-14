import { useState, useEffect } from 'react';
import '../Styles/NavigationScreen.css';
import { useGameState, hasCompleted } from './GameState';

import {chapterData} from "../data_files/chapterData.js"

/*
    NavigationScreen
    ----------------

    This screen is used to switch between chapter's when the
    game is paused. The screen is only availible when the user has already
    finished the game at least once.

    //maybe make it all the avilible chapter's instead?

*/

const NavigationScreen = ({selectChapter}) => {
    const { state, dispatch } = useGameState()

    return (
        <div className='NavigationScreen'>
            <div className='title'>
                <p>תבחרו פרק</p>
            </div>
            <div className='navigation-circles'>
                {Object.entries(chapterData).map(([Key, value]) => (
                    <div onClick={() => {selectChapter(value.flags.currentChapter)}}className={`navigation-circle clickable ${state.flags.currentChapter == value.flags.currentChapter ? 'selected-chapter-circle': value.flags.currentChapter === 19 || value.flags.currentChapter === 'title' ? 'edge-chapter-circle' : 'regular-chapter-circle'}`}>
                        <p>{value.title}</p>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default NavigationScreen;
