import LoginPage from "./login";
import GamePage from "./Game";
import { SocketProvider, useSocket } from "./socketContext";

const Router = () => {
	const { isConnected } = useSocket();
	if (isConnected) return <GamePage />;
	return <LoginPage />;
}

const App = () => {
	return (
		<SocketProvider url={'http://localhost:3001'}>
			<Router />
		</SocketProvider>
	)
}

export default App;
