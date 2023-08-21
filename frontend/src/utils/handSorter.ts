import { getMappedFaceValue, numberValue } from "./hands";


// const findAll4OfAKind = (hand: string[]): string[] => {
// 	// get count of each card value in the hand
// 	const valueCounts = getCardValuesAndCounts(hand);

// 	// check to see if there is any 4 of a Kind
// 	const acc: string[] = [];
// 	Object.keys(valueCounts)
// 		.reduce((acc, key) => {
// 		const count: number = valueCounts[key];
// 		if (count >= 4) {
// 			acc.push(key);
// 		}
// 	}, acc);

// 	return acc;
// }



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

const findFourOfAKind = (hand: string[]) => {
	// get count of each card value in the hand
	const valueCounts = getCardValuesAndCounts(hand);

	// check to see if there is any 4 of a Kind
	const fourOfAKindValue = getFourOfAKindValue(valueCounts);

	// if no 4 of a Kind, return null
	if (!fourOfAKindValue) {
		return null;
	}

	// get single cards to choose lowest one to finish 4 of a Kind hand
	const singleValuesArray = getSingleCardForFourOfAKind(valueCounts);

	// get lowest single card value
	const lowestSingleCardValue = getLowestSingleValue(singleValuesArray);

	// prepare hand with all 5 cards
	const fourOfAKindHand = assembleFourOfAKindHand(hand, singleValuesArray, fourOfAKindValue);

	// final check to make sure hand has 5 cards
	if (fourOfAKindHand.length !== 5) {
		return null; // Invalid hand
	}

	return fourOfAKindHand;
}

const getFourOfAKindValue = (valueCounts: any) => {
	let fourOfAKindValue: string | undefined = undefined;
	for (const value in valueCounts) {
		if (valueCounts[value] === 4) {
			fourOfAKindValue = value;
			break;
		}
	}
	return fourOfAKindValue;
}

const assembleFourOfAKindHand = (hand: string[], singlesValuesArray: number[], fourOfAKindValue: string) => {
	const fourOfAKindHand: string[] = [];
	let fifthCardValue = getLowestSingleValue(singlesValuesArray);

	hand.forEach(card => {
		const value = card.substring(1);
		if (value === fourOfAKindValue) {
			fourOfAKindHand.push(card);
		} else if (parseInt(value) === fifthCardValue) {
			fourOfAKindHand.push(card);
		}
	});
	return fourOfAKindHand;
}

const getLowestSingleValue = (singlesArray: number[]): number => {
	const sortedArray = singlesArray.sort((a, b) => {
		return numberValue[a] - numberValue[b]
	});
	return sortedArray[0];
}

const getSingleCardForFourOfAKind = (valueCounts: any): number[] => {
	const singleValuesWithCount = Object.entries(valueCounts);
	const singleValues = singleValuesWithCount.filter((entry) => {
		if (entry[1] === 1) return entry[0];
	})

	let singlesValuesArray = [];

	for (const [value] of Object.values(singleValues)) {
		const singleValue = parseInt(value[0]);
		singlesValuesArray.push(singleValue);
	}
	return singlesValuesArray;
}

const getCardValuesAndCounts = (cards: string[]): any => {
	const valueCounts: any = {}; // To store the count of each card value
	cards.forEach(card => {
		const value: string = card.substring(1); // Extract the value of the card
		if (valueCounts[value]) {
			valueCounts[value]++;
		} else {
			valueCounts[value] = 1;
		}
	});
	return valueCounts;
}

// const remainingCardsAfterPokerHand = () => {
// 	const fourOfAKindHand = findFourOfAKind(hand);
// 	const leftoverCards = hand.filter((el) => {
// 		return !fourOfAKindHand.includes(el);
// 	})
// }

const containsStraight = (cards: number[]): string[] | undefined => {
	const cardValues = Object.keys(cards);
	let counter: number = 0;
	let foundStraight: boolean = false;
	let temporaryStraightArray: string[] = [];
	cardValues.map((card, i) => {
		const cardAfter = cardValues[i + 1];
		if (card === cardAfter) {
			temporaryStraightArray.push(card);
			counter++;
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
		const cardAfter = cardValues[i + 1];

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
		for (let i = 0; i < cardCount; i++) {
			cards.push(`${numberHighest - i}`);
		}
		return cards;
	});

	return returnValues;
}