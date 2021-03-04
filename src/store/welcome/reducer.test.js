import * as actions from './actions'
import reducer from './reducer'
import { Identity } from '../../lib/utils'
import { applyAction, expectState } from '../utils'

const apply = applyAction(reducer)

describe('Welcome Message Reducer', () => {
	test('Can set the welcome-seen status', () => {
		Identity(false)
			.map((apply(actions.setSeen(true))))
			.fold(expectState(true))
	})
})
