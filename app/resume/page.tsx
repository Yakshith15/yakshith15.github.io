import type { Metadata } from "next";
import {
  companies,
  education,
  projects,
  siteConfig,
  skills,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${siteConfig.author} — software engineer working on backend and infrastructure.`,
};

// Mirrors resume/resume.tex, which stays the canonical source for the PDF.
// Edit both when experience changes; the tex is what recruiters receive.
const resumeProjects = projects.filter((project) => project.featured);

export default function ResumePage() {
  return (
    <div className="resume-page">
      <div className="resume-actions">
        <h1>Resume</h1>
        <a className="resume-download" href="/resume.pdf" download>
          Download PDF
        </a>
      </div>

      <article className="resume-sheet">
        <header className="resume-header">
          <h2>{siteConfig.author}</h2>
          <p className="resume-contact">
            {siteConfig.currentLocation}
            {" · "}
            <a href="mailto:daggupatiyakshithnaidu@gmail.com">
              daggupatiyakshithnaidu@gmail.com
            </a>
          </p>
          <p className="resume-contact">
            <a href="https://github.com/Yakshith15">github.com/Yakshith15</a>
            {" · "}
            <a href="https://www.linkedin.com/in/yakshithnaidu/">
              linkedin.com/in/yakshithnaidu
            </a>
            {" · "}
            <a href={siteConfig.baseUrl}>
              {siteConfig.baseUrl.replace("https://", "")}
            </a>
          </p>
        </header>

        <section className="resume-section">
          <h3>Experience</h3>
          {companies.map((company) => (
            <div key={company.name} className="resume-entry">
              {company.positions.map((position, index) => (
                <div key={position.title} className="resume-role">
                  {index === 0 && (
                    <div className="resume-line">
                      <span className="resume-org">{company.name}</span>
                    </div>
                  )}
                  <div className="resume-line">
                    <span className="resume-title">{position.title}</span>
                    <span className="resume-dates">{position.duration}</span>
                  </div>
                  {position.context && (
                    <p className="resume-context">{position.context}</p>
                  )}
                  <ul>
                    {position.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </section>

        {resumeProjects.length > 0 && (
          <section className="resume-section">
            <h3>Projects</h3>
            {resumeProjects.map((project) => (
              <div key={project.name} className="resume-role">
                <div className="resume-line">
                  <span className="resume-title">
                    {project.githubUrl ? (
                      <a href={project.githubUrl}>{project.name}</a>
                    ) : (
                      project.name
                    )}
                  </span>
                  <span className="resume-dates">{project.language}</span>
                </div>
                <ul>
                  {(project.highlights ?? [project.description]).map(
                    (highlight) => (
                      <li key={highlight}>{highlight}</li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </section>
        )}

        <section className="resume-section">
          <h3>Education</h3>
          {education.map((entry) => (
            <div key={entry.institution} className="resume-role">
              <div className="resume-line">
                <span className="resume-org">{entry.institution}</span>
                <span className="resume-dates">{entry.year}</span>
              </div>
              <p className="resume-detail">
                {entry.degree}, {entry.field} · {entry.gpa}
              </p>
            </div>
          ))}
        </section>

        <section className="resume-section">
          <h3>Technical Skills</h3>
          <p className="resume-detail">
            <strong>Languages:</strong> {skills.languages.join(", ")}
          </p>
          <p className="resume-detail">
            <strong>Technologies:</strong> {skills.technologies.join(", ")}
          </p>
        </section>
      </article>
    </div>
  );
}
