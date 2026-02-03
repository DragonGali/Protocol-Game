import { useState, useEffect } from 'react';
import '../Styles/ManualText.css';
import { manualData } from '../data_files/ManualData';
import { useGameState } from './GameState';


/*

  ManualText Component
  --------------------

  The part that displays the pages with the text, to make it easier to convert the text from
  manualData to the one displayed here, iv'e made a structure that has a title, pages and lines.
  Each line follows the next one with a "\n", so you can think of it as a paragraph. Also to make
  text be colorful at places and have different sizes or whatnot, iv'e added HTML support, so you can
  just add <span> tags to the text and it will render it correctly.

  Additionally, iv'e added support for special events, that can be triggered when clicking on certain lines.
  For now the only event is "SHOW:id" which shows an image with the given id from the GameState's visible set.
  This is done by adding a data-event attribute to the line's <p> tag, which is then read in the onClick handler.
*/

const ManualText = ({chapter, onFinish}) => {
  const { state, dispatch } = useGameState();
  const chapterKey = `chapter_${chapter}`;
  const selectedChapter = manualData.Chapters[chapterKey];

  // Track current page inside the chapter
  const [currentPage, setCurrentPage] = useState(1);

  const pageKey = `page_${currentPage}`;
  const page = selectedChapter.pages[pageKey];

  const goPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goNext = () => {
    if (currentPage < Object.keys(selectedChapter.pages).length) {
      if (currentPage === Object.keys(selectedChapter.pages).length - 1) {
        onFinish();//Marking last page as read
      }
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="ManualText">
      <p className="title">{selectedChapter.title}</p>

      <div
        className="lines"
        onClick={(e) => {
          const eventString = e.target.dataset.event; // read data-event
          if (!eventString) return;

          const [type, id] = eventString.split(":"); // parse it
          if (type === "SHOW") {
            dispatch({ type, id }); // dispatch the action
          }
        }}
      >
        {Object.keys(page).map((lineKey) => (
          <p
            key={lineKey}
            className="line"
            dangerouslySetInnerHTML={{ __html: page[lineKey] }}
          />
        ))}
      </div>


      <div className="arrows-container">
        <img
          src="/Manual/arrow.png"
          className={`arrow left clickable ${
            currentPage === Object.keys(selectedChapter.pages).length ? 'disabled' : ''
          }`}
          onClick={goNext}
          alt="Next"
        />
        <p className='pageIndex'>
            {`${currentPage} / ${Object.keys(selectedChapter.pages).length}`}
        </p>
        <img
          src="/Manual/arrow.png"
          className={`arrow right clickable ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={goPrev}
          alt="Previous"
        />
      </div>
    </div>
  );
};

export default ManualText;
