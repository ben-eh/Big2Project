export default class Deck {

	private deck: string[];

	constructor(cardMap: any) {
		this.deck = Object.keys(cardMap);
	}
	
	shuffle = () => {
		this.deck = this.deck
			.map(value => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value)
	}

	dealAllCards = (numberOfPlayers: number): any => {
		const players: any = {}
		for(let i = 1; i <= numberOfPlayers; i++) {
			players[i] = [];
		}
		let player: number = 1;
		while (this.deck.length > 0) {
			const cardToBeDealt = this.deck.shift();
			players[player].push(cardToBeDealt);
			player++;
			if (player > numberOfPlayers) {
				player = 1;
			}
		}
		return players;
	}

	printDeck = () => {
		console.log(this.deck);
	}

}