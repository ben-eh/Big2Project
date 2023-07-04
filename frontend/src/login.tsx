import { useState } from "react";

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
