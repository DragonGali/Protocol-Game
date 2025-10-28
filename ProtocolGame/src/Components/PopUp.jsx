import React from 'react';
import useDragger from "../hooks/useDragger";
import "../styles/PopUp.css";

const PopUp = ({title, onClose, imgLink }) => {
  useDragger("PopUp");
  console.log(imgLink);

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