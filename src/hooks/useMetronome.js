import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { clamp } from 'ramda'
import config from '../config'
import { getMetronomeEnabled, getTempo } from '../store/form/actions'
import Metronome from '../lib/metronome'
import { Identity } from '../lib/utils'

const useMetronome = () => {
	const shouldPlay = useSelector(getMetronomeEnabled)
	const tempo = useSelector(getTempo)

	useEffect(() => {
		if (shouldPlay !== Metronome.isRunning) {
			Metronome.toggle()
		}
	}, [shouldPlay])

	useEffect(() => {
		Identity(tempo)
			.map(clamp(config.minTempo, config.maxTempo))
			.fold((x) => Metronome.setTempo(x))
	}, [tempo])
}

export default useMetronome
