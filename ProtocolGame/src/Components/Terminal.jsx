import React, { useEffect, useState, useRef } from 'react';
import useDragger from "../hooks/useDragger";
import "../styles/Terminal.css";
import terminalData from '../data_files/terminalData.js';
import { useGameState } from "./GameState.jsx";

const Terminal = ({ onClose }) => {
  const { state, dispatch } = useGameState();
  const currentChapter = state.flags.currentChapter;

  useDragger("Terminal");

  // always "focused" so caret blinks and keyboard input is captured
  const [focused] = useState(true);
  const terminalRef = useRef(null);

  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [outcome, setOutcome] = useState(null);
  const data = terminalData[`chapter_${currentChapter}`];

  useEffect(() => {
    terminalRef.current?.focus();

    const handleKeyDown = (e) => {
      if (['Shift', 'Alt', 'Meta', 'Control'].includes(e.key)) return;

      if (e.key === 'Backspace') {
        e.preventDefault();
        setInput((s) => s.slice(0, -1));
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        setHistory((h) => [...h, input]);
        checkCommand(input);
        setInput('');
        return;
      }

      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setInput((s) => s + e.key);
      }
    };

    const checkCommand = (input) => {
      // Loop through all possible mistakes for this chapter
      const mistakes = Object.keys(state.flags).filter(
        (key) =>
          key.startsWith(`mistake_${currentChapter}_`) &&
          state.flags[key] === 'terminal'
      );

      for (let mistakeKey of mistakes) {
        const expectedCommand = state.flags[`${mistakeKey}_command`];
        if (input === expectedCommand) {
          setOutcome('success');
          dispatch({
            type: 'MARK_COMPLETED',
            id: mistakeKey,
          });
          break; // stop after first match
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, state.flags, currentChapter]);

  return (
    <div className="Draggable Terminal" id="Terminal">
      <div className="header">
        <img
          src="./General/close-button.png"
          onClick={onClose}
          className="close-button clickable"
        />
      </div>

      <div
        className="terminal-content"
        tabIndex={0}
        ref={terminalRef}
        onClick={() => terminalRef.current?.focus()}
        aria-label="Terminal"
      >
        {history.map((line, i) => (
          <div className="terminal-line" key={`h-${i}`}>
            <span className='prompt'>C:\Users\Admin&gt;</span>
            <span className="terminal-text">{line}</span>
          </div>
        ))}

        {outcome && <img src='/General/Checkmark.png' className='outcome-symbol'/>}
        {outcome &&
          <div className='terminal-outcome-text'>
            {Object.values(data).map((line, idx) => (
              <div key={idx}><div dangerouslySetInnerHTML={{__html: line}} /></div>
            ))}
          </div>
        }

        {!outcome &&
          <div className="terminal-line" aria-live="polite">
            <span className='prompt'>C:\Users\Admin&gt;</span>
            <span className="terminal-text">{input}</span>
            <span className={`caret blink`} />
          </div>
        }
      </div>
    </div>
  );
};

export default Terminal;
