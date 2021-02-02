export default function hasContent(
	target: any,
	options: { acceptZero?: boolean, acceptFunction?: boolean } = { acceptZero: true, acceptFunction: true },
	seekDepth = 5
): boolean {
	const { acceptZero, acceptFunction } = options;
	return (
		(target === 0 && acceptZero) ||
		(target && !(target instanceof Object)) ||
		(target instanceof Function && acceptFunction) ||
		(Symbol.iterator in target && [...target].some
			((i) => (
				i && seekDepth > 0 ?
					hasContent(i, options || {}, --seekDepth) :
					false)) ||
			(target instanceof Function && acceptFunction) ||
			(target instanceof Object &&
				Object.getOwnPropertyNames(target).length &&
				Object.getOwnPropertyNames(target).some((i) => (
					i && seekDepth > 0 ?
						hasContent(i, options || {}, --seekDepth) :
						false))
			)
		)
	)
}