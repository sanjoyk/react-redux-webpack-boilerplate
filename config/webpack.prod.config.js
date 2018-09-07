const base = require("./webpack.base.config");

const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(base, {
    mode: "production",
    devtool: false,
    optimization: {
        runtimeChunk: {
            name: entrypoint => {
                // console.log("entry name==", entrypoint.name)
                return `runtime~${entrypoint.name}`
            }
        },
        splitChunks: {
            chunks: "all",
            minChunks: 1,
            maxAsyncRequests: 150,
            maxInitialRequests: 200,
            cacheGroups: {
                // default: false,


                antd: {
                    name: "antd",
                    chunks: "all",
                    test: (module) => {
                        const context = module.context;
                        const targets = ["antd"];
                        const results = context && context.indexOf("node_module") >= 0 && targets.find(t => context.indexOf(`/${t}`) > -1);
                        return results;
                    },
                },
                reactdom: {
                    name: "react-dom",
                    chunks: "all",
                    test: (module) => {
                        const context = module.context;
                        const targets = ["react-dom", ];
                        return context && context.indexOf("node_module") >= 0 && targets.find(t => context.indexOf(`/${t}`) > -1)
                    },
                },
                react: {
                    name: "react",
                    chunks: "all",
                    test: (module) => {
                        const context = module.context;
                        const targets = ["react", "redux", "react-redux", "react-loadable", "prop-types"];
                        return context && context.indexOf("node_module") >= 0 && targets.find(t => context.indexOf(`/${t}/`) > -1)
                    },
                },
                "react-router": {
                    name: "react-router",
                    chunks: "all",
                    test: (module) => {
                        const context = module.context;
                        const targets = ["react-router", "react-router-dom"];
                        return context && context.indexOf("node_module") >= 0 && targets.find(t => context.indexOf(`/${t}/`) > -1)
                    },
                },
                rc: {
                    name: "rc-components",
                    chunks: "all",
                    test: (module) => {
                        const context = module.context;
                        const targets = ["rc-", "add-dom-event-listener"];
                        return context && context.indexOf("node_module") >= 0 && targets.find(t => context.indexOf(`/${t}`) > -1)
                    },
                },
                babel: {
                    name: "babel",
                    chunks: "all",
                    test: (module) => {
                        const context = module.context;
                        const targets = ["babel-runtime"];
                        return context && context.indexOf("node_module") >= 0 && targets.find(t => context.indexOf(`/${t}`) > -1)
                    },
                },
                history: {
                    name: "history",
                    chunks: "all",
                    test: (module) => {
                        const context = module.context;
                        const targets = ["history"];
                        return context && context.indexOf("node_module") >= 0 && targets.find(t => context.indexOf(`/${t}`) > -1)
                    },
                },
                polyfill: {
                    name: "polyfill",
                    chunks: "all",
                    test: (module) => {
                        const context = module.context;
                        const targets = ["babel-polyfill"]
                        return context && context.indexOf("node_module") >= 0 && targets.find(t => {
                            if (context.indexOf(`/${t}`) > -1) {
                                // console.log(context)
                            }
                            return context.indexOf(`/${t}`) > -1;
                        })
                    },
                },
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: false,
                parallel: true,
                sourceMap: false,
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
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].[hash].css",
            chunkFilename: "[name].[hash].css"
        }),
        new BundleAnalyzerPlugin({ statsFilename: "bundle-analyze.json", generateStatsFile: true, analyzerPort: 10001 }),
    ]
})