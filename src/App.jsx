import { useEffect } from 'react'
import Vex from 'vexflow'
import logo from './logo.svg'
import { measure } from './lib/utils'
import './App.css'

const App = () => {
	useEffect(() => {
		const vf = new Vex.Flow.Factory({ renderer: { elementId: 'letsgobb' } })
		const score = vf.EasyScore()
		const system = vf.System()
		console.log(measure())
		system.addStave({
			voices: [
				score.voice(
					score.notes(measure(4), { stem: 'up' })
				)
			]
		}).addClef('percussion').addTimeSignature('4/4')
		vf.draw()
	}, [])

	return (
		<div className="App">
			<div id="letsgobb" />
		</div>
	)
}

export default App
