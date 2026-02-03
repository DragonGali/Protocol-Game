import React from 'react';
import useDragger from "../hooks/useDragger";
import { useGameState, hasCompleted } from './GameState.jsx';
import "../styles/Question.css";

/*
  Question Component
  ------------------

  This component displays a question with multiple answers for the player to choose from.
  When an answer is selected, it updates the game state with the selected answer.

  This is used to make sure the player is paying attension to the info in the manaul
  and not just randomly stamping lines. (Although it is multiple choice, so...)

*/

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