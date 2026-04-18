"use client";

import type { Project } from "@/lib/site-config";

const LANGUAGE_COLORS: Record<string, string> = {
  Go: "#00ADD8",
  Python: "#3776AB",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Java: "#E76F00",
  "C++": "#00599C",
  YAML: "#CB171E",
  Rust: "#DEA584",
};

const STATUS_LABELS: Record<Project["status"], string> = {
  featured: "Featured",
  "in-progress": "In Progress",
  archived: "Archived",
};

interface Props {
  project: Project;
  onOpen?: () => void;
}

export default function ProjectCard({ project, onOpen }: Props) {
  const langColor = LANGUAGE_COLORS[project.language] ?? "var(--text-tertiary)";

  const handleCardClick = () => {
    onOpen?.();
  };

  const handleCardKey = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!onOpen) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <article
      className={`project-card ${onOpen ? "project-card-clickable" : ""}`}
      onClick={onOpen ? handleCardClick : undefined}
      onKeyDown={onOpen ? handleCardKey : undefined}
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      aria-label={onOpen ? `Open details for ${project.name}` : undefined}
    >
      {project.thumbnail && (
        <div className="project-thumbnail">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.thumbnail} alt="" loading="lazy" />
        </div>
      )}

      <div className="project-card-body">
        <div className="project-card-header">
          <h4 className="project-title">{project.name}</h4>
          <span className={`status-chip status-${project.status}`}>
            {STATUS_LABELS[project.status]}
          </span>
        </div>

        <div
          className="language-badge"
          style={{ "--lang-color": langColor } as React.CSSProperties}
        >
          <span className="language-dot" aria-hidden />
          <span>{project.language}</span>
        </div>

        <p className="project-description">{project.description}</p>

        {project.tags.length > 0 && (
          <div className="project-tech">
            {project.tags.map((tag) => (
              <span key={tag} className="tech-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="project-links" onClick={stop}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              Demo ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
