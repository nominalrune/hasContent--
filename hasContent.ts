export default function hasContent(
	target: any,
	accepts: ('zero' | '')[] = [],
	rejects: ('function')[] = [],
	seekDepth = 5
): boolean {
	return !!(
		(
			(accepts.includes('zero') && (target === 0))
			|| (target instanceof Function && !rejects.includes('function'))
			|| target && !(target instanceof Object)
			|| (target?.[Symbol.iterator] && [...target].length &&
				[...(target.values())].some((i) => (
					seekDepth > 0
						? hasContent(i, accepts, rejects, --seekDepth)
						: false
				))
			)
		)
		??
		(
			(target instanceof Object &&
				Object.getOwnPropertyNames(target).length &&
				Object.getOwnPropertyNames(target).some((i) => (
					seekDepth > 0
						? hasContent(target[i], accepts, rejects, --seekDepth)
						: false
				))
			)//||hasContent(JSON.parse(JSON.stringify(target)), accepts, rejects, 0)
		)
	)
}
