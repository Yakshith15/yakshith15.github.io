export const siteConfig = {
  title: "Yakshith Daggupati",
  description: "Personal website and blog of Yakshith Daggupati, Software Engineer",
  baseUrl: "https://yakshith15.github.io",
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
  { name: "Vault", url: "/vault/" },
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

// TODO: Replace with real shipped projects. Each entry should include a working
// GitHub repo (githubUrl), and ideally a measured result (latency, throughput,
// correctness benchmark) defensible in an interview. Add `demoUrl` / `designUrl`
// only when the link actually resolves.
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
    longDescription:
      "A hands-on reconstruction of the Google File System paper. The master coordinates chunk metadata and leases, chunkservers store 64MB chunks with configurable replication, and the client library handles chunk lookup and streaming reads/writes. Goal is to deeply understand consistency semantics, replica placement, and failure recovery.",
    highlights: [
      "Chunk-based storage with configurable replication factor",
      "Master election and heartbeat-driven chunkserver tracking",
      "Lease-based primary writes for consistency",
      "Simulated chunkserver crashes to exercise recovery paths",
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
        title: "Software Engineer I",
        duration: "Jul 2025 – Present",
        current: true,
        points: [
          "Built a hybrid search system combining lexical (BM25) and semantic vector retrieval, with a query router that picks the right strategy per query — lifted result relevance by ~40% over the lexical-only baseline.",
          "Owned an ETL pipeline feeding a datalake — extracting from multiple upstream sources, transforming into the schema downstream needed, and powering dashboards that gave leadership clear visibility into project health and KPIs.",
          "Integrated gRPC into a Go-based rate-limiting service, replacing the REST interface — cut p99 latency by ~60% and roughly 2× throughput under peak load.",
        ],
      },
      {
        title: "Software Engineer Intern",
        duration: "Jan 2025 – Jul 2025",
        current: false,
        points: [
          "Contributed to an internal tool, API Marketplace Portal, on the frontend.",
          "Migrated critical secrets from Kubernetes Secrets (base64-encoded, effectively readable by anyone with cluster access) to AWS Secrets Manager for proper encryption at rest, IAM-scoped access, and audit logging.",
        ],
      },
    ],
  },
];

export const footerLinks = [
  { text: "GitHub", url: "https://github.com/Yakshith15" },
];
