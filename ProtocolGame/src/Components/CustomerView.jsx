import { useState } from 'react';
import '../Styles/CustomerView.css';
import { useGameState } from './GameState.jsx';

function CustomerView() {
  const { state } = useGameState();
  return (
    <div className="CustomerView">
        <img 
          src={`/Customer/${state.currentCharacter}/${state.currentEmotion}_${state.isTalking ? 'talking' : 'idle'}.gif`}
          className="character-sprite"
          alt="Character"
        />
    </div>
  );
}

export default CustomerView;