import {
	__,
	compose,
	join,
	prop,
	times,
} from 'ramda'
import {
	docTemplate,
	measureTemplate,
	restTemplate,
	noteTemplate,
	Durations,
} from './templates'

const beats = [
	'0000',
	'1000',
	'0100',
	'0010',
	'0001',
	'1100',
	'1010',
	'1001',
	'0110',
	'0101',
	'0011',
	'1110',
	'1101',
	'1011',
	'0111',
	'1111',
]

const combine = join('')
const eighthRest = () => restTemplate(Durations.eighth)
const quarterRest = () => restTemplate(Durations.quarter)
const quarterNote = () => noteTemplate(Durations.quarter, false)
const halfRest = () => combine([quarterRest(), quarterRest()])
const halfNote = () => combine([quarterNote(), quarterRest()])

const eighthNote = noteTemplate(Durations.eighth)
const twoBeamedEighthNotes = () => combine([
	eighthNote('begin'),
	eighthNote('end'),
])
const threeBeamedEighthNotes = () => combine([
	eighthNote('begin'),
	eighthNote('continue'),
	eighthNote('end'),
])
const fourBeamedEighthNotes = () => combine([
	eighthNote('begin'),
	eighthNote('continue'),
	eighthNote('continue'),
	eighthNote('end'),
])

const translateBeat = prop(__, {
	'0000': halfRest(),
	1000: halfNote(),
	'0100': combine([eighthRest(), eighthNote(false), quarterRest()]),
	'0010': combine([quarterRest(), quarterNote()]),
	'0001': combine([quarterRest(), eighthRest(), eighthNote(false)]),
	1100: combine([twoBeamedEighthNotes(), quarterRest()]),
	1010: combine([quarterNote(), quarterNote()]),
	1001: combine([quarterNote(), eighthRest(), eighthNote(false)]),
	'0110': combine([eighthRest(), eighthNote(false), quarterNote()]),
	'0101': combine([eighthRest(), eighthNote(false), eighthRest(), eighthNote(false)]),
	'0011': combine([quarterRest(), twoBeamedEighthNotes()]),
	1110: combine([twoBeamedEighthNotes(), quarterNote()]),
	1101: combine([twoBeamedEighthNotes(), eighthRest(), eighthNote(false)]),
	1011: combine([quarterNote(), twoBeamedEighthNotes()]),
	'0111': combine([eighthRest(), threeBeamedEighthNotes()]),
	1111: fourBeamedEighthNotes(),
})

const randomBeat = () => beats[Math.floor(Math.random() * beats.length)]
const randomBeatXML = () => translateBeat(randomBeat())

const randomMeasure = compose(
	measureTemplate,
	combine,
	() => times(randomBeatXML, 2),
)

const getDoc = compose(
	docTemplate,
	combine,
	times(randomMeasure),
)

export default getDoc
