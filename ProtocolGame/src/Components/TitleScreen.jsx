import React from 'react';

import "../Styles/TitleScreen.css"

const TitleScreen = ({ onStartGame }) => {
  const handleClick = () => {
    document.querySelector(".TitleScreen").classList.add("fade-out");
    setTimeout(onStartGame, 1000);
  };

  return (
    <div className="TitleScreen" onClick={handleClick}>
      <p> לחצו על כל כפתור בשביל להתחיל</p>
    </div>
  );
};

export default TitleScreen;