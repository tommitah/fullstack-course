import { useState } from 'react'
import {
	BrowserRouter as Router,
	Routes, Route
} from 'react-router-dom'
import { Anecdote, AnecdoteList } from './components/AnecdoteList'
import { Footer, About } from './components/Static'
import Menu from './components/Menu'
import CreateNew from './components/CreateNew'

import { testData } from "./testData";

const App = () => {
	const [anecdotes, setAnecdotes] = useState(testData)
	const [notification, setNotification] = useState('')

	const addNew = anecdote => {
		anecdote.id = Math.round(Math.random() * 10000)
		setAnecdotes(anecdotes.concat(anecdote))
		setNotification(`A new anecdote '${anecdote.content}' created!`)
		setTimeout(() => setNotification(''), 5000);
	}

	const anecdoteById = id => anecdotes.find(a => a.id === id)

	const vote = id => {
		const anecdote = anecdoteById(id)
		const voted = { ...anecdote, votes: anecdote.votes + 1 }

		setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
	}

	return (
		<Router>
			<div>
				<h1>Software anecdotes</h1>
				<Menu />
				<div>{notification}</div>
				<Routes>
					<Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
					<Route path='/create' element={<CreateNew addNew={addNew} />} />
					<Route path='/about' element={<About />} />
					<Route path='/anecdotes/:id' element={<Anecdote anecdotes={anecdotes} />} />
				</Routes>
				<Footer />
			</div>
		</Router>
	)
}

export default App
