import { useCallback } from 'react'
import { PrimaryButton } from 'waskode'
import { getDoc } from'../lib/XMLgenerator'
import { getDisplay } from'../lib/osmd'
import { useConfetti } from '../hooks/useConfetti'
import { useRenderExercise } from '../hooks/useRenderExercise'


const Congrats = ({ clearScroll, numMeasures }) => {
	const renderExercise = useRenderExercise()
	
	useConfetti()

	const startOver = useCallback(() => {
		clearScroll()
		const display = getDisplay()
	
		try { display.clear() }
		catch (e) { console.log(e.message) }

		const doc = getDoc(numMeasures)
		renderExercise(doc)
	}, [numMeasures, renderExercise, clearScroll])

	return (
		<div id="congrats">
			<h2>Congrats you made it</h2>
			<PrimaryButton onClick={startOver}>Go Again</PrimaryButton>
		</div>
	)
}

export default Congrats