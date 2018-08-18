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
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}`
        },
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                polyfill: {
                    name: "polyfill",
                    chunks: "all",
                    test: (module) => {
                        const context = module.context;
                        const targets = ["babel-polyfill"]
                        return context && context.indexOf("node_module") >= 0 && targets.find(t => context.indexOf(`/${t}`) > -1)
                    },
                },
                react: {
                    name: "react",
                    chunks: "all",
                    test: (module) => {
                        const context = module.context;
                        
                        const targets = ["react", "react-dom"]
                        return context && context.indexOf("node_module") >= 0 && targets.find(t => context.indexOf(`/${t}`) > -1)
                    },
                },
                //check the validily
                // default: {
                //     minChunks: 2,
                //     priority: -20,
                //     reuseExistingChunk: true
                // }
                
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
            }),
            new webpack.HashedModuleIdsPlugin(),
            new webpack.DefinePlugin({
                "process.env": {
                    "NODE_ENV": JSON.stringify("production")
                }
            }),
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
