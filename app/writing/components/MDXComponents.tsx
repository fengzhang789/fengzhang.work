import Image from "next/image";
import type { AnchorHTMLAttributes } from "react";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

/** Use inside a post: <Figure src="/images/writing/x.jpg" alt="..." caption="..." /> */
export function Figure({
  src,
  alt,
  caption,
  width = 1600,
  height = 1000,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure>
      <div className="post-figure-frame">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, 672px"
        />
      </div>
      {caption ? <figcaption className="post-figcaption">{caption}</figcaption> : null}
    </figure>
  );
}

/** Plain markdown ![alt](src) images route through here with the same framing as <Figure>. */
function MarkdownImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src) return null;
  return (
    <figure>
      <div className="post-figure-frame">
        <Image src={src} alt={alt ?? ""} width={1600} height={1000} sizes="(max-width: 768px) 100vw, 672px" />
      </div>
      {alt ? <figcaption className="post-figcaption">{alt}</figcaption> : null}
    </figure>
  );
}

/** External links open in a new tab; internal links behave normally. */
function MarkdownLink({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = /^https?:\/\//.test(href ?? "");
  return (
    <a href={href} {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...props}>
      {children}
    </a>
  );
}

export const mdxComponents: MDXRemoteProps["components"] = {
  Figure,
  img: MarkdownImage,
  a: MarkdownLink,
};
