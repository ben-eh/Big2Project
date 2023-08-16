import { Server, Socket } from "socket.io";
// import { v4 as uuidv4 } from 'uuid';
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import Deck from "./deck";
import cardMap from "./cardMap";
import Game from "./game";
import { isValidHand } from "./hand-helper";

// TODO - Remove this
let count = 0;

type RoomMap = {
    [roomName: string]: Game;
}
type User = {
    id: string;
    username: string;
    playerNumber: number;
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

            // const players = this._rooms[roomName] || [];
						if (!this._rooms[roomName]) {
							this._rooms[roomName] = new Game(roomName);
						}

            const usernameExistsAlready = this._rooms[roomName].players.filter(
                (player) => player.username === username
            )[0];
            
            if (usernameExistsAlready) {
                socket.emit('could_not_connect', { 
                    reason: 'Username already taken' 
                });
                return;
            }

            if (this._rooms[roomName].players.length >= 4) {
                socket.emit('could_not_connect', { error: 'Room full' })
                return;
            }
    
            socket.join(roomName);
    
            const playerNumber = this._rooms[roomName].addPlayer(socket, username);
    
            const playerList = this._rooms[roomName].players.map(({ id, username, playerNumber }) => ({ id, username, playerNumber }));
            this._io.to(roomName).emit('player_connected', playerList);
            socket.emit('connected_to_room', playerNumber);
        });
    }

    private setupDisconnecting = (socket: Socket) => {
        socket.on('disconnecting', () => {
            socket.rooms.forEach((room) => {
								if (this._rooms[room]) {
									this._rooms[room].removePlayer(socket);
									const playerList = this._rooms[room].players.map(({ id, username, playerNumber }) => ({ id, username, playerNumber }));
									this._io.to(room).emit('player_disconnected', playerList);
								}
            });
        });
    }

    private setupCustomEvents = (socket: Socket) => {
        // CUSTOM EVENTS HERE

				// deal out the cards and pass 'activePlayer' variable as well
				socket.on('deal_cards', (room) => {
					this._rooms[room].startGame();
					this._io.to(room).emit('player_cards', {playerHands: this._rooms[room].playerHands, middleCards: this._rooms[room].middleCards});
					this._io.to(room).emit('active_player', this._rooms[room].activePlayer);
				})

				// play a single card
				socket.on('play_card', (data) => {
					const {card, room} = data;
					const cards = [card];
					// if (!isValidHand(cards)) {
					// 	socket.emit('invalid_hand', 'you can\'t play those cards');
					// 	return
					// }
					this._rooms[room].playSingleCard(card);
					const cardsPlayedData = {playerHands: this._rooms[room].playerHands, middleCards: this._rooms[room].middleCards}
					this._io.to(room).emit('player_cards', cardsPlayedData);
					this._io.to(room).emit('active_player', this._rooms[room].activePlayer);
				})
    }

    private isValidCredentials = (username: string, lobbyname: string): boolean => {
        const regex = /^\w*\d*$/;
        return (regex.test(username) && regex.test(lobbyname)) ? true : false;
    }

}
