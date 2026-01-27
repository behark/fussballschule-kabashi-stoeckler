import { NextRequest, NextResponse } from "next/server";
import { getTokenFromCookie, verifyToken } from "@/lib/admin-auth";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  // Verify authentication
  const token = getTokenFromCookie(request.headers.get("cookie"));
  if (!token) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Keine Datei hochgeladen" },
        { status: 400 }
      );
    }

    // Validate file type more strictly
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
      "image/avif",
    ];

    if (!allowedTypes.includes(file.type) && !file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Nicht unterstütztes Bildformat. Bitte verwenden Sie JPEG, PNG, GIF, WebP, AVIF oder SVG." },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB for better quality images)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `Die Datei ist zu groß (max. ${Math.round(maxSize / 1024 / 1024)}MB)` },
        { status: 400 }
      );
    }

    // Generate unique filename to avoid conflicts
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueFileName = `${timestamp}-${sanitizedName}`;

    // Upload to Vercel Blob
    const blob = await put(uniqueFileName, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      contentType: file.type, // Preserve original content type
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Upload error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unbekannter Fehler";
    return NextResponse.json(
      { error: `Fehler beim Hochladen der Datei: ${errorMessage}` },
      { status: 500 }
    );
  }
}
