import initialState from '../initialState'
import {
	LOAD_DOC,
	PLAY,
	PAUSE,
	STOP,
	SUCCESS,
	Statuses,
} from '../types'

const reducer = (state = initialState.status, action) => {
	switch (state) {
	case Statuses.idle: {
		if (action.type === LOAD_DOC) {
			return Statuses.loading
		}
		return state
	}

	case Statuses.paused: {
		if (action.type === LOAD_DOC) {
			return Statuses.loading
		}
		if (action.type === PLAY) {
			return Statuses.scrolling
		}
		if (action.type === STOP) {
			return Statuses.finished
		}
		return state
	}

	case Statuses.loading: {
		if (action.type === SUCCESS) {
			return Statuses.paused
		}
		return state
	}

	case Statuses.scrolling: {
		if (action.type === STOP) {
			return Statuses.paused
		}
		if (action.type === PAUSE) {
			return Statuses.paused
		}
		return state
	}

	case Statuses.finished: {
		if (action.type === LOAD_DOC) {
			return Statuses.loading
		}
		return state
	}

	default:
		return state
	}
}

export default reducer
