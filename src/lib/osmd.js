import * as osmd from 'opensheetmusicdisplay'

const getDisplay = (function getDisplay() {
	let display
	return () => {
		if (display) return display
		display = new osmd.OpenSheetMusicDisplay('letsgobb')
		return display
	}
}())

export default getDisplay
