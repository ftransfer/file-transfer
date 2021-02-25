const CopyPlugin = require("copy-webpack-plugin");
const Path = require("path");
const clientProject = Path.resolve(__dirname, "client", "_client");
const dest = Path.resolve(__dirname, "app");
module.exports = {
  // main process' webpack config
  webpack: (defaultConfig, env) => {
    return defaultConfig;
  },
};
