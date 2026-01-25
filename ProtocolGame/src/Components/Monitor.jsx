import { useState, useEffect } from 'react';
import { useGameState, isUnlocked, isVisible, hasCompleted } from './GameState.jsx';
import '../Styles/Monitor.css';

import MailList from './MailList.jsx';
import Letter from './Letter.jsx';
import PopUp from './PopUp.jsx';
import NetworkWindow from './NetworkWindow.jsx';
import GrandmaLetterEditor from './GrandmaLetterEditor.jsx';
import Terminal from './Terminal.jsx';

function Monitor() {
  const { state, dispatch } = useGameState();
  const [openMail, setOpenMail] = useState(null);
  const [openLetter, setOpenLetter] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [popUpParams, setPopUpParams] = useState(null);
  const [stampedElements, setStampedElements] = useState([]);
  const [playingButtonAnimation, setPlayingButtonAnimation] = useState();
  const [toolInUse, setToolInUse] = useState();

  const [gifCache, setGifCache] = useState(Math.random());

  // Mailing icon image logic
  const getMailingIconSrc = () => {
    return `/Monitor/mailingIcon${openMail === null ? '.png' : openMail ? 'Open.gif' : 'Close.gif'}`;
  };

  const handleMailingIconClick = () => {
    if(hasCompleted(state, 'update_mail')) {
      dispatch({ type: 'MARK_COMPLETED', id: 'clicked_mail_icon'});
    }
    setOpenLetter(false);

    if (openMail === null) {
      setOpenMail(true);
    } else {
      setOpenMail(!openMail);
    }
  };

  const handleStampClick = () => {
    setOpenLetter(true);
    dispatch({ type: 'SHOW', id: 'using_stamp' });
  };

  const deactivateStamp = () => {
    dispatch({type: 'HIDE', id: 'using_stamp'});
  };

  // Add stamp-active class to body when stamp is active, to show the stamp cursor.
  useEffect(() => {

    if (isVisible(state, 'using_stamp')) {
      document.body.classList.add('stamp-active');
    } else {
      document.body.classList.remove('stamp-active');
    }

    if (isVisible(state, 'submit-animation')) {
      setOpenMail(false);
      setOpenLetter(false);
      setToolInUse(null);
    }

    return () => {
      document.body.classList.remove('stamp-active');
    };
  }, [state]);

  useEffect(() => {
    setGifCache(Math.random());
  }, [isVisible(state, 'submit-animation')]);

  return (
    <div
      className={`Monitor ${isVisible(state, 'monitor_showcase') ? 'showcase' : ''} ${isVisible(state, 'submit-animation') ? 'submit-animation' : ''}`}
      style={{
        pointerEvents: state.monitorUnlocked ? 'auto' : 'none',
        display: isUnlocked(state, 'monitor') ? 'block' : 'none',
        backgroundImage: isVisible(state, 'submit-animation') ? `url("/Monitor/submit-animation.gif?cache=${gifCache}")` : 'url("/Monitor/MonitorBackground.png")',
      }}
    >
      <div className="monitor-container">
        {isUnlocked(state, 'help-icon') && (
          <div className="help-container">
            <img src="/Monitor/help-icon.png" className={`help-icon clickable ${isVisible(state, 'help-icon-showcase') ? 'showcase' : ''}`}/>
          </div>
        )}

        {isUnlocked(state, "mail_list") && <div className="image-container">
          <img
            src={getMailingIconSrc()}
            className="mailing-icon clickable"
            onClick={handleMailingIconClick}
            style={{ display: isUnlocked(state, 'mail_list') ? 'block' : 'none' }}
            alt="Mailing icon"
          />
          {!hasCompleted(state, 'clicked_mail_icon') && hasCompleted(state, 'update_mail') && (
            <img
              src="./General/NewSymbol.png"
              className="new-symbol"
              alt="New mail indicator"
            />
          )}
        </div>}

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

        {openLetter && (!state.flags['mistake_6'] || hasCompleted(state, 'mistake_6')) && (
          <Letter
            openPopUp={(title, imgLink) => {
              setOpenPopUp(true);
              setPopUpParams([title, imgLink]);
            }}
            onElementStamp={deactivateStamp}
          />
        )}

        {openLetter && state.flags['mistake_6'] && !hasCompleted(state, 'mistake_6') && (
          <GrandmaLetterEditor
            onElementStamp={deactivateStamp}
          />
        )}

        {openPopUp && (
          <PopUp
            title={popUpParams[0]}
            imgLink={popUpParams[1]}
            onClose={() => setOpenPopUp(false)}
          />
        )}

        {isUnlocked(state, 'stamp') && openLetter && (
          <div className="stamp-container">
            {!isVisible(state, 'using_stamp') ? (
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

        {isUnlocked(state, 'network') && openLetter && 
              <img
                src="./Monitor/tools/networkIcon.png"
                className='network-icon clickable'
                onClick={() => {
                  dispatch({type: 'SHOW', id: 'using_network'})
                  setToolInUse(toolInUse === 'network' ?  null : 'network')
                }}
              />
        }

        {toolInUse === 'network' && 
          <NetworkWindow onClose={() => {dispatch({type: 'HIDE', id: 'using_network'}); setToolInUse(null)}}/>
        }

        {isUnlocked(state, 'terminal') && openLetter && 
              <img
                src="./Monitor/tools/terminalIcon.png"
                className='terminal-icon clickable'
                onClick={() => {
                  dispatch({type: 'SHOW', id: 'using_terminal'})
                  setToolInUse(toolInUse === 'terminal' ?  null : 'terminal')
                }}
              />
        }

        {toolInUse === 'terminal' && 
          <Terminal onClose={() => {dispatch({type: 'HIDE', id: 'using_terminal'}); setToolInUse(null)}}/>
        }


        {isVisible(state, 'submit-button') && <img className='submit-button clickable' src={`./Monitor/submit-button${playingButtonAnimation ? '.gif' : '.png'}`}
        onClick={() => {setPlayingButtonAnimation(true); setTimeout(() => {
          setPlayingButtonAnimation(false);
          dispatch({type: "MARK_COMPLETED", id: "submit"})
        }, 1000);}}/>}

        {state.flags["aquired_item"] && <img className='aquired-item' src={`/Monitor/pop_ups/AquiredItems/aquired_${state.flags.aquired_item}.png`}/>}
      </div>

    </div>
  );
}

export default Monitor;