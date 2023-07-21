import { createContext, useState, useContext, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export type Player = {
    id: string;
    username: string;
		playerNumber: number;
}

export type SocketContextData = {
    isConnected: boolean;
    players: Player[];
		playerNumber?: number;
    error?: string;
    username?: string;
    room?: string;
		playerHands?: any;
    connectToRoom: (username: string, roomName: string) => void;
    disconnectFromRoom: () => void;
    sendEvent: (event: string, data?: any) => void;
    listenForEvent: (event: string, callback: (data?: any) => void) => void;
};

const DEFAULT_CONTEXT_DATA: SocketContextData = {
    isConnected: false,
    players: [],
    connectToRoom: () => {},
    disconnectFromRoom: () => {},
    sendEvent: () => {},
    listenForEvent: () => {},
}

const SocketContext = createContext<SocketContextData>(DEFAULT_CONTEXT_DATA);

type Props = {
    url: string;
    children: any;
}
const SocketProvider = ({ url, children }: Props) => {
    const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [players, setPlayers] = useState<Player[]>([]);
    const [error, setError] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [room, setRoom] = useState<string>();
    const [playerNumber, setPlayerNumber] = useState<number>();
		const [playerHands, setPlayerHands] = useState<any>();

    useEffect(() => {
        const socket = io(url);
        socket.on('connected_to_room', (playerNumber) => {
						setPlayerNumber(playerNumber);
            setIsConnected(true);
        });
        socket.on('player_connected', (newPlayerList: Player[]) => {
            setPlayers(newPlayerList);
						if (newPlayerList.length === 2) {
							socket.emit('start_button', newPlayerList);
						}
        });
        socket.on('player_disconnected', (newPlayerList: Player[]) => {
            setPlayers(newPlayerList);
        });
        socket.on('could_not_connect', ({ reason }) => {
            setError(reason);
            setUsername(undefined);
            setRoom(undefined);
        });
        setSocket(socket);
    }, [url]);

    const connectToRoom = (username: string, roomName: string) => {
				socket && socket.emit('connect_to_room', { username, roomName });
				setUsername(username);
				setRoom(roomName);
    };

    const disconnectFromRoom = () => {
        room && socket && socket.disconnect();
    };

    const sendEvent = (event: string, data?: any) => {
        socket && socket.emit(event, data);
    };

    const listenForEvent = (event: string, callback: (data?: any) => void) => {
        socket && socket.on(event, callback);
    };

		listenForEvent('player_cards', (data) => {
			setPlayerHands(data);
		})
		
    return (
        <SocketContext.Provider value={{
						playerNumber,
            players,
            isConnected,
            error,
            username,
            room,
						playerHands,
            connectToRoom,
            disconnectFromRoom,
            sendEvent,
            listenForEvent,
        }}>{children}</SocketContext.Provider>
    );
};

const useSocket = (): SocketContextData => {
    const context = useContext(SocketContext);
    if (!context) throw new Error('useSocket must be used within an AuthProvider');
    return context;
}

export { SocketContext, SocketProvider, useSocket };