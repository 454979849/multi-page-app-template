/*eslint-disable*/
const glob = require('glob')
const path = require('path')
exports.getLocalIP = () => {
  // 在开发环境中获取局域网中的本机iP地址
  const interfaces = require('os').networkInterfaces()
  let IPAddress = ''
  for (let devName in interfaces) {
    var iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      var alias = iface[i]
      const {family, address, internal} = alias
      if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
        IPAddress = address
      }
    }
  }
  return IPAddress
}
// 按文件名来获取入口文件(即需要生成的模板文件数量)
exports.getEntry = (globPath) => {
  const files = glob.sync(globPath)
  const entries = {}
  let entry;
  let dirname;
  let basename;
  let pathname;
  let extname
  for (let i = 0; i < files.length; i++) {
    entry = files[i]
    dirname = path.dirname(entry)
    extname = path.extname(entry)
    basename = path.basename(entry, extname)
    pathname = path.join(dirname, basename)
    entries[pathname] = `./${entry}`
  }
  return entries
}
exports.resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}
exports.assetsPath = function (_path) {
  const assetsSubDirectory = 'static'

  return path.posix.join(assetsSubDirectory, _path)
}
exports.createLintingRule = () => ({
  test: /\.(js)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [path.join(__dirname, '..', 'src')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: true
  }
})
