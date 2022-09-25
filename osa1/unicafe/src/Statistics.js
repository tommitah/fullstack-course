
const Statistics = ({ good, neutral, bad }) => {

	const average = () => {
		if (good + neutral + bad !== 0)
			return (good - bad) / (good + neutral + bad)
	}

	const positivePercentage = () => {
		if (good + neutral + bad !== 0)
			return 100 * (good / (good + neutral + bad))
	}

	if ((good || neutral || bad) !== 0) {
		return (
			<div>
				<p>statistics</p>
				<div>good {good}</div>
				<div>neutral {neutral}</div>
				<div>bad {bad}</div>
				<div>all {good + neutral + bad}</div>
				<div>average {average()}</div>
				<div>positive {positivePercentage()} %</div>
			</div>
		)
	}
	return (<p>No feedback given</p>)
}
export default Statistics
