// TODO: Подумать про разделение клиентской и серверной стороны
// https://github.com/generalgmt/RESTfulAPITutorial

const http = require('http');
const express = require('express');
const initParsers = require('./middleware/parser')
const mongoose = require('mongoose')

const app = express();

(function initWebpack() {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack/common.config');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
  }));

  app.use(express.static(__dirname + '/'));

  initParsers(app)
})();

// todo: разобраться, почему не работает с ajax
// app.get(/.*/, function root(req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

const url = 'mongodb://localhost:27017/diary'
mongoose.Promise = global.Promise
mongoose.connect(url)

const routes = require('./server/routes')
routes(app)

const server = http.createServer(app);
server.listen(process.env.PORT || 3000, function onListen() {
  const address = server.address();
  console.log('Listening on: %j', address);
  console.log(' -> that probably means: http://localhost:%d', address.port);
});
