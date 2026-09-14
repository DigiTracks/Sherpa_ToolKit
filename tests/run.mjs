// Procure Sherpa — hardening regression tests (no deps, runs with `node tests/run.mjs`)
// Extracts pure helpers from index.html <script> and asserts security + math invariants.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const m = html.match(/<script>([\s\S]*)<\/script>/);
if (!m) { console.error('FAIL: no <script> found'); process.exit(1); }

const sandbox = { console, Math, JSON, Number, String, Array, Object, Date,
  btoa: (s) => Buffer.from(s, 'binary').toString('base64'),
  atob: (s) => Buffer.from(s, 'base64').toString('binary') };
vm.createContext(sandbox);
// Stub browser globals touched at top-level of the inline script (none should run except fns,
// but guard anyway). We only evaluate function *definitions*, not the whole script, to avoid
// DOM access at load (DOMContentLoaded listener, etc).
const want = ['function fmt(','function fmtPct(','function safe(','function num(','function nz(',
  'function attrNum(','function clampNum(','function csvCell(','function toCSV(',
  'function sanitizeStr(','function sanitizeNum(','function sanitizeQuote(','function calcQS(',
  'function quoteResultSummary(','function dashboardStats(','function svgBars(',
  'function parseBackup(','function b64e(','function b64d(','function encodeQuote(','function decodeQuote('];
let src = '';
const grab = (fn) => {
  const start = m[1].indexOf(fn);
  if (start < 0) { console.error('FAIL: missing ' + fn); process.exit(1); }
  const open = m[1].indexOf('{', start);
  let depth = 0;
  for (let i = open; i < m[1].length; i++) {
    const ch = m[1][i];
    if (ch === '{') depth++;
    else if (ch === '}') { depth--; if (depth === 0) { src += m[1].slice(start, i + 1) + '\n'; return; } }
  }
  console.error('FAIL: unterminated ' + fn); process.exit(1);
};
for (const fn of want) grab(fn);
// sanitizeQuote references clampNum/sanitizeStr/sanitizeNum — included above. calcQS too.
vm.runInContext(src, sandbox);

let pass = 0, fail = 0;
const ok = (name, cond, extra='') => { if (cond) { pass++; console.log('ok - ' + name); } else { fail++; console.log('FAIL - ' + name + ' ' + extra); } };

// --- safe(): HTML escaping ---
ok('safe escapes <>&"\'`', sandbox.safe('<a href="x">\'`&') === '&lt;a href=&quot;x&quot;&gt;&#39;&#96;&amp;');
ok('safe null-safe', sandbox.safe(null) === '' && sandbox.safe(undefined) === '');

// --- XSS regression: inline-JS handoff pattern must be gone ---
ok('no inline sendToNeg string interp', !html.includes("sendToNeg('${") && !html.includes('sendToTCO(\'${'));
ok('uses sendBestToNeg/TCO (no supplier string in onclick)', html.includes('sendBestToNeg()') && html.includes('sendBestToTCO()'));

// --- numeric attr injection: no raw ${s.xxx} / ${hd.xxx} in value="" ---
const rawNum = [...html.matchAll(/value="\$\{(s\.|hd\.)(qty|unitPrice|discountPct|freight|packing|insurance|tooling|installation|inspection|other|gstPct|paymentDays|leadTime|moq|purchasePrice|currentPrice)[^}]*\}"/g)];
ok('numeric values go through attrNum', rawNum.length === 0, JSON.stringify(rawNum.slice(0,3)));
ok('attrNum rejects injection strings', sandbox.attrNum('" autofocus onfocus=alert(1) x="') === '' && sandbox.attrNum(42) === 42);
ok('attrNum finite only', sandbox.attrNum(Infinity) === '' && sandbox.attrNum('12') === 12);

// --- clamp / sanitize ---
ok('clamp pct', sandbox.clampNum(150,0,100,0) === 100 && sandbox.clampNum(-5,0,100,0) === 0 && sandbox.clampNum('x',0,100,7) === 7);
ok('sanitizeNum strict (rejects trailing garbage)', sandbox.sanitizeNum('12abc') === 0 && sandbox.sanitizeNum('12') === 12 && sandbox.sanitizeNum('foo') === 0);
ok('sanitizeStr caps', sandbox.sanitizeStr('a'.repeat(500),200).length === 200);

// --- CSV formula injection ---
{
  const csv = sandbox.toCSV(['name','v'], [['=cmd|calc', 1], ['+evil', 2], ['@x', 3], ['-y', 4], ['ok', 5]]);
  ok('csv quotes + neutralizes formulas', csv.includes("'=cmd|calc") && csv.includes("'+evil") && csv.includes("'@x") && csv.includes("'-y"));
}

// --- calcQS math + hardening ---
{
  const r = sandbox.calcQS({ qty: 10000, unitPrice: 100, discountPct: 10, freight: 5000, packing: 0, insurance: 0, tooling: 0, installation: 0, inspection: 0, other: 0, gstPct: 18, name: 'T' });
  // gross=1,000,000 disc=100,000 net=900,000 preTax=905,000 tax=162,900 invoice=1,067,900 norm=90.5
  ok('calcQS gross', r.gross === 1000000);
  ok('calcQS preTax', r.preTax === 905000);
  ok('calcQS normUnit', Math.abs(r.normUnit - 90.5) < 1e-9);
  const evil = sandbox.calcQS({ qty: '"><img src=x onerror=alert(1)>', unitPrice: 10, discountPct: 200, gstPct: -5, freight: -99, name: '<b>' });
  ok('calcQS coerces qty injection to 0', evil.qty === 0 && evil.normUnit === 0);
  ok('calcQS clamps pct', evil.discountPct === 100 && evil.gstPct === 0);
  ok('calcQS keeps name as plain string (render layer escapes)', evil.name === '<b>');
  const zero = sandbox.calcQS({ qty: 0, unitPrice: 999 });
  ok('calcQS qty=0 no Infinity', zero.normUnit === 0 && zero.effUnit === 0 && Number.isFinite(zero.invoice));
}

// --- fmt finite ---
ok('fmt Infinity -> --', sandbox.fmt(Infinity) === '--' && sandbox.fmt('foo') === '--');

// --- dashboardStats + svgBars (zero-dep charts) ---
{
  const qs = [
    { name: 'Q1', date: '2026-01-01', suppliers: [
      { name: 'A', qty: 100, unitPrice: 10, discountPct: 0, freight: 0, packing: 0, insurance: 0, tooling: 0, installation: 0, inspection: 0, other: 0, gstPct: 0 },
      { name: 'B', qty: 100, unitPrice: 12, discountPct: 0, freight: 0, packing: 0, insurance: 0, tooling: 0, installation: 0, inspection: 0, other: 0, gstPct: 0 }] },
    { name: 'Q2', date: '2026-02-01', suppliers: [
      { name: 'C', qty: 50, unitPrice: 20, discountPct: 0, freight: 0, packing: 0, insurance: 0, tooling: 0, installation: 0, inspection: 0, other: 0, gstPct: 0 },
      { name: 'D', qty: 50, unitPrice: 20, discountPct: 0, freight: 0, packing: 0, insurance: 0, tooling: 0, installation: 0, inspection: 0, other: 0, gstPct: 0 }] }
  ];
  const st = sandbox.dashboardStats(qs, 1);
  ok('dashboard counts', st.count === 2 && st.suppliers === 4);
  ok('dashboard savings Q1=200', Math.abs(st.totalSavings - 200) < 1e-9, String(st.totalSavings));
  ok('dashboard rows carry numeric qi', st.rows.every(r => Number.isInteger(r.qi)));
  const st12 = sandbox.dashboardStats(qs, 12);
  ok('dashboard multiplier annualizes', Math.abs(st12.totalSavings - 2400) < 1e-9);
  ok('dashboard clamps mult', sandbox.dashboardStats(qs, -5).mult === 1 && sandbox.dashboardStats(qs, 999).mult === 100);
  ok('dashboard empty-safe', sandbox.dashboardStats([], 2).count === 0 && sandbox.dashboardStats(null, 2).count === 0);
  const svg = sandbox.svgBars([{ label: '<A>&', value: 10, hot: true }, { label: 'B', value: 5 }], {});
  ok('svg escapes labels', svg.includes('&lt;A&gt;&amp;') && svg.startsWith('<svg') && svg.includes('role="img"'));
  ok('svg empty-safe', sandbox.svgBars([], {}).includes('No data yet'));
}
// --- wiring: dashboard page reachable, simplified ---
ok('pages map has dashboard', /dashboard\s*:\s*rDashboard/.test(html));
ok('sidebar has dashboard', html.includes('data-page="dashboard">Dashboard'));
ok('quote results has chart', html.includes('Normalized unit cost chart') && html.includes('svgBars(results'));
ok('dashboard has no multiplier UI', !html.includes('dash-mult') && !html.includes('setDashMult') && !html.includes('scenario multiplier'));
ok('dashboard simplified copy', html.includes('Your savings at a glance') && html.includes('You could save') && html.includes('Open result'));
ok('dashboard view opens results', html.includes('function viewResults(') && html.includes("nav('quotes');calcQuotes()"));

// --- backup parse (validated restore) ---
{
  const good = JSON.stringify({ v: '1.1.0', quotes: [{ name: 'Q', date: '2026-01-01', suppliers: [
    { name: 'A', qty: 10, unitPrice: 5 }, { name: 'B', qty: 10, unitPrice: 6 }] }] });
  const r = sandbox.parseBackup(good);
  ok('backup parses', r.ok && r.quotes.length === 1 && r.quotes[0].suppliers.length === 2);
  ok('backup rejects garbage', !sandbox.parseBackup('nope{').ok && !sandbox.parseBackup('{"a":1}').ok && !sandbox.parseBackup('{"quotes":[]}').ok);
  ok('backup sanitizes evil names', sandbox.parseBackup(JSON.stringify({ quotes: [{ name: '<img>', suppliers: [{ name: 'x' }] }] })).quotes[0].name === '<img>');
}
// --- share-link codec roundtrip ---
{
  const q = { name: 'CNC Q3 — test ✓', date: '2026-09-14', suppliers: [
    { name: 'A & Sons', qty: 100, unitPrice: 10 }, { name: "B's", qty: 100, unitPrice: 12 }] };
  const s = sandbox.encodeQuote(q);
  ok('share encodes url-safe', typeof s === 'string' && s.length > 10 && !/[+/=]/.test(s));
  const back = sandbox.decodeQuote(s);
  ok('share roundtrips unicode', back && back.name === q.name && back.suppliers[1].name === "B's");
  ok('share rejects junk', sandbox.decodeQuote('!!!') === null && sandbox.decodeQuote('') === null);
}
// --- product wiring ---
ok('version stamped', html.includes("APP_VERSION='1.1.0'") && html.includes('v1.1.0 · offline'));
ok('saved has backup/restore', html.includes('exportBackup()') && html.includes('importBackupFile(this)'));
ok('results has copy link', html.includes('copyResultLink()'));
ok('init handles share hash', html.includes('#q=') && html.includes('decodeQuote(location.hash')); 

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
