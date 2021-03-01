import { useCallback, useEffect, useRef } from 'react'
import { Statuses, actions, useStateMachine } from './useStateMachine'

export const useScroll = () => {
	const [state, dispatch] = useStateMachine()
	const interval = useRef()

	const clearScroll = useCallback( () => {
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
					dispatch(actions.STOP)
				}
			}, 2000)
		}
		
		return clearScroll
	}, [state, dispatch, clearScroll])

	return clearScroll
}
