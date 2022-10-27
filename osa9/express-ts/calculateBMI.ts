export const calculateBMI = (height: number, mass: number) => {
	const bmi: number = mass / (0.0001 * height * height)
	console.log('bmi: ', bmi)
	if (bmi < 18.5)
		return 'Underweight'
	else if (bmi < 25)
		return 'Healthy weight'
	else if (bmi < 30)
		return 'Overweight'
	return 'Obesity'
}
