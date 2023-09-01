import { createReadStream } from "fs"
import Deck from "./deck"
import cardMap from "./cardMap";
import { Socket } from "socket.io";
import { HandType, typeOfHandPlayed } from "./hand-helper";
import { PlayerHands } from "./database/types";

type UserInfo = {
	id: string;
	username: string;
	playerNumber: number;
	socket: Socket;
}

type UserScoreMap = {
	[username: string]: number;
}

const scores: UserScoreMap = {
	Brando: 0,
	Benno: 0,
	Monkey: 0,
	Tyler: 0
}

export default class Game {

	isFirstHand: boolean = true;

	activePlayer: number = 1;
	playerHands: string[][] = [];
	room: string;
	players: UserInfo[] = [];
	middleCards: string[] = [];
	activeHandType: HandType | undefined;
	passCounter: number = 0;
	playerCannotSkip = true;
	round_scores: any[] = [];

	constructor(roomName: string) {
		this.room = roomName;
	}

	addPlayer = (socket: Socket, username: string) => {
		const playerId = socket.id;
		const playerNumber = this.players.length + 1;
		this.players.push({ id: playerId, username, socket, playerNumber });
		return playerNumber;
	}

	removePlayer = (socket: Socket) => {
		this.players = this.players.filter((player) => player.id !== socket.id);
	}

	startGame = (): any => {
		this.startRound();
		// decide who plays first
		this.activePlayer = this.findPlayerWithD3(this.playerHands);
	}

	startRound = (): any => {
		// instantiate new Deck
		const deck = new Deck(cardMap);
		// shuffle cards
		deck.shuffle();
		// deal cards
		this.playerHands = deck.dealAllCards(4);
		// clear out middle cards
		this.middleCards = [];
	}

	findPlayerWithD3 = (playerHands: any) => {
		let playerNumber: number = 1;
		Object.entries(playerHands).map((hand: any[]) => {
			if (hand[1].includes('d3')) {
				playerNumber = parseInt(hand[0]);
			}
		})
		return playerNumber;
	}

	playCards = (cards: string[]) => {
		this.middleCards = [...cards];
		this.activeHandType = typeOfHandPlayed(cards);
		const relevantHand: string[] = this.playerHands[this.activePlayer];
		const newHand = relevantHand.filter((currentCard) => {
			return !cards.includes(currentCard);
		})
		this.playerHands[this.activePlayer] = newHand;
		this.updateActivePlayer();
	}

	checkForZeroCards = (): boolean => {
		const playerCards = Object.values(this.playerHands);
		const handLengths = playerCards.map((cards) => {
			return cards.length;
		})
		return (handLengths.includes(0));
	}

	updateActivePlayer = (): void => {
		this.activePlayer === 4 ? this.activePlayer = 1 : this.activePlayer++;
	}

	updatePassCounter = (): void => {
		if (this.passCounter === 2) {
			this.passCounter = 0;
			this.resetMiddleCards();
			this.resetActiveHandType();
			this.setPlayerCannotSkip(true);
		} else {
			this.passCounter++;
		}
	}

	resetMiddleCards = (): void => {
		this.middleCards = [];
	}

	resetActiveHandType = (): void => {
		this.activeHandType = undefined;
	}

	setPlayerCannotSkip = (argument: boolean): void => {
		this.playerCannotSkip = argument;
	}

	endRound = () => {
		// add up scores
		const scores = this.tallyUpScores();
		this.round_scores.push(scores);
		this.activePlayer = this.getPlayerWithScoreOfZero(scores);
		// send round_scores to front end to be displayed
		// reshuffle deck
		// deal cards
		// set activePlayer to player who won last round
		this.startRound();
	}

	getPlayerWithScoreOfZero = (playerScores: any) => {
		for (const [key, value] of Object.entries(playerScores)) {
			if (value === 0) return parseInt(key); 
		}
		// this should never happen because there will always be a winner with a score of 0
		return 0;
	}

	// gameOver = () => {
	// 	// Write to the database
	// 	// const database = new Database();
	// 	database.updateGameTable({
	// 		id: 'random-generated',
	// 		winner: '',
	// 		...
	// 	});

	// }

	tallyUpScores = (): any => {
		const playerScores: any = {};
		for (const player of this.players) {
			const playerId = player.id;
			const hand: string[] = this.playerHands[`${player.playerNumber}`];
			const score: number = this.calculateScore(hand);
			playerScores[playerId] = score;
		}
		return playerScores;
	}

	calculateScore = (hand: string[]): number => {
		const amountOfCards = hand.length;
		switch (amountOfCards) {
			case 10:
				return 20;
			case 11:
				return 33;
			case 12:
				return 48;
			case 13:
				return 65;
			default:
				return amountOfCards;
		}
	}

}