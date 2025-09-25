import { useState, useEffect } from 'react';
import { useGameState } from './GameState.jsx';
import '../Styles/Monitor.css';

function Monitor() {
  const { state, dispatch } = useGameState();

  return (
    <div 
      className={`Monitor ${state.monitorShowcase ? 'showcase' : ''}`}
      style={{
        pointerEvents: state.monitorUnlocked ? 'auto' : 'none'
      }}
    >
      <img src={`/Monitor/mailingIcon${state.newMail ? 'New' : ''}.png`}
      className="mailing-icon clickable"
      style={{ display: state.mailingIconEnabled ? 'block' : 'none' }}>
      </img>
    </div>
  );
}

export default Monitor;