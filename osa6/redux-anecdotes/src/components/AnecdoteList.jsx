import { connect, useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initializeAnecdotes } from '../reducers/anecdoteReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import Notification from './Notification'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
	return (
		<div>
			<div>
				{anecdote.content}
			</div>
			<div>
				has {anecdote.votes}
				<button onClick={handleClick}>vote</button>
			</div>
		</div>
	)
}

const AnecdoteList = (props) => {
	// const dispatch = useDispatch()
	// const anecdotes = useSelector(({ anecdotes, filter }) => // state destructured
	// 	anecdotes
	// 		.slice()
	// 		.sort((a, b) => b.votes - a.votes)
	// 		.filter(anecdote => anecdote.content.includes(filter))
	// )

	const anecdotesList = () => {
		return props.anecdotes.slice()
			.sort((a, b) => b.votes - a.votes)
			.filter(anecdote => anecdote.content.includes(props.filter))
	}

	const addVote = anecdote => {
		// dispatch(voteAnecdote(anecdote))
		props.voteAnecdote(anecdote)
		// dispatch(setNotification(`You voted for '${anecdote.content}'`, 5))
		props.setNotification(`You voted for '${anecdote.content}'`, 5)
	}

	useEffect(() => {
		// dispatch(initializeAnecdotes())
		props.initializeAnecdotes()
	}, [])

	return (
		<div>
			<Notification />
			{anecdotesList().map(anecdote =>
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					handleClick={() => addVote(anecdote)}
				/>
			)}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		anecdotes: state.anecdotes,
		filter: state.filter,
	}
}

const mapDispatchToProps = {
	initializeAnecdotes,
	voteAnecdote,
	setNotification,
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList
