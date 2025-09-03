import { useState } from 'react';
import '../Styles/GameScreen.css';
import CustomerView from './CustomerView.jsx';
import Monitor from './Monitor.jsx';

function GameScreen() {

  return (
      <div className="GameScreen">
          <CustomerView className="CustomerView"/>
          <Monitor className="Monitor"/>
      </div>
  );
}

export default GameScreen;
