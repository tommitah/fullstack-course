import express from "express"
import qs from 'qs'
// referred to from qs documentation
// extends on qs to allow parsing strings to primitive types
const queryType = require('query-types')
import { calculateBMI } from "./calculateBMI"

const app = express()

app.use(queryType.middleware())
app.set('query parser', (str: string) => qs.parse(str))

app.get('/bmi', (req, res) => {
	const { height, weight } = req.query
	if (typeof height !== 'number' || typeof weight !== 'number')
		res.status(400).json({ error: 'malformatted parameters' })

	// Neither the compiler nor tsserver knows about middleware at this point,
	// so we get an annoying error concerning the qs-type.
	// Casting fixes it, since the validation above catches any actual problems.
	const bmi: string = calculateBMI(Number(height), Number(weight))
	const result: object = {
		height,
		weight,
		bmi
	}
	res.status(200).json(result)
})

const PORT: number = 3003
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
