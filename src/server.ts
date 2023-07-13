import app from './app';
import { Server } from 'socket.io';

const port = 3001;

const server = app.listen(port, () => {
	console.log('server is now running on port 3001.');
});

const socketOptions = {
	cors: {
		origin: 'http://localhost:3000'
	}
}

const io = new Server(server, socketOptions);

io.on('connection', (socket) => {
	console.log('user has connected');
	socket.on('disconnect', () => {
		console.log('user has disconnected');
	})
	// put custom messages here
	socket.on('client_sending_message_to_server', (data) => {
		console.log('testing custom message');
		console.log(data);
		socket.emit('server_sending_message_to_client', 'this is data to send');
	})
});