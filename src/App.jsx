import { useEffect, useState, useCallback } from 'react'
import { getDisplay } from './lib/osmd'
import Controls from './components/Controls'
import Congrats from './components/Congrats'
import { actions, Statuses, useStateMachine } from './hooks/useStateMachine'
import { useScroll } from './hooks/useScroll'
import './App.css'


// TODO: figure out width of line based on window width
// TODO: figure out scroll speed based on width of line and metronome markings
// TODO: implement tempo and numMeasure inputs

const App = () => {
	const [state] = useStateMachine()
	const [numMeasures] = useState(50)
	const clearScroll = useScroll()

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
			<Controls numMeasures={numMeasures} />
			{state === Statuses.loading && <div>Getting a new exercise for you...</div>}
			{state === Statuses.finished && <Congrats clearScroll={clearScroll} numMeasures={numMeasures} />}
			<div id="letsgobb" />
		</div>
	)
}

export default App
