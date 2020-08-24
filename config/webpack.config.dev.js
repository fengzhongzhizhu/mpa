const webpackBaseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');
const utils = require('./utils');
const path = require('path');

function resolve (dir) {
    return path.join(__dirname, '..', dir);
}
module.exports = utils.pushHtmlWebpackPlugins(
    merge(webpackBaseConfig, {
        mode: 'development',
        // 起本地服务
        devServer: {
            contentBase: './dist/',
            historyApiFallback: true,
            inline: true,
            hot: true,
            host: 'localhost',
            open: true,
            before (_, server) {
                server._watch(resolve('/src/pages'));
            }
        }
    })
);
