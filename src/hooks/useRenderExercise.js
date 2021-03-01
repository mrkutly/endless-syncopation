/* eslint-disable no-unused-vars */
import { useCallback } from 'react'
import { actions, useStateMachine } from './useStateMachine'
import { getDisplay } from '../lib/osmd'
import { noop, Identity, tryCatch } from '../lib/utils'

export const useRenderExercise = () => {
	const [_state, dispatch] = useStateMachine()

	const renderExercise = useCallback((doc) => {
		dispatch(actions.LOAD_DOC)
		Identity(getDisplay())
			.chain(display => tryCatch(
				() => {
					display
						.load(doc)
						.then(() => {
							dispatch(actions.PLAY)
							display.render()
						})
				}
			))
			.fold(console.log, noop)
	}, [dispatch])

	return renderExercise
}