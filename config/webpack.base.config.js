const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackManifestPlugin = require("webpack-manifest-plugin");

module.exports = {
    entry: "./src/js/index.js",
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/",
        filename: "[name].[hash].bundle.js",
        chunkFilename: "[name].[hash].bundle.js"
    },
    devtool: "eval",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader"
                ]
            }, {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            minimize: true,
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                    ],
                    publicPath: "src/styles"
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new ExtractTextPlugin({
            filename: `application-[name]-[hash].css`,
            allChunks: true
        }),
        new WebpackManifestPlugin({
            fileName: "webpack.manifest.json",
            serialize: (manifest) => JSON.stringify(manifest, null, 4),
        }),

    ],
    resolve: {
        extensions: [".css", ".scss", ".js", ".jsx", "json"]
    }
}
