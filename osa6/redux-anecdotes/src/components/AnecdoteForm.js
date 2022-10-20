import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = event => {
		event.preventDefault()
		const content = event.target.create.value
		event.target.create.value = ''

		dispatch(createAnecdote(content))
		dispatch(setNotification(`New anecdote '${content}'`, 5))
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div><input name='create' /></div>
				<button type='submit'>create</button>
			</form>
		</div>
	)
}
export default AnecdoteForm
