import { Router } from "express";
import patientService from "../services/patientService";

const patientsRouter = Router();

patientsRouter.get('/', (_req, res) => {
	const patients = patientService.getPatients();
	res.send(patients);
});

export default patientsRouter;
