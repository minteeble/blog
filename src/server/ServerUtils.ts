//@ts-ignore
import format from "xml-formatter";
import { MetaInfo } from "./types";
const fs = require("fs");
const axios = require("axios");

export class ServerUtils {
  public static readonly postRegex = /^[\/](en|it)[\/][A-Za-z0-9_-]+[\/][A-Za-z0-9_-]+/;

  public static readonly topicRegex = /^[\/](en|it)[\/][A-Za-z0-9_-]+/;

  public static readonly homeRegex = /^[\/](en|it)+/;

  public static readonly sitemapRegex = /^[\/]sitemap[\.]xml[\/]{0,1}$/;

  public static readonly feedRegex = /^[\/]((en|it)[\/]|(en|it)[\/][A-Za-z0-9_-]+[\/][A-Za-z0-9_-]+[\/])feed/;

  public static isPostPathValid(path: string): boolean {
    return this.postRegex.test(path);
  }

  public static isTopicPathValid(path: string): boolean {
    return this.topicRegex.test(path);
  }

  public static isHomePathValid(path: string): boolean {
    return this.homeRegex.test(path);
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

      res.title = seoInfo.title || "Minteeble";
      res.image =
        seoInfo.opengraphImage?.guid ||
        "https://cms-blog-backend.minteeble.com/wp-content/uploads/2022/09/Desktop-1.jpg";
      res.description = seoInfo.metaDesc || "Minteeble Article";
    }

    return res;
  };

  public static getHomeMetaInfo = (path: string): MetaInfo => {
    let res: MetaInfo = {
      title: "",
      description: "",
      image: "",
    };

    if (path.slice(1, 3) === "it") {
      res = {
        title: "Minteeble blog",
        description: "Benvenuto nel blog di Minteeble",
        image: "https://cms-blog-backend.minteeble.com/wp-content/uploads/2022/09/Desktop-1.jpg",
      };
    } else {
      res = {
        title: "Minteeble blog",
        description: "Welcome in the blog of Minteeble",
        image: "https://cms-blog-backend.minteeble.com/wp-content/uploads/2022/09/Desktop-1.jpg",
      };
    }

    return res;
  };

  public static getTopicMetaInfo = async (path: string): Promise<MetaInfo> => {
    const endpoint = "https://cms-blog-backend.minteeble.com/mintql";

    let res: MetaInfo = {
      title: "",
      description: "",
      image: "",
    };

    const topic = path.slice(4, path.length);

    const query = `{
      posts(where: {categoryName: "${topic}"}) {
        edges {
          node {
            featuredImage {
              node {
                guid
              }
            }
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

    res.title = topic.charAt(0).toUpperCase() + topic.slice(1);
    res.description = path.slice(1, 3) === "it" ? `Tutti gli articoli su ${topic}` : `All articles about ${topic}`;
    res.image = result.data.data.posts.edges[0].node.featuredImage.node.guid;

    return res;
  };

  public static getMetaInfo(path: string): MetaInfo | Promise<MetaInfo> {
    const defaultMetaInfo: MetaInfo = {
      title: "Minteeble",
      description: "Minteeble article",
      image: "https://cms-blog-backend.minteeble.com/wp-content/uploads/2022/09/Desktop-1.jpg",
    };

    if (this.isPostPathValid(path)) {
      return this.getPostMetaInfo(path);
    }

    if (this.isTopicPathValid(path)) {
      return this.getTopicMetaInfo(path);
    }

    if (this.isHomePathValid(path)) {
      return this.getHomeMetaInfo(path);
    }

    return defaultMetaInfo;
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

    const topicQueryEn = `{
      categories(where: {language: EN}) {
        nodes {
          uri
          posts {
            edges {
              node {
                uri
                modifiedGmt
              }
            }
          }
        }
      }
    }`;

    const topicQueryIt = `{
      categories(where: {language: IT}) {
        nodes {
          uri
          posts {
            edges {
              node {
                uri
                modifiedGmt
              }
            }
          }
        }
      }
    }`;

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

    let promiseTopicEn = axios({
      url: endpoint,
      method: "post",
      data: {
        query: topicQueryEn,
      },
    });

    let promiseTopicIt = axios({
      url: endpoint,
      method: "post",
      data: {
        query: topicQueryIt,
      },
    });

    let [resultIt, resultEn, resultTopicEn, resultTopicIt] = await Promise.all([
      promiseIt,
      promiseEn,
      promiseTopicEn,
      promiseTopicIt,
    ]);

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

    let topic = [];
    const topicShort = [...resultTopicEn.data.data.categories.nodes, ...resultTopicIt.data.data.categories.nodes];
    const topicNode = topicShort.length > 0 ? topicShort.length : 0;
    for (let i = 0; i < topicNode; i++) {
      if (topicShort[i].posts.edges.length > 0) {
        let x = {
          loc: `https://blog.minteeble.com${topicShort[i].uri.replace("category/", "")}`,
          lastmod: `${topicShort[i].posts.edges[0].node.modifiedGmt}`,
        };
        topic.push(x);
      }
    }

    let outData = format(
      `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url><loc>https://blog.minteeble.com</loc><lastmod>${
        urls[0].lastmod
      }+00:00</lastmod></url><url><loc>https://blog.minteeble.com/en</loc><lastmod>${
        urls[0].lastmod
      }+00:00</lastmod></url><url><loc>https://blog.minteeble.com/it</loc><lastmod>${
        urls[urls.length / 2].lastmod
      }+00:00</lastmod></url>
      ${urls
        .map((x) => {
          return `<url><loc>${x.loc}</loc><lastmod>${x.lastmod}+00:00</lastmod></url>`;
        })
        .join("")}${topic
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
