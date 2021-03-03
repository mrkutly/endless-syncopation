import * as actions from './actions'
import reducer from './reducer'
import { Identity } from '../../lib/utils'

describe('Form Actions', () => {
	test('setNumMeasures', () => {
		Identity({ numMeasures: 1 })
			.map((s) => reducer(s, actions.setNumMeasures(100)))
			.fold((s) => expect(s.numMeasures).toBe(100))
	})

	test('setTempo', () => {
		Identity({ tempo: 115 })
			.map((s) => reducer(s, actions.setTempo(100)))
			.fold((s) => expect(s.tempo).toBe(100))
	})

	test('setTempo', () => {
		Identity({ metronomeEnabled: false })
			.map((s) => reducer(s, actions.toggleMetronome()))
			.fold((s) => expect(s.metronomeEnabled).toBe(true))
	})
})
