import Link from "next/link";
import WorkTile from "./components/WorkTile";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./components/Icons";
import { work, contact } from "./data/work";

export default function Home() {
  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-5 sm:px-8">
      <main className="flex-1">
        <header className="mt-14 grid grid-cols-1 items-start gap-10 sm:mt-20 sm:grid-cols-2 sm:gap-4">
          <div>
            <h1 className="wordmark">Feng Zhang</h1>
            <Link href="/writing" className="back-link mt-3 inline-block">
              Writing →
            </Link>
          </div>

          <div>
            <p className="lede">
              Software Engineer studying{" "}
              <a
                className="lede-em"
                href="https://cs.uwaterloo.ca"
                target="_blank"
                rel="noreferrer"
              >
                CS @ University of Waterloo
              </a>
              . Interested in working on distributed systems, databases, kernels, and
              networking.
            </p>
          </div>
        </header>

        <section aria-label="Work and projects" className="mt-16 grid grid-cols-1 gap-x-5 gap-y-12 md:grid-cols-2">
          {work.map((item) => (
            <WorkTile key={item.id} item={item} />
          ))}
        </section>
      </main>

      <footer className="mt-24 flex flex-col gap-4 border-t border-white/[0.06] py-8 text-[0.9375rem] sm:flex-row sm:items-center sm:justify-between">
        <p className="muted">Feng Zhang</p>
        <nav className="flex items-center gap-5">
          <a
            className="contact-link"
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <GitHubIcon className="h-[1.15rem] w-[1.15rem]" />
          </a>
          <a
            className="contact-link"
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <LinkedInIcon className="h-[1.15rem] w-[1.15rem]" />
          </a>
          <a
            className="contact-link"
            href={`mailto:${contact.email}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`Email ${contact.email}`}
            title={contact.email}
          >
            <MailIcon className="h-[1.25rem] w-[1.25rem]" />
          </a>
        </nav>
      </footer>
    </div>
  );
}
