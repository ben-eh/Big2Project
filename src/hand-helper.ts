
export type HandType = 'singles' | 'doubles' | 'triples' | 'pokerHand';

type PokerHandType = 'straight' | 'flush' | 'full_house' | 'straight_flush' | 'four_of_a_kind' | 'royal_flush';

type PokerHandValueMap = {
	[pokerHandType in PokerHandType]: number;
}

const pokerHandValues: PokerHandValueMap = {
	'straight': 1,
	'flush': 2,
	'full_house': 3,
	'straight_flush': 4,
	'four_of_a_kind': 5,
	'royal_flush': 6
}

const suitValue: any = { 'd': 0, 'c': 1, 'h': 2, 's': 3 };
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

/* 
		Descirption: 	Determines if a given hand is valid to play
		Parameters: 	cardsPlayed - The list of cards to check
									activeHandType - the type of hand that was previously played that we must follow (i.e. singles, doubles, poker hand)
									middleCards - the cards visible in the middle of the table, the last cards thrown that need to be beat in order to play)
		Returns: 		boolean - If the given list of cards is valid to play
*/
export const isValidHand = (cardsPlayed: string[], activeHandType: HandType | undefined, middleCards: string[]): boolean => {
	// first person playing can play whatever hand type they want
	if (activeHandType === undefined) return true;

	// check to see that person is playing same type of hand, return false if not
	const handType: HandType = typeOfHandPlayed(cardsPlayed);
	if (handType !== activeHandType) return false;

	// check to see if hand being played can legally beat hand on table
	switch (handType) {
		case 'singles': return isValidSingles(cardsPlayed, middleCards);
		case 'doubles': return isValidDoubles(cardsPlayed, middleCards);
		case 'triples': return isValidTriples(cardsPlayed, middleCards);
		case 'pokerHand': return canPlayPokerHand(cardsPlayed, middleCards);
		default: return false;
	}
}

export const isValidSingles = (cardsPlayed: string[], middleCards: string[]): boolean => {
	// get suit and value for each card
	const cardPlayedMap: any = returnMappedCardsPlayed(cardsPlayed);
	const middleCardMap: any = returnMappedCardsPlayed(middleCards);

	// Get all needed card values
	const cardPlayedValue: number = getActualCardValueFromFaceValue(parseInt(Object.keys(cardPlayedMap)[0]));
	const cardPlayedSuitValue: number = getSuitValueFromCardValue(Object.values(cardPlayedMap)[0] as string);
	const middleCardValue: number = getActualCardValueFromFaceValue(parseInt(Object.keys(middleCardMap)[0]));
	const middleCardSuitValue: number = getSuitValueFromCardValue(Object.values(middleCardMap)[0] as string);

	// check card being played is less or greater than card on table
	if (cardPlayedValue < middleCardValue) return false;
	if (cardPlayedValue > middleCardValue) return true;

	// if same value, compare suits
	if (cardPlayedValue === middleCardValue)
		return (cardPlayedSuitValue > middleCardSuitValue);

	// This should never happen due to checking before this function call
	return false;
}

export const isValidDoubles = (cardsPlayed: string[], middleCards: string[]): boolean => {
	// get suit and value for each card
	const cardsPlayedMap: any = returnMappedCardsPlayed(cardsPlayed);
	const cardsPlayedValue: number = getActualCardValueFromFaceValue(parseInt(Object.keys(cardsPlayedMap)[0]));
	const cardsPlayedHighestSuitValue: number = getSuitValueFromCardValueForDoubles(Object.values(cardsPlayedMap));
	console.log(cardsPlayedHighestSuitValue);

	const middleCardsMap: any = returnMappedCardsPlayed(middleCards);
	const middleCardsValue: number = getActualCardValueFromFaceValue(parseInt(Object.keys(middleCardsMap)[0]));
	const middleCardsHighestSuitValue: number = getSuitValueFromCardValueForDoubles(Object.values(middleCardsMap));

	// check card being played is less or greater than card on table
	if (cardsPlayedValue < middleCardsValue) return false;
	if (cardsPlayedValue > middleCardsValue) return true;

	// if same value, compare suits
	if (cardsPlayedValue === middleCardsValue) {
		return (cardsPlayedHighestSuitValue > middleCardsHighestSuitValue);
	}
	
	return false;
}

export const isValidTriples = (cardsPlayed: string[], middleCards: string[]): boolean => {
	// get suit and value for each card
	const cardsPlayedMap: any = returnMappedCardsPlayed(cardsPlayed);
	const cardsPlayedValue: number = getActualCardValueFromFaceValue(parseInt(Object.keys(cardsPlayedMap)[0]));

	const middleCardsMap: any = returnMappedCardsPlayed(middleCards);
	const middleCardsValue: number = getActualCardValueFromFaceValue(parseInt(Object.keys(middleCardsMap)[0]));
	// check card being played is less or greater than card on table
	if (cardsPlayedValue < middleCardsValue) return false;
	if (cardsPlayedValue > middleCardsValue) return true;
	return false;
}

const getActualCardValueFromFaceValue = (faceValue: number): number => {
	return numberValue[faceValue];
}

const getSuitValueFromCardValue = (card: string): number => {
	return suitValue[card];
}

/* 
		Descirption: 	Finds the best suit value
		Parameters: 	cardsArray - The list of cards to check
		Returns: 		number - The highest value for the suit
*/
const getSuitValueFromCardValueForDoubles = (cardsArray: string[][]): number => {
	const cardSuits = cardsArray[0];
	const cardSuitValues = cardSuits.map((card) => {
		return suitValue[card];
	})
	return Math.max(...cardSuitValues);
}

/* 
		Descirption: 	Determines the type of hand played
		Parameters: 	cardsPlayed - The list of cards to check
		Returns: 		HandType - The type of hand played
*/
export const typeOfHandPlayed = (cardsPlayed: string[]): HandType => {
	// check to see if single card
	if (cardsPlayed.length === 1) {
		return 'singles';
	}

	// check to see if doubles (value of two cards must be equal)
	if (cardsPlayed.length === 2) {
		const firstCardValue = cardsPlayed[0].slice(1);
		const secondCardValue = cardsPlayed[1].slice(1);
		if (firstCardValue === secondCardValue) {
			return 'doubles';
		} else {
			throw new Error('card values must match for doubles');
		}
	}

	// check to see if triples (value of three cards must be equal)
	if (cardsPlayed.length === 3) {
		const firstCardValue = cardsPlayed[0].slice(1);
		const secondCardValue = cardsPlayed[1].slice(1);
		const thirdCardValue = cardsPlayed[2].slice(1);
		if (firstCardValue === secondCardValue && firstCardValue === thirdCardValue) {
			return 'triples';
		} else {
			throw new Error('card values must match for triples');
		}
	}
	// check to see if valid poker hand
	const isPokerHand = pokerHandType(cardsPlayed);
	if (isPokerHand) return 'pokerHand';

	throw new Error('Invalid hand');
}

/* 
		Description: 	Determines the type of poker hand being played
		Parameters: 	cardsPlayed - The list of cards to check
		Returns: 		PokerHandType - the type of poker hand being played
*/
export const pokerHandType = (cardsPlayed: string[]): PokerHandType|undefined => {
	if (cardsPlayed.length !== 5) return undefined;
	
	// see if hand is a royal flush
	if (isValidRoyalFlush(cardsPlayed)) return 'royal_flush';
	// see if hand is a 4 of a kind
	if (isValidFourOfAKind(cardsPlayed)) return 'four_of_a_kind';
	// see if hand is a straight flush
	if (isValidStraightFlush(cardsPlayed)) return 'straight_flush';
	// see if hand is a full house
	if (isValidFullHouse(cardsPlayed)) return 'full_house';
	// see if hand is a flush
	if (isValidFlush(cardsPlayed)) return 'flush';
	// see if hand is a straight
	if (isValidStraight(cardsPlayed)) return 'straight';
}

/* 
		Descirption: 	Determines if the poker hand can be played
		Parameters: 	cardsPlayed - The list of cards to check
					 	middleCards - The list of cards that were previously played
		Returns: 		boolean - If the given list of cards can be played
*/
export const canPlayPokerHand = (cardsPlayed: string[], middleCards: string[]): boolean => {
	const middleCardPokerHand: PokerHandType|undefined = pokerHandType(middleCards);
	const cardsPlayedPokerHand: PokerHandType|undefined = pokerHandType(cardsPlayed);
	if (middleCardPokerHand === undefined) return false;
	const middleCardPokerHandValue: number = pokerHandValues[middleCardPokerHand];
	if (cardsPlayedPokerHand === undefined) return false;
	const cardsPlayedPokerHandValue: number = pokerHandValues[cardsPlayedPokerHand];
	// if poker hand played is greater or less than the one on the table
	if (cardsPlayedPokerHandValue > middleCardPokerHandValue) return true;
	if (cardsPlayedPokerHandValue < middleCardPokerHandValue) return false;

	// if it's the same type of poker hand logic to follow
	if (cardsPlayedPokerHandValue === middleCardPokerHandValue) {
		switch (middleCardPokerHand) {
			case 'straight': return isWinningStraightHand(cardsPlayed, middleCards);
			case 'flush': return isWinningFlushHand(cardsPlayed, middleCards);
			case 'full_house': return isWinningFullHouseHand(cardsPlayed, middleCards);
			case 'straight_flush': return isWinningStraightFlushHand(cardsPlayed, middleCards);
			case 'four_of_a_kind': return isWinningFourOfAKind(cardsPlayed, middleCards);
			case 'royal_flush': return isWinningRoyalFlush(cardsPlayed, middleCards);
			default: return false;
		}
	}
	// This should never happen due to checking before this function call
	return false;
}

const isWinningRoyalFlush = (cardsPlayed: string[], middleCards: string[]): boolean => {
	return isWinningFlushHand(cardsPlayed, middleCards);
}

const isWinningFourOfAKind = (cardsPlayed: string[], middleCards: string[]): boolean => {
	const cardsPlayedQuadsValue = numberValue[getSetValue(cardsPlayed, 4)];
	const middleCardsQuadsValue = numberValue[getSetValue(middleCards, 4)];
	return (cardsPlayedQuadsValue > middleCardsQuadsValue);
}

const isWinningStraightFlushHand = (cardsPlayed: string[], middleCards: string[]): boolean => {
	if (isWinningFlushHand(cardsPlayed, middleCards)) return true;
	if (isWinningStraightHand(cardsPlayed, middleCards)) return true;
	
	// this will only return false if it's not a winning hand
	return false
}

const isWinningFullHouseHand = (cardsPlayed: string[], middleCards: string[]): boolean => {
	const cardsPlayedTriplesValue = numberValue[getSetValue(cardsPlayed, 3)];
	const middleCardsTriplesValue = numberValue[getSetValue(middleCards, 3)];
	return (cardsPlayedTriplesValue > middleCardsTriplesValue);
}

// get highest card from set of 3 (full house) or 4 (4 of a kind) - returns number for comparison
const getSetValue = (cardsPlayed: string[], setNumber: number): number => {
	let valueToReturn = 0;
	const mappedCards: string[][]= returnMappedCardsPlayed(cardsPlayed);
  for (const [key, value] of Object.entries(mappedCards)) {
  	if ( value.length === setNumber ) valueToReturn = parseInt(key);
  }
	return valueToReturn;
}

const isWinningFlushHand = (cardsPlayed: string[], middleCards: string[]): boolean => {
	// cards played important details
	const cardsPlayedSuitValue = getSuitValueFromCardValue(cardsPlayed[0].slice(0,1));
	const cardsPlayedHighestCardValue = flushHighestCardSameSuit(cardsPlayed);

	// cards on table important details
	const middleCardsSuitValue = getSuitValueFromCardValue(middleCards[0].slice(0,1));
	const middleCardsHighestCardValue = flushHighestCardSameSuit(middleCards);

	// compare suit values to see if higher or lower
	if (cardsPlayedSuitValue > middleCardsSuitValue) return true;
	if (cardsPlayedSuitValue < middleCardsSuitValue) return false;

	// if same suit, get highest card
	if (cardsPlayedSuitValue === middleCardsSuitValue) {
		return (cardsPlayedHighestCardValue > middleCardsHighestCardValue);
	}

	// This should never happen due to checking before this function call
	return false;
}

const flushHighestCardSameSuit = (cardsPlayed: string[]): number => {
	const cardValues: number[] = cardsPlayed.map((card: string) => {
		return numberValue[card.slice(1)] 
	});
	return Math.max(...cardValues);
}

const isWinningStraightHand = (cardsPlayed: string[], middleCards: string[]): boolean => {
	// cards played important details
	const cardsPlayedCardValues: number[] = straightSorter(cardsPlayed);
	const cardsPlayedHighestCard: number = cardsPlayedCardValues[4];
	const cardsPlayedMap: any = returnMappedCardsPlayed(cardsPlayed);
	const cardsPlayedHighestCardSuit: string = cardsPlayedMap[cardsPlayedHighestCard];
	const cardsPlayedHighestCardSuitValue = getSuitValueFromCardValue(cardsPlayedHighestCardSuit);
	
	// cards on table important details
	const middleCardsCardValues: number[] = straightSorter(middleCards);
	const middleCardsHighestCard: number = middleCardsCardValues[4];
	const middleCardsMap: any = returnMappedCardsPlayed(middleCards);
	const middleCardsHighestCardSuit: string = middleCardsMap[middleCardsHighestCard];
	const middleCardsHighestCardSuitValue = getSuitValueFromCardValue(middleCardsHighestCardSuit);

	// check to see if highest card is lower or higher
	if (cardsPlayedHighestCard > middleCardsHighestCard) return true;
	if (cardsPlayedHighestCard < middleCardsHighestCard) return false;

	// if highest card is the same
	if (cardsPlayedHighestCard === middleCardsHighestCard) {
		if (cardsPlayedHighestCardSuitValue < middleCardsHighestCardSuitValue) return false;
		if (cardsPlayedHighestCardSuitValue > middleCardsHighestCardSuitValue) return true;
	}

	// This should never happen due to checking before this function call
	return false;
}

/* 
		Descirption: 	Determines if a given hand is a valid straight
		Parameters: 	cardsPlayed - The list of cards to check
		Returns: 		boolean - if the given list of cards is a straight
*/
export const isValidStraight = (cardsPlayed: string[]): boolean => {
	const sortedCards: number[] = straightSorter(cardsPlayed);

	// make sure that each consecutive card's value is ONLY one higher than the previous card
	for (let i = 0; i < (sortedCards.length - 1); i++) {

		// The value we are currently looking at 
		const cValue: number = sortedCards[i];

		// The next value in the sorted list
		const nValue: number = sortedCards[i+1];

		// What the next value should be
		const expected: number = cValue + 1;

		// Check the values
		if (nValue !== expected) {
			return false;
		}
	}
	return true;
}

/* 
		Descirption: 	Determines if a given hand is a valid flush
		Parameters: 	cardsPlayed - The list of cards to check
		Returns: 		boolean - if the given list of cards is a flush
*/
export const isValidFlush = (cardsPlayed: string[]): boolean => {
	// get suits from all cards
	const cardSuits = flushSorter(cardsPlayed);
	// check to make sure they're all the same suit
	for (let i = 0; i < (cardSuits.length - 1); i++) {
		if (cardSuits[i] !== (cardSuits[i + 1])) {
			return false;
		}
	}
	return true;
}

export const isValidFullHouse = (cardsPlayed: string[]): boolean => {
	// get map (Object) of cards
	const cardsMap = returnMappedCardsPlayed(cardsPlayed);

	// guard clause - there should only be two values
	if (Object.keys(cardsMap).length !== 2) return false;

	const cardsArray: string[][] = Object.values(cardsMap);
	const firstSetLength = cardsArray[0].length;
	const secondSetLength = cardsArray[1].length;

	// condition for 3 and 2 of same value cards
	if ((firstSetLength === 3 || secondSetLength === 3)) {
		return true;
	} else {
		return false;
	}
}

const isValidStraightFlush = (cardsPlayed: string[]): boolean => {
	return (isValidFlush(cardsPlayed) && isValidStraight(cardsPlayed));
}

export const isValidFourOfAKind = (cardsPlayed: string[]): boolean => {
	const cardsMap = returnMappedCardsPlayed(cardsPlayed);

	// guard clause - there should only be two values
	if (Object.keys(cardsMap).length !== 2) return false;

	const cardsArray: string[][] = Object.values(cardsMap);
	const firstSetLength = cardsArray[0].length;
	const secondSetLength = cardsArray[1].length;

	// condition for 4 of the same value and 1 left over
	if ((firstSetLength === 4 || secondSetLength === 4)) {
		return true;
	} else {
		return false;
	}
}

const isValidRoyalFlush = (cardsPlayed: string[]): boolean => {
	const sortedCards = straightSorter(cardsPlayed);
	if (sortedCards[0] !== 10 && sortedCards[4] !== 14) return false;
	return isValidStraightFlush(cardsPlayed);
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

const straightSorter = (cardsPlayed: string[]): number[] => {
	const cardValues: number[] = cardsPlayed.map((card: string) => {
		// TODO - refactor this to use mapping from frontend
		return parseInt(card.slice(1)) === 1 ? 14 : parseInt(card.slice(1));
	})
	const sortedCards: number[] = cardValues.sort((a: number, b: number) => {
		return a - b;
	})
	return sortedCards;
}

const flushSorter = (cardsPlayed: string[]): string[] | number[] => {
	const cardSuits: string[] = cardsPlayed.map((card) => {
		return card.slice(0, 1);
	})
	return cardSuits;
}