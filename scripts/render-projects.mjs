// Regenerates the static project rows inside index.html so crawlers that
// do not execute JavaScript can read the portfolio content.
//
// Run after any edit to the PROJECTS array:  node scripts/render-projects.mjs
//
// It extracts PROJECTS, STATUS, esc, and rowHTML from index.html itself,
// renders the rows, and replaces the block between the STATIC markers in
// <div id="rows">. The browser JS still re-renders from the array at
// runtime, so the visible site never depends on this file being run;
// only the crawler-visible copy goes stale if you forget.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const FILE = fileURLToPath(new URL('../index.html', import.meta.url));
let html = readFileSync(FILE, 'utf8');

const start = html.indexOf('const PROJECTS');
const end = html.indexOf('rowsEl.innerHTML=');
if (start < 0 || end < 0) throw new Error('could not locate PROJECTS block in index.html');

const src = html
  .slice(start, end)
  .replace(/const rowsEl=.*\n/, '');
const rows = new Function(src + '\nreturn PROJECTS.map(rowHTML).join("");')();

const START = '<!-- PROJECTS:STATIC:START -->';
const END = '<!-- PROJECTS:STATIC:END -->';
const a = html.indexOf(START);
const b = html.indexOf(END);
if (a < 0 || b < 0) throw new Error('static markers missing from index.html');

html = html.slice(0, a + START.length) + rows + html.slice(b);
writeFileSync(FILE, html);
console.log('static project rows regenerated:', rows.length, 'chars');
