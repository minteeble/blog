import { Config } from "./config";
//@ts-ignore
import { MetaInfo, Stats } from "./types";

/**
 * This HTML file acts as a template that we insert all our generated
 * application code into before sending it to the client as regular HTML.
 * Note we're returning a template string from this function.
 */
const html = ({
  meta,
  stats,
  content,
  config,
  css = "",
}: {
  meta: MetaInfo;
  stats: Stats;
  content: string;
  config: Config;
  css?: string;
}): string => {
  console.log("Settings: ", config);
  console.log("CO");

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      <meta name="theme-color" content="${config.app.THEME_COLOR}" />
      <title>${meta.title}</title>
      <meta name="description" content="${meta.description}">
      <meta property="og:title" content="${meta.title}">
      <meta property="og:description" content="${meta.description}">
      <meta property="og:image" content="${meta.image}">

      <meta name="twitter:card" content="summary_large_image">


      <link rel="manifest" href="${config.app.PUBLIC_URL}/manifest.json" />
      <link rel="shortcut icon" href="${config.app.PUBLIC_URL}/favicon.ico" />
      ${stats.styles
        .map((filename) => `<link rel="stylesheet" href="${config.app.DIST_URL}/${filename}" />`)
        .join("\n")}
      <style id="jss-server-side">${css}</style>
      <script id="config-server-side">
        window.__CONFIG__ = ${JSON.stringify(config)};
      </script>
    </head>
    <body class="minteeble-dark-theme">
      <div id="root">${content}</div>
      ${stats.scripts
        .map((filename) => `<script src="${config.app.DIST_URL}/${filename}" crossorigin></script>`)
        .join("\n")}
    </body>
  </html>`;
};

export default html;
