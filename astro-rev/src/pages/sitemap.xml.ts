import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const projects = await getCollection('projects');

  const staticPages: Array<{ url: string; priority: string; changefreq: string; lastmod?: string }> = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: 'services', priority: '0.9', changefreq: 'weekly' },
    { url: 'projects', priority: '0.9', changefreq: 'weekly' },
    { url: 'dumpsters', priority: '0.8', changefreq: 'monthly' },
    { url: 'contact', priority: '0.7', changefreq: 'monthly' },
    { url: 'privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { url: 'terms-of-service', priority: '0.3', changefreq: 'yearly' }
  ];

  const projectPages = projects.map(project => ({
    url: `projects/${project.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: project.data.date.toISOString().split('T')[0]
  }));

  const allPages = [...staticPages, ...projectPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>https://www.joetheguy.com/${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${page.lastmod ? `
    <lastmod>${page.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
