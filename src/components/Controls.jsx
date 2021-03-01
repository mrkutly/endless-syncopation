/* eslint-disable react/prop-types */
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { PrimaryButton as Button } from 'waskode'
import { prop } from 'ramda'
import getDoc from '../lib/XMLgenerator'
import getDisplay from '../lib/osmd'
import { Statuses } from '../store/stateMachine/reducer'
import * as actions from '../store/stateMachine/actions'
import useRenderExercise from '../hooks/useRenderExercise'
import { Identity, noop, tryCatch } from '../lib/utils'

const Controls = ({ numMeasures, clearScroll }) => {
	const state = useSelector(prop('status'))
	const dispatch = useDispatch()
	const renderExercise = useRenderExercise()

	const begin = () => {
		Identity(numMeasures)
			.map(getDoc)
			.fold(renderExercise)
	}

	useEffect(() => {
		begin()
	}, [])

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

	const loading = () => {
		console.log(state)
		return ![Statuses.paused, Statuses.scrolling].includes(state)
	}

	return (
		<ControlStyles>
			<Button
				disabled={![Statuses.finished, Statuses.paused, Statuses.idle].includes(state)}
				onClick={handleGenerate}
			>
				Generate Exercise
			</Button>
			<Button disabled={loading()} onClick={handlePauseOrPlay}>
				{
					state === Statuses.paused
						? 'Play'
						: 'Pause'
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
