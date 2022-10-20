import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	message: '',
	timeoutID: 0,
	visible: false,
}

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		createNotification(state, action) {
			clearTimeout(state.timeoutID)
			return state = { ...action.payload }
		},
		removeNotification(state, action) {
			return state = initialState
		}
	}
})

export const { createNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
	return dispatch => {
		const timeoutID = setTimeout(() => dispatch(removeNotification()), timeout * 1000)
		dispatch(createNotification({ message, timeoutID, visible: true }))
	}
}

export default notificationSlice.reducer
