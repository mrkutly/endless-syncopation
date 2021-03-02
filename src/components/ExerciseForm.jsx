import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Form, NumberInput } from 'waskode'
import { validateNumMeasures, validateTempo } from '../lib/validation'
import {
	getNumMeasures, getTempo, setNumMeasures, setTempo, getMetronomeEnabled, toggleMetronome,
} from '../store/form/actions'
import config from '../config'

const ExerciseForm = () => {
	const dispatch = useDispatch()
	const numMeasures = useSelector(getNumMeasures)
	const tempo = useSelector(getTempo)
	// const metronomeEnabled = useSelector(getMetronomeEnabled)

	const numMeasuresValid = validateNumMeasures(numMeasures)
	const tempoValid = validateTempo(tempo)

	return (
		<StyledForm method="POST" onSubmit={(e) => e.preventDefault()}>
			<StyledNumberInput
				label="Number of measures"
				name="numMeasures"
				value={numMeasures}
				min="0"
				max={String(config.maxNumMeasures)}
				onChange={(e) => dispatch(setNumMeasures(e.target.value))}
				validationError={!numMeasuresValid && `Must be between 1 and ${config.maxNumMeasures}`}
			/>
			<StyledNumberInput
				label={`Tempo (max ${config.maxTempo})`}
				name="tempo"
				value={tempo}
				min="0"
				max={String(config.maxTempo)}
				onChange={(e) => dispatch(setTempo(e.target.value))}
				validationError={!tempoValid && `Must be between 1 and ${config.maxTempo}`}
			/>
			{/* <div style={{ marginTop: '32px' }}>
				<label
					htmlFor="metronome-toggle"
					className={metronomeEnabled ? 'checkbox checked' : 'checkbox'}
				>
					Metronome
					<input
						type="checkbox"
						id="metronome-toggle"
						aria-hidden="false"
						checked={metronomeEnabled}
						onChange={() => dispatch(toggleMetronome())}
						onKeyPress={() => dispatch(toggleMetronome())}
					/>
				</label>
			</div> */}
		</StyledForm>
	)
}

const StyledNumberInput = styled(NumberInput)`
	margin-bottom: 0;
`

const StyledForm = styled(Form)`
	> * {
		margin-bottom: 0;
		margin-right: 20px;
	}

	input[type="checkbox"] {
		margin-left: 12px;
	}

	input:not([type="checkbox"]) {
		width: 160px;
	}

	label.checkbox {
		z-index: 1;
		padding: 8px 16px;
		transition: all 0.1s ease;
		cursor: pointer;
		background: none;
		border: 1px solid ${({ theme }) => theme.primary[500]};
		color: ${({ theme }) => theme.primary[500]};

		&:hover {
			background: ${({ theme }) => theme.primary[200]};
			border-color: transparent;
			color: ${({ theme }) => theme.text.onPrimary[200]};
		}
		
		&:focus {
			background: ${({ theme }) => theme.primary[200]};
			border-color: transparent;
			color: ${({ theme }) => theme.text.onPrimary[200]};
			outline: 2px solid ${({ theme }) => theme.primary[100]};
			outline-offset: 4px;
		}
		
		&:active, &.checked {
			background: ${({ theme }) => theme.primary[100]};
			border-color: transparent;
			color: ${({ theme }) => theme.text.onPrimary[100]};
		}
	}

	display: flex;
	position: sticky;
	top: 0;
	padding: 15px;
	background: white;
	z-index: 2;

	@media screen and (max-width: 580px) {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
`

export default ExerciseForm
