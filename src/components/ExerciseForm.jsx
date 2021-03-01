import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Form, NumberInput } from 'waskode'
import { and, gte, lte } from 'ramda'
import {
	getNumMeasures, getTempo, setNumMeasures, setTempo,
} from '../store/form/actions'
import config from '../config'

const validateMax = (val, max) => and(
	gte(val, 1),
	lte(val, max),
)

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

	display: flex;
	position: sticky;
	top: 0;
	padding: 15px;
	background: white;
	z-index: 2;
`

const ExerciseForm = () => {
	const dispatch = useDispatch()
	const numMeasures = useSelector(getNumMeasures)
	const tempo = useSelector(getTempo)

	const numMeasuresValid = validateMax(numMeasures, config.maxNumMeasures)
	const tempoValid = validateMax(tempo, config.maxTempo)

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
			<div>
				<label htmlFor="metronome-toggle">
					Play with Metronome
					<input type="checkbox" id="metronome-toggle" />
				</label>
			</div>
		</StyledForm>
	)
}

export default ExerciseForm
