import express from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';
import * as client from "./client";

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3334;

const app = express();
const server = http.createServer(app); // Create a HTTP server with your Express app

const wss = new WebSocketServer({ server });


wss.on('connection', function connection(ws) {
  console.log('Client connected'); // Log when a new connection is established

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});

// Add this line to log when a message is sent to the clients
wss.on('message', (data) => {
  console.log(`Sent message to clients: ${data}`);
});

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

console.log(client)
