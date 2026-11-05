/**
 * Client Supabase chỉ được mang khóa anon.
 * Run with: tsx scripts/supabase.test.ts
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const client = readFileSync("src/lib/supabase.ts", "utf8");
const example = readFileSync(".env.example", "utf8");
const blob = `${client}\n${example}`;

assert.match(blob, /https:\/\/npohzccvejgonxvoaibc\.supabase\.co/);
assert.match(blob, /VITE_SUPABASE_ANON_KEY/);
assert.equal(/service_role|SERVICE_ROLE/i.test(blob), false);
assert.equal(client.includes("eyJ"), true);

console.log("supabase client ok");
