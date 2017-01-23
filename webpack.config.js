"use strict";

const path = require('path'),
    fs = require('fs'),
    webpack = require('webpack'),
    // js css 分离
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    // 自动添加前缀
    autoprefixer = require('autoprefixer'),
    // 生成html文件
    HtmlWebpackPlugin = require('html-webpack-plugin');

// 配置webpack
let webpackConfig = {
    // 入口
    entry: {
        // 这里reload=true的意思是，如果碰到不能hot reload的情况，就整页刷新。
        index: './src/app.js'
    },
    // 出口
    output: {
        path: path.join(__dirname, 'dist'),
        // [name] 在entry中的键
        filename: 'js/Index.js',
        // 绝对路径位置
        publicPath: 'http://localhost:3000/'// /react-express-Automatic-refresh/dist/
    },
    // webpack-dev-server 配置
    devServer: {
        // 文件入口 可以在 http://localhost:8080/webpack-dev-server/index.html 访问 src/index.html文件
        contentBase: 'dist',
        // 命令行输出彩色 没试出来
        colors: true,
        // 当设置为true时，访问所有服务器上不存在的文件，都会被重定向到/，也就是index.html文件  也不知道是不是 感觉没什么卵用
        historyApiFallback: true,
        // 设为true时可以在文件发生变化时，更新页面
        inline: true,
        // 热更新
        hot: true,
        // 设置服务器端口 默认8080
        port: 8080,
        // 可设置访问地址
        // host:'192.168.1.111',
    },
    module: {
        loaders: [
            {
                // 查找.js后缀的文件
                test: /\.js$/,
                // 不包括node_module
                exclude: /node_modules/,
                // 通过什么去解析
                loader: 'babel',
                // 需要解析的类型
                query: {
                    presets: ['es2015','react']
                }
            },
            {
                test: /\.(less|css)$/,
                // 第一个参数为 如果没有解析到的文件用什么去解析 第二个参数位解析less的
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&localIdentName=[local]-[hash:8]!less-loader!postcss-loader")
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                // 如果文件小于8kb那么则用base64方式添加到页面中  大于则放到name设置的文件夹中
                loader: 'url-loader?limit=8192&name=images/[hash:32].[ext]'
            },
            {
                test: /\.(woff|eot|ttf)\??.*$/,
                loader: 'url-loader?name=fonts/[hash:32].[ext]'
            },
        ]
    },
    // 添加css前缀插件
    postcss: [autoprefixer()],
    plugins: [
        // css js分离插件
        new ExtractTextPlugin("css/index.css"),
        new HtmlWebpackPlugin({
            // 输出文件位置
            filename: `index.html`,
            // 模板引擎位置
            template: path.resolve(__dirname, 'src/Template.html'),
            // minify: true,
            // hash: true,
        })
    ]
};

if ('produce' === process.env.NODE_ENV) {
    // 压缩js
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false,
        },
        compress: {
            warnings: false
        }
    }))
} else {
    // for (let key of Object.keys(webpackConfig.entry)) {
    //     webpackConfig.entry[key] = [webpackConfig.entry[key], 'webpack-hot-middleware/client?reload=true']
    // }
    for (let [key, value] of Object.entries(webpackConfig.entry)) {
        webpackConfig.entry[key] = [value, 'webpack-hot-middleware/client?reload=true']
    }
    // 显示更多信息
    webpackConfig.devtool = 'eval-source-map';
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    webpackConfig.plugins.push(new webpack.NoErrorsPlugin());
}

module.exports = webpackConfig;