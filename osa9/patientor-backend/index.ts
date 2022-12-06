import express, { NextFunction, Request, Response } from "express";
import diagnosesRouter from "./src/routers/diagnosesRouter";
import patientsRouter from "./src/routers/patientsRouter";
import { RouteError } from "./src/types";

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
const cors = require('cors');

const app = express();

app.use(express.static('build'));
app.use(express.json());
app.use((req: Request, _res: Response, next: NextFunction) => {
	console.log(`Method: ${req.method}`);
	console.log(`Path: ${req.path}`);
	console.log(`Body: ${JSON.stringify(req.body)}`);
	console.log('---');
	next();
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get('/api/ping', (_req, res) => {
	res.status(200);
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.use((
	err: TypeError | SyntaxError | RouteError,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	let error = err;

	if (err instanceof SyntaxError)
		error = new RouteError('Your format is not valid JSON.', {}, 400);
	else if (!(err instanceof RouteError))
		error = new Error('no separate error implemented for this!');

	res.status((error as RouteError).statusCode).json(error);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
