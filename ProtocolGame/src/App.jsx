import { useState, useEffect } from 'react';
import './App.css';

import TitleScreen from "./Components/TitleScreen.jsx";
import StoryScreen from "./Components/StoryScreen.jsx";
import { GameStateProvider } from "./Components/GameState.jsx";
import GameScreen from './Components/GameScreen.jsx';
import PauseScreen from './Components/PauseScreen.jsx'
import Credits from './Components/Credits.jsx';



/*
 /$$   /$$                     /$$                          
| $$  | $$                    | $$                          
| $$  | $$  /$$$$$$   /$$$$$$$| $$$$$$$   /$$$$$$  /$$$$$$$ 
| $$$$$$$$ /$$__  $$ /$$_____/| $$__  $$ /$$__  $$| $$__  $$
| $$__  $$| $$  \ $$|  $$$$$$ | $$  \ $$| $$$$$$$$| $$  \ $$
| $$  | $$| $$  | $$ \____  $$| $$  | $$| $$_____/| $$  | $$
| $$  | $$|  $$$$$$/ /$$$$$$$/| $$  | $$|  $$$$$$$| $$  | $$
|__/  |__/ \______/ |_______/ |__/  |__/ \_______/|__/  |__/                                                      



████████████████████████▓▓▓▓▓▓▓▓▓▓▓▓████████████████████████
███████████████████▓▓▓████████████████▓▓▓▓██████████████████
███████████████▓▓██████████████████████████▓▓███████████████
████████████▓▓███████████▓▒▒▒▒▒▒▒▒▒▒▓█████████▓▓████████████
██████████▓▓████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓██████████▓▓██████████
████████▓▓███████████████▒▓▒▓▒▒▒▒▓▒▒▓█████████████▓▓████████
███████▓██████████████████▓▓▒▒▒▒▒▒▒▓████████████████▓███████
█████▓▓████████████████████▓▓▓▒▒▓▒███████████████████▓▓█████
████▓▓███████████████████████▓▓▓▓█████████████▓▒▒▒█████▓████
███▓█████████▓█████████████████████████████████▒▒▓██████▓███
██▓▓████████████████████████████████████████████████████▓▓██
██▓███████▓██████████████████████████████████████████████▓██
█▓█████▓▒▓███████████████▓▒█████████▓▒▓███████████████████▓█
█▓████▓▒▓▒▓████████████▓▒▒▒▒▓████▓▒▒▒▒▒███████████████████▓█
█▓████████████████████▓▒▒▒▒▒▒▒▓█▓▒▒░░▒▒▓███▓██████████████▓█
▓▓████████████████████▒░▒▒▒▒▒▒▒▒▒░▒▒▒░▒▓██▓████████████████▓
▓█████████████▓█████████▒▒▒▒▒▒▒▒▒░░▒▓██████████████████████▓
▓▓█████████████████████▓▒▒░▒▒▒▒▒▒▒▒▓█████▓█████████████████▓
█▓███████████████████▓▒▒▒▒██▓▒▒░░▒▒▓█████▓████████████████▓█
█▓███████████████████▒▒▒▒▒███▓▒░░░▒▒████▒█████████████████▓█
█▓██████████████████▓▒░▒▓██████▒▓█▓▓▒██▒▓█████████████████▓█
██▓████████████████▓▒▓███████████████▒▒▒█████████████████▓██
██▓▓██████████████████████████████▓▒░░▒█████████████████▓▓██
███▓████████████████████████████████▓▒▒█████████████████▓███
████▓███████████████████████████████▒▒█████████████████▓████
█████▓▓████████████████████████████▒▒████████████████▓▓█████
███████▓████████████████▓█████████▒▒▓███████████████▓███████
████████▓▓███████████████▒███████▒▒▓██████████████▓▓████████
██████████▓▓█████████████▓▒▓███▒▒▒▒██████████████▓██████████
████████████▓▓████████████▒▒▒▒▒▒▒▒████████████▓▓████████████
███████████████▓▓██████████▒▒▒▒▒▒▒█████████▓▓███████████████
██████████████████▓▓▓▓██████▓▒▓▓▒▓████▓▓▓▓██████████████████
████████████████████████▓▓▓▓▓▓▓▓▓▓▓▓████████████████████████


Description: 
Welcome to the Protocl Game, Fellow Programmer!
While you navigate through the endless jungle of code, bugs and features be sure to read my comments for they shall guide you on your journey.

Here take this gift, it is dangerous to go alone:

                /()
                / /
               / /
  /============| |------------------------------------------,
{=| / / / / / /|()}     }     }     }                        >  THE SWORD OF ORIENTATION
  \============| |------------------------------------------'
               \ \
                \ \
                 \()


BLADE — Where truth cuts through confusion
------------------------------------------
• Everything in this world obeys GameState.jsx
• Components do not control behavior — state does
• If something makes no sense, you have not looked at the state yet


EDGE — The sharp rules that save hours
--------------------------------------
• UI only reflects: visible, unlocked, completed
• If something appears or disappears, search for SHOW / HIDE / UNLOCK
• If debugging dialogue takes too much time change the text speed in the dialogue Manager
• Old Unsused Code is your enemy - DELETE IT


GUARD — Protection from common mistakes
---------------------------------------
• DialogueManager is a state machine, not a text renderer
• globalWaits can interrupt any dialogue at any time
• If dialogue “jumps”, a globalWait did it
• waitFor blocks the player, not the code


GRIP — How to safely add new features
-------------------------------------
• Never start from a component
• First ask: what Set or Flag represents this?
• Then update dialogueData or chapterData
• UI will follow automatically


POMMEL — Wisdom from those who came before you
----------------------------------------------
• Chapters reset the world but preserve the story (currentChapter)
• Many things that look redundant prevent state desync
• Respect the flow of dispatch → state → UI

You are now equipped.

Proceed, brave programmer.


*/

// Dictionary of all pages
const pages = {
  title: 'title',
  story: 'story',
  game: 'game',
};

function App() {
  const [currentPage, setCurrentPage] = useState(pages.title);
  const [isPaused, setIsPaused] = useState(false);
  const [chapterSelect, setChapterSelect] = useState(null);

  // Page components mapping
  const pageComponents = {
    [pages.title]: <TitleScreen onStartGame={() => setCurrentPage(pages.story)} />,
    [pages.story]: <StoryScreen onContinue={() => setCurrentPage(pages.game)} />,
    [pages.game]: <GameScreen className="game-screen" chapterSelect={chapterSelect} onFinish={() => setCurrentPage(pages.credits)} pauseScreen={() => {setIsPaused(true);}}/>,
    [pages.credits]: <Credits onClose={() => setCurrentPage(pages.title)}/>,
  };

  //Function that open's the pause screen if the player presse's Enter or Escape on the keypad
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        setIsPaused(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
    
  }, []);
  

  //close's the game
  const handleQuit = () => {
    //Maybe write a message to make sure if the player really wants to close the game. (nah)
    window.close();
  }

  const handleRestart = () => {// Restart the game from chapter 0
    setIsPaused(false);
    setChapterSelect(0);
    setCurrentPage(pages.title);
  }

  const handleChapterSelect = (chapter) => {// Select a specific chapter from the pause menu
    if (chapter == 0) {
      setCurrentPage(pages.story)
    }
    else {
      setCurrentPage(pages.game);
    }
    setChapterSelect(chapter);
  }


  return (
    <GameStateProvider>
      <div className="App">
      {pageComponents[currentPage]}
      {isPaused && <PauseScreen quit={() => {handleQuit()}} restart={() => {handleRestart()}} selectChapter={(chapter) => {handleChapterSelect(chapter)}}></PauseScreen>}
      </div>
    </GameStateProvider>
  );
}

export default App;
