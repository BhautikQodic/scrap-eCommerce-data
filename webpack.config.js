const autoprefixer = require("autoprefixer");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const tailwindcss = require("tailwindcss");

module.exports = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
        popup: path.resolve("./src/popup/popup.tsx"),
        background: path.resolve("./src/background/background.ts"),
        scrapper: path.resolve("./src/scripts/scrapper.ts")
    },
    module: {
        rules: [
            {
                use: "ts-loader",
                test: /\.tsx?$/,
                exclude: /node_modules/
            },
            {
                use: ["style-loader", "css-loader", {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            ident: "postcss",
                            plugins: [
                                tailwindcss, autoprefixer
                            ]
                        }
                    }
                }],
                test: /\.css$/i,
            }
        ]
    },
    plugins: [ 
        new CopyPlugin({
            patterns: [
                { from: path.resolve("./src/static"), to: path.resolve("dist") },
            ],
        }),
        new HtmlWebpackPlugin({
            title: "scrap-ecommerce-data",
            filename: "popup.html",
            chunks: ["popup"]
        })
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
    }
}