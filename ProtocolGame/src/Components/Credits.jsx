import '../Styles/Credits.css';

const Credits = ({ onClose }) => {
  return (
    <div className="Credits">
      <main className="creditsMain">
        <div className="creditsScroll">
          {/* intro section */}
          <section className="creditsSection">
            <p>a film by <span><b>Tom Gormican</b></span></p>
          </section>

          {/* cast */}
          <article style={{ marginBottom: '5em' }}>
            <h2>Cast</h2>
            <dl>
              <dt>Zac Efron</dt><dd>Jason</dd>
              <dt>Miles Teller</dt><dd>Daniel</dd>
              <dt>Michael B. Jordan</dt><dd>Mikey</dd>
              <dt>Imogen Poots</dt><dd>Ellie</dd>
              <dt>Mackenzie Davis</dt><dd>Chelsea</dd>
              <dt>Jessica Lucas</dt><dd>Vera</dd>
            </dl>
          </article>

          {/* credits list */}
          <article className="creditsList">
            <h2>Credits</h2>

            {/* Repeat groups of dl as needed */}
            <dl>
              <dt>Production Coordinator</dt><dd>Gina Roche</dd>
              <dt>Second 2nd Assistant Director</dt><dd>Mary Michel D'onofrio</dd>
              <dt>Additional Unit Production Manager</dt><dd>Devorah Devries</dd>
              <dt>Additional 2nd Assistant Directors</dt><dd>Scott Friendman<br/>Jason Hightower</dd>
              <dt>Production Accountant</dt><dd>Sarah Lane</dd>
              <dt>1st Assistant Accountant</dt><dd>Paul Bischot</dd>
              {/* …more credit items… */}
            </dl>

            {/* Add more <dl> groups as in the original if needed */}
          </article>

          {/* end text */}
          <section className="creditsSection">
            <h3>The End.</h3>
          </section>
        </div>
      </main>

      {/* Optional close button */}
      {onClose && (
        <button className="creditsClose" onClick={onClose}>
          Close
        </button>
      )}
    </div>
  );
};

export default Credits;
