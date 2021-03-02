import { merge } from 'ramda'
import initialState from '../initialState'
import {
	tempo,
	numMeasures,
	metronomeEnabled,
	SET_TEMPO,
	SET_NUM_MEASURES,
	TOGGLE_METRONOME,
} from '../types'

const reducer = (state = initialState.form, action) => {
	switch (action.type) {
	case SET_TEMPO:
		return merge(state, { [tempo]: action.payload })

	case SET_NUM_MEASURES:
		return merge(state, { [numMeasures]: action.payload })

	case TOGGLE_METRONOME:
		return merge(state, { [metronomeEnabled]: !state.metronomeEnabled })

	default:
		return state
	}
}

export default reducer
