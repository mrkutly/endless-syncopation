import { useCallback, useEffect, useRef } from 'react'
import { prop } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import { fromNullable, Identity } from '../lib/utils'
import { Statuses } from '../store/types'
import * as actions from '../store/stateMachine/actions'

const msPerBeat = (bpm) => 60000 / bpm
const totalBeats = (numMeasures) => numMeasures * 4
const totalMs = (numMeasures, bpm) => totalBeats(numMeasures) * msPerBeat(bpm)

const beatsPerLine = (measures) => measures * 4
const msPerLine = (measures, bpm) => beatsPerLine(measures) * msPerBeat(bpm)
const measuresPerLine = (width) => {
	if (width < 635) return 1
	if (width < 700) return 1.5
	if (width < 900) return 2
	if (width < 1130) return 3
	if (width < 1330) return 4
	return 5
}

const useScroll = () => {
	const dispatch = useDispatch()
	const state = useSelector(prop('status'))
	const bpm = useSelector((s) => s.form.tempo)
	const numMeasures = useSelector((s) => s.form.numMeasures)
	const interval = useRef()
	const timeout = useRef()

	const clearScroll = useCallback(() => {
		if (interval.current) clearInterval(interval.current)
		if (timeout.current) clearTimeout(timeout.current)
	}, [interval, timeout])

	useEffect(() => {
		const exerciseLengthMs = totalMs(numMeasures, bpm)
		const height = fromNullable(document.querySelector('#letsgobb'))
			.fold(
				() => 5000,
				(x) => x.offsetHeight,
			)

		if (interval.current && state !== Statuses.scrolling) {
			interval.current = null
			clearInterval(interval.current)
		}

		if (state === Statuses.scrolling && !interval.current) {
			const timeToStart = Identity(document.body.offsetWidth)
				.map(measuresPerLine)
				.fold((x) => msPerLine(x, bpm))

			timeout.current = setTimeout(() => {
				interval.current = setInterval(() => {
					window.scrollBy(0, 100)
					if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
						dispatch(actions.stop())
					}
				}, Math.round(exerciseLengthMs / height) * 100)
			}, timeToStart)
		}

		return clearScroll
	}, [state, dispatch, clearScroll])

	return clearScroll
}

export default useScroll
