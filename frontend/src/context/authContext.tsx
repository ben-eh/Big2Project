import { createContext, useContext, useEffect, useState } from "react";
import { Credentials, User } from "../types/users"
import axios from "axios";
import jwt_decode from "jwt-decode";


type AuthContextData = {
	user?: User;
	token?: string;
	signIn: (creds: Credentials) => Promise<void>;
	signOut: () => void;
}

const authContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = (): AuthContextData => {
	const context = useContext(authContext);
	return context;
}

export const AuthProvider = (attributes: any) => {
	const [ user, setUser ] = useState<User>(); 
	const [ token, setToken ] = useState<string>();
	
	useEffect(() => {
		// check if token is in localStorage and if so, set authContext token
			const localToken = localStorage.getItem('token');
			if (localToken !== null) {
				setToken(localToken);
			}
	}, [])
	
	useEffect(() => {
		if (!token) return;
		const user: User = jwt_decode(token);
		setUser(user);
	}, [token])
	
	const signIn = async (creds: Credentials): Promise<void> => {
		const options = {headers: {
			'Content-Type': 'application/json'
		}}
		const response = await axios.post('http://localhost:3001/auth/token', creds, options);
		// { id, username } => string => { id, username }
		const token: string = response.data.token;
		// set token
		setToken(token);
		// save token to local storage
		localStorage.setItem('token', token);
	}
	
	const signOut = (): void => {
		setToken(undefined);
		localStorage.removeItem('token');
	}

	return(
		<authContext.Provider
			value={{ 
				user,
				token,
				signIn,
				signOut
			}}
		>
			{attributes.children}
		</authContext.Provider>
	)
}