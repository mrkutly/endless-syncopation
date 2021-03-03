import { compose, prop } from 'ramda'
import * as Types from '../types'
import { forwardPayload } from '../utils'

const formProp = prop('form')
export const getTempo = compose(prop(Types.tempo), formProp)
export const getNumMeasures = compose(prop(Types.numMeasures), formProp)
export const getMetronomeEnabled = compose(prop(Types.metronomeEnabled), formProp)

export const setNumMeasures = forwardPayload(Types.SET_NUM_MEASURES)
export const setTempo = forwardPayload(Types.SET_TEMPO)
export const toggleMetronome = () => ({ type: Types.TOGGLE_METRONOME })
