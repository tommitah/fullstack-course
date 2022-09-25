import Header from './Header'
import Content from './Content'
import Total from './Total'

const App = () => {

	const course = {
		name: 'Half stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10
			},
			{
				name: 'Using props to pass data',
				exercises: 7
			},
			{
				name: 'State of a component',
				exercises: 14
			},
		]
	}

	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	)
}
export default App
	// const part1 = {
	// 	name: 'Fundamentals of React',
	// 	exercises: 10
	// }
	//
	// const part2 = {
	// 	name: 'Using props to pass data',
	// 	exercises: 7
	// }
	//
	// const part3 = {
	// 	name: 'State of a component',
	// 	exercises: 14
	// }
			// <Content
			// 	part1={part1.name}
			// 	part2={part2.name}
			// 	part3={part3.name}
			// 	exercises1={part1.exercises}
			// 	exercises2={part2.exercises}
			// 	exercises3={part3.exercises}
			// />
			// <Total
			// 	exercises1={part1.exercises}
			// 	exercises2={part2.exercises}
			// 	exercises3={part3.exercises}
			// />
			// <Content
			// 	part1={parts[0].name}
			// 	part2={parts[1].name}
			// 	part3={parts[2].name}
			// 	exercises1={parts[0].exercises}
			// 	exercises2={parts[1].exercises}
			// 	exercises3={parts[2].exercises}
			// />
			// <Total
			// 	exercises1={parts[0].exercises}
			// 	exercises2={parts[1].exercises}
			// 	exercises3={parts[2].exercises}
			// />
