//javascript code for implementing the concept of listening to Websockets with Express
const express = require('express');
const ws = require('ws');
const pantry = require('./lib/pantry.lib');

const app = express();

const makeCall = (data)=>{
    let response = null;
    try{
        response = pantry.put(data);
    }catch(err){
        console.error("Error Occurred: ",err);
        response ="error";
    }
    return response;
}

//A headless websocket server is set up that also prints any events that come in.
const wsServer = new ws.Server({ noServer: true });

wsServer.on('connection', socket => {
  socket.on('message', msg => {
    const data = {"value": msg, "unit": "cms"};
    const resp = makeCall(data);
  });
});

const server = app.listen(3000);
server. on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});