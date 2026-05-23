// Shared session helpers — used by both Hola OAuth routes and CCTI API endpoints.

const SESSION_SECRET = process.env.SESSION_SECRET ?? "dev-secret";
const REDIRECT_URI = process.env.REDIRECT_URI ?? "";

export interface UserInfo {
  sub: string;
  handle?: string;
  phone_verified?: boolean;
  email_verified?: boolean;
  wallet_address?: string;
  scopes_granted?: string[];
}

export interface Session {
  accessToken: string;
  refreshToken: string;
  user: UserInfo;
}

// ── Base64url ───────────────────────────────────────────────────────────
function base64url(bytes: Uint8Array): string {
  let str = "";
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export function base64urlDecode(s: string): Uint8Array {
  const binary = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

// ── Cookie helpers ──────────────────────────────────────────────────────
function getCookieValue(req: Request, name: string): string | null {
  const header = req.headers.get("cookie") ?? "";
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? match[1] : null;
}

export function clearCookie(name: string): string {
  return `${name}=; HttpOnly; Path=/; Max-Age=0`;
}

// ── HMAC-signed session cookie ──────────────────────────────────────────
async function hmacSign(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return base64url(new Uint8Array(sig));
}

export async function createSessionCookie(session: Session): Promise<string> {
  const payload = base64url(new TextEncoder().encode(JSON.stringify(session)));
  const sig = await hmacSign(payload);
  const secure = REDIRECT_URI.startsWith("https") ? "; Secure" : "";
  return `hola_sid=${payload}.${sig}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax${secure}`;
}

export async function getSession(req: Request): Promise<Session | null> {
  const raw = getCookieValue(req, "hola_sid");
  if (!raw) return null;
  const dot = raw.lastIndexOf(".");
  if (dot === -1) return null;
  const payload = raw.slice(0, dot);
  const sig = raw.slice(dot + 1);
  if (sig !== (await hmacSign(payload))) return null;
  try {
    return JSON.parse(new TextDecoder().decode(base64urlDecode(payload))) as Session;
  } catch {
    return null;
  }
}

// ── Plain cookie helpers ────────────────────────────────────────────────
export function setCookie(name: string, value: string, maxAgeSeconds = 600): string {
  return `${name}=${value}; HttpOnly; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;
}

export function getCookie(req: Request, name: string): string | null {
  return getCookieValue(req, name);
}
