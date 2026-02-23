import { NextRequest, NextResponse } from "next/server";
import { getTokenFromCookie, verifyToken } from "@/lib/admin-auth";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

// Client upload handler - browser uploads directly to Blob storage
// This bypasses the 4.5MB serverless function body limit
export async function POST(request: NextRequest) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        // Verify admin authentication before allowing upload
        const token = getTokenFromCookie(request.headers.get("cookie"));
        if (!token) {
          throw new Error("Nicht autorisiert");
        }
        const payload = await verifyToken(token);
        if (!payload) {
          throw new Error("Nicht autorisiert");
        }

        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "image/svg+xml",
            "image/avif",
          ],
          maximumSizeInBytes: 10 * 1024 * 1024, // 10MB
          tokenPayload: JSON.stringify({ admin: true }),
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("Upload completed:", blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unbekannter Fehler";

    if (message === "Nicht autorisiert") {
      return NextResponse.json({ error: message }, { status: 401 });
    }

    return NextResponse.json(
      { error: `Upload fehlgeschlagen: ${message}` },
      { status: 400 }
    );
  }
}
