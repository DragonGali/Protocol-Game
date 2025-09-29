import React from 'react';
import '../styles/MailList.css';
import useDragger from "../hooks/useDragger";

const MailList = ({ onClose, onLetterSelect }) => {

  useDragger("MailList");

  // For experimentation - hardcoded
  const currentChapter = 1;
  const testLetter = {
    customerName: 'דניאל',
    protocol: 'TCP'
  };

  return (
    <div className="MailList Draggable" id="MailList">
      {/* Title Bar */}
      <div className="mail-list-header">
        <h2 className="header-title">דואר</h2>
        <img
          src="./General/close-button.png"
          onClick={onClose}
          className="close-button clickable"
        />
      </div>

      {/* Scrollable List */}
      <div className="mail-list-content">
        <div className="mail-item mail-item-odd mail-item-latest clickable"
        onClick={() => {onLetterSelect()}}
        >
          <div className="mail-item-inner">
            <span className="mail-number">1</span>
            <div className="mail-text">
              <span className="customer-name">{testLetter.customerName}</span>
              <span className="separator">:</span>
              <span className="protocol">{testLetter.protocol}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailList;