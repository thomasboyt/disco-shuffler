/* jshint node: true */

var pickFiles = require('broccoli-static-compiler');
var browserify = require('broccoli-browserify');
var filterReact = require('broccoli-react');

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

module.exports = app;
