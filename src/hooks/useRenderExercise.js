import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import * as actions from '../store/stateMachine/actions'
import getDisplay from '../lib/osmd'

const useRenderExercise = () => {
	const dispatch = useDispatch()

	const renderExercise = useCallback((doc) => {
		dispatch(actions.loadDoc())

		// ? the osmd library blocks react from updating, so I need to
		// ? render the music on the next tick of the event loop
		setTimeout(() => {
			try {
				const display = getDisplay()
				display.load(doc).then(async () => {
					setTimeout(() => {
						dispatch(actions.success())
						display.render()
					}, 0)
				})
			} catch (e) {
				console.log(e.message)
			}
		}, 0)
	}, [dispatch])

	return renderExercise
}

export default useRenderExercise
