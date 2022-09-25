
const StatisticLine = ({ text, value }) => {

	const average = () => {
		if (value[0] + value[1] + value[2] !== 0)
			return (value[0] - value[2]) / (value[0] + value[1] + value[2])
	}

	const positivePercentage = () => {
		if (value[0] + value[1] + value[2] !== 0)
			return 100 * (value[0] / (value[0] + value[1] + value[2]))
	}

	switch (text) {
		// Janky as all hell but works, using text as the driving mechanism seems wonky
		default:
			return <div>{text} {value}</div>
		case 'average':
			return <div>{text} {average()}</div>
		case 'positive':
			return <div>{text} {positivePercentage()} %</div>
	}
}
export default StatisticLine
