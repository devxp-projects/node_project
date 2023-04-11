// To send and receive messages

import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:4000');


ws.on('error', console.error);

ws.on('open', function open() {
  console.log('Connected to server'); // Log when the connection is established
  ws.send('something');
});



// ws.on('message', function message(data) {
//   console.log('received: %s', data);
// });

// Add this line to log when a message is sent to the server
// ws.on('send', (data) => {
//     console.log(`Sent message to server: ${data}`);
//   });

  // console.log("Client")

  export default ws
  