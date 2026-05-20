import rss from '@astrojs/rss';
import { publishedArticles } from '../data/articles';
import { site } from '../data/site';

export async function GET(context: any) {
  return rss({
    title: site.name,
    description: site.description,
    site: context.site,
    items: publishedArticles
      .sort((a, b) => b.publishDate.localeCompare(a.publishDate))
      .map(a => ({
        title: a.title,
        description: a.excerpt,
        link: a.url,
        pubDate: new Date(a.publishDate),
        categories: [a.categoryLabel],
      })),
    customData: '<language>sv-se</language>',
  });
}
