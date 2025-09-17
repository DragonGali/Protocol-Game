import { useState, useEffect } from 'react';
import '../Styles/ManualText.css';
import { manualData } from '../ManualData';
import { useGameState } from './GameState';

const ManualText = ({chapter}) => {
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
        dispatch({type:'TRIGGER_EVENT', eventName: "FINISH_READING_MANUAL"});//Marking new manual chapter as read
      }
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="ManualText">
      <p className="title">{selectedChapter.title}</p>

      <div className="lines">
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
