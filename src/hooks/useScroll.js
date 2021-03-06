import { useCallback, useEffect, useRef } from 'react'
import { prop } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import { Identity } from '../lib/utils'
import { Statuses } from '../store/types'
import * as actions from '../store/stateMachine/actions'

const msPerBeat = (bpm) => 60000 / bpm
const beatsPerLine = (measures) => measures * 4
const msPerLine = (measures, bpm) => beatsPerLine(measures) * msPerBeat(bpm)
const measuresPerLine = (width) => {
	if (width < 500) return 1
	if (width < 525) return 1.33
	if (width < 550) return 1.67
	if (width < 670) return 2
	if (width < 710) return 2.67
	if (width < 820) return 3
	if (width < 910) return 3.5
	if (width < 1055) return 4
	if (width < 1200) return 5
	if (width < 1385) return 6
	return 7
}

const timeToPlayLine = (width, bpm) => (
	Identity(width)
		.map(measuresPerLine)
		.fold((x) => msPerLine(x, bpm))
)

const useScroll = () => {
	const dispatch = useDispatch()
	const state = useSelector(prop('status'))
	const bpm = useSelector((s) => s.form.tempo)
	const interval = useRef()
	const timeout = useRef()

	const clearScroll = useCallback(() => {
		if (interval.current) clearInterval(interval.current)
		if (timeout.current) clearTimeout(timeout.current)
	}, [interval, timeout])

	const scroll = (window, document) => {
		window.scrollBy({ left: 0, top: 120, behavior: 'smooth' })
		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			dispatch(actions.pause())
		}
	}

	// handle starting and stopping scroll
	useEffect(() => {
		if (interval.current && state !== Statuses.scrolling) {
			interval.current = null
			clearInterval(interval.current)
		}

		if (state === Statuses.scrolling && !interval.current) {
			const delay = timeToPlayLine(document.body.offsetWidth, bpm)
			timeout.current = setTimeout(() => {
				interval.current = setInterval(() => scroll(window, document), delay)
			}, delay)
		}

		return clearScroll
	}, [state, dispatch, clearScroll, bpm])

	// handle changing scroll speed when tempo changes
	useEffect(() => {
		if (state === Statuses.scrolling) {
			clearScroll()
			const delay = timeToPlayLine(document.body.offsetWidth, bpm)
			interval.current = setInterval(() => scroll(window, document), delay)
		}

		return clearScroll
	}, [bpm])

	return clearScroll
}

export default useScroll
