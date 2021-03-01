import { combineReducers, createStore } from 'redux'
import formReducer from './form/reducer'
import stateReducer from './stateMachine/reducer'

const reducer = combineReducers({
	status: stateReducer,
	form: formReducer,
})

const store = createStore(reducer)

export default store
