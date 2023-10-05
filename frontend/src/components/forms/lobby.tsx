import { Paper, TextField, Stack, Button, Typography, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { useState } from "react";
import { styled } from "styled-components";
import { UserForm } from "../../types/users";

const Layout = styled(Paper)`
	width: 500px;
	margin-top: 100px;
	padding: 1rem;
	display: flex;
	display-direction: column;
`;

const StackStyled = styled(Stack)`
	width: 100%;
`;

type Props = {
	handleLobbyEntry: (lobbyName: string) => Promise<void>
}

export const LobbyForm = (attributes: Props) => {
	const [lobbyName, setLobbyName] = useState<string>();

	const handleJoinLobby = () => {
		if (!lobbyName || lobbyName.trim().length < 1) return
		attributes.handleLobbyEntry(lobbyName);
	}

	return (
		<Layout elevation={4}>
			<StackStyled spacing={"1rem"}>
				<Typography variant="h4" align="center">Fill in your details</Typography>

				<TextField
					required
					label="Lobby Name"
					fullWidth
					onChange={(e) => {
						setLobbyName(e.target.value);
					}}
				/>

				<Button
					variant="contained"
					onClick={handleJoinLobby}
				>Submit</Button>
			</StackStyled>
		</Layout>
	)
}