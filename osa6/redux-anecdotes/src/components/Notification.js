import { connect } from 'react-redux'

const Notification = (props) => {
	if (props.notifications === null) return null

	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1
	}


	return (
		<div style={style}>
			{props.notifications.message}
		</div>
	)
}

const mapStateToProps = state => {
	if (!state.notifications.visible)
		return { notifications: null }
	return { notifications: state.notifications }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
