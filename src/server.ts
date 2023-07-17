import app from './app';
import { Server } from 'socket.io';

const rooms: any = {
	legendsRoom: []
}

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
	// console.log('user has connected');
	socket.on('disconnect', () => {
		console.log('user has disconnected');
	})
	// put custom messages here
	// socket.on('client_sending_message_to_server', (data) => {
	// 	console.log('testing custom message');
	// 	console.log(data);
	// 	socket.emit('server_sending_message_to_client', 'this is data to send');
	// })
	socket.on('login_attempt', (data: any) => {
		const {username, lobbyname} = data;
		let players = rooms[lobbyname];
		if (!players) {
			players = [];
		}
		const roomLength = players.length;
		const playerNumber = roomLength + 1;
		if (roomLength >= 4) {
			socket.emit('login_response', {error: 'room_full'})
			return;
		}
		if (isValidCredentials(data)) {
			players.push({username, playerNumber});
			socket.join(lobbyname);
			rooms[lobbyname] = players;
			const playerList = {
				players
			}
			socket.to(lobbyname).emit('player_list_updated', playerList);
			socket.emit('login_response', {username, playerNumber});
		} else {
			socket.emit('login_response', {error: 'invalid_credentials'});
		}
	})
});

const isValidCredentials = (data: any): boolean => {
	const regex = /^\w*\d*$/;
	const { username, lobbyname } = data;
	return (regex.test(username) && regex.test(lobbyname)) ? true : false;
}