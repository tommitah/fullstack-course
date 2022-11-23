import express from "express";
import diagnosesRouter from "./src/routers/diagnosesRouter";
import patientsRouter from "./src/routers/patientsRouter";

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
const cors = require('cors');

const app = express();

app.use(express.static('build'));
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get('/api/ping', (_req, res) => {
	console.log('pinggg');
	res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
