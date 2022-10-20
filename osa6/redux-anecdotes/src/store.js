import anecdotesReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import logger from 'redux-logger'
import { configureStore } from '@reduxjs/toolkit'

const reducer = {
	anecdotes: anecdotesReducer,
	notifications: notificationReducer,
	filter: filterReducer
}

const store = configureStore({
	reducer,
	// Added logger to rely less on console.log for debugging
	// and I kind of prefer it to redux tools in chrome
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export default store
