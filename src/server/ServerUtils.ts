import { MetaInfo } from "./types";

export class ServerUtils {
  public static readonly pathRegex = /^[\/](en|it)[\/][A-Za-z0-9_-]+[\/][A-Za-z0-9_-]+/;

  public static isPathValid(path: string): boolean {
    return this.pathRegex.test(path);
  }

  // public static getPostMetaInfo = async (path: string): Promise<MetaInfo> =>  {

  // }
}
