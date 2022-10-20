import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
	const addAnecdote = event => {
		event.preventDefault()
		const content = event.target.create.value
		event.target.create.value = ''

		props.createAnecdote(content)
		props.setNotification(`New anecdote '${content}'`, 5)
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

const mapDispatchToProps = {
	createAnecdote,
	setNotification,
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
