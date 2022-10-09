const format = require("xml-formatter");
const fs = require("fs");

let postUrls = [
  {
    loc: "URL1",
    lastmod: "TIMESTAMP",
  },
];

setTimeout(() => {
  fs.writeFileSync("./public/sitemap.xml", generateSitemapItems(postUrls));
}, 500);

function generateSitemapItems(urls) {
  return format(
    `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="//cms-blog-backend.minteeble.com/wp-content/plugins/wordpress-seo/css/main-sitemap.xsl"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(
      (x) => {
        return `<sitemap><loc>${x.loc}</loc><lastmod>${x.lastmod}</lastmod></sitemap>`;
      }
    )}</sitemapindex>`
  );
}
