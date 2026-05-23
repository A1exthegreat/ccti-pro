// CCTI API endpoints — extends Hola with test submission, result retrieval, and Semi identity binding.
// Runs under the same Bun / Vercel Serverless handler as Hola's OAuth routes.
import { Database } from "bun:sqlite";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { getSession } from "./session";

interface CctiAnswers {
  [questionIndex: number]: number | null;
}

interface CctiResult {
  resultId: string;
  createdAt: string;
  answers: CctiAnswers;
  personality?: {
    primaryId: string;
    primaryName: string;
    secondaryId: string;
    secondaryName: string;
    drive: string;
    domain: string;
    social: string;
    linkage: string;
    stage: string;
  };
  profile?: Record<string, string>;
  boundTo?: string;   // Semi DID
  boundAt?: string;
}

// ── SQLite persistence ──────────────────────────────────────────────────
const DATA_DIR = join(import.meta.dir, "..", "data");
if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(join(DATA_DIR, "ccti.db"), { create: true });
db.run("PRAGMA journal_mode = WAL");
db.run(`CREATE TABLE IF NOT EXISTS results (
  result_id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  answers TEXT NOT NULL,
  personality TEXT,
  profile TEXT,
  bound_to TEXT,
  bound_at TEXT
)`);

const insertStmt = db.prepare(
  "INSERT INTO results (result_id, created_at, answers, personality, profile) VALUES (?, ?, ?, ?, ?)"
);
const selectStmt = db.prepare("SELECT * FROM results WHERE result_id = ?");
const updateBindStmt = db.prepare(
  "UPDATE results SET bound_to = ?, bound_at = ? WHERE result_id = ?"
);
const selectByUserStmt = db.prepare("SELECT * FROM results WHERE bound_to = ? ORDER BY created_at DESC");

function rowToResult(row: any): CctiResult {
  return {
    resultId: row.result_id,
    createdAt: row.created_at,
    answers: JSON.parse(row.answers),
    personality: row.personality ? JSON.parse(row.personality) : undefined,
    profile: row.profile ? JSON.parse(row.profile) : undefined,
    boundTo: row.bound_to ?? undefined,
    boundAt: row.bound_at ?? undefined,
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────
function uid(): string {
  return `r_${crypto.randomUUID()}`;
}

const ALLOWED_ORIGINS = (process.env.CORS_ORIGINS ?? "").split(",").filter(Boolean);

function corsHeaders(req?: Request): Record<string, string> {
  const origin = req?.headers.get("origin") ?? "";
  const allowOrigin = ALLOWED_ORIGINS.length
    ? (ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0])
    : (origin || "*");
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(data: unknown, status = 200, req?: Request): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...corsHeaders(req) },
  });
}

// Handle CORS preflight
function handleOptions(req: Request): Response {
  return new Response(null, { status: 204, headers: corsHeaders(req) });
}

// ── POST /api/submit ────────────────────────────────────────────────────
async function handleSubmit(req: Request): Promise<Response> {
  let body: { answers?: CctiAnswers; personality?: CctiResult["personality"]; profile?: Record<string, string> };
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "invalid-json" }, 400, req);
  }

  if (!body.answers || typeof body.answers !== "object") {
    return json({ ok: false, error: "answers-required" }, 400, req);
  }

  const resultId = uid();
  insertStmt.run(
    resultId,
    new Date().toISOString(),
    JSON.stringify(body.answers),
    body.personality ? JSON.stringify(body.personality) : null,
    body.profile ? JSON.stringify(body.profile) : null
  );

  return json({ ok: true, resultId }, 200, req);
}

// ── GET /api/result/:id ─────────────────────────────────────────────────
async function handleGetResult(req: Request, resultId: string): Promise<Response> {
  const row = selectStmt.get(resultId);
  if (!row) return json({ ok: false, error: "not-found" }, 404, req);

  return json({ ok: true, result: rowToResult(row) }, 200, req);
}

// ── GET /api/me ─────────────────────────────────────────────────────────
async function handleMe(req: Request): Promise<Response> {
  const session = await getSession(req);
  if (!session) return json({ ok: false, error: "unauthorized" }, 401, req);

  const u = session.user;
  return json({
    ok: true,
    did: u.sub,
    handle: u.handle ?? null,
    wallet_address: u.wallet_address ?? null,
    avatar: null,
  }, 200, req);
}

// ── POST /api/bind ──────────────────────────────────────────────────────
async function handleBind(req: Request): Promise<Response> {
  const session = await getSession(req);
  if (!session) return json({ ok: false, error: "unauthorized" }, 401, req);

  let body: { resultId?: string };
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "invalid-json" }, 400, req);
  }

  if (!body.resultId) return json({ ok: false, error: "resultId-required" }, 400, req);

  const row = selectStmt.get(body.resultId);
  if (!row) return json({ ok: false, error: "not-found" }, 404, req);

  // 如果已绑定其他人，拒绝覆盖
  const existing = rowToResult(row);
  if (existing.boundTo && existing.boundTo !== session.user.sub) {
    return json({ ok: false, error: "already-bound" }, 409, req);
  }

  const semiDid = session.user.sub;
  updateBindStmt.run(semiDid, new Date().toISOString(), body.resultId);

  return json({ ok: true, resultId: body.resultId, boundTo: semiDid }, 200, req);
}

// ── GET /api/my-results ─────────────────────────────────────────────────
async function handleMyResults(req: Request): Promise<Response> {
  const session = await getSession(req);
  if (!session) return json({ ok: false, error: "unauthorized" }, 401, req);

  const rows = selectByUserStmt.all(session.user.sub);
  return json({ ok: true, results: rows.map(rowToResult) }, 200, req);
}

// ── Router ──────────────────────────────────────────────────────────────
export default async function cctiHandler(req: Request): Promise<Response | null> {
  const url = new URL(req.url);
  const { pathname } = url;

  if (req.method === "OPTIONS") return handleOptions(req);

  // POST /api/submit
  if (pathname === "/api/submit" && req.method === "POST") {
    return handleSubmit(req);
  }

  // GET /api/me
  if (pathname === "/api/me" && req.method === "GET") {
    return handleMe(req);
  }

  // GET /api/my-results
  if (pathname === "/api/my-results" && req.method === "GET") {
    return handleMyResults(req);
  }

  // GET /api/result/:id
  const resultMatch = pathname.match(/^\/api\/result\/([a-zA-Z0-9_-]+)$/);
  if (resultMatch && req.method === "GET") {
    return handleGetResult(req, resultMatch[1]);
  }

  // POST /api/bind
  if (pathname === "/api/bind" && req.method === "POST") {
    return handleBind(req);
  }

  return null;
}
