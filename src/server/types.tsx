/** Webpack `stats.json` file structure */
export type Stats = {
  scripts: string[];
  styles: string[];
};

export interface MetaInfo {
  title: string;
  description: string;
  image: string;
}
