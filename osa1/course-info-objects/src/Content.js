
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
			<Part title={props.parts[0].name} exerciseAmount={props.parts[0].exercises} />
			<Part title={props.parts[1].name} exerciseAmount={props.parts[1].exercises} />
			<Part title={props.parts[2].name} exerciseAmount={props.parts[2].exercises} />
		</div>
	)
}

export default Content
