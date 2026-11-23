import Image from "next/image";
import Link from "next/link";
import Row from "@/components/Row";
import {
  certifications,
  education,
  intro,
  links,
  projects,
  siteConfig,
  stack,
  work,
  type WorkPoint,
} from "@/lib/site-config";
import { formatDate, getAllPosts } from "@/lib/posts";

function Points({ points }: { points: WorkPoint[] }) {
  return (
    <div className="stack points">
      {points.map((point) => (
        <Row
          key={point.key}
          label={
            <>
              {point.key}
              {point.figure && <span className="figure">{point.figure}</span>}
            </>
          }
        >
          <p>{point.text}</p>
        </Row>
      ))}
    </div>
  );
}

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <section className="intro" aria-label="Introduction">
        <Image
          src="/images/profile.jpg"
          alt={siteConfig.author}
          width={256}
          height={256}
          className="portrait"
          draggable={false}
          priority
        />
        <div className="intro-text">
          <p className="lede">{intro}</p>
          <p className="meta intro-links">
            <a href={links.email}>Email</a>
            <a href={links.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={links.resume} target="_blank" rel="noopener noreferrer">
              Résumé (PDF)
            </a>
          </p>
        </div>
      </section>

      <section className="section" id="work" aria-labelledby="work-label">
        <div className="row">
          <h2 className="section-label" id="work-label">
            Work
          </h2>
          <div>
            <p className="employer">
              <a href={work.url} target="_blank" rel="noopener noreferrer">
                {work.employer}
              </a>
            </p>
            <p className="context">{work.context}</p>
          </div>
        </div>

        {work.roles.map((role) => (
          <div key={role.title} className="role">
            <Row label={role.dates}>
              <h3 className="role-title">{role.title}</h3>
              {role.note && <p className="context">{role.note}</p>}
            </Row>
            <Points points={role.points} />
          </div>
        ))}
      </section>

      <section className="section" id="projects" aria-labelledby="projects-label">
        <div className="row">
          <h2 className="section-label" id="projects-label">
            Projects
          </h2>
          <div className="stack">
            {projects.map((project) => (
              <article key={project.id} className="entry">
                <h3 className="entry-title">
                  <Link href={`/projects/#${project.id}`}>{project.name}</Link>
                </h3>
                <p className="entry-body">{project.summary}</p>
                <p className="meta">
                  {project.language} · {project.status}
                </p>
              </article>
            ))}
            <p className="more meta">
              <Link href="/projects/">How each one works →</Link>
            </p>
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="section" id="writing" aria-labelledby="writing-label">
          <div className="row">
            <h2 className="section-label" id="writing-label">
              Writing
            </h2>
            <div className="stack">
              {posts.map((post) => (
                <article key={post.slug} className="entry">
                  <h3 className="entry-title">
                    <Link href={`/writing/${post.slug}/`}>{post.title}</Link>
                  </h3>
                  {post.description && <p className="entry-body">{post.description}</p>}
                  <p className="meta">{formatDate(post.date)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section" id="background" aria-labelledby="background-label">
        <div className="row">
          <h2 className="section-label" id="background-label">
            Background
          </h2>
          <div>
            <p>{education.degree}</p>
            <p className="meta">
              {education.institution} · {education.dates} · {education.grade}
            </p>
          </div>
        </div>
        <div className="stack points">
          <Row label="Certified">
            <ul className="plain-list">
              {certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </Row>
          <Row label="Languages">
            <p>{stack.languages.join(", ")}</p>
          </Row>
          <Row label="Tools">
            <p>{stack.tools.join(", ")}</p>
          </Row>
        </div>
      </section>
    </>
  );
}
