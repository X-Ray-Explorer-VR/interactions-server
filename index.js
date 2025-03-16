const { WebSocketServer, WebSocket } = require('ws');
require('colors');

const SERVER_IP = process.env.IP || '0.0.0.0';
const SERVER_PORT = process.env.PORT || 8080;

const wss = new WebSocketServer({ host: SERVER_IP, port: SERVER_PORT });

console.log(`Server ${SERVER_IP} running on port ${SERVER_PORT}`.bgCyan.black);

// Save required sockets
let frontSocket, oculusSocket;

wss.on('connection', function connection(ws) {
  console.log('Client connected'.bgGreen.black);

  ws.on('error', console.error);

  ws.on('close', () => {
    console.log('Client disconnected'.bgRed);

    if (frontSocket === ws) {
      frontSocket = null;

      console.log('Front-end client disconnected'.bgYellow.black);
    } else if (oculusSocket === ws) {
      oculusSocket === null;

      if (frontSocket) {
        frontSocket.send('Oculus client: Disconnected');
      }

      console.log('Oculus client disconnected'.bgYellow.black);
    }
  });

  ws.on('message', (data) => {
    console.log(`Message from client: ${data}`);

    try {
      // Process message
      const dividedMessage = data.toString().split(': ');
      const clientName = dividedMessage[0];
      const clientData = dividedMessage[1];

      // Check client
      if (clientName.includes('Oculus')) {
        // Check action
        if (clientData.includes('Connected')) {
          oculusSocket = ws;

          console.log('Oculus client connected'.bgBlue);
        }
        // Send data to front-end
        sendToFrontend(data);
      } else if (clientName.includes('Front-end')) {
        // Check action
        if (clientData.includes('Connected')) {
          frontSocket = ws;

          console.log('Front-end client connected'.bgBlue);
        }
      }
    } catch (ex) {
      console.error(ex);
    }
  });
});

/**
 * Sends a message to the front-end socket client
 * @param {string} data - Message to send
 */
function sendToFrontend(data) {
  if (frontSocket && frontSocket.readyState === WebSocket.OPEN) {
    frontSocket.send(data, { binary: false });
  }
}
