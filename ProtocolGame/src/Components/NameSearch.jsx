import { useState, useEffect } from 'react';
import { useGameState, hasCompleted } from './GameState';

import '../Styles/NameSearch.css';
import {manualData} from '../data_files/ManualData.js'

/*
    Name Search
    -----------

    This component let's the player search note's(protocols') in the manual
    by name from all the chapters that they have already unlocked.

    The searching is done with a letter filter, they press on a letter
    on the screen and it presents them all the note title's that start
    with that letter, clicking on them brings them to the manualText of
    that note.


*/

const NameSearch = () => {
    const { state, dispatch } = useGameState();
    const [letters, setLetters] = useState()

    useEffect(() => {
        let letterDict = []

        Object.keys(manualData.Chapters).forEach(key => {
            if (key.split('_')[1] <= state.flags.currentChapter) {
                const title = manualData.Chapters[key]['title']
                letterDict[title[0]] = {title: title}
                console.log(letterDict)
            }
        });
    }, [state.flags.currentChapter])


    return (
        <div className='NameSearch'>
            <p className='title'>חיפוש בעזרת שם:</p>
            <div className='letters'>
                {}
            </div>
        </div>
    );

}

export default NameSearch;