const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    open: true,
    port: 8080,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://124.223.161.17:5058', // 目标服务器地址
        changeOrigin: true, // 允许跨域
        pathRewrite: { '^/api': '' }, // 将 "/api" 替换为空，实际请求去掉前缀
      },
    },
  },
  // css: {
  //   loaderOptions: {
  //     scss: {
  //       additionalData: `@import "~@/styles/Index.scss";`
  //     },
  //   },
  // },
})
