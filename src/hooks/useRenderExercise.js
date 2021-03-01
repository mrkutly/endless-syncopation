/* eslint-disable no-unused-vars */
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import * as actions from '../store/stateMachine/actions'
import getDisplay from '../lib/osmd'
import { noop, Identity, tryCatch } from '../lib/utils'

const useRenderExercise = () => {
	const dispatch = useDispatch()

	const renderExercise = useCallback((doc) => {
		dispatch(actions.loadDoc())
		Identity(getDisplay())
			.chain((display) => tryCatch(
				() => {
					display
						.load(doc)
						.then(() => {
							display.render()
							dispatch(actions.success())
						})
				},
			))
			.fold(console.log, noop)
	}, [dispatch])

	return renderExercise
}

export default useRenderExercise
