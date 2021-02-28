import * as _ from 'ramda'

const quarter = 'quarter'
const eighth = 'eighth'

export const Durations = { quarter, eighth }

const duration = _.prop(_.__, { [Durations.quarter]: 2, [Durations.eighth]: 1 })

export const restTemplate = (length) => `
	<note>
		<rest />
		<duration>${duration(length)}</duration>
		<type>${length}</type>
	</note>
`

export const noteTemplate = _.curry((length, beam) => `
	<note>
		<unpitched>
			<display-step>e</display-step>
			<display-octave>5</display-octave>
		</unpitched>
		<duration>${duration(length)}</duration>
		<type>${length}</type>
		<stem>up</stem>
		${beam ? `<beam number="1">${beam}</beam>` : ''}
	</note>
`)

export const measureTemplate = (notes) => `
<measure>
<attributes>
	<divisions>2</divisions>
	<time>
		<beats>4</beats>
		<beat-type>4</beat-type>
	</time>
	<clef>
		<sign>percussion</sign>
		<line>2</line>
	</clef>
</attributes>
	${notes}
</measure>
`

export const docTemplate = (measures) => `
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE score-partwise PUBLIC
    "-//Recordare//DTD MusicXML 3.1 Partwise//EN"
    "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="3.1">
	<work>
    <work-title> </work-title>
  </work>
	<part-list>
    <score-part id="P1">
      <part-name> </part-name>
    </score-part>
  </part-list>
  <part id="P1">
		${measures}
  </part>
</score-partwise>
`