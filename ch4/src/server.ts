import express from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3336;

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server })


wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        wss.clients.forEach(function each(client) {
            if (client != ws && client.readyState == ws.OPEN) {
                client.send(data)
            }
        })
    });
})  


// app.get('/', (req, res) => {
//   res.send({ message: 'Hello API' });
// });

server.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});