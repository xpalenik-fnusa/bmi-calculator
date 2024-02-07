const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Add the NodePolyfillPlugin to the plugins array
  // START OF NodePolyfillPlugin
  if (!config.plugins) {
    config.plugins = [];
  }
  config.plugins.push(new NodePolyfillPlugin());
  // END OF NodePolyfillPlugin

  return config;
};
