import { prop } from 'ramda'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { TertiaryButton } from 'waskode'
import { setSeen } from '../store/welcome/actions'

const WELCOME_SEEN = 'WELCOME_SEEN'

const Welcome = () => {
	const seen = useSelector(prop('welcomeSeen'))
	const dispatch = useDispatch()

	const handleClose = () => {
		localStorage.setItem(WELCOME_SEEN, 'true')
		dispatch(setSeen('true'))
	}

	useEffect(() => {
		const handleKeyDown = ({ key }) => {
			if (key === 'Escape') handleClose()
		}
		document.addEventListener('keydown', handleKeyDown)

		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [])

	if (seen === 'true') return null

	return (
		<WelcomeStyles
			onClick={(e) => e.target.className.includes('outer') && handleClose()}
			className="outer"
			data-testid="outer-div"
		>
			<div>
				<TertiaryButton aria-label="close welcome message" onClick={handleClose}>&times;</TertiaryButton>
				<h2>Hi!</h2>
				<p>
					This site is here to help you practice by
					randomly generating exercises for you. These are based on
					the exercises from the book
					{' '}
					<i>Progressive Steps to Syncopation for the Modern Drummer</i>
					{' '}
					by Ted Reed.
				</p>
				<p>
					The page will autoscroll as you play based on the tempo you select
					in the controls at the top.
				</p>
				<p>
					Use the
					{' '}
					<strong>Number of Measures</strong>
					{' '}
					input to set the length of your next exercise.
				</p>
				<p>
					Use the
					{' '}
					<strong>Tempo</strong>
					{' '}
					input to set the speed of the autoscrolling and metronome.
				</p>
				<p>
					Use the
					{' '}
					<strong>Metronome</strong>
					{' '}
					button to toggle the playing of the metronome (or just use your own).
				</p>
				<p>
					Click
					{' '}
					<strong>Generate Exercise</strong>
					{' '}
					to get a new exercise.
				</p>
				<p>
					Click
					{' '}
					<strong>Play</strong>
					{' '}
					to start the auto scrolling.
				</p>
			</div>
		</WelcomeStyles>
	)
}

const WelcomeStyles = styled.div`
	top: 0;
	left: 0;
	z-index: 3;
	display: grid;
	background: #00000066;
	position: fixed;
	height: 100vh;
	width: 100vw;

	div {
		max-width: 700px;
		max-height: 80vh;
		overflow-y: scroll;
		padding: 30px;
		background: white;
		margin: auto;
		position: relative;
	}

	button {
		font-size: 50px;
		position: absolute;
		top: 0;
		right: 0;
	}
`

export default Welcome
