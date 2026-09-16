import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, formatPostDate } from "./lib/posts";

export const metadata: Metadata = {
  title: "Writing — Feng Zhang",
  description: "Notes on distributed systems, databases, and things I'm building.",
};

export default function WritingIndex() {
  const posts = getAllPosts();

  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-5 sm:px-8">
      <main className="flex-1">
        <header className="mt-14 flex items-start justify-between gap-6 sm:mt-20">
          <div>
            <Link href="/" className="wordmark">
              Feng Zhang
            </Link>
          </div>
          <Link href="/" className="back-link mt-2">
            ← Home
          </Link>
        </header>

        <h1 className="wordmark mt-16 text-[1.9rem] sm:mt-20">Writing</h1>

        <section aria-label="Posts" className="mt-10 flex flex-col">
          {posts.length === 0 ? (
            <p className="muted">Nothing published yet — check back soon.</p>
          ) : (
            posts.map((post) => (
              <Link
                key={post.slug}
                href={`/writing/${post.slug}`}
                className="post-row group flex flex-col gap-1 border-t border-white/[0.06] py-6 focus:outline-none sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <div>
                  <p className="post-row-title">{post.frontmatter.title}</p>
                  <p className="post-row-dek mt-1.5">{post.frontmatter.dek}</p>
                </div>
                <p className="post-row-date">{formatPostDate(post.frontmatter.date)}</p>
              </Link>
            ))
          )}
        </section>
      </main>

      <footer className="mt-24 flex flex-col gap-4 border-t border-white/[0.06] py-8 text-[0.9375rem] sm:flex-row sm:items-center sm:justify-between">
        <p className="muted">Feng Zhang</p>
      </footer>
    </div>
  );
}
