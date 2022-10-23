
const calculateBMI = (mass: number, height: number) => mass / (height * height)

const evaluateBMI = (bmi: number) => {
	if (bmi < 18.5)
		return 'Underweight'
	else if (bmi < 25)
		return 'Healthy weight'
	else if (bmi < 30)
		return 'Overweight'
	return 'Obesity'
}

const height: number = Number(process.argv[2])
const mass: number = Number(process.argv[3])
console.log(`BMI at ${height}cm and ${mass}kg: ${evaluateBMI(calculateBMI(mass, height * 0.01))}`)

