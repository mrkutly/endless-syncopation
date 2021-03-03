import { identity } from 'ramda'
import { tryCatch } from './utils'

class Metronome {
	constructor(tempo = 115) {
		this.audioContext = null
		// notes that have been put into the web audio and may or may not have been played yet {note, time}
		this.notesInQueue = []
		this.currentQuarterNote = 0
		this.tempo = tempo
		this.lookahead = 25 // How frequently to call scheduling function (in milliseconds)
		this.scheduleAheadTime = 0.1 // How far ahead to schedule audio (sec)
		this.nextNoteTime = 0.0 // when the next note is due
		this.isRunning = false
		this.interval = null
	}

	getAudioContext() {
		this.audioContext = this.audioContext || tryCatch(
			() => new (window.AudioContext || window.webkitAudioContext)(),
		).fold(
			() => alert('Metronome is not supported by your browser.'), // eslint-disable-line no-alert
			identity,
		)

		return this.audioContext
	}

	nextNote() {
		// Advance current note and time by a quarter note
		// Notice this picks up the CURRENT tempo value to calculate beat length.
		const secondsPerBeat = 60.0 / this.tempo
		// Add beat length to last beat time
		this.nextNoteTime += secondsPerBeat

		// Advance the beat number, wrap to zero
		this.currentQuarterNote += 1
		if (this.currentQuarterNote === 4) {
			this.currentQuarterNote = 0
		}
	}

	scheduleNote(beatNumber, time) {
		// push the note on the queue, even if we're not playing.
		this.notesInQueue.push({ note: beatNumber, time })

		// create an oscillator
		const osc = this.audioContext.createOscillator()
		const envelope = this.audioContext.createGain()

		osc.frequency.value = (beatNumber % 4 === 0) ? 1000 : 800
		envelope.gain.value = 1
		envelope.gain.exponentialRampToValueAtTime(1, time + 0.001)
		envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02)

		osc.connect(envelope)
		envelope.connect(this.audioContext.destination)

		osc.start(time)
		osc.stop(time + 0.03)
	}

	scheduler() {
		// while there are notes that will need to play before the next interval, schedule them and advance the pointer.
		while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {
			this.scheduleNote(this.currentQuarterNote, this.nextNoteTime)
			this.nextNote()
		}
	}

	start() {
		if (this.isRunning) return

		const audioContext = this.getAudioContext()
		if (!audioContext) return

		this.isRunning = true

		this.currentQuarterNote = 0
		this.nextNoteTime = audioContext.currentTime + 0.05

		this.interval = setInterval(() => this.scheduler(), this.lookahead)
	}

	setTempo(tempo) {
		this.tempo = tempo
	}

	stop() {
		this.isRunning = false
		clearInterval(this.interval)
	}

	toggle() {
		if (this.isRunning) {
			this.stop()
		} else {
			this.start()
		}
	}
}

export default new Metronome()
