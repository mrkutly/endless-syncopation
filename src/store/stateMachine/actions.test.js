import * as actions from './actions'
import * as types from '../types'

describe('State Machine Actions', () => {
	test('loadDoc', () => {
		expect(actions.loadDoc()).toEqual({
			type: types.LOAD_DOC,
		})
	})

	test('success', () => {
		expect(actions.success()).toEqual({
			type: types.SUCCESS,
		})
	})

	test('pause', () => {
		expect(actions.pause()).toEqual({
			type: types.PAUSE,
		})
	})

	test('play', () => {
		expect(actions.play()).toEqual({
			type: types.PLAY,
		})
	})
})
