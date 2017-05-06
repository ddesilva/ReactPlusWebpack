import express from 'express';
import compression from 'compression';
import globalConfig from './globalConfig';

const port = process.env['PORT'] || 9002;
const publicAddr = process.env['ADDR'] || '127.0.0.1';
globalConfig.serverState = {port: port, addr: publicAddr};
const server = express();

server.use('/', express.static(__dirname + '/../dist'));   // in production just serve assets from disk

const listener = server.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  globalConfig.serverState.port = listener.address().port;
  console.log(`Listening on port ${globalConfig.serverState.port}`);

});

export default server;
