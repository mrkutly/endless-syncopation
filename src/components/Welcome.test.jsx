import { fireEvent, renderWithContexts } from '../test-utils'
import Welcome from './Welcome'

describe('Welcome Component', () => {
	test('renders without crashing', () => {
		renderWithContexts(<Welcome />)
	})

	test('displays the welcome modal', () => {
		const rendered = renderWithContexts(<Welcome />)
		expect(rendered.getByText(/Hi!/)).toBeInTheDocument()
	})

	test('does not display the welcome modal when it has already been seen', () => {
		const rendered = renderWithContexts(<Welcome />, { welcomeSeen: 'true' })
		expect(rendered.queryByText(/Hi!/)).not.toBeInTheDocument()
	})

	test('can be closed by clicking the close button', () => {
		const rendered = renderWithContexts(<Welcome />)
		fireEvent.click(rendered.getByLabelText(/close welcome message/))
		expect(rendered.queryByText(/Hi!/)).not.toBeInTheDocument()
	})

	test('can be closed by clicking outside the modal', () => {
		const rendered = renderWithContexts(<Welcome />)
		fireEvent.click(rendered.getByTestId('outer-div'))
		expect(rendered.queryByText(/Hi!/)).not.toBeInTheDocument()
	})

	test('can be closed by typing escape key', () => {
		const rendered = renderWithContexts(<Welcome />)
		fireEvent.keyDown(document, { key: 'Escape' })
		expect(rendered.queryByText(/Hi!/)).not.toBeInTheDocument()
	})
})
