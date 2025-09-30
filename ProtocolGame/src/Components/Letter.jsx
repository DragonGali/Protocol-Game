import {useState} from "react";
import "../Styles/Letter.css";

import monitorData from "../monitorData";
import { useGameState } from "./GameState";

const Letter = ({ onClose }) => {

  const { state, dispatch } = useGameState(false);
  const [openLetter, setOpenLetter] = useState(false);
  const data = monitorData[`chapter_${state.currentChapter}`];

  return (
    <div className={`Letter ${openLetter ? 'open' : 'closed' }`}>
      <div className="protocol">
        <p>{data.protocol}</p>
      </div>
      <div className="src-adress">
        <p>מאית: {data.sourceAdress}</p>
      </div>
      <div className="dest-adress">
        <p>לכבוד: {data.destAdress}</p>
      </div>
      <div className="port">
        <p>פורט: {data.port}</p>
      </div>
    </div>
  );
};

export default Letter;