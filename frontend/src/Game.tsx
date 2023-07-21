import { useEffect, useState } from "react";
import cardMap from "./utils/cardMap";
import Deck from "./utils/deck";
import OtherPlayer from "./components/OtherPlayer";
import { simpleSortHand } from "./utils/hands";
import { Player, useSocket } from "./socketContext";

const GamePage = () => {

	const [ playerHands, setPlayerHands ] = useState<any>({});
	const [ currentPlayersTurn, setCurrentPlayersTurn ] = useState<number>(1);
	const { username, playerNumber, players } = useSocket();
	
	
	// useEffect(() => {
	// 	const deck = new Deck(cardMap);
	// 	deck.shuffle();
	// 	const playerHands = deck.dealAllCards(4);
	// 	playerHands[1] = simpleSortHand(playerHands[1]);
	// 	setPlayerHands(playerHands);
	// 	console.log(playerNumber);
	// }, []);

	const findPlayerByPlayerNumber = (playerNumber: number): Player => {
		const validatedPlayerNumber = playerNumber === 4 ? 4 : playerNumber % 4;
		const playersList: Player[] = players.filter((player) => validatedPlayerNumber === player.playerNumber);
		return playersList[0];
	}

	return(
		<div className="fullSizeGameDiv">
			<div className="topDiv flex-items-center">
				<OtherPlayer name={(playerNumber !== undefined && findPlayerByPlayerNumber(playerNumber + 2)) ? findPlayerByPlayerNumber(playerNumber + 2).username : 'waiting on player'} hand={playerHands[3]} />
			</div>
			<div className="middleDiv">
				<div className="smallMiddle flex-items-center">
					<OtherPlayer name={(playerNumber !== undefined && findPlayerByPlayerNumber(playerNumber + 1)) ? findPlayerByPlayerNumber(playerNumber + 1).username : 'waiting on player'} hand={playerHands[2]} />
				</div>
				<div className="middleCentre">
					middleCentre
				</div>
				<div className="smallMiddle flex-items-center">
					<OtherPlayer name={(playerNumber !== undefined && findPlayerByPlayerNumber(playerNumber + 3)) ? findPlayerByPlayerNumber(playerNumber + 3).username : 'waiting on player'} hand={playerHands[4]} />
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

const playas = [
	{
		id: '1234',
		username: 'benno',
		playerNumber: 1
	},
	{
		id: '2345',
		username: 'brando',
		playerNumber: 2
	}
]

