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
};

/** Most recent first. */
export const work: WorkItem[] = [
  {
    id: "ura",
    name: "Waterloo Systems & Networking",
    sub: "Undergraduate Research Assistant on zero-copy networking, with Prof. Martin Karsten",
    period: "Apr – Sep 2026",
    href: "https://cs.uwaterloo.ca/~mkarsten/",
    image: "/images/uwaterloo_logo.avif",
    alt: "University of Waterloo",
    fit: "logo",
  },
  {
    id: "aws",
    name: "Amazon Web Services",
    sub: "Software Engineer Intern on DynamoDB storage and replication",
    period: "May – Dec 2025",
    href: "https://aws.amazon.com/dynamodb/",
    image: "/images/aws_logo.webp",
    alt: "Amazon Web Services",
    fit: "logo",
    plateBg: "#223040",
  },
  {
    id: "hack-the-north",
    name: "Hack the North",
    sub: "Frontend Organizer (2024) and Backend Organizer (2025) building the web platform that all event attendees see at Canada’s largest hackathon",
    period: "Mar 2024 – Sep 2025",
    href: "https://hackthenorth.com",
  },
  {
    id: "ethglobal",
    name: "ETHGlobal",
    sub: "Software Engineer Intern on video infrastructure and search",
    period: "Jan – Apr 2025",
    href: "https://ethglobal.com",
  },
  {
    id: "habtech",
    name: "Habtech Communications",
    sub: "Software Developer Intern building internal tools and CI/CD",
    period: "Apr – Aug 2024",
    href: "https://habtech.ca",
  },
  {
    id: "crowdfund",
    name: "CrowdFund",
    sub: "AI trading workflows that placed 2nd of 775 at a CMU hackathon",
    period: "2025",
  },
];

export const contact = {
  github: "https://github.com/fengzhang789",
  linkedin: "https://linkedin.com/in/fengzhang12",
  email: "yunfengzhang789@gmail.com",
};
