import { Server, Socket } from "socket.io";
// import { v4 as uuidv4 } from 'uuid';
import { DefaultEventsMap } from "socket.io/dist/typed-events";

// TODO - Remove this
let count = 0;

type RoomMap = {
    [roomName: string]: UserInfo[];
}
type User = {
    id: string;
    username: string;
    playerNumber: number;
}
type UserInfo = {
    id: string;
    username: string;
    playerNumber: number;
    socket: Socket;
}



export default class SocketHelper {
    _io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

    // Eventually this should be stored in a DB
    private _rooms: RoomMap = {};

    constructor (server: any) {
        this._io = new Server(server, {
            cors: {
                origin: "http://localhost:3000",
            }
        });
        this._io.on('connection', (socket) => {
            this.setupConnecting(socket);
            this.setupDisconnecting(socket);
            this.setupCustomEvents(socket);
        });
    }

    private setupConnecting = (socket: Socket) => {
        socket.on('connect_to_room', ({ username, roomName }) => {

            if (!this.isValidCredentials(username, roomName)) {
                socket.emit('could_not_connect', { 
                    reason: 'Invalid credentials' 
                });
                return;
            }

            const players = this._rooms[roomName] || [];
            const usernameExistsAlready = players.filter(
                (player) => player.username === username
            )[0];
            
            if (usernameExistsAlready) {
                socket.emit('could_not_connect', { 
                    reason: 'Username already taken' 
                });
                return;
            }

            if (players.length >= 4) {
                socket.emit('could_not_connect', { error: 'Room full' })
                return;
            }
    
            socket.join(roomName);
    
            const playerId = socket.id;
            const playerNumber = players.length + 1;
            players.push({ id: playerId, username, socket, playerNumber });
            this._rooms[roomName] = players;
    
            const playerList = players.map(({ id, username, playerNumber }) => ({ id, username, playerNumber }));
            this._io.to(roomName).emit('player_connected', playerList);
            socket.emit('connected_to_room');
        });
    }

    private setupDisconnecting = (socket: Socket) => {
        socket.on('disconnecting', () => {
            socket.rooms.forEach((room) => {
                const playerList = this._rooms[room];
                if (playerList) {
                    const newList = playerList.filter((player) => player.id !== socket.id);
                    this._rooms[room] = newList;
                    const newPlayerList = newList.map(({ id, username, playerNumber }) => ({ id, username, playerNumber }));
                    this._io.to(room).emit('player_disconnected', newPlayerList);
                }
            });
        });
    }

    private setupCustomEvents = (socket: Socket) => {
        // CUSTOM EVENTS HERE
    }

    private isValidCredentials = (username: string, lobbyname: string): boolean => {
        const regex = /^\w*\d*$/;
        return (regex.test(username) && regex.test(lobbyname)) ? true : false;
    }
}
