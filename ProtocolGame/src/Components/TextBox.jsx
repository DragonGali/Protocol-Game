import React from 'react';
import DialogueManager from './DialogeManager';
import '../Styles/TextBox.css';

function TextBox({ dialogueType, startDialogueId, onComplete}) {
  return (
    <div className="TextBox">
      <p className="character-name">:דניאל</p>{/*Change this later*/}
      <DialogueManager className="dialogue-manager"
        dialogueType={dialogueType}
        startDialogueId={startDialogueId}
        onComplete={onComplete}
        textColor="var(--white)"
        triangleColor="var(--white)"
        textSize="2vw"
        triangleSize="1.5vw"
        triangleMargin="0 0 0 1vw" {/*Fix the triangle later*/}

      />
    </div>
  );
}

export default TextBox;