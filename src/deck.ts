export default class Deck {

	public suitValue: any = { 'd': 0, 'c': 1, 'h': 2, 's': 3 };
	
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
		const players = {
			1: ['d12'],
			2: ['s3', 's4'],
			3: ['h5', 'h6', 'h7'],
			4: ['c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12']
		}
		// const players: any = {}
		// for(let i = 1; i <= numberOfPlayers; i++) {
		// 	players[i] = [];
		// }
		// let player: number = 1;
		// while (this.deck.length > 0) {
		// 	const cardToBeDealt = this.deck.shift();
		// 	players[player].push(cardToBeDealt);
		// 	player++;
		// 	if (player > numberOfPlayers) {
		// 		player = 1;
		// 	}
		// }
		return players;
	}

	sortHand(a: any, b: any) {
		const suitA = a.charAt(0);
		const suitB = b.charAt(0);
		const numberA = parseInt(a.slice(1));
		const numberB = parseInt(b.slice(1));
	
		const adjustedNumberA = numberA === 2 ? 100 : numberA === 1 ? 99 : numberA;
		const adjustedNumberB = numberB === 2 ? 100 : numberB === 1 ? 99 : numberB;
	
		if (adjustedNumberA > adjustedNumberB) { // Reverse the comparison for descending order
			return -1;
		}
		if (adjustedNumberA < adjustedNumberB) { // Reverse the comparison for descending order
			return 1;
		}
	
		if (this.suitValue[suitA] < this.suitValue[suitB]) {
			return -1;
		}
		if (this.suitValue[suitA] > this.suitValue[suitB]) {
			return 1;
		}
	
		return 0;
	}
	
	printDeck = () => {
		console.log(this.deck);
	}

}