/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import PropTypes from 'prop-types'

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError() {
		return { hasError: true }
	}

	componentDidCatch(error, errorInfo) {
		console.log(error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return <h1>Something went wrong. Try reloading the page.</h1>
		}

		return this.props.children
	}
}

ErrorBoundary.propTypes = {
	children: PropTypes.node.isRequired,
}
