import { useState, useEffect } from 'react';
import { useGameState } from './GameState.jsx';
import '../Styles/Monitor.css';

function Monitor() {
  const { state, dispatch } = useGameState(false);
  const [openMail, setOpenMail] = useState(true);

  const getMailingIconSrc = () => {
    if (state.newMail) {
      return '/Monitor/mailingIconNew.png';
    }
    return openMail ? '/Monitor/mailingIconOpen.gif' : '/Monitor/mailingIconClose.gif';
  };

  return (
    <div 
      className={`Monitor ${state.monitorShowcase ? 'showcase' : ''}`}
      style={{
        pointerEvents: state.monitorUnlocked ? 'auto' : 'none'
      }}
    >
      <div className='image-container'>
        <img 
          src={getMailingIconSrc()}
          className={`mailing-icon clickable ${state.newMail ? 'new-mail' : ''}`}
          onClick={() => {
            dispatch({ type: 'SET_NEW_MAIL', payload: false });
            setTimeout(() => setOpenMail(!openMail), 0);
          }}
          style={{ display: state.mailingIconEnabled ? 'block' : 'none' }}
          alt="Mailing icon"
        />
      </div>
    </div>
  );
}

export default Monitor;