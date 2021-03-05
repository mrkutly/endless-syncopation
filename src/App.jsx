/* eslint-disable no-console */
import { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { prop } from 'ramda'
import Loading from './components/CenteredLoading'
import ResponsiveExerciseForm from './components/ResponsiveExerciseForm'
import { getNumMeasures } from './store/form/actions'
import { noop, tryCatch } from './lib/utils'
import getDisplay from './lib/osmd'
import Controls from './components/Controls'
import Welcome from './components/Welcome'
import { Statuses } from './store/types'
import useScroll from './hooks/useScroll'
import useMetronome from './hooks/useMetronome'
import './App.css'

const App = () => {
	const status = useSelector(prop('status'))
	const numMeasures = useSelector(getNumMeasures)
	const clearScroll = useScroll()

	useMetronome()

	useEffect(() => () => {
		tryCatch(() => getDisplay().clear())
			.fold(console.log, noop)
	}, [])

	return (
		<div className="App">
			<HeaderStyles style={{ padding: '0 20px' }}>
				<h1>Syncopation for the Hypermodern Drummer</h1>
			</HeaderStyles>
			<ResponsiveExerciseForm />
			<Welcome />
			{status === Statuses.loading && <Loading><h3>Generating an exercise for you</h3></Loading>}
			<InnerStyles>
				<div id="letsgobb" style={{ maxWidth: '1530px', opacity: status === Statuses.loading ? 0 : 1 }} />
			</InnerStyles>
			<Controls numMeasures={numMeasures} clearScroll={clearScroll} />
		</div>
	)
}

const InnerStyles = styled.main`
	max-width: 1550px;
	margin: 0 auto 50px;
	
	@media screen and (min-width: 581px) {
		padding: 0 10px;
	}
`

const HeaderStyles = styled.header`
	h1 {
		margin-left: 20px;
		margin-right: 20px;
	}

	@media screen and (max-width: 580px) {
		position:absolute;
		max-width: calc(100vw - 80px);
		h1 {
			font-size: 1.5rem;
		}
	}
`

export default App
