import * as actions from './actions'
import * as types from '../types'

describe('Welcome Message Actions', () => {
	test('loadDoc', () => {
		expect(actions.setSeen()).toEqual({
			type: types.SET_WELCOME_SEEN,
		})
	})
})
