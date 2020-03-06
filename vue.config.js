const webpack = require("webpack");
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
// The configure Web pack is the place in Vue CLI 3.0 to configure the parameters of the webpack plug-in. If you set it here, it will create or override the default configuration of the webpack.
// The meaning of webpack ProvidePlugin is to create a global variable that can be used within each module of webpack. The configuration meaning here is to create three variables'$','jQuery','window. jQuery'pointing to jQuery dependency and'Popper' pointing to popper. JS dependency.
  runtimeCompiler: true,

  transpileDependencies: [],

  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      })
    ],
    externals: {
      'jquery': 'jQuery',
      'vue': 'Vue',
      'vuetify': 'Vuetify',
      'vue-lazyload': 'VueLazyload',
      'vue-infinite-loading': 'VueInfiniteLoading',
      'vue-i18n': 'VueI18n',
      'lodash': '_'
    },
    devServer: {
      sockHost: 'basf.infiniteread.com',
      disableHostCheck: true,
    }
  },

  // chainWebpack: config => {
  //   // 其他配置
  //   config.entry('main').add('babel-polyfill') // main是入口js文件
  //   // 其他配置
  // },

  css: {
    requireModuleExtension: false
  }
}
