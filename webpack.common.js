const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './server/assets/scripts/index.js',
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Production',
        }),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'location', 'static')
    }
}