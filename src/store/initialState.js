import * as types from './types'

export default {
	status: types.Statuses.idle,
	form: {
		[types.tempo]: 115,
		[types.numMeasures]: 80,
		[types.metronomeEnabled]: false,
	},
	welcomeSeen: localStorage.getItem(types.WELCOME_SEEN),
}
