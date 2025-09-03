import { useState } from 'react';
import '../Styles/GameScreen.css';
import CustomerView from './CustomerView.jsx';

function GameScreen() {

  return (
      <div className="GameScreen">
          <CustomerView className="CustomerView"/>
      </div>
  );
}

export default GameScreen;
