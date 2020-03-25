const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const CompressionWebpackPlugin = require('compression-webpack-plugin')

const productionGzipExtensions = ['js', 'css'] //压缩

const env = process.env.NODE_ENV
console.log(env)
module.exports = {
  outputDir: `dist-${process.env.VUE_APP_TITLE}`, //build输出目录
  assetsDir: 'assets', //静态资源目录（js, css, img）
  lintOnSave: false, //是否开启eslint
  productionSourceMap: false, //不在production环境使用SourceMap
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: 'localhost',
    port: '8081',
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://localhost:5000', //API服务器的地址
        ws: true, //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {
          //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 测试生产环境, 不压缩js代码
      if (process.env.VUE_APP_TITLE === 'alpha') {
        config.optimization.minimize(false)
      }
    }
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')

    // 或者
    // 修改它的选项：
    // config.plugin('prefetch').tap(options => {
    //   options[0].fileBlacklist = options[0].fileBlacklist || []
    //   options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
    //   return options
    // })
  },
  //drop_console是把console.log()注释掉了，而pure_funcs是把console.log()移除掉了。
  configureWebpack: config => {
    //入口文件
    // config.entry.app = ['babel-polyfill', './src/main.js']
    //删除console插件
    let plugins = [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          compress: {
            drop_console: true,
            drop_debugger: true
          },
          output: {
            // 去掉注释内容
            comments: false
          }
        },
        sourceMap: false,
        parallel: true
      })
    ]
    //只有打包生产环境才需要将console删除
    if (process.env.VUE_APP_TITLE == 'production') {
      config.plugins = [...config.plugins, ...plugins]
    }
  }
}
