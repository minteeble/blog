//@ts-ignore
import format from "xml-formatter";
import { MetaInfo } from "./types";
const fs = require("fs");
const axios = require("axios");

export class ServerUtils {
  public static readonly pathRegex = /^[\/](en|it)[\/][A-Za-z0-9_-]+[\/][A-Za-z0-9_-]+/;

  public static readonly sitemapRegex = /^[\/]sitemap[\.]xml[\/]{0,1}$/;

  public static readonly feedRegex = /^[\/]((en|it)[\/]|(en|it)[\/][A-Za-z0-9_-]+[\/][A-Za-z0-9_-]+[\/])feed/;

  public static isPostPathValid(path: string): boolean {
    return this.pathRegex.test(path);
  }

  public static isFeedPathValid(path: string): boolean {
    return this.feedRegex.test(path);
  }

  public static getPostMetaInfo = async (path: string): Promise<MetaInfo> => {
    const endpoint = "https://cms-blog-backend.minteeble.com/mintql";

    const defaultMetaInfo: MetaInfo = {
      title: "Minteeble",
      description: "Minteeble article",
      image: "https://cms-blog-backend.minteeble.com/wp-content/uploads/2022/09/Desktop-1.jpg",
    };

    let res: MetaInfo = {
      title: "",
      description: "",
      image: "",
    };

    const query = `{
      post(id: "${path}", idType: URI) {
        seo {
          title
          metaDesc
          opengraphImage {
            guid
          }
        }
      }
    }`;

    let result = await axios({
      url: endpoint,
      method: "post",
      data: {
        query: query,
      },
    });

    if (result.data.data.post === null) {
      res = defaultMetaInfo;
    } else {
      const seoInfo = result.data.data.post.seo;

      res.title = seoInfo.title;
      res.image = seoInfo.opengraphImage.guid;
      res.description = seoInfo.metaDesc;
    }

    return res;
  };

  public static getMetaInfo(path: string): MetaInfo | Promise<MetaInfo> {
    const defaultMetaInfo: MetaInfo = {
      title: "Minteeble",
      description: "Minteeble article",
      image: "https://cms-blog-backend.minteeble.com/wp-content/uploads/2022/09/Desktop-1.jpg",
    };

    let isValid = this.isPostPathValid(path);

    if (!isValid) {
      return defaultMetaInfo;
    }

    return this.getPostMetaInfo(path);
  }

  public static isSitemapPathValid(path: string): boolean {
    return this.sitemapRegex.test(path);
  }

  public static getSitemap = async () => {
    const endpoint = "https://cms-blog-backend.minteeble.com/mintql";

    const queryIt = `{
                    posts(where: {language: IT}) {
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

    const queryEn = `
    {
      posts(where: {language: EN}) {
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
    }
    `;

    let promiseIt = axios({
      url: endpoint,
      method: "post",
      data: {
        query: queryIt,
      },
    });

    let promiseEn = axios({
      url: endpoint,
      method: "post",
      data: {
        query: queryEn,
      },
    });

    let [resultIt, resultEn] = await Promise.all([promiseIt, promiseEn]);

    let urls = [];
    let short = [...resultEn.data.data.posts.edges, ...resultIt.data.data.posts.edges];
    const node = short.length > 0 ? short.length : 0;
    for (let i = 0; i < node; i++) {
      let x = {
        loc: `https://blog.minteeble.com/${short[i].node.language.slug}/${short[i].node.categories.edges[0].node.slug}/${short[i].node.slug}`,
        lastmod: short[i].node.modifiedGmt,
      };
      urls.push(x);
    }

    // console.log(node);

    let outData = format(
      `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
        .map((x) => {
          return `<url><loc>${x.loc}</loc><lastmod>${x.lastmod}+00:00</lastmod></url>`;
        })
        .join("")}</urlset>`,
    );

    // fs.writeFileSync("./public/sitemap.xml", outData);
    return outData;
  };

  public static getFeed = async (path: string) => {
    let isValid = this.isFeedPathValid(path);

    if (!isValid) {
      return "<mock></mock>";
    }

    let wpPath = "https://cms-blog-backend.minteeble.com" + path;

    let result = await axios({
      url: wpPath,
      method: "get",
    });

    let res = result.data.replace(/cms-blog-backend/gi, "blog");

    res = res.replace(
      /https:[\/][\/]blog\.minteeble\.com[\/]wp-content[\/]/gi,
      "https://cms-blog-backend.minteeble.com/wp-content/",
    );

    return format(res);
  };
}
