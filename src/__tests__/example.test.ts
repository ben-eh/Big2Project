import { isValidHand, isValidSingles, isValidDoubles, isValidTriples, isValidStraight } from "../hand-helper";

// describe('isValidHand test suite', () => {
// 	test('', () => {
// 		const cardsPlayed = ['s5', 'd5', 'c11', 's11', 'h11'];
// 		const activeHandType = 'pokerHand';
// 		const middleCards = ['s4', 'd5', 'c6', 'h7', 's8'];
// 		const validHandTest = isValidSingles(cardsPlayed, middleCards);
// 		expect(validHandTest).toEqual(true);
// 	});
// })

describe('isValidHand test suite', () => {
	test('singles - higher card than what\'s on table', () => {
		const cardsPlayed = ['s5'];
		const middleCards = ['s4'];
		const validHandTest = isValidSingles(cardsPlayed, middleCards);
		expect(validHandTest).toEqual(true);
	});
	test('singles - lower card than what\'s on the table', () => {
		const cardsPlayed = ['s5'];
		const middleCards = ['s1'];
		const validHandTest = isValidSingles(cardsPlayed, middleCards);
		expect(validHandTest).toEqual(false);
	});
	test('singles - same value card, higher suit', () => {
		const cardsPlayed = ['s5'];
		const middleCards = ['h5'];
		const validHandTest = isValidSingles(cardsPlayed, middleCards);
		expect(validHandTest).toEqual(true);
	});
	test('singles - same value card, lower suit', () => {
		const cardsPlayed = ['c5'];
		const middleCards = ['h5'];
		const validHandTest = isValidSingles(cardsPlayed, middleCards);
		expect(validHandTest).toEqual(false);
	});
})

describe('isValidHand doubles test suite', () => {
	test('doubles - higher cards than what\'s on table', () => {
		const cardsPlayed = ['s5', 'd5'];
		const middleCards = ['s4', 'h4'];
		const validHandTest = isValidDoubles(cardsPlayed, middleCards);
		expect(validHandTest).toEqual(true);
	});
	test('doubles - lower cards than what\'s on the table', () => {
		const cardsPlayed = ['s5', 'd5'];
		const middleCards = ['s1', 'h1'];
		const validHandTest = isValidDoubles(cardsPlayed, middleCards);
		expect(validHandTest).toEqual(false);
	});
	test('doubles - same value cards, higher suit', () => {
		const cardsPlayed = ['s5', 'd5'];
		const middleCards = ['h5', 'c5'];
		const validHandTest = isValidDoubles(cardsPlayed, middleCards);
		expect(validHandTest).toEqual(true);
	});
	test('doubles - same value cards, lower suit', () => {
		const cardsPlayed = ['c5', 'd5'];
		const middleCards = ['h5', 's5'];
		const validHandTest = isValidDoubles(cardsPlayed, middleCards);
		expect(validHandTest).toEqual(false);
	});
})

describe('isValidHand triples test suite', () => {
	test('triples - higher cards than what\'s on table', () => {
		const cardsPlayed = ['s5', 'd5', 'c5'];
		const middleCards = ['s4', 'h4', 'd4'];
		const validHandTest = isValidTriples(cardsPlayed, middleCards);
		expect(validHandTest).toEqual(true);
	});
	test('triples - lower cards than what\'s on the table', () => {
		const cardsPlayed = ['s5', 'd5', 'c5'];
		const middleCards = ['s1', 'h1', 'd1'];
		const validHandTest = isValidTriples(cardsPlayed, middleCards);
		expect(validHandTest).toEqual(false);
	});
})

describe('isValidHand main function singles', () => {
	test('main function - singles, higher card', () => {
		const cardsPlayed = ['s5'];
		const activeHandType = 'singles';
		const middleCards = ['s4'];
		const validHandTest = isValidHand(cardsPlayed, activeHandType, middleCards);
		expect(validHandTest).toEqual(true);
	});
	test('main function - singles, lower card', () => {
		const cardsPlayed = ['s3'];
		const activeHandType = 'singles';
		const middleCards = ['s4'];
		const validHandTest = isValidHand(cardsPlayed, activeHandType, middleCards);
		expect(validHandTest).toEqual(false);
	});
	test('main function - singles, same card higher suit', () => {
		const cardsPlayed = ['s3'];
		const activeHandType = 'singles';
		const middleCards = ['c3'];
		const validHandTest = isValidHand(cardsPlayed, activeHandType, middleCards);
		expect(validHandTest).toEqual(true);
	});
	test('main function - singles, same card lower suit', () => {
		const cardsPlayed = ['h1'];
		const activeHandType = 'singles';
		const middleCards = ['s1'];
		const validHandTest = isValidHand(cardsPlayed, activeHandType, middleCards);
		expect(validHandTest).toEqual(false);
	});
})

describe('isValidHand main function doubles', () => {
	test('main function - doubles, higher cards', () => {
		const cardsPlayed = ['s5', 'c5'];
		const activeHandType = 'doubles';
		const middleCards = ['s4', 'h4'];
		const validHandTest = isValidHand(cardsPlayed, activeHandType, middleCards);
		expect(validHandTest).toEqual(true);
	});
	test('main function - doubles, lower cards', () => {
		const cardsPlayed = ['s3', 'c3'];
		const activeHandType = 'doubles';
		const middleCards = ['s4', 'h4'];
		const validHandTest = isValidHand(cardsPlayed, activeHandType, middleCards);
		expect(validHandTest).toEqual(false);
	});
	test('main function - doubles, same cards higher suit', () => {
		const cardsPlayed = ['s2', 'h2'];
		const activeHandType = 'doubles';
		const middleCards = ['c2', 'd2'];
		const validHandTest = isValidHand(cardsPlayed, activeHandType, middleCards);
		expect(validHandTest).toEqual(true);
	});
	test('main function - doubles, same cards lower suit', () => {
		const cardsPlayed = ['h1', 'd1'];
		const activeHandType = 'doubles';
		const middleCards = ['s1', 'c1'];
		const validHandTest = isValidHand(cardsPlayed, activeHandType, middleCards);
		expect(validHandTest).toEqual(false);
	});
})

describe('isValidHand main function triples', () => {
	test('main function - triples, higher cards', () => {
		const cardsPlayed = ['s2', 'c2', 'd2'];
		const activeHandType = 'triples';
		const middleCards = ['s1', 'h1', 'c1'];
		const validHandTest = isValidHand(cardsPlayed, activeHandType, middleCards);
		expect(validHandTest).toEqual(true);
	});
	test('main function - triples, lower cards', () => {
		const cardsPlayed = ['s3', 'c3', 'd3'];
		const activeHandType = 'triples';
		const middleCards = ['s4', 'h4', 'c4'];
		const validHandTest = isValidHand(cardsPlayed, activeHandType, middleCards);
		expect(validHandTest).toEqual(false);
	});
})

describe('isValidHand main function poker hand', () => {
	test('main function - poker hand - higher straight over straight', () => {
		const cardsPlayed = ['d4', 'c6', 's5', 'd8', 'h7'];
		const middleCards = ['s3', 'd4', 'c6', 'd5', 'c7'];
		const activeHandType = 'pokerHand';
		const validHandTest = isValidHand(cardsPlayed, activeHandType, middleCards);
		expect(validHandTest).toEqual(true);
	})
})

describe('isValidStraight', () => {
	test('should be a valid straight', () => {
		const cardsPlayed = ['d4', 'c6', 's5', 'd8', 'h7'];
		const isValid = isValidStraight(cardsPlayed);
		expect(isValid).toEqual(true);
	})
})