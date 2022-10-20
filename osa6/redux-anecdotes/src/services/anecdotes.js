import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const createId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
	const res = await axios.get(baseUrl)
	return res.data
}

const create = async content => {
	const obj = {
		content,
		id: createId(),
		votes: 0
	}
	const res = await axios.post(baseUrl, obj)
	return res.data
}

const update = async (id, updatedAnecdote) => {
	const res = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
	return res.data
}

export default {
	getAll,
	create,
	update,
}
