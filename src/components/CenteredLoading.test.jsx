import { renderWithContexts } from '../test-utils'
import CenteredLoading from './CenteredLoading'

describe('CenteredLoading Component', () => {
	test('renders without crashing', () => {
		renderWithContexts(<CenteredLoading />)
	})

	test('renders children', () => {
		const rendered = renderWithContexts(<CenteredLoading>hello</CenteredLoading>)
		expect(rendered.getByText('hello')).toBeInTheDocument()
	})

	test('renders a message prop', () => {
		const rendered = renderWithContexts(<CenteredLoading message="hello" />)
		expect(rendered.getByText('hello')).toBeInTheDocument()
	})
})
