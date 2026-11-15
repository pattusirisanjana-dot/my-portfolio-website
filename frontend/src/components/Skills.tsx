import { skillGroups } from "../data/portfolio";
import "../styles/skills.css";

export default function Skills() {
  return (
    <section className="content-section skills-section" id="skills">
      <div className="section-shell skills-layout">
        <div className="section-heading">
          <p className="eyebrow"><span /> 03 / AREAS OF INTEREST</p>
          <h2>Learning by<br /><em>building.</em></h2>
          <p className="section-intro">The questions I am exploring and the tools I am growing with.</p>
        </div>
        <div className="skills-list">
          {skillGroups.map((group, index) => (
            <div className="skill-row" key={group.title}>
              <span className="skill-number">0{index + 1}</span>
              <div><h3>{group.title}</h3><p>{group.items.join("  ·  ")}</p></div>
              <span className="skill-arrow" aria-hidden="true">↗</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}