import { Response, Router } from "express";
import patientService from "../services/patientService";
import { GenderEnum, Patient, RequestBody, RouteError } from "../types";
import { v1 as uuid } from 'uuid';
import { body, validationResult } from 'express-validator';

const patientsRouter = Router();

patientsRouter.get('/', (_req, res) => {
	const patients = patientService.getPatients();
	res.json(patients);
});

patientsRouter.post('/',
	[
		body('name').exists().isString().notEmpty(),
		body('dateOfBirth').exists().isString().notEmpty(),
		body('ssn').exists().isString().notEmpty(),
		body('gender').exists().custom((type: GenderEnum) => Object.values(GenderEnum).includes(type)),
		body('occupation').exists().isString().notEmpty(),
	],
	(req: RequestBody<Patient>, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			throw new RouteError('oops, looks like you provided shite data!', errors.mapped(), 400);

		const id = uuid();
		const body = req.body;

		const newPatient: Patient = {
			id,
			name: body.name,
			dateOfBirth: body.dateOfBirth,
			ssn: body.ssn,
			gender: body.gender,
			occupation: body.occupation
		};

		patientService.addPatient(newPatient);

		res.status(200).json(newPatient);
	});

export default patientsRouter;
