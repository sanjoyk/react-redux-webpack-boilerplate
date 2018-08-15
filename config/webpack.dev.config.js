const base = require("./webpack.base.config.js");
const merge = require("webpack-merge");
const path = require("path");
const webpack = require('webpack');

module.exports = merge(base, {
    devtool: "source-map",
    mode: "development",
    devServer: {

        compress: true,
        port: 9000,
        host: '127.0.0.1',
        // color: true,
        // contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        hot: true,
        // https: true,
        index: "index.html",
        open: 'Google Chrome',
        port: 10000,
        progress: true,



    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("development")
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
});