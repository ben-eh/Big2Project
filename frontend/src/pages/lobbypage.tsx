import { useEffect } from "react";
import { LobbyForm } from "../components/forms/lobby"
import { useAuth } from "../context/authContext";
import { useSocket } from "../socketContext"
import { Page } from "./page"

export const Lobbypage = () => {
	const { connectToRoom, error } = useSocket();
	const {user} = useAuth();

	useEffect(() => {
		error && alert(error);
	}, [error]) 
	
	const handleLobbyLogin = async (lobbyName: string): Promise<void> => {
		if (!user?.username) return;
		connectToRoom(user.username, lobbyName);
	}
	
	return (
		<Page>
			<LobbyForm
				handleLobbyEntry={handleLobbyLogin}
			/>
		</Page>
	)
}