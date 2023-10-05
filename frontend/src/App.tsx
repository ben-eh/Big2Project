import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./login";
import GamePage from "./Game";
import { Registerpage } from "./pages/registerpage";
import { SocketProvider, useSocket } from "./socketContext";
import { Loginpage } from "./pages/loginpage";
import { AuthProvider, useAuth } from "../../frontend/src/context/authContext"
import { Dashboard } from "./pages/dashboard";
import { Homepage } from "./pages/homepage";
import { Lobbypage } from "./pages/lobbypage";
import { Gamepage } from "./pages/gamepage";

const Router = () => {
	const {token} = useAuth();
	const {isConnected} = useSocket();
	if (!token) return <Loginpage />;
	return isConnected ? <Gamepage /> : <Lobbypage />;
}

const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<SocketProvider url={'http://localhost:3001'}>
					<Router />
				</SocketProvider>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App;
