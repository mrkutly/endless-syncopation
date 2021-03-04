import * as actions from './actions'
import reducer from './reducer'
import { Identity } from '../../lib/utils'
import { applyAction } from '../utils'

const apply = applyAction(reducer)

describe('Form Reducer', () => {
	test('setNumMeasures', () => {
		Identity({ numMeasures: 1 })
			.map((apply(actions.setNumMeasures(100))))
			.fold((s) => expect(s.numMeasures).toBe(100))
	})

	test('setTempo', () => {
		Identity({ tempo: 115 })
			.map((apply(actions.setTempo(100))))
			.fold((s) => expect(s.tempo).toBe(100))
	})

	test('setTempo', () => {
		Identity({ metronomeEnabled: false })
			.map((apply(actions.toggleMetronome())))
			.fold((s) => expect(s.metronomeEnabled).toBe(true))
	})
})
