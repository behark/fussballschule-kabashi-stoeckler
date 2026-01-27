import { Redis } from "@upstash/redis";

// Initialize Redis client
export const redis = new Redis({
  url: process.env.KV_REST_API_URL || "",
  token: process.env.KV_REST_API_TOKEN || "",
});

// Helper to safely get data from Redis
export async function getRedisData<T>(key: string): Promise<T | null> {
  try {
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      return null;
    }
    const data = await redis.get<T>(key);
    return data;
  } catch (error) {
    console.error(`Error fetching Redis key ${key}:`, error);
    return null;
  }
}

// Helper to safely set data in Redis
export async function setRedisData<T>(key: string, value: T): Promise<boolean> {
  try {
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      return false;
    }
    await redis.set(key, value);
    return true;
  } catch (error) {
    console.error(`Error setting Redis key ${key}:`, error);
    return false;
  }
}
