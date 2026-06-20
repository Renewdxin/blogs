/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static output — `next build` emits a static `out/` directory that
  // deploys as-is to Cloudflare Pages, Railway (static), Netlify, etc.
  output: "export",
  trailingSlash: true,
  images: {
    // Required for static export (no server-side image optimization).
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
