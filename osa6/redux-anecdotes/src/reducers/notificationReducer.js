import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		createNotification(state, action) {
			// const notifications = [...state]
			// notifications.push({
			// 	content: action.payload,
			// 	id: getId()
			// })
			// return notifications
			return state = action.payload
		},
		removeNotification(state, action) {
			// const updatedNotifications = [...state].filter(notification => notification.id !== action.payload)
			// return updatedNotifications
			return state = null
		}
	}
})

export const { createNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
	return dispatch => {
		dispatch(createNotification(message))
		setTimeout(() => dispatch(removeNotification()), timeout * 1000)
	}
}

export default notificationSlice.reducer
