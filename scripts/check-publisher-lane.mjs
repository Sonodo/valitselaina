#!/usr/bin/env node
// Valitse Laina — publisher-lane compliance check
// Fails non-zero if the source tree contains text that would push the
// project across the KSL 7:7 / KKV `luotonvälittäjä` line.
//
// Canonical rules: COMPLIANCE_RED_LINES.md
// Run manually: npm run check:publisher-lane
// Auto-runs as `prebuild` so Vercel deployments fail closed.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

// Directories we scan
const SCAN_DIRS = ['src', 'public'];

// File extensions we read as text
const TEXT_EXTS = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs',
  '.json', '.md', '.mdx', '.html', '.txt', '.xml', '.svg',
]);

// Files we never scan (the rules themselves contain the forbidden words)
const SKIP_PATHS = [
  'CLAUDE.md',
  'COMPLIANCE_RED_LINES.md',
  'scripts/check-publisher-lane.mjs',
  'node_modules',
  '.next',
  'dist',
  'build',
  '.git',
];

// Negation markers that, if present within `NEGATION_WINDOW` chars before a
// match, tolerate the match (so "Emme ole lainanvälittäjä" passes).
const NEGATION_WINDOW = 60;
const NEGATION_MARKERS = [
  /\bei\b/i,
  /\bemme\b/i,
  /\bei\s+ole\b/i,
  /\bemme\s+ole\b/i,
  /\bemme\s+välitä\b/i,
  /\bei\s+välitä\b/i,
  // English negations for code comments / OG tags
  /\bnot\b/i,
  /\bnever\b/i,
  /\bno\b/i,
  /\bdo\s+not\b/i,
  /\bdoes\s+not\b/i,
];

// Rule registry. Each rule has:
//   id: short identifier (matches red-line number)
//   description: one-line human description
//   pattern: RegExp to search (case-insensitive, multiline)
//   allowNegation: whether a nearby negation marker tolerates the match
//   skipFiles: optional list of paths where the pattern is intentionally OK
const RULES = [
  // ---- Rule 4: self-description as credit intermediary ----
  {
    id: '4a',
    description: 'Self-description as lainavälittäjä / luotonvälittäjä',
    pattern: /\b(laina(n)?välittäjä|luotonvälittäjä|rahoitusvälittäjä|välitystoiminta)\b/gi,
    allowNegation: true,
  },
  {
    id: '4b',
    description: 'Self-description "välitämme lainoja/luottoja"',
    pattern: /\bvälitämme\s+(lainoja|luottoja|laina|luotto)\b/gi,
    allowNegation: true,
  },
  {
    id: '4c',
    description: 'Self-description "me välitä(mme)"',
    pattern: /\bme\s+välitä(mme)?\b/gi,
    allowNegation: true,
  },

  // ---- Rule 5: "one application, multiple lenders" ----
  {
    id: '5a',
    description: 'Banned phrase: "yksi/yhdellä hakemus(ella) ... tarjous"',
    pattern: /\b(yksi|yhdellä)\s+hakemus(ella)?[^.!?\n]{0,80}(useita|monta|monelta)?\s*tarjou/gi,
    allowNegation: false,
  },
  {
    id: '5b',
    description: 'Banned phrase: "yhteishakemus"',
    pattern: /\byhteishakemus\b/gi,
    allowNegation: false,
  },
  {
    id: '5c',
    description: 'Banned phrase: "lähetämme tietosi/hakemuksesi pankeille"',
    pattern: /\blähetämme\s+(tietosi|hakemuksesi|hakemukses|tiedot)\b/gi,
    allowNegation: false,
  },
  {
    id: '5d',
    description: 'Banned phrase: "pyydämme tarjouksia puolestasi"',
    pattern: /\bpyydämme\s+(tarjouks|lainatarjouks|hintoj)[^.!?\n]{0,40}(puolesta|sinun|asiakk)/gi,
    allowNegation: false,
  },
  {
    id: '5e',
    description: 'Banned phrase: "kilpailutus puolestasi" (agentive)',
    pattern: /\bkilpailut(amme|us|ammek)[^.!?\n]{0,40}(puolesta|sinun|asiakk)/gi,
    allowNegation: false,
  },

  // ---- Rule 8: guaranteed approval / no credit check / payment defaults ----
  // Rule 8a tolerates the proper noun "Takuusäätiö" (a Finnish nonprofit
  // debt-help foundation we cite editorially). It also tolerates other
  // legitimate "takuu*" compound words by requiring a credit-claim suffix.
  {
    id: '8a',
    description: 'Banned claim: takuulla / takuuvarma / takuuhyväksyntä laina',
    pattern: /\btakuu(lla|varma|hyväksy|n\s+kanssa)\b/gi,
    allowNegation: true,
  },
  {
    id: '8a2',
    description: 'Banned claim: "takuu laina" / "takuu hyväksyntä" (with space)',
    pattern: /\btakuu\s+(laina|luotto|hyväksy|myönt|saat)/gi,
    allowNegation: true,
  },
  {
    id: '8b',
    description: 'Banned claim: "aina hyväksytty / 100% hyväksyntä"',
    pattern: /\b(aina\s+hyväksyt|100\s*%?\s*hyväksy|varma\s+hyväksy|taatusti\s+hyväksy)/gi,
    allowNegation: true,
  },
  {
    id: '8c',
    description: 'Banned claim: "ilman luottotietoja / luottotietojen tarkistusta"',
    pattern: /\bilman\s+luottotie/gi,
    allowNegation: true,
  },
  // Rule 8d catches sales claims targeting people with payment defaults, NOT
  // editorial warnings about the consequences of payment defaults. Requires a
  // credit-related verb/noun within ~40 chars.
  {
    id: '8d',
    description: 'Banned claim: marketing loans to consumers with maksuhäiriö',
    pattern: /\b(maksuhäiriöisille|lainaa\s+maksuhäiriö|luottoa\s+maksuhäiriö|maksuhäiriömerkinnällä(?:kin)?\s+(?:saat|saa|myön|tarjo|laina|luotto|hyväksy)|maksuhäiriö\w*\s+(?:huolimatta|huolimattakin)\s*(?:saat|saa|myön|tarjo|laina|luotto))/gi,
    allowNegation: true,
  },
  {
    id: '8e',
    description: 'Banned claim: "varma laina"',
    pattern: /\bvarma\s+laina\b/gi,
    allowNegation: true,
  },

  // ---- Rule 6: backend that touches loan applications ----
  {
    id: '6a',
    description: 'Banned API route or handler name suggesting loan application',
    // Match identifiers / route segments. The check is structural — name in code.
    pattern: /\b(loanApply|submitApplication|loan_request|borrower_profile|prequalify|score_user|partner_offers_inbox|lender_webhook|applicant_data)\b/g,
    allowNegation: false,
  },
];

// Files where rule 6 should additionally check filenames
const ROUTE_DIR = 'src/app/api';
const BANNED_ROUTE_SEGMENTS = [
  'apply', 'applications', 'application',
  'loan-apply', 'loanapply',
  'prequalify', 'pre-qualify',
  'score', 'score-user',
  'borrower', 'borrowers',
  'partner-offers', 'lender-webhook', 'webhook-offers',
];

function shouldSkip(absPath) {
  const rel = relative(projectRoot, absPath);
  return SKIP_PATHS.some((s) => rel === s || rel.startsWith(s + '/') || rel.startsWith(s + '\\'));
}

function* walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const name of entries) {
    const full = join(dir, name);
    if (shouldSkip(full)) continue;
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      yield* walk(full);
    } else if (st.isFile() && TEXT_EXTS.has(extname(name).toLowerCase())) {
      yield full;
    }
  }
}

function hasNegationBefore(text, idx) {
  const start = Math.max(0, idx - NEGATION_WINDOW);
  const window = text.slice(start, idx);
  return NEGATION_MARKERS.some((m) => m.test(window));
}

function lineColFor(text, idx) {
  let line = 1;
  let col = 1;
  for (let i = 0; i < idx; i++) {
    if (text[i] === '\n') {
      line++;
      col = 1;
    } else {
      col++;
    }
  }
  return { line, col };
}

function scanFile(absPath) {
  const text = readFileSync(absPath, 'utf8');
  const violations = [];
  for (const rule of RULES) {
    rule.pattern.lastIndex = 0;
    let m;
    while ((m = rule.pattern.exec(text)) !== null) {
      const idx = m.index;
      if (rule.allowNegation && hasNegationBefore(text, idx)) continue;
      const { line, col } = lineColFor(text, idx);
      violations.push({
        ruleId: rule.id,
        ruleDescription: rule.description,
        match: m[0],
        line,
        col,
        snippet: text
          .slice(Math.max(0, idx - 30), Math.min(text.length, idx + m[0].length + 30))
          .replace(/\s+/g, ' ')
          .trim(),
      });
      // prevent zero-width loops
      if (m[0].length === 0) rule.pattern.lastIndex++;
    }
  }
  return violations;
}

function checkRouteDir() {
  const violations = [];
  const apiDir = join(projectRoot, ROUTE_DIR);
  let exists = true;
  try {
    statSync(apiDir);
  } catch {
    exists = false;
  }
  if (!exists) return violations;
  for (const file of walk(apiDir)) {
    const rel = relative(projectRoot, file).replace(/\\/g, '/');
    const segments = rel.split('/');
    for (const seg of segments) {
      const lower = seg.toLowerCase();
      if (BANNED_ROUTE_SEGMENTS.some((b) => lower === b || lower.startsWith(b + '.') || lower === b + 'route.ts')) {
        violations.push({
          ruleId: '6b',
          ruleDescription: `Banned API route segment "${seg}" — suggests loan-application backend`,
          match: rel,
          line: 0,
          col: 0,
          snippet: rel,
        });
      }
    }
  }
  return violations;
}

function main() {
  const allViolations = [];

  for (const top of SCAN_DIRS) {
    const root = join(projectRoot, top);
    try {
      statSync(root);
    } catch {
      continue;
    }
    for (const file of walk(root)) {
      const v = scanFile(file);
      if (v.length > 0) {
        const rel = relative(projectRoot, file).replace(/\\/g, '/');
        for (const item of v) {
          allViolations.push({ file: rel, ...item });
        }
      }
    }
  }

  allViolations.push(...checkRouteDir());

  if (allViolations.length === 0) {
    console.log('check:publisher-lane — OK (0 violations across', SCAN_DIRS.join(', '), ')');
    process.exit(0);
  }

  console.error('');
  console.error('check:publisher-lane — FAIL');
  console.error('================================================================');
  console.error(`${allViolations.length} publisher-lane violation(s) found.`);
  console.error('See COMPLIANCE_RED_LINES.md and CLAUDE.md for the full rules.');
  console.error('================================================================');
  console.error('');
  for (const v of allViolations) {
    const loc = v.line > 0 ? `${v.file}:${v.line}:${v.col}` : v.file;
    console.error(`  [Rule ${v.ruleId}] ${loc}`);
    console.error(`    ${v.ruleDescription}`);
    console.error(`    matched: "${v.match}"`);
    if (v.snippet && v.snippet !== v.match) {
      console.error(`    context: …${v.snippet}…`);
    }
    console.error('');
  }
  console.error('================================================================');
  console.error('If a flagged occurrence is a legitimate negation that the script');
  console.error('did not detect (e.g. a longer-form "we are not a ..."), either:');
  console.error('  1. Rephrase to put "ei" / "emme" / "ole" within ~60 chars, OR');
  console.error('  2. Justify it to the chairman and add an explicit allowance');
  console.error('     in scripts/check-publisher-lane.mjs (with comment).');
  console.error('================================================================');
  process.exit(1);
}

main();
