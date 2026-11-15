import { projects } from "../data/portfolio";
import "../styles/projects.css";

export default function Projects() {
  return (
    <section className="content-section projects-section" id="projects">
      <div className="section-shell">
        <div className="section-heading">
          <p className="eyebrow"><span /> 02 / SELECTED WORK</p>
          <h2>Curiosity, <em>in progress.</em></h2>
          <p className="section-intro">A space for experiments, ideas, and things built along the way.</p>
        </div>
        {projects.length > 0 ? (
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <span className="project-number">0{index + 1}</span>
                <p className="project-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                </div>
                {project.href && <a href={project.href} target="_blank" rel="noreferrer">VIEW PROJECT <span>↗</span></a>}
              </article>
            ))}
          </div>
        ) : (
          <div className="projects-empty">
            <span className="empty-index">01</span>
            <div>
              <p>THE FIRST CHAPTER IS TAKING SHAPE</p>
              <h3>Good work takes curiosity.</h3>
            </div>
            <span className="empty-mark" aria-hidden="true">↗</span>
          </div>
        )}
      </div>
    </section>
  );
}