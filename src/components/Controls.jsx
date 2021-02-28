import { useCallback } from 'react'
import { PrimaryButton as Button } from 'waskode'
import { getDoc } from'../lib/XMLgenerator'
import { useStateMachine, actions, Statuses } from "../hooks/useStateMachine"
import { useRenderExercise } from '../hooks/useRenderExercise'

const Controls = ({ numMeasures }) => {
	const [state, dispatch] = useStateMachine()
	const renderExercise = useRenderExercise()
	
	const begin = useCallback(() => {
		const doc = getDoc(numMeasures)
		renderExercise(doc)
	}, [numMeasures, renderExercise])

	const pause = useCallback(() => {
		dispatch(actions.PAUSE)
	}, [dispatch])
	
	return (
		<>
			<Button disabled={state !== Statuses.idle } onClick={begin}>Let's Go!</Button>
			<Button disabled={state !== Statuses.scrolling } onClick={pause}>Pause</Button>
			<Button disabled={state !== Statuses.paused } onClick={() => dispatch(actions.RESUME)}>Resume</Button>
		</>
	)
}

export default Controls