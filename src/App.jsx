import { useEffect } from 'react'
import * as osmd from 'opensheetmusicdisplay'
import { appendLine, getDoc } from'./lib/XMLgenerator'
import './App.css'

// TODO: figure out width of line based on window width
// TODO: figure out scroll speed based on width of line and metronome markings
// TODO: figure out how to render what is in view
const App = () => {
	useEffect(() => {
		const display = new osmd.OpenSheetMusicDisplay('letsgobb')
		let doc = getDoc(5)
		display.load(doc).then(display.render.bind(display))
		setInterval(() => {
			doc = appendLine(5, doc)
			display.load(doc).then(() => {
				display.render()
				window.scrollTo(0, document.body.scrollHeight)
			})
		}, 5000)
	}, [])

	return (
		<div className="App">
			<div id="letsgobb" style={{ width: '100vw' }} />
		</div>
	)
}

export default App
