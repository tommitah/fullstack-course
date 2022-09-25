export const average = (good, neutral, bad) => {
	if (good + neutral + bad !== 0)
		return (good - bad) / (good + neutral + bad)
}

export const positivePercentage = (good, neutral, bad) => {
	if (good + neutral + bad !== 0)
		return 100 * (good / (good + neutral + bad))
}
