import React from 'react'
import PropTypes from 'prop-types'
import './index.css'

const Notification = ({ message, type }) => {
	if (message === null) return null

	return (
		<div className={type}>{message}</div>
	)
}

// not isRequired because can be null
Notification.propTypes = {
	message: PropTypes.string,
	type: PropTypes.string,
}

export default Notification
