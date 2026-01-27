import { Redis as UpstashRedis } from "@upstash/redis";
import { createClient, RedisClientType } from "redis";

// Initialize Redis client - supports both standard Redis and Upstash Redis
let redisClient: RedisClientType | null = null;
let upstashRedis: UpstashRedis | null = null;
let isConnecting = false;

// Check if we're using standard Redis (connection string) or Upstash (REST API)
const redisUrl = process.env.REDIS_URL;
const upstashUrl = process.env.KV_REST_API_URL || process.env.KV_URL;
const upstashToken = process.env.KV_REST_API_TOKEN || process.env.KV_TOKEN;

// Initialize standard Redis client if REDIS_URL is provided
if (redisUrl) {
  redisClient = createClient({
    url: redisUrl,
  }) as RedisClientType;
  redisClient.on("error", (err: Error) => {
    console.error("Redis Client Error:", err);
  });
}

// Initialize Upstash Redis if REST API credentials are provided
if (upstashUrl && upstashToken) {
  upstashRedis = new UpstashRedis({
    url: upstashUrl,
    token: upstashToken,
  });
}

// Helper to ensure Redis connection is established
async function ensureConnection() {
  if (redisClient && !redisClient.isOpen && !isConnecting) {
    isConnecting = true;
    try {
      await redisClient.connect();
    } catch (error) {
      console.error("Failed to connect to Redis:", error);
    } finally {
      isConnecting = false;
    }
  }
}

// Helper to safely get data from Redis
export async function getRedisData<T>(key: string): Promise<T | null> {
  try {
    // Try standard Redis first
    if (redisClient && redisUrl) {
      await ensureConnection();
      const data = await redisClient.get(key);
      if (data !== null) {
        return typeof data === "string" ? (JSON.parse(data) as T) : (data as T);
      }
    }

    // Fallback to Upstash Redis
    if (upstashRedis && upstashUrl && upstashToken) {
      const data = await upstashRedis.get<T>(key);
      return data;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching Redis key ${key}:`, error);
    return null;
  }
}

// Helper to safely set data in Redis
export async function setRedisData<T>(key: string, value: T): Promise<boolean> {
  try {
    // Create backup before saving (store previous version)
    const backupKey = `${key}:backup:${Date.now()}`;
    const currentData = await getRedisData<T>(key);
    
    if (currentData !== null) {
      // Save backup (keep last 5 backups)
      try {
        if (redisClient && redisUrl) {
          await ensureConnection();
          await redisClient.set(backupKey, JSON.stringify(currentData));
          // Clean up old backups (keep only last 5)
          const backupKeys = await redisClient.keys(`${key}:backup:*`);
          if (backupKeys.length > 5) {
            const sortedKeys = backupKeys.sort().reverse();
            for (const oldKey of sortedKeys.slice(5)) {
              await redisClient.del(oldKey);
            }
          }
        } else if (upstashRedis && upstashUrl && upstashToken) {
          await upstashRedis.set(backupKey, currentData);
          // Note: Upstash doesn't support keys() easily, so we'll just set backups with timestamps
        }
      } catch (backupError) {
        console.error("Error creating backup:", backupError);
        // Continue with save even if backup fails
      }
    }

    // Save new data
    if (redisClient && redisUrl) {
      await ensureConnection();
      await redisClient.set(key, JSON.stringify(value));
      return true;
    }

    // Fallback to Upstash Redis
    if (upstashRedis && upstashUrl && upstashToken) {
      await upstashRedis.set(key, value);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Error setting Redis key ${key}:`, error);
    return false;
  }
}

// Helper to get backup versions
export async function getBackups(key: string): Promise<Array<{ timestamp: number; data: any }>> {
  try {
    if (redisClient && redisUrl) {
      await ensureConnection();
      const backupKeys = await redisClient.keys(`${key}:backup:*`);
      const backups = [];
      for (const backupKey of backupKeys) {
        const timestamp = parseInt(backupKey.split(':').pop() || '0');
        const data = await redisClient.get(backupKey);
        if (data) {
          backups.push({ timestamp, data: typeof data === 'string' ? JSON.parse(data) : data });
        }
      }
      return backups.sort((a, b) => b.timestamp - a.timestamp); // Most recent first
    }
    return [];
  } catch (error) {
    console.error(`Error getting backups for ${key}:`, error);
    return [];
  }
}

// Helper to restore from backup
export async function restoreFromBackup(key: string, timestamp: number): Promise<boolean> {
  try {
    const backupKey = `${key}:backup:${timestamp}`;
    const backupData = await getRedisData(backupKey);
    
    if (backupData === null) {
      return false;
    }

    return await setRedisData(key, backupData);
  } catch (error) {
    console.error(`Error restoring backup for ${key}:`, error);
    return false;
  }
}
