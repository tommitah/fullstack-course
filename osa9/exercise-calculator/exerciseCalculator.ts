
interface Result {
	days: number,
	trainingDays: number,
	target: number,
	average: number,
	targetReached: boolean,
	rating: number,
	feedback: string
}

const ratePerformance = (average: number, target: number) => {
	if (average > target)
		return 3
	else if (average === target)
		return 2
	return 1
}

const giveFeedback = (rating: number) => {
	switch (rating) {
		case 1:
			return 'Below average, step it up!'
		case 2:
			return 'Barely made it! You can till work harder!'
		case 3:
			return 'Good job staying ahead of the average! Keep working out!'
		default:
			return ''
	}
}

const calculateExercises = (hoursPerDay: Array<number>, target: number) => {
	const average = hoursPerDay.reduce((a, b) => a + b, 0) / hoursPerDay.length
	const rating = ratePerformance(average, target)
	const feedback = giveFeedback(rating)

	const result: Result = {
		days: hoursPerDay.length,
		trainingDays: hoursPerDay.filter(hours => hours !== 0).length,
		target,
		average,
		targetReached: average >= target,
		rating,
		feedback,
	}
	return result
}

// this filters out the first two arguments which are paths to ts-node binary and the script
const args = process.argv.filter(element => element.length <= 3)
const target: number = Number(args.shift()) // removing the first element leaves only the hours trained
const hours: Array<number> = args.map(element => Number(element))

console.log(calculateExercises(hours, target))
