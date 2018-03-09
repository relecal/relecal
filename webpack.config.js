module.exports = {
    entry: "./src/client/index.ts",
    output: {
        path: __dirname+"/assets/pack",
        filename: "bundle.js",
        publicPath: "/_/assets/pack/",
    },
    devServer: {
        proxy: {
            "/": "http://localhost:3000",
        },
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: "ts-loader", options: {
                appendTsSuffixTo: [/\.vue$/]
            } },
            { test: /\.vue$/, loader: "vue-loader" },
            { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" },
        ]
    }
}