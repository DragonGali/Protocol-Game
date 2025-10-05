import { useState, useEffect } from 'react';
import { useGameState } from './GameState.jsx';
import '../Styles/Monitor.css';

import MailList from './MailList.jsx';
import Letter from './Letter.jsx';
import PopUp from './PopUp.jsx';

function Monitor() {
  const { state, dispatch } = useGameState(false);
  const [openMail, setOpenMail] = useState(null);
  const [openLetter, setOpenLetter] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [popUpParams, setPopUpParams] = useState(null);

  const getMailingIconSrc = () => {
    return `/Monitor/mailingIcon${openMail === null ? '.png' : openMail ? 'Open.gif' : 'Close.gif'} `;
  };

  const handleMailingIconClick = () => {
    dispatch({ type: 'SET_NEW_MAIL', payload: false });
    setOpenLetter(false);
    if (openMail === null) {
        setOpenMail(true);
    }

    setOpenMail(!openMail);
            
  }

  return (
    <div 
      className={`Monitor ${state.monitorShowcase ? 'showcase' : ''}`}
      style={{
        pointerEvents: state.monitorUnlocked ? 'auto' : 'none'
      }}
    >
      <div className='monitor-container'>
        <div className='image-container'>
        <img 
          src={getMailingIconSrc()}
          className='mailing-icon clickable'
          onClick={() => {handleMailingIconClick()}}
          style={{ display: state.mailingIconEnabled ? 'block' : 'none' }}
          alt="Mailing icon"
        />
          {state.newMail && (
            <img 
              src='./General/NewSymbol.png'
              className='new-symbol'
              alt="New mail indicator"
            />
          )}
        </div>
        {openMail && <MailList onClose={() => {setOpenMail(false)}} onLetterSelect={() => {setOpenMail(false); setOpenLetter(true);}}></MailList>}
        {openLetter && <Letter openPopUp={(title, imgLink) => {setOpenPopUp(true); setPopUpParams([title, imgLink])}}></Letter>}
        {openPopUp && <PopUp title={popUpParams[0]} imgLink={popUpParams[1]} onClose={() => {setOpenPopUp(false)}}></PopUp>}
      </div>
    </div>
  );
}

export default Monitor;