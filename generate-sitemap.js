const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');

// Ajoutez ici toutes les routes de votre site
const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/nos-services', changefreq: 'weekly', priority: 0.8 },
  { url: '/matelasseur-de-cartons', changefreq: 'weekly', priority: 0.8 },
  { url: '/destructeurs-de-documents/:category', changefreq: 'weekly', priority: 0.8 },
  { url: '/search-results', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/:id', changefreq: 'weekly', priority: 0.8 },
  { url: '/matelasseurs/:id', changefreq: 'weekly', priority: 0.8 },
  { url: '/location-destructeurs/:category', changefreq: 'weekly', priority: 0.8 },
  { url: '/location/destructeur/:id', changefreq: 'weekly', priority: 0.8 },
  { url: '/utilisation', changefreq: 'monthly', priority: 0.5 },
  { url: '/contact', changefreq: 'monthly', priority: 0.5 },
  { url: '/faq', changefreq: 'monthly', priority: 0.5 },
  { url: '/mentions-legales', changefreq: 'monthly', priority: 0.5 },
  { url: '/conditions-generales-de-vente', changefreq: 'monthly', priority: 0.5 },
];

(async () => {
  const sitemap = new SitemapStream({ hostname: 'https://destructeurs-archives.fr' });
  routes.forEach(route => sitemap.write(route));
  sitemap.end();

  const sitemapBuffer = await streamToPromise(sitemap);
  fs.writeFileSync('./public/sitemap.xml', sitemapBuffer.toString());
  console.log('✅ Sitemap généré avec succès !');
})();
