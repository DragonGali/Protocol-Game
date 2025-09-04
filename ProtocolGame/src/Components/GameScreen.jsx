import { useState } from 'react';
import '../Styles/GameScreen.css';
import CustomerView from './CustomerView.jsx';
import Monitor from './Monitor.jsx';
import TextBox from './TextBox.jsx';

function GameScreen() {

  return (
      <div className="GameScreen">
          <CustomerView className="CustomerView"/>
          <Monitor className="Monitor"/>
          <TextBox 
            dialogueType="characters"
            startDialogueId="daniel_intro_1"
            onComplete={() => {
                // What happens when dialogue sequence ends
                console.log("Dialogue finished!");
            }}
            />
      </div>
  );
}

export default GameScreen;
