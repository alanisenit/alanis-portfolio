// Genera src/styles/tokens.css desde design-system/project/tokens.json (la única fuente de valores).
// Uso: npm run tokens
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tokens = JSON.parse(readFileSync(join(root, "design-system/project/tokens.json"), "utf8"));
const theme = tokens.color.themes[0].id;

const value = (v) => (typeof v === "string" ? v : v[theme]);
const alias = (v) => v.replace(/^\{(.+)\}$/, "var(--$1)");

const lines = [
  "/* Pop Nocturna — generado desde design-system/project/tokens.json con `npm run tokens`. No editar a mano. */",
  ":root {",
];
for (const t of tokens.color.tokens) lines.push(`  --${t.name}: ${alias(value(t.value))};`);
for (const family of ["shadow", "spacing", "radius", "duration", "easing", "zIndex", "breakpoint"]) {
  for (const t of tokens[family]?.tokens ?? []) lines.push(`  --${t.name}: ${value(t.value)};`);
}
lines.push("}", "");

writeFileSync(join(root, "src/styles/tokens.css"), lines.join("\n"));
console.log(`tokens.css: ${lines.length - 3} variables`);
