const path = require('path')
const resolve = dir => path.join(_dirname, dir)
// const BASE_URL = process.env.NODE_ENV === 'production' ? '/' :'/'
module.exports = {
  // baseUrl:BASE_URL,
  runtimeCompiler: true,
  publicPath: './', // 设置打包文件相对路径
  outputDir: 'dist',
  lintOnSave: false,
  configureWebpack: {   
    resolve: { extensions: [".ts", ".tsx", ".js", ".json"] },   
    module: {       
      rules: [   
        {   
          test: /\.tsx?$/,   
          loader: 'ts-loader',   
          exclude: /node_modules/,   
          options: {
            appendTsSuffixTo: [/\.vue$/],   
          }   
        }       
      ]   
    }   
  },
  devServer: {
    // open: process.platform === 'darwin',
    // host: 'localhost',
    port: 8080,//前端端口
    open: true, //配置自动启动浏览器
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'development' ? 'http://192.168.3.41:8888/api' : '',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  }
}
