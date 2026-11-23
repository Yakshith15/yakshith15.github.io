import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import {
  certifications,
  education,
  intro,
  links,
  projects,
  siteConfig,
  stack,
  work,
} from "@/lib/site-config";
import { formatDate, getAllPosts } from "@/lib/posts";
import { resumeHref } from "@/lib/resume";

// Renders **marked** spans in a work point as <strong>.
function Emphasis({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
    </>
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
            <a href={resumeHref()} target="_blank" rel="noopener noreferrer">
              Résumé (PDF)
            </a>
          </p>
        </div>
      </section>

      <Section id="work" title="Work">
        <p className="employer">
          <a href={work.url} target="_blank" rel="noopener noreferrer">
            {work.employer}
          </a>
        </p>
        {work.roles.map((role) => (
          <div key={role.title} className="role">
            <h3 className="role-head line">
              <span>{role.title}</span>
              <span className="meta">{role.dates}</span>
            </h3>
            <ul className="work-list">
              {role.points.map((point) => (
                <li key={point}>
                  <Emphasis text={point} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section id="projects" title="Projects">
        <div className="entries">
          {projects.map((project) => (
            <article key={project.id}>
              <h3 className="entry-head line">
                <Link href={`/projects/#${project.id}`}>{project.name}</Link>
                <span className="meta">
                  {project.language} · {project.status}
                </span>
              </h3>
              <p className="entry-body">{project.summary}</p>
            </article>
          ))}
        </div>
        <p className="more meta">
          <Link href="/projects/">How each one works →</Link>
        </p>
      </Section>

      {posts.length > 0 && (
        <Section id="writing" title="Writing">
          <div className="entries">
            {posts.map((post) => (
              <article key={post.slug}>
                <h3 className="entry-head line">
                  <Link href={`/writing/${post.slug}/`}>{post.title}</Link>
                  <time className="meta" dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                </h3>
                {post.description && <p className="entry-body">{post.description}</p>}
              </article>
            ))}
          </div>
        </Section>
      )}

      <Section id="background" title="Background">
        <dl className="facts">
          <div>
            <dt className="label">Education</dt>
            <dd>
              {education.degree}
              <br />
              <span className="muted">
                {education.institution}, {education.dates}, {education.grade}
              </span>
            </dd>
          </div>
          <div>
            <dt className="label">Certifications</dt>
            <dd>
              <ul className="plain-list">
                {certifications.map((cert) => (
                  <li key={cert}>{cert}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="label">Languages</dt>
            <dd>{stack.languages.join(", ")}</dd>
          </div>
          <div>
            <dt className="label">Tools</dt>
            <dd>{stack.tools.join(", ")}</dd>
          </div>
        </dl>
      </Section>
    </>
  );
}
