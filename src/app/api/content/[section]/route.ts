import { NextRequest, NextResponse } from "next/server";
import { getRedisData } from "@/lib/redis";
import { defaults } from "@/lib/content";

export async function GET(
  request: NextRequest,
  { params }: { params: { section: string } }
) {
  const { section } = params;
  const key = `content:${section}`;

  try {
    const data = await getRedisData(key);
    // Return Redis data if available, otherwise return default
    return NextResponse.json({ 
      data: data || (defaults as any)[section as keyof typeof defaults] || null 
    });
  } catch (error) {
    console.error(`Error fetching content for ${section}:`, error);
    // Return default on error
    return NextResponse.json({ 
      data: (defaults as any)[section as keyof typeof defaults] || null 
    });
  }
}
