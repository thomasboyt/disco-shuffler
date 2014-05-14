var fs = require('fs');

// load playlist
var yaml = require('js-yaml');
var playlist = yaml.safeLoad(fs.readFileSync('./playlist.yaml', 'utf8')).songs;

var YOUTUBE_ID = /watch\?v=(.*)$/;  // TODO: this is really naive, obs

function embedUrl(videoUrl) {
  var url = 'https://www.youtube.com/watch?v=5wRM-t7wvF0';
  var id = url.match(YOUTUBE_ID)[1];
  return '//www.youtube.com/embed/' + id +
         '?autoplay=1&controls=0&playsinline=1&showinfo=0&modestbranding=1';
}

playlist.forEach(function(song) {
  song.embedUrl = embedUrl(song.youtube);
});


// set up express
var express = require('express');
var app = express();

var hbs = require('express-hbs');
app.engine('hbs', hbs.express3());
app.set('view engine', 'hbs');
app.set('views', './templates');


app.use('/static', express.static('build'));

// song index
app.route('/:id')
  .get(function(req, res, next) {
  });

// random song
app.route('/')
  .get(function(req, res, next) {
    var song = playlist[0];

    res.render('song', {
      song: JSON.stringify(song)
    });
  });

app.listen(3000);
