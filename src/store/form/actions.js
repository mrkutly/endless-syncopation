import { compose, prop } from 'ramda'
import * as Types from '../types'

const formProp = prop('form')
export const getTempo = compose(prop(Types.tempo), formProp)
export const getNumMeasures = compose(prop(Types.numMeasures), formProp)
export const getMetronomeEnabled = compose(prop(Types.metronomeEnabled), formProp)

const forwardPayload = (type) => (payload) => ({ type, payload })

export const setNumMeasures = forwardPayload(Types.SET_NUM_MEASURES)
export const setTempo = forwardPayload(Types.SET_TEMPO)
export const toggleMetronome = () => ({ type: Types.TOGGLE_METRONOME })
