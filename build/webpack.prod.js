const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = merge(baseConfig, {
    mode: 'production',
    module:{
        rules:[
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', // 回滚
                    use: [
                        {
                            loader:'css-loader',
                            options:{
                                importLoaders:1 // 在css中使用@import引入其他文件
                            }
                        },{
                            loader: 'postcss-loader',
                            options:{
                                importLoaders:1
                            }//不加importLoaders postcss-loader不会操作引入的文件
                        }
                    ],
                    publicPath: '../' //解决css背景图的路径问题
                })
            },
            {
                test:/\.less$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','postcss-loader','less-loader']
                })
            },
            {
                test:/\.sass$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','postcss-loader','sass-loader']
                })
            }
        ]
    },
    plugins:[
        new UglifyJsPlugin(),
        new ExtractTextPlugin("[name].[chunkHash:8].css")
    ]
});