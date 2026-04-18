export const siteConfig = {
  title: "Yakshith Daggupati",
  description: "Personal website and blog of Yakshith Daggupati, Software Engineer",
  baseUrl: "https://example.com",
  author: "Yakshith Daggupati",
  currentLocation: "Hyderabad, India",
  theme: {
    toggleEnabled: true,
    defaultTheme: "dark" as "light" | "dark",
  },
};

export const navigation: Array<{ name: string; url: string; newTab?: boolean }> = [
  { name: "Home", url: "/" },
  { name: "Projects", url: "/projects/" },
  { name: "Blog", url: "/blog/" },
];

export const introParagraphs = [
  "I'm Yakshith Daggupati, a Software Engineer I at JPMorgan Chase.",
  "I'm interested in distributed systems, DevOps, system design, and databases — exploring how reliable, scalable software is built from the ground up.",
];

export const contactLinks = [
  {
    icon: "/icons/email.svg",
    text: "daggupatiyakshithnaidu@gmail.com",
    url: "mailto:daggupatiyakshithnaidu@gmail.com",
    newTab: false,
  },
  {
    icon: "/icons/github.svg",
    text: "Yakshith15",
    url: "https://github.com/Yakshith15",
    newTab: true,
  },
  {
    icon: "/icons/linkedin.svg",
    text: "yakshithnaidu",
    url: "https://www.linkedin.com/in/yakshithnaidu/",
    newTab: true,
  },
];

export const skills = {
  languages: ["Go", "Java", "Python", "JavaScript", "TypeScript", "C++"],
  technologies: ["AWS", "Docker", "Kubernetes", "gRPC", "PostgreSQL", "Redis"],
};

export type ProjectCategory =
  | "Distributed Systems"
  | "DevOps"
  | "System Design"
  | "Web";

export type ProjectStatus = "featured" | "in-progress" | "archived";

export type Project = {
  name: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  language: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  designUrl?: string;
  thumbnail?: string;
  longDescription?: string;
  highlights?: string[];
};

export const projectCategories = [
  "All",
  "Distributed Systems",
  "DevOps",
  "System Design",
] as const;

export type ProjectCategoryFilter = (typeof projectCategories)[number];

export const projects: Project[] = [
  {
    name: "Google File System (GFS)",
    description:
      "End-to-end implementation of the Google File System paper — master, chunkservers, and client built from scratch to explore chunk-based storage, replication, and fault tolerance.",
    category: "Distributed Systems",
    status: "in-progress",
    featured: true,
    language: "Go",
    tags: ["GFS", "Storage", "Replication", "Fault Tolerance"],
    githubUrl: "https://github.com/Yakshith15",
    demoUrl: "https://example.com/gfs-demo",
    designUrl: "https://example.com/gfs-design",
    longDescription:
      "A hands-on reconstruction of the Google File System paper. The master coordinates chunk metadata and leases, chunkservers store 64MB chunks with configurable replication, and the client library handles chunk lookup and streaming reads/writes. Goal is to deeply understand consistency semantics, replica placement, and failure recovery.",
    highlights: [
      "Chunk-based storage with configurable replication factor",
      "Master election and heartbeat-driven chunkserver tracking",
      "Lease-based primary writes for consistency",
      "Simulated chunkserver crashes to exercise recovery paths",
    ],
  },
  {
    name: "CI/CD Automation Pipeline",
    description:
      "Containerized CI/CD pipeline using Docker, Kubernetes, and GitHub Actions to automate build, test, and deploy workflows for service repositories.",
    category: "DevOps",
    status: "in-progress",
    featured: true,
    language: "YAML",
    tags: ["Docker", "Kubernetes", "GitHub Actions"],
    githubUrl: "https://github.com/Yakshith15",
    demoUrl: "https://example.com/cicd-demo",
    designUrl: "https://example.com/cicd-design",
    longDescription:
      "An opinionated CI/CD template for service repos: GitHub Actions workflows build multi-arch Docker images, run unit + integration tests inside ephemeral containers, push to a registry, and roll out to a Kubernetes cluster via Helm. Aimed at replacing per-project bespoke pipelines with a single reusable workflow.",
    highlights: [
      "Reusable workflow consumed via `uses:` from any repo",
      "Matrix-built multi-arch images (amd64, arm64)",
      "Integration tests spun up via Docker Compose in-runner",
      "Helm-based deploy with blue/green rollout",
    ],
  },
  {
    name: "URL Shortener — System Design",
    description:
      "Scalable URL shortener exploring system design tradeoffs around caching, sharding, and rate limiting with Redis and PostgreSQL.",
    category: "System Design",
    status: "in-progress",
    featured: true,
    language: "Go",
    tags: ["Redis", "PostgreSQL", "Caching", "Rate Limiting"],
    githubUrl: "https://github.com/Yakshith15",
    demoUrl: "https://example.com/url-shortener-demo",
    designUrl: "https://example.com/url-shortener-design",
    longDescription:
      "A URL shortener built as a playground for system design tradeoffs. PostgreSQL stores the canonical short→long mapping (sharded by hash prefix), Redis fronts hot keys for sub-ms reads, and a token-bucket rate limiter guards against abuse. Measurable goal: p99 redirect latency under 10ms at 10k RPS on a modest box.",
    highlights: [
      "Base62-encoded short IDs derived from Snowflake-style sequence",
      "Read-through Redis cache with TTL jitter to avoid stampedes",
      "Hash-prefix sharding across Postgres shards",
      "Per-IP and per-key token-bucket rate limiting",
    ],
  },
];

export const education = [
  {
    degree: "Bachelor of Engineering",
    field: "Computer Science Engineering (AI & ML)",
    institution: "Chaitanya Bharathi Institute of Technology",
    year: "Dec 2021 – May 2025",
    gpa: "9.4 CGPA",
  },
];

export const companies = [
  {
    name: "JPMorgan Chase",
    url: "https://www.jpmorganchase.com",
    positions: [
      {
        title: "Software Engineer Intern",
        duration: "Jan 2025 – Jul 2025",
        current: false,
        points: [
          "Contributed to an internal tool, API Marketplace Portal, on the frontend.",
        ],
      },
    ],
  },
];

export const footerLinks = [
  { text: "GitHub", url: "https://github.com/Yakshith15" },
  { text: "RSS", url: "/rss.xml" },
];
