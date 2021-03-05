import { useState } from 'react'
import styled from 'styled-components'
import ExerciseForm from './ExerciseForm'

const ResponsiveExerciseForm = ({ color }) => {
	const [open, setOpen] = useState(false)

	const toggleOpen = () => setOpen(!open)
	const handleMenuKeyDown = (e) => {
		if (['Enter', ' '].includes(e.key)) {
			toggleOpen()
		}
	}

	return (
		<ResponsiveStyles className={open ? 'open' : ''} color={color}>
			<div
				className="bars"
				onClick={toggleOpen}
				onKeyDown={handleMenuKeyDown}
				role="button"
				tabIndex={0}
				aria-controls="exercise-form"
			>
				<div id="one" />
				<div id="two" />
				<div id="three" />
			</div>
			<ExerciseForm id="exercise-form" />
		</ResponsiveStyles>
	)
}

const ResponsiveStyles = styled.div`
	background: white;
	position: sticky;
	top: 0;
	z-index: 3;

	.bars {
		display: none;
	}

	@media screen and (max-width: 580px) {
		.bars {
			background: white;
			position: absolute;
			top: 32px;
			right: 40px;
			height: 32px;
			width: 40px;
			display: grid;
			align-items: center;
			z-index: 10;
			div {
				height: 4px;
				width: 40px;
				background: var(--primary-100);				
				transition: transform 0.1s ease;
			}
		}

		#exercise-form {
			display: none;
			text-align: center;
			padding-top: 20vh;
		}
		&.open {
			height: 103vh;
			width: 103vw;
			position: fixed;
			overflow: hidden;
			top: 0;
			left: 0;
			background: var(--neutral-100);
			#exercise-form {
				display: block;
				ul {
					list-style: none;
					font-weight: 600;
					padding-left: none;
					display: block;
					margin: 0;
					li a {
						color: white;
					}
				}
			}
			.bars {
				div {
					background: var(--primary-300);
				}
				#one {
					transform: rotate(45deg) translate(6px, 9px);
				}
				#two {
					transform: rotate(-45deg);
				}
				#three {
					transform: rotate(45deg) translate(-10px, -6px);
				}
			}
		}
	}
`

export default ResponsiveExerciseForm
