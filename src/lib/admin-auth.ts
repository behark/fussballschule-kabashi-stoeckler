import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.ADMIN_SECRET || "default-secret-change-in-production-min-32-chars"
);

const COOKIE_NAME = "admin-token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export interface AdminPayload {
  username: string;
  iat: number;
  exp: number;
}

// Sign JWT token
export async function signToken(username: string): Promise<string> {
  const token = await new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  return token;
}

// Verify JWT token
export async function verifyToken(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as AdminPayload;
  } catch (error) {
    return null;
  }
}

// Validate login credentials
export function validateCredentials(
  username: string,
  password: string
): boolean {
  // Use environment variables if set, otherwise use defaults (for development only)
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  return username === adminUsername && password === adminPassword;
}

// Get token from cookie
export function getTokenFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").map((c) => c.trim());
  const tokenCookie = cookies.find((c) => c.startsWith(`${COOKIE_NAME}=`));

  if (!tokenCookie) return null;

  return tokenCookie.split("=")[1];
}

// Create cookie string
export function createAuthCookie(token: string): string {
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}`;
}

// Create logout cookie (clear cookie)
export function createLogoutCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
