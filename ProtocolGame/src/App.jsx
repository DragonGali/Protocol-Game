import { useState, useEffect } from 'react';
import './App.css';

import TitleScreen from "./Components/TitleScreen.jsx";
import StoryScreen from "./Components/StoryScreen.jsx";
import { GameStateProvider } from "./Components/GameState.jsx";
import GameScreen from './Components/GameScreen.jsx';
import PauseScreen from './Components/PauseScreen.jsx'

// Dictionary of all pages
const pages = {
  title: 'title',
  story: 'story',
  game: 'game',
  // Add more pages as needed
};

function App() {
  const [currentPage, setCurrentPage] = useState(pages.title);
  const [isPaused, setIsPaused] = useState(false);
  const [chapterSelect, setChapterSelect] = useState(null);

  // Page components mapping
  const pageComponents = {
    [pages.title]: <TitleScreen onStartGame={() => setCurrentPage(pages.story)} />,
    [pages.story]: <StoryScreen onContinue={() => setCurrentPage(pages.game)} />,
    [pages.game]: <GameScreen className="game-screen" chapterSelect={chapterSelect}/>,
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
    //Maybe write a message to make sure if the player really wants to close the game.
    window.close();
  }

  const handleRestart = () => {
    setIsPaused(false);
    setChapterSelect(0);
    setCurrentPage(pages.title);
  }

  const handleChapterSelect = (chapter) => {
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
