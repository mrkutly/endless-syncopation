/* eslint-disable import/prefer-default-export */
import { curry } from 'ramda'

export const forwardPayload = (type) => (payload) => ({ type, payload })

export const expectState = curry((expected, received) => {
	expect(expected).toBe(received)
	return received
})

export const applyAction = curry((reducerFn, action, s) => reducerFn(s, action))
