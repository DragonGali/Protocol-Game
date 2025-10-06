import { useState } from 'react';
import './App.css';

import TitleScreen from "./Components/TitleScreen.jsx";
import StoryScreen from "./Components/StoryScreen.jsx";
import { GameStateProvider } from "./Components/GameState.jsx"; // ✅ import provider
import GameScreen from './Components/GameScreen.jsx';

// Dictionary of all pages
const pages = {
  title: 'title',
  story: 'story',
  game: 'game',
  // Add more pages as needed
};

function App() {
  const [currentPage, setCurrentPage] = useState(pages.game);

  // Page components mapping
  const pageComponents = {
    [pages.title]: <TitleScreen onStartGame={() => setCurrentPage(pages.story)} />,
    [pages.story]: <StoryScreen onContinue={() => setCurrentPage(pages.game)} />,
    [pages.game]: <GameScreen className="game-screen"/>,
  };

  return (
    <GameStateProvider>
      <div className="App">
        {pageComponents[currentPage]}
      </div>
    </GameStateProvider>
  );
}

export default App;
