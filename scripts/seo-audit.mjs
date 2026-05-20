#!/usr/bin/env node
/**
 * SEO-audit per artikel. Skannar alla MDX + matchar mot articles.ts metadata.
 * Output: TSV + JSON med poäng per dimension och konkreta åtgärder.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const POSTS = path.join(ROOT, 'src/content/posts');

// Läs articles.ts metadata (regex-extraktion)
const tsContent = fs.readFileSync(path.join(ROOT, 'src/data/articles.ts'), 'utf8');
const articleRegex = /\{\s*slug:\s*'([^']+)'[\s\S]*?title:\s*'([^']+)'[\s\S]*?excerpt:\s*'([^']+)'[\s\S]*?category:\s*'([^']+)'[\s\S]*?primaryKeyword:\s*'([^']+)'[\s\S]*?searchVolume:\s*(\d+),\s*kd:\s*(\d+)/g;
const articles = [];
let m;
while ((m = articleRegex.exec(tsContent)) !== null) {
  articles.push({
    slug: m[1], title: m[2], excerpt: m[3],
    category: m[4], primaryKeyword: m[5],
    searchVolume: parseInt(m[6]), kd: parseInt(m[7]),
  });
}

function lowercase(s) { return (s || '').toLowerCase(); }
// Normaliserar för fuzzy keyword-match: lowercase + hyphen→space + å/ä/ö behålls
function normalize(s) {
  return (s || '').toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
}
// Kollar om alla ord i keyword finns i texten i ordning, max 1 ord mellan
function fuzzyContains(text, keyword) {
  const t = normalize(text);
  if (t.includes(normalize(keyword))) return true;
  const kwWords = normalize(keyword).split(' ').filter(Boolean);
  if (kwWords.length < 2) return false;
  // Bygg regex: ord1 (\S+\s+)?ord2 (\S+\s+)?ord3 ... (max 1 mellanliggande ord per gap)
  const pattern = kwWords.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('(?:\\s+\\S+){0,1}\\s+');
  return new RegExp(pattern).test(t);
}

function audit(article) {
  const mdxPath = path.join(POSTS, article.category, article.slug + '.mdx');
  if (!fs.existsSync(mdxPath)) return null;
  const mdx = fs.readFileSync(mdxPath, 'utf8');
  const body = mdx.split('---').slice(2).join('---');
  const kw = article.primaryKeyword;

  // Hämta H2/H3
  const h2 = [...mdx.matchAll(/^## (.+)$/gm)].map(x => x[1].trim());
  const h3 = [...mdx.matchAll(/^### (.+)$/gm)].map(x => x[1].trim());
  // Hämta första ~100 orden av brödtext (efter frontmatter och imports)
  const bodyText = body
    .replace(/import[^;]+;/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*`>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const wordCount = bodyText.split(' ').filter(Boolean).length;
  const first100 = bodyText.split(' ').slice(0, 100).join(' ');

  // Interna länkar
  const internalLinks = [...mdx.matchAll(/\]\((\/[^)]+\/)\)/g)].map(x => x[1]);
  const internalLinkCount = internalLinks.length;

  // FAQ-block
  const hasFAQ = /<FAQ\s+items=/.test(mdx);
  const faqCount = hasFAQ ? (mdx.match(/q:\s*['"]/g) || []).length : 0;

  // Callouts
  const calloutCount = (mdx.match(/<Callout/g) || []).length;

  // Inline-bild
  const hasInlineImage = /<Figure\s+src/.test(mdx);

  // Checks
  const checks = {
    title_has_keyword: fuzzyContains(article.title, kw),
    title_length_ok: article.title.length >= 35 && article.title.length <= 65,
    title_has_year: /20\d{2}/.test(article.title),
    title_has_number: /\b\d+\b/.test(article.title),
    meta_has_keyword: fuzzyContains(article.excerpt, kw),
    meta_length_ok: article.excerpt.length >= 120 && article.excerpt.length <= 160,
    keyword_in_first_100: fuzzyContains(first100, kw),
    keyword_in_h2: h2.some(h => fuzzyContains(h, kw)),
    h2_count_ok: h2.length >= 5 && h2.length <= 12,
    has_h3: h3.length >= 2,
    word_count_ok: wordCount >= 1200,
    internal_links_ok: internalLinkCount >= 3,
    has_faq: hasFAQ && faqCount >= 4,
    has_callout: calloutCount >= 1,
    has_inline_image: hasInlineImage,
  };

  const passed = Object.values(checks).filter(Boolean).length;
  const total = Object.keys(checks).length;

  // Specifika åtgärder
  const actions = [];
  if (!checks.title_has_keyword) actions.push(`TITLE: lägg in "${article.primaryKeyword}" i titeln`);
  if (!checks.title_length_ok) actions.push(`TITLE: justera längd till 35-65 tecken (nu ${article.title.length})`);
  if (!checks.title_has_year) actions.push(`TITLE: lägg in årtal (2026) för freshness-signal`);
  if (!checks.meta_has_keyword) actions.push(`META: lägg in "${article.primaryKeyword}" i excerpt`);
  if (!checks.meta_length_ok) actions.push(`META: justera längd 120-160 tecken (nu ${article.excerpt.length})`);
  if (!checks.keyword_in_first_100) actions.push(`INTRO: lägg in "${article.primaryKeyword}" i första 100 orden`);
  if (!checks.keyword_in_h2) actions.push(`H2: använd "${article.primaryKeyword}" i minst en H2-rubrik`);
  if (!checks.h2_count_ok) actions.push(`H2: justera antal till 5-12 (nu ${h2.length})`);
  if (!checks.has_h3) actions.push(`H3: lägg till minst 2 H3-underrubriker för djupare struktur`);
  if (!checks.word_count_ok) actions.push(`CONTENT: utöka till min 1200 ord (nu ${wordCount})`);
  if (!checks.internal_links_ok) actions.push(`LÄNKAR: lägg till fler internlänkar (nu ${internalLinkCount}, mål 3+)`);
  if (!checks.has_faq) actions.push(`FAQ: lägg till FAQ-block med 4-6 frågor`);
  if (!checks.has_callout) actions.push(`CALLOUT: lägg in minst en Callout-komponent`);
  if (!checks.has_inline_image) actions.push(`BILD: lägg in inline-bild med Figure-komponent`);

  return {
    slug: article.slug, category: article.category,
    primaryKeyword: article.primaryKeyword,
    sv: article.searchVolume, kd: article.kd,
    score: passed, total,
    title: article.title, titleLen: article.title.length,
    excerpt: article.excerpt, excerptLen: article.excerpt.length,
    h2: h2.length, h3: h3.length,
    wordCount, internalLinkCount, faqCount, calloutCount,
    hasInlineImage,
    checks, actions,
  };
}

const results = articles.map(audit).filter(Boolean);
results.sort((a, b) => (a.score - b.score) || (b.sv - a.sv));

// JSON
fs.writeFileSync(path.join(ROOT, 'seo-audit-report.json'), JSON.stringify(results, null, 2));

// Markdown-tabell
let md = `# SEO-audit aiblogg.se\n\nGenererad: ${new Date().toISOString()}\n\nTotalt ${results.length} artiklar. Sorterat efter sämst score först.\n\n`;
md += `## Översikt\n\n| Slug | Score | KW | Vol | KD | Titel-len | Meta-len | Ord | H2 | Länkar | FAQ | Issues |\n|---|---|---|---|---|---|---|---|---|---|---|---|\n`;
for (const r of results) {
  md += `| ${r.slug} | ${r.score}/${r.total} | ${r.primaryKeyword} | ${r.sv} | ${r.kd} | ${r.titleLen} | ${r.excerptLen} | ${r.wordCount} | ${r.h2} | ${r.internalLinkCount} | ${r.faqCount} | ${r.actions.length} |\n`;
}
md += `\n## Per artikel: åtgärder\n\n`;
for (const r of results) {
  if (r.actions.length === 0) continue;
  md += `### ${r.slug} (score ${r.score}/${r.total}, vol ${r.sv}, KD ${r.kd})\n\n`;
  md += `- **PrimÃ¤rsÃ¶kord:** \`${r.primaryKeyword}\`\n`;
  md += `- **Titel:** ${r.title}\n`;
  md += `- **Meta:** ${r.excerpt}\n\n`;
  md += `Åtgärder:\n`;
  for (const a of r.actions) md += `- ${a}\n`;
  md += `\n`;
}

fs.writeFileSync(path.join(ROOT, 'seo-audit-report.md'), md);
console.log(`✓ Rapport: seo-audit-report.{json,md}`);
console.log(`  ${results.length} artiklar`);
console.log(`  Score-fördelning:`);
const scoreCounts = {};
for (const r of results) { scoreCounts[r.score] = (scoreCounts[r.score] || 0) + 1; }
for (const s of Object.keys(scoreCounts).sort()) {
  console.log(`    ${s}/15: ${scoreCounts[s]} artiklar`);
}
const totalIssues = results.reduce((s, r) => s + r.actions.length, 0);
console.log(`  Totalt ${totalIssues} åtgärder`);
