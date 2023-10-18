
const path = require('path');

module.exports = {
    entry: './assets/scripts/clocks.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'website', 'static')
    }
}