import express from "express";
import qs from 'qs';

// queryType: referred to from qs documentation
// extends on qs to allow parsing strings to primitive types
//
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
const queryType = require('query-types');
import { calculateBMI } from "./calculateBMI";

const app = express();

// so nice to ignore errors...
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
app.use(queryType.middleware());
app.set('query parser', (str: string) => qs.parse(str));

app.get('/bmi', (req, res) => {
	const { height, weight } = req.query;
	if (typeof height !== 'number' || typeof weight !== 'number')
		res.status(400).json({ error: 'malformatted parameters' });

	// Neither the compiler nor tsserver knows about middleware at this point,
	// so we get an annoying error concerning the qs-type.
	// Casting fixes it, since the validation above catches any actual problems.
	// Or we could just ignore the error I guess... seems safer this way
	const bmi = calculateBMI(Number(height), Number(weight));
	const result = {
		height,
		weight,
		bmi
	};
	res.status(200).json(result);
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
