import "../styles/education.css";

export default function Education() {
  return (
    <section className="education-section">
      <div className="section-shell education-inner">
        <p className="eyebrow"><span /> CONTINUOUS LEARNING</p>
        <div className="education-card">
          <span className="education-marker">✳</span>
          <div>
            <p className="education-label">ALWAYS IN PROGRESS</p>
            <h2>Building a foundation<br />for what&apos;s next.</h2>
            <p className="education-description">Learning, asking better questions, and making room for the next idea.</p>
          </div>
          <span className="education-year">2026 <i>—</i></span>
        </div>
      </div>
    </section>
  );
}