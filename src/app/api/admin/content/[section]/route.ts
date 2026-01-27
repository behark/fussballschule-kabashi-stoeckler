import { NextRequest, NextResponse } from "next/server";
import { getTokenFromCookie, verifyToken } from "@/lib/admin-auth";
import { getRedisData, setRedisData } from "@/lib/redis";

export async function GET(
  request: NextRequest,
  { params }: { params: { section: string } }
) {
  // Verify authentication
  const token = getTokenFromCookie(request.headers.get("cookie"));
  if (!token) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const { section } = params;
  const key = `content:${section}`;

  try {
    const data = await getRedisData(key);
    return NextResponse.json({ data });
  } catch (error) {
    console.error(`Error fetching content for ${section}:`, error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Inhalte" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { section: string } }
) {
  // Verify authentication
  const token = getTokenFromCookie(request.headers.get("cookie"));
  if (!token) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const { section } = params;
  const key = `content:${section}`;

  try {
    const body = await request.json();
    const success = await setRedisData(key, body.data);

    if (!success) {
      return NextResponse.json(
        { error: "Fehler beim Speichern der Inhalte" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error saving content for ${section}:`, error);
    return NextResponse.json(
      { error: "Fehler beim Speichern der Inhalte" },
      { status: 500 }
    );
  }
}
