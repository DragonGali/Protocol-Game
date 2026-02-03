import React from 'react';
import DialogueManager from './DialogeManager';
import '../Styles/TextBox.css';
import {dialogueData} from '../data_files/dialogueData.js';

/*
    TextBox Component
    -----------------

    Just calls DialogueManager.

*/

function TextBox({ dialogueType, startDialogueId, onComplete}) {
  return (
    <div className="TextBox">
      <DialogueManager className="dialogue-manager"
        dialogueType={dialogueType}
        startDialogueId={startDialogueId}
        onComplete={onComplete}
        triangleColor="var(--white)"
        textSize="var(--font-regular)"
        triangleSize="1.5vw"
        triangleMargin="0 1vw 0 0"
      />
    </div>
  );
}

export default TextBox;