var http = require('http'),
	fs = require('fs');

var count = 0;

var server = http.createServer(function (req, res) {
	fs.readFile('./index.html', function (error, data) {
		res.writeHead(200, {'Content-type': 'text/html'});
		res.end(data, 'utf-8');
	})
}).listen(3000, "127.0.0.1");
console.log(" Server corriendo en el puerto 3000");

var io = require('socket.io').listen(server);


io.sockets.on('connection', function (socket) {
	//socket.emit('message', { text : 'You have connected!'});
	//socket.broadcast.emit('message', { text : 'A new user has connected!'});
	count++;
	console.log('User connected: ' + count + ' user(s) present.' );
	socket.emit('users', { number : count });
	socket.broadcast.emit('users', { number : count });
	socket.on('disconnect', function (){
		count--;
		console.log('User disconnect: ' + count + ' user(s) present.' );
		socket.broadcast.emit('users', { number : count });
	});
});
