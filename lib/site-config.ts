export const siteConfig = {
  title: "Yakshith Daggupati",
  description: "Personal website and blog of Yakshith Daggupati, Software Engineer",
  baseUrl: "https://example.com",
  author: "Yakshith Daggupati",
  currentLocation: "Hyderabad, India",
  theme: {
    toggleEnabled: false,
    defaultTheme: "dark" as "light" | "dark",
  },
};

export const navigation = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog/" },
];

export const introParagraphs = [
  "I'm Yakshith Daggupati, a Software Engineer I at [https://www.jpmorganchase.com]{JPMorgan Chase}.",
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
];

export const skills = {
  languages: ["Go", "Java", "Python", "JavaScript", "TypeScript", "C++"],
  technologies: ["AWS", "Docker", "Kubernetes", "gRPC", "PostgreSQL", "Redis"],
};

export const projects = [
  {
    name: "Distributed Key-Value Store",
    description:
      "Placeholder: a Raft-based distributed key-value store exploring consensus, leader election, and log replication across a cluster of nodes.",
    url: "https://github.com/Yakshith15",
    tags: ["Go", "Distributed Systems", "Raft", "Consensus"],
  },
  {
    name: "CI/CD Automation Pipeline",
    description:
      "Placeholder: a containerized CI/CD pipeline using Docker, Kubernetes, and GitHub Actions to automate build, test, and deploy workflows.",
    url: "https://github.com/Yakshith15",
    tags: ["DevOps", "Docker", "Kubernetes", "GitHub Actions"],
  },
  {
    name: "URL Shortener — System Design",
    description:
      "Placeholder: a scalable URL shortener service exploring system design tradeoffs around caching, sharding, and rate limiting with Redis and PostgreSQL.",
    url: "https://github.com/Yakshith15",
    tags: ["System Design", "Redis", "PostgreSQL", "Caching"],
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
