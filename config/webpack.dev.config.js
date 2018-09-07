const base = require("./webpack.base.config.js");
const merge = require("webpack-merge");
const path = require("path");
const webpack = require('webpack');
// const DashboardPlugin = require("webpack-dashboard/plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(base, {
    devtool: "inline-source-map",
    mode: "development",
    devServer: {
        compress: true,
        host: '127.0.0.1',
        historyApiFallback: true,
        hot: true,
        index: "index.html",
        open: 'Google Chrome',
        port: 10000,
        progress: true,
        contentBase: "../dist"
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("development")
            }
        }),
        new webpack.NamedModulesPlugin(),
        // new DashboardPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // new BundleAnalyzerPlugin({ statsFilename: "bundle-analyze.json", generateStatsFile: true, analyzerPort: 10001 }),
    ]
});