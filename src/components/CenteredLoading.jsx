import styled from 'styled-components'
import { Loading } from 'waskode'

const Centered = styled.div`
	position: fixed;
	top: 40vh;
	width: 100vw;
	text-align: center;
	padding: 0 20px;
`

const CenteredLoading = ({ message, children }) => (
	<Centered>
		{children}
		<Loading message={message} />
	</Centered>
)

export default CenteredLoading
