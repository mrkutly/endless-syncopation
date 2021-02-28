import * as osmd from 'opensheetmusicdisplay'

export const getDisplay = (function () {
	let display
	return () => {
		if (display) return display
		display = new osmd.OpenSheetMusicDisplay('letsgobb')
		return display
	}
})()