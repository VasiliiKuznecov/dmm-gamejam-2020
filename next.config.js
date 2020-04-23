process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();

const withSass = require('@zeit/next-sass');

module.exports = withSass();
