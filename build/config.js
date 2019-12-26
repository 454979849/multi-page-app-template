const webpack = require('webpack')
const Webpackbar = require('webpackbar')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {resolve, assetsPath, createLintingRule} = require('./utils')
const {px2remLoader} = require('./customConf')

const isProd = process.env.NODE_ENV === 'production'
let devServerPort = 8088

const isNeedRem = process.env.NEED_REM === true
const plugins = [
  new MiniCssExtractPlugin({
    filename: assetsPath('css/[name].css'),
    chunkFilename: assetsPath('css/[name].[contenthash].css')
  }),
  new Webpackbar(),
  // 全局配置加载
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    _: 'lodash'
  }),
  new CopyWebpackPlugin([
    {from: './src/images', to: './static/images'}
  ])
]
const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    'process.env': require('./dev.env.js')
  })
]
const prodPlugins = [
  new CleanWebpackPlugin(),
  new OptimizeCSSPlugin(),
  new webpack.DefinePlugin({
    'process.env': require(`./${process.env.ENV_CONFIG}.env.js`)
  })
]
const remLoader = isNeedRem ? ['css-loader', px2remLoader, 'postcss-loader'] : ['css-loader', 'postcss-loader']
const devRules = [
  {
    test: /\.css$/,
    use: [
      'style-loader',
      ...remLoader
    ]
  },
  {
    test: /\.styl$/,
    use: [
      'style-loader',
      ...remLoader,
      'stylus-loader'
    ]
  },
  {
    test: /\.scss$/,
    use: [
      'style-loader',
      ...remLoader,
      'sass-loader'
    ]
  },
  {
    test: /\.less$/,
    use: [
      'style-loader',
      ...remLoader,
      'less-loader'
    ]
  }
]
const prodRules = [
  {
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: true,
          publicPath: '../',
          reloadAll: true
        }
      },
      ...remLoader
    ]
  },

  {
    test: /\.styl$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      },
      ...remLoader,
      'stylus-loader'
    ]
  },
  {
    test: /\.scss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      },
      ...remLoader,
      'sass-loader'
    ]
  },
  {
    test: /\.less$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      },
      ...remLoader,
      'less-loader'
    ]
  }
]
const baseRules = [
  ...[createLintingRule()],
  {
    test: /\.pug$/,
    loader: ['html-loader', 'pug-html-loader']
  },
  {
    test: /\.js$/,
    loader: 'babel-loader',
    include: [resolve('src')]
  },
  {
    test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader?name=./fonts/[name].[ext]'
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        loader: 'file-loader',
        options: {
          esModule: false,
          limit: 10000,
          name: 'images/[name].[ext]'
        }
      }
    ],
  }
]
exports.rules = baseRules.concat(isProd ? prodRules : devRules)

exports.devServer = {
  contentBase: './src',
  // publicPath: '/dist/',
  host: '0.0.0.0',
  port: devServerPort, // 端口
  inline: true,
  open: true,
  // hot选项请勿开启,否则 pug文件会失去热重载
  // hot: true,
  clientLogLevel: 'error',
  overlay: true,
  // hotOnly: true
  quiet: true
}
exports.plugins = [...(isProd ? prodPlugins : devPlugins)].concat(plugins)
exports.devtool = isProd ? false : 'cheap-module-eval-source-map'
exports.isProd = isProd
