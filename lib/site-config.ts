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

// Each point is one sentence or two. Wrap the result worth catching in
// **double asterisks** and it renders bold. Keep the wording in step with
// resume/resume.tex.
export type Role = {
  title: string;
  dates: string;
  points: string[];
};

export const work = {
  employer: "JPMorgan Chase",
  url: "https://www.jpmorganchase.com",
  roles: [
    {
      title: "Software Engineer I",
      dates: "Jul 2025 – present",
      points: [
        "Built catalog search across ~4,000 production APIs, combining lexical (BM25) and semantic vector retrieval behind a per-query router. Relevance rose **~40%** over the lexical-only baseline.",
        "Scaled the analytics pipeline that keeps each API’s latest state in OpenSearch, enriched with its versions, proxies, and subscriptions: from 15K events in 6 hours to **300K in under 90 minutes, about 80x the throughput**. No longer saving the full API record on every change also cut index storage by **45%**.",
        "Integrated gRPC into the global rate limiting service that enforces per-subscription quotas, replacing its REST interface: p99 latency down **~60%**, throughput **roughly doubled**.",
      ],
    },
    {
      title: "Software Engineer Intern",
      dates: "Jan 2025 – Jul 2025",
      points: [
        "Migrated critical secrets from Kubernetes Secrets, which are only base64-encoded, to AWS Secrets Manager for encryption at rest, IAM-scoped access, and audit logging.",
        "Built frontend features for the portal, the surface teams use to publish APIs and manage subscriptions.",
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
    id: "moverr",
    name: "Moverr",
    status: "2026",
    language: "Go",
    summary:
      "A ride-hailing location service in Go: it takes driver GPS pings over WebSocket, stores them in Postgres, and answers nearby-driver queries from a Redis geo index.",
    description:
      "Moverr is the location service behind a ride-hailing app, the kind Uber or Ola runs. Drivers stream GPS pings over WebSocket or HTTP, the pings persist to Postgres with PostGIS, and a Redis geo set, kept in step by an async dual-write, answers nearby-driver queries fast enough for a matching loop. A Go fleet simulator drives it with thousands of drivers.",
    highlights: [
      "Load-tested at 2,000 simulated drivers: 80,000 pings stored in two minutes with zero errors and a p99 insert latency of 13.7 ms, after sizing the connection pool from Little's Law",
      "Nearby-driver lookups from Redis at p99 3.4 ms, against 103.5 ms for the same query on PostGIS, in a local benchmark at that fleet size",
      "Stale drivers evicted with TTL keys and a background sweeper, so a nearby query stays a single GEOSEARCH; the trade-off is written up as a design record",
      "Fleet simulator with pluggable sinks: stdout, file, HTTP, and WebSocket with one persistent connection per driver",
    ],
    note: "The repository is not public yet.",
  },
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
      "Next: replace the single master with a Raft-replicated master group, so the cluster keeps serving through a master failure",
    ],
    repo: "https://github.com/Yakshith15/GFS",
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
