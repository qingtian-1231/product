const webpack = require("webpack");
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

let plugins = [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    Popper: ['popper.js', 'default']
  }),
];

if (process.env.NODE_ENV === "production") {
  plugins.push(new PrerenderSPAPlugin({
    // 生成文件的路径，也可以与webpakc打包的一致。
    // 下面这句话非常重要！！！
    // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
    staticDir: path.join(__dirname, 'dist'),
    // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
    routes: [
      '/',
      '/industry',
      '/products',
      '/product',
      '/formulations',
      '/formulation',
      '/login',
      '/register',
      '/download'
    ],
    // 这个很重要，如果没有配置这段，也不会进行预编译
    renderer: new Renderer({
      inject: {
        prerender: 'domain'
      },
      headless: false,
      renderAfterTime: 12000,
      // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
      // renderAfterDocumentEvent: 'render-event',
      // renderAfterElementExists: 'v-application--wrap'
    })
  }))
}

module.exports = {
// The configure Web pack is the place in Vue CLI 3.0 to configure the parameters of the webpack plug-in. If you set it here, it will create or override the default configuration of the webpack.
// The meaning of webpack ProvidePlugin is to create a global variable that can be used within each module of webpack. The configuration meaning here is to create three variables'$','jQuery','window. jQuery'pointing to jQuery dependency and'Popper' pointing to popper. JS dependency.
  runtimeCompiler: true,

  transpileDependencies: [],

  configureWebpack: {
    plugins: plugins,
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
