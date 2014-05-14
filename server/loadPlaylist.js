// load playlist
var yaml = require('js-yaml');
var fs = require('fs');

module.exports = function(filename) {
  var playlist = yaml.safeLoad(fs.readFileSync(filename, 'utf8')).songs;

  var YOUTUBE_ID = /watch\?v=(.*)$/;  // TODO: this is really naive, obs

  function embedUrl(videoUrl) {
    var id = videoUrl.match(YOUTUBE_ID)[1];
    return '//www.youtube.com/embed/' + id +
           '?autoplay=1&controls=0&playsinline=1&showinfo=0&modestbranding=1';
  }

  playlist.forEach(function(song) {
    song.embedUrl = embedUrl(song.youtube);
  });

  return playlist;
};
