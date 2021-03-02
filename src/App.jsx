import { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { prop } from 'ramda'
import { Loading } from 'waskode'
import ExerciseForm from './components/ExerciseForm'
import { getNumMeasures } from './store/form/actions'
import { noop, tryCatch } from './lib/utils'
import getDisplay from './lib/osmd'
import Controls from './components/Controls'
import { Statuses } from './store/types'
import useScroll from './hooks/useScroll'
import './App.css'

// TODO: figure out width of line based on window width
// TODO: figure out scroll speed based on width of line and metronome markings
// TODO: implement tempo and numMeasure inputs

const App = () => {
	const status = useSelector(prop('status'))
	const numMeasures = useSelector(getNumMeasures)
	const clearScroll = useScroll()

	useEffect(() => () => {
		tryCatch(() => getDisplay().clear())
			.fold(console.log, noop)
	}, [])

	return (
		<div className="App">
			<header style={{ padding: '0 20px' }}>
				<h1>Ted Reed Syncopation Bot</h1>
			</header>
			<ExerciseForm />
			<InnerStyles>
				{status === Statuses.loading && <Loading />}
				<div id="letsgobb" style={{ maxWidth: '1530px', opacity: status === Statuses.loading ? 0 : 1 }} />
			</InnerStyles>
			<Controls numMeasures={numMeasures} clearScroll={clearScroll} />
		</div>
	)
}

const InnerStyles = styled.main`
	max-width: 1550px;
	margin: 0 auto 50px;
	padding: 0 10px;
`

export default App
