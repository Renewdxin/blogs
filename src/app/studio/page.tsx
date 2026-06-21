import type { Metadata } from "next";
import { isLoggedIn } from "../../lib/auth";
import { getDbNotes } from "../../lib/db";
import LoginForm from "../../components/studio/LoginForm";
import Studio from "../../components/studio/Studio";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default async function StudioPage() {
  const authed = await isLoggedIn();
  if (!authed) return <LoginForm />;
  const notes = await getDbNotes();
  return <Studio initialNotes={notes} />;
}
