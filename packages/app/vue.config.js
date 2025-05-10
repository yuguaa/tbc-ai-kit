const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const webpack = require('webpack') // 引入 webpack
const packages = require('./package.json')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  chainWebpack: config => {
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  devServer: {
    https: false,
    open: true,
    proxy: 'https://test.21tb.com/'
  },
  configureWebpack: config => {
    // 定义路径别名
    config.resolve.alias = {
      ...config.resolve.alias, // 保持已有的别名
      '@': path.resolve(__dirname, 'src') // 将 '@' 映射到 'src' 目录
    }

    // 添加 BannerPlugin 插件
    config.plugins.push(
      new webpack.BannerPlugin({
        banner: `Build Time: ${new Date().toLocaleString()}； Build Version: ${packages.version}； ` // 打包时间
      })
    )

    if (process.env.NODE_ENV === 'production') {
      // 生产环境配置
      return {
        optimization: {
          splitChunks: false // 禁用代码分割
        },
        entry: './src/main.js', // 入口文件
        output: {
          library: '__TBC_AI_APP', // 指定库名称
          libraryTarget: 'umd', // 输出为 UMD 格式
          filename: 'tbc-ai-app.js' // 输出文件
        }
      }
    }

    // 合并所有 CSS 到一个文件
    config.plugins.push(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1 // 限制 chunk 数量为 1
      })
    )
  },
  // 添加 CSS 配置
  css: {
    extract: {
      filename: 'tbc-ai-app.css', // 不带 hash 的 CSS 文件名
      chunkFilename: '[name].css' // 不带 hash 的 chunk CSS 文件
    }
  }
})
