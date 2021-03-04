/* eslint-disable react/jsx-filename-extension */
import { render } from '@testing-library/react'
import { createStore } from 'redux'
import { merge } from 'ramda'
import { Provider } from 'react-redux'
import { reducer } from './store'
import { StyleThemeProvider } from './lib/globalStyles'
import initialState from './store/initialState'

export const renderWithContexts = (component, state = {}, ...args) => {
	const store = createStore(
		reducer,
		merge(initialState, state),
	)

	return (
		render(
			<StyleThemeProvider>
				<Provider store={store}>
					{component}
				</Provider>
			</StyleThemeProvider>,
			...args,
		)
	)
}

export * from '@testing-library/react'
