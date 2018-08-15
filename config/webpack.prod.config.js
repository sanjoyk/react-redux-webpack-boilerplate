const base = require("./webpack.base.config");

const merge = require("webpack-merge");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = merge(base, {
    mode: "production",
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
        new webpack.optimize.OccurrenceOrderPlugin(),
        new CleanWebpackPlugin(["dist"], {
            root: path.resolve(__dirname, "../")
        })
    ]
})
