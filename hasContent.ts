export default function hasContent(
	target: any,
	accepts: ('zero' | '')[] = [],
	rejects: ('function')[] = [],
	seekDepth = 5
): boolean {
	return !!(
		(
			(target === 0 && accepts.includes('zero'))
			|| (target instanceof Function && !rejects.includes('function'))
			|| target && !(target instanceof Object)
			|| null
		)
		??
		(
			(target && !(target instanceof Object))
			||
			(target?.[Symbol.iterator] && [...target].length &&
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
			)
		)
	)
}
