import { useState, useEffect } from 'react';
import { useGameState, hasCompleted } from './GameState';

import '../Styles/NameSearch.css';
import {manualData} from '../data_files/ManualData.js'

/*
    Name Search
    -----------

    This component let's the player search entries(protocols') in the manual
    by name from all the chapters that they have already unlocked.

    The searching is done with a letter filter, they press on a letter
    on the screen and it presents them all the entry title's that start
    with that letter, clicking on them brings them to the manualText of
    that entry.


*/

const NameSearch = ({redirect}) => {
    const { state, dispatch } = useGameState();
    const [letters, setLetters] = useState([]);
    const [selectedLetter, setSelectedLetter] = useState();

    useEffect(() => {
        let letterDict = []

        Object.keys(manualData.Chapters).forEach(key => {
            if (key.split('_')[1] <= state.flags.currentChapter - !hasCompleted(state, 'update_manual')) {
                const title = manualData.Chapters[key]['title']
                if(title) {
                    letterDict[title[0]] = {...letterDict[title[0]], [title] : {chapter: key}}
                }
            }
        });

        setLetters(letterDict);
    }, [state.flags.currentChapter, hasCompleted(state, 'update_manual')])


    return (
        <div className='NameSearch'>
            <p className='title'>חיפוש בעזרת שם:</p>
            <div className='letters'>
                {/*displaying all the entry title letters*/}
                {Object.keys(letters).map(letter => (
                    <p key={letter} className='letter clickable' onClick={() => (setSelectedLetter(letter))}>{letter}</p>
                ))}
            </div>
            <div className='search-results'>
                {/*displaying all the entry titles*/}
                {selectedLetter && Object.keys(letters[selectedLetter]).map(title => (
                    <p key={title} className='entry-title clickable' onClick={() => {redirect(letters[selectedLetter][title].chapter.split('_')[1]); setSelectedLetter(null)}}>{title}</p>
                ))}
            </div>
        </div>
    );

}

export default NameSearch;