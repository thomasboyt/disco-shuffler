var playlist = require('./server/loadPlaylist')('./playlist.yaml');

// set up express
var express = require('express');
var app = express();

var hbs = require('express-hbs');
app.engine('hbs', hbs.express3());
app.set('view engine', 'hbs');
app.set('views', './templates');

if ( process.env.ENV === 'PRODUCTION' ) {
  app.use(require('compression')());
}

// song index
app.route('/:id')
  .get(function(req, res, next) {
    var id = parseInt(req.params.id, 10);
    if ( Number.isNaN(id) ) {
      next();
    }

    var song = playlist[id];

    res.render('song', {
      song: JSON.stringify(song)
    });
  });


// random song
app.route('/')
  .get(function(req, res, next) {
    var index = Math.floor(Math.random() * playlist.length);
    var song = playlist[index];

    res.render('song', {
      song: JSON.stringify(song)
    });
  });

if ( process.env.ENV === 'PRODUCTION' ) {
  app.use('/static', express.static('build'));
} else {
  app.use('/static', require('broccoli-middleware'));
}

app.listen(process.env.PORT || 3000);
