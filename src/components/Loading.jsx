const Loading = ({ children }) => (
	<div style={{ textAlign: 'center' }}>
		<div className="loader" />
		{ children }
	</div>
)

export default Loading
