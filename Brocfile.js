/* jshint node: true */

var pickFiles = require('broccoli-static-compiler');
var browserify = require('broccoli-browserify');
var filterReact = require('broccoli-react');
var uglify = require('broccoli-uglify-js');

var env = require('broccoli-env').getEnv();

var client = pickFiles('client/', {
  srcDir: '/',
  files: ['**/*.js'],
  destDir: '/'
});

client = filterReact(client, {extensions: ['js']});

var app = browserify(client, {
  entries: ['./app'],
  outputFile: 'app.js'
});

if ( env === 'production' ) {
  app = uglify(app);
}

module.exports = app;
