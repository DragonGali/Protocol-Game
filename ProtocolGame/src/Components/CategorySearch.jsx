import { useState, useEffect } from 'react';
import { useGameState, hasCompleted } from './GameState';

import '../Styles/CategorySearch.css';
import {manualData} from '../data_files/ManualData.js'

/* 

    Category Search Component
    -------------------------

    Just like the NameSearch Component, this component allows you to search for manual entries,
    that you have already unlocked but this time with categories.

*/

const CategorySearch = ({redirect}) => {
    const { state, dispatch } = useGameState();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();

    useEffect(() => {
        let categoryDict = [];

        Object.keys(manualData.Chapters).forEach(key => {
            if (key.split('_')[1] <= state.flags.currentChapter - !hasCompleted(state, 'update_manual')) {
                const category = manualData.Chapters[key].category;
                const title = manualData.Chapters[key].title;
                
                if (category && title) {
                    categoryDict[category] = {...categoryDict[category], [title]: {chapter: key}};
                }
            }
        });

        setCategories(categoryDict);
    }, [state.flags.currentChapter, hasCompleted(state, 'update_manual')])

    return (
        <div className='CategorySearch'>
            <p className='title'>חיפוש בעזרת כטגוריה: </p>
            <div className='categories'>
                {Object.keys(categories).map(category => (
                    <p key={category} className='category clickable' onClick={() => setSelectedCategory(category)}>{category}</p>
                ))}
            </div>
            <div className='search-results'>
                {selectedCategory && Object.keys(categories[selectedCategory]).map(title => (
                    <p key={title} className='entry-title clickable' onClick={() => {redirect(categories[selectedCategory][title].chapter.split('_')[1]); setSelectedCategory(null)}}>{title}</p>
                ))}
            </div>
        </div>
    );
}

export default CategorySearch;