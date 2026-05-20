# aiblogg.se — Writing brief för agenter

## Kontext
aiblogg.se är en oberoende svensk AI-blogg som lanseras 2026-05-20. Målet är att ranka på Google.se för svenska AI-relaterade sökord. Allt innehåll skrivs på svenska, för svenska läsare, och alla artiklar är SEO-optimerade mot ett primärsökord från Ahrefs-research.

## SEO-regler (HÅRDA — får aldrig brytas)

1. **Primärsökord** står i:
   - Title (redan satt i frontmatter — bekräfta att den används naturligt i intron)
   - Första 100 orden av brödtext (i naturlig formulering)
   - Minst en H2-rubrik
   - Meta description (excerpten)
2. **Sekundärsökord/relaterade termer** — använd naturligt i H2:er och brödtext (semantisk relevans)
3. **Min 1200, helst 1500-1800 ord** brödtext per artikel
4. **5-8 H2-rubriker** med relevanta sökord. H3 där det krävs för struktur.
5. **FAQ-sektion** — 4-6 frågor som matchar "People Also Ask" på svenska. Använd `<FAQ items={[...]} />`-komponenten.
6. **Intern länkning** — minst 3 länkar till andra artiklar på aiblogg.se via Markdown-länkar `[ankartext](/category/slug/)`. Ankartexten ska vara målsidans sökord, ALDRIG "läs mer", "klicka här", "denna artikel".
7. **FÖRBJUDNA ankartexter** (quality-gate blockar pusen): "läs mer", "läs guiden", "klicka här", "se mer", "gå hit", "här", "denna artikel"

## Skriv-regler (HÅRDA)

1. **Inga AI-mönster.** Förbjudna inledningar/fraser:
   - "I en värld där..." / "I dagens samhälle..." / "Det är ingen hemlighet..."
   - "Det är viktigt att notera" / "Värt att påpeka"
   - "Låt oss dyka djupare in i..." / "Nu när vi har gått igenom..."
   - "Sammanfattningsvis..." / "Avslutningsvis..." / "Som vi har sett..."
   - Tomma superlativ: "fantastisk", "otrolig", "enastående", "revolutionerande"
2. **Inga em-dash eller en-dash** (— eller –). Använd komma, kolon eller punkt istället.
3. **Svenska tecken alltid:** å, ä, ö måste vara korrekta överallt.
4. **Aktiv form**, tilltala läsaren med "du".
5. **Variera meningslängd** — blanda korta direkta meningar med längre förklaringar.
6. **Konkreta exempel och siffror** framför vaga påståenden.
7. **Inga emojis.** Aldrig.

## Struktur per artikel

```mdx
---
title: "[från articles.ts]"
excerpt: "[från articles.ts]"
category: "[från articles.ts]"
publishDate: "[från articles.ts]"
---

import Callout from '../../../components/Callout.astro';
import FAQ from '../../../components/FAQ.astro';

<intro: 2-3 stycken, max 5 meningar. Primärsökord i första stycket. Förklara vad artikeln handlar om och varför läsaren ska bry sig.>

## [H2 med relaterat sökord]
<brödtext>

<Callout type="tip" title="...">
  Konkret tips som faktiskt tillför värde.
</Callout>

## [H2]
<brödtext>

### [H3 om det behövs]

## [H2]

<inline-bild placeholder, vi lägger till efter — använd kommentar `{/* TODO: inline-bild om [topic] */}` i artikeln före andra H2:n>

## [H2]

## [H2]

## Vanliga frågor om [primärsökord]

<FAQ items={[
  { q: "...?", a: "..." },
  { q: "...?", a: "..." },
  { q: "...?", a: "..." },
  { q: "...?", a: "..." },
]} />

## Vad härnäst?

Kort avslutning utan AI-klyschor. Länka till 1-2 andra artiklar med exakt målsökord som ankartext.
```

## Vad ska INTE vara med
- Affiliatelänkar (vi har inga ännu, det är en bloggsite för länkförsäljning)
- Produktrekommendationer med köpknappar
- Påståenden om priser/siffror som inte kan beläggas
- Datum i framtiden (idag är 2026-05-20)

## Tonalitet
Saklig, teknisk men inte stel. Tilltala läsaren som en intelligent svensktalande vuxen som vill förstå AI på riktigt. Vi skriver inte säljkopia. Vi skriver inte hype. Vi skriver heller inte akademiskt torrt. Tänk en kunnig redaktör som förklarar för en kompis.

## Persona som skriver
Adrian Hellström, civilingenjör KTH, 8 år ML-erfarenhet. Skriver från eget hantverk.
