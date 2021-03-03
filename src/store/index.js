import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import initialState from './initialState'
import formReducer from './form/reducer'
import stateReducer from './stateMachine/reducer'
import welcomeReducer from './welcome/reducer'

const reducer = combineReducers({
	status: stateReducer,
	form: formReducer,
	welcomeSeen: welcomeReducer,
})

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(),
)

export default store
