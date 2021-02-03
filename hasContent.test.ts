import hasContent from './hasContent';

describe('hasContent', () => {
	function tester(){}



	test('param:0 to be true', () => {
		expect(hasContent(0)).toBeTruthy();
	});
	test('param:1 to be true', () => {
		expect(hasContent(1)).toBeTruthy();
	});
	test('param:-0.5 to be true', () => {
		expect(hasContent(-0.5)).toBeTruthy();
	});
	test('param:undefined to be false', () => {
		expect(hasContent(undefined)).toBeFalsy();
	});

}
)