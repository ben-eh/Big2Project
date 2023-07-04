const cardMap:any = {}

const suitsMap:any = {
	d: 'diamonds',
	c: 'clubs',
	h: 'hearts',
	s: 'spades'
}

Object.keys(suitsMap).map((suitLetter) => {
	for(let i = 1; i <=13; i++) {
		const key:string = `${suitLetter}${i}`;
		let cardValue:any = i;
		let cardVersion:string|number = '';
		if (i === 1) {
			cardValue = 'ace';
		}
		if (i === 11) {
			cardValue = 'jack';
			cardVersion = 2;
		}
		if (i === 12) {
			cardValue = 'queen';
			cardVersion = 2;
		}
		if (i === 13) {
			cardValue = 'king';
			cardVersion = 2;
		}
		const value:string = `${cardValue}_of_${suitsMap[suitLetter]}${cardVersion}.png`;
		cardMap[key] = value;
	}
})

export default cardMap;