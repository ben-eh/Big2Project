import { RegisterForm } from "../components/forms/register"
import { useAuth } from "../context/authContext";
import { Credentials, UserForm } from "../types/users";
import { Page } from "./page"
import axios from "axios"

export const Loginpage = () => {
	const auth = useAuth();
	
	const handleLogin = async (form: Credentials): Promise<void> => {
		await auth.signIn(form)
		// navigation.navigate('/dashboard');
	}
	
	return (
		<Page>
			<RegisterForm
				handleRegistration={handleLogin}
			/>
		</Page>
	)
}