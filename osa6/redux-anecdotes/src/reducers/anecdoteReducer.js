import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// createSlice uses createReducer() and createAction() under the hood!
const anecdotesSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		appendAnecdote(state, action) {
			state.push(action.payload)
		},
		setAnecdotes(state, action) {
			return state = action.payload
		},
	}
})

export const { appendAnecdote, setAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export const createAnecdote = content => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.create(content)
		dispatch(appendAnecdote(newAnecdote))
	}
}

export const voteAnecdote = anecdote => {
	const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
	return async dispatch => {
		await anecdoteService.update(anecdote.id, updatedAnecdote)
		const anecdotes = await anecdoteService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export default anecdotesSlice.reducer
