/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import smoothscroll from 'smoothscroll-polyfill'
import store from './store'
import ErrorBoundary from './components/ErrorBoundary'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { GlobalStyle, StyleThemeProvider } from './lib/globalStyles'
import './index.css'
import App from './App'

smoothscroll.polyfill()

ReactDOM.render(
	<React.StrictMode>
		<ErrorBoundary>
			<GlobalStyle />
			<StyleThemeProvider>
				<Provider store={store}>
					<App />
				</Provider>
			</StyleThemeProvider>
		</ErrorBoundary>
	</React.StrictMode>,
	document.getElementById('root'),
)

serviceWorkerRegistration.register()
