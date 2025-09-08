import React from 'react';
import DialogueManager from './DialogeManager';
import '../Styles/TextBox.css';
import {dialogueData} from '../dialogueData.js';

function TextBox({ dialogueType, startDialogueId, onComplete}) {
  return (
    <div className="TextBox">
      {/* <p className="character-name">:{dialogueData[dialogueType][startDialogueId].name}</p> */}
      <DialogueManager className="dialogue-manager"
        dialogueType={dialogueType}
        startDialogueId={startDialogueId}
        onComplete={onComplete}
        triangleColor="var(--white)"
        textSize="2vw"
        triangleSize="1.5vw"
        triangleMargin="0 1vw 0 0"
        canAdvance={[dialogueData[dialogueType][startDialogueId].canAdvance]}
      />
    </div>
  );
}

export default TextBox;