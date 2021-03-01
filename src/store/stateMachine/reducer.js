import {
	LOAD_DOC,
	PLAY,
	PAUSE,
	STOP,
	SUCCESS,
} from '../types'

export const Statuses = {
	finished: 'finished',
	idle: 'idle',
	loading: 'loading',
	paused: 'paused',
	scrolling: 'scrolling',
}

const reducer = (state = Statuses.idle, action) => {
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
