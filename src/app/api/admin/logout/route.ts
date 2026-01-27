import { NextResponse } from "next/server";
import { createLogoutCookie } from "@/lib/admin-auth";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.headers.set("Set-Cookie", createLogoutCookie());
  return response;
}
