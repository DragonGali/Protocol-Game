import { useState, useEffect } from 'react';
import '../Styles/ManualText.css';
import { manualData } from '../ManualData';
import { useGameState } from './GameState';

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
