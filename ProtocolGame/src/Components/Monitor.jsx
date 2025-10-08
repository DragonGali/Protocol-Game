import { useState, useEffect } from 'react';
import { useGameState, isUnlocked, isVisible, hasCompleted } from './GameState.jsx';
import '../Styles/Monitor.css';

import MailList from './MailList.jsx';
import Letter from './Letter.jsx';
import PopUp from './PopUp.jsx';

function Monitor() {
  const { state, dispatch } = useGameState();
  const [openMail, setOpenMail] = useState(null);
  const [openLetter, setOpenLetter] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [popUpParams, setPopUpParams] = useState(null);
  const [stampActive, setStampActive] = useState(false);
  const [stampedElements, setStampedElements] = useState([]);

  // Mailing icon image logic
  const getMailingIconSrc = () => {
    return `/Monitor/mailingIcon${openMail === null ? '.png' : openMail ? 'Open.gif' : 'Close.gif'}`;
  };

  const handleMailingIconClick = () => {
    dispatch({ type: 'MARK_COMPLETED', id: 'clicked_mail_icon'});
    setOpenLetter(false);

    if (openMail === null) {
      setOpenMail(true);
    } else {
      setOpenMail(!openMail);
    }
  };

  const handleStampClick = () => {
    setStampActive(true);
    setOpenLetter(true);
    dispatch({ type: 'MARK_COMPLETED', id: 'activated_stamp' });
  };

  const handleElementStamp = (elementId) => {
    if (stampActive && !stampedElements.includes(elementId)) {
      setStampedElements([...stampedElements, elementId]);
      dispatch({ type: 'STAMP_ELEMENT', elementId });
    }
  };

  const deactivateStamp = () => {
    setStampActive(false);
  };

  // Add stamp-active class to body when stamp is active
  useEffect(() => {
    if (stampActive) {
      document.body.classList.add('stamp-active');
    } else {
      document.body.classList.remove('stamp-active');
    }

    return () => {
      document.body.classList.remove('stamp-active');
    };
  }, [stampActive]);

  return (
    <div
      className={`Monitor ${isVisible(state, 'monitor_showcase') ? 'showcase' : ''}`}
      style={{
        pointerEvents: state.monitorUnlocked ? 'auto' : 'none',
        display: isUnlocked(state, 'monitor') ? 'block' : 'none'
      }}
    >
      <div className="monitor-container">
        <div className="image-container">
          <img
            src={getMailingIconSrc()}
            className="mailing-icon clickable"
            onClick={handleMailingIconClick}
            style={{ display: isUnlocked(state, 'mail_list') ? 'block' : 'none' }}
            alt="Mailing icon"
          />
          {!hasCompleted(state, 'clicked_mail_icon') && (
            <img
              src="./General/NewSymbol.png"
              className="new-symbol"
              alt="New mail indicator"
            />
          )}
        </div>

        {openMail && (
          <MailList
            onClose={() => setOpenMail(false)}
            onLetterSelect={() => {
              setOpenMail(false);
              setOpenLetter(true);
              dispatch({type: 'MARK_COMPLETED', id: 'opened_letter'})
            }}
          />
        )}

        {openLetter && (
          <Letter
            openPopUp={(title, imgLink) => {
              setOpenPopUp(true);
              setPopUpParams([title, imgLink]);
            }}
            stampActive={stampActive}
            stampedElements={stampedElements}
            onElementStamp={handleElementStamp}
            onLetterClick={deactivateStamp}
          />
        )}

        {openPopUp && (
          <PopUp
            title={popUpParams[0]}
            imgLink={popUpParams[1]}
            onClose={() => setOpenPopUp(false)}
          />
        )}

        {isUnlocked(state, 'stamp') && hasCompleted(state, 'opened_letter') && (
          <div className="stamp-container">
            {!stampActive ? (
              <img
                className="stamp-icon clickable"
                src="./Monitor/tools/stamp.png"
                alt="Stamp tool"
                onClick={handleStampClick}
              />
            ) : (
              <img
                className="stamp-frame"
                src="./Monitor/tools/stamp_frame.png"
                alt="Stamp frame"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Monitor;