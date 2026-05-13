const fs = require("fs");

const url = process.env.SUPABASE_URL || "";
const key = process.env.SUPABASE_ANON_KEY || "";

if (!url || !key) {
  console.warn("[build] SUPABASE_URL or SUPABASE_ANON_KEY missing — config.js will be empty.");
}

const out =
  `window.SUPABASE_URL = ${JSON.stringify(url)};\n` +
  `window.SUPABASE_ANON_KEY = ${JSON.stringify(key)};\n`;

fs.writeFileSync("config.js", out);
console.log("[build] config.js written.");
