import { createReadStream } from "fs"
import Deck from "./deck"
import cardMap from "./cardMap";
import { Socket } from "socket.io";
import { HandType } from "./hand-helper";

type UserInfo = {
	id: string;
	username: string;
	playerNumber: number;
	socket: Socket;
}

export default class Game {
	
	isFirstHand: boolean = true;

	activePlayer: number = 1;
	playerHands: string[][] = [];
	room: string;
	players: UserInfo[] = [];
	middleCards: string[] = [];
	activeHandType: HandType|undefined;

	constructor (roomName: string) {
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
		// instantiate new Deck
		const deck = new Deck(cardMap);
		// shuffle cards
		deck.shuffle();
		// deal cards
		this.playerHands = deck.dealAllCards(4);
		// decide who plays first
		this.activePlayer = this.whoPlaysFirst(this.playerHands);
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

	playSingleCard = (card: string) => {
		this.middleCards = [];
		this.middleCards.push(card);
		const relevantHand: string[] = this.playerHands[this.activePlayer];
		const newHand = relevantHand.filter((currentCard) => {
			return currentCard !== card;
		})
		this.playerHands[this.activePlayer] = newHand;
		this.activePlayer === 4 ? this.activePlayer = 1 : this.activePlayer ++;
	}

}