import React from 'react';

import "../Styles/TitleScreen.css"

/*
    TitleScreen Component
    --------------------

    Cool background.

*/

const TitleScreen = ({ onStartGame }) => {
  const handleClick = () => {
    document.querySelector(".TitleScreen").classList.add("fade-out");
    setTimeout(onStartGame, 1000);
  };

  return (
    <div className="TitleScreen clickable" onClick={handleClick}>
      <p> לחצו על המסך בשביל להתחיל</p>
    </div>
  );
};

export default TitleScreen;