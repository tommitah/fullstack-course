import express from "express"
import qs from 'qs'
// referred to from qs documentation
// extends on qs to allow parsing strings to primitive types
const queryType = require('query-types')
import { calculateBMI } from "./calculateBMI"

const app = express()

app.get('/bmi', (req, res) => {
	const { height, weight } = req.query
	if (typeof height !== 'number' || typeof weight !== 'number')
		res.status(400).json({ error: 'malformatted parameters' })

	// tsserver(lsp) is being annoying and crying about the params not being numbers and preventing compilation
	// typeof shows that they are numbers so idk
	// casting to fix it, really annoying I must say
	// there should be no situation where we get here but typeof height || number !== 'number'
	const bmi: string = calculateBMI(height, weight)
	const result: object = {
		height,
		weight,
		bmi
	}
	res.status(200).json(result)
})


app.use(queryType.middleware())
app.set('query parser', (str: string) => qs.parse(str))

const PORT: number = 3003
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
