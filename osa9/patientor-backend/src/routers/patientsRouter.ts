import { Router } from "express";
import patientService from "../services/patientService";
import { Patient, RequestBody } from "../types";
import { v1 as uuid } from 'uuid';

const patientsRouter = Router();

patientsRouter.get('/', (_req, res) => {
	const patients = patientService.getPatients();
	res.json(patients);
});

patientsRouter.post('/', (req: RequestBody<Patient>, res) => {
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

	patientService.addPatient(newPatient)

	res.status(200).json(newPatient);
});

export default patientsRouter;
