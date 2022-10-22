import { Link, useParams } from "react-router-dom"

export const Anecdote = ({ anecdotes }) => {
	const id = useParams().id
	const anecdote = anecdotes.find(anecdote => anecdote.id === Number(id))

	return (
		<div>
			<h1>{anecdote.content}</h1>
			<p>has {anecdote.votes} votes</p>
			<p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
		</div>
	)
}

export const AnecdoteList = ({ anecdotes }) => (
	<div>
		<h2>Anecdotes</h2>
		<ul>
			{
				anecdotes.map(anecdote => <li key={anecdote.id} >
					<Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
				</li>)
			}
		</ul>
	</div>
)
