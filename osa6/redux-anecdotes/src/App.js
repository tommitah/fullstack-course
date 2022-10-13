import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
	const anecdotes = useSelector(state => state)

	// Copying the state in store like this to make sure the list rerenders on every vote
	// ... seems hacky
	const [anecdotesList, setAnecdotesList] = useState(anecdotes)
	const dispatch = useDispatch()

	const addAnecdote = e => {
		e.preventDefault()
		const content = e.target.create.value
		e.target.create.value = ''

		dispatch(createAnecdote(content))
	}

	useEffect(() => {
		anecdotes.sort((a, b) => b.votes - a.votes)
		setAnecdotesList(anecdotes)
	}, [anecdotes])

	return (
		<div>
			<h2>Anecdotes</h2>
			<AnecdoteList anecdotesList={anecdotesList} />
			<AnecdoteForm addAnecdote={addAnecdote} />
		</div>
	)
}

export default App
