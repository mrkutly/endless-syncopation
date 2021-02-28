import { useEffect, useState, useCallback } from 'react'
import { PrimaryButton } from 'waskode'
import { getDoc } from'./lib/XMLgenerator'
import { getDisplay } from './lib/osmd'
import { actions, Statuses, useStateMachine } from './hooks/useStateMachine'
import { useScroll } from './hooks/useScroll'
import { useConfetti } from './hooks/useConfetti'
import './App.css'


// TODO: figure out width of line based on window width
// TODO: figure out scroll speed based on width of line and metronome markings
// TODO: implement tempo and numMeasure inputs

const App = () => {
	const [state, dispatch] = useStateMachine()
	const [numMeasures, setNumMeasures] = useState(50)
	const clearScroll = useScroll()
	
	useConfetti()

	const renderExercise = useCallback((doc) => {
		dispatch(actions.LOAD_DOC)
		const display = getDisplay()
		display.load(doc).then(() => {
			dispatch(actions.PLAY)
			display.render()
		})
	}, [dispatch])

	const begin = useCallback(() => {
		const doc = getDoc(numMeasures)
		renderExercise(doc)
	}, [numMeasures, renderExercise])

	const pause = useCallback(() => {
		dispatch(actions.PAUSE)
	}, [dispatch])

	const startOver = useCallback(() => {
		clearScroll()
		const display = getDisplay()
	
		try { display.clear() }
		catch (e) { console.log(e.message) }

		const doc = getDoc(numMeasures)
		renderExercise(doc)
	}, [numMeasures, renderExercise, clearScroll])

	useEffect(() => {
		const display = getDisplay()
		return () => {
			try { display.clear() }
			catch (e) {}
		}
	}, [])

	return (
		<div className="App">
			<h1>Ted Reed Syncopation Bot</h1>
			{state === Statuses.paused && <PrimaryButton onClick={() => dispatch(actions.RESUME)}>Continue</PrimaryButton>}
			{state === Statuses.idle && <PrimaryButton onClick={begin}>Let's Go!</PrimaryButton>}
			{state === Statuses.scrolling && <PrimaryButton onClick={pause}>PAUSE</PrimaryButton>}
			{state === Statuses.finished && <PrimaryButton onClick={startOver}>Go Again</PrimaryButton>}
			{state === Statuses.loading && <div>Getting a new exercise for you...</div>}
			{state === Statuses.finished && <div id="congrats">Congrats you made it</div>}
			<div id="letsgobb" />
		</div>
	)
}

export default App
