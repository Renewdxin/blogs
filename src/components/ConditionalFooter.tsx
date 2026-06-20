"use client";

import { usePathname } from "next/navigation";
import SiteFooter from "./SiteFooter";

// The home page is an exact recreation that ends at the Closing Plaque — no footer.
// Interior pages keep the standing footer.
export default function ConditionalFooter() {
  const path = usePathname();
  if (path === "/") return null;
  return <SiteFooter />;
}
