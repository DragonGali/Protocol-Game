import '../Styles/Credits.css';

const Credits = ({ onClose }) => {
  return (
    <div className="Credits">
      <main className="creditsMain">
        <div className="creditsScroll">
          {/* intro section */}

          <section className="creditsSection">
            <img className='creditsImage' src='./TitleScreen/title screen.png'/>
            <p>משחק פותח על ידי <span style={{ color: 'var(--yellow)' }}>גלי קרצר</span></p>
          </section>

          {/* עיצוב */}
          <article style={{ marginBottom: '5em' }}>
            <h2>עיצוב</h2>
            <dl>
              <dt>תכנון עיצובי</dt><dd>Millanote</dd>
              <dt>תיק מסכים</dt><dd>Figma</dd>
              <dt>איורים</dt><dd>pixilart</dd>
              <dt>עריכת תמונות</dt><dd>Remove.bg, Microsoft Paint</dd>
              <dt>אנימצייה</dt><dd>Ezgif</dd>
              <dt></dt>
            </dl>
            <img className='creditsImage' id='maya-shimon' src='./Credits/Maya and Shimon.png'/>
          </article>

          {/* טכנות */}
          <article className="creditsList">
            <h2>טכנות</h2>
            <dl>
                <dt>שפת המשחק</dt><dd>JavaScript (React)</dd>
                <dt>ספריות</dt><dd>React, React DOM</dd>
                <dt>כלי פיתוח</dt><dd>Visual Studio Code, Git</dd>
            </dl>
            <img className='creditsImage' id='mel-liyor' src='./Credits/Mel and Liyor.png'/>
          </article>

          {/* השראות */}
          <article className="creditsList">
            <h2>השראות</h2>
            <dl>
                <p>VA-11 Hall-A</p>
                <p>Ace Attorney</p>
                <p>משחקי נרטיב ומערכות דיאלוג</p>
              <img className='creditsImage' id='daniel-granny' src='./Credits/Daniel and Granny.png'/>
            </dl>
          </article>

          {/* end text */}
          <section className="creditsSection">
            <h3 style={{ color: 'var(--yellow)' }}>הסוף</h3>
            <p>תודה ששיחקתה!</p>
          </section>
        </div>
      </main>

      {/* Optional close button */}
      {onClose && (
        <button className="creditsClose clickable" onClick={onClose}>
          חזרה
        </button>
      )}
    </div>
  );
};

export default Credits;
