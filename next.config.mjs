/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server runtime (not static export): the /notes feed and its API read/write
  // Neon Postgres at request time, so new notes appear instantly with no rebuild.
  // Marketing pages (home, works, blog, about, contact) are still statically
  // prerendered at build. Deploy to a Node host: Vercel (recommended) or Railway.
  reactStrictMode: true,
};

export default nextConfig;
