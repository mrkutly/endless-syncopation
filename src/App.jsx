import { useEffect, useState } from 'react'
import { noop, tryCatch } from './lib/utils'
import { getDisplay } from './lib/osmd'
import Controls from './components/Controls'
import Congrats from './components/Congrats'
import { Statuses, useStateMachine } from './hooks/useStateMachine'
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
		return () => {
			tryCatch(() => getDisplay().clear())
				.fold(console.log, noop)
		}
	}, [])

	return (
		<div className="App">
			<header style={{ padding: '0 20px' }}>
				<h1>Ted Reed Syncopation Bot</h1>
				<Controls numMeasures={numMeasures} />
			</header>
			{state === Statuses.loading && <div>Getting a new exercise for you...</div>}
			{state === Statuses.finished && <Congrats clearScroll={clearScroll} numMeasures={numMeasures} />}
			<div id="letsgobb" />
		</div>
	)
}

export default App
