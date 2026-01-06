import { useState, useEffect } from 'react';
import { useGameState, hasCompleted } from './GameState';

import '../Styles/CategorySearch.css';
import {manualData} from '../data_files/ManualData.js'

/*

    Category Search
    ---------------

    This component let's the player search entries(protocols') in the manual
    by they're categories (eg. network oriented) from all the chapters that they have already unlocked.

    The categories are decided in this jsx file with a dict, and all the items are filtered.
    When the user selects a category, all the entries relating to thsi category are shown, and selcting it 
    redirects the player to that entry

*/

