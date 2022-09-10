const Encore = require("@symfony/webpack-encore");
const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || "dev");
}

Encore.setOutputPath("public/build/")
  .setPublicPath("/build")
  .addEntry("main", "./src/main.tsx")
  .copyFiles({
    from: "./src/images",
    to: "[path][name].[ext]",
    context: "./src",
  })
  .disableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableSourceMaps(!Encore.isProduction())
  .configureBabel((config) => {
    config.plugins.push("@babel/plugin-proposal-class-properties");
  })
  .configureBabelPresetEnv((config) => {
    config.useBuiltIns = "usage";
    config.corejs = 3;
  })
  .enableSassLoader()
  .enableTypeScriptLoader()
  .enablePostCssLoader()
  .enableReactPreset()
  .addPlugin(new NodePolyfillPlugin());

module.exports = Encore.getWebpackConfig();
