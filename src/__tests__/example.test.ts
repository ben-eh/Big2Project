const add = (a: number, b: number): number => {
	return a + b;
}

const subtract = (a: number, b: number): number => {
	return a - b;
}

describe('add test suite', () => {
	test('test should add two numbers correctly', () => {
		const a = 20;
		const b = 15;
		const sum = add(a,b);
		expect(sum).toEqual(35);
	});
	test('add should fail', () => {
		const a = 20;
		const b = 15;
		const sum = add(a,b);
		expect(sum).toEqual(5);
	});
});

