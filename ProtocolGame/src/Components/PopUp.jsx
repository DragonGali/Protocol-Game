import React from 'react';
import useDragger from "../hooks/useDragger";
import "../styles/PopUp.css";

/*
  PopUp Component
  ----------------

  tiny draggable window.

*/

const PopUp = ({title, onClose, imgLink }) => {
  useDragger("PopUp");

  return (
    <div className="Draggable PopUp" id="PopUp">
      <div className="popup-header">
        <p className='header-title'>{title}</p>
        <img
          src="./General/close-button.png"
          onClick={onClose}
          className="close-button clickable"
        />
      </div>
      <img className='popup-img' src={imgLink}/>
    </div>
  );
};

export default PopUp;