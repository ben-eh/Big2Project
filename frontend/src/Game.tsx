import { useEffect, useState } from "react";
import OtherPlayer from "./components/OtherPlayer";
import { simpleSortHand } from "./utils/hands";
import { Player, useSocket } from "./socketContext";
import cardMap from "./utils/cardMap";
import { returnMappedCardsPlayed } from "./utils/handSorter";
import { log } from "console";

const GamePage = () => {

	const [ currentSortedHand, setCurrentSortedHand ] = useState<string[]>([]);
	const [ temporaryCardsToPlay, setTemporaryCardsToPlay ] = useState<string[]>([]);
	const { 
		username,
		playerNumber, 
		players, 
		sendEvent, 
		playerHands, 
		room, 
		activePlayer, 
		middleCards,
		playerCannotSkip,
		playerScores
	} = useSocket();

	const handleDealCards = () => {
		sendEvent('deal_cards', room);
	}

	const selectCard = (card: string) => {
		if (activePlayer === playerNumber) {
			let newList = [...temporaryCardsToPlay];
			if ( temporaryCardsToPlay.includes(card) ) {
				newList = newList.filter((el) => {
					return el !== card;
				})
			} else {
				newList.push(card);
			}
			setTemporaryCardsToPlay(newList);
			console.log(temporaryCardsToPlay);
		} else {
			alert('it\'s not your turn, jabroni!')
		}
	}

	console.log(playerScores);
	
	const canSkip = (): boolean => {
		return (middleCards !== undefined && middleCards.length > 0);
	}
	
	const handleSkippedTurn = () => {
		sendEvent('skip_turn', {room});
	}
	
	const handlePlaySelectedCards = () => {
		sendEvent('play_cards', {cards: temporaryCardsToPlay, room})
		setTemporaryCardsToPlay([]);
	}
	
	const autoSortCardsIntoPokerHands = (firstPersonPlayerHand: string[]) => {
		const sortedHand = pokerHandSort(firstPersonPlayerHand);
		setCurrentSortedHand(sortedHand)
		console.log(sortedHand);
	}

	const pokerHandSort = (cards: string[]): string[] => {
		const mappedCards = returnMappedCardsPlayed(cards);
		console.log(mappedCards);
		return ['whatever'];
	}
	
	// useEffect(() => {
	// 	if (!playerNumber) return;
	// 	autoSortCardsIntoPokerHands(playerHands[playerNumber]);
	// }, [playerHands]);

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

	const getPlayerNameByID = (id: string): string => {
		const filteredPlayers = players.filter((player: Player) => {
			return player.id === id;
		});
		console.log(id);
		console.log(filteredPlayers);
		// return filteredPlayers[0].username;
		return 'whatever';
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
					<div>
						{
							middleCards && middleCards.map((card) => {
								return(
									<img
										key={card}
										className="middleCardSize"
										src={`./assets/cards/${cardMap[card]}`}
										alt="whatever"
									/>
								)
							})
						}
					</div>
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
				{/* <div className="myCards"> */}
				<div className="bottom-left">
					<h1>Scoreboard</h1>
					<div>
						<div>
							<h5></h5>
							{
								playerScores && Object.keys(playerScores).map((playerID) => {
									return(
										<h5>{getPlayerNameByID(playerID)}</h5>
									)
								})
							}
						</div>
						<div>
							<p>Round 1</p>
							<p>2</p>
							<p>0</p>
							<p>20</p>
							<p>7</p>
						</div>
						<div>
							<p>Round 2</p>
							<p>0</p>
							<p>8</p>
							<p>3</p>
							<p>5</p>
						</div>
						<div>
							<p>Total</p>
							<p>2</p>
							<p>8</p>
							<p>23</p>
							<p>12</p>
						</div>
					</div>
				</div>
				<div className={playerNumber === activePlayer ? 'myCards activePlayerBackground bottom-center' : 'bottom-center'}>
					{/* <img src="./assets/cards/ace_of_hearts.png" alt="" /> */}
					{
						playerHands && playerNumber && playerHands[playerNumber] && simpleSortHand(playerHands[playerNumber]).map((card: string) => {
							const isSelected = temporaryCardsToPlay.includes(card);
							return(
								<img
									key={card}
									className={isSelected ? `cardSize selectedCard` : `cardSize`}
									src={`./assets/cards/${cardMap[card]}`}
									alt="whatever"
									onClick={e => selectCard(card)}
								/>
							)
						})
					}
				</div>
				<div>
					{players.length === 4 && !isGameStarted() && (
						<div className="dealCardsButton"
						onClick={handleDealCards}
						>
							DEAL CARDS
						</div>
					)}
				</div>
				<div>
					{temporaryCardsToPlay.length > 0 && (
						<div className="dealCardsButton"
							onClick={handlePlaySelectedCards} >
							Play Cards
						</div>
					)}
				</div>
				<div>
					{isGameStarted() && playerNumber === activePlayer && canSkip() && (
						<div className="dealCardsButton"
						onClick={handleSkippedTurn}
						>
							Skip
						</div>
					)}
				</div>
			</div>
		</div>
	)

}

export default GamePage;
