import { useEffect, useState } from "react";
import { useSocket } from "./socketContext";

const LoginPage = () => {
	
	const [username, setusername] = useState('');
	const [lobbyname, setlobbyname] = useState('');
	const { connectToRoom, error } = useSocket();

	useEffect(() => {
		if (error) alert(error);
	}, [error]);
	
	const handleClickedJoin = async () => {
		connectToRoom(username, lobbyname);
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
						onClick={handleClickedJoin}>
						Let's gooooooooooooo!!!
					</button>
				</div>
			</div>
		</div>
  );
}

export default LoginPage;
