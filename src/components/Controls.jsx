/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { PrimaryButton as Button } from 'waskode'
import { prop } from 'ramda'
import getDoc from '../lib/XMLgenerator'
import getDisplay from '../lib/osmd'
import { Statuses } from '../store/types'
import * as actions from '../store/stateMachine/actions'
import { getNumMeasures, getTempo } from '../store/form/actions'
import useRenderExercise from '../hooks/useRenderExercise'
import { Identity, noop, tryCatch } from '../lib/utils'
import { validateTempo, validateNumMeasures } from '../lib/validation'

const Controls = ({ clearScroll }) => {
	const state = useSelector(prop('status'))
	const tempo = useSelector(getTempo)
	const welcomeSeen = useSelector(prop('welcomeSeen'))
	const numMeasures = useSelector(getNumMeasures)
	const dispatch = useDispatch()
	const renderExercise = useRenderExercise()
	const formValid = () => validateTempo(tempo) && validateNumMeasures(numMeasures)

	const begin = () => {
		Identity(numMeasures)
			.map(getDoc)
			.fold(renderExercise)
	}

	useEffect(() => {
		if (welcomeSeen === 'true') {
			setTimeout(begin, 500)
		}
	}, [welcomeSeen])

	const startOver = () => {
		clearScroll()

		Identity(getDisplay())
			.chain((display) => tryCatch(() => display.clear()))
			.fold(
				console.log,
				noop,
			)

		begin()
	}

	const pause = useCallback(() => dispatch(actions.pause()), [dispatch])
	const play = useCallback(() => dispatch(actions.play()), [dispatch])

	const handleGenerate = () => {
		if ([Statuses.finished, Statuses.paused].includes(state)) startOver()
		if (state === Statuses.idle) begin()
	}

	const handlePauseOrPlay = () => {
		if (state === Statuses.scrolling) pause()
		if (state === Statuses.paused) play()
	}

	return (
		<ControlStyles>
			<Button
				disabled={![Statuses.finished, Statuses.paused, Statuses.idle].includes(state) || !formValid()}
				onClick={handleGenerate}
			>
				Generate Exercise
			</Button>
			<Button
				disabled={![Statuses.paused, Statuses.scrolling].includes(state) || !validateTempo(tempo)}
				onClick={handlePauseOrPlay}
			>
				{
					state === Statuses.scrolling
						? 'Pause'
						: 'Play'
				}
			</Button>
		</ControlStyles>
	)
}

const ControlStyles = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	background: white;
	padding: 15px;
	z-index: 2;
`

export default Controls
