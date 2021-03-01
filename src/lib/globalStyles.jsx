/* eslint-disable react/prop-types */
import {
	createGlobalStyles,
	myVibe,
	ThemeProvider,
} from 'waskode'

export const GlobalStyle = createGlobalStyles(myVibe)
export const StyleThemeProvider = ({ children }) => (
	<ThemeProvider theme={myVibe}>
		{ children }
	</ThemeProvider>
)
