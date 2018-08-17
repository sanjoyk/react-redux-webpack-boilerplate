const base = require("./webpack.base.config");

const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin= require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(base, {
    mode: "production",
    devtool: "source-map",
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                react: {
                    name: "react",
                    chunks: "all",
                    test: (module) => {
                        const context = module.context;
                        const targets = ["react", "react-dom"]
                        return context && context.indexOf("node_module") >= 0 && targets.find(t => context.indexOf(`/${t}`) > -1)
                    },
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: false,
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    compress: true,
                    mangle: true
                }
            })
        ],
    },
    plugins: [
        new CleanWebpackPlugin(["dist"], {
            root: path.resolve(__dirname, "../")
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new BundleAnalyzerPlugin({statsFilename: "bundle-analyze.json", generateStatsFile: true,  analyzerPort : 10001}),
    ]
})
