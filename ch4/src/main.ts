import express from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';
import { v4 as uuidv4 } from 'uuid';
import WebSocket from 'ws';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3333;

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

interface CustomWebSocket extends WebSocket {
  dispatchEvent: (event: Event) => boolean;
}

interface User {
  username: string;
  uuid: string;
  ws: CustomWebSocket;
}

const users: User[] = [];

wss.on('connection', function connection(ws: CustomWebSocket) {
  ws.on('message', function incoming(data) {
    const message = JSON.parse(data.toString());
    if (message.type === 'auth') {
      const newUser: User = {
        username: message.username,
        uuid: uuidv4(),
        ws: ws,
      };
      users.push(newUser);
      ws.send(JSON.stringify({ type: 'auth', uuid: newUser.uuid }));
    } else if (message.type === 'message') {
      users.forEach(function each(user) {
        if (user.ws != ws && user.ws.readyState == ws.OPEN) {
          user.ws.send(JSON.stringify({ type: 'message', username: message.username, text: message.text }));
        }
      });
    }
  });
});

server.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
