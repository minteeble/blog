const format = require("xml-formatter");
const fs = require("fs");
const axios = require("axios");

const endpoint = "https://cms-blog-backend.minteeble.com/mintql";

const query = `{
  posts {
    edges {
      node {
        language {
          slug
        }
        categories {
          edges {
            node {
              slug
            }
          }
        }
        slug
        modifiedGmt
      }
    }
  }
}`;

axios({
  url: endpoint,
  method: "post",
  data: {
    query: query,
  },
}).then((result) => {
  let urls = [];
  let short = result.data.data.posts.edges;
  const node =
    result.data.data.posts.edges.length > 0
      ? result.data.data.posts.edges.length
      : 0;
  for (let i = 0; i < node; i++) {
    let x = {
      loc: `https://blog-test.minteeble.com/${short[i].node.language.slug}/${short[i].node.categories.edges[0].node.slug}/${short[i].node.slug}`,
      lastmod: short[i].node.modifiedGmt,
    };
    urls.push(x);
  }

  console.log(node);

  fs.writeFileSync("./public/sitemap.xml", generateSitemapItems(urls));
});

function generateSitemapItems(urls) {
  return format(
    `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="//cms-blog-backend.minteeble.com/wp-content/plugins/wordpress-seo/css/sitemap.xml"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
      .map((x) => {
        return `<sitemap><loc>${x.loc}</loc><lastmod>${x.lastmod}</lastmod></sitemap>`;
      })
      .join("")}</sitemapindex>`
  );
}
