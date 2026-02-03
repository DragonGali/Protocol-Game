import React, { useEffect, useState, useRef } from 'react';
import useDragger from "../hooks/useDragger";
import "../styles/Terminal.css";
import terminalData from '../data_files/terminalData.js';
import { useGameState } from "./GameState.jsx";

/*

  Terminal Component
  ------------------

  Oh boy, this tool is great, and I was just gonna make it a fax machine (haha).
  This is very simple the player enter's a command and if theres a mistake with the command
  it completes the mistake to progress the dialogue and also displays the output from the command.

  There is a slight problem with this component, one of the commands it a little bit long and it goes to the next line and that looks bad...
  I'm planning to do a horizontal scroll bar for that but I f I dont finish it you know what to do.

*/

const Terminal = ({ onClose }) => {
  const { state, dispatch } = useGameState();
  const currentChapter = state.flags.currentChapter;

  useDragger("Terminal");

  // terminal focus
  const terminalRef = useRef(null);

  // input & history
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  // track WHICH mistake was solved
  const [solvedMistake, setSolvedMistake] = useState(null);

  // derive terminal text key from solved mistake
  const terminalChapterKey = solvedMistake
    ? solvedMistake.replace('mistake_', 'chapter_')
    : null;

  const data = terminalChapterKey
    ? terminalData[terminalChapterKey]
    : null;

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
      // find active terminal mistakes for this chapter
      const activeMistakes = Object.keys(state.flags).filter(
        (key) =>
          key.startsWith(`mistake_${currentChapter}_`) &&
          state.flags[key] === 'terminal'
      );

      for (const mistakeKey of activeMistakes) {
        const expectedCommand = state.flags[`${mistakeKey}_command`];

        if (input === expectedCommand) {
          setSolvedMistake(mistakeKey);

          dispatch({
            type: 'MARK_COMPLETED',
            id: mistakeKey,
          });

          break;
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
          alt="Close"
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
            <span className="prompt">C:\Users\Admin&gt;</span>
            <span className="terminal-text">{line}</span>
          </div>
        ))}

        {solvedMistake && (
          <img
            src="/General/Checkmark.png"
            className="outcome-symbol"
            alt="Success"
          />
        )}

        {solvedMistake && data && (
          <div className="terminal-outcome-text">
            {Object.values(data).map((line, idx) => (
              <div
                key={idx}
                dangerouslySetInnerHTML={{ __html: line }}
              />
            ))}
          </div>
        )}

        {!solvedMistake && (
          <div className="terminal-line" aria-live="polite">
            <span className="prompt">C:\Users\Admin&gt;</span>
            <span className="terminal-text">{input}</span>
            <span className="caret blink" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
