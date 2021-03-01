import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { useStateMachine, Statuses } from './useStateMachine'

export const useConfetti = () => {
	const [state] = useStateMachine()
	
	useEffect(() => {
		if (state === Statuses.finished) {
			confetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 }
			});
		}
	}, [state])
}