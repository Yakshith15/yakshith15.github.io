"use client";

import { useEffect, useRef } from "react";
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
  completed: "Completed",
  archived: "Archived",
};

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!project) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeBtnRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  const langColor = LANGUAGE_COLORS[project.language] ?? "var(--text-tertiary)";

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="modal-header">
          <h2 id="project-modal-title" className="modal-title">
            {project.name}
          </h2>
          <div className="modal-meta">
            <span className={`status-chip status-${project.status}`}>
              {STATUS_LABELS[project.status]}
            </span>
            <span
              className="language-badge"
              style={{ "--lang-color": langColor } as React.CSSProperties}
            >
              <span className="language-dot" aria-hidden />
              <span>{project.language}</span>
            </span>
            <span className="modal-category">{project.category}</span>
          </div>
        </div>

        <p className="modal-description">
          {project.longDescription ?? project.description}
        </p>

        {project.highlights && project.highlights.length > 0 && (
          <div className="modal-section">
            <h3 className="modal-section-title">Highlights</h3>
            <ul className="modal-highlights">
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        )}

        {project.tags.length > 0 && (
          <div className="project-tech">
            {project.tags.map((tag) => (
              <span key={tag} className="tech-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="modal-actions">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-btn modal-btn-primary"
            >
              GitHub ↗
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-btn"
            >
              Live ↗
            </a>
          )}
          {project.designUrl && (
            <a
              href={project.designUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-btn"
            >
              Design ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
