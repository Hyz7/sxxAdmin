const path = require('path');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.js');

/*const context=['/']
const test_url='http://52.83.225.97:31400'*/
/*proxy:[{
    context: context,
    target: test_url,
    secure: false
}]*/
module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        publicPath: '/',
        contentBase: path.join(__dirname,'./dist'),
        historyApiFallback: true,
        inline: true,
        port: 8888
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { importLoaders: 1 }
                    },

                ]
            },
            {
                test:/\.less$/,
                use:['style-loader','css-loader','postcss-loader','less-loader']
            },
            {
                test:/\.(scss|sass)$/,
                use:['style-loader','css-loader','postcss-loader','sass-loader']
            }
        ]
    }
});