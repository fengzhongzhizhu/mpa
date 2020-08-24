/* eslint-disable */
const webpack = require('webpack');
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProduction = process.env.NODE_ENV === 'production';


console.log(isProduction,"产生")

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}
const env = process.env.NODE_ENV

let webpackConfig = {
	// 配置入口  
	entry: {},
	// 配置出口  
	output: {
		path: resolve('/dist/'),
		filename: 'static/js/[name].[hash:7].js',
		publicPath: '/',
	},
	// 路径配置
	resolve: {
		extensions: ['.js', '.json'],
		alias: {
			'@': resolve('/src')
		}
	},
	devtool: isProduction?'eval':'cheap-module-eval-source-map',
	// loader配置
	module: {
		rules: [
			{
				test: /\.(js)$/,
				loader: 'eslint-loader',
				enforce: 'pre',
				include: [resolve('/src')],
				options: {
					formatter: require('eslint-friendly-formatter')
				}
			},
			{
				test: /\.ejs$/,
				loader: 'ejs-loader',
				include: [resolve( '/src')],
				query: {
					variable: 'data',
					// mustache模板：
					// 具体参考lodash/underscore的template方法
					// interpolate : '\\{\\{(.+?)\\}\\}',
					// evaluate : '\\[\\[(.+?)\\]\\]'
				}
			},
			// html中的img标签
			{
				test: /\.html$/,
				loader: 'html-withimg-loader',
				include: [resolve('/src')],
				options: {
					limit: 10000,
					name: 'static/img/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [resolve('/src')]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use:[
				  {
				  loader: 'url-loader',
				  options: {
					limit: 10000,
					name: 'static/img/[name].[hash:7].[ext]'
					}
				  },
				  {
					loader: 'image-webpack-loader',// 压缩图片
					options: {
					  bypassOnDebug: true,
					}
				  }
				]
			  },
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'static/media/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'static/fonts/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.css$/,
				use: [
					env == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
				],
			},
			{
				test: /\.less$/,
				use: [
					env == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'less-loader'
				],
			},
			{
				test: /\.(sass|scss)$/,
				use: [
					env == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				],
			}
		]
	},
	plugins: [
		// 全局引入lodash
		new webpack.ProvidePlugin({
			_: 'lodash'
		}),
		//设置每一次build之前先删除dist  
		new CleanWebpackPlugin(
			['dist/*',],　     //匹配删除的文件  
			{
				root:  path.join(__dirname, '..'),   //根目录  
				verbose: true,    //开启在控制台输出信息  
				dry: false     //启用删除文件  
			}
		)
	]
};

module.exports = webpackConfig;
