import React, { useEffect, useState } from 'react';
import useDragger from "../hooks/useDragger";
import "../styles/NetworkWindow.css";
import monitorData from '../data_files/monitorData';
import { useGameState } from "./GameState.jsx"

/*

  NetworkWindow Component
  -----------------------

  This component is like when a movie has no way to progress a plot so it show an external
  sign or something. So here there is no "problem", really it just shows you some number
  and then you're like: "wait, what the hell is code 500", and then the game explains oh that's
  yada yada yada but i'm not aan expert i'm not sure if those codes are real or not, you should check that.

*/

const NetworkWindow = ({title, onClose}) => {
  const { state, dispatch } = useGameState();
  const currentChapter = state.flags.currentChapter;
  const [networkState, setNetworkState] = useState('waiting'); // 'waiting' | 'response'
  const [responseCode, setResponseCode] = useState(null);
  const [isError, setIsError] = useState(false);
  const [gifKey, setGifKey] = useState(0);

  useDragger("NetworkWindow");

  // Check if there's a network mistake in the current chapter
  const mistakeKey = `mistake_${currentChapter}`;
  const mistakeValue = state.flags[mistakeKey];
  const hasNetworkMistake = mistakeValue === 'network' && state.flags[mistakeKey].correction == null;

  const [gifCache] = useState(Math.random());

  // Simulate network request
  useEffect(() => {
    const timer = setTimeout(() => {
      setNetworkState('response');
      
      // If there's a network mistake, use that code, otherwise default to 200 (success)
      const code = hasNetworkMistake ? state.flags[`${mistakeKey}_code`] : 200;
      setResponseCode(code);
      setIsError(code !== 200);
      
      // Mark network check as completed
      dispatch({
        type: 'MARK_COMPLETED',
        id: 'networkChecked',
      });
    }, 6000);

    return () => clearTimeout(timer);
  }, [hasNetworkMistake, state.flags.mistake_4_code, dispatch]);

  const getStatusIcon = () => {
    return isError ? './General/thumbs-down.png' : './General/thumbs-up.png';
  };

  const getStatusColor = () => {
    return isError ? 'var(--red)' : 'var(--green)';
  };

  const handleClose = () => {
    // Reset network state when closing
    setNetworkState('waiting');
    setResponseCode(null);
    setIsError(false);
    dispatch({
      type: 'MARK_COMPLETED',
      id: 'networkChecked',
    });
    onClose();
  };

  return (
    <div className="Draggable NetworkWindow" id="NetworkWindow">
      <div className="header">
        <img
          src="./General/close-button.png"
          onClick={handleClose}
          className="close-button clickable"
        />
        <p className='header-title'>{title}</p>
      </div>
      <div 
        className='main-body'
        style={{
          backgroundImage: `url("./Monitor/network-animation.gif?cache=${gifCache}")`,
          backgroundSize: '100% 100%'
        }}
      >
        <p className='source'>{monitorData[`chapter_${currentChapter}`].sourceAddress}</p>
        <p className='dest'>{monitorData[`chapter_${currentChapter}`].destinationAddress}</p>

        <div className='network-response'>
          {networkState === 'waiting' && (
            <p className='waiting-text'>waiting...</p>
          )}

          {networkState === 'response' && (
            <div className='response-container'>
              <img 
                src={getStatusIcon()} 
                alt={isError ? 'error' : 'success'}
                className='status-icon'
              />
              <p className='response-code' style={{ color: getStatusColor() }}>
                {responseCode}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkWindow;