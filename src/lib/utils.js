import { compose, join, map, replace, times } from 'ramda'

const noteOrRest = () => Math.round(Math.random())
const noteArray = (beats = 4) => times(noteOrRest, beats * 2)

const translateNote = compose(
	replace(/0/g, 'B4/8/r,'),
	replace(/1/g, 'B4/8,'),
	replace(/0 0/g, 'B4/q/r,'),
	replace(/1 0/g, 'B4/q,'),
)
	
export const measure = compose(translateNote, join(' '), noteArray)


 

