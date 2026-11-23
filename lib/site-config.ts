// Everything the site says about me lives here. resume/resume.tex is the
// canonical résumé; keep the two in step when either changes.

export const siteConfig = {
  title: "Yakshith Daggupati",
  description:
    "Software engineer in Hyderabad, working on API platform infrastructure. Notes on storage, consistency, and the failure cases nobody plans for.",
  baseUrl: "https://yakshith15.github.io",
  author: "Yakshith Daggupati",
  location: "Hyderabad, India",
  theme: {
    toggleEnabled: true,
    defaultTheme: "light" as "light" | "dark",
  },
};

export const links = {
  email: "mailto:daggupatiyakshithnaidu@gmail.com",
  github: "https://github.com/Yakshith15",
  linkedin: "https://www.linkedin.com/in/yakshithnaidu/",
  resume: "/resume.pdf",
};

export const intro =
  "I care about how large systems hold together: storage, consistency, and the failure cases nobody plans for. I tend to learn things by building them from scratch and writing down what surprised me.";

// `key` sits in the left gutter so the list can be scanned; `figure`, when a
// point has a number worth pulling out, sits under it. Figures must come
// straight from the sentence beside them.
export type WorkPoint = { key: string; figure?: string; text: string };

export type Role = {
  title: string;
  dates: string;
  note?: string;
  points: WorkPoint[];
};

// Three points per role, matching the order on the résumé.
export const work = {
  employer: "JPMorgan Chase",
  url: "https://www.jpmorganchase.com",
  context:
    "API Marketplace Platform. Teams publish APIs as Envoy-fronted proxies, other teams subscribe under quota. My team owns the system of record, its analytics, and search.",
  roles: [
    {
      title: "Software Engineer I",
      dates: "Jul 2025 – present",
      points: [
        {
          key: "Search",
          figure: "~40% relevance",
          text: "Built catalog search across ~4,000 production APIs, combining lexical (BM25) and semantic vector retrieval behind a per-query router. Relevance rose ~40% over the lexical-only baseline.",
        },
        {
          key: "Analytics",
          text: "Built the pipeline that joins design-time data (API metadata, versions, proxies, subscriptions) with runtime telemetry from Envoy logs, attributing every request to an API, version, and subscriber. The platform’s analytics dashboards run on it.",
        },
        {
          key: "Quotas",
          figure: "~60% lower p99",
          text: "Integrated gRPC into the Go service that enforces per-subscription quotas, replacing its REST interface: p99 latency down ~60%, throughput roughly doubled.",
        },
      ],
    },
    {
      title: "Software Engineer Intern",
      dates: "Jan 2025 – Jul 2025",
      note: "Joined the same platform, working on the developer-facing portal.",
      points: [
        {
          key: "Secrets",
          text: "Migrated critical secrets from Kubernetes Secrets, which are only base64-encoded, to AWS Secrets Manager for encryption at rest, IAM-scoped access, and audit logging.",
        },
        {
          key: "Portal",
          text: "Built frontend features for the portal, the surface teams use to publish APIs and manage subscriptions.",
        },
      ],
    },
  ] as Role[],
};

export type Project = {
  id: string;
  name: string;
  status: string;
  language: string;
  summary: string;
  description: string;
  highlights: string[];
  note?: string;
  repo?: string;
  writeup?: string;
};

// Add `repo` and `writeup` only when the link resolves.
export const projects: Project[] = [
  {
    id: "gfs",
    name: "Google File System",
    status: "In progress",
    language: "Go",
    summary:
      "The Google File System paper implemented end to end: master, chunkservers, and client, built from scratch to explore replication and fault tolerance.",
    description:
      "A hands-on reconstruction of the Google File System paper. The master coordinates chunk metadata and leases, chunkservers store 64MB chunks with configurable replication, and the client library handles chunk lookup and streaming reads/writes. Goal is to deeply understand consistency semantics, replica placement, and failure recovery.",
    highlights: [
      "Chunk-based storage with configurable replication factor",
      "Master election and heartbeat-driven chunkserver tracking",
      "Lease-based primary writes for consistency",
      "Simulated chunkserver crashes to exercise recovery paths",
    ],
  },
  {
    id: "mit-6824",
    name: "MIT 6.824 Distributed Systems Labs",
    status: "Labs 1 and 2",
    language: "Go",
    summary:
      "Implemented MapReduce and a linearizable key/value server from the ground up in Go, validated against the course test suite.",
    description:
      "Labs 1 and 2 of MIT 6.824. Lab 1 builds a MapReduce coordinator and worker pool that reassigns tasks when a worker dies mid-job. Lab 2 builds a key/value server that stays linearizable while clients retry over an unreliable network, which means detecting duplicate requests and applying each operation at most once.",
    highlights: [
      "MapReduce coordinator with task reassignment on worker failure",
      "Linearizable key/value server backed by Go RPC",
      "At-most-once semantics: duplicate client retries detected and never reapplied",
      "Validated against the full course test suite, including the unreliable-network cases",
    ],
    note: "The code stays private, since the course asks students not to publish solutions.",
  },
];

export const education = {
  degree: "B.E. in Computer Science Engineering (AI & ML)",
  institution: "Chaitanya Bharathi Institute of Technology",
  dates: "Dec 2021 – May 2025",
  grade: "9.4 CGPA",
};

export const certifications = [
  "Certified Kubernetes Application Developer (CKAD)",
  "AWS Certified Developer – Associate",
  "AWS Certified Cloud Practitioner",
];

export const stack = {
  languages: ["Go", "Java", "Python", "JavaScript", "TypeScript", "C++"],
  tools: [
    "AWS",
    "Kubernetes",
    "Docker",
    "gRPC",
    "OpenSearch",
    "OPA",
    "Spring Boot",
    "React",
    "PostgreSQL",
    "Redis",
    "Splunk",
  ],
};
