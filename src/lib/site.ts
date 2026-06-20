/**
 * Site-wide configuration. Edit placeholders (marked TODO) before launch.
 */
export const site = {
  brand: "C REN / ENGINEERING SYSTEM",
  brandShort: "C REN",
  author: "C Ren",
  role: "Engineering System",
  tagline: "Architecting robust backend systems and orchestrating AI agents.",
  description:
    "A high-availability, extensible software / hardware / AI solution for teams that need resilient infrastructure, deployable intelligence, and full-stack engineering momentum without narrative overhead.",
  // TODO: replace with your real address before launch.
  email: "hello@example.com",
  url: "https://example.com",
  github: "https://github.com/Renewdxin",
};

export const nav = [
  { label: "INDEX", href: "/" },
  { label: "WORKS", href: "/works" },
  { label: "BLOG", href: "/blog" },
  { label: "NOTES", href: "/notes" },
  { label: "CONTACT", href: "/contact" },
] as const;

export const socials = [
  // TODO: replace with live links before launch.
  { label: "GitHub", href: "https://github.com/Renewdxin" },
  { label: "Email", href: "mailto:hello@example.com" },
  { label: "Résumé", href: "/resume.pdf" },
] as const;
