import { useEffect } from 'react'
import * as osmd from 'opensheetmusicdisplay'
import { appendLine, getDoc } from'./lib/XMLgenerator'
import './App.css'

const App = () => {
	useEffect(() => {
		const display = new osmd.OpenSheetMusicDisplay('letsgobb')
		let doc = getDoc()
		display.load(doc).then(display.render.bind(display))
		setInterval(() => {
			doc = appendLine(doc)
			display.load(doc).then(() => {
				display.render()
				window.scrollTo(0, window.outerHeight)
			})
		}, 2000)
	}, [])

	return (
		<div className="App">
			<div id="letsgobb" style={{ width: '100vw' }} />
		</div>
	)
}

export default App
