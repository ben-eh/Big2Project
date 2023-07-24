import { createReadStream } from "fs"
import Deck from "./deck"
import cardMap from "./cardMap";

export default class Game {

	isFirstHand: boolean = true;
	
	startGame = (): any => {
		// instantiate new Deck
		const deck = new Deck(cardMap);
		// shuffle cards
		deck.shuffle();
		// deal cards
		const playerHands = deck.dealAllCards(4);
		// decide who plays first
		const activePlayer = this.whoPlaysFirst(playerHands);
		// return game object;
		return {playerHands, activePlayer};
	}

	whoPlaysFirst = (playerHands: any) => {
		let playerNumber: number = 1;
		Object.entries(playerHands).map((hand: any[]) => {
			if (hand[1].includes('d3')) {
				playerNumber = parseInt(hand[0]);
			}
		})			
		return playerNumber;
	}


}