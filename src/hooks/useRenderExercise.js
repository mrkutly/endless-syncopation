/* eslint-disable no-unused-vars */
import { useCallback } from 'react'
import { actions, useStateMachine } from './useStateMachine'
import { getDisplay } from '../lib/osmd'

export const useRenderExercise = () => {
	const [_state, dispatch] = useStateMachine()

	const renderExercise = useCallback((doc) => {
		dispatch(actions.LOAD_DOC)
		const display = getDisplay()
		display.load(doc).then(() => {
			dispatch(actions.PLAY)
			display.render()
		})
	}, [dispatch])

	return renderExercise
}