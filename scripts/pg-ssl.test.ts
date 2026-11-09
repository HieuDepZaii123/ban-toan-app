/**
 * TLS options for Postgres connection strings (Supabase / Vercel Postgres URLs).
 * Run with: tsx scripts/pg-ssl.test.ts
 */
import assert from "node:assert/strict";
import { pgConnection } from "../server/db/sql.ts";

const supabase = "postgres://u:p@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x";

assert.deepEqual(pgConnection(supabase), { connectionString: supabase }, "no CA: URL untouched, pg verifies as usual");
assert.deepEqual(pgConnection(supabase, "   "), { connectionString: supabase }, "blank CA ignored");

const pem = "-----BEGIN CERTIFICATE-----\\nAAAA\\n-----END CERTIFICATE-----";
const pinned = pgConnection(supabase, pem);
assert.deepEqual(pinned.ssl, { ca: "-----BEGIN CERTIFICATE-----\nAAAA\n-----END CERTIFICATE-----", rejectUnauthorized: true });
const params = new URL(pinned.connectionString).searchParams;
assert.equal(params.has("sslmode"), false, "URL sslmode cannot override the CA");
assert.equal(params.get("supa"), "base-pooler.x", "other params kept");

const multiline = "-----BEGIN CERTIFICATE-----\nBBBB\n-----END CERTIFICATE-----\n";
assert.equal(pgConnection(supabase, multiline).ssl?.ca, multiline.trim(), "real newlines kept");
assert.deepEqual(pgConnection("not a url", pem), { connectionString: "not a url" });

console.log("pg ssl ok");
