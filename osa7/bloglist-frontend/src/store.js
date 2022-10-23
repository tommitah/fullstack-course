import logger from 'redux-logger'
import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'

const reducer = {
	blogs: blogReducer,
}

const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export default store
