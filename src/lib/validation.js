import {
	and, curry, gte, lte,
} from 'ramda'
import config from '../config'

export const validateMax = curry((max, val) => and(
	gte(val, 1),
	lte(val, max),
))

export const validateNumMeasures = validateMax(config.maxNumMeasures)
export const validateTempo = validateMax(config.maxTempo)
