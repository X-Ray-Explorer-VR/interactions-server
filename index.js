const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 2567 });

wss.on('connection', function connection(ws) {
  console.log('Client connected!');

  ws.on('error', console.error);

  ws.on('close', function close() {
    console.log('Client disconnected!');
  });

  ws.on('message', function message(data, isBinary) {
    console.log('Received: %s', data);
  });
});
