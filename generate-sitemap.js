const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');

// Liste de toutes les URLs
const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/nos-services', changefreq: 'weekly', priority: 0.8 },
  { url: '/destructeurs-de-documents/toutes-les-machines', changefreq: 'weekly', priority: 0.8 },
  { url: '/destructeurs-de-documents/destructeurs-de-bureau', changefreq: 'weekly', priority: 0.8 },
  { url: '/destructeurs-de-documents/destructeurs-de-forte-capacité', changefreq: 'weekly', priority: 0.8 },
  { url: '/destructeurs-de-documents/destructeurs-de-données', changefreq: 'weekly', priority: 0.8 },
  { url: '/destructeurs-de-documents/p-1', changefreq: 'weekly', priority: 0.8 },
  { url: '/destructeurs-de-documents/p-2', changefreq: 'weekly', priority: 0.8 },
  { url: '/destructeurs-de-documents/p-3', changefreq: 'weekly', priority: 0.8 },
  { url: '/destructeurs-de-documents/p-4', changefreq: 'weekly', priority: 0.8 },
  { url: '/destructeurs-de-documents/p-5', changefreq: 'weekly', priority: 0.8 },
  { url: '/destructeurs-de-documents/p-6', changefreq: 'weekly', priority: 0.8 },
  { url: '/destructeurs-de-documents/p-7', changefreq: 'weekly', priority: 0.8 },
  { url: '/destructeurs-de-documents/ideal', changefreq: 'weekly', priority: 0.8 },
  { url: '/destructeurs-de-documents/hsm', changefreq: 'weekly', priority: 0.8 },
  { url: '/destructeurs-de-documents/coupe-croisée', changefreq: 'weekly', priority: 0.8 },
  { url: '/destructeurs-de-documents/coupe-fibres', changefreq: 'weekly', priority: 0.8 },
  { url: '/destructeurs-de-documents/sacs-plastique', changefreq: 'weekly', priority: 0.8 },
  { url: '/destructeurs-de-documents/huiles-de-lubrification', changefreq: 'weekly', priority: 0.8 },
  { url: '/destructeurs-de-documents/sacs-en-papier-kraft', changefreq: 'weekly', priority: 0.8 },
  { url: '/destructeurs-de-documents/fil-de-ligature', changefreq: 'weekly', priority: 0.8 },
  { url: '/destructeurs-de-documents/lingettes-de-nettoyage', changefreq: 'weekly', priority: 0.8 },
  { url: '/location-destructeurs/Toutes-les-Locations', changefreq: 'weekly', priority: 0.8 },
  { url: '/location-destructeurs/Location-Destructeurs-de-bureau', changefreq: 'weekly', priority: 0.8 },
  { url: '/location-destructeurs/Location-Destructeurs-de-forte-capacité', changefreq: 'weekly', priority: 0.8 },
  { url: '/matelasseur-de-cartons', changefreq: 'weekly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.5 },
  { url: '/search-results', changefreq: 'weekly', priority: 0.8 },
  { url: '/faq', changefreq: 'monthly', priority: 0.5 },
  { url: '/utilisation', changefreq: 'monthly', priority: 0.5 },
  { url: '/mentions-legales', changefreq: 'monthly', priority: 0.5 },
  { url: '/conditions-generales-de-vente', changefreq: 'monthly', priority: 0.5 },
  // URLs supplémentaires
  { url: '/machines/destructeur-hsm-powerline-450-2-3-9-x-40-mm', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-hsm-powerline-fa-400-2-5-8-mm', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-hsm-powerline-fa-500-3-10-5-x-40-76-mm', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-hsm-powerline-sp-4040-v-5-8-mm', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-hsm-powerline-sp-5080-10-5-x-40-76-mm', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-hsm-powerline-sp-5088-10-5-x-40-76-mm', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-hsm-securio-af500-4-5-x-30-mm', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-hsm-securio-b35-3-9-mm', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-hsm-securio-p36i-3-9-mm', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-hsm-securio-p40i-3-9-mm', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-hsm-securio-p44i-3-9-mm', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-ideal-2503-cf', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-ideal-2604-cc-o', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-ideal-2604-cf', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-ideal-2605-smc', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-ideal-3104-cc-o', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-ideal-3104-cf', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-ideal-3105-cc', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-ideal-3804-cf', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-ideal-4001-cf', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-ideal-4001-smc-o', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-ideal-4002-cc', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-ideal-4003-cc-o', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-ideal-4003-cf', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-ideal-4005-cf', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-ideal-4108-cf', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-ideal-4600-cc', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-ideal-4606-cc', changefreq: 'weekly', priority: 0.8 },
  { url: '/machines/destructeur-ideal-5009-2-cc', changefreq: 'weekly', priority: 0.8 },
  { url: '/location/destructeur/ideal%203803', changefreq: 'weekly', priority: 0.8 },
  { url: '/location/destructeur/ideal%204004', changefreq: 'weekly', priority: 0.8 },
  { url: '/location/destructeur/ideal%204005', changefreq: 'weekly', priority: 0.8 },
  { url: '/location/destructeur/ideal%204600%20CC', changefreq: 'weekly', priority: 0.8 },
  { url: '/location/destructeur/intimus%2014.95%20S', changefreq: 'weekly', priority: 0.8 },
  { url: '/matelasseurs/HSM%20ProfiPack%20C400', changefreq: 'weekly', priority: 0.8 },
  { url: '/matelasseurs/HSM%20ProfiPack%20P425', changefreq: 'weekly', priority: 0.8 }
];

(async () => {
  const sitemap = new SitemapStream({ hostname: 'https://destructeurs-archives.fr' });
  routes.forEach(route => sitemap.write(route));
  sitemap.end();

  const sitemapBuffer = await streamToPromise(sitemap);
  fs.writeFileSync('./public/sitemap.xml', sitemapBuffer.toString());
  console.log('✅ Sitemap généré avec succès !');
})();
