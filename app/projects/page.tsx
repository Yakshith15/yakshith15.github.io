import type { Metadata } from "next";
import Row from "@/components/Row";
import { projects } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Projects",
  description: "Distributed systems I have built from scratch to see how they work.",
};

export default function ProjectsPage() {
  return (
    <>
      <Row className="page-head">
        <h1 className="page-title">Projects</h1>
        <p className="page-intro">
          Distributed systems I have built from scratch to see how they work.
        </p>
      </Row>

      {projects.map((project) => (
        <section key={project.id} className="section" aria-labelledby={project.id}>
          <Row
            label={
              <>
                {project.status}
                <br />
                {project.language}
              </>
            }
          >
            <div className="project">
              <h2 className="project-name" id={project.id}>
                {project.name}
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
            </div>
          </Row>
        </section>
      ))}
    </>
  );
}
