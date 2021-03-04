import reducer from './reducer'
import * as actions from './actions'
import { applyAction, expectState } from '../utils'
import { Statuses } from '../types'
import { Identity } from '../../lib/utils'

const apply = applyAction(reducer)

describe('State Machine Reducer', () => {
	it('Can transition from idle to loading', () => {
		Identity(Statuses.idle)
			.map(apply(actions.loadDoc()))
			.fold(expectState(Statuses.loading))
	})

	it('Does not perform invalid transitions from idle', () => {
		Identity(Statuses.idle)
			.map(apply(actions.play()))
			.map(expectState(Statuses.idle))
			.map(apply(actions.pause()))
			.map(expectState(Statuses.idle))
			.map(apply(actions.success()))
			.fold(expectState(Statuses.idle))
	})

	it('Can transition from paused to loading', () => {
		Identity(Statuses.paused)
			.map(apply(actions.loadDoc()))
			.fold(expectState(Statuses.loading))
	})

	it('Can transition from paused to scrolling', () => {
		Identity(Statuses.paused)
			.map(apply(actions.play()))
			.fold(expectState(Statuses.scrolling))
	})

	it('Does not perform invalid transitions from paused', () => {
		Identity(Statuses.paused)
			.map(apply(actions.pause()))
			.map(expectState(Statuses.paused))
			.map(apply(actions.success()))
			.fold(expectState(Statuses.paused))
	})

	it('Can transition from loading to paused', () => {
		Identity(Statuses.loading)
			.map(apply(actions.success()))
			.fold(expectState(Statuses.paused))
	})

	it('Does not perform invalid transitions from loading', () => {
		Identity(Statuses.loading)
			.map(apply(actions.pause()))
			.map(expectState(Statuses.loading))
			.map(apply(actions.play()))
			.map(expectState(Statuses.loading))
			.map(apply(actions.loadDoc()))
			.fold(expectState(Statuses.loading))
	})

	it('Can transition from scrolling to paused', () => {
		Identity(Statuses.scrolling)
			.map(apply(actions.pause()))
			.fold(expectState(Statuses.paused))
	})

	it('Does not perform invalid transitions from scrolling', () => {
		Identity(Statuses.scrolling)
			.map(apply(actions.success()))
			.map(expectState(Statuses.scrolling))
			.map(apply(actions.play()))
			.map(expectState(Statuses.scrolling))
			.map(apply(actions.loadDoc()))
			.fold(expectState(Statuses.scrolling))
	})
})
