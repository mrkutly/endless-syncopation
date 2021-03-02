import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import initialState from './initialState'
import formReducer from './form/reducer'
import stateReducer from './stateMachine/reducer'

const reducer = combineReducers({
	status: stateReducer,
	form: formReducer,
})

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(),
)

export default store
