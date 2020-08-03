module.exports = {
  devServer: {
    open: true, // 自动启动浏览器
    host: '0.0.0.0', // localhost
    port: 8080, // 端口号
    https: false,
    hotOnly: true, // 热更新
    proxy: {
      '^/api': {
        target: 'http://192.168.0.104:3000',
        // target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
      }
    }
  }
}