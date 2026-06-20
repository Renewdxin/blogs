import type { Metadata, Viewport } from "next";
import { Inter, Ibarra_Real_Nova, Martian_Mono } from "next/font/google";
import localFont from "next/font/local";
import "../styles/globals.css";
import SiteHeader from "../components/SiteHeader";
import ConditionalFooter from "../components/ConditionalFooter";
import { site } from "../lib/site";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const ibarra = Ibarra_Real_Nova({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibarra",
  display: "swap",
});

const martian = Martian_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-martian",
  display: "swap",
});

// Display serif — self-hosted from public/fonts (Fontshare's Stardom).
const stardom = localFont({
  src: "../../public/fonts/stardom-400.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-stardom",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "File Exhibition — C Ren",
    template: "%s — C REN",
  },
  description: site.description,
  openGraph: {
    type: "website",
    title: "File Exhibition — C Ren",
    description: site.description,
    url: site.url,
  },
};

export const viewport: Viewport = {
  themeColor: "#e9ddc7",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ibarra.variable} ${martian.variable} ${stardom.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
