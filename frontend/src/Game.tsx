import { useEffect, useState } from "react";
import OtherPlayer from "./components/OtherPlayer";
import { simpleSortHand } from "./utils/hands";
import { Player, useSocket } from "./socketContext";
import cardMap from "./utils/cardMap";

const GamePage = () => {

	const [ currentPlayersTurn, setCurrentPlayersTurn ] = useState<number>(1);
	const { username, playerNumber, players, sendEvent, playerHands, room, activePlayer } = useSocket();

	const handleDealCards = () => {
		sendEvent('deal_cards', room);
	}
	
	// useEffect(() => {
	// 	const deck = new Deck(cardMap);
	// 	deck.shuffle();
	// 	const playerHands = deck.dealAllCards(4);
	// 	playerHands[1] = simpleSortHand(playerHands[1]);
	// 	setPlayerHands(playerHands);
	// 	console.log(playerNumber);
	// }, []);

	console.log(`active player is ${activePlayer}`);
	
	const isGameStarted = () => playerHands !== undefined;
	
	// this function finds a player by player number, this does not care about our (socket's) playerNumber
	const findPlayerByPlayerNumber = (value: number): Player => {
		const validatedPlayerNumber = value === 4 ? 4 : value % 4;
		const playersList: Player[] = players.filter((player) => validatedPlayerNumber === player.playerNumber);
		return playersList[0];
	}

	// this is just a check to make sure that we can find a player by their playerNumber
	const shouldShowPlayer = (offset: number): boolean => {
		return playerNumber !== undefined && findPlayerByPlayerNumber(playerNumber + offset) !== undefined;
	}

	const getUsername = (offset: number): string => {
		if (playerNumber === undefined) {
			return '';
		}
		const player = findPlayerByPlayerNumber(playerNumber + offset);
		return player.username;
	}

	const getPlayerHand = (offset: number): string[] => {
		if (playerNumber === undefined || playerHands === undefined) {
			return [];
		}
		const player = findPlayerByPlayerNumber(playerNumber + offset);
		return playerHands[player.playerNumber];
	}

	const getPlayerNumber = (offset: number): number => {
		if (playerNumber === undefined) {
			return 0;
		}
		const player = findPlayerByPlayerNumber(playerNumber + offset);
		console.log(`player number is ${player.playerNumber}`);
		return player.playerNumber;
	}

	return(
		<div className="fullSizeGameDiv">
			<div className="topDiv flex-items-center">
				<OtherPlayer
					name={shouldShowPlayer(2) ? getUsername(2) : 'waiting on player'}
					hand={shouldShowPlayer(2) ? getPlayerHand(2): []}
					isCurrentPlayer={shouldShowPlayer(2) && activePlayer === getPlayerNumber(2)}
				/>
			</div>
			<div className="middleDiv">
				<div className="smallMiddle flex-items-center">
				<OtherPlayer
					name={shouldShowPlayer(1) ? getUsername(1) : 'waiting on player'}
					hand={shouldShowPlayer(1) ? getPlayerHand(1): []}
					isCurrentPlayer={shouldShowPlayer(1) && activePlayer === getPlayerNumber(1)}
				/>
				</div>
				<div className="middleCentre">
					middleCentre
				</div>
				<div className="smallMiddle flex-items-center">
				<OtherPlayer
					name={shouldShowPlayer(3) ? getUsername(3) : 'waiting on player'}
					hand={shouldShowPlayer(3) ? getPlayerHand(3): []}
					isCurrentPlayer={shouldShowPlayer(3) && activePlayer === getPlayerNumber(3)}
				/>
				</div>
			</div>
			<div className="bottomDiv">
				<div className="myCards">
					{/* <img src="./assets/cards/ace_of_hearts.png" alt="" /> */}
					{
						playerHands && playerNumber && playerHands[playerNumber] && simpleSortHand(playerHands[playerNumber]).map((card: string) => {
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
				<div>
					{players.length === 4 && !isGameStarted() ? (
						<div className="dealCardsButton"
						onClick={handleDealCards}
						>
							DEAL CARDS
						</div>
					) : null}
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

function sendEvent(arg0: string) {
	throw new Error("Function not implemented.");
}

