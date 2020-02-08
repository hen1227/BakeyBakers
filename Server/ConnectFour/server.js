var express = require("express");
var app = express();
var server = app.listen(0004);

app.use(express.static('public'));

console.log("The Server is Running on port: 0004");

var socket = require("socket.io");

var io = socket(server);


io.sockets.on("connection", newConnection);

var person = 0;
function newConnection(socket){
  person++;
  console.log("new connection: "+socket.id + " . Player "+person);

  socket.emit('newConnect', person);


  socket.on("newMessage", transmitNewMessage);
  socket.on("placedPeice", transmitNewPeicePlaced);
  socket.on("newPlacing", transmitNewMouseX);

  function transmitNewMessage(data){
    console.log("Message received: "+ data);
    socket.broadcast.emit("newMessage", data);
  }

  function transmitNewPeicePlaced(data){
    socket.broadcast.emit("newPlacePeice", data);
  }
  function transmitNewMouseX(data){
    socket.broadcast.emit("newPlacing", data);
  }

}
// var http = require('http');
//
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('Welcome to the Server');
// }).listen(1227);
