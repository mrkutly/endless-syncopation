import config from '../config'
import { fireEvent, renderWithContexts, waitFor } from '../test-utils'
import Controls from './Controls'

describe('Controls Component', () => {
	test('renders without crashing', () => {
		renderWithContexts(<Controls />)
	})

	test('Can generate an exercise', () => {
		const rendered = renderWithContexts(<Controls />)
		expect(rendered.getByText(/Generate Exercise/).disabled).toBe(false)
		fireEvent.click(rendered.getByText(/Generate Exercise/))
		expect(rendered.getByText(/Generate Exercise/).disabled).toBe(true)
	})

	test('Can start playing', async () => {
		const rendered = renderWithContexts(<Controls />)
		expect(rendered.getByText(/Play/).disabled).toBe(true)
		fireEvent.click(rendered.getByText(/Generate Exercise/))
		await waitFor(() => expect(rendered.getByText(/Play/).disabled).toBe(false))
		fireEvent.click(rendered.getByText(/Play/))
		expect(rendered.getByText(/Pause/)).toBeInTheDocument()
	})

	test('Can pause', async () => {
		const rendered = renderWithContexts(<Controls />)
		expect(rendered.getByText(/Play/).disabled).toBe(true)
		fireEvent.click(rendered.getByText(/Generate Exercise/))
		await waitFor(() => expect(rendered.getByText(/Play/).disabled).toBe(false))
		fireEvent.click(rendered.getByText(/Play/))
		fireEvent.click(rendered.getByText(/Pause/))
		expect(rendered.getByText(/Play/)).toBeInTheDocument()
	})

	test('Will not generate exercise if numMeasures is invalid', async () => {
		const invalidState = {
			form: {
				numMeasures: config.maxNumMeasures + 1,
				tempo: config.maxTempo - 1,
				metronomeEnabled: false,
			},
		}
		const rendered = renderWithContexts(<Controls />, invalidState)
		expect(rendered.getByText(/Generate Exercise/).disabled).toBe(true)
	})

	test('Will not play if tempo is invalid', async () => {
		const invalidState = {
			form: {
				numMeasures: config.maxNumMeasures - 1,
				tempo: config.maxTempo + 1,
				metronomeEnabled: true,
			},
		}
		const rendered = renderWithContexts(<Controls />, invalidState)
		expect(rendered.getByText(/Play/).disabled).toBe(true)
	})
})
