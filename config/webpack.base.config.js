const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackManifestPlugin = require("webpack-manifest-plugin");
const WebpackAssetsPlugin = require("assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    entry: "./src/js/index.js",
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/",
        filename: "app.[name].[hash].bundle.js",
        chunkFilename: "app.[name].[hash].bundle.js"
    },
    devtool: "eval-source-map",
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
                "babel-loader"
            ],
        }, {
            test: /\.(css|scss)$/,
            use: [MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader",
            ]
        }]
    },

    plugins: [

        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        // new ExtractTextPlugin({ //move this to prod for performance
        //     filename: `app.[name].[hash].css`,
        //     allChunks: true
        // }),
        new WebpackManifestPlugin({
            fileName: "webpack.manifest.json",
            serialize: (manifest) => JSON.stringify(manifest, null, 4),
        }),
        new WebpackAssetsPlugin()
    ],
    resolve: {
        extensions: [".css", ".scss", ".js", ".jsx", ".json"]
    }
}