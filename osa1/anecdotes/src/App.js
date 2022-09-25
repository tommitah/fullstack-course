import { useState } from 'react'

const App = () => {
	const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState(Array(7).fill(0))
	const [mostVotes, setMostVotes] = useState(0)
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
	]
	const max = 6
	const min = 0

	const updateSelected = () => {
		// Janky but ensures the next anecdote is not randomized to the previous entry
		// Also has mutable state, so a bit spooky
		let nextAnecdote = selected
		do {
			nextAnecdote = Math.floor(Math.random() * (max - min) + min)
		} while (nextAnecdote === selected)
		setSelected(nextAnecdote)
	}

	const updateVotes = () => {
		// Not perfect, doesn't always display 
		// the newest one with the most votes if there are several, oh well...
		const temp = [...votes]
		temp[selected] += 1
		setVotes(temp)
		const mostVotes = temp.findIndex(value => value === Math.max(...temp))
		setMostVotes(mostVotes)
	}

	const displayVotes = index => {
		return <div>has {votes[index]} votes</div>
	}

	return (
		<div>
			<h1>Anecdote of the day</h1>
			{anecdotes[selected]}
			{displayVotes(selected)}
			<div>
				<button onClick={updateVotes}>vote</button>
				<button onClick={updateSelected}>next anecdote</button>
			</div>
			<h1>Anecdote with the most votes</h1>
			<div>
				{anecdotes[mostVotes]}
				{displayVotes(mostVotes)}
			</div>
		</div>
	)
}

export default App
