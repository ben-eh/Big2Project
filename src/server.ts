import app from './app';
import { Server } from 'socket.io';
import SocketHelper from './socket-helper';

const rooms: any = {
	legendsRoom: []
}

const port = 3001;

const server = app.listen(port, () => {
	console.log('server is now running on port 3001.');
});
const socketHelper = new SocketHelper(server);
