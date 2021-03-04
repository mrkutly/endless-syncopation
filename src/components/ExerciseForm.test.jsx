import config from '../config'
import { fireEvent, renderWithContexts } from '../test-utils'
import ExerciseForm from './ExerciseForm'

describe('ExerciseForm Component', () => {
	test('renders without crashing', () => {
		renderWithContexts(<ExerciseForm />)
	})

	test('can edit the number of measures', () => {
		const rendered = renderWithContexts(<ExerciseForm />)
		fireEvent.change(
			rendered.getByLabelText(/Number of measures/),
			{ target: { value: 272 } },
		)
		expect(rendered.getByLabelText(/Number of measures/))
			.toHaveAttribute('value', '272')
	})

	test('can edit the tempo', () => {
		const rendered = renderWithContexts(<ExerciseForm />)
		fireEvent.change(
			rendered.getByLabelText(/Tempo/),
			{ target: { value: 142 } },
		)
		expect(rendered.getByLabelText(/Tempo/))
			.toHaveAttribute('value', '142')
	})

	test('shows validation errors for the number of measures', () => {
		const { maxNumMeasures } = config
		const rendered = renderWithContexts(<ExerciseForm />)
		fireEvent.change(
			rendered.getByLabelText(/Number of measures/),
			{ target: { value: maxNumMeasures + 1 } },
		)
		expect(rendered.getByText(`Must be between 1 and ${maxNumMeasures}`))
			.toBeInTheDocument()
	})

	test('shows validation errors for the tempo', () => {
		const { minTempo, maxTempo } = config
		const rendered = renderWithContexts(<ExerciseForm />)
		fireEvent.change(
			rendered.getByLabelText(/Tempo/),
			{ target: { value: maxTempo + 1 } },
		)
		expect(rendered.getByText(`Must be between ${minTempo} and ${maxTempo}`))
			.toBeInTheDocument()

		fireEvent.change(
			rendered.getByLabelText(/Tempo/),
			{ target: { value: minTempo - 1 } },
		)
		expect(rendered.getByText(`Must be between ${minTempo} and ${maxTempo}`))
			.toBeInTheDocument()
	})

	test('can toggle the metronome', async () => {
		const rendered = renderWithContexts(<ExerciseForm />)
		fireEvent.click(rendered.getByLabelText(/Metronome/))
		expect(rendered.getByLabelText(/Metronome/).checked).toBe(true)
		fireEvent.click(rendered.getByLabelText(/Metronome/))
		expect(rendered.getByLabelText(/Metronome/).checked).toBe(false)
	})
})
