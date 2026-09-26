import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages: `next build` writes the site to `out/`.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // Deploying to a project repo (e.g. github.com/you/portfolio) instead of
  // you.github.io? Set basePath to "/portfolio" and update `site.url`.
};

export default nextConfig;
