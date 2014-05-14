/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  displayName: 'VideoPage',

  propTypes: {
    song: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <iframe className="video" src={this.props.song.embedUrl} frameBorder="0" allowFullScreen></iframe>
    );
  }
});
