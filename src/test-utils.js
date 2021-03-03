/* eslint-disable react/jsx-filename-extension */
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from './store'
import { StyleThemeProvider } from './lib/globalStyles'

export const renderWithContexts = (component, ...args) => (
	render(
		<StyleThemeProvider>
			<Provider store={store}>
				{component}
			</Provider>
		</StyleThemeProvider>,
		...args,
	)
)

export * from '@testing-library/react'
