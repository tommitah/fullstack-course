
const Total = ({ parts }) => {
	const sumTotal = (parts) => {
		return (parts.reduce((total, current) => { return total + current.exercises }, 0))
	}

	// sum of all the exercises
	return (
		<footer>
			Number of exercises {sumTotal(parts)}
		</footer>
	)
}

export default Total
