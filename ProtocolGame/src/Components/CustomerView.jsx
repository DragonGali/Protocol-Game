import { useState, useEffect } from 'react';
import '../Styles/CustomerView.css';
import { useGameState } from './GameState.jsx';

function CustomerView() {
  const { state } = useGameState();
  const [isAnimating, setIsAnimating] = useState(false);

  //Running customer slide in and brighter animation when the character changes
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 4000); // 4s matches total animation time
    return () => clearTimeout(timer);
  }, [state.currentCharacter]);

  return (
    <div className="CustomerView">
        <img 
          src={`/Customer/${state.currentCharacter}/${state.currentEmotion}_${state.isTalking ? 'talking' : 'idle'}.gif`}
          className={`character-sprite ${isAnimating ? 'entering' : ''}`}
          alt="Character"
        />
    </div>
  );
}

export default CustomerView;