import {
	and, curry, gte, lte,
} from 'ramda'
import config from '../config'

export const validateRange = curry((min, max, val) => and(
	gte(val, min),
	lte(val, max),
))

export const validateMax = validateRange(1)

export const validateNumMeasures = validateMax(config.maxNumMeasures)
export const validateTempo = validateRange(config.minTempo, config.maxTempo)
