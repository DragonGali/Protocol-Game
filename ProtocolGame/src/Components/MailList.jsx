import React from 'react';
import '../styles/MailList.css';
import useDragger from "../hooks/useDragger";
import monitorData from '../monitorData.js'
import { useGameState, isUnlocked, isVisible, hasCompleted } from './GameState.jsx';

const MailList = ({ onClose, onLetterSelect }) => {
  useDragger("MailList");
  const { state } = useGameState();
  const currentChapter = state.flags.currentChapter;

  // Generate all mail items from current to chapter 1 (reverse order)
  const mailItems = [];
  for (let chapter = currentChapter; chapter >= 1; chapter--) {
    const data = monitorData[`chapter_${chapter}`];
    const isCurrentChapter = chapter === currentChapter;
    
    mailItems.push(
      <div 
        key={chapter}
        className={`mail-item ${chapter % 2 === 1 ? 'mail-item-odd' : ''} 
          ${isCurrentChapter ? 'mail-item-latest clickable' : 'mail-item-completed'}`}
        onClick={() => isCurrentChapter ? onLetterSelect() : null}
      >
        <div className="mail-item-inner">
          <span className="mail-number">{chapter}</span>
          <div className="mail-text">
            <span className="customer-name">{data.customerName}</span>
            <span className="separator">:</span>
            <span className="protocol">{data.protocol}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="MailList Draggable" id="MailList">
      <div className="mail-list-header">
        <h2 className="header-title">דואר</h2>
        <img
          src="./General/close-button.png"
          onClick={onClose}
          className="close-button clickable"
        />
      </div>

      <div className="mail-list-content">
        {mailItems}
      </div>
    </div>
  );
};

export default MailList;