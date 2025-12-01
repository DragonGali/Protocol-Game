import React from 'react';
import '../styles/MailList.css';
import useDragger from "../hooks/useDragger";
import monitorData from '../monitorData.js'
import { useGameState, isUnlocked, isVisible, hasCompleted } from './GameState.jsx';

const MailList = ({ onClose, onLetterSelect }) => {
  useDragger("MailList");
  const { state } = useGameState();
  const currentChapter = state.flags.currentChapter;

  // show current chapter only if update_mail completed
  const showCurrent = hasCompleted(state, 'update_mail');
  const highestChapter = showCurrent ? currentChapter : currentChapter - 1;

  // Generate all mail items from highestChapter to chapter 1 (reverse order)
  const mailItems = [];
  for (let chapter = highestChapter; chapter >= 1; chapter--) {
    const data = monitorData[`chapter_${chapter}`];
    if (!data) continue;

    const isCurrentChapter = showCurrent && chapter === currentChapter;
    
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
            <span className="protocol">{data['mailProtocol'] || data.protocol}</span>
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