const path = require('path');
const webpack = require('webpack');

module.exports = function(env){

    const STAGE = env.STAGE || 'dev';
    const MODE = STAGE === 'prod' || STAGE === 'demo' ? 'production' : 'development';

    return {
        mode: MODE,
        entry: './src/main.js',
        resolve: {
            fallback: {
                "crypto": require.resolve("crypto-browserify"),
                "buffer": require.resolve("buffer/"),
                "stream": require.resolve("stream-browserify")
            }
        },
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new webpack.ProvidePlugin({
                process: 'process',
            })
        ]
    }

};
