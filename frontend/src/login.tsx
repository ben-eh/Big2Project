import { useEffect, useState } from "react";
import io from 'socket.io-client';
import { useSocket } from "./socketContext";

const LoginPage = (attributes: any) => {
	
	const [username, setusername] = useState('');
	const [lobbyname, setlobbyname] = useState('');
	const {socket, login} = useSocket();
	
	const handleClickedButton = async () => {
		const loginData = {
			username,
			lobbyname
		}
		
		// login(loginData)
		// 	.then((response) => {
		// 			attributes.setCurrentPage('game');
		// 	})
		// 	.catch((error) => {
		// 		setusername('');
		// 		setlobbyname('');
		// 		alert('only alphanumeric and underscore characters allowed')
		// 	} )

		try {
			await login(loginData);
			attributes.setCurrentPage('game');
		}
		catch(error) {
			setusername('');
			setlobbyname('');
			(error === 'room_full') ? alert('room is full') : alert('only alphanumeric and underscore characters allowed');
		}
	}
	
	const handleUsernameChange = (e:any) => {
		setusername(e.target.value);
	}

	const handleLobbynameChange = (e:any) => {
		setlobbyname(e.target.value);
	}
	
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
