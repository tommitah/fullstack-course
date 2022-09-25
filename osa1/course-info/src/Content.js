
const Part = (props) => {
	return (
		<div>
			<p>
				{props.title} {props.exerciseAmount}
			</p>
		</div>
	)
}

const Content = (props) => {

	return (
		<div>
			<Part title={props.part1} exerciseAmount={props.exercises1} />
			<Part title={props.part2} exerciseAmount={props.exercises2} />
			<Part title={props.part3} exerciseAmount={props.exercises3} />
		</div>
	)
}

export default Content
