import "../styles/about.css";

export default function About() {
  return (
    <section className="content-section about-section" id="about">
      <div className="section-shell about-layout">
        <div className="about-heading">
          <p className="eyebrow"><span /> 04 / A LITTLE ABOUT ME</p>
          <h2>Thoughtful tech.<br /><em>Meaningful impact.</em></h2>
        </div>
        <div className="about-copy">
          <p className="about-lead">
            I&apos;m Pattusuri Sanjana, an AIML engineer in the making with a
            curiosity for how intelligent technology can make a difference.
          </p>
          <p>
            I enjoy following a question from its first spark through
            experimentation and into something useful. Right now, I&apos;m
            exploring the intersection of artificial intelligence, machine
            learning, and software development.
          </p>
          <div className="about-signoff">ALWAYS CURIOUS <span>✳</span></div>
        </div>
      </div>
    </section>
  );
}