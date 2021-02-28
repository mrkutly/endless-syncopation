import { createContext, useContext, useReducer } from 'react'

const LOAD_DOC = 'LOAD_DOC'
const PLAY = 'PLAY'
const PAUSE = 'PAUSE'
const STOP = 'STOP'
const RESUME = 'RESUME'

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
		if (action === LOAD_DOC) {
			return Statuses.loading
		}
		return state
	}
	
	case Statuses.paused: {
		if (action === RESUME) {
			return Statuses.scrolling
		}
		return state
	}
	
	case Statuses.loading: {
		if (action === PLAY) {
			return Statuses.scrolling
		}
		return state
	}
	
	case Statuses.scrolling: {
		if (action === STOP) {
			return Statuses.finished
		}
		if (action === PAUSE) {
			return Statuses.paused
		}
		return state
	}

	case Statuses.finished: {
		if (action === LOAD_DOC) {
			return Statuses.loading
		}
		return state
	}

	default:
		return state

	}
}


export const actions = {
	LOAD_DOC,
	PAUSE,
	PLAY,
	RESUME,
	STOP,
}

const StateContext = createContext()

export const StateMachineProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, Statuses.idle)
	return (
		<StateContext.Provider value={[state, dispatch]}>{children}</StateContext.Provider>
	)
}

export const useStateMachine = () => useContext(StateContext)
