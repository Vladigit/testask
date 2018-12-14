var path = require('path')

let config = {
    entry: ['@babel/polyfill','./src/index.js'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'index.js'
    },
    module: {
        rules:[
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
            }
        ]
    },
    devtool: 'eval-sourcemap'
}

module.exports = (env, options) => {
    if (options.mode === 'prooduction') {
        config.devtool = null
        process.env.NODE_ENV = 'production'
    }
    return config
}