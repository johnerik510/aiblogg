export interface Cluster {
  slug: string;
  url: string;
  label: string;
  shortLabel: string;
  /** Synlig H1 på kategorisidan (innehåller primärsökord) */
  h1: string;
  /** SEO title för meta-tag (35-65 tecken, innehåller primärsökord) */
  seoTitle: string;
  /** Meta description (120-160 tecken, innehåller primärsökord) */
  seoDescription: string;
  /** Intro-stycke som visas på kategorisidan */
  intro: string;
  accent: 'cyan' | 'violet';
}

export interface Article {
  slug: string;
  url: string;
  title: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  categoryUrl: string;
  hero: string;
  heroAlt: string;
  publishDate: string;
  updateDate?: string;
  readingTime: number;
  cornerstone?: boolean;
  published: boolean;
  /** Primärsökord, det vi optimerar mot */
  primaryKeyword: string;
  /** Sökvolym (Sweden), från Ahrefs */
  searchVolume: number;
  /** Keyword difficulty från Ahrefs */
  kd?: number;
  tags?: string[];
}

export const clusters: Cluster[] = [
  {
    slug: 'verktyg',
    url: '/verktyg/',
    label: 'AI-verktyg',
    shortLabel: 'Verktyg',
    h1: 'AI-verktyg på svenska 2026',
    seoTitle: 'AI-verktyg på svenska 2026: alla recensioner och jämförelser',
    seoDescription: 'Genomgångar av de bästa AI-verktygen på svenska 2026. ChatGPT, Claude, Gemini, Perplexity, Cursor och Midjourney testade hands-on av oberoende redaktion.',
    intro: 'Här samlar vi genomgångar och jämförelser av AI-verktyg på svenska, för svenska användare som faktiskt vill få jobb gjort. Vi testar varje verktyg hands-on på riktiga uppgifter, jämför mot konkurrenter och förklarar var de är bäst och var de havererar.',
    accent: 'cyan',
  },
  {
    slug: 'guider',
    url: '/guider/',
    label: 'AI-guider',
    shortLabel: 'Guider',
    h1: 'AI-guider på svenska 2026',
    seoTitle: 'AI-guider på svenska 2026: praktiska steg-för-steg-genomgångar',
    seoDescription: 'Praktiska AI-guider på svenska. Prompting, ChatGPT-funktioner, AI i Excel, sammanfatta dokument och bygga AI-arbetsflöden steg för steg.',
    intro: 'AI-guider på svenska som tar dig från registrering till färdigt resultat. Steg för steg, med konkreta promptar och verktygsval, oavsett om det gäller ChatGPT, Copilot, Gemini eller någon annan tjänst.',
    accent: 'cyan',
  },
  {
    slug: 'jobb',
    url: '/jobb/',
    label: 'AI jobb och företag',
    shortLabel: 'Jobb',
    h1: 'AI jobb och företag: så används AI på svenska arbetsplatser',
    seoTitle: 'AI jobb och företag: så används AI på svenska arbetsplatser 2026',
    seoDescription: 'AI jobb, småföretag, mötesprotokoll, automation och kundtjänst. Hur AI faktiskt används på svenska arbetsplatser, vad som fungerar och AI-policy.',
    intro: 'AI jobb och företagsanvändning förändrar svenska arbetsplatser snabbare än policydokumenten hänger med. Här tittar vi på vad som faktiskt fungerar i praktiken, vad som inte fungerar, och vad ledningen behöver veta innan de skalar AI-verktyg över hela organisationen.',
    accent: 'violet',
  },
  {
    slug: 'integritet',
    url: '/integritet/',
    label: 'AI-säkerhet och integritet',
    shortLabel: 'Säkerhet',
    h1: 'AI-säkerhet och integritet 2026',
    seoTitle: 'AI-säkerhet och integritet 2026: GDPR, dataskydd och deepfakes',
    seoDescription: 'AI-säkerhet, GDPR och ChatGPT, deepfakes och AI-bedrägerier. Vad du måste veta om AI och dataskydd 2026 innan du klistrar in företagets uppgifter.',
    intro: 'AI-säkerhet och integritet är 2026 ett verkligt företagsproblem, inte ett teoretiskt sådant. AI-tjänster läser, lagrar och tränar ofta på det du skickar in. Här går vi igenom riskerna konkret: vad GDPR säger om ChatGPT, hur deepfakes används i bedrägerier mot svenska företag, och hur du skyddar dig.',
    accent: 'violet',
  },
  {
    slug: 'bild-och-video',
    url: '/bild-och-video/',
    label: 'AI-bilder & video',
    shortLabel: 'Bild & video',
    h1: 'AI-bilder och AI-video på svenska 2026',
    seoTitle: 'AI-bilder och video på svenska 2026: alla guider och verktyg',
    seoDescription: 'Skapa AI-bilder och AI-video på svenska. Midjourney, DALL-E, Sora, Runway och AI-bilder gratis. Alla våra guider och verktygsjämförelser.',
    intro: 'AI-bilder och AI-video har gått från experiment till verktygslåda på två år. Vi visar hur du skapar AI-bilder gratis, vilka generatorer som faktiskt levererar, och hur juridiken kring AI-genererat innehåll fungerar i Sverige.',
    accent: 'cyan',
  },
  {
    slug: 'samhalle',
    url: '/samhalle/',
    label: 'AI och samhälle',
    shortLabel: 'Samhälle',
    h1: 'AI och samhälle 2026: EU AI Act, jobben och Sverige',
    seoTitle: 'AI och samhälle 2026: EU AI Act, jobben och svensk politik',
    seoDescription: 'AI och samhället: EU AI Act, svensk AI-strategi, AI och jobben, AI i skolan och energiåtgång. Nykter analys av AI-utvecklingen i Sverige.',
    intro: 'AI och samhället förändras parallellt. EU AI Act, svensk AI-strategi, arbetsmarknadens omställning, AI i skolan och datacenterns elförbrukning är alla delar av samma utveckling. Vi följer det som faktiskt händer i Sverige och Europa, och försöker skilja på reella effekter och hypeartiklar.',
    accent: 'violet',
  },
];

// 30 artiklar, slugs och titlar SEO-optimerade mot riktiga sökord (Ahrefs Sweden, maj 2026)
export const articles: Article[] = [
  // JOBB
  {
    slug: 'ai-agenter',
    url: '/jobb/ai-agenter/',
    title: 'AI-agenter 2026: vad de faktiskt klarar',
    excerpt: 'AI-agenter utför uppgifter på egen hand i stället för att bara svara. Vi förklarar vad agentisk AI är, vad den klarar 2026 och var den fallerar.',
    category: 'jobb', categoryLabel: 'AI jobb och företag', categoryUrl: '/jobb/',
    hero: '/images/inline/ai-agenter.webp',
    heroAlt: 'Robotassistent som arbetar vid ett skrivbord med datorskärmar',
    publishDate: '2026-06-15', readingTime: 11, cornerstone: true, published: true,
    primaryKeyword: 'ai agenter', searchVolume: 300, kd: 6,
    tags: ['ai-agenter', 'agentisk ai', 'automation'],
  },
  // VERKTYG (6)
  {
    slug: 'basta-ai-verktyg-svenska',
    url: '/verktyg/basta-ai-verktyg-svenska/',
    title: 'Bästa AI-verktygen 2026, komplett lista på svenska',
    excerpt: 'Genomgång av de bästa AI-verktygen för svenska användare: ChatGPT, Claude, Gemini, Perplexity, Cursor, Midjourney och fler: vad de gör och kostar.',
    category: 'verktyg', categoryLabel: 'AI-verktyg', categoryUrl: '/verktyg/',
    hero: '/images/inline/basta-ai-verktyg-svenska.webp',
    heroAlt: 'Laptop med flera AI-verktyg öppna i olika webbläsarflikar',
    publishDate: '2026-05-19', readingTime: 11, cornerstone: true, published: true,
    primaryKeyword: 'ai verktyg', searchVolume: 900, kd: 1,
    tags: ['AI-verktyg', 'jämförelse'],
  },
  {
    slug: 'ai-verktyg-gratis',
    url: '/verktyg/ai-verktyg-gratis/',
    title: 'AI-verktyg gratis 2026: 12 som funkar',
    excerpt: 'Vilka AI-verktyg är gratis utan att vara värdelösa? Vi går igenom 12 gratis AI-tjänster för text, bild, kod och sammanfattning, och var fällorna finns.',
    category: 'verktyg', categoryLabel: 'AI-verktyg', categoryUrl: '/verktyg/',
    hero: '/images/inline/ai-verktyg-gratis.webp',
    heroAlt: 'Skärm med gratis AI-verktyg listade',
    publishDate: '2026-05-17', readingTime: 8, published: true,
    primaryKeyword: 'ai verktyg gratis', searchVolume: 200, kd: 0,
    tags: ['gratis AI-verktyg'],
  },
  {
    slug: 'chatgpt-vs-claude',
    url: '/verktyg/chatgpt-vs-claude/',
    title: 'ChatGPT vs Claude 2026: vilken AI ska du välja till vad?',
    excerpt: 'Vi testar ChatGPT och Claude sida vid sida på svenska, kodhjälp, långa dokument och kreativ text. Konkret jämförelse av styrkor, svagheter och prisplaner.',
    category: 'verktyg', categoryLabel: 'AI-verktyg', categoryUrl: '/verktyg/',
    hero: '/images/inline/chatgpt-vs-claude.webp',
    heroAlt: 'ChatGPT- och Claude-loggor sida vid sida på mörk bakgrund',
    publishDate: '2026-05-15', readingTime: 9, cornerstone: true, published: true,
    primaryKeyword: 'chatgpt vs claude', searchVolume: 250, kd: 5,
    tags: ['ChatGPT', 'Claude'],
  },
  {
    slug: 'perplexity-svenska',
    url: '/verktyg/perplexity-svenska/',
    title: 'Perplexity AI på svenska, så fungerar AI-sökmotorn',
    excerpt: 'Perplexity är AI-sökmotorn som börjat ta marknadsandelar från Google. Vi testar hur väl den fungerar på svenska sökningar, akademiska källor och vardagsfrågor.',
    category: 'verktyg', categoryLabel: 'AI-verktyg', categoryUrl: '/verktyg/',
    hero: '/images/inline/perplexity-svenska.webp',
    heroAlt: 'Perplexity AI-gränssnittet öppnat på en svensk sökning',
    publishDate: '2026-05-13', readingTime: 7, published: true,
    primaryKeyword: 'perplexity ai', searchVolume: 350, kd: 8,
    tags: ['Perplexity', 'AI-sök'],
  },
  {
    slug: 'gemini-ai-svenska',
    url: '/verktyg/gemini-ai-svenska/',
    title: 'Gemini AI på svenska, Googles AI-assistent förklarad',
    excerpt: 'Gemini har gått från eftersläntrare till seriöst ChatGPT-alternativ. Vi går igenom funktioner, prisplaner och var Google är bättre än konkurrenterna på svenska.',
    category: 'verktyg', categoryLabel: 'AI-verktyg', categoryUrl: '/verktyg/',
    hero: '/images/inline/gemini-ai-svenska.webp',
    heroAlt: 'Google Gemini-loggan ovanpå Google-gränssnittet',
    publishDate: '2026-05-11', readingTime: 8, published: true,
    primaryKeyword: 'gemini ai', searchVolume: 200, kd: 3,
    tags: ['Gemini', 'Google'],
  },
  {
    slug: 'cursor-ai-svenska',
    url: '/verktyg/cursor-ai-svenska/',
    title: 'Cursor AI 2026: så blir du snabbare på att koda med AI',
    excerpt: 'Cursor är AI-editorn som blivit standard hos utvecklare som verkligen använder LLM:er. Vi går igenom tab-completion, agent-läget och Cursor AI vs Copilot.',
    category: 'verktyg', categoryLabel: 'AI-verktyg', categoryUrl: '/verktyg/',
    hero: '/images/inline/cursor-ai-svenska.webp',
    heroAlt: 'Cursor-editorn med AI-förslag synliga i en kodfil',
    publishDate: '2026-05-09', readingTime: 8, published: true,
    primaryKeyword: 'cursor ai', searchVolume: 150, kd: 4,
    tags: ['Cursor', 'utveckling'],
  },

  // GUIDER (5)
  {
    slug: 'chatgpt-svenska-guide',
    url: '/guider/chatgpt-svenska-guide/',
    title: 'ChatGPT på svenska: komplett guide 2026',
    excerpt: 'Allt du behöver veta om ChatGPT på svenska 2026. Skillnad gratis vs Plus, prompt-tips på svenska, säkerhet och vad du kan göra med det.',
    category: 'guider', categoryLabel: 'AI-guider', categoryUrl: '/guider/',
    hero: '/images/inline/chatgpt-svenska-guide.webp',
    heroAlt: 'ChatGPT öppnat på en svensk konversation på en laptop',
    publishDate: '2026-05-20', readingTime: 12, cornerstone: true, published: true,
    primaryKeyword: 'chatgpt svenska', searchVolume: 27000, kd: 0,
    tags: ['ChatGPT', 'svenska'],
  },
  {
    slug: 'chatgpt-gratis-svenska',
    url: '/guider/chatgpt-gratis-svenska/',
    title: 'ChatGPT gratis på svenska: så funkar det',
    excerpt: 'Du kan använda ChatGPT helt gratis på svenska. Vi går igenom vad gratisversionen ger, vilka begränsningar som finns och när du behöver Plus.',
    category: 'guider', categoryLabel: 'AI-guider', categoryUrl: '/guider/',
    hero: '/images/inline/chatgpt-gratis-svenska.webp',
    heroAlt: 'ChatGPT-gränssnitt med svensk text på en mobil och laptop',
    publishDate: '2026-05-18', readingTime: 7, cornerstone: true, published: true,
    primaryKeyword: 'chatgpt svenska gratis', searchVolume: 1500, kd: 0,
    tags: ['ChatGPT', 'gratis'],
  },
  {
    slug: 'vad-ar-chatgpt',
    url: '/guider/vad-ar-chatgpt/',
    title: 'Vad är ChatGPT? Enkel förklaring på svenska 2026',
    excerpt: 'Vad är ChatGPT? AI-assistenten från OpenAI som svarar på svenska. Enkel förklaring av vad den gör, hur den fungerar och vad du kan använda den till.',
    category: 'guider', categoryLabel: 'AI-guider', categoryUrl: '/guider/',
    hero: '/images/inline/vad-ar-chatgpt.webp',
    heroAlt: 'Person framför en dator med ChatGPT öppnat',
    publishDate: '2026-05-16', readingTime: 6, published: true,
    primaryKeyword: 'vad är chatgpt', searchVolume: 90, kd: 2,
    tags: ['ChatGPT', 'grundläggande'],
  },
  {
    slug: 'vad-ar-en-prompt',
    url: '/guider/vad-ar-en-prompt/',
    title: 'Vad är en prompt inom AI? Förklaring med 8 exempel',
    excerpt: 'En prompt är instruktionen du ger en AI. Vi förklarar vad en prompt inom AI är, varför formuleringen spelar roll och visar 8 mönster som fungerar.',
    category: 'guider', categoryLabel: 'AI-guider', categoryUrl: '/guider/',
    hero: '/images/inline/vad-ar-en-prompt.webp',
    heroAlt: 'En person skriver en prompt på en bärbar dator',
    publishDate: '2026-05-14', readingTime: 8, published: true,
    primaryKeyword: 'vad är en prompt inom ai', searchVolume: 40, kd: 1,
    tags: ['prompting'],
  },
  {
    slug: 'ai-i-excel-och-sheets',
    url: '/guider/ai-i-excel-och-sheets/',
    title: 'AI i Excel och Google Sheets: så gör du',
    excerpt: 'Copilot i Excel och Gemini i Sheets fungerar nu på riktigt. Vi visar exakt vilka uppgifter de hanterar bra och var de fortfarande spårar ur.',
    category: 'guider', categoryLabel: 'AI-guider', categoryUrl: '/guider/',
    hero: '/images/inline/ai-i-excel-och-sheets.webp',
    heroAlt: 'Excel-kalkylblad med AI-genererade formler',
    publishDate: '2026-05-12', readingTime: 7, published: true,
    primaryKeyword: 'ai i excel', searchVolume: 60, kd: 5,
    tags: ['Excel', 'Sheets'],
  },

  // JOBB (5)
  {
    slug: 'ai-for-smaforetag',
    url: '/jobb/ai-for-smaforetag/',
    title: 'AI för småföretag 2026, 6 användningsfall med faktisk ROI',
    excerpt: 'För en enmansfirma eller småföretagare är AI inte en strategifråga utan en verktygsfråga. Här är de sex användningsfallen som faktiskt sparar timmar i veckan.',
    category: 'jobb', categoryLabel: 'AI på jobbet', categoryUrl: '/jobb/',
    hero: '/images/inline/ai-for-smaforetag.webp',
    heroAlt: 'Småföretagare arbetar vid en bärbar dator i ett ljust kontor',
    publishDate: '2026-05-19', readingTime: 9, cornerstone: true, published: true,
    primaryKeyword: 'ai för småföretag', searchVolume: 80, kd: 4,
    tags: ['småföretag', 'ROI'],
  },
  {
    slug: 'ai-motesprotokoll',
    url: '/jobb/ai-motesprotokoll/',
    title: 'AI-mötesprotokoll: 5 verktyg och GDPR-fallgroparna',
    excerpt: 'Otter, Fireflies, MS Teams Copilot och Read.ai gör mötesprotokoll automatiskt. Vi går igenom kvalitet, integritetsrisk och GDPR-fallgropar.',
    category: 'jobb', categoryLabel: 'AI på jobbet', categoryUrl: '/jobb/',
    hero: '/images/inline/ai-motesprotokoll.webp',
    heroAlt: 'Videomöte på skärm med AI-genererad transkription i sidopanel',
    publishDate: '2026-05-17', readingTime: 7, published: true,
    primaryKeyword: 'ai mötesprotokoll', searchVolume: 70, kd: 3,
    tags: ['möten', 'transkription'],
  },
  {
    slug: 'ai-kundtjanst',
    url: '/jobb/ai-kundtjanst/',
    title: 'AI-kundtjänst på svenska: vad som funkar',
    excerpt: 'Chattbottar har gått från frustrerande till faktiskt användbara, om man bygger dem rätt. Genomgång av vad som krävs för en bra svensk implementation.',
    category: 'jobb', categoryLabel: 'AI på jobbet', categoryUrl: '/jobb/',
    hero: '/images/inline/ai-kundtjanst.webp',
    heroAlt: 'Person använder en chattbot på en webbplats',
    publishDate: '2026-05-14', readingTime: 7, published: true,
    primaryKeyword: 'ai kundtjänst', searchVolume: 90, kd: 8,
    tags: ['kundtjänst', 'chattbot'],
  },
  {
    slug: 'ai-policy-arbetsplats',
    url: '/jobb/ai-policy-arbetsplats/',
    title: 'AI-policy på arbetsplatsen, 7 punkter som måste finnas',
    excerpt: 'De flesta organisationers AI-policy är antingen för luddig eller för restriktiv. Här är de sju punkter som måste finnas med och en svensk mall att utgå från.',
    category: 'jobb', categoryLabel: 'AI på jobbet', categoryUrl: '/jobb/',
    hero: '/images/inline/ai-policy-arbetsplats.webp',
    heroAlt: 'Möte där policydokument diskuteras kring ett konferensbord',
    publishDate: '2026-05-11', readingTime: 9, published: true,
    primaryKeyword: 'ai policy', searchVolume: 50, kd: 2,
    tags: ['policy', 'företag'],
  },
  {
    slug: 'skugg-ai',
    url: '/jobb/skugg-ai/',
    title: 'Skugg-AI: när anställda använder AI i smyg',
    excerpt: 'Skugg-AI är när medarbetare använder AI-verktyg utan arbetsgivarens vetskap. Vi förklarar varför det uppstår, riskerna för dataläckage och GDPR, och hur företag hanterar det utan att driva användningen längre under radarn.',
    category: 'jobb', categoryLabel: 'AI jobb och företag', categoryUrl: '/jobb/',
    hero: '/images/inline/skugg-ai.webp',
    heroAlt: 'Anställd som använder en laptop på kontoret',
    publishDate: '2026-06-16', readingTime: 8, published: true,
    primaryKeyword: 'skugg-ai', searchVolume: 40, kd: 3,
    tags: ['skugg-ai', 'gdpr', 'företag'],
  },
  {
    slug: 'ai-personligt-brev-cv',
    url: '/jobb/ai-personligt-brev-cv/',
    title: 'Skriva personligt brev och CV med AI',
    excerpt: 'Rekryterare ser direkt om ett personligt brev är AI-genererat. Här är arbetsflödet som ger dig hjälp utan att avslöja sig, plus en gratis svensk prompt-mall.',
    category: 'jobb', categoryLabel: 'AI på jobbet', categoryUrl: '/jobb/',
    hero: '/images/inline/ai-personligt-brev-cv.webp',
    heroAlt: 'CV och personligt brev skrivs på laptop',
    publishDate: '2026-05-08', readingTime: 7, published: true,
    primaryKeyword: 'ai personligt brev', searchVolume: 110, kd: 4,
    tags: ['CV', 'jobbansökan'],
  },

  // INTEGRITET (5)
  {
    slug: 'gdpr-chatgpt',
    url: '/integritet/gdpr-chatgpt/',
    title: 'GDPR och ChatGPT 2026: vad får du klistra in egentligen?',
    excerpt: 'GDPR och ChatGPT krockar på flera punkter. Vi går igenom vilka datatyper som är riskabla, vad lagen säger och vilka lösningar svenska företag har.',
    category: 'integritet', categoryLabel: 'Integritet & säkerhet', categoryUrl: '/integritet/',
    hero: '/images/inline/gdpr-chatgpt.webp',
    heroAlt: 'EU-flagga och ChatGPT-loggan på en datorskärm',
    publishDate: '2026-05-18', readingTime: 10, cornerstone: true, published: true,
    primaryKeyword: 'gdpr chatgpt', searchVolume: 70, kd: 5,
    tags: ['GDPR', 'ChatGPT'],
  },
  {
    slug: 'chatgpt-detector-svenska',
    url: '/integritet/chatgpt-detector-svenska/',
    title: 'ChatGPT-detektor på svenska 2026: funkar AI-detektion?',
    excerpt: 'Vi testar de bästa ChatGPT-detektorerna på svensk text. Vad fungerar 2026, vad ger falska positiva och kan du lita på en AI-detektor på svenska?',
    category: 'integritet', categoryLabel: 'Integritet & säkerhet', categoryUrl: '/integritet/',
    hero: '/images/inline/chatgpt-detector-svenska.webp',
    heroAlt: 'AI-detektor-gränssnitt som analyserar en text',
    publishDate: '2026-05-16', readingTime: 7, published: true,
    primaryKeyword: 'chatgpt detector svenska', searchVolume: 100, kd: 0,
    tags: ['AI-detektor', 'svenska'],
  },
  {
    slug: 'dina-data-i-ai',
    url: '/integritet/dina-data-i-ai/',
    title: 'AI och dataskydd: vad ChatGPT och Claude lagrar',
    excerpt: 'AI dataskydd 2026: så hanterar OpenAI, Anthropic, Google, Microsoft, Meta och Mistral dina inputs. Vi går igenom skillnaderna i klartext för svenska användare.',
    category: 'integritet', categoryLabel: 'Integritet & säkerhet', categoryUrl: '/integritet/',
    hero: '/images/inline/dina-data-i-ai.webp',
    heroAlt: 'Server-rack i ett datacenter med blå LED-belysning',
    publishDate: '2026-05-14', readingTime: 8, published: true,
    primaryKeyword: 'ai dataskydd', searchVolume: 40, kd: 3,
    tags: ['dataskydd', 'leverantörer'],
  },
  {
    slug: 'deepfake-skydd',
    url: '/integritet/deepfake-skydd/',
    title: 'Deepfake 2026, så skyddar du dig och företaget',
    excerpt: 'AI-genererad röst och video används i bedrägerier mot svenska företag varje vecka. Genomgång av tekniken, vanliga upplägg och konkret skydd.',
    category: 'integritet', categoryLabel: 'Integritet & säkerhet', categoryUrl: '/integritet/',
    hero: '/images/inline/deepfake-skydd.webp',
    heroAlt: 'Närbild av en person framför en skärm med ansiktsigenkänning',
    publishDate: '2026-05-12', readingTime: 8, published: true,
    primaryKeyword: 'deepfake', searchVolume: 4500, kd: 72,
    tags: ['deepfake', 'bedrägeri'],
  },
  {
    slug: 'ai-bedragerier-sverige',
    url: '/integritet/ai-bedragerier-sverige/',
    title: 'AI-bedrägerier i Sverige 2026, så ser uppläggen ut',
    excerpt: 'Polisens nationella bedrägericentrum ser tre tydliga AI-mönster: röstkloning, CEO-bedrägeri och investeringsbluffar. Konkreta exempel och försvar.',
    category: 'integritet', categoryLabel: 'Integritet & säkerhet', categoryUrl: '/integritet/',
    hero: '/images/inline/ai-bedragerier-sverige.webp',
    heroAlt: 'Mobiltelefon som tar emot ett misstänkt samtal',
    publishDate: '2026-05-09', readingTime: 7, published: true,
    primaryKeyword: 'ai bedrägeri', searchVolume: 50, kd: 6,
    tags: ['bedrägeri', 'säkerhet'],
  },

  // BILD & VIDEO (5)
  {
    slug: 'ai-bilder-gratis',
    url: '/bild-och-video/ai-bilder-gratis/',
    title: 'AI-bilder gratis 2026: 10 verktyg som faktiskt fungerar',
    excerpt: 'Vi har testat 10 helt gratis AI-bildverktyg på svenska. Här är de bästa för AI-bilder gratis, vad du får utan att betala och vilka begränsningar som gäller.',
    category: 'bild-och-video', categoryLabel: 'AI-bilder & video', categoryUrl: '/bild-och-video/',
    hero: '/images/inline/ai-bilder-gratis.webp',
    heroAlt: 'Skärm med olika AI-genererade bilder i ett galleri',
    publishDate: '2026-05-20', readingTime: 10, cornerstone: true, published: true,
    primaryKeyword: 'ai bilder gratis', searchVolume: 1200, kd: 1,
    tags: ['AI-bilder', 'gratis'],
  },
  {
    slug: 'skapa-ai-bilder',
    url: '/bild-och-video/skapa-ai-bilder/',
    title: 'Skapa AI-bilder: guide från prompt till bild',
    excerpt: 'Så skapar du AI-bilder från grunden. Vi går igenom prompt-struktur, val av verktyg, upplösning och de fem misstag nybörjare gör när de börjar skapa AI-bilder.',
    category: 'bild-och-video', categoryLabel: 'AI-bilder & video', categoryUrl: '/bild-och-video/',
    hero: '/images/inline/skapa-ai-bilder.webp',
    heroAlt: 'Hand som skriver en bildprompt vid en dator med AI-resultat',
    publishDate: '2026-05-18', readingTime: 9, cornerstone: true, published: true,
    primaryKeyword: 'skapa ai bilder', searchVolume: 700, kd: 0,
    tags: ['AI-bilder', 'guide'],
  },
  {
    slug: 'ai-genererade-bilder',
    url: '/bild-och-video/ai-genererade-bilder/',
    title: 'AI-genererade bilder: bästa verktygen 2026',
    excerpt: 'AI-genererade bilder har blivit mainstream. Vi förklarar tekniken bakom AI-genererade bilder, jämför de fyra stora modellerna och visar bildresultat.',
    category: 'bild-och-video', categoryLabel: 'AI-bilder & video', categoryUrl: '/bild-och-video/',
    hero: '/images/inline/ai-genererade-bilder.webp',
    heroAlt: 'Fyra AI-genererade bilder bredvid varandra på en skärm',
    publishDate: '2026-05-16', readingTime: 9, published: true,
    primaryKeyword: 'ai genererade bilder', searchVolume: 1500, kd: 0,
    tags: ['AI-bilder', 'bildmodeller'],
  },
  {
    slug: 'midjourney-svenska',
    url: '/bild-och-video/midjourney-svenska/',
    title: 'Midjourney på svenska, komplett guide för 2026',
    excerpt: 'Midjourney är fortfarande tongivande för bildkvalitet. Vi går igenom prompt-struktur, parametrar, priser och de fem misstag nybörjare gör.',
    category: 'bild-och-video', categoryLabel: 'AI-bilder & video', categoryUrl: '/bild-och-video/',
    hero: '/images/inline/midjourney-svenska.webp',
    heroAlt: 'AI-genererad bild från Midjourney med abstrakta former',
    publishDate: '2026-05-13', readingTime: 8, published: true,
    primaryKeyword: 'midjourney svenska', searchVolume: 90, kd: 2,
    tags: ['Midjourney'],
  },
  {
    slug: 'sora-ai-video',
    url: '/bild-och-video/sora-ai-video/',
    title: 'Sora AI-video, så fungerar OpenAI:s videomodell',
    excerpt: 'Sora 2 öppnade upp för bredare publik 2026. Genomgång av styrkor, svagheter, prismodell och var den fortfarande kraschar i praktiken.',
    category: 'bild-och-video', categoryLabel: 'AI-bilder & video', categoryUrl: '/bild-och-video/',
    hero: '/images/inline/sora-ai-video.webp',
    heroAlt: 'AI-genererad video-frame i ett redigeringsprogram',
    publishDate: '2026-05-10', readingTime: 8, published: true,
    primaryKeyword: 'sora ai', searchVolume: 200, kd: 5,
    tags: ['Sora', 'AI-video'],
  },

  // SAMHÄLLE (5)
  {
    slug: 'eu-ai-act-sverige',
    url: '/samhalle/eu-ai-act-sverige/',
    title: 'EU AI Act 2026, vad det betyder i Sverige',
    excerpt: 'EU:s AI-förordning har börjat gälla stegvis sedan 2024. Vi förklarar vad som faktiskt påverkar dig som användare eller företagare i Sverige 2026.',
    category: 'samhalle', categoryLabel: 'AI & samhälle', categoryUrl: '/samhalle/',
    hero: '/images/inline/eu-ai-act-sverige.webp',
    heroAlt: 'EU-flaggan vid ett modernt parlamentsbyggnad',
    publishDate: '2026-05-19', readingTime: 9, cornerstone: true, published: true,
    primaryKeyword: 'eu ai act', searchVolume: 250, kd: 12,
    tags: ['EU AI Act', 'reglering'],
  },
  {
    slug: 'ai-sverige-strategi',
    url: '/samhalle/ai-sverige-strategi/',
    title: 'Sveriges AI-strategi 2026: vad som händer',
    excerpt: 'Regeringen har lagt fram en uppdaterad AI-strategi. Vi går igenom vad som faktiskt är finansierat, vad som är ord och hur Sverige står sig i Europa.',
    category: 'samhalle', categoryLabel: 'AI & samhälle', categoryUrl: '/samhalle/',
    hero: '/images/inline/ai-sverige-strategi.webp',
    heroAlt: 'Riksdagshuset i Stockholm i kvällsljus',
    publishDate: '2026-05-17', readingTime: 8, published: true,
    primaryKeyword: 'sverige ai strategi', searchVolume: 30, kd: 4,
    tags: ['Sverige', 'politik'],
  },
  {
    slug: 'ai-och-jobben',
    url: '/samhalle/ai-och-jobben/',
    title: 'AI och jobben, vilka yrken förändras faktiskt i Sverige?',
    excerpt: 'Konsulternas rapporter säger en sak. SCB-statistiken säger en annan. Vi går igenom vad de hårda siffrorna för 2024-2026 faktiskt visar.',
    category: 'samhalle', categoryLabel: 'AI & samhälle', categoryUrl: '/samhalle/',
    hero: '/images/inline/ai-och-jobben.webp',
    heroAlt: 'Öppet kontorslandskap med människor som arbetar',
    publishDate: '2026-05-15', readingTime: 8, published: true,
    primaryKeyword: 'ai och jobben', searchVolume: 70, kd: 6,
    tags: ['arbetsmarknad'],
  },
  {
    slug: 'ai-i-skolan',
    url: '/samhalle/ai-i-skolan/',
    title: 'AI i skolan: vad forskningen säger',
    excerpt: 'Svenska kommuner har olika linjer om AI i klassrummet. Genomgång av vad forskningen säger om lärande, fusk och rättvisa konsekvenser.',
    category: 'samhalle', categoryLabel: 'AI & samhälle', categoryUrl: '/samhalle/',
    hero: '/images/inline/ai-i-skolan.webp',
    heroAlt: 'Klassrum med elever framför bärbara datorer',
    publishDate: '2026-05-12', readingTime: 8, published: true,
    primaryKeyword: 'ai i skolan', searchVolume: 110, kd: 7,
    tags: ['skola', 'utbildning'],
  },
  {
    slug: 'ai-energi-elforbrukning',
    url: '/samhalle/ai-energi-elforbrukning/',
    title: 'AI och elförbrukning: vad en prompt drar',
    excerpt: 'Påståenden om att en ChatGPT-prompt motsvarar tio googlingar i energi cirkulerar friskt. Vi kollar källorna och vad som faktiskt stämmer för svenska siffror.',
    category: 'samhalle', categoryLabel: 'AI & samhälle', categoryUrl: '/samhalle/',
    hero: '/images/inline/ai-energi-elforbrukning.webp',
    heroAlt: 'Datacenter med energianläggning i bakgrunden',
    publishDate: '2026-05-08', readingTime: 8, published: true,
    primaryKeyword: 'ai energi', searchVolume: 40, kd: 5,
    tags: ['energi', 'klimat'],
  },
];

export const publishedArticles = articles.filter(a => a.published);

export function articlesByCluster(clusterSlug: string): Article[] {
  return publishedArticles.filter(a => a.category === clusterSlug);
}

export function recentArticles(n: number = 6): Article[] {
  return [...publishedArticles].sort((a, b) => b.publishDate.localeCompare(a.publishDate)).slice(0, n);
}

export function articleBySlug(category: string, slug: string): Article | undefined {
  return articles.find(a => a.category === category && a.slug === slug);
}

export function relatedArticles(current: Article, n: number = 3): Article[] {
  const sameCategory = publishedArticles.filter(a => a.category === current.category && a.slug !== current.slug);
  const others = publishedArticles.filter(a => a.category !== current.category && a.slug !== current.slug);
  return [...sameCategory, ...others].slice(0, n);
}
