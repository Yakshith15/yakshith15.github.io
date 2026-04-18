"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/lib/site-config";
import ProjectTabs from "@/components/projects/ProjectTabs";

export default function Projects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <motion.section
      className="projects-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3>Projects</h3>
      <ProjectTabs projects={featured} gridClassName="" />
      <div className="projects-view-all">
        <Link href="/projects/">View all projects →</Link>
      </div>
    </motion.section>
  );
}
