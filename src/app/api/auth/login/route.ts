import { NextResponse } from "next/server";
import { checkPassword, sessionValue, SESSION_COOKIE, cookieOptions } from "../../../../lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const secret = sessionValue();
  if (!secret || !process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Login is not configured" }, { status: 503 });
  }

  let password = "";
  try {
    const data = await request.json();
    password = typeof data?.password === "string" ? data.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, secret, cookieOptions());
  return res;
}
