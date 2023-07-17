import { useState } from "react";
import LoginPage from "./login";
import GamePage from "./Game";
import { SocketProvider } from "./socketContext";

const App = () => {
	
	const [currentPage, setCurrentPage] = useState('login');
	
	let page;

	switch(currentPage) {
		case 'login': page=<LoginPage setCurrentPage={setCurrentPage} />;
		break;
		case 'game': page=<GamePage />;
		break;
		default: page=<LoginPage />;
		break;
	}

	return (
		<SocketProvider>
			{page}
		</SocketProvider>
	)

}

export default App;
