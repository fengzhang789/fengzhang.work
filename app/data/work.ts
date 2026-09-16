export type WorkItem = {
  id: string;
  name: string;
  /** One short line shown under the name. */
  sub: string;
  period: string;
  href?: string;
  /** Drop a file in /public/images and point at it, e.g. "/images/aws.jpg". */
  image?: string;
  alt?: string;
  /** "logo" contains the artwork on a plain plate; default crops it like a photo. */
  fit?: "photo" | "logo";
  /**
   * Ground colour behind a logo, matched to the artwork's own background so the
   * two blend seamlessly. Defaults to white. Set it when the logo already ships
   * its own background, and the artwork then bleeds to the plate edges.
   */
  plateBg?: string;
  /** Shrinks a "logo" fit further within its inset, e.g. 0.7 = 30% smaller. Defaults to 1. */
  logoScale?: number;
  /** A canvas-drawn animation to use instead of a static image. */
  art?: "db";
};

/** Most recent first. */
export const work: WorkItem[] = [
  {
    id: "ura",
    name: "Waterloo Systems & Networking",
    sub: "Undergraduate Research Assistant working on zero-copy networking, high performance memcached benchmarking, and kernel bypass with Prof. Martin Karsten",
    period: "Apr – Sep 2026",
    href: "/writing/is-the-future-of-databases-zero-copy",
    image: "/images/uwaterloo_logo.avif",
    alt: "University of Waterloo",
    fit: "logo",
  },
  {
    id: "aws",
    name: "Amazon Web Services",
    sub: "Software Engineer Intern on DynamoDB Global Tables team",
    period: "May – Dec 2025",
    href: "https://aws.amazon.com/dynamodb/",
    image: "/images/aws_logo.webp",
    alt: "Amazon Web Services",
    fit: "logo",
    plateBg: "#223040",
  },
  {
    id: "sqldb",
    name: "SQL Database",
    sub: "An embedded SQL database in C++ with multi-version concurrency control (MVCC), crash recovery via copy-on-write B+ trees, and a query parser and execution engine for a subset of SQL",
    period: "2025",
    href: "https://github.com/fengzhang789/sqldb",
    art: "db",
  },
  {
    id: "hack-the-north",
    name: "Hack the North",
    sub: "Frontend Organizer (2024) and Backend Organizer (2025) building the web platform that event attendees see at Canada’s largest hackathon",
    period: "Mar 2024 – Sep 2025",
    href: "https://2024.hackthenorth.com",
    image: "/images/hackthenorth_logo.png",
    alt: "Hack the North",
    fit: "logo",
    logoScale: 0.7,
  },
  {
    id: "ethglobal",
    name: "ETHGlobal",
    sub: "Software Engineer Intern",
    period: "Jan – Apr 2025",
    href: "https://ethglobal.com",
    image: "/images/ethglobal_logo.jpeg",
    alt: "ETHGlobal",
    fit: "logo",
  },
  {
    id: "habtech",
    name: "Habtech Communications",
    sub: "Software Developer Intern",
    period: "Apr – Aug 2024",
    href: "https://habtech.ca",
    image: "/images/habtech_logo.jpg",
    alt: "Habtech Communications",
    fit: "logo",
  },
  {
    id: "crowdfund",
    name: "CrowdFund",
    sub: "Automated AI workflows using AI agents to research markets and execute trades. Won 2nd out of 775 at CMU hackathon for the Story Protocol track",
    period: "2025",
    href: "https://github.com/fengzhang789/crowdfund",
    image: "/images/crowdfund_logo.png",
    alt: "CrowdFund — TartanHacks '25",
  },
];

export const contact = {
  github: "https://github.com/fengzhang789",
  linkedin: "https://linkedin.com/in/fengzhang12",
  email: "yunfengzhang789@gmail.com",
};
