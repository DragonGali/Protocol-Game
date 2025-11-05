import React from 'react';
import useDragger from "../hooks/useDragger";
import "../styles/NetworkWindow.css";
import monitorData from '../monitorData';
import { getFlag } from './GameState';
import { useGameState, isVisible } from "./GameState.jsx"

const NetworkWindow = ({title, onClose}) => {
  const { state } = useGameState();
  const currentChapter = state.flags.currentChapter;

  useDragger("NetworkWindow");

  return (
    <div className="Draggable NetworkWindow" id="NetworkWindow">
      <div className="header">
        <p className='header-title'>{title}</p>
        <img
          src="./General/close-button.png"
          onClick={onClose}
          className="close-button clickable"
        />
      </div>
      <div className='main-body'>
        <p className='source'>{monitorData[`chapter_${currentChapter}`].sourceAddress}</p>
      </div>
    </div>
  );
};

export default NetworkWindow;