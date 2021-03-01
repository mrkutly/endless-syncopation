import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { prop } from 'ramda'
import confetti from 'canvas-confetti'
import { Statuses } from '../store/stateMachine/reducer'

const useConfetti = () => {
	const state = useSelector(prop('status'))

	useEffect(() => {
		if (state === Statuses.finished) {
			confetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 },
			})
		}
	}, [state])
}

export default useConfetti
