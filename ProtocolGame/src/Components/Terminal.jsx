import React, { useEffect, useState, useRef } from 'react';
import useDragger from "../hooks/useDragger";
import "../styles/Terminal.css";
import monitorData from '../monitorData';
import { useGameState } from "./GameState.jsx";

const Terminal = ({ onClose }) => {
  const { state, dispatch } = useGameState();
  const currentChapter = state.flags.currentChapter;

  useDragger("Terminal");

  // always "focused" so caret blinks and keyboard input is captured
  const [focused] = useState(true);
  const terminalRef = useRef(null);

  // simple input echo
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // ensure the terminal element is focused so accessibility/focus works
    terminalRef.current?.focus();

    const handleKeyDown = (e) => {
      // ignore modifier-only presses
      if (e.key === 'Shift' || e.key === 'Alt' || e.key === 'Meta' || e.key === 'Control') return;

      // handle backspace
      if (e.key === 'Backspace') {
        e.preventDefault();
        setInput((s) => s.slice(0, -1));
        return;
      }

      // handle enter -> push to history and clear
      if (e.key === 'Enter') {
        e.preventDefault();
        setHistory((h) => [...h, input]);
        setInput('');
        return;
      }

      // handle printable characters
      if (e.key.length === 1) {
        // avoid intercepting browser shortcuts (Ctrl/Cmd+...)
        if (e.ctrlKey || e.metaKey) return;
        e.preventDefault();
        setInput((s) => s + e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input]);

  return (
    <div className="Draggable Terminal" id="Terminal">
      <div className="header">
        <img
          src="./General/close-button.png"
          onClick={() => { onClose(); }}
          className="close-button clickable"
        />
      </div>

      <div
        className="terminal-content"
        tabIndex={0}
        ref={terminalRef}
        // keep clickable to focus, but caret and input work regardless
        onClick={() => terminalRef.current?.focus()}
        aria-label="Terminal"
      >
        {history.map((line, i) => (
          <div className="terminal-line" key={`h-${i}`}>
            <span className='prompt'>C:\Users\Admin&gt;</span>
            <span className="terminal-text">{line}</span>
          </div>
        ))}

        <div className="terminal-line" aria-live="polite">
          <span className='prompt'>C:\Users\Admin&gt;</span>
          <span className="terminal-text">{input}</span>
          {/* caret: white square that blinks (always active) */}
          <span className={`caret blink`} />
        </div>
      </div>
    </div>
  );
};

export default Terminal;