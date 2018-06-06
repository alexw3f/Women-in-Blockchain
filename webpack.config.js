const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/scripts/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /\.scss$/,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader'
            ],
        }, {
            test: /\.(gif|png|jpe?g|svg)$/i,
            exclude: /node_modules/,
            use: [{
                    loader: 'file-loader',
                    options: {
                        hash: 'sha512',
                        digest: 'hex',
                        name: '[hash].[ext]'
                    }
                }, {
                    loader: 'image-webpack-loader',
                    options: {
                        progressive: true,
                        optimizationLevel: 7,
                        interlaced: false
                        // more here: https://github.com/tcoopman/image-webpack-loader#usage
                    }
                }
            ]
        }, {
            test: /\.(woff|woff2|eot|ttf|svg)$/,
            exclude: /node_modules/,
            use: 'url-loader?limit=1024&name=fonts/[name].[ext]'
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, '/'),
        publicPath: '/build/',
        hot: true,
        inline: true,
        compress: true,
        port: 3000,
        historyApiFallback: true
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: `v${require('./package.json').version}`,
            raw: false,
            entryOnly: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};