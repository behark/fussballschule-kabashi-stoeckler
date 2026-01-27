import { NextRequest, NextResponse } from "next/server";
import { getTokenFromCookie, verifyToken } from "@/lib/admin-auth";
import { getBackups, restoreFromBackup } from "@/lib/redis";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
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

  const { section } = await params;
  const key = `content:${section}`;

  try {
    const backups = await getBackups(key);
    return NextResponse.json({ backups });
  } catch (error) {
    console.error(`Error fetching backups for ${section}:`, error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Backups" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
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

  const { section } = await params;
  const key = `content:${section}`;

  try {
    const body = await request.json();
    const { timestamp } = body;

    if (!timestamp) {
      return NextResponse.json(
        { error: "Timestamp ist erforderlich" },
        { status: 400 }
      );
    }

    const success = await restoreFromBackup(key, timestamp);
    if (!success) {
      return NextResponse.json(
        { error: "Backup nicht gefunden oder Wiederherstellung fehlgeschlagen" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error restoring backup for ${section}:`, error);
    return NextResponse.json(
      { error: "Fehler beim Wiederherstellen des Backups" },
      { status: 500 }
    );
  }
}
