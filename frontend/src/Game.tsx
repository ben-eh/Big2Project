import { useEffect, useState } from "react";
import cardMap from "./utils/cardMap";
import Deck from "./utils/deck";
import OtherPlayer from "./components/OtherPlayer";
import { simpleSortHand } from "./utils/hands";
import { useSocket } from "./socketContext";

const GamePage = () => {

	const [ playerHands, setPlayerHands ] = useState<any>({});
	const [ currentPlayersTurn, setCurrentPlayersTurn ] = useState<number>(1);
	const { playerNumber, players } = useSocket();
	
	
	useEffect(() => {
		const deck = new Deck(cardMap);
		deck.shuffle();
		const playerHands = deck.dealAllCards(4);
		playerHands[1] = simpleSortHand(playerHands[1]);
		setPlayerHands(playerHands);
	}, []);

	console.log(players);

	return(
		<div className="fullSizeGameDiv">
			<div className="topDiv flex-items-center">
				<OtherPlayer name="Adam" hand={playerHands[3]} />
			</div>
			<div className="middleDiv">
				<div className="smallMiddle flex-items-center">
					<OtherPlayer name="Tenzin" hand={playerHands[2]} />
				</div>
				<div className="middleCentre">
					middleCentre
				</div>
				<div className="smallMiddle flex-items-center">
					<OtherPlayer name="Nithin" hand={playerHands[4]} />
				</div>
			</div>
			<div className="bottomDiv">
				<div className="myCards">
					{/* <img src="./assets/cards/ace_of_hearts.png" alt="" /> */}
					{
						playerHands[currentPlayersTurn] && simpleSortHand(playerHands[currentPlayersTurn]).map((card: string) => {
							return(
								<img
									key={card}
									className="cardSize"
									src={`./assets/cards/${cardMap[card]}`}
									alt="whatever" 
								/>
							)
						})
					}
				</div>
			</div>
		</div>
	)

}

export default GamePage;