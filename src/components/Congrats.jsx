import { useCallback } from 'react'
import { PrimaryButton } from 'waskode'
import { noop, tryCatch, Identity } from'../lib/utils'
import { getDoc } from'../lib/XMLgenerator'
import { getDisplay } from'../lib/osmd'
import { useConfetti } from '../hooks/useConfetti'
import { useRenderExercise } from '../hooks/useRenderExercise'

const Congrats = ({ clearScroll, numMeasures }) => {
	const renderExercise = useRenderExercise()
	
	useConfetti()

	const startOver = useCallback(() => {
		clearScroll()
	
		Identity(getDisplay())
			.chain((display) => tryCatch(() => display.clear()))
			.fold(
				console.log,
				noop
			)
			
		Identity(numMeasures)
			.map(getDoc)
			.chain(renderExercise)
	}, [numMeasures, renderExercise, clearScroll])

	return (
		<div id="congrats">
			<h2>Congrats you made it</h2>
			<PrimaryButton onClick={startOver}>Go Again</PrimaryButton>
		</div>
	)
}

export default Congrats