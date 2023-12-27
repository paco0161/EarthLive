const path = require('path');

module.exports = {
    entry: './server/assets/scripts/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'location', 'static')
    }
}