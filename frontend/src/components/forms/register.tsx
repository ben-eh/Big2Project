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
	handleRegistration: (form: UserForm) => Promise<void>
}

export const RegisterForm = (attributes: Props) => {
	const [password, setPassword] = useState<string>();
	const [username, setUsername] = useState<string>();

	const handleRegisterClick = () => {
		const form: UserForm = {
			password: password || '',
			username: username || '',
		}

		attributes.handleRegistration(form);
	}

	return (
		<Layout elevation={4}>
			<StackStyled spacing={"1rem"}>
				<Typography variant="h4" align="center">Fill in your details</Typography>

				<TextField
					required
					label="Username"
					fullWidth
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>

				<TextField
					required
					type="password"
					label="Password"
					fullWidth
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>

				<Button
					variant="contained"
					onClick={handleRegisterClick}
				>Submit</Button>
			</StackStyled>
		</Layout>
	)
}