import { cookies } from "next/headers";

/**
 * Studio (admin) auth.
 * - Login compares a submitted password against ADMIN_PASSWORD.
 * - On success an httpOnly session cookie carries the API secret (NOTES_TOKEN).
 * - API writes accept either that cookie or an `Authorization: Bearer <NOTES_TOKEN>`.
 */

export const SESSION_COOKIE = "studio_session";

export function sessionValue(): string | undefined {
  return process.env.NOTES_TOKEN;
}

export function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  };
}

/** Constant-time-ish password check. */
export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  if (typeof input !== "string" || input.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= input.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

/** True when the current request carries a valid session cookie. */
export async function isLoggedIn(): Promise<boolean> {
  const secret = sessionValue();
  if (!secret) return false;
  const jar = await cookies();
  return jar.get(SESSION_COOKIE)?.value === secret;
}

/** Authorize an API write: valid session cookie OR bearer token. */
export async function isAuthorized(request: Request): Promise<boolean> {
  const secret = sessionValue();
  if (!secret) return false;
  const bearer = (request.headers.get("authorization") ?? "")
    .replace(/^Bearer\s+/i, "")
    .trim();
  if (bearer && bearer === secret) return true;
  return isLoggedIn();
}
