var React = require('react');
var VideoPage = require('./components/VideoPage');

var container = document.getElementById('root-container');
React.renderComponent(VideoPage({ song: window._song}), container);
