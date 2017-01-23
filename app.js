"use strict";
const http = require('http'),
      path = require('path'),
      express = require('express'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      hbs = require('hbs'),
      mongoose = require('mongoose');

const port = process.env.PORT || 3000,
      isDev = process.env.NODE_ENV !== 'production';

mongoose.connect('mongodb://localhost/laoniu');
mongoose.Promise = Promise;

let app = express();

app.set('views', path.join(__dirname, 'dist'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.engine('html', hbs.__express);

if (isDev) {
  const webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevConfig = require('./webpack.config.js');

  const compiler = webpack(webpackDevConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
      colors: true
    }
  }));
  app.use(webpackHotMiddleware(compiler));

  require('./server/routes/index')(app);

  const bs = require('browser-sync').create();

  app.listen(port, function(){
    bs.init({
      open: false,
      ui: false,
      notify: false,
      proxy: 'localhost:3000',
      files: ['./dist/**'],
      port: 8080
    });
    console.log('App (dev) is going to be running on port 8080 (by browsersync).');
  });

} else {
  app.use(express.static(path.join(__dirname, 'dist')));

  require('./server/routes/index')(app);

  app.listen(port, function () {
    console.log('App (production) is now running on port 3000!');
  });
}

// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err,
//       layout : false
//     });
//   });
// }
//
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {},
//     layout : false
//   });
// });