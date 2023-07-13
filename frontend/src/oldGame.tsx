import { useEffect, useState } from "react";
import cardMap from "./utils/cardMap";
import Deck from "./utils/deck";
import { simpleSortHand } from "./utils/hands";

const GamePage = () => {

	const [myCards, setMyCards] = useState<string[]>([]);
	const [playedHand, setPlayedCards] = useState<string[]>(['s10']);
	const [tenzillaHand, setTenzillaCards] = useState<string[]>(['d9', 'c1']);
	const [adamHand, setAdamCards] = useState<string[]>(['d10', 'd11', 'd12', 'd13', 'd1', 'c10', 'c11', 'c12']);
	const [nithinHand, setNithinCards] = useState<string[]>(['s10', 's11', 's12', 's13', 'h10', 'h11', 'h12', 'h13', 'h1']);

	const handlePlayCard = (card: string) => {
		// if (!isValidPlay(card)) return;
		const newHand = [card];
		setPlayedCards(newHand);
		const myNewHand = [...myCards];
		const index = myNewHand.indexOf(card);
		if (index < 0) return;
		myNewHand.splice(index, 1);
		setMyCards(myNewHand);
	}

	const handlePlayedCard = (card: string) => {
		
	}

	useEffect(() => {
		const deck = new Deck(cardMap);
		deck.shuffle();
		const playerHands: any = deck.dealAllCards(4);
		const player1Hand: any[] = playerHands[1];
		const player1HandInitialSort: any[] = simpleSortHand(player1Hand);
		setMyCards(player1HandInitialSort);
	}, []);

	return (
		<div className="fullSizeGameDiv">
			<div className="topDiv">
				<div>
					<h3 className="playerNames">Adam</h3>
				</div>
				<div className="cardsDiv">
					{
						adamHand.map((card) => {
							return (
								<img
									key={card}
									className="cardBack"
									src="./assets/back_of_card.png"
									alt="whatever"
								/>
							)
						})
					}
				</div>
			</div>
			<div className="middleDiv">
				<div className="middleLeft">
					<div>
						<h3 className="playerNames">Tenzin</h3>
					</div>
					<div className="cardsDiv">
						<p>testing</p>
					</div>
					<div className="lastCardButton">
						<p>Last Card</p>
					</div>
				</div>
				<div className="middleCentre">
					<div className="playedCards">
						{
							playedHand.map((card) => {
								return (
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
				<div className="middleRight">
					<div>
						<h3 className="playerNames">Nithin</h3>
					</div>
					<div className="cardsDiv">
					{
						nithinHand.map((card) => {
							return (
								<img
									key={card}
									className="cardBack"
									src="./assets/back_of_card.png"
									alt="whatever"
								/>
							)
						})
					}
				</div>
				</div>
			</div>
			<div className="bottomDiv">
				<div className="myCards">
					{
						myCards.map((card) => {
							return (
								<img
									key={card}
									className="cardSize"
									src={`./assets/cards/${cardMap[card]}`}
									alt="whatever"
									onClick={(e) => handlePlayCard(card)}
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