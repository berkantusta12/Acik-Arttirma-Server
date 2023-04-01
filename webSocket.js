import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
let receivedMessage = null
wss.on('connection', function connection(ws) {
    console.log("connected");
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    receivedMessage = data
    console.log( "recieved", data.toString('utf-8'));
    // ws.send(receivedMessage);
    wss.clients.forEach(function (client) {
        client.send(JSON.stringify(receivedMessage));
     });
});

});