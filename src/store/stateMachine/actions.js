import {
	LOAD_DOC,
	PLAY,
	PAUSE,
	STOP,
	SUCCESS,
} from '../types'

export const loadDoc = () => ({ type: LOAD_DOC })
export const play = () => ({ type: PLAY })
export const pause = () => ({ type: PAUSE })
export const stop = () => ({ type: STOP })
export const success = () => ({ type: SUCCESS })
