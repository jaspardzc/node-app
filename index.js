var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('', function(request, response) {
	//response.send('<h1>Hello World</h1>');
	response.sendFile(__dirname + '/index.html');
});

// var peer = new Peer({key: 'v9erpbr7xu07ldi'}); for kevinzengdev@gmail.com
app.get('/peer-node1', function(request, response) {
	//response.send('<h1>Hello World</h1>');
	response.sendFile(__dirname + '/peer-node1.html');
});

app.get('/peer-node2', function(request, response) {
	//response.send('<h1>Hello World</h1>');
	response.sendFile(__dirname + '/peer-node2.html');
});


// listen on the connection event
io.on('connection', function(socket) {
	console.log('a user is connected..');
	socket.on('chat message', function(message) {
		console.log('message: ' + message);
		io.emit('chat message', message);
	});
	socket.on('disconnect', function() {
		console.log('user is disconnected..');
	});
});

http.listen(3000, function() {
	console.log('server is listening on *:3000');
});