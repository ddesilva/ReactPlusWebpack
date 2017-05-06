'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _globalConfig = require('./globalConfig');

var _globalConfig2 = _interopRequireDefault(_globalConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env['PORT'] || 8080;
var publicAddr = process.env['ADDR'] || '127.0.0.1';
_globalConfig2.default.serverState = { port: port, addr: publicAddr };
var server = (0, _express2.default)();

server.use('/', _express2.default.static(__dirname + '/../dist')); // in production just serve assets from disk

var listener = server.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  _globalConfig2.default.serverState.port = listener.address().port;
  console.log('Listening on port ' + _globalConfig2.default.serverState.port);
});

exports.default = server;