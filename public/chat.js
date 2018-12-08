//Make Connection
var socket = io.connect('http://localhost:4000');

//Query DOM
var message = document.getElementById('message');
	username = document.getElementById('username');
	btn = document.getElementById('send');
	output = document.getElementById('output');
	feedback = document.getElementById('feedback');

//Emit Events

btn.addEventListener('click', function(){
	socket.emit('chat', {
		username: username.value,
		message: message.value
	});
});

message.addEventListener('keyup', function(e){

	if(e.keyCode === 13) {
		socket.emit('chat', {
			username: username.value,
			message: message.value
		});
	}
});

message.addEventListener('keypress', function() {
	socket.emit('typing', username.value);
});

//Listen for Events

socket.on('typing', function(data){
	feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

socket.on('chat', function(data){
	feedback.innerHTML = "";
	output.innerHTML += '<p><strong>' + data.username + ': </strong>' + data.message + '</p>';
	message.value = "";
});