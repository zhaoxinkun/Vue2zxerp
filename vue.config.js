const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    open: true,
    port: 8080,
    host: 'localhost',
  },
  // css: {
  //   loaderOptions: {
  //     scss: {
  //       additionalData: `@import "~@/styles/Index.scss";`
  //     },
  //   },
  // },
})
