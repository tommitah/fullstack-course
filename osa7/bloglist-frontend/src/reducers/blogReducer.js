import { createSlice } from '@reduxjs/toolkit'

const blogsSlice = createSlice({
	name: 'blogs',
	initialState: [], // connect to axios?
	reducers: {
		dummy(state, action) {
			return state = action.payload
		}
	}
})

export const { dummy } = blogsSlice.actions

