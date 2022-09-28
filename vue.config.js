const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'build',
  assetsDir: 'assets',
  runtimeCompiler: true,
  productionSourceMap: false,

  css: {
    sourceMap: true,
    loaderOptions: {
      stylus: {},
    },
  },

  pluginOptions: {},
  publicPath: ''
});
