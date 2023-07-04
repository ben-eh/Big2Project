import { useState } from "react";
import LoginPage from "./login";
import GamePage from "./Game";

const App = () => {
	
	const [currentPage, setCurrentPage] = useState('login');

	switch(currentPage) {
		case 'login': return <LoginPage setCurrentPage={setCurrentPage} />;
		case 'game': return <GamePage />;
		default: return <LoginPage />;
	}

}

export default App;
