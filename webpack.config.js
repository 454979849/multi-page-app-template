const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const {plugins, rules, devServer, devtool, isProd} = require('./build/config')
const {getLocalIP, getEntry} = require('./build/utils')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin') // html模板生成器
const TerserPlugin = require('terser-webpack-plugin');
const config = {
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.join(__dirname, 'dist'), // 打包后生成的目录
    publicPath: '', // 模板、样式、脚本、图片等资源对应的server上的路径
    filename: 'static/js/[name].[hash:6].js', // 根据对应入口名称,生成对应js名称
    chunkFilename: 'static/js/[id].chunk.js' // chunk生成的配置
  },
  resolve: {
    extensions: ['.js', '.json', '.css']
  },
  module: {
    rules
  },
  devtool,
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          // minify: true,
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log']
          },
        }
      })
    ],
    namedModules: true,
    noEmitOnErrors: true
  },
  plugins,
  externals: {
    $: 'jQuery'
  },
  devServer,
  // 打包后的信息简化
  stats: {
    assets: false,
    // builtAt: false,
    modules: false,
    entrypoints: false
  }
}
const pages = Object.keys(getEntry('./src/*.pug'))

// 生成HTML模板
pages.forEach(function (pathname) {
  const fileBaseName = path.basename(pathname)
  const conf = {
    // 生成的html存放路径,相对于path
    filename: `${fileBaseName}.html`,
    // html模板路径
    template: `${pathname}.pug`,
    // 允许插件修改哪些内容,包括head与body
    inject: true,
    // 是否添加hash值
    hash: false,
    // 压缩HTML文件
    minify: {
      removeComments: true,
      collapseWhitespace: false
    }
  }
  conf.chunks = ['vendor', 'manifest', 'main', fileBaseName]
  config.entry[fileBaseName] = `./src/js/${fileBaseName}.js`
  config.plugins.push(new HtmlWebpackPlugin(conf))
})

module.exports = new Promise((resolve, reject) => {
  if (!isProd) {
    portfinder.basePort = devServer.port
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err)
      }
      devServer.port = port
      config.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`Your application is running at: \n\t http://${getLocalIP()}:${port}\n\n`]
          }
        }),
      )
    })
  }
  resolve(config)
})
