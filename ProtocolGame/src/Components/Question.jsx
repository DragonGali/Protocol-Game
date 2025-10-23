import React from 'react';
import useDragger from "../hooks/useDragger";
import { useGameState, hasCompleted } from './GameState.jsx';
import "../styles/Question.css";

const Question = ({dialogue}) => {

  const { state, dispatch } = useGameState();

  return (
    <div className="Question">
        {dialogue.answers.map((answer, index) => (
          <button key={index} className="question-answer clickable"
            onClick={() => {dispatch({ type: 'SET_FLAG', key: 'selectedAnswer', value: answer });}}
          >
            {answer}
          </button>
        ))}
    </div>
  );
};

export default Question;