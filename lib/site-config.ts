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
  { name: "Resume", url: "/resume/" },
];

export const introParagraphs = [
  "I'm Yakshith, a software engineer based in Hyderabad, India.",
  "I care about how large systems hold together: storage, consistency, and the failure cases nobody plans for. I tend to learn things by building them from scratch and writing down what surprised me.",
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

export type ProjectStatus = "featured" | "in-progress" | "completed" | "archived";

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
    name: "MIT 6.824 Distributed Systems Labs",
    description:
      "Implemented MapReduce and Raft from the ground up in Go, validated against the course test suite.",
    category: "Distributed Systems",
    status: "completed",
    featured: false,
    language: "Go",
    tags: ["Raft", "MapReduce", "Consensus", "Replication"],
    longDescription:
      "Labs 1 and 2 of MIT 6.824. Lab 1 builds a MapReduce coordinator and worker pool that reassigns tasks when a worker dies mid-job. Lab 2 builds Raft directly from the paper: leader election, log replication, state that survives restarts, and log compaction through snapshots. The code stays private, since the course asks students not to publish solutions.",
    highlights: [
      "MapReduce coordinator with task reassignment on worker failure",
      "Raft leader election and log replication under partition and message loss",
      "Persistent state across crashes, plus log compaction via snapshots",
      "Validated against the full course test suite, including the unreliable-network cases",
    ],
  },
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
        context:
          "API Marketplace Platform: the internal marketplace where teams across the bank publish their APIs as Envoy-fronted proxies and other teams subscribe to them under quota. It carries roughly 4,000 APIs, 40,000 proxies, and 100,000 subscriptions in production. My team owns the system of record for every API on it, the analytics built on that, and search.",
        points: [
          "Built catalog search across ~4,000 production APIs, combining lexical (BM25) and semantic vector retrieval behind a query router that picks the right strategy per query — lifted relevance by ~40% over the lexical-only baseline, so teams can find the API they need instead of asking around for it.",
          "Built the pipeline that publishes design-time data — API metadata, versions, proxy definitions, subscriptions — into the datalake and joins it against runtime telemetry from Envoy access logs. Raw traffic logs only say a request happened; the join is what attributes it to an API, version, and subscriber across ~100,000 subscriptions, and it’s what the platform’s analytics and leadership dashboards run on.",
          "Integrated gRPC into the Go rate-limiting service that enforces per-subscription quotas, replacing its REST interface — cut p99 latency by ~60% and roughly doubled throughput under peak load.",
          "Work across the stack on the control plane — portal frontend, backend services, and the infrastructure they run on.",
        ],
      },
      {
        title: "Software Engineer Intern",
        duration: "Jan 2025 – Jul 2025",
        current: false,
        context: "Joined the same platform, working on the developer-facing portal.",
        points: [
          "Migrated critical secrets from Kubernetes Secrets — base64-encoded and effectively readable by anyone with cluster access — to AWS Secrets Manager for encryption at rest, IAM-scoped access, and audit logging.",
          "Built frontend features for the portal, the surface teams use to publish APIs and manage subscriptions.",
        ],
      },
    ],
  },
];

export const footerLinks = [
  { text: "GitHub", url: "https://github.com/Yakshith15" },
];
