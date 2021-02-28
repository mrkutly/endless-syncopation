import { useEffect, useState, useRef, useCallback } from 'react'
import { getDoc } from'./lib/XMLgenerator'
import { getDisplay } from './lib/osmd'
import './App.css'

// TODO: figure out width of line based on window width
// TODO: figure out scroll speed based on width of line and metronome markings
// TODO: figure out how to render what is in view

const App = () => {
	const [numMeasures, setNumMeasures] = useState(100)
	const [scrolling, setScrolling] = useState(false)
	const [doc, setDoc] = useState(getDoc(numMeasures))
	const interval = useRef(0)

	const startOver = useCallback(() => {
		if (interval.current) clearInterval(interval.current)
		const display = getDisplay()
		if (typeof display.clear === 'function') display.clear()
		setDoc(getDoc(numMeasures))
	}, [numMeasures])

	useEffect(() => {
		const display = getDisplay()
		display.load(doc).then(() => {
			display.render()
			setScrolling(true)
		})
		return () => display.clear()
	}, [doc])

	useEffect(() => {
		if (interval.current && !scrolling) {
			interval.current = null
			clearInterval(interval.current)
		}

		if (scrolling && !interval.current) {
			interval.current = setInterval(() => {
				window.scrollBy(0, 100)
				if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
					setScrolling(false)
				}
			}, 5000)
		}
		
		return () => {
			if (interval.current) clearInterval(interval.current)
		}
	}, [scrolling])

	return (
		<div className="App">
			<div id="letsgobb" />
			<button onClick={startOver}>Go Again</button>
		</div>
	)
}

export default App
