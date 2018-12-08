var express = require('express');
var socket = require('socket.io');

//App Setup
var app = express();

var server = app.listen(4000, function(){
	console.log('listening to port 4000');
});

//Static files
app.use(express.static('public'));

var io = socket(server);

io.on('connection', function(socket){
	console.log('made socket connection', socket.id);

	socket.on('typing', function(data){
		socket.broadcast.emit('typing', data);
	});

	socket.on('chat', function(data){
		io.sockets.emit('chat', data);
	});

});

