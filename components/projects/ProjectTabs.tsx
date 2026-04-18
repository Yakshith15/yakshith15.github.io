"use client";

import { useMemo, useRef, useState } from "react";
import {
  projectCategories,
  type Project,
  type ProjectCategoryFilter,
} from "@/lib/site-config";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

interface Props {
  projects: Project[];
  showTabs?: boolean;
  gridClassName?: string;
}

export default function ProjectTabs({
  projects,
  showTabs = true,
  gridClassName = "projects-grid-wide",
}: Props) {
  const [selected, setSelected] = useState<ProjectCategoryFilter>("All");
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const visibleCategories = useMemo(() => {
    const present = new Set(projects.map((p) => p.category));
    return projectCategories.filter((c) => c === "All" || present.has(c));
  }, [projects]);

  const filtered = useMemo(
    () =>
      selected === "All"
        ? projects
        : projects.filter((p) => p.category === selected),
    [selected, projects]
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const delta = e.key === "ArrowRight" ? 1 : -1;
    const next = (idx + delta + visibleCategories.length) % visibleCategories.length;
    const nextCategory = visibleCategories[next];
    setSelected(nextCategory);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      {showTabs && (
        <div className="project-tabs" role="tablist" aria-label="Project categories">
          {visibleCategories.map((cat, idx) => {
            const isActive = cat === selected;
            return (
              <button
                key={cat}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                className="project-tab"
                onClick={() => setSelected(cat)}
                onKeyDown={(e) => onKeyDown(e, idx)}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="project-empty">No projects in this category yet.</p>
      ) : (
        <div className={`projects-grid ${gridClassName}`}>
          {filtered.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              onOpen={() => setOpenProject(project)}
            />
          ))}
        </div>
      )}

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </>
  );
}
