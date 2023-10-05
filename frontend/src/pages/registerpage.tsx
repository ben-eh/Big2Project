import { RegisterForm } from "../components/forms/register"
import { UserForm } from "../types/users";
import { Page } from "./page"
import axios from "axios"

const register = async (form: UserForm): Promise<void> => {
	const options = {headers: {
		'Content-Type': 'application/json'
	}}
	const response = await axios.post('http://localhost:3001/users', form, options);
	console.log(response);
}

export const Registerpage = () => {
	const handleRegistration = async (form: UserForm): Promise<void> => {
		register(form);
	}
	
	return (
		<Page>
			<RegisterForm
				handleRegistration={handleRegistration}
			/>
		</Page>
	)
}