
const Part = ({ part }) => {

	return (
		<div>
			<p>
				{part.name} {part.exercises}
			</p>
		</div>
	)
}

const Content = ({ parts }) => {

	return (
		<div>
			<ul>
				{parts.map(part => <li key={part.id}><Part part={part}></Part></li>)}
			</ul>
		</div>
	)
}

export default Content
