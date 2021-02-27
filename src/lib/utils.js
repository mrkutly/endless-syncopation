import * as _ from 'ramda'

export const isEven = _.compose(_.equals(0), _.modulo(_.__, 2))
export const isOdd = _.complement(isEven)

export const Identity = (x) => ({
	map: f => Identity(f(x)),
	fold: f => f(x),
	chain: f => f(x),
	toString: `Identity(${x})`,
})

export const Left = (x) => ({
	map: f => Left(x),
	chain: f => Left(x),
	fold: (f, g) => f(x),
	toString: `Left(${x})`,
})

export const Right = (x) => ({
	map: f => Right(f(x)),
	chain: f => f(x),
	fold: (f, g) => g(x),
	toString: `Right(${x})`,
})

export const fromNullable = (x) => x != null ? Right(x) : Left()

export const tryCatch = (f) => {
	try {
		return Right(f())
	} catch (error) {
		return Left(error)
	}
}