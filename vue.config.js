const webpack = require("webpack");
const path = require('path');

module.exports = {
// The configure Web pack is the place in Vue CLI 3.0 to configure the parameters of the webpack plug-in. If you set it here, it will create or override the default configuration of the webpack.
// The meaning of webpack ProvidePlugin is to create a global variable that can be used within each module of webpack. The configuration meaning here is to create three variables'$','jQuery','window. jQuery'pointing to jQuery dependency and'Popper' pointing to popper. JS dependency.
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [path.resolve(__dirname, '../src')],
          exclude: [path.resolve(__dirname, '../node_modules')]
        },
        {
          test: /\.(vue|js)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          enforce: 'pre'
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.s(c|a)ss$/,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
      ]
    },
    externals: {
      'jquery': 'jQuery',
      'vue': 'Vue',
      'vuetify': 'Vuetify',
      'vue-lazyload': 'VueLazyload',
      // 'mavon-editor': 'mavonEditor',
      'lodash': '_'
    },
  },
  css: {
    requireModuleExtension: false
  }
}
