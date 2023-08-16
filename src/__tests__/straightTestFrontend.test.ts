const numberValue: any = {
	1: 14,
	2: 15,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	10: 10,
	11: 11,
	12: 12,
	13: 13
}

export const getMappedFaceValue = (faceValue: number): number => {
	return numberValue[faceValue];
}

const findStraights = (cards: string[]): string[][] | undefined => {
	const cardValues = Object.keys(cards);
	let highestValue: number = 0;
	let count = 0;
	let map: any = {};

	// Loop through all the cards in the hand
	cardValues.map((card, i) => {
		const faceValue = parseInt(card);
		const currentMappedValue = getMappedFaceValue(faceValue);
		const cardAfterMappedValue = getMappedFaceValue(parseInt(cardValues[i+1]));
		
		// If next card is correct
		if (currentMappedValue + 1 === cardAfterMappedValue) {
			highestValue = faceValue;
			count++;
		}

		// If next is not correct
		if (currentMappedValue + 1 !== cardAfterMappedValue || faceValue === 2) {

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

const returnMappedCardsPlayed = (cardsPlayed: string[]): any => {
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

const test = (cardsPlayed: string[]): string[][] => {
    cardsPlayed.reduce();
}


const straight = ['d4', 'c6', 's5', 'd8', 'h7', 's10', 'h11', 'h12', 'h13', 's14'];
const cardMap = returnMappedCardsPlayed(straight);
describe('It should work', () => {
    test('should work', () => {
        const result = findStraights(cardMap);
        
    });
});