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

export const getMappedFaceValue = (faceValue: number): number => {
	return numberValue[faceValue];
}

const playerSortStyle: string = 'lefty';

const getNumberArray = (hand: string[]): any[] => {
	return Object.values(hand.reduce((acc: any, value) => {
		const number: string = value.slice(1);
		if (!acc[number]) acc[number] = [];
		acc[number].push(value);
		return acc;
	}, {}));
}

const sortNumberArrayByNumber = (list: any[]): any[] => {
	return list.sort((itemA: string[], itemB: string) => {
			const a: number = numberValue[itemA[0].slice(1)];
			const b: number = numberValue[itemB[0].slice(1)];
			// playerSortStyle === 'lefty' ? return a - b: ;
			return ( playerSortStyle === 'lefty' ) ? a - b: b - a;
	});
}

const sortNumberSubArraysBySuit = (list: any[]) => {
	return list.map((numbers: any[]) => {
		return numbers.sort((itemA: string[], itemB: string[]) => {
			const a: number = suitValue[itemA[0]];
			const b: number = suitValue[itemB[0]];
			return ( playerSortStyle === 'lefty' ) ? a - b: b - a;
		});
	});
}

export const simpleSortHand = (hand: string[]): string[] => {
	const list: any[] = getNumberArray(hand);
	const listSortedByNumber: any[] = sortNumberArrayByNumber(list);
	const listSortedBySuit: any[] = sortNumberSubArraysBySuit(listSortedByNumber);
	return listSortedBySuit.flat();
}