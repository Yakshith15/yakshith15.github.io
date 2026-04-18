import type { Metadata } from "next";
import { projects } from "@/lib/site-config";
import ProjectTabs from "@/components/projects/ProjectTabs";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects spanning distributed systems, DevOps, and system design.",
};

export default function ProjectsPage() {
  return (
    <div className="projects-page">
      <h1>Projects</h1>
      <p>
        A collection of things I&apos;ve built or am currently building —
        spanning distributed systems, DevOps, and system design.
      </p>

      <ProjectTabs projects={projects} />
    </div>
  );
}
