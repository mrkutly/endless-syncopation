import { useCallback, useEffect, useRef } from 'react'
import { prop } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import { Statuses } from '../store/types'
import * as actions from '../store/stateMachine/actions'

const useScroll = () => {
	const dispatch = useDispatch()
	const state = useSelector(prop('status'))
	const interval = useRef()

	const clearScroll = useCallback(() => {
		if (interval.current) clearInterval(interval.current)
	}, [interval])

	useEffect(() => {
		if (interval.current && state !== Statuses.scrolling) {
			interval.current = null
			clearInterval(interval.current)
		}

		if (state === Statuses.scrolling && !interval.current) {
			interval.current = setInterval(() => {
				window.scrollBy(0, 100)
				if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
					dispatch(actions.stop())
				}
			}, 2000)
		}

		return clearScroll
	}, [state, dispatch, clearScroll])

	return clearScroll
}

export default useScroll
