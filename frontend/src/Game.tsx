import { useEffect, useState } from "react";
import cardMap from "./utils/cardMap";
import Deck from "./utils/deck";

const GamePage = () => {

	const [ myCards, setMyCards ] = useState([]);
	
	useEffect(() => {
		const deck = new Deck(cardMap);
		deck.shuffle();
		const playerHands = deck.dealAllCards(4);
		const player1Hand = playerHands[1];
		setMyCards(player1Hand);
	}, []);

	return(
		<div className="fullSizeGameDiv">
			<div className="topDiv">
				top
			</div>
			<div className="middleDiv">
				<div className="middleLeft">
					middleLeft
				</div>
				<div className="middleCentre">
					middleCentre
				</div>
				<div className="middleRight">
					middleRigt
				</div>
			</div>
			<div className="bottomDiv">
				<div className="myCards">
					{/* <img src="./assets/cards/ace_of_hearts.png" alt="" /> */}
					{
						myCards.map((card) => {
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