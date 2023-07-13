import { useEffect, useState } from "react";
import io from 'socket.io-client';

const LoginPage = (attributes: any) => {
	
	const [userName, setUserName] = useState('');
	const [lobbyName, setLobbyName] = useState('');
	
	const handleClickedButton = () => {
		attributes.setCurrentPage('game');
	}

	const handleUsernameChange = (e:any) => {
		setUserName(e.target.value);
	}

	const handleLobbyNameChange = (e:any) => {
		setLobbyName(e.target.value);
	}

	useEffect(() => {
		const socket = io('http://localhost:3001');
		socket.emit('client_sending_message_to_server', 'testing client to server message');
		socket.on('server_sending_message_to_client', (data) => {
			console.log('received message from server');
			console.log(data);
		})
	}, [])
	
	return (
    <div className="mainDiv">
			<h1>Welcome to Big 2</h1>
			<h3>Welcome back {userName}</h3>
			<div>
				<p>Please enter your username and lobby name to join</p>
				<div className="stackAndCenter">
					<label>username</label>
					<input
						onChange={handleUsernameChange}
						value={userName}
						className="mb-s"
						type="text"
					/>
					<label>Lobby Name</label>
					<input
						onChange={handleLobbyNameChange}
						value={lobbyName}
						className="mb-s"
						type="text"
					/>
					<button
						onClick={handleClickedButton}>
						Let's gooooooooooooo!!!
					</button>
				</div>
			</div>
		</div>
  );
}

export default LoginPage;
