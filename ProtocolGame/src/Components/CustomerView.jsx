import { useState, useEffect } from 'react';
import '../Styles/CustomerView.css';
import { useGameState } from './GameState.jsx';

/* 

  Customer View Component
  -----------------------

  This component manages the character sprite, its emotions and talking animations.
  Originally I was going to have an animation of the character entering and exiting the room
  but first of all thatd take too long to animate and second it looked kinda bad (i'm not a good animator),
  so instead iv'e made this fade in animation...well it's okay I guess a little bit wierd though, but hey! maybe you could fix it.


*/

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