// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 去掉注释
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 打包分析
const webpack = require('webpack')
// const path = require('path')

// gzip --start
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const productionGzip = true // 是否使用gzip
// const productionGzipExtensions = ['js', 'css'] // 需要gzip压缩的文件后缀
// gzip --end

// function resolve (dir) {
//   return path.join(__dirname, './', dir)
// }

// cdn预加载使用
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  'element-ui': 'ELEMENT',
  'js-cookie': 'Cookies',
  nprogress: 'NProgress'
}

const cdn = {
  // 开发环境
  dev: {
    css: [
      'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'
    ],
    js: []
  },
  // 生产环境
  build: {
    css: [
      'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'
    ],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js',
      'https://unpkg.com/element-ui/lib/index.js',
      'https://cdn.bootcss.com/js-cookie/2.2.0/js.cookie.min.js',
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js'
    ]
  }
}

module.exports = {
  publicPath: './', // 默认'/'，部署应用包时的基本 URL
  outputDir: 'word_press_build',
  assetsDir: './', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, // 生产环境的 source map
  chainWebpack: config => {
    // 压缩图片
    // config.module
    //   .rule('images')
    //   .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //     mozjpeg: { progressive: true, quality: 65 },
    //     optipng: { enabled: false },
    //     pngquant: { quality: '65-90', speed: 4 },
    //     gifsicle: { interlaced: false },
    //     webp: { quality: 75 }
    //   })

    // 使用cdn
    config.plugin('html').tap(args => {
      // if (process.env.NODE_ENV === 'production') {
      if (process.env.VUE_APP_IS_SSO === 'off') {
        args[0].cdn = cdn.build
      }
      if (process.env.NODE_ENV === 'development') {
        args[0].cdn = cdn.dev
      }
      return args
    })

    // 打包分析
    if (process.env.IS_ANALYZ) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }
  },
  // 第三方插件配置
  // 简单/基础配置，比如引入一个新插件
  configureWebpack: config => {
    const myConfig = {}
    if (process.env.NODE_ENV === 'production') {
      // 1. 生产环境npm包转CDN
      if (process.env.VUE_APP_IS_SSO === 'off') {
        myConfig.externals = externals
      }

      myConfig.plugins = []

      // 去掉注释
      myConfig.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false // 去掉注释
            },
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console.log
            }
          }
        })
      )
      // gzip
      // 2. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      // productionGzip && myConfig.plugins.push(
      //   new CompressionWebpackPlugin({
      //     test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      //     threshold: 8192,
      //     minRatio: 0.8
      //   })
      // )
      // 报错
      // myConfig.plugins.push(
      //   new ParallelUglifyPlugin({
      //     cacheDir: '.cache/',
      //     uglifyJS: {
      //       output: {
      //         comments: false
      //       },
      //       warnings: false,
      //       compress: {
      //         drop_debugger: true,
      //         drop_console: true
      //       }
      //     }
      //   })
      // )

      /**
       * 固定 moduleId
       * 使用 hash 做为模块ID, 避免缓存那些没有变化的模块内容， 从而实现更优的缓存策略
       * https://webpack.docschina.org/guides/caching
       */
      myConfig.plugins.push(
        new webpack.HashedModuleIdsPlugin()
      )
    }

    if (process.env.NODE_ENV === 'development') {
      /**
       * 关闭host check，方便使用ngrok之类的内网转发工具
       */
      myConfig.devServer = {
        disableHostCheck: true
      }
    }

    return myConfig
  },
  devServer: {
    open: true, // 自动启动浏览器
    host: '0.0.0.0', // localhost
    port: 8080, // 端口号
    https: false,
    hotOnly: true, // 热更新
    proxy: {
      '^/api': {
        // target: 'http://192.168.0.105:3000',
        target: 'http://192.168.1.145:3000/',
        // target: 'http://115.159.117.118:3000/',
        // target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
