import * as actions from './actions'
import * as types from '../types'

describe('Form Actions', () => {
	test('Selectors', () => {
		const state = {
			form: {
				tempo: 123,
				numMeasures: 215,
				metronomeEnabled: true,
			},
		}
		expect(actions.getTempo(state)).toEqual(state.form.tempo)
		expect(actions.getNumMeasures(state)).toEqual(state.form.numMeasures)
		expect(actions.getMetronomeEnabled(state)).toEqual(state.form.metronomeEnabled)
	})

	test('setNumMeasures', () => {
		expect(actions.setNumMeasures(100)).toEqual({
			type: types.SET_NUM_MEASURES,
			payload: 100,
		})
	})

	test('setTempo', () => {
		expect(actions.setTempo(100)).toEqual({
			type: types.SET_TEMPO,
			payload: 100,
		})
	})

	test('toggleMetronome', () => {
		expect(actions.toggleMetronome()).toEqual({
			type: types.TOGGLE_METRONOME,
		})
	})
})
