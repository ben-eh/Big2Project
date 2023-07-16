import { useEffect, useState } from "react";
import io from 'socket.io-client';

const LoginPage = (attributes: any) => {
	
	const [username, setusername] = useState('');
	const [lobbyname, setlobbyname] = useState('');
	const socket = io('http://localhost:3001');
	
	const handleClickedButton = () => {
		const loginData = {
			username,
			lobbyname
		}
		// login(loginData);
		// if ( login(loginData) ) {
		// 	attributes.setCurrentPage('game');
		// } else {
		// 	setusername('');
		// 	setlobbyname('');
		// 	alert('login failed');
		// };
		login(loginData)
			.then((response) => {
				console.log(response);
			})

	}

	// const login = async (data: any): Promise<boolean> => {
	// 	console.log('this should fire when I click button');
	// 	socket.emit('login_attempt', data);
	// 	let response: boolean = true;
	// 	socket.on('login_response', (returnData) => {
	// 		response = returnData;
	// 	});
	// 	console.log(`response is ${response}`);
	// 	return response;
	// }

	const login = (data: any): Promise<boolean> => {
		return new Promise((resolve) => {
			socket.emit('login_attempt', data);
			
			socket.on('login_response', (returnData) => {
				resolve(returnData);
			});
		});
	};
	
	
	const handleUsernameChange = (e:any) => {
		setusername(e.target.value);
	}

	const handleLobbynameChange = (e:any) => {
		setlobbyname(e.target.value);
	}

	// useEffect(() => {
	// 	socket.emit('client_sending_message_to_server', 'testing client to server message');
	// 	socket.on('server_sending_message_to_client', (data) => {
	// 		console.log('received message from server');
	// 		console.log(data);
	// 	})
	// }, [])
	
	return (
    <div className="mainDiv">
			<h1>Welcome to Big 2</h1>
			<h3>Welcome back {username}</h3>
			<div>
				<p>Please enter your username and lobby name to join</p>
				<div className="stackAndCenter">
					<label>username</label>
					<input
						onChange={handleUsernameChange}
						value={username}
						className="mb-s"
						type="text"
					/>
					<label>Lobby Name</label>
					<input
						onChange={handleLobbynameChange}
						value={lobbyname}
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
