import { createContext, useContext, useState, useEffect } from 'react';
import { Socket, io } from 'socket.io-client';

type SocketContextData = {
	socket?: Socket;
	login: (data: any)=>void;
	username?: string;
	playerNumber?: string;
	error?: string;
	playerList?: string[];
}

const DEFAULT_CONTEXT_DATA: SocketContextData = {
	login: () => {},
};

const SOCKET_CONTEXT = createContext<SocketContextData>(DEFAULT_CONTEXT_DATA);

const SocketProvider = ({children}: any) => {
	const [ socket, setSocket ] = useState<any>(io('http://localhost:3001'));
	const [ username, setUsername ] = useState();
	const [ playerNumber, setPlayerNumber ] = useState();
	const [ error, setError ] = useState();
	const [ playerList, setPlayerList ] = useState();

	// useEffect(() => {
	// 	const newSocket = io('http://localhost:3001');
	// 	setSocket(newSocket);
	// 	newSocket && newSocket.on('player_list_updated', (playerListData) => {
	// 		console.log('this is in useeffect function');
	// 		setPlayerList(playerListData);
	// 	})
	// }, []);

	const login = (data: any): void => {
			socket && socket.emit('login_attempt', data);
			
			socket && socket.on('login_response', (returnData: any) => {
				if (!returnData.error) {
					setUsername(returnData.username);
					setPlayerNumber(returnData.playerNumber);
				} else {
					setError(returnData.error);
				}
			});

			socket && socket.on('player_list_updated', (playerListData: any) => {
				console.log('this is in useeffect function');
				setPlayerList(playerListData);
			})
	};
	return (

		<SOCKET_CONTEXT.Provider value={ {
			socket, login, username, playerNumber, error, playerList
		} }>
			{children}
		</SOCKET_CONTEXT.Provider>
	)
};

const useSocket = () => {
	const context = useContext(SOCKET_CONTEXT);
	return context;
}

export { SocketProvider, useSocket };