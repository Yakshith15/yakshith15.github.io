import type { Metadata } from "next";
import { projects } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Projects",
  description: "Distributed systems I have built from scratch to see how they work.",
};

export default function ProjectsPage() {
  return (
    <>
      <header className="page-head">
        <h1 className="page-title">Projects</h1>
        <p className="page-intro">
          Distributed systems I have built from scratch to see how they work.
        </p>
      </header>

      {projects.map((project) => (
        <section key={project.id} id={project.id} className="project" aria-labelledby={`${project.id}-name`}>
          <h2 className="project-name line" id={`${project.id}-name`}>
            <span>{project.name}</span>
            <span className="meta">
              {project.language} · {project.status}
            </span>
          </h2>
          <p>{project.description}</p>
          <ul>
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          {project.note && <p className="muted">{project.note}</p>}
          {(project.repo || project.writeup) && (
            <p className="meta links">
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noopener noreferrer">
                  Source ↗
                </a>
              )}
              {project.writeup && <a href={project.writeup}>Write-up →</a>}
            </p>
          )}
        </section>
      ))}
    </>
  );
}
