//@ts-ignore
import { MetaInfo } from "./types";
const axios = require("axios");

export class ServerUtils {
  public static readonly pathRegex = /^[\/](en|it)[\/][A-Za-z0-9_-]+[\/][A-Za-z0-9_-]+/;

  public static isPathValid(path: string): boolean {
    return this.pathRegex.test(path);
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

    axios({
      url: endpoint,
      method: "post",
      data: {
        query: query,
      },
    }).then((result: any) => {
      if (result.data.data.post === null) {
        res = defaultMetaInfo;
      } else {
        const x = result.data.data.seo;

        res.title = x.title;
        res.image = x.opengraphImage.guid;
        res.description = x.metaDesc;
      }
    });
    return res;
  };

  public static getMetaInfo(path: string): MetaInfo | Promise<MetaInfo> {
    const defaultMetaInfo: MetaInfo = {
      title: "Minteeble",
      description: "Minteeble article",
      image: "https://cms-blog-backend.minteeble.com/wp-content/uploads/2022/09/Desktop-1.jpg",
    };

    let isValid = this.isPathValid(path);

    if (!isValid) {
      return defaultMetaInfo;
    }

    return this.getPostMetaInfo(path);
  }
}
