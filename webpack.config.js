const path = require('path');
const webpack = require('webpack');

module.exports = function(env){
    return {
        mode: "production",
        entry: './src/upp-browser.js',
        resolve: {
            fallback: {
                "crypto": require.resolve("crypto-browserify"),
                "buffer": require.resolve("buffer/"),
                "stream": require.resolve("stream-browserify"),
                "zlib": require.resolve('browserify-zlib'),
                "assert": require.resolve("assert/"),
                "util": require.resolve("util/")
            }
        },
        output: {
            filename: 'ubirch-protocol-verifier.min.js',
            path: path.resolve(__dirname, 'dist'),
        },
        performance : {
            hints : false
        },
        plugins: [
            new webpack.ProvidePlugin({
                process: 'process',
            })
        ]
    }

};
