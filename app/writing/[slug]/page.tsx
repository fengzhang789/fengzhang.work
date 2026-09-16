import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug, formatPostDate } from "../lib/posts";
import { mdxComponents } from "../components/MDXComponents";

export function generateStaticParams() {
  return getAllPosts({ includeDrafts: true }).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.frontmatter.title} — Feng Zhang`,
    description: post.frontmatter.dek,
  };
}

export default async function WritingPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || (post.frontmatter.draft && process.env.NODE_ENV === "production")) {
    notFound();
  }

  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-5 sm:px-8">
      <main className="flex-1">
        <header className="mt-14 flex items-start justify-between gap-6 sm:mt-20">
          <div>
            <Link href="/" className="wordmark">
              Feng Zhang
            </Link>
          </div>
          <Link href="/writing" className="back-link mt-2">
            ← Writing
          </Link>
        </header>

        <article className="mx-auto mt-16 max-w-[42rem] sm:mt-20">
          <p className="post-meta">
            {formatPostDate(post.frontmatter.date)}
            <span className="post-meta-dot"> · </span>
            {post.readingMinutes} min read
          </p>
          <h1 className="post-title mt-3">{post.frontmatter.title}</h1>
          <p className="post-dek mt-4">{post.frontmatter.dek}</p>

          <div className="post-body mt-12">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>
        </article>
      </main>

      <footer className="mx-auto mt-24 flex w-full max-w-[42rem] flex-col gap-4 border-t border-white/[0.06] py-8 text-[0.9375rem] sm:flex-row sm:items-center sm:justify-between">
        <p className="muted">Feng Zhang</p>
        <Link href="/writing" className="back-link">
          More writing →
        </Link>
      </footer>
    </div>
  );
}
