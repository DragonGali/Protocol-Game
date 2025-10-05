import {useState} from "react";
import "../Styles/Letter.css";

import monitorData from "../monitorData";
import { useGameState } from "./GameState";

const Letter = ({ onClose, openPopUp }) => {

  const { state, dispatch } = useGameState(false);
  const [openLetter, setOpenLetter] = useState(false);
  const data = monitorData[`chapter_${state.currentChapter}`];

  return (
    <div className={`Letter ${openLetter ? 'open closable' : 'closed openable' }`}
    onClick={() => {setOpenLetter(!openLetter)}}
    >
      {openLetter && <div className="letter-text-container">
            
            <div className="header">
                <p>{`------<HEADER>------`}</p>
            </div>

            <div className="letter-text">
                {data.text}
            </div>

            {data.link !== null && <div className="link">
                <span className="clickable" onClick={(e) => {e.stopPropagation(); openPopUp(data.link, data.imgLink)}}>{data.link}</span> :קישור מצורף
            </div>}

            <div className="footer">
                <p>{`---<FOOTER>---`}</p>
            </div>
            
      </div>}

      <div className="protocol">
        <p>{data.protocol}</p>
      </div>
      <div className="src-adress">
        <p>מאית: {data.sourceAddress}</p>
      </div>
      <div className="dest-adress">
        <p>לכבוד: {data.destinationAddress}</p>
      </div>
      <div className="port">
        <p>פורט: {data.port}</p>
      </div>
    </div>
  );
};

export default Letter;