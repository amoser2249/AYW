// test.js
describe('This test', function() {
	it('Should always return true', function() {
		expect(true).toBe(true);
	});
})

describe('Add', function() {
	it('Should add two numbers together', function() {
		expect(add(1,2)).toBe(3);
		expect(add(3,6)).toBe(9);
	})
});