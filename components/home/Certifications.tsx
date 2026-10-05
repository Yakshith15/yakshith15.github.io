"use client";

import { motion } from "framer-motion";
import { certifications } from "@/lib/site-config";

export default function Certifications() {
  return (
    <motion.section
      className="education-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3>Certifications</h3>
      <div className="education-list">
        {certifications.map((cert) => (
          <div key={cert.name} className="education-item">
            <div className="education-header">
              <div className="education-main">
                <h4 className="institution">{cert.name}</h4>
                <p className="degree">{cert.issuer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
