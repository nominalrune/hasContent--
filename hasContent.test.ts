import hasContent from './hasContent';

describe('premitives', () => {
	test('param: 0 to be false', () => {
		expect(hasContent(0)).toBeFalsy();
	});
	test('param: 0 to be true(by setting))', () => {
		expect(hasContent(0, ['zero'])).toBeTruthy();
	});
	test('param: 1 to be true', () => {
		expect(hasContent(1)).toBeTruthy();
	});
	test('param: -0.5 to be true', () => {
		expect(hasContent(-0.5)).toBeTruthy();
	});
	test('param: Infinity to be true', () => {
		expect(hasContent(Infinity)).toBeTruthy();
	});
	test('param: undefined to be false', () => {
		expect(hasContent(undefined)).toBeFalsy();
	});
	test('param: null to be false', () => {
		expect(hasContent(null)).toBeFalsy();
	});
	test('param: "" to be false', () => {
		expect(hasContent("")).toBeFalsy();
	});
	test('param: NaN to be false', () => {
		expect(hasContent(NaN)).toBeFalsy();
	});

});
describe('functions', () => {
	test('param: function to be true(by default)', () => {
		expect(hasContent((() => { }))).toBeTruthy();
	});
	test('param: function to be false(by setting)', () => {
		expect(hasContent((() => { }), [], ['function'])).toBeFalsy();
	});
})

describe('simple arrays', () => {
	test('param: [] to be false', () => {
		expect(hasContent([])).toBeFalsy();
	});
	test('param:[ [] ]to be false', () => {
		expect(hasContent([[]])).toBeFalsy();
	});
	test('param:[ [],[] ]to be false', () => {
		expect(hasContent([[], []])).toBeFalsy();
	});
	test('param: [true] to be true', () => {
		expect(hasContent([true])).toBeTruthy();
	});
	test('param: [undefined] to be false', () => {
		expect(hasContent([undefined])).toBeFalsy();
	});
	test('param: [true,undefined] to be true', () => {
		expect(hasContent([true, undefined])).toBeTruthy();
	});
	test('param: [undefined,true] to be true', () => {
		expect(hasContent([undefined, true])).toBeTruthy();
	});
});

describe('simple objects', () => {
	test('param: {a:undefined} to be false', () => {
		expect(hasContent({ a: undefined })).toBeFalsy();
	});
	test('param: {a:4} to be true', () => {
		expect(hasContent({ a: 4 })).toBeTruthy();
	});
	test('param: {a:false,b:true} to be true', () => {
		expect(hasContent({ a: 4 })).toBeTruthy();
	});
	test('param: {a:{b:undefined}} to be false', () => {
		expect(hasContent({ a: { b: undefined } })).toBeFalsy();
	});
	test('param: {a:{b:{c:{d:{e:{f:true}}}}}} to be false', () => {
		expect(hasContent({ a: { b: {c:{d:{e:{f:true}}}} } })).toBeFalsy();
	});
});


describe('complex objects', () => {
	test('param: [{a:undefined}] to be false', () => {
		expect(hasContent([{ a: undefined }])).toBeFalsy();
	});

	test('param: {a:{b:[[[[[undefined]]]]]}} to be false', () => {
		expect(hasContent({ a: { b: [[[[[undefined]]]]] } })).toBeFalsy();
	});
	test('param: {a:{b:[[[[[true]]]]]}} to be false', () => {
		expect(hasContent({ a: { b: [[[[[true]]]]] } })).toBeFalsy();
	});
	test('param: {a:{b:[undefined,1]}} to be true', () => {
		expect(hasContent({ a: { b: [[undefined, 1]] } })).toBeTruthy();
	});
}
)

describe('Map', () => {

	test('Map without value should be false', () => {
		expect(
			hasContent(new Map())
		).toBeFalsy();
	})
	test('Map with truthy value should be true', () => {
		const map = new Map();
		map.set('foo', 'bar');
		expect(
			hasContent(map)
		).toBeTruthy();
	})
	test('Map with truthy (nested) value should be true', () => {
		const map = new Map();
		map.set('foo', {"ye":['suis']});
		expect(
			hasContent(map)
		).toBeTruthy();
	})
	test('Map with falsy value should be false', () => {
		const map = new Map();
		map.set('foo', false);
		expect(
			hasContent(map)
		).toBeFalsy();
	})
});

describe('Set', () => {
	test('set with truthy value should be true', () => {
		const set = new Set();
		set.add('foo');
		expect(
			hasContent(set)
		).toBeTruthy();
	})
	test('set with truthy (nested) value should be true', () => {
		const set = new Set();
		set.add({"ye":['suis']});
		expect(
			hasContent(set)
		).toBeTruthy();
	})
	test('set with falsy value should be false', () => {
		const set = new Set();
		set.add(false);
		expect(
			hasContent(set)
		).toBeFalsy();
	})
});


describe('Symbol always true', () => {
	test('Symbol with string should be true', () => {
		expect(hasContent(Symbol('foo'))).toBeTruthy();
	});
	test('Symbol with 0 should be true', () => {
		expect(hasContent(Symbol(0))).toBeTruthy();
	});
});