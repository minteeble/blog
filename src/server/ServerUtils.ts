//@ts-ignore
import { MetaInfo } from "./types";
const axios = require("axios");

export class ServerUtils {
  public static readonly pathRegex = /^[\/](en|it)[\/][A-Za-z0-9_-]+[\/][A-Za-z0-9_-]+/;

  public static isPathValid(path: string): boolean {
    return this.pathRegex.test(path);
  }

  public static getMetaInfo(path: string): MetaInfo {
    const endpoint = "https://cms-blog-backend.minteeble.com/mintql";

    const query = ``;
    axios({
      url: endpoint,
      method: "post",
      data: {
        query: query,
      },
    }).then((result) => {
      if (result.data.data.post === null) {
      } else {
      }
    });
  }

  // public static getPostMetaInfo = async (path: string): Promise<MetaInfo> =>  {

  // }
}
