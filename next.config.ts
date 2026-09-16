import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Lets writing/ posts embed simple SVG diagrams/placeholders via next/image.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
