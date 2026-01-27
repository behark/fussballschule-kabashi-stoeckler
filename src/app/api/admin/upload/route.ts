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

    // Validate file size (max 4MB due to Vercel serverless function limit)
    const maxSize = 4 * 1024 * 1024; // 4MB (Vercel limit is 4.5MB)
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `Die Datei ist zu groß (max. ${Math.round(maxSize / 1024 / 1024)}MB). Bitte komprimieren Sie das Bild oder verwenden Sie ein kleineres Format.` },
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
    
    // Handle specific error cases
    if (error instanceof Error) {
      // Check for size-related errors
      if (error.message.includes("413") || error.message.includes("too large") || error.message.includes("PayloadTooLarge")) {
        return NextResponse.json(
          { error: "Die Datei ist zu groß (max. 4MB). Bitte komprimieren Sie das Bild." },
          { status: 413 }
        );
      }
      
      // Check for blob storage errors
      if (error.message.includes("blob") || error.message.includes("storage")) {
        return NextResponse.json(
          { error: "Fehler beim Speichern im Blob Storage. Bitte versuchen Sie es erneut." },
          { status: 500 }
        );
      }
    }
    
    const errorMessage = error instanceof Error ? error.message : "Unbekannter Fehler";
    return NextResponse.json(
      { error: `Fehler beim Hochladen der Datei: ${errorMessage}` },
      { status: 500 }
    );
  }
}
