import { getMappedFaceValue } from "./hands";

export const returnMappedCardsPlayed = (cardsPlayed: string[]): any => {
	const map: any = {};
	cardsPlayed.reduce((acc, currentCard) => {
		const value = parseInt(currentCard.slice(1));
		const suit = currentCard.slice(0, 1);
		if (acc[value] === undefined) acc[value] = [];
		acc[value].push(suit);
		return acc;
	}, map);
	return map;
}

const containsStraight = (cards: number[]): string[] | undefined => {
	const cardValues = Object.keys(cards);
	let counter: number = 0;
	let foundStraight: boolean = false;
	let temporaryStraightArray: string[] = [];
	cardValues.map((card, i) => {
		const cardAfter = cardValues[i+1];
		if (card === cardAfter) {
			temporaryStraightArray.push(card);
			counter ++;
		};
		if (card !== cardAfter) {
			temporaryStraightArray = [];
			counter = 0;
		}
		if (counter >= 5) foundStraight = true;
	})
	return temporaryStraightArray;
}

const findStraights = (cards: number[]): string[][] | undefined => {
	const cardValues = Object.keys(cards);
	let highestValue: number = 0;
	let count = 0;
	let map: any = {};

	// Loop through all the cards in the hand
	cardValues.map((card, i) => {
		const faceValue = parseInt(card);
		const mappedValue = getMappedFaceValue(faceValue);
		const cardAfter = cardValues[i+1];
		
		// If next card is correct
		if (card === cardAfter) {
			highestValue = faceValue;
			count++;
		}

		// If next is not correct
		if (card !== cardAfter || faceValue === 2) {

			// Set the highest value and count that way we can return the correct values
			map[highestValue] = count;

			// Reset our variables
			count = 0;
			highestValue = 0;
		};
	});

	// Build the return arrays
	const returnValues: string[][] = Object.keys(map).map((highest) => {
		const numberHighest: number = parseInt(highest);
		const cardCount: number = map[numberHighest];
		const cards: string[] = [];
		for (let i=0; i<cardCount; i++) {
			cards.push(`${numberHighest - i}`);
		}
		return cards;
	});

	return returnValues;
}