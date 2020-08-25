var fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const glob = require('glob');
var pageConfig = []

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}
const entryFilter = glob.sync(resolve('/src/pages/***'), {});
entryFilter.map((filePath, i) => {
    const files = glob.sync(`${filePath}/*`, {});
    let name = filePath.substr(filePath.lastIndexOf('/') + 1)
    pageConfig[i] = { name }
    files.map(file => {
        if (path.extname(file) === '.js') {
            pageConfig[i]['jsEntry'] = `${name}/${path.basename(file)}`
        }
        if (path.extname(file) === '.ejs') {
            pageConfig[i]['html'] = `${name}/${path.basename(file)}`
        } else if (path.extname(file) === '.html') {
            pageConfig[i]['html'] = `${name}/${path.basename(file)}`
        }
    })
});

exports.pushHtmlWebpackPlugins = (webpackConfig, options = {}) => {
    if (pageConfig && Array.isArray(pageConfig)) {
        pageConfig.map(page => {
            webpackConfig.entry[page.name] = `./src/pages/${page.jsEntry}`;
            let template = resolve(`/src/pages/${page.html}`);
            // 如果是ejs文件，启用ejs-loader编译
            if (path.extname(page.html) === '.ejs') {
                template = `!!ejs-loader!${template}`;
            }
            webpackConfig.plugins.push(new HtmlWebpackPlugin({
                filename: resolve(`/dist/${page.name}.html`),
                template,
                inject: true,
                chunks: [page.name],
                inlineSource: '.(js|css)$',
                chunksSortMode: 'dependency',
                ...options
            }));
        });
    }
    return webpackConfig;
};