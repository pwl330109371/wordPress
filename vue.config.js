module.exports = {
  publicPath: '/', // 默认'/'，部署应用包时的基本 URL
  outputDir: 'word_press_build',
  assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, // 生产环境的 source map
  devServer: {
    open: true, // 自动启动浏览器
    host: '0.0.0.0', // localhost
    port: 8080, // 端口号
    https: false,
    hotOnly: true, // 热更新
    proxy: {
      '^/api': {
        // target: 'http://192.168.0.105:3000',
        // target: 'http://192.168.1.143:3000/',
        target: 'http://192.168.1.145:3000/',
        // target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
