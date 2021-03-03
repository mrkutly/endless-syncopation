import initialState from '../initialState'
import * as types from '../types'

const reducer = (state = initialState.welcomeSeen, action) => {
	if (action.type === types.SET_WELCOME_SEEN) return action.payload
	return state
}

export default reducer
