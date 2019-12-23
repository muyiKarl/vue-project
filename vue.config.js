const path = require('path');
const defaultSettings = require('./src/setting.js');

function resolve(dir) {
    return path.join(__dirname, dir);
}
const name = defaultSettings.title; // page title

module.exports = {
    publicPath: '/',
    outputDir: 'dist', // 打包的目录
    lintOnSave: true, // 在保存时校验格式
    productionSourceMap: false, // 生产环境是否生成 SourceMap
    devServer: {
        open: true, // 启动服务后是否打开浏览器
        host: '0.0.0.0',
        port: 9527, // 服务端口
        https: false,
        hotOnly: false,
        proxy: null, // 设置代理
    },
    configureWebpack: {
        // 设置工程的title   index.html文件中使用
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
  }