import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = props => {
	const navigate = useNavigate()

	// https://stackoverflow.com/questions/73930529/invalid-value-for-prop-reset-on-input-tag/73931276#73931276
	// this is straight up someone from the course asking for help, used the solution
	// So what's happening here is destructuring the reset function out from the hook so 
	// we don't pass it to the <input /> tag that doesn't support it.
	// <input /> holds the value, type and onChange properties but the reset is something we added.
	const { reset: resetContent, ...content } = useField('text')
	const { reset: resetAuthor, ...author } = useField('text')
	const { reset: resetInfo, ...info } = useField('text')

	const handleSubmit = event => {
		event.preventDefault()
		props.addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0
		})
		navigate('/')
	}

	const handleReset = () => {
		resetContent()
		resetAuthor()
		resetInfo()
	}

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input {...content} />
				</div>
				<div>
					author
					<input {...author} />
				</div>
				<div>
					url for more info
					<input {...info} />
				</div>
				<button>create</button>
			</form>
			<button onClick={handleReset}>reset</button>
		</div>
	)

}
export default CreateNew
